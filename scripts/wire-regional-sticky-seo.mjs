import fs from 'fs';
import path from 'path';

const dir = 'src/pages/Services/regional';
const map = {
  'CanadaAssignmentHelp.tsx': 'canada',
  'AusAssignmentHelp.tsx': 'aus',
  'NZAssignmentHelp.tsx': 'nz',
  'SgAssignmentHelp.tsx': 'sg',
  'ArabAssignmentHelp.tsx': 'arab',
  'EuropeAssignmentHelp.tsx': 'europe',
};

const importLine =
  "import RegionalAssignmentStickySeoSection from '../../../components/Services/regional/RegionalAssignmentStickySeoSection';\n";

function removeBetween(src, startMarker, endMarker) {
  const start = src.indexOf(startMarker);
  const end = src.indexOf(endMarker, start);
  if (start === -1 || end === -1) return { src, ok: false };
  return { src: src.slice(0, start) + src.slice(end), ok: true };
}

for (const [file, region] of Object.entries(map)) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');

  if (!src.includes('import RegionalAssignmentStickySeoSection')) {
    src = src.replace(
      /import type \{ LucideIcon \} from 'lucide-react';\r?\n/,
      `import type { LucideIcon } from 'lucide-react';\n${importLine}`,
    );
  }

  let r = removeBetween(src, 'type ScrollableContentCard', 'type UnifiedPriceCalculatorProps');
  if (r.ok) {
    src = r.src;
    console.log('Removed ScrollableContentPanel:', file);
  }

  r = removeBetween(src, 'const cardsData', '/** Local assets under /public/images');
  if (!r.ok) {
    r = removeBetween(src, '/**\n * Paste your scrollable SEO cards', '/** Local assets under /public/images');
  }
  if (r.ok) {
    src = r.src;
    console.log('Removed seo section:', file);
  }

  src = src.replace(
    /<NzAssignmentHelpSeoSection \/>/g,
    `<RegionalAssignmentStickySeoSection region="${region}" />`,
  );

  fs.writeFileSync(fp, src);
  console.log('Done', file);
}
