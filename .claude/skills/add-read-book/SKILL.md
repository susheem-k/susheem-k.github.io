---
name: add-read-book
description: Add a book the owner has finished reading (a book still in progress goes to the To read list via `add-to-read`) to the Reading page and the home page "What I read recently" strip. Use when given a book title, ISBN or bookshop URL.
---

# Add a newly read book

Three places, all in the same card format:

1. **`reading.html`, "What I read recently"** (`<div class="cover-grid">` in the first section): add the book **first**, as an `<article class="book">` with `<p class="kind">Book</p>`. Keep this row to three books; the displaced one must remain in "All".
2. **`reading.html`, "All"**: add the book there too (no `kind` line). Match the existing ordering; check whether the section is sorted.
3. **`index.html`, `<div class="now-read">`**: add as the first `<a class="book" href="reading.html">` card and **remove the oldest** so exactly three remain. Don't leave a fourth; the layout expects three.

```html
<article class="book">
  <div class="cover"><img data-cover src="COVER" alt=""></div>
  <p class="kind">Book</p>
  <div class="title">Title</div>
  <div class="author">Author</div>
</article>
```

(`&amp;` for ampersands in authors.)

## Cover image
- Prefer `https://covers.openlibrary.org/b/isbn/<ISBN13>-L.jpg`. Test first: `curl -s -o /dev/null -w "%{http_code}" "<url>?default=false"` (404 means no cover).
- Fallback: publisher CDN, e.g. `https://cdn.waterstones.com/bookjackets/large/9781/8052/<ISBN13>.jpg` (needs a browser User-Agent; the product page itself returns 403). Download to `assets/img/<slug>.jpg`, view it to confirm it is the right cover, and reference it as `assets/img/<slug>.jpg`. Tell the user the cover was downloaded.
- If there is no cover, `data-cover` falls back to a placeholder automatically.

If the book is in the "To read" section at the bottom of `reading.html`, remove it from there (restore `<p class="empty compact" role="status">Nothing queued yet.</p>` if empty). Get the ISBN from the URL if given. Do not commit or push unless asked.
