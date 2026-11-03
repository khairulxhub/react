# Ledgerstone — Property Management (Kaiadmin theme)

A React + TypeScript property-management dashboard built on top of the free
**Kaiadmin** Bootstrap admin theme (already vendored under `public/assets/`).

## What changed from the uploaded project

- Fixed `index.html` (it referenced `/js/main.js` and `/css/style.css`, neither of
  which existed, plus duplicate non-minified stylesheets).
- Rewired `src/routes.tsx` to actually route to the property-management pages in
  `src/pages/*` (it previously pointed at leftover PHP-admin-demo boilerplate).
- Rebuilt `src/views/layout/Sidebar.tsx` to be fully data-driven from
  `src/data/navigation.ts`, using React state for expand/collapse instead of
  jQuery's `data-bs-toggle="collapse"` (which doesn't reliably reinitialize on
  client-side route changes in a single-page app).
- Extended `src/data/navigation.ts` with the **Users / Roles / Permissions**
  group and **Settings / Logout** links, and built out those pages — they
  didn't exist in the uploaded project at all.
- Replaced every placeholder "Sample record" stub page with real, populated
  content (Properties, Units, Tenants, Owners, Leases, Payments, Maintenance,
  Reports), all still using the theme's own CSS classes
  (`page-inner`, `card-stats`, `card-round`, `icon-big`, `table table-hover`,
  `badge bg-*`, etc.) so the visuals match the rest of the theme.
- Removed unused legacy demo files (PHP-admin user CRUD pages, a login screen,
  unused interfaces) that weren't part of the property-management sitemap and
  were tripping the strict TypeScript build (`noUnusedLocals`).
- Fixed relative asset paths (`assets/img/...` → `/assets/img/...`) that would
  break on nested routes, and dead `Link` targets in the navbar dropdown.

## Run it

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/data/navigation.ts` — single source of truth for the sidebar; edit here
  to add/remove menu items.
- `src/views/layout/` — `Sidebar`, `Navbar`, `Footer` (the Kaiadmin chrome).
- `src/App.tsx` — layout shell (`wrapper` → `Sidebar` + `main-panel`).
- `src/routes.tsx` — route table (`react-router` v8, `createBrowserRouter`).
- `src/pages/**` — one file per page, grouped to mirror the navigation.
- `public/assets/` — the vendored Kaiadmin theme (CSS, fonts, images, JS you
  are not required to use since interactivity is handled in React).

All data in the pages is mock data — swap the arrays at the top of each page
file for real API calls when you're ready to connect a backend.
