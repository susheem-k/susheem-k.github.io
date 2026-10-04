---
name: add-written-paper
description: Add a paper the owner authored (arXiv, journal, conference) to Writing > Papers. Use when given a paper URL that the owner presents as their own work.
---

# Add a written paper

Papers the owner **authored** live in `writing-papers.html` (Writing > Papers). Papers they merely **read** go in `reading-papers.html` (Reading > Papers), which uses the same markup.

1. **Metadata.** Exact title, authors, submission/publication date. arXiv abstract pages fetch fine via WebFetch.
2. **Insert** at the top of `<ul class="feed">`. If the page still shows `<p class="empty" role="status">Nothing here yet.</p>`, replace it with the list.

```html
<li>
  <time datetime="YYYY-MM-DD">Mon DD, YYYY</time>
  <a class="feed-title" href="URL">Title</a>
</li>
```

3. The existing entry doesn't show authors. Mention co-authors to the user and offer to add them rather than inventing a format.
4. Home page: papers are not currently shown there. If the user wants it featured, add a "Recent" item with `<span class="kind">Paper</span>` (see `index.html`).
5. Do not commit or push unless asked.
