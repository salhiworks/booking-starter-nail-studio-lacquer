# Lacquer — the visual system

**Idea:** a bottle of polish. One deep lacquer colour is poured over a bone-white
page — edge to edge on the first screen and again on the booking band — with a
soft nude and a black-cherry "night" around it. Typography is editorial (a
magazine's running numbers, generous serif headlines with soft italics); the
photography is close and warm, about finished nails rather than salon furniture.
Corners are nearly square: lacquer is glossy, not soft.

Every raw value lives in `src/styles/tokens.css`. Other stylesheets use the tokens only.

## Colour

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--accent` (owner: *Lacquer colour*) | `#7a1424` cherry | First screen, booking band, sheet header, buttons, links, calendar selection | bone on it ≈ 9.4:1 (the editor checks any new colour against `#f6efe8` at 4.5:1) |
| `--accent-glow` | 22 % lacquer in near-white | Italics and numerals on lacquer | ≈ 6.5:1 on cherry |
| `--on-accent` / `--on-accent-soft` | `#f6efe8` / 82 % mix | Type on lacquer | 9.4:1 / 6.7:1 |
| `--paper` | `#f6efe8` bone | The page | — |
| `--raised` | `#fcf9f5` porcelain | Inputs, the booking sheet | — |
| `--oat` | `#eee2d7` nude | Good to know, the booking summary | muted text 5.1:1 |
| `--forest` (night) | `#22090f` black cherry | Gallery, footer | `--on-forest` 16:1, `--forest-glow` 11:1 |
| `--ink` / `--ink-soft` / `--muted` | `#241417` / `#46363a` / `#6b5a5a` | Text | 15.5 / 10 / 5.7:1 on bone |
| `--clay` | `#9a2c12` | Errors only, always with words | — |

The italics on the page are lacquer; on lacquer they turn pale (`--accent-glow`), so
any deep colour the owner chooses keeps working. Measured pairs (rendered, Chromium):
every text style on the page and in the booking sheet is ≥ 5.1:1.

## Type

- **Fraunces Variable** (opsz) — headlines at weight 360, italics at 340; the name mark
  and the hero's giant name in italic 300. Heading style (owner): *Editorial serif*
  (default), *Sharp serif* (lighter), *Modern sans* (Instrument Sans).
- **Instrument Sans Variable** — text, labels (uppercase, 0.15em tracking), buttons.
- Sizes: `--text-hero` up to 5.5rem (capped at 10.5svh on laptops so the first
  screen fits a 720 px-high window), section titles up to 4rem, service names up to
  1.875rem, prices in the serif with lining tabular figures.

## Devices (the few ornaments, each with a job)

1. **The giant name** — the studio's name mark set very large and whole along the bottom
   of the hero, tone-on-tone (70 % lacquer), its baseline resting `--mark-gap` above the
   hero's edge (16–32 px; `text-box` trims the line to cap height and baseline). Never
   cropped. Decorative (`aria-hidden`); its size follows the name's length (`--chars`) and
   the screen height (≤ 22svh, 18svh on short laptops, 15svh at ≤ 760 px high).
2. **The lacquer drop** — a tiny nail tip with a highlight (`--radius-nail`, a radial
   gloss) before eyebrows, shelf titles and the shelf index's current item.
3. **Running numbers** — 01 Menu, 02 Gallery, 03 Studio, 04 Good to know, 05 Visit, as
   an italic numeral and a hairline.
4. **The lacquer stroke** — a 2 px line of the accent slides in beside a menu or
   booking row on hover/focus.

## Layout by section

| Section | Desktop | Phone |
|---|---|---|
| Hero | Lacquer field; text left; a 4:5 photo from header to bottom edge on the right, its height following the screen (min 26rem, max 48rem, ≤ 52vw); a 4:5 detail print over its left edge; the name huge along the bottom | Eyebrow → headline → full-width button → photo (detail print on its left edge) → introduction → facts; the name whole on its baseline at the end |
| Menu | Sticky shelf index (left, 19rem) beside the shelves; rows: name + description · length + price · Book | The index becomes a sticky row of tabs under the header; rows: name + description, then length · price · Book |
| Gallery | Night background; a staggered three-column wall (middle column lower) of 4:5 frames with numbered captions | A swipeable rail of 76vw frames (scroll-snap), keyboard-focusable region |
| Studio | Sticky 4:5 photo with a 4:3 detail print over its corner; title, text, three numbered promises | Photo first, then text |
| Good to know | Title left, native `<details>` rows right | Stacked |
| Booking band | Lacquer; title left, three steps and the button right | Stacked |
| Visit | Hours (today marked with a drop), contact, getting here | Stacked |

Breakpoints: 720 px (two columns), 960 px (menu index, gallery wall), 1000 px (header nav),
1024 px (the full-height hero), `max-height: 820px` (short laptops: smaller name, tighter rhythm).

## The booking sheet

A modal `<dialog>`: full screen on phones (sticky summary strip at the top, sticky
Continue/submit bar at the bottom, keyboard-safe), a 66rem panel from the right from 960 px.
Lacquer header with the studio's name; four numbered steps; the treatment step uses the
same shelves and rows as the menu; the summary card is nude with a lacquer top rule.

## Motion

Entrances rise 0.75rem over 560 ms (staggered 60 ms); the hero photo settles from
1.04 scale; hover strokes and arrows move in 160–280 ms. `prefers-reduced-motion`
turns all of it into instant changes (tokens), and smooth scrolling off.

## Accessibility

44 px minimum tap targets; visible focus (2 px, lacquer — bone on lacquer and night);
one `h1`; section headings in order; the phone menu is a disclosure (`aria-expanded`,
Esc closes and returns focus); the menu index marks the visible shelf with
`aria-current`; durations have spoken equivalents ("1 hour 45 minutes"); the gallery
rail is a labelled, focusable region; sample photos say so in text.
