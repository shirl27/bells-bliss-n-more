# UX Artifact Set — Bells Bliss N More (Event Planning & Rentals Website)

Version: v2
Built against: Discovery Brief v1
Changed since v1:
- Home screen redesigned and confirmed by stakeholder: new hero, "how it works" steps strip, contained rentals preview grid, bright planning-services band, and a customer-reviews band. Three earlier design explorations (Options 1/2/3) were built, compared, and retired — the confirmed direction (based on Option 2, revised) now lives directly at `index.html`; there is no longer a separate "options" set.
- Log In screen redesigned: leads with three equal-weight paths (Continue as Guest / Create Account / Log In) instead of a login form with a buried signup link.
- Sitewide: page background changed to white, footer gained contact icons, and a real CSS bug was fixed where `.filter-bar` (Catalog, Admin Bookings) was silently inheriting `flex-direction: column` from a generic `form` rule and stacking its dropdowns instead of laying them out horizontally.
- Admin brand-logo link fixed: previously went to the admin dashboard from every admin screen; now goes to the public home like every other screen's logo.
- Planning Services screen: added a matching icon per package card (previously text-only).
- Prototype-only navigation aid moved off every page and into its own `prototype-map.html`, linked from a single small footer line — this is a review tool, not part of the live product, and does not appear in the Requirement Traceability Matrix below.
- **Two scope additions beyond Discovery Brief v1 were built at stakeholder request: a customer reviews system, and booking cancellation/bulk-delete in Admin Bookings. Both are documented in Section 7 and are flagged, not yet formally scoped — see that section before this goes to `/blueprint`.**

**Note (added post-v2, full v3 rewrite still queued):** the two scope additions in Section 7 are no longer "flagged, blocking `/blueprint`" — they've been formally resolved as **End-to-End backlog, not part of MVP**, per Discovery Brief v2's new Scope Boundary section and `scope-matrix.md`. This document remains the End-to-End design (full scope, all screens); `ux-design-mvp.md` covers the trimmed MVP scope. Live links: `/end-2-end/` for this document's scope, `/mvp/` for the trimmed scope, `/phase0/` for the pre-MVP static release. Section 7's open sub-questions (review sourcing/moderation, cancellation semantics) are still genuinely open — only the "does this block MVP" question has been answered (no).

Clickable Prototype: `prototypes/bells-bliss-n-more/index.html` (also published at `https://gbenninful.github.io/bells-bliss-n-more/end-2-end/` via `scripts/build-prototype-variants.js`)

---

## 1. Mockup Set

### Screen: Home
Purpose: AC-12 (browse without account), navigation entry to Rentals/Planning; also displays featured customer reviews (scope addition — see Section 7).
Role(s) that see this screen: Guest, Individual/Family, Small Business/Org, Registered Customer (unauthenticated view)
Layout: Sticky header → two-column hero (headline/CTAs + illustration) → "How it works" 3-step strip → contained 4-card rentals preview grid → bright planning-services band (3 package cards) → reviews band (5 featured review cards + "View More Reviews") → two-column footer (contact info + newsletter signup).
Key elements: Brand/nav/cart/Log In, hero CTA buttons, step numbers, rental preview cards (price + sale badge), planning package cards, review cards (star rating, truncated text with Read More, name, date), View More Reviews button, newsletter signup form.
States: Default; review cards individually expand/collapse via Read More.
File: `prototypes/bells-bliss-n-more/index.html`

### Screen: Catalog
Purpose: AC-01, AC-02, AC-12, US-01, US-02, US-07.
Role(s): Guest, Individual/Family, Small Business/Org, Registered Customer
Layout: Breadcrumb → heading → filter bar (category, sale-only — now confirmed horizontal) → responsive product card grid.
Key elements: Category filter, "on sale only" filter, product cards, Add to Cart / View Details.
States: Default, filtered subset, empty state, item-added toast + cart count increment.
File: `prototypes/bells-bliss-n-more/catalog.html`

