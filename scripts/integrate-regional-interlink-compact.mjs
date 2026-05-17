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
  /      <motion\.section\r?\n        aria-label="Also available in"[\s\S]*?      <\/motion\.section>\r?\n/;

for (const [file, region] of Object.entries(map)) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');

  if (!src.includes('RegionalAssignmentInterlink')) {
    src = src.replace(
      /import type \{ LucideIcon \} from 'lucide-react';\r?\n/,
      `import type { LucideIcon } from 'lucide-react';\n${importLine}`,
    );
  }

  if (src.includes('aria-label="Also available in"')) {
    src = src.replace(
      alsoRe,
      `      <RegionalAssignmentInterlink variant="compact" currentRegion="${region}" />\r\n`,
    );
    if (src.includes('aria-label="Also available in"')) {
      console.warn('Still has Also available block:', file);
    } else {
      console.log('Compact interlink applied:', file);
    }
  } else if (src.includes('variant="compact"')) {
    console.log('Already has compact:', file);
  }

  if (!src.includes('RegionalAssignmentInterlink')) {
    console.warn('Missing import:', file);
  }

  fs.writeFileSync(fp, src);
}
