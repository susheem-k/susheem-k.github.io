# INT8 quantization playground

An interactive, single-file playground for building intuition about INT8 quantization. No install, no build step, no dependencies, no network calls.

**Try it live:** https://susheemk.github.io/quantization-playground/

It has two experiments:

1. **Where values collapse.** Generate 100 random floats, quantize them to INT8, and watch distinct numbers get squashed onto shared integer codes.
2. **Granularity lab.** Quantize a 16 × 32 weight matrix with one scale per tensor, per row, per column, or per block, and see what a single outlier does to everything around it.

This is part of a series on LLM quantization. Part 1 covers 8-bit only.

## Run it locally

Download `index.html` and open it in any modern browser. That's it.

```bash
git clone https://github.com/susheem-k/quantization-playground.git
cd quantization-playground
open index.html        # macOS; on Linux use xdg-open, on Windows use start
```

## How to use it

### Experiment 1: where values collapse

1. Set a **range min** and **range max**, or click a preset such as `[0, 6]` or `[0, 1000]`.
2. Pick **Symmetric** or **Asymmetric**.
3. Pick a **distribution**. *Tight cluster + one outlier* is the interesting one: most values sit in a narrow band and one value sits at the top of the range.
4. Read the plot. The top row is the original floats, each distinct. Each column below is one INT8 code, and every point that lands on it stacks up. Tall stacks are many different floats reduced to one identical number.
5. Try **Clipping** (percentile or manual range). The step size shrinks so most points get finer resolution, but points outside the clip range saturate to the edge and take a large error.
6. Use **Zoom to biggest collision**, scroll to zoom at the cursor, and drag to pan.

### Experiment 2: granularity lab

1. Choose a **granularity**:
   - **Per-tensor**: one scale for the whole matrix.
   - **Per-row**: one scale per row.
   - **Per-column**: one scale per column.
   - **Block-wise**: one scale per group of consecutive weights within a row. Pick the **block size** (2, 4, 8, 16 or 32).
2. Choose an **outlier pattern** and its **size** (in standard deviations):
   - **Single outlier**: one extreme weight at row 5, column 21.
   - **Five scattered outliers**: five extreme weights in random places.
   - **One outlier column**: every weight in column 21 is extreme (like the systematic outlier feature dimensions reported in large transformers).
   - **One outlier row**: every weight in row 5 is extreme.
3. Read the **original weights** map (teal negative, coral positive, amber outline on outliers) and the **absolute error** map. White lines on the error map show which weights share a scale.
4. Compare all four granularities in the table at the bottom. Click a row to select it.
5. Click **New random weights** to re-draw the matrix.

#### Things to try

| Try this | What you should see |
| --- | --- |
| Single outlier, per-tensor vs block of 8 | The outlier stretches the one shared scale, so every normal weight is rounded coarsely. Blocks confine the damage to the few weights sharing a scale with it, and the mean error drops by roughly an order of magnitude. |
| Same setup, compare **Max abs error** | It barely moves. The weights that share a scale with the outlier still take the hit. Smaller groups reduce how many weights suffer, not how bad it is for those. |
| One outlier column | Per-column wins by a wide margin. Per-row does almost nothing, because every row contains an outlier. |
| One outlier row | Per-row wins. Per-column does almost nothing. |
| Five scattered outliers | Smaller blocks win, since they isolate each outlier. |
| No outliers | Smaller groups still help somewhat (each group has a tighter min and max), but the absolute error is already small, so you are mostly paying storage for little. |
| Check **Bits per weight** as you add scales | Every extra scale is extra data to store. Block of 8 costs about 2 extra bits per weight in symmetric mode, under the stated assumptions. |
| Symmetric vs asymmetric on `[0, 6]` in Experiment 1 | Asymmetric uses the whole INT8 range for a one-sided range. Symmetric wastes the negative half. |

## How the math is implemented

Symmetric:

```
scale      = max(|min|, |max|) / 127
zero_point = 0
q          = clamp(round(w / scale), -127, 127)
w_hat      = q * scale
```

Asymmetric:

```
scale      = (max - min) / 255
zero_point = -128 - round(min / scale)
q          = clamp(round(w / scale) + zero_point, -128, 127)
w_hat      = (q - zero_point) * scale
```

In the granularity lab, `min` and `max` come from each group's own values. The error shown is `|w - w_hat|`.

**Bits per weight** assumes 8 bits per weight, plus one 16-bit scale per group, plus an 8-bit zero-point per group in asymmetric mode.

## Limitations

- INT8 only. Lower bit widths and methods such as GPTQ and GGUF quantization types are not covered here.
- The weights are random Gaussian values, not a real model's. This shows the mechanism, not a benchmark.
- Rounding is to nearest. There is no calibration, no clipping in the granularity lab, and no activation quantization.
- Which axis is a "row" depends on how a framework lays out the matrix. PyTorch's Linear layer stores weights as `[out_features, in_features]`, so per-row there is per-output-channel.

## Files

- `index.html`: the whole playground (HTML, CSS and JavaScript in one file).

## Author

Susheem. Writing on [Substack](https://susheemk.substack.com) and [dev.to](https://dev.to/susheem-k).
