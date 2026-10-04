---
name: add-project
description: Add a project to Building > Projects (building.html), standalone or as a sub-project of an organization like The Agent Plane. Use when given a GitHub repo or a project name to add.
---

# Add a project

Target: `building.html` (Projects tab). `building-experiments.html` is the separate Experiments tab; use it only if the user says "experiment".

1. **Details.** For GitHub repos run `gh repo view <owner>/<repo> --json name,description,url` (or `gh repo list <owner>`). Use the repo's own description as the blurb; don't invent marketing copy. Tell the user about any text you wrote yourself.
2. **Belongs to The Agent Plane** (`github.com/theagentplane/*`: chronicle, tokenops, control-plane, testbench, ...): add a `<div class="sub">` inside `<div class="subprojects">` in the featured Agent Plane `<article class="experiment star">`.

```html
<div class="sub">
  <h3><a href="https://github.com/theagentplane/NAME">Name</a></h3>
  <p>Description.</p>
</div>
```

3. **Anything else:** add a standalone card after the featured one, matching the existing cards.

```html
<article class="experiment">
  <p class="status">Short tag, e.g. Node · CLI game</p>
  <h3><a href="URL">name</a></h3>
  <p>Description.</p>
</article>
```

Don't make a new project a `star` card (larger `h2`) unless the user asks; mixed sizes look inconsistent. Do not commit or push unless asked.