### Screen: Item Detail
Purpose: AC-01, AC-02, US-01, US-02.
Role(s): Guest, Individual/Family, Small Business/Org, Registered Customer
Layout: Breadcrumb → two-column (image / details, price, quantity, CTA).
Key elements: Price row, quantity input, Add to Cart, back-to-catalog link.
States: Default, item-added toast.
File: `prototypes/bells-bliss-n-more/item-detail.html`

### Screen: Planning Services
Purpose: US-03, US-07, US-08, AC-03.
Role(s): Guest, Individual/Family, Small Business/Org, Registered Customer
Layout: Breadcrumb → heading → 3-card package grid (each with a matching icon) → business-note callout with icon.
Key elements: Package cards (icon, name, description, price, Add to Booking), View Cart link.
States: Default, added-to-booking toast.
File: `prototypes/bells-bliss-n-more/planning-services.html`

### Screen: Cart
Purpose: AC-03.
Role(s): Guest, Individual/Family, Small Business/Org, Registered Customer
Layout: Two-column — line-item table + event-details fieldset / sticky order-summary sidebar.
Key elements: Cart rows (qty stepper, remove), event date/type/guest-count fields, order summary, Proceed to Checkout.
States: Populated (default), quantity adjusted, line removed, empty cart.
File: `prototypes/bells-bliss-n-more/cart.html`

### Screen: Checkout
Purpose: AC-03, AC-04, AC-05, AC-06, AC-13.
Role(s): Guest, Individual/Family, Small Business/Org, Registered Customer (via Log In tab)
Layout: Tab control (Guest Checkout / Log In) → two-column (form / order summary sidebar).
Key elements: Tabs, guest form (contact, event/delivery address, notes, hosted-payment box, create-account checkbox), login form, Place Order.
States: Guest tab active (default), Log In tab active.
File: `prototypes/bells-bliss-n-more/checkout.html`

### Screen: Order Confirmation
Purpose: AC-04 success state; AC-06 continuation.
Role(s): Guest, Individual/Family, Small Business/Org (post-purchase)
Layout: Centered confirmation card.
Key elements: Status/payment badges, confirmation number, order recap, Create Account / View Dashboard CTAs.
States: Success (only state modeled — payment-decline state remains an open follow-up, Section 8).
File: `prototypes/bells-bliss-n-more/order-confirmation.html`

### Screen: Log In
Purpose: AC-05, AC-06, AC-07 — redesigned so guest checkout and account creation are equally visible choices, not a fallback link off a login form.
Role(s): Guest, Registered Customer, Admin
Layout: Three-tab chooser (Continue as Guest / Create Account / Log In, Log In active by default) → tab-specific content (direct CTA for the first two, email/password form for the third) → collapsible staff-login disclosure.
Key elements: Tab control, guest/signup CTA panels, login form, staff disclosure with admin demo link.
States: Each tab's panel shown/hidden via `aria-selected`; staff disclosure collapsed/expanded.
File: `prototypes/bells-bliss-n-more/login.html`

### Screen: Create Account
Purpose: US-06, AC-06.
Role(s): Guest → Registered Customer
Layout: Centered signup form.
Key elements: Name/email/phone/password fields, Create Account button, link to Log In.
States: Default.
File: `prototypes/bells-bliss-n-more/create-account.html`

### Screen: Account Dashboard
Purpose: AC-07, US-09.
Role(s): Registered Customer
Layout: Welcome header + CTA → stacked booking cards.
Key elements: Booking cards (status/payment badges), expandable communication-history log.
States: Comm history collapsed (default) / expanded; upcoming vs. completed variants.
File: `prototypes/bells-bliss-n-more/account-dashboard.html`

### Screen: Reviews *(scope addition — see Section 7)*
Purpose: Customer-facing "View more reviews" destination linked from Home; shows every review, newest first, with the same truncate/Read More pattern as the Home page's featured set.
Role(s): Guest, Individual/Family, Small Business/Org, Registered Customer
Layout: Breadcrumb → heading → reviews grid (same card component as Home) → "Read reviews directly on Google" external link.
Key elements: Review cards (star rating, text, Read More toggle, name, date).
States: Each card's text collapsed/expanded independently.
File: `prototypes/bells-bliss-n-more/reviews.html`

