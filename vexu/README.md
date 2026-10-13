# vexu.ai, rebuilt

The redesigned marketing site for VEXU: the App (AI that answers your existing number) and the Portal (no-code AI agents for business).

Stack: Vite, React 18, TypeScript, Tailwind CSS 3, Framer Motion, React Router. The same stack as the previous Magic Patterns export, so it deploys the same way.

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build in dist/
npm run preview  # serve the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: the live call demo, how it works, features, live commands, Portal teaser |
| `/app` | The VEXU App: inbox, setup steps, all twelve features, voice design, FAQ |
| `/portal` | The VEXU Portal: flow builder, channels, knowledge, calendar, actions, analytics, credits |
| `/pricing` | App and Portal plans (tabbed), pricing FAQ |
| `/company` | Mission, values, contact form and company details |
| `/portal/login` | Portal sign-in |
| `/terms`, `/privacy` | Legal |
| anything else | 404 |

## Things to set before going live

- **Launch status and store links**: `src/config/launch.ts`. Change `status` to `'available'` and fill `appStoreUrl` / `googlePlayUrl`; every badge and CTA follows. Update `date` too, since it is shown on the site.
- **Forms** (early access, demo, contact): set `VITE_LEADS_ENDPOINT` to a URL that accepts a JSON POST (Formspree, HubSpot, your own API). Without it, forms show success locally but send nothing. See `src/config/leads.ts`.
- **Portal sign-in**: set `portalUrl` in `src/config/launch.ts` (for example `https://app.vexu.ai`). The login page then hands off to it; without it, the page asks people to book a demo.
- **Legal**: the Terms and Privacy text is carried over unchanged and still marked as under legal review.

## Deploying

It's a single-page app, so every route must serve `index.html`. `vercel.json` (Vercel) and `public/_redirects` (Netlify) already handle that.

## Design notes

- **Signature**: the hero's live call console (`src/components/CallConsole.tsx`). The transcript streams in as it's spoken, a waveform follows the speaker, details are captured, and it ends in the summary. It's driven by one clock, so it can pause and replay, it pauses when off screen, and with reduced motion it shows the finished call.
- **Colour**: porcelain `#F2F4F1`, paper `#FFFFFF`, graphite `#10201A`, slate `#57655E`, hairline `#DCE2DE`, and the VEXU green `#00C864`, which is reserved for "live" and the main action. Buttons use dark text on green, which passes contrast (white on green didn't).
- **Type**: Archivo throughout. Headlines use its expanded width (`.display`), body text the normal width.
- **Product visuals** (`Fragments.tsx`, `FlowGraph.tsx`, `PhoneAppScreen.tsx`) are built in code, not screenshots, so they stay sharp and light. The one real screenshot is the Portal flow builder, converted to WebP (1.1 MB → 51 KB).
