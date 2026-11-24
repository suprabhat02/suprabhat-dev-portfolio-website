# This site has moved

`suprabhat-portfolio.netlify.app` is retired. The live portfolio is now
[suprabhat-dev.com](https://suprabhat-dev.com) (Astro, GitHub Pages).

## Why this repo still exists

It stays live, on purpose, as a 301-redirect shim (see `netlify.toml`).
Deleting or unpublishing it outright would make every old link — anything
Google already indexed, any backlink pointing here — die as a 404 instead
of forwarding visitors and search engines to the new domain. A 404 passes
on none of the old page's authority; a 301 passes on most of it.

## What `netlify.toml` does

Every real page here 301s to its closest match on the new site:

| Old URL | New URL | Why |
| --- | --- | --- |
| `/` | `/` | same page |
| `/blog`, `/blog.html` | `/blog/` | same page |
| `/blog/frontend-best-practices-clean-ui.html` | `/blog/frontend-best-practices-clean-ui/` | same article, kept |
| `/blog/frontend-code-review-checklist.html` | `/blog/frontend-code-review-checklist/` | same article, kept |
| `/blog/why-clean-minimal-ui-professional-website.html` | `/blog/why-clean-minimal-ui-professional-website/` | same article, kept |
| `/blog/building-accessible-react-components.html` | `/blog/accessibility-in-react-what-developers-skip/` | closest topic match |
| `/blog/aria-patterns-react-guide.html` | `/blog/accessibility-in-react-what-developers-skip/` | closest topic match |
| `/blog/keyboard-navigation-spa.html` | `/blog/accessibility-in-react-what-developers-skip/` | closest topic match |
| `/blog/screen-reader-testing-react.html` | `/blog/accessibility-in-react-what-developers-skip/` | closest topic match |
| `/blog/accessible-forms-react-hook-form.html` | `/blog/accessibility-in-react-what-developers-skip/` | closest topic match |
| `/blog/lazy-loading-images-core-web-vitals.html` | `/services/#performance-audit` | closest topic match |
| `/blog/nextjs-performance-optimization.html` | `/services/#performance-audit` | closest topic match |
| `/blog/css-flexbox-tutorial-for-beginners.html` | `/blog/` | no equivalent article |
| `/blog/how-to-center-a-div-in-css.html` | `/blog/` | no equivalent article |
| `/blog/javascript-array-methods-explained.html` | `/blog/` | no equivalent article |
| `/blog/react-query-vs-redux-toolkit.html` | `/blog/` | no equivalent article |
| `/sitemap.xml` | `/sitemap-index.xml` | feed crawlers |
| `/rss.xml` | `/rss.xml` | feed crawlers |
| any path with no file behind it | `/` | fallback |

Every rule above sets `force = true`, which makes it fire even though a
real file sits at that path (Netlify otherwise serves the file and skips
the redirect). The catch-all does **not** set `force`, so a file still behind a path
keeps serving unless a forced rule above covers it. Forced on purpose:

| Old URL | New URL | Why |
| --- | --- | --- |
| `/assets/suprabhat-kumar-resume.pdf` | `/about/` | was indexed and still listed this old domain |
| `/assets/images/suprabhat.webp` | `/assets/images/suprabhat.webp` | same photo, moves image search |
| `/assets/images/og-image.svg` | `/assets/images/og-image.jpg` | share image |
| `/includes/*` | `/` | HTML fragments, thin pages if crawled |
| `/blog/COMPONENT_TEMPLATE.html` | `/blog/` | unused template |
| `/index.html`, `/404.html` | `/` | file aliases of the homepage, sampled by Change of address |
| `/blog/index.html` | `/blog/` | alias of the blog index |

Left serving on purpose: `google5d9d5a15a5829e80.html`, `BingSiteAuth.xml`
and `robots.txt`. Search Console and Bing Webmaster Tools need the
verification files to keep recognizing this property as verified while the
migration below runs, and `robots.txt` must keep allowing crawling so the
301s are seen. Remaining styles, scripts and icon images were never pages.

## The one-time step that actually matters: Change of address

A 301 alone is not how Google merges two verified properties into one
entity. Do this once, from the **old** property:

1. Open [Google Search Console](https://search.google.com/search-console)
   and select the `suprabhat-portfolio.netlify.app` property (must already
   be verified — it is, via `google5d9d5a15a5829e80.html`).
2. Settings → **Change of address**.
3. Pick the destination property: `suprabhat-dev.com` (must also be
   verified in the same Google account).
4. Google checks that every old page 301s correctly, then confirms. From
   there Google treats `suprabhat-dev.com` as the canonical identity for
   this content and folds the old property's signals into it — this is
   the step that resolves the "two Suprabhat Kumar entities" confusion,
   not the redirects by themselves.
5. Do the same in Bing Webmaster Tools if that property is verified there
   too (Site move / change of domain, under Settings).

Change of address takes effect gradually, generally weeks, not days.

## Once Change of address has fully propagated

Confirm in GSC that the old property shows "Moved" and new-site impressions
for branded queries ("Suprabhat Kumar") have picked up the old property's
former volume. Keep this redirect site live for at least a year after
that, as Google's site-move guidance asks, and longer if old links still
bring visitors: deleting it turns every old link into a 404, and Google keeps
re-checking old URLs for months.
