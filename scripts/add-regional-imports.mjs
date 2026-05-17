import fs from 'fs';
import path from 'path';

const dir = 'src/pages/Services/regional';
const imp =
  "import RegionalAssignmentInterlink from '../../../components/Services/regional/RegionalAssignmentInterlink';\n";

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'))) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');
  if (!src.includes('import RegionalAssignmentInterlink')) {
    src = src.replace(
      /import type \{ LucideIcon \} from 'lucide-react';\r?\n/,
      `import type { LucideIcon } from 'lucide-react';\n${imp}`,
    );
    fs.writeFileSync(fp, src);
    console.log('import added', file);
  }
}

const usaCta = 'src/components/Services/UsaAssignmentFinalCta.tsx';
let usa = fs.readFileSync(usaCta, 'utf8');
const usaAlsoRe =
  /      <motion\.section\r?\n        aria-label="Also available in"[\s\S]*?      <\/motion\.section>\r?\n/;
if (usaAlsoRe.test(usa)) {
  usa = usa.replace(
    usaAlsoRe,
    '      <RegionalAssignmentInterlink variant="compact" currentRegion="usa" />\r\n',
  );
  fs.writeFileSync(usaCta, usa);
  console.log('UsaAssignmentFinalCta compact applied');
}