### Screen: Admin Dashboard
Purpose: Authenticated entry point for the Admin role; overview supporting US-11.
Role(s): Admin
Layout: Admin header/nav (now includes Reviews) → stat-card row → upcoming-bookings preview table.
Key elements: Stat cards, preview table linking into Bookings/Booking Detail.
States: Default.
File: `prototypes/bells-bliss-n-more/admin-dashboard.html`

### Screen: Admin Bookings
Purpose: AC-09, AC-10; also bulk booking cancellation/deletion (scope addition — see Section 7).
Role(s): Admin
Layout: Filter bar (Status incl. Cancelled, Event date, Payment — now confirmed horizontal) → bulk-action bar (appears once ≥1 row selected) → full-width table with per-row checkboxes.
Key elements: Filters, select-all checkbox, row checkboxes, "Delete Selected" → inline confirm ("Delete N booking(s)? This can't be undone.") → Cancel/Yes Delete.
States: Unfiltered (default), filtered, empty state, 0/1+/confirming-delete bulk-bar states.
File: `prototypes/bells-bliss-n-more/admin-bookings.html`

### Screen: Admin Booking Detail
Purpose: AC-10, AC-11.
Role(s): Admin
Layout: Header summary → two-column (items/comm-history / customer & order-history sidebar).
Key elements: Items-booked table, communication log, customer contact card, order-history list.
States: Default.
File: `prototypes/bells-bliss-n-more/admin-booking-detail.html`

### Screen: Admin Catalog
Purpose: AC-08 — list view.
Role(s): Admin
Layout: Admin header/nav + full-width table.
Key elements: Catalog table, Edit/Remove actions, Add New Item.
States: Default; item-removed. *(Remove has no confirmation step — open follow-up, Section 8.)*
File: `prototypes/bells-bliss-n-more/admin-catalog.html`

### Screen: Admin Catalog — Edit Item
Purpose: AC-08 — form view.
Role(s): Admin
Layout: Centered form.
Key elements: Name/description/category/price fields, on-sale checkbox toggling sale-price field, Save/Cancel.
States: On-sale checked/unchecked.
File: `prototypes/bells-bliss-n-more/admin-catalog-item-edit.html`

### Screen: Admin Reviews *(scope addition — see Section 7)*
Purpose: Add/Edit/Delete reviews; control which reviews are "Featured" on the Home page (capped at 6 featured).
Role(s): Admin
Layout: Admin header/nav (Reviews now included) → intro note explaining the featured cap → full-width table.
Key elements: Reviewer/rating/review-snippet/date columns, per-row Featured checkbox+badge (toggles live), Edit/Delete actions (Delete requires confirm), Add New Review.
States: Featured/Not-featured badge toggle; delete-confirm dialog.
File: `prototypes/bells-bliss-n-more/admin-reviews.html`

