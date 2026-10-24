# Nippon Pacific Group

A multi-page airline group website with flight search, route maps, fleet pages, Tsuki: Journeys packages, and the Discover Sora loyalty programme.

## Open the site

Open the published site or serve this folder from a local web server. Account email confirmation needs an `http://` or `https://` address; it cannot return to a `file://` page.

## Pages

- `index.html` — airline overview and flight search. Flight search offers several airline brands, cabins, varied schedules, occasional stopovers, aircraft-specific seat layouts, and seat selection.
- `routes.html` — airline selector, route illustrations, and destination listings.
- `fleet.html` — fleet listings for Grand Pacifica Air, Tsuki Airways, and Tsuki Orbit.
- `journeys.html` — Tsuki: Journeys packages across Japan, Dubai, Singapore, and Europe, with destination plans, hotels, trip duration, and itinerary review.
- `sora.html` — Discover Sora, with five membership tiers, a points balance, earning and redemption, Access and Plus subscriptions, Gold and Platinum purchases with Sora Points, and Infinite interest registration.

Sora accounts use Supabase email/password authentication with email confirmation. A signed-in member can read only their own Infinite application decision; the application list and reviewer notes remain private. Infinite approval is matched to the account's verified email. Sora points, balances, and flight activity are still stored locally in the current browser and do not sync between devices. Schedules and seat availability are estimates; the site does not process reservations or payments.

## Connect the private Sora Infinite list

1. For a new database, run `supabase/sora-infinite-interest-signups.sql`. For the existing signup table, run `supabase/sora-infinite-account-status.sql`; it adds the decision fields if needed and enables verified accounts without replacing submitted applications.
2. In Supabase, open **Authentication → Sign In / Providers → Email** and enable email confirmation. In **Authentication → URL Configuration**, set the Site URL to `https://polychrome-cell.github.io/npg-booking-website/` and add both exact Redirect URLs: `https://polychrome-cell.github.io/npg-booking-website/index.html` and `https://polychrome-cell.github.io/npg-booking-website/sora.html`.
3. Keep the project's **publishable key** in `sora-supabase-config.js`. Never put a secret or `service_role` key in this public website.
4. Upload `index.html`, `app.js`, `sora.html`, `sora-wallet.js`, `sora-auth.js`, `sora-infinite-signups.js`, `sora-supabase-config.js`, and `styles.css` to the GitHub Pages source. The page loads `@supabase/supabase-js` from jsDelivr.

## Review Sora Infinite applications

New applications start as **Pending**. In Supabase's Table Editor, open `public.sora_infinite_interest_signups`, change `application_status` to **Approved** or **Declined**, and save. `reviewed_at` is filled automatically when the decision changes; `review_notes` is optional and private. After the member signs in with the same verified email, the Sora page reads that one decision and shows **Sora Infinite** when approved. No admin login is included; review stays in the Supabase dashboard. The Infinite approval is server-backed, while Sora points remain browser-local.

The old browser-only profile records are intentionally not cleared by this update. At release time, bump the Sora wallet storage reset version in the client before publishing if the team decides to reset existing browser progress.

Country outlines on the route maps use Natural Earth [1:110m Cultural Vectors](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/).
