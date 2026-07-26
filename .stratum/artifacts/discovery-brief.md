# Discovery Brief — Bells Bliss N More (Event Planning & Rentals Website)

Version: v2
Built against: prototype learnings from `ux-design.md` v2 and the `prototype-review` branch
Changed since v1:
- Added a "Scope Boundary: Phase 0 / MVP / End-to-End" section (below) formalizing a three-tier release structure the prototype had already started to outgrow into.
- The two scope additions flagged in `ux-design.md` v2 §7 (customer reviews, booking cancellation/bulk-delete) — plus a third, the admin hero-editor — are reclassified from "blocking `/blueprint`" to "E2E backlog, resolve when pulled off the backlog for real." They do not block MVP, since MVP is defined as excluding them.
- No change to the original 26 acceptance criteria below — they remain the MVP definition, unmodified.

## Problem Statement
Individuals and small businesses across Burien and the wider King & Snohomish County corridor who plan one-time or occasional events (weddings, birthdays, graduations, baby showers, corporate parties) currently have no local vendor that bundles event planning and equipment rentals into one self-serve, real-pricing, online experience — competitors in the area are either rental-only, quote-request-only, or built for larger corporate-scale events elsewhere (confirmed via prior `/research`). Bells Bliss N More wants a public-facing website that lets customers browse real inventory and pricing, book planning services and rentals together, and pay online end-to-end — automating as much of the booking workflow as possible for both customers and the business.

## Project Archetype
Interactive Application (Web) — user-declared. A native mobile app is a stated future direction, not part of v1.

## User Roles

| Role | Goal | Success Criteria |
|---|---|---|
| Individual/Family Customer | Plan a one-time life event without separately hunting for a planner and a rental company | Can browse real inventory & pricing, see sale pricing clearly, book rentals + planning in one checkout, pay online, get confirmation without a phone call |
| Small Business/Org Customer | Source rental equipment (and optionally planning support) for occasional events without buying/storing it | Same self-serve browse-and-book flow; completes a booking without a manual back-and-forth quote request |
| Guest Customer | Complete a booking quickly without friction | Can browse, book, and pay without creating an account |
| Registered Customer | Manage bookings over time | Can log in, view past/upcoming bookings, payment status, and communication history; faster re-booking |
| Admin (Shirl / staff) | Run the business — inventory, pricing, bookings, payments — from one place | Can manage catalog & sale pricing, view/manage all bookings in one place, see payment status and customer history, without spreadsheets or manual invoicing |

## User Stories
As an Individual/Family customer, I want to browse the rental catalog with real prices so that I know costs upfront.
As an Individual/Family customer, I want to see sale pricing (original price struck through, sale price, amount saved) so that I know when I'm getting a deal.
As an Individual/Family customer, I want to book rental items and a planning service together in one checkout so that I don't have to coordinate two vendors.
As an Individual/Family customer, I want to pay online at checkout so that I don't have to wait for a mailed invoice.
As an Individual/Family customer, I want to check out as a guest so that I can book quickly without an account.
As an Individual/Family customer, I want the option to create an account so that future bookings are faster and I can see my history.
As a Small Business/Org customer, I want to browse and book rental equipment (and optionally planning support) online so that I don't have to buy or store equipment I use infrequently.
As a Small Business/Org customer, I want to complete a booking without a manual quote request so that I can plan on my own timeline.
As a Registered customer, I want to view my past bookings, payments, and communications so that I have a record without digging through email.
As an Admin, I want to manage the catalog and pricing (including sale pricing) so that the public site always reflects current inventory.
As an Admin, I want to view and manage all bookings and planning appointments in one place so that I'm not tracking them manually.
As an Admin, I want to see payment status per booking so that I know what's been paid without a separate system.
As an Admin, I want to see customer info and order history so that I can give repeat customers personalized service.

