---
name: add-written-article
description: Add an article the owner wrote and published (Substack and/or DEV.to) to Writing > Articles and the home page Recent list. Use when given a Substack or DEV.to URL for their own post.
---

# Add a written article

1. **Metadata.** Title, publish date, and every place it is published. Substack and DEV.to usually carry the same post; ask for the second URL if only one is given. Pages may return 403; fall back to WebSearch and say so.
2. **`writing.html`**: add an `<li>` at the **top** of `<ul class="feed">`, newest first.

```html
<li>
  <time datetime="YYYY-MM-DD">Mon DD, YYYY</time>
  <a class="feed-title" href="PRIMARY_URL">Title</a>
  <span class="sources">
    <a class="source" href="SUBSTACK_URL" title="Substack" aria-label="Read on Substack"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg></a>
    <a class="source source-dev" href="DEV_URL" title="DEV.to" aria-label="Read on DEV.to">DEV</a>
  </span>
</li>
```

Include only the badges for places it actually exists.

3. **`index.html`, "Recent" list** (`<ul class="feed thought-recent">`): add at the top and **drop the oldest** so three remain. Use the home markup (it wraps the title in `<span class="feed-main"><span class="kind">Article</span>...`); copy an existing item. Shorten very long titles the way existing home entries do.
4. Do not commit or push unless asked.