### Screen: Admin Reviews — Edit *(scope addition — see Section 7)*
Purpose: Add or edit a single review's content and featured status.
Role(s): Admin
Layout: Centered form.
Key elements: Reviewer name, star rating select, display date, review text (with a hint not to edit the reviewer's own words), Featured checkbox, Save/Cancel.
States: Default.
File: `prototypes/bells-bliss-n-more/admin-review-edit.html`

---

## 2. Clickable Prototype

All 18 product screens plus one review/navigation tool page are wired together with real navigation. Static files live under `prototypes/bells-bliss-n-more/`.

Product screens:
- `index.html`, `catalog.html`, `item-detail.html`, `planning-services.html`, `cart.html`, `checkout.html`, `order-confirmation.html`, `reviews.html`
- `login.html`, `create-account.html`, `account-dashboard.html`
- `admin-dashboard.html`, `admin-bookings.html`, `admin-booking-detail.html`, `admin-catalog.html`, `admin-catalog-item-edit.html`, `admin-reviews.html`, `admin-review-edit.html`

Prototype tooling (not part of the live product; linked from a small line in every page's footer):
- `prototype-map.html` — full list of every screen, grouped by area, for fast review-time navigation.

---

## 3. Requirement Traceability Matrix

Unchanged from v1 in substance — every Discovery Brief v1 requirement is still satisfied, some by an improved implementation (Log In). No requirement was removed or weakened.

| Requirement ID | Requirement (from Discovery Brief) | Screen(s) | Interaction | Status |
|---|---|---|---|---|
| US-01 | Individual/Family: browse catalog with real prices | catalog.html, item-detail.html | View price on card / detail page | Mapped |
| US-02 | Individual/Family: see sale pricing | catalog.html, item-detail.html | View price row on sale items | Mapped |
| US-03 | Individual/Family: book rentals + planning in one checkout | cart.html, checkout.html | Combined cart → single Place Order | Mapped |
| US-04 | Individual/Family: pay online at checkout | checkout.html | Submit payment box + Place Order | Mapped |
| US-05 | Individual/Family: check out as guest | checkout.html | Guest Checkout tab (default) | Mapped |
| US-06 | Individual/Family: option to create an account | login.html, checkout.html, order-confirmation.html, create-account.html | "Create Account" tab on Log In; checkbox at checkout; post-order CTA | Mapped |
| US-07 | Small Business/Org: browse and book rentals + planning online | catalog.html, planning-services.html, cart.html | Same browse/add-to-cart flow | Mapped |
| US-08 | Small Business/Org: complete booking without manual quote request | checkout.html | Place Order submits directly | Mapped |
| US-09 | Registered customer: view bookings, payments, communications | account-dashboard.html | Booking cards + expandable comm log | Mapped |
| US-10 | Admin: manage catalog and pricing incl. sale pricing | admin-catalog.html, admin-catalog-item-edit.html | Add/Edit/Remove + sale checkbox | Mapped |
| US-11 | Admin: view/manage all bookings and planning appointments | admin-dashboard.html, admin-bookings.html | Preview table / full filterable table | Mapped |
| US-12 | Admin: see payment status per booking | admin-bookings.html, admin-booking-detail.html | Payment badge column / detail view | Mapped |
| US-13 | Admin: see customer info and order history | admin-booking-detail.html | Customer sidebar + order history | Mapped |
| AC-01 | View price without a quote request | catalog.html | Price on card, no quote form | Mapped |
| AC-02 | Sale items show was/now/savings | catalog.html, item-detail.html | Price row | Mapped |
| AC-03 | Rentals + planning in one order, single checkout | cart.html, checkout.html | Combined line items → one Place Order | Mapped |
| AC-04 | Pay for a booking online | checkout.html | Payment box + Place Order | Mapped |
| AC-05 | Complete a booking without an account | login.html, checkout.html | "Continue as Guest" tab; Guest Checkout tab | Mapped |
| AC-06 | Offered account creation during/after checkout | login.html, checkout.html, order-confirmation.html | "Create Account" tab; checkout checkbox; confirmation CTA | Mapped |
| AC-07 | Registered customer logs in and views bookings/payment/comms | login.html, account-dashboard.html | "Log In" tab → dashboard | Mapped |
| AC-08 | Admin adds/edits/removes catalog items, sets/clears sale pricing | admin-catalog.html, admin-catalog-item-edit.html | Add/Edit/Remove, sale checkbox | Mapped |
| AC-09 | Admin views all bookings, filterable by date/status | admin-bookings.html | Filter bar | Mapped |
| AC-10 | Admin views payment status per booking | admin-bookings.html, admin-booking-detail.html | Payment badge / detail line | Mapped |
| AC-11 | Admin views customer contact info and booking/order history | admin-booking-detail.html | Customer sidebar + order history | Mapped |
| AC-12 | Public site doesn't require an account to browse/see pricing | index.html, catalog.html | Fully accessible with Log In optional | Mapped |
| AC-13 | No raw payment card data stored by Bells Bliss N More | checkout.html | Payment box isolated as hosted-processor field | Mapped |

**Coverage: 26 / 26 Discovery Brief v1 requirements Mapped. 0 Unmapped.**

---

## 4. Component Inventory

| Component | Screens it appears on | States it supports |
|---|---|---|
| Site Header (Public) | All public screens | default, cart-count updated |
| Site Header (Admin) | All admin screens | default |
| Footer (simple) | Most non-Home screens | default |
| Footer (Home, two-column w/ newsletter) | Home | default |
| Hero (two-column w/ illustration) | Home | default |
| "How it works" step strip | Home | default |
| Product Card | Catalog | default, on-sale, filtered-out |
| Contained rentals preview grid | Home | default |
| Price Display (current/was/save) | Catalog, Item Detail, Home, Admin Catalog | regular, on-sale |
| Planning Package Card | Planning Services, Home (planning band) | default |
| Filter Bar | Catalog, Admin Bookings | default, filtered, empty-result |
| Cart Line Item Row | Cart | default, qty-changed, removed |
| Order Summary Sidebar | Cart, Checkout | default |
| Account-choice Tabs (Guest/Create Account/Log In) | Log In | tab-active states |
| Checkout Tabs (Guest/Log In) | Checkout | tab-active states |
| Payment Box | Checkout | default |
| Status Badge / Payment Badge | Order Confirmation, Account Dashboard, Admin Bookings, Admin Booking Detail | confirmed/pending/completed/cancelled, paid/unpaid |
| Review Card (star rating, truncate + Read More, name, date) | Home, Reviews, Admin Reviews (as table row) | collapsed, expanded |
| Featured Badge | Admin Reviews | featured, not-featured |
| Bulk Action Bar | Admin Bookings | hidden, N-selected, confirming-delete |
| Booking Card (expandable comm log) | Account Dashboard | collapsed, expanded |
| Data Table | Cart, Admin Bookings, Admin Catalog, Admin Reviews, Admin Booking Detail | default, filtered, empty |
| Stat Card | Admin Dashboard | default |
| Form Field | Cart, Checkout, Log In, Create Account, Admin Catalog Edit, Admin Review Edit | default, focus, required |
| Toast Notification | Catalog, Item Detail, Planning Services | hidden, shown |
| Button (Primary/Secondary/Danger) | All screens | default, hover/focus-visible, disabled |
| Icon-tile (service/package icon) | Home, Planning Services | default |
| Breadcrumb | Most screens | default |
| Prototype-map footer link | All screens (tooling, not product) | default |

---

## 5. Interaction Notes

| Screen or component | Interaction | Behavior |
|---|---|---|
| Catalog, Admin Bookings | Filter dropdown change | Client-side filter updates instantly; empty-state shown if none match. Confirmed to render as a horizontal row on all realistic viewport widths — the earlier vertical-stacking behavior was a genuine CSS bug (`.filter-bar` inheriting `flex-direction: column` from a generic `form` rule), not a responsive design choice, and has been fixed |
| Catalog, Item Detail, Planning Services | Add to Cart / Add to Booking click | Cart badge increments; toast confirms for ~1.8s |
| Home, Reviews | Review "Read more" click | Text expands from a ~4-line clamp to full length; button toggles to "Show less". The button only renders at all if the text actually overflows at 4 lines — short reviews never show a Read More they don't need |
| Home | "View More Reviews" click | Navigates to reviews.html |
| Log In | Tab click (Guest / Create Account / Log In) | Switches visible panel via `aria-selected`/`hidden`; Log In is the default active tab |
| Checkout | Tab click (Guest Checkout / Log In) | Switches visible form panel; only one panel visible at a time |
| Checkout | Place Order submit | Navigates to Order Confirmation (success path only — payment-decline state is an open follow-up) |
| Account Dashboard | "View communication history" click | Expands/collapses per-booking comm log; `aria-expanded` toggles |
| Admin Bookings | Row checkbox / select-all | Updates the bulk-action bar's visible count; bar is hidden entirely at 0 selected |
| Admin Bookings | "Delete Selected" click | Swaps to an inline confirm state ("Delete N booking(s)? This can't be undone.") rather than a native browser confirm dialog; Cancel returns to the default bulk-bar state, "Yes, Delete" removes the selected rows |
| Admin Reviews | Featured checkbox toggle | Badge next to it updates live between "Featured" and "Not featured", no page reload |
| Admin Catalog | Remove click | Row removed immediately, no confirmation — flagged as an open follow-up (Section 8), same class of issue already fixed for Admin Bookings' bulk delete |
| Admin Catalog Edit | "On sale" checkbox | Toggles visibility of the Sale Price field |
| All screens | Header cart icon | Cart count persists across pages via `localStorage`, standing in for real session/cart state |
| All screens | Keyboard navigation | Native interactive elements, Tab-ordered; "Skip to main content" is the first focusable element on every page |
| All screens | Color contrast | Body text exceeds 7:1 on the white page background; interactive links use a darker accent for 4.5:1+ on light backgrounds; status/payment/featured badges always pair color with a text label |

---

## 6. Accessibility Compliance

Unchanged in substance from v1 — the Discovery Brief's "WCAG-conscious UI / OWASP web practices" constraint is still fully addressed; new components follow the same patterns already in place.

| Constraint (from Discovery Brief) | Satisfied by | Where |
|---|---|---|
| Semantic HTML | Landmarks, `<table><th scope>`, `<fieldset>/<legend>` throughout, including the new Reviews/Admin Reviews screens | Component Inventory; every screen file |
| ARIA labeling on interactive controls | Cart icon `aria-label`; filter/tab controls labeled; new: review "Read more" buttons and star ratings (`aria-label="5 out of 5 stars"`); bulk-select checkboxes each carry a descriptive `aria-label` | Component Inventory (Review Card, Bulk Action Bar); Interaction Notes |
| Keyboard navigation | Skip-link on every screen; native, Tab-reachable controls; sitewide `:focus-visible` outline | Interaction Notes ("All screens — Keyboard navigation") |
| Color contrast | Documented ratios hold on the new white background; badges never rely on color alone | Interaction Notes ("All screens — Color contrast") |
| No raw payment data in the UI layer | Checkout's payment section remains visually/structurally isolated as a hosted-processor box | Checkout screen; AC-13 |

No accessibility constraint from the Discovery Brief is left unaddressed.

---

## 7. Scope Additions Beyond Discovery Brief v1 — Flagged, Not Yet Formally Scoped

Two capabilities were built into this prototype at the stakeholder's explicit request during UX review, but **neither traces to a Discovery Brief v1 requirement**. Per the Stratum methodology, a screen or feature with no requirement behind it is speculative scope — normally that means "cut it or send it back through `/discover`." Given the direct instruction to build these now, they've been built, but they should not be treated as confirmed, locked scope going into `/blueprint` without one of:
- A Discovery Brief revision (v2) that formally adds these as requirements with real acceptance criteria, or
- Explicit stakeholder sign-off carried forward as a documented exception.

**1. Customer reviews system** (Home reviews band, `reviews.html`, `admin-reviews.html`, `admin-review-edit.html`)
Open questions that need real answers before `/blueprint`:
- Review sourcing: are reviews entered manually by the admin (copy-pasted from Google, as modeled here), or pulled live via a Google Business API integration? Very different technical builds.
- Is there any moderation/approval step, or does "Featured" alone gate what's public?
- The 6-featured-review cap on the homepage was my own UX recommendation (Section discussion, not a stakeholder-set number) — confirm it's actually the right number.

**2. Booking cancellation / bulk delete** (Admin Bookings bulk-select + delete, "Cancelled" status)
Open questions that need real answers before `/blueprint`:
- Is deletion a soft-delete/archive (recoverable) or a permanent hard delete?
- Who is allowed to do it — any admin, or a restricted role?
- Do deleted/cancelled bookings need to stay in an audit trail (e.g., for tax/accounting records)?

---

## 8. Open Follow-Ups for `/blueprint`

- Payment-decline/error state on Checkout (only the success path is modeled)
- "Delivery same as event address" toggle behavior (checkbox is static in this prototype)
- Confirmation step before Admin Catalog's destructive "Remove" action (Admin Bookings already got this; Admin Catalog still doesn't have it)
- The two scope additions in Section 7, resolved one way or the other before they're built for real
