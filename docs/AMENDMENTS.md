# Project Amendments Log

- Purpose: Central place to record non-code decisions, pricing rule changes, and rationale.
- Scope: Pricing rules, UX decisions, API contracts, content, and operational notes that affect behavior.

## How to Use
- Add a dated entry for every change.
- Include: context, decision, impacted files/areas, and migration steps if any.

---

## 2025-10-10 – Pricing calculation unification
- Context: Switching academic level to "High School" or "University" produced $0.00 due to legacy fallback.
- Decision: Remove legacy `defaultPriceTable`/discipline fallback. Use `priceConfig[level][deadline]` exclusively; price = base × urgent; spacing "single" doubles total.
- Impacted Areas: `src/pages/Order/OrderNow.tsx`, `src/pages/Order/OrderForm.tsx`, `src/pages/Dashboard/NewOrder.tsx`.
- Notes: Prevents key mismatches; aligns with foundational pricing rules.

---

## Template (copy for future entries)
- Date:
- Title:
- Context:
- Decision:
- Impacted Areas:
- Rollout/Migration:
- Owner:

---

## Notes
- Planned: Change pricing logic in future to support tiered subject multipliers and regional currency factors while keeping `priceConfig` as the single source of truth. Target: Q4 2025. Owner: Pricing/PM.
- Planned: Centralize `priceConfig` into a shared module (e.g., `src/lib/pricing.ts`) and add unit tests plus E2E coverage for price calculations across levels, deadlines, spacing, and pages.


