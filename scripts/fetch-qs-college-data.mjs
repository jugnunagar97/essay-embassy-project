/**
 * Fetches TopUniversities profile pages and extracts QS rank + about summary.
 * Usage: node scripts/fetch-qs-college-data.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "qs-audit-results.json");

const SLUGS = [
  "rice-university",
  "texas-am-university",
  "university-southern-california",
  "michigan-state-university",
  "arizona-state-university",
  "emory-university",
  "ohio-state-university",
  "university-maryland-college-park",
  "university-minnesota-system",
  "university-florida",
  "university-rochester",
  "dartmouth-college",
  "university-massachusetts-amherst",
  "vanderbilt-university",
  "north-carolina-state-university",
  "university-virginia",
  "university-pittsburgh",
  "georgetown-university",
  "university-arizona",
  "university-california-irvine",
  "case-western-reserve-university",
  "university-notre-dame",
  "university-colorado-boulder",
  "indiana-university-bloomington",
  "university-miami",
  "rutgers-university-new-brunswick",
  "tufts-university",
  "university-illinois-chicago-uic",
  "george-washington-university",
  "virginia-polytechnic-institute-state-university",
  "northeastern-university",
  "university-buffalo-suny",
  "washington-state-university",
  "university-california-riverside",
  "iowa-state-university",
  "stony-brook-university-state-university-new-york",
  "colorado-state-university",
  "university-california-santa-cruz",
];

function parseQsHtml(html, slug) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  let qsRank = null;
  const rankPatterns = [
    /#\s*(=?\d+)\s*QS\s*World\s*University\s*Rank/i,
    /QS\s*World\s*University\s*Rankings[^#]*#\s*(=?\d+)/i,
    /World\s*University\s*Rankings\s*(\d{4})[^#]*#\s*(=?\d+)/i,
  ];
  for (const re of rankPatterns) {
    const m = text.match(re);
    if (m) {
      qsRank = m[1].startsWith("=") ? `=${m[1].slice(1)}` : `#${m[1]}`;
      break;
    }
  }
  if (!qsRank) {
    const m2 = text.match(/###\s*#?\s*(=?\d{2,3})\s*QS/i);
    if (m2) qsRank = m2[1].startsWith("=") ? `=${m2[1].slice(1)}` : `#${m2[1]}`;
  }

  let about = "";
  const aboutMatch = text.match(
    /About\s+(.+?)(?:Read more|Available programmes|Bachelor|Master|Undergrad|Postgrad|$)/i
  );
  if (aboutMatch) {
    about = aboutMatch[1].slice(0, 600).trim();
  }

  let location = "";
  const locMatch = text.match(
    /United States[^.]*?([A-Za-z .'-]+),\s*United States/i
  );
  if (locMatch) location = locMatch[1].trim();

  return { slug, qsRank, about: about.slice(0, 500), location, fetched: true };
}

async function fetchSlug(slug) {
  const url = `https://www.topuniversities.com/universities/${slug}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) return { slug, fetched: false, error: `HTTP ${res.status}` };
    const html = await res.text();
    return parseQsHtml(html, slug);
  } catch (e) {
    return { slug, fetched: false, error: String(e.message || e) };
  }
}

const results = [];
for (const slug of SLUGS) {
  process.stderr.write(`Fetching ${slug}...\n`);
  const data = await fetchSlug(slug);
  results.push(data);
  await new Promise((r) => setTimeout(r, 800));
}

fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`Wrote ${outPath} (${results.filter((r) => r.fetched && r.qsRank).length}/${SLUGS.length} with rank)`);
