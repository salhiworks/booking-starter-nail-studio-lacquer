# Nail & Beauty Studio Booking Website — "Lacquer" Starter

A finished, premium booking website for a nail & beauty studio, ready to make your own
with Claude Code and publish on Hostinger. It ships as **Lunula Nail Studio**,
a fictional nail studio in Silver Lake, Los Angeles:

- a one-page studio website — a lacquer-coloured first screen, a treatment menu on
  shelves (Manicure, Builder gel, Nail art, Pedicure, Care), a gallery of recent sets,
  the studio and its promises, *Good to know* questions and visit details — that works
  from 320 px phones up, with booking in a sheet over the page;
- online booking — treatment, day and time, details and an emailed 6-digit code;
- the owner dashboard at `/admin/` — appointments, requests to confirm, services
  and prices, opening hours and closures, email health, and the website's own
  text, photos (the gallery included), colour and heading style.

The look — *Lacquer*: one deep polish colour (cherry by default, owner-editable) poured
over a bone-white page, with a soft nude and a black-cherry night for the gallery and
footer; Fraunces with soft italics over Instrument Sans; close, warm photography of
finished nails; the studio's name set very large along the bottom of the first screen.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0-beta.3** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your business. Claude edits a
short list of files (name, city, words, colours) — the booking system, the
dashboard and the layout stay as they are, so it is quick and cheap.

Services, prices, opening hours and contact details are **not** code: you set
them in the dashboard once the booking backend is connected. Your own nail photos
go in the dashboard → Website → Gallery.

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email
function, and tells you exactly what is left for you to do (your dashboard
login and the two email secrets). Full steps: the Profit Studio guide *Build a
Premium Booking Website with Claude Code*, Step 3, or
`node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a
prompt or in Hostinger — the Resend key lives only in Supabase's Edge Function
secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a
**Web App** from it (Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to
`main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website and its booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample services and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How services find their shelf on the menu (by the words in their names) |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md`, `ASSETS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5176
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef
Es-salhi). Photographs and other third-party assets keep their own terms, listed
file by file in [`ASSETS.md`](ASSETS.md).
