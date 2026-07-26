# Scope Tier Criteria — Phase 0 / MVP / End-to-End

Version: v1
Built against: Discovery Brief v2, scope-matrix.md v1, and direct experience building Bells Bliss N More's Phase 0 release

Purpose: this project's own Scope Boundary section (`discovery-brief.md`) and Scope Matrix answer "what belongs in which tier" for Bells Bliss N More specifically. This document is the generalized version — criteria for defining Phase 0 / MVP / End-to-End (or any future scope tiers) on other Stratum-built applications. It's explicitly a candidate input for updating the Stratum methodology itself, not a change to it — no Stratum skill files were edited to produce this; it's a standing note for whenever that update happens.

---

## 1. What a Scope Tier actually is

A Scope Tier is not a fixed name ("Phase 0," "MVP") — it's a set defined by four properties:

1. **Which confirmed requirements it includes** (a subset of a Discovery Brief's acceptance criteria).
2. **Whether it introduces any *new* requirement.** If not, it inherits documentation from the tier it's a subset of, rather than forking a parallel artifact set.
3. **A tier-integrity check**, run against every screen *and every sentence of copy* (see §3) — not assumed from the tier's stated intent.
4. **How it's technically derived** from whatever tier it's a subset of — shared source + mechanical generation, not a hand-maintained fork.

A Scope Matrix (requirement × tier) is the artifact that answers (1)–(2). A tier-integrity checklist (§3) is what answers (3), and didn't exist as a formal step until it was needed on this project.

## 2. Principles established through direct agreement

- **MVP is defined by requirements, not by what's already been built.** It's exactly the acceptance criteria in a confirmed Discovery Brief — no more, no less. Anything without a traced requirement is backlog by default, no matter how polished it is or who asked for it mid-review.
- **End-to-End is the canonical backlog; MVP is a pull from it, not a parallel fork.** MVP should never grow its own scope independent of what End-to-End already defines.
- **Documentation is proportional to novelty.** A tier that introduces zero new requirements relative to its parent tier doesn't get its own Discovery Brief / UX design doc / traceability matrix — it gets deltas noted on the existing ones. Full artifacts are earned by actual new scope, not by existing as a named release.
- **Derive tiers, don't duplicate them.** One source tree, tiers generated mechanically from it (a marker convention + build script, in this project's case). This exists specifically to prevent the drift that hand-maintained forks guarantee over time — a bug fixed in one copy and forgotten in another.
- **Backlog items carry an unblocking condition, not just an open question.** "Review sourcing is undecided" doesn't unblock anything. "Undecided, and doesn't need deciding until it's pulled off the backlog for real" does. Every deferred item should state what triggers it needing an answer.

## 3. The tier-integrity check (previously implicit — this is the real lesson)

Every one of these was violated at least once while building Bells Bliss N More's Phase 0, despite careful screen-level and control-level scoping:

- **Nothing in a tier may reference, imply, or link to a capability that tier doesn't ship.** Not just visible controls (a cart icon) — also links that only render at runtime (an auth-state slot that resolves to a real `href="login.html"` at render time, in a tier that doesn't ship a login page) and copy that presupposes a flow ("real prices, one checkout" / "pick your date, pay online" in a tier with no checkout).
- **Copy is scope, exactly as much as a screen or a button is.** Screens and interactive controls tend to get scoped carefully; sentences don't, by default. A tier-boundary pass has to explicitly sweep marketing and instructional copy, not just the interactive surface.
- **A "zero automation" (or any tier-wide) claim is only true if it's re-verified per control, not inherited from the tier's stated intent.** It's easy to correctly build the one control you were focused on (a mailto-based contact form) while incorrectly asserting an unrelated control (an auth slot) is "inert" without actually checking what it renders.
- **Verification must test for absence, not only presence.** Confirming the right things exist (the correct CTA text, the right buttons) is a different pass from confirming nothing present points at, or claims, something that isn't shipped. The second pass doesn't happen automatically as a side effect of the first — it has to be run deliberately, and ideally by someone looking at the tier fresh (in this project's case, stakeholder review of the raw output is what actually caught it).

## 4. Process / decision-authority criteria

- **Verify hosting, CI, and environment constraints during exploration — before they're written into an approved plan**, not after a push fails. A deploy-branch strategy that looks reasonable on paper can be silently incompatible with an existing environment protection rule; check the actual constraint before designing around an assumption.
- **Decision authority splits cleanly along one line**: choices with stakeholder-facing consequences (which link a stakeholder receives, whether to add a new capability, what a tier excludes) get asked. Internal implementation choices with no externally visible tradeoff (a marker naming convention, generating tiers from one source vs. another, adding a `.gitignore` entry) get decided and flagged, not asked. Conflating the two either stalls on trivia or slides real scope decisions through without a confirm.

## 5. Applying this to a new Stratum project

When defining scope tiers on a future project:

1. Confirm the Discovery Brief first — a Scope Tier can't be defined against requirements that aren't confirmed yet.
2. Build the Scope Matrix (requirement × tier) before touching any design or prototype artifact — it's the cheapest place to catch "this doesn't trace to anything" before it gets built.
3. For any tier smaller than the full confirmed scope (a "Phase 0"-style release), run the §3 integrity check explicitly as its own pass — screens, controls, *and* copy — rather than assuming careful screen-level scoping covers it.
4. Prefer one source artifact set with mechanically-derived tier variants over hand-maintained parallel copies, from the first tier onward — retrofitting this after drift has already started costs more than starting with it.
5. Check deployment/hosting constraints for whatever tier-serving mechanism is planned (subpaths, environments, branch policies) before finalizing that mechanism in a plan a stakeholder signs off on.
