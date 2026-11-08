# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude
Code session opened in this folder. It changes identity and words only, so it
finishes in one short session.

```text
Customize this nail & beauty studio starter for my business.

Business name: <YOUR BUSINESS NAME>
City and neighbourhood: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
Personality, in a few words: <e.g. glossy and fashion-forward, or calm and natural>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the business name, city and description in
   <title>, the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my business: the name mark
   (brand.wordmark — one or two short words, it is also set very large on the first
   screen), the line above the headline, headline, introduction, the menu notes,
   gallery captions, studio text and promises, Good to know answers, the visit
   note and the search title and description. Keep field ids, types, limits and
   photos. Keep the gallery's sample photos (they stay labelled "Sample" until I
   upload my own work). Headlines may set one or two words in *asterisks* (shown
   in italic) — keep that style.
4. Only if the lacquer colour clearly doesn't fit my personality (otherwise skip
   this step and don't open these files): change the default of brand.accent in
   src/content/site.ts (a deep polish colour — oxblood, plum, bottle green, navy),
   the theme-color in index.html, the colours in public/favicon.svg and
   src/admin-theme.css (light mode), keeping light text at 4.5:1 on it.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent services, prices, opening hours, awards, reviews, staff, certifications
or details of the premises you cannot know — services, prices and hours are set
in the dashboard. When done, run npm run build and fix any error, then show me
the result with npm run dev.
```

## After the prompt

- **Your services:** dashboard → Services. The menu puts each service on a shelf by
  the treatment words in its name — *pedicure / pedi / toes*, *builder gel / BIAB / infill /
  extensions*, *art / design / accents*, *removal / repair / soak-off*, *manicure / polish /
  shellac / gel* (in that order). If you rename a service to something without those words
  ("Statement Set"), its description decides instead, so keep the description describing the
  treatment. Anything else (lashes, brows) appears under "More treatments". Art and longer
  sets are separate services with their own length and price (the booking engine has no add-ons).
- **Your work:** dashboard → Website → Gallery — up to six photos with captions
  ("Look · Treatment"). Remove a photo to show fewer.
- **The studio photo:** dashboard → Website → The studio. It is labelled "Sample photo"
  until you replace it; never show someone who does not work with you.
- Connect real bookings: README.md, step 3.
