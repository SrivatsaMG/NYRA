# NYRA Constructions — Next.js + TypeScript

The site rebuilt on Next.js 15 (App Router) with TypeScript, replacing the plain HTML/CSS/JS version. Same design, same content, same URL structure — but now componentised, type-checked, and running on a framework with built-in routing, image/font optimisation, and file-based SEO conventions.

## Run it locally

```bash
npm install
npm run dev
```

On Windows PowerShell, if scripts are blocked by execution policy, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
# or, if needed in the current shell:
& npm.cmd install
& npm.cmd run dev
```

Open http://localhost:3000. This step needs internet access to download dependencies (Next, React, Three.js). Run `npm run typecheck` too if you want a plain type-check without starting the dev server:

```bash
npm run typecheck
```

This project was verified successfully with the TypeScript check:

```powershell
& npm.cmd run typecheck
```

## Deploy to Vercel

Push this folder to a GitHub repo and import it in Vercel (vercel.com/new), or run:

```bash
npm i -g vercel
vercel        # first deploy
vercel --prod
```

No configuration needed — Vercel auto-detects Next.js. Attach `nyraconstructions.in` under Project → Settings → Domains once it's live.

## What changed vs. the plain HTML version

- **Componentised**: every section (`Hero`, `About`, `Services`, `Process`, `Projects`, `Contact`, `Header`, `Footer`, `WhatsAppWidget`) is its own typed component under `components/`.
- **One source of truth for business data**: phone number, address, geo-coordinates, services, process steps and project list all live in `lib/site-config.ts` as typed objects. Change the phone number once there and it updates everywhere — the header, footer, contact section, JSON-LD, and the WhatsApp links all read from it.
- **SEO via file conventions** instead of hand-written meta tags: `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml`/`robots.txt` from code, `app/opengraph-image.png` is picked up automatically for social share previews, and `app/icon.svg` is the favicon — Next wires up all the `<meta>`/`<link>` tags for these on its own. Title, description, keywords, Open Graph and Twitter tags are set once in `app/layout.tsx` via Next's typed `Metadata` API.
- **Fonts** load through `next/font/google` instead of a `<link>` tag to Google Fonts — this self-hosts the font files at build time, so there's no external request or render-blocking flash of fallback text.
- **The 3D hero** (`components/ThreeScene.tsx`) renders a low-poly house — walls, a hip roof, a door, lit windows on all four sides, and a chimney — with two trees, a simpler building block behind it for depth, and a crane, all sitting on the same blueprint grid as before. Still built entirely from Three.js primitives (no external 3D model file). It's fully rotatable now: dragging (mouse or one-finger touch) orbits the camera all the way around it via Three's `OrbitControls`, it spins gently on its own when idle, and dragging pauses that once you take over. Zoom and pan are turned off on purpose, both so the interaction stays simple and so scrolling the page over the canvas isn't hijacked. The component disposes of the renderer, controls, geometries and materials on unmount instead of leaking memory.
- **Phone number is no longer printed as text anywhere on the page.** The header, hero, footer and contact section all show a phone icon with a "Call us" label instead of the digits; clicking or tapping it triggers the device's own `tel:` link, which is the only thing that reveals the number (via the phone's own dialer). The one exception is the JSON-LD structured data in `<head>`, which isn't rendered as visible page content — search engines read it for local search, but a visitor looking at the page never sees it.
- **Logo**: the real NYRA Constructions logo is now in place — `public/logo-full.png` (icon + wordmark + tagline) in the header, `public/logo-mark.png` (icon only) in the footer, and the icon mark on a light rounded square as the favicon (`app/icon.png`) and inside the social share image (`app/opengraph-image.png`). All of it renders through `components/Logo.tsx`, so if you ever get a refreshed logo file, replacing those two PNGs in `public/` is the only thing that needs to change.
- **The scroll-reveal animation** is now a reusable `<Reveal>` component (`components/Reveal.tsx`) backed by a typed `useInView` hook, instead of a single global script that queries `.reveal` elements by class name.
- **The quote form** (`components/QuoteForm.tsx`) is a controlled React form; submitting it still opens WhatsApp with the details filled in, same as before — no backend required. If real backend handling — email notifications, storing leads — ever gets added, that becomes a Next.js API route or Server Action under `app/api/`, without needing to change the rest of the stack.

## Services — construction only

Five pure construction services live in `lib/site-config.ts`: Residential construction, Commercial construction, Renovation & interiors, Structural & RCC work, and Site development & civil works. This is the single place to add, remove or reword a service — the change flows through to the services grid, the JSON-LD structured data, and the quote form dropdown automatically.

## SEO checklist beyond the code

Same as before — none of this is code, it's account setup:

1. **Create a Google Business Profile** for NYRA Constructions with the exact address and phone number used here — this affects local search ranking more than anything on the page.
2. **Submit the sitemap** in Google Search Console once live (`nyraconstructions.in/sitemap.xml`).
3. **Keep the phone number and address identical** everywhere the business is listed (Google, Justdial, IndiaMart, Facebook).
4. Swap the placeholder project photos in `lib/site-config.ts` / `components/Projects.tsx` for real ones once available, and update the geo-coordinates in `lib/site-config.ts` with the exact pin from the Google Business Profile.

## Project structure

```
app/
  layout.tsx        — root layout, metadata, JSON-LD, fonts
  page.tsx           — home page, assembles all sections
  globals.css        — all styling (ported from the previous stylesheet)
  sitemap.ts         — generates /sitemap.xml
  robots.ts          — generates /robots.txt
  icon.svg           — favicon
  opengraph-image.png — social share image
components/
  Header.tsx, Footer.tsx, Hero.tsx, ThreeScene.tsx, About.tsx,
  Services.tsx, Process.tsx, Projects.tsx, Contact.tsx, QuoteForm.tsx,
  WhatsAppWidget.tsx, WhatsAppIcon.tsx, Reveal.tsx
hooks/
  useInView.ts       — IntersectionObserver hook behind <Reveal>
lib/
  site-config.ts     — typed business data: phone, address, services, etc.
```

Phone number used throughout: +91 95352 77149.
Address used: E Block, No. 235, J P Nagar (near 5th Cross & 17th Main), Mysuru, Karnataka – 570008.
