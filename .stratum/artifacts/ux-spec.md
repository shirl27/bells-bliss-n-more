# UX Specification — Bells Bliss N More

Version: v1
Built against: `ux-design.md` v2, `ux-design-mvp.md` v1

Shared by reference from both `ux-design.md` (End-to-End) and `ux-design-mvp.md` (MVP) — control-level behavior lives here once rather than being duplicated per tier. Each entry notes which tier(s) it applies to.

## Dropdowns / filters

| Control | Screen | Options | Applies to | Behavior |
|---|---|---|---|---|
| Category filter | Catalog | All categories, Tables & Chairs, Décor & Signage, Table Settings | Both | Client-side filter, instant, no reload |
| Sale filter | Catalog | All items, On sale only | Both | Combines with category filter (AND); empty state shown if nothing matches |
| Status filter | Admin Bookings | All statuses, Confirmed, Pending, Completed, Cancelled | Both (MVP still has "Cancelled" as a status value on existing rows — only the *bulk-delete action* is MVP-excluded, not the status itself) | Client-side, combines with date/payment filters |
| Payment filter | Admin Bookings | All, Paid, Unpaid | Both | Combines with status/date filters |

## Buttons / links / toggles

| Control | Screen | Applies to | Behavior |
|---|---|---|---|
| Add to Cart / Add to Booking | Catalog, Item Detail, Planning Services | E2E, MVP | Increments header cart badge (`localStorage`-backed), shows a toast for ~1.8s |
| Call to Book (`tel:+12063217416`) / Email (`mailto:`) | Catalog, Item Detail, Planning Services | Phase 0 only | Replaces Add to Cart/Booking entirely — opens the phone dialer or the visitor's mail client; no cart state, no toast |
| Review "Read more" | Home, Reviews | E2E only (Reviews page); Home band also shown in Phase 0 | Expands text from a ~4-line clamp to full length, button flips to "Show less"; only rendered if the text actually overflows at 4 lines |
| Tab controls (Guest/Create Account/Log In; Guest Checkout/Log In) | Log In, Checkout | E2E, MVP | Switches visible panel via `aria-selected`/`hidden`; exactly one panel visible at a time |
| Bulk row checkboxes + "Delete Selected" | Admin Bookings | E2E only | Select-all/row checkboxes update a bulk-action bar; "Delete Selected" swaps to an inline confirm ("Delete N booking(s)? This can't be undone.") rather than a native `confirm()` dialog. Entirely absent from MVP and Phase 0 — not hidden, not present in the DOM |
| On-sale checkbox | Admin Catalog — Edit Item | E2E, MVP | Toggles visibility of the Sale Price field |
| Featured checkbox | Admin Reviews | E2E only | Badge next to it updates live between "Featured"/"Not featured," no reload |
| Footer address button | All screens | E2E, MVP, Phase 0 | Opens a small popover with Google Maps / Apple Maps / Waze links; closes on outside click |

## Forms

| Control | Screen | Applies to | Behavior |
|---|---|---|---|
| Newsletter signup | Home footer | E2E, MVP, Phase 0 | `onsubmit` no-ops (`preventDefault`) — prototype-only, no real subscription |
| Request Info form | Home | Phase 0 only | Name/email/message fields; submit builds a `mailto:info@bellsblissnmore.com` URL with the fields URL-encoded into the subject/body and navigates to it via `window.location.href` (`submitRequestInfo()` in `prototype-behavior.js`) — zero backend, opens the visitor's own mail client. Trade-off: depends on the visitor having a configured mail client; no server-side fallback exists or is planned for this tier |
| Checkout guest/login forms | Checkout | E2E, MVP | Standard field validation (`required` attributes); Place Order navigates to Order Confirmation (success path only — payment-decline state is an open follow-up, unrelated to this Phase 0/MVP/E2E split) |

## Sitewide

| Behavior | Applies to | Detail |
|---|---|---|
| Cart count persistence | E2E, MVP | `localStorage`, standing in for real session/cart state |
| Auth-state header slot | E2E, MVP only | `renderAuthState()` in `prototype-behavior.js`. Excluded entirely from Phase 0 — it renders a real link to `login.html`, which isn't part of Phase 0's file set, so it can't just be left in as inert copy |
| "How it works" step 2 copy | E2E, MVP: "pay online" copy; Phase 0: "Call or email us" copy | Home page step strip — Phase 0's copy must not promise a cart/payment flow that doesn't exist in that tier |
| Keyboard navigation | E2E, MVP, Phase 0 | Native interactive elements, Tab-ordered; skip-link first focusable element on every page |
| Color contrast | E2E, MVP, Phase 0 | Body text exceeds 7:1 on white background; badges always pair color with a text label |
| Tier identifying banner | E2E, MVP, Phase 0 | A small banner injected at the top of every page by `scripts/build-prototype-variants.js`, naming which tier is being viewed — not part of the live product, review-only |
| `noindex` meta tag | E2E, MVP, Phase 0, root chooser | Injected by the same generator script — these are review prototypes on a public URL, not the real site |
