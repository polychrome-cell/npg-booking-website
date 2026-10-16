# Nippon Pacific Group — booking demo

A responsive, fictional airline booking prototype for the Nippon Pacific Group aviation concept.

## Preview

Open `index.html` in any modern browser. Use the **Tsuki: Journeys**, **Routes**, and **Fleet** links in the header or the home-page feature cards to open their dedicated pages. The public pages work as a local static site. Admin sign-in requires the hosted site, an internet connection, and a configured Supabase project. Google Fonts are an optional enhancement; the design falls back to system fonts if you are offline.

## Try it

1. Choose an origin and destination (KIX–SFO is preselected), dates, travelers, and an airline.
2. Select **Find my flight** to see fictional sample schedules and fares.
3. Choose a sample flight and complete the on-screen demo confirmation.

The demo never sells or issues tickets, creates a real reservation, requests payment, or sends or saves the first name entered for the confirmation. Sample fares and schedules are illustrative only.

## Route maps and fleet

`routes.html` contains one interactive map page. Choose Grand Pacifica Air or Tsuki Airways with the airline buttons to switch the world map and route book. Tsuki Orbit will be added when its routes are available. The route book can be searched and filtered by departure airport; selecting a map pin highlights its routes.

The full-world, Pacific-centered map draws great-circle routes over the local `world-map.svg` basemap and does not rely on online map tiles. Grand Pacifica Air includes the 14 destinations and route distances/frequencies from your screenshots. Tsuki Airways includes all 79 screenshot routes: 77 with weekly service, one listed at zero weekly service, and one Moscow route whose figures were cut off.

`fleet.html` contains airline selection buttons. Grand Pacifica Air shows its 50 aircraft across three types; Tsuki Airways shows 98 aircraft across three types. Tsuki Orbit will be added when its fleet details are available. `journeys.html` presents Tsuki: Journeys for Traditional Japan, Dubai, Singapore, and Europe. Visitors can choose Tsuki Escape, Tsuki Signature, Tsuki Grand Voyage, or the top-tier Tsuki Elite Resort Class; set trip dates, duration, hotel, and traveler count; view an itinerary featuring local landmarks; and generate a fictional booking confirmation. Elite Resort Class adds First Class flights, destination-specific luxury resorts, private chauffeured transfers, and signature guided experiences. No personal or payment details are collected, and nothing is stored or sent. Package estimates, hotels, routes, schedules, and fleet figures are fictional roleplay content. Natural Earth source for the country outlines: [1:110m Cultural Vectors](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/).

## Admin sign-in setup (Supabase)

The Settings menu includes an email-code verification and password sign-in for `srianshsaprathasbehera@gmail.com`. The password is chosen by the administrator after verifying an email code; it is never included in this project. The signup restriction must be enabled in Supabase before relying on this login.

1. Create a Supabase project. In `supabase-config.js`, set `url` to the project URL and `publishableKey` to the project's **publishable** key. These values are intended for browser use; never add a secret or service-role key to this static site.
2. In Supabase Auth, enable Email sign-in and email confirmation. In both the **Magic Link** and **Confirm Signup** email templates, use `{{ .Token }}` so existing and first-time accounts receive a code that can be entered in the Settings panel.
3. Run `supabase/admin-email-allowlist.sql` in the Supabase SQL Editor. In **Authentication → Hooks**, enable **Before User Created** and select `public.allow_only_npg_admin`. This server-side hook rejects account creation for every other email.
4. Set the Supabase Site URL and allowed redirect URLs to the published GitHub Pages site. Supabase's default email service only sends to project-authorized addresses; add the administrator to the Supabase project team for testing, or configure custom SMTP to deliver to other addresses.

Until these steps are complete, Settings will explain that Supabase is not connected. The current static site has no private admin data or management tools attached to the authenticated identity yet.

## Files

- `index.html` — page structure
- `journeys.html` — Tsuki: Journeys destinations and package tiers
- `routes.html` — airline selection, world map, and route book
- `fleet.html` — airline fleet selection and fleet details
- `styles.css` — responsive visual design
- `settings.js` — shared dark mode, animation, and stress-relief settings
- `supabase-config.js` — public Supabase project URL and publishable-key placeholders
- `supabase/admin-email-allowlist.sql` — server-side administrator-only signup hook
- `app.js` — flight search and mock booking interactions
- `site-pages.js` — route-map and fleet page interactions
- `world-map.svg` — self-contained world basemap based on Natural Earth country outlines
- `journey-routes-map.svg` — geographically placed Tsuki Journeys route illustration
- `assets/` — original SVG group mark and hero illustration
