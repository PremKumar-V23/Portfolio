# V Premkumar — Portfolio

A Vite + React + Tailwind CSS portfolio site.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Deploy to Vercel

This is a standard Vite project, so Vercel auto-detects everything — no
`vercel.json` needed.

1. Push this folder to a GitHub repo (or run `vercel` from inside this
   folder with the Vercel CLI).
2. In Vercel, "Add New Project" → import the repo.
3. Vercel will detect the **Vite** framework preset automatically:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Click Deploy.

## Notes

- **Dark/light theme toggle**: works via Tailwind's `class`-based dark
  mode (`darkMode: "class"` in `tailwind.config.js`). This only works in
  a real build like this one — it won't work if you paste the component
  into an environment using the Tailwind CDN script, since that only
  supports OS-level (`prefers-color-scheme`) dark mode.
- **Custom cursor**: `src/components/CustomCursor.jsx` renders a
  dot + easing ring that follows the mouse and grows over links/buttons.
  It automatically disables itself on touch devices (checks
  `(pointer: fine)`), so mobile is unaffected.
- **No phone number** is included anywhere; contact is limited to email,
  GitHub, and the on-page contact form (currently client-side only —
  wire `handleFormSubmit` in `src/App.jsx` to a service like Formspree
  or EmailJS, or your own API route, to actually receive messages).
