---
name: add-talk
description: Add a talk (upcoming or past) to talks.html and the home page Featured cards. Use when given a conference talk title, event, dates, or a talk/video URL.
---

# Add a talk

Gather: title, event name, city/venue, dates (or year for past talks), link (event page for upcoming, video for past), optional one-line abstract. Don't invent an abstract; omit the paragraph if there isn't one. For GitNation events (`gitnation.com/events/...`) WebFetch the event page for the speaker entry.

## `talks.html`
Talks are grouped under `<h2 class="subhead">Upcoming</h2>` and `<h2 class="subhead">Past</h2>`. Keep a heading only while it has talks; add it back when the first talk arrives. Newest first within each group.

```html
<article class="talk">
  <p class="where">Nov 16–19, 2026 · Event name, City &amp; Online</p>
  <h3>Talk title</h3>
  <p>Abstract (optional).</p>
  <p class="more"><a href="URL">Details</a></p>
</article>
```

Link text: `Details` for upcoming, `Watch` for past recordings. Past `where` uses the year: `2026 · Event, City`.

When an upcoming talk has happened, move it to Past with the year and, if available, the video link.

## `index.html` Featured cards (`<div class="thought-stars">`)
Every talk gets a card here, upcoming ones first.

```html
<article>
  <p class="kind">Talk · Upcoming</p>   <!-- just "Talk" once past -->
  <h3><a href="URL">Talk title</a></h3>
  <p class="where">Nov 2026 · Event, City</p>
</article>
```

Do not commit or push unless asked.
