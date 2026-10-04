---
name: add-read-article
description: Add an article the owner just read to Reading > Articles (reading-articles.html). Use when given a URL and told "I read this", "add to reading", or similar.
---

# Add a newly read article

Target: `reading-articles.html`. Newest entry goes first inside `<ul class="feed">`.

1. **Get the title.** Try WebFetch on the URL. Sites like openai.com and ieeexplore.ieee.org return 403, so fall back to WebSearch on the URL. If the title came from a search result or the URL slug rather than the page, tell the user.
2. **Date.** Today's date unless the user gives one. Markup: `<time datetime="YYYY-MM-DD">Mon DD, YYYY</time>` (zero-padded day, e.g. `Oct 04, 2026`).
3. **Insert** at the top of the feed. If the file still has `<p class="empty" role="status">Nothing here yet.</p>`, replace it with the `<ul class="feed">`.

```html
<li>
  <time datetime="2026-10-04">Oct 04, 2026</time>
  <a class="feed-title" href="URL">Title</a>
  <span class="sources">
    <a class="source source-dev" href="URL" title="Site name" aria-label="Read on Site name">Site</a>
  </span>
</li>
```

The badge on the right is the site it was read on. Use the boxed text badge (`source source-dev`) with a short label (`OpenAI`, `IEEE`, `arXiv`). For Substack or DEV.to, copy the badge markup from `writing.html` instead.

4. If the article is in the "To read" list on the same page, remove it from there (restore `<p class="empty compact" role="status">Nothing queued yet.</p>` if the list becomes empty). Put new entries in the "Read" list under `<h2 class="subhead">Read</h2>`.
5. Don't touch the home page; Reading > Articles isn't shown there.
6. Edit with the Edit tool (preserves line endings). Do not commit or push unless asked.
