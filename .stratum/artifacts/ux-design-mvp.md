# UX Artifact Set — Bells Bliss N More — MVP

Version: v1
Built against: Discovery Brief v2, trimmed from `ux-design.md` v2

MVP is exactly Discovery Brief v2's 26 acceptance criteria — the full self-serve browse → combined cart/checkout → real online payment → guest-or-registered → admin catalog/bookings flow — with the three End-to-End-only backlog additions (customer reviews, booking cancellation/bulk-delete, admin hero-editor) removed. See `scope-matrix.md` for the per-requirement breakdown and `ux-design.md` for the full End-to-End screen set these are trimmed from.

Clickable Prototype: `https://gbenninful.github.io/bells-bliss-n-more/mvp/` (generated from the shared source tree in `prototypes/bells-bliss-n-more/` via `scripts/build-prototype-variants.js` — not a hand-maintained copy)

---

## 1. Screens in MVP

15 screens, unchanged in layout/behavior from `ux-design.md` v2 except where noted:

| Screen | Purpose | File |
|---|---|---|
| Home | Browse entry, AC-12 | `index.html` (reviews band removed — see Excluded, below) |
| Catalog | AC-01, AC-02, AC-12, US-01, US-02 | `catalog.html` |
| Item Detail | AC-01, AC-02, US-01, US-02 | `item-detail.html` |
| Planning Services | US-03, US-07, US-08, AC-03 | `planning-services.html` |
| Cart | AC-03 | `cart.html` |
| Checkout | AC-03, AC-04, AC-05, AC-06, AC-13 | `checkout.html` |
| Order Confirmation | AC-04 success state, AC-06 continuation | `order-confirmation.html` |
| Log In | AC-05, AC-06, AC-07 | `login.html` (admin nav still links here via demo disclosure) |
| Create Account | US-06, AC-06 | `create-account.html` |
| Account Dashboard | AC-07, US-09 | `account-dashboard.html` |
| Admin Dashboard | Admin entry point, US-11 | `admin-dashboard.html` (Reviews / Home Page nav entries removed) |
| Admin Bookings | AC-09, AC-10 | `admin-bookings.html` (bulk-select/delete removed — see Excluded) |
| Admin Booking Detail | AC-10, AC-11 | `admin-booking-detail.html` (Reviews / Home Page nav entries removed) |
| Admin Catalog | AC-08 — list view | `admin-catalog.html` (Reviews / Home Page nav entries removed) |
| Admin Catalog — Edit Item | AC-08 — form view | `admin-catalog-item-edit.html` (Reviews / Home Page nav entries removed) |

## 2. Excluded from MVP (End-to-End backlog)

- **Reviews band** on Home, plus the standalone `reviews.html`, `admin-reviews.html`, `admin-review-edit.html` screens — not shipped in this tier at all.
- **Bulk-select / "Delete Selected" / cancellation** in Admin Bookings — the checkbox column, bulk-action bar, and the draft-scope note are all removed; every other Admin Bookings behavior (filtering, viewing) is unchanged.
- **Admin hero-editor** (`admin-hero-edit.html`) and its nav entry.

## 3. Requirement Traceability Matrix

Identical to `ux-design.md` v2 §3 — reproduced here since it's this tier's actual scope, not a superset.

**Coverage: 26 / 26 Discovery Brief v2 requirements Mapped. 0 Unmapped.** (See `ux-design.md` for the full per-requirement screen/interaction table — unchanged for MVP's 15 screens.)

## 4. Phase 0 configuration (delta only — Phase 0 does not get its own design doc)

Phase 0 is a further-trimmed, zero-automation subset of MVP's already-approved scope, not a new requirement set, so it's documented here as a delta rather than a standalone artifact:

- **Screens shipped**: Home, Catalog, Item Detail, Planning Services, Privacy Policy only (4 of the 15 above, plus the legal page).
- **CTA swap**: "Add to Cart" / "Add to Booking" buttons are removed. Catalog and Planning Services each get one consolidated "Call to Book" / "Email" CTA at the bottom of the page (not one per card — a `tel:` link doesn't vary by item, so per-card repetition was pure redundancy). Item Detail keeps its own CTA since it's a single-item page, with the item name folded into the email subject line. See `ux-spec.md` for the exact behavior.
- **Removed sitewide**: header cart icon, the auth-state header slot ("Hello, Sign in" — it renders a real link to `login.html`, which Phase 0 doesn't ship), "View Cart & Continue" links, the Prototype Map footer link (not part of Phase 0's file set).
- **Removed from Catalog specifically**: "View Details" links — every card pointed to the same hardcoded `item-detail.html` regardless of which item was clicked (a pre-existing prototype limitation, not introduced by this split). Tolerable in MVP/End-to-End since "Add to Cart" already works correctly per item without it; removed in Phase 0, where it would have been each card's only action. See `scope-matrix.md`'s "Considered and rejected for Phase 0" for the full reasoning.
- **Kept as-is**: the Home reviews band (static, real, verbatim content — no admin dependency, so none of the reviews backlog's open questions apply).
- **Added**: a Request Info form on Home (`mailto:`-prefilled, zero backend) — see `ux-spec.md`.
- Generated automatically from the same source tree via `scripts/build-prototype-variants.js`; not a hand-maintained fork.
