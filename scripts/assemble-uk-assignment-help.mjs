/**
 * Merges USA assignment page + inlined service modules into UkAssignmentHelp.tsx.
 * Run: node scripts/assemble-uk-assignment-help.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

const scrollPanel = read('src/components/Services/ScrollableContentPanel.tsx')
  .replace("import React from 'react';\r\n", '')
  .replace("import React from 'react';\n", '')
  .replace(
    "import type { ScrollableContentCard } from './scrollableContentPanel.types';\r\n",
    "type ScrollableContentCard = { id: string | number; Icon: import('lucide-react').LucideIcon; heading: string; body: string };\r\n"
  )
  .replace(
    "import type { ScrollableContentCard } from './scrollableContentPanel.types';\n",
    "type ScrollableContentCard = { id: string | number; Icon: import('lucide-react').LucideIcon; heading: string; body: string };\n"
  )
  .replace('export type ScrollableContentPanelProps', 'type ScrollableContentPanelProps')
  .replace('export default ScrollableContentPanel;\r\n', '')
  .replace('export default ScrollableContentPanel;\n', '');

const calculator = read('src/components/Services/UnifiedPriceCalculator.tsx')
  .replace('export default function UnifiedPriceCalculator', 'function UnifiedPriceCalculator');

const seoSection = read('src/components/Services/UsaAssignmentHelpSection.tsx')
  .replace("import React from 'react';\r\n", '')
  .replace("import React from 'react';\n", '')
  .replace("import ScrollableContentPanel from './ScrollableContentPanel';\r\n", '')
  .replace("import ScrollableContentPanel from './ScrollableContentPanel';\n", '')
  .replace("import type { ScrollableContentCard } from './scrollableContentPanel.types';\r\n", '')
  .replace("import type { ScrollableContentCard } from './scrollableContentPanel.types';\n", '')
  .replace('export const UsaAssignmentHelpSection', 'function UkAssignmentHelpSeoSection');

const authentic = read('src/components/Services/AuthenticTestimonials.tsx').replace(
  'export default function AuthenticTestimonials',
  'function AuthenticTestimonials'
);

const whyProof = read('src/components/Services/WhyEssayEmbassyProof.tsx').replace(
  'export default function WhyEssayEmbassyProof',
  'function WhyEssayEmbassyProof'
);

const faq = read('src/components/Services/UsaAssignmentFaq.tsx').replace(
  'export default function UsaAssignmentFaq',
  'function UkAssignmentFaqSection'
);

let finalCta = read('src/components/Services/UsaAssignmentFinalCta.tsx').replace(
  'export default function UsaAssignmentFinalCta',
  'function UkAssignmentFinalCtaSection'
);
finalCta = finalCta.replace(
  "{ flag: '🇬🇧', label: 'Assignment Help UK', link: '#' }",
  "{ flag: '🇬🇧', label: 'Assignment Help UK', link: '/uk/assignment-help' }"
);
finalCta = finalCta.replace(
  "{ flag: '🇨🇦', label: 'Assignment Help Canada', link: '#' }",
  "{ flag: '🇨🇦', label: 'Assignment Help Canada', link: '/canada/assignment-help' }"
);
finalCta = finalCta.replace(
  "{ flag: '🇦🇺', label: 'Assignment Help Australia', link: '#' }",
  "{ flag: '🇦🇺', label: 'Assignment Help Australia', link: '/aus/assignment-help' }"
);

const inlinedBlock = `
// =============================================================================
// INLINED MODULES (UK page monolith — localize copy/schema in a follow-up pass)
// =============================================================================

${scrollPanel}

${calculator}

${seoSection}

${authentic}

${whyProof}

${faq}

${finalCta}

`;

let page = read('src/pages/Services/regional/UkAssignmentHelp.tsx');

page = page.replace(
  /\r?\nimport AuthenticTestimonials from '\.\.\/\.\.\/components\/Services\/AuthenticTestimonials';/,
  ''
);
page = page.replace(
  /\r?\nimport UsaAssignmentFinalCta from '\.\.\/\.\.\/components\/Services\/UsaAssignmentFinalCta';/,
  ''
);
page = page.replace(
  /\r?\nimport UnifiedPriceCalculator from '\.\.\/\.\.\/components\/Services\/UnifiedPriceCalculator';/,
  ''
);
page = page.replace(
  /\r?\nimport \{ UsaAssignmentHelpSection \} from '\.\.\/\.\.\/components\/Services\/UsaAssignmentHelpSection';/,
  ''
);
page = page.replace(/\r?\nimport UsaAssignmentFaq from '\.\.\/\.\.\/components\/Services\/UsaAssignmentFaq';/, '');
page = page.replace(
  /\r?\nimport WhyEssayEmbassyProof from '\.\.\/\.\.\/components\/Services\/WhyEssayEmbassyProof';/,
  ''
);

page = page.replace(
  /import type \{ LucideIcon \} from 'lucide-react';\r?\n/,
  `import type { LucideIcon } from 'lucide-react';\n\n${inlinedBlock}\n`
);

page = page.replace(/<UsaAssignmentHelpSection\b/g, '<UkAssignmentHelpSeoSection');
page = page.replace(/<\/UsaAssignmentHelpSection>/g, '</UkAssignmentHelpSeoSection>');
page = page.replace(/<UsaAssignmentFaq\b/g, '<UkAssignmentFaqSection');
page = page.replace(/<\/UsaAssignmentFaq>/g, '</UkAssignmentFaqSection>');
page = page.replace(/<UsaAssignmentFinalCta\b/g, '<UkAssignmentFinalCtaSection');
page = page.replace(/<\/UsaAssignmentFinalCta>/g, '</UkAssignmentFinalCtaSection>');

page = page.replace('export default function UsaAssignmentHelp', 'export default function UkAssignmentHelp');

page = page.replace('<pattern id="usa-assignment-help-dots"', '<pattern id="uk-assignment-help-dots"');
page = page.replace('fill="url(#usa-assignment-help-dots)"', 'fill="url(#uk-assignment-help-dots)"');

page =
  `/**
 * UK Assignment Help — single-file page (inlined sections previously split across service components).
 * Template copy still reflects the USA source; localize for UK in a follow-up pass.
 */
` + page;

fs.writeFileSync(path.join(root, 'src/pages/Services/regional/UkAssignmentHelp.tsx'), page, 'utf8');
console.log('OK: src/pages/Services/regional/UkAssignmentHelp.tsx');
