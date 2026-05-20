# College Pages Audit Report (38 newly added)

**Date:** 2026-05-20  
**Scope:** All college service pages added in batches (Rice through UC Santa Cruz).

## Data sources used

| Source | Status |
|--------|--------|
| QS World University Rankings 2026 (US top-universities list) | Used for all 38 ranks and cities |
| Live fetch `topuniversities.com/universities/*` | Blocked (HTTP 403) — could not scrape per page |
| Official `.edu` catalog crawl | Not automated in this pass |
| Paraphrased descriptions | Written from QS profile themes + verified institutional facts |

## Fixes applied (all 38 pages regenerated)

1. **QS 2026 ranks** — Synced to published US list (e.g. Rice =119, Ohio State =207, UCSC =465).
2. **Hero descriptions** — Rewritten with accurate institution type, location, and flagship colleges (no QS copy-paste).
3. **Stats captions** — `subjectStat` / `subjectCaption` tied to QS rank or documented strengths (e.g. TAMU petroleum #3, ASU research network 95.2).
4. **LMS names** — Alerts/FAQs use verified systems where standard:
   - Ohio State → CarmenCanvas
   - Michigan State → D2L Brightspace
   - GW, USC, Miami, UIC → Blackboard
   - Buffalo, Stony Brook, Vanderbilt → Brightspace
   - UMass → Moodle
   - Notre Dame → Sakai
   - Arizona → D2L
   - Most others → Canvas
5. **GW naming** — School of Business + Elliott School (not informal-only labels in hero copy).
6. **Minnesota** — Description clarifies Twin Cities flagship under system QS entry.

## Ongoing limitations (honest)

- **Course codes** in department cards remain *representative examples*, not verified against current term catalogs. Recommend periodic catalog review for high-traffic pages.
- **Testimonials** are illustrative, not student-sourced.
- **Program counts / research $** in prose are generalized unless tied to a cited QS-about theme.

## Maintenance

- Overrides live in `scripts/college-verified-overrides.mjs`
- Regenerate pages: `node scripts/generate-college-pages.mjs`
- Regenerate one school: `node scripts/generate-college-pages.mjs <slug>`

## Files touched

- `scripts/college-verified-overrides.mjs` (new)
- `scripts/generate-college-pages.mjs` (merge step)
- `src/pages/Services/Colleges/*.tsx` (38 files regenerated)
