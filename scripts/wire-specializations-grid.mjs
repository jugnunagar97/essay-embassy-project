import fs from 'fs';

const gridNew = '          <AssignmentHelpSpecializationsGrid services={services} />';

const gridPattern = `          <motion.div className="mx-auto grid min-w-0 max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                whileHover={{ y: -4 }}
                className={\`group relative flex min-h-full flex-col rounded-2xl border-2 border-slate-100 bg-white p-5 transition-all hover:border-[#D4A853] hover:shadow-xl sm:p-7 lg:col-span-2 \${
                  index === 3 ? 'lg:col-start-2' : ''
                } \${index === 4 ? 'lg:col-start-4' : ''} \${
                  index === services.length - 1
                    ? 'sm:col-span-2 sm:w-full sm:max-w-md sm:justify-self-center lg:max-w-none lg:justify-self-stretch'
                    : ''
                }\`}
              >
                <motion.div className="mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1652A0] transition-colors group-hover:bg-[#0B1F42] group-hover:text-white sm:h-12 sm:w-12">
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h4 className="mb-2 text-base font-bold text-[#0B1F42] sm:text-xl">{service.title}</h4>
                <p className="flex-1 text-sm leading-relaxed text-slate-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>`;

// Read exact block from Canada (source of truth)
const canada = fs.readFileSync('src/pages/Services/regional/CanadaAssignmentHelp.tsx', 'utf8');
const start = canada.indexOf('          <div className="mx-auto grid');
const end = canada.indexOf('          </div>', start) + '          </div>'.length;
const exactBlock = canada.slice(start, end);
console.log('Block length', exactBlock.length);
console.log('Icon tag', exactBlock.includes('<div className="mb-4') ? 'motion.div' : 'div');

const files = [
  'src/pages/Services/UsaAssignmentHelp.tsx',
  'src/pages/Services/regional/CanadaAssignmentHelp.tsx',
  'src/pages/Services/regional/AusAssignmentHelp.tsx',
  'src/pages/Services/regional/NZAssignmentHelp.tsx',
  'src/pages/Services/regional/SgAssignmentHelp.tsx',
  'src/pages/Services/regional/ArabAssignmentHelp.tsx',
  'src/pages/Services/regional/EuropeAssignmentHelp.tsx',
  'src/pages/Services/regional/UkAssignmentHelp.tsx',
];

for (const p of files) {
  let s = fs.readFileSync(p, 'utf8');
  if (!s.includes(exactBlock)) {
    console.log('GRID NOT FOUND:', p);
    continue;
  }
  s = s.replace(exactBlock, gridNew);

  const imp =
    p.includes('/regional/')
      ? "import AssignmentHelpSpecializationsGrid from '../../../components/Services/AssignmentHelpSpecializationsGrid';"
      : "import AssignmentHelpSpecializationsGrid from '../../components/Services/AssignmentHelpSpecializationsGrid';";
  const after = p.includes('/regional/')
    ? "import RegionalAssignmentInterlink from '../../../components/Services/regional/RegionalAssignmentInterlink';"
    : "import UnifiedPriceCalculator from '../../components/Services/UnifiedPriceCalculator';";

  if (!s.includes(imp)) {
    s = s.replace(after, `${after}\n${imp}`);
  }

  fs.writeFileSync(p, s);
  console.log('OK', p);
}
