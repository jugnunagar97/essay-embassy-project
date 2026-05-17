import fs from 'fs';

const files = [
  'src/pages/Services/regional/CanadaAssignmentHelp.tsx',
  'src/pages/Services/regional/AusAssignmentHelp.tsx',
  'src/pages/Services/regional/NZAssignmentHelp.tsx',
  'src/pages/Services/regional/SgAssignmentHelp.tsx',
  'src/pages/Services/regional/ArabAssignmentHelp.tsx',
  'src/pages/Services/regional/EuropeAssignmentHelp.tsx',
  'src/pages/Services/regional/UkAssignmentHelp.tsx',
];

const orphanStart = '\n                <h4 className="mb-2 text-base font-bold text-[#0B1F42] sm:text-xl">{service.title}</h4>';

for (const p of files) {
  let s = fs.readFileSync(p, 'utf8');
  const marker = '<AssignmentHelpSpecializationsGrid services={services} />';
  const idx = s.indexOf(marker);
  if (idx === -1) {
    console.log('NO GRID', p);
    continue;
  }
  const orphanIdx = s.indexOf(orphanStart, idx);
  if (orphanIdx === -1) {
    console.log('ALREADY CLEAN', p);
    continue;
  }
  const closeIdx = s.indexOf('\n        </div>', orphanIdx);
  if (closeIdx === -1) {
    console.log('NO CLOSE', p);
    continue;
  }
  s = s.slice(0, idx + marker.length) + s.slice(closeIdx);
  fs.writeFileSync(p, s);
  console.log('FIXED', p);
}
