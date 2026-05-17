import fs from 'fs';
import path from 'path';

const files = [
  'src/pages/Services/UsaAssignmentHelp.tsx',
  ...fs.readdirSync('src/pages/Services/regional').filter((f) => f.endsWith('.tsx')).map((f) => `src/pages/Services/regional/${f}`),
];

const re =
  /\r?\n      \{\/\* ── REGIONAL INTERLINKING \(SEO\) ── \*\/\}\r?\n      <RegionalAssignmentInterlink variant="featured" currentRegion="[^"]+" \/>\r?\n/g;

for (const file of files) {
  const fp = path.join(process.cwd(), file);
  let src = fs.readFileSync(fp, 'utf8');
  const next = src.replace(re, '\n');
  if (next !== src) {
    fs.writeFileSync(fp, next);
    console.log('Removed featured interlink:', file);
  }
}
