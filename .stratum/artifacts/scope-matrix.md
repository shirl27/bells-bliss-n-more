# Scope Matrix — Bells Bliss N More

Version: v1
Built against: Discovery Brief v2

Purpose: one place to see, per requirement, whether it belongs to MVP, End-to-End (backlog), or both — and separately, whether it's included in the Phase 0 static release. This is a requirement-level view; see `ux-design-matrix.md` (queued, not yet built) for the design-artifact-level view (wireframe/component/interaction per requirement).

## Discovery Brief v1 requirements — all MVP (and therefore also End-to-End)

Every one of these 26 requirements is in scope for MVP. None is Phase 0-complete on its own — Phase 0 only ever covers part of a requirement's flow (e.g. "view real pricing" without "complete a booking"), noted per row.

| ID | Requirement | E2E / MVP / Both | Phase 0 | Notes |
|---|---|---|---|---|
| US-01 | Browse catalog with real prices | Both | Included | catalog.html, item-detail.html ship as-is |
| US-02 | See sale pricing (was/now/save) | Both | Included | Same pages, real pricing preserved |
| US-03 | Book rentals + planning in one checkout | Both | Excluded | No cart in Phase 0 |
| US-04 | Pay online at checkout | Both | Excluded | No payment collection in Phase 0 |
| US-05 | Check out as guest | Both | Excluded | No checkout at all in Phase 0 |
| US-06 | Option to create an account | Both | Excluded | No accounts in Phase 0 |
| US-07 | Small Business/Org: browse and book rentals + planning online | Both | Partially included | Browsing yes; booking is via Call/Email, not online |
| US-08 | Complete booking without manual quote request | Both | Excluded | Phase 0 CTA is explicitly "Call/Email to Book" — a step back toward manual contact, by design, until MVP ships |
| US-09 | Registered customer views bookings/payments/comms | Both | Excluded | No accounts or bookings exist in Phase 0 |
| US-10 | Admin manages catalog and pricing incl. sale pricing | Both | Excluded (no admin UI shipped) | Catalog content in Phase 0 is maintained directly in source, not via an admin panel |
| US-11 | Admin views/manages all bookings and planning appointments | Both | N/A | No bookings exist in Phase 0 |
| US-12 | Admin sees payment status per booking | Both | N/A | No payments exist in Phase 0 |
| US-13 | Admin sees customer info and order history | Both | N/A | No customers/orders exist in Phase 0 |
| AC-01 | View price without a quote request | Both | Included | Core Phase 0 differentiator vs. quote-only competitors |
| AC-02 | Sale items show was/now/savings | Both | Included | |
| AC-03 | Rentals + planning in one order, single checkout | Both | Excluded | |
| AC-04 | Pay for a booking online | Both | Excluded | |
| AC-05 | Complete a booking without an account | Both | Excluded | No booking flow exists yet in Phase 0 |
| AC-06 | Offered account creation during/after checkout | Both | Excluded | |
| AC-07 | Registered customer logs in and views bookings/payment/comms | Both | Excluded | |
| AC-08 | Admin adds/edits/removes catalog items, sets/clears sale pricing | Both | Excluded (no admin UI shipped) | |
| AC-09 | Admin views all bookings, filterable by date/status | Both | N/A | |
| AC-10 | Admin views payment status per booking | Both | N/A | |
| AC-11 | Admin views customer contact info and booking/order history | Both | N/A | |
| AC-12 | Public site doesn't require an account to browse/see pricing | Both | Included | |
| AC-13 | No raw payment card data stored by Bells Bliss N More | Both | N/A | No payment collected in Phase 0 at all |

**MVP coverage: 26/26. Phase 0 coverage: 6 fully included, 1 partial, 19 excluded/N/A by design (Phase 0 is intentionally pre-transactional).**

## Backlog additions — End-to-End only, not in MVP

These were built into the prototype at the stakeholder's request but don't trace to a Discovery Brief requirement. Tracked here, not counted in the 26/26 above.

| Item | E2E / MVP / Both | Phase 0 | Notes |
|---|---|---|---|
| Customer reviews system (Home band, `reviews.html`, `admin-reviews.html`, `admin-review-edit.html`) | E2E only | Home band included (static, real, verbatim content — zero admin/automation involved); dedicated Reviews/Admin Reviews/Admin Review Edit pages excluded | Open: sourcing (manual vs. Google Business API), moderation step, whether the 6-featured cap is stakeholder-confirmed |
| Booking cancellation / bulk-delete (Admin Bookings) | E2E only | N/A (no admin, no bookings in Phase 0) | Open: soft- vs. hard-delete, who's authorized, audit trail |
| Admin hero-editor (`admin-hero-edit.html`) | E2E only | N/A (no admin in Phase 0) | Never traced to a requirement; convenience tooling, not stakeholder-requested scope |
