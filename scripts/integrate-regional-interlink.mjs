import fs from 'fs';
import path from 'path';

const dir = 'src/pages/Services/regional';
const map = {
  'ArabAssignmentHelp.tsx': 'arab',
  'AusAssignmentHelp.tsx': 'aus',
  'CanadaAssignmentHelp.tsx': 'canada',
  'EuropeAssignmentHelp.tsx': 'europe',
  'NZAssignmentHelp.tsx': 'nz',
  'SgAssignmentHelp.tsx': 'sg',
  'UkAssignmentHelp.tsx': 'uk',
};

const importLine =
  "import RegionalAssignmentInterlink from '../../../components/Services/regional/RegionalAssignmentInterlink';\n";
const alsoRe =
  /      <motion\.section\n        aria-label="Also available in"[\s\S]*?      <\/motion\.section>\n/;
const seoRe =
  /(\n      \{\/\* ── [^\n]+ ASSIGNMENT HELP CONTENT \(SEO\)[^\n]*\n)/;

for (const [file, region] of Object.entries(map)) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');

  if (!src.includes('RegionalAssignmentInterlink')) {
    src = src.replace(
      "import type { LucideIcon } from 'lucide-react';\n",
      `import type { LucideIcon } from 'lucide-react';\n${importLine}`,
    );
  }

  if (alsoRe.test(src)) {
    src = src.replace(
      alsoRe,
      `      <RegionalAssignmentInterlink variant="compact" currentRegion="${region}" />\n`,
    );
  } else {
    console.warn('Also available block not found:', file);
  }

  const featured = `\n      {/* ── REGIONAL INTERLINKING (SEO) ── */}\n      <RegionalAssignmentInterlink variant="featured" currentRegion="${region}" />`;

  if (!src.includes('REGIONAL INTERLINKING (SEO)')) {
    if (seoRe.test(src)) {
      src = src.replace(seoRe, `${featured}$1`);
    } else {
      console.warn('SEO anchor not found:', file);
    }
  }

  fs.writeFileSync(fp, src);
  console.log('Updated', file);
}
