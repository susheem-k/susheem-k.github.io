---
name: add-to-read
description: Add a book, article or paper the owner wants to read later to the "To read" list on Reading > Books / Articles / Papers. Use for "add to my todos", "to read", "read later", or a link given without saying it was already read.
---

# Add to the "To read" list

Each Reading page ends with a "To read" section. Pick the page: `reading.html` (books), `reading-articles.html`, `reading-papers.html`. Papers on arXiv/IEEE/ACM go to papers; blog posts and essays go to articles.

**Articles / papers**: append (oldest queued first) to the `<ul class="feed">` under `<h2 class="subhead">To read</h2>`. If it holds the compact placeholder `<p class="empty compact" role="status">Nothing queued yet.</p>`, replace it with the list.

```html
<li>
  <span class="meta">Added Oct 04</span>
  <a class="feed-title" href="URL">Title</a>
  <span class="sources">
    <a class="source source-dev" href="URL" title="Site name" aria-label="Read on Site name">Site</a>
  </span>
</li>
```

`Added Mon DD` uses today's date. Get the title with WebFetch; on a 403 fall back to WebSearch and tell the user.

**Books**: in the "To read" `<section>` at the bottom of `reading.html`, use the same `<article class="book">` cards (and cover rules) as `add-read-book`, in a `<div class="cover-grid">`, replacing the placeholder. No `kind` line.

**When it gets read**: move it out of "To read" into the read list using `add-read-article` / `add-read-book` (and the matching papers page), and put the empty placeholder back if the list is now empty. Do not commit or push unless asked.