## Acceptance Criteria
1. Customers can view a rental item's current price without submitting a quote request.
2. When an item is on sale, the catalog shows the original price struck through, the sale price, and the amount/percent saved.
3. A customer can add both rental items and a planning service to a single order and complete checkout in one flow.
4. A customer can pay for a booking online during checkout.
5. A customer can complete a booking without creating an account (guest checkout).
6. A customer is offered the option to create an account during or after checkout.
7. A registered customer can log in and view past/upcoming bookings, payment status, and communication history.
8. An authenticated admin can add, edit, and remove catalog items and set/clear sale pricing.
9. An authenticated admin can view all bookings (rental + planning) in one place, filterable by date/status.
10. An authenticated admin can view payment status per booking.
11. An authenticated admin can view a customer's contact info and booking/order history.
12. The public site does not require an account to browse the catalog or view pricing.
13. No raw payment card data is stored directly by Bells Bliss N More's own systems.

## Scope Boundary: Phase 0 / MVP / End-to-End

Three release tiers, each a live, linked prototype (`/phase0/`, `/mvp/`, `/end-2-end/`):

- **MVP** = exactly the 26 acceptance criteria below — the full self-serve browse → combined cart/checkout → real online payment → guest-or-registered → admin catalog/bookings flow. This is the target for `/blueprint` and the first real build.
- **End-to-End** = MVP plus everything currently prototyped beyond it: a customer reviews system (Home reviews band, dedicated Reviews page, Admin Reviews management), booking cancellation/bulk-delete in Admin Bookings, and an admin hero-editor for the homepage. None of these trace to a requirement below — they were built at the stakeholder's request during UX review, ahead of formal scoping. They remain a live, ongoing backlog/blueprint rather than blocking MVP; each needs real answers (sourcing/moderation for reviews, soft- vs. hard-delete and audit trail for cancellation) before it gets built for real, but those answers are needed only when it's pulled off the backlog, not before MVP ships.
- **Phase 0** = a static, zero-automation release the stakeholder wants live *before* MVP, to establish an online presence quickly and buy time. Scoped as Home + Catalog + Item Detail + Planning Services with real pricing shown (preserving the core differentiator vs. quote-request-only competitors), "Add to Cart"/"Add to Booking" replaced by "Call to Book"/email contact, and a simple Request Info form — no cart, checkout, accounts, or admin panel. Phase 0 does not introduce new requirements; it is a strict subset of MVP's already-approved scope plus one CTA-behavior change, so it is not tracked as a separate requirement set (see the Scope Matrix for the exact per-requirement Phase 0 applicability).

## Constraints
- Greenfield build — no existing systems to integrate with.
- Technology preference stated: React/Next.js with TypeScript — final stack decision deferred to `/tech-design`.
- No stated budget or timeline constraint.
- No formal compliance/regulatory framework named; baseline security and accessibility best practices apply regardless (e.g., WCAG-conscious UI, standard OWASP web practices).
- Online payment is in scope for v1; raw card data is never stored directly — handled via a PCI-compliant third-party payment processor (specific processor deferred to `/tech-design`).
- Data collected: name, phone, email, event date, event/delivery address, payment info (via processor); recommended additions: event type, estimated guest count, delivery address (if different), special requests/notes; registered accounts also store hashed credentials and booking/communication history.
- Integration categories needed: payment processor, transactional email, scheduling/calendar for planning-service bookings; recommended for consideration: SMS/text reminders, delivery-area (King & Snohomish) validation. Specific vendors deferred to `/tech-design`.
- Admin access requires authentication; public site supports guest checkout and optional account registration.

## Non-Goals (v1)
- Large-scale corporate/production-scale events, festival tenting, staffing/security services.
- Native mobile app (planned for a future phase).
- Quote-request-only pricing model.
- Integration with any pre-existing business system (none exist).

## UX Reference
No approved interactive mockup/prototype yet. Three brand/style references provided and reviewed: original flyer (cream/gold/olive palette, wreath "B" monogram logo, serif display headline + clean sans-serif body), a redesigned flyer concept (hero section "Celebrations Made Beautiful," gold "BOOK TODAY!" CTA, two-column services list, testimonial line, contact/social footer), and an invoice redesign (same brand system, itemized line-item table, gold accent, Burien local tax line, currently informal email-based payment collection). These will inform brand direction in `/ux-design`; no full site mockup exists yet.

## Open Questions
None.
