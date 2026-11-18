# Fayuqees

**Discover knowledge at the source.**

Fayuqees is a source-first Islamic content discovery website, with a mobile application envisioned for a later stage. Users enter a topic, select a scholar and choose one or more social media platforms. Fayuqees uses preconfigured social accounts so users do not need to provide handles.

## Current release — source discovery MVP

- Responsive, accessible landing page and search form.
- Two starter scholars: Sheikh Assim Al-Hakeem and Mufti Menk.
- Three selectable platforms: YouTube, Instagram and Facebook.
- YouTube: opens a search within the selected scholar's channel.
- Instagram and Facebook: opens a site-scoped web search of publicly indexed content from the selected scholar's account. Not all posts will be indexed.
- Links to original account pages and shareable search URLs.
- No fake post cards, quotations, fabricated fatwas or invented search results.

**Important:** This release does not yet fetch media into the Fayuqees website. The result cards are clearly identified as external search destinations. Search results must be checked against the original source, and the platform does not issue religious rulings.

## Project structure

```text
Fayuqees/
  index.html
  styles.css
  app.js
  README.md
```

This folder is intentionally self-contained. No existing project or root README needs modification.

## Preview

Open `index.html` in a web browser or publish this directory as a static website. The CSS and JS paths are relative, so the site can also live at a project subpath. Deployment is not configured by this commit.

## Next milestone — real in-page media results

Build a separate server-side API using each platform's permitted integration method. Start with the YouTube Data API, using the known channel ID for each scholar and a user-provided topic. A server-backed adapter should filter by the selected scholar account, handle API quota limits and pagination, and return source-backed records. Never expose private API credentials in client-side code or commit them to Git.

Proposed request: `POST /api/search` with JSON body `{query, scholarId, platforms}`.

Proposed response: `{results: [{id, platform, scholarId, title, mediaType, thumbnailUrl, sourceUrl, publishedAt, excerpt}]}`.

Each result should link to the original published item. Only display a quote or transcript excerpt when it comes from that source, and label machine-generated summaries separately. Support images and videos only when allowed by platform API policies. Do not treat a topical match as a definitive ruling on a person's individual circumstances.

Additional milestones: curated scholar account registry and verification, source attribution, duplicate filtering, relevance ranking, optional transcript-based retrieval where permitted, moderation and abuse controls, automated tests, mobile web refinement, and a later mobile application.

## Initial source registry

- Sheikh Assim Al-Hakeem — YouTube: https://www.youtube.com/@assimalhakeem ; Instagram: https://www.instagram.com/assimalhakeem/ ; Facebook: https://www.facebook.com/SheikhAssimAlhakeemTeam/
- Mufti Menk — YouTube: https://www.youtube.com/@muftimenkofficial ; Instagram: https://www.instagram.com/muftimenkofficial/ ; Facebook: https://www.facebook.com/muftimenk/

Profiles should be periodically verified and updated. The maintained registry is in `app.js`.

## Product principle

Fayuqees is a discovery tool, not a fatwa service. It should keep the scholar, platform, source link and surrounding context visible. Consult a qualified scholar for personalised guidance.

Project initiated by Yusuf.
