/**
 * Canonical regional assignment-help hubs for internal linking & SEO.
 * Routes must match App.tsx (`/usa/assignment-help`, `/aus/assignment-help`, etc.).
 */
export type RegionalAssignmentId =
  | 'usa'
  | 'uk'
  | 'canada'
  | 'aus'
  | 'nz'
  | 'sg'
  | 'arab'
  | 'europe';

export type RegionalAssignmentLink = {
  id: RegionalAssignmentId;
  href: string;
  flag: string;
  /** Short region label for compact pills */
  pillLabel: string;
  /** Keyword-rich anchor / card title (H3) */
  linkTitle: string;
  /** One-line meta description for cards & title attributes */
  description: string;
  /** Optional grouping for featured grid (visual only) */
  group: 'americas' | 'europe' | 'asia-pacific' | 'gulf';
};

export const REGIONAL_ASSIGNMENT_PAGES: readonly RegionalAssignmentLink[] = [
  {
    id: 'usa',
    href: '/usa/assignment-help',
    flag: '🇺🇸',
    pillLabel: 'Assignment Help USA',
    linkTitle: 'Assignment Help USA',
    description: 'University & postgraduate model work for American students — USD pricing, APA/MLA/Chicago, Turnitin-ready drafts.',
    group: 'americas',
  },
  {
    id: 'canada',
    href: '/canada/assignment-help',
    flag: '🇨🇦',
    pillLabel: 'Assignment Help Canada',
    linkTitle: 'Assignment Help Canada',
    description: 'Coursework and dissertation support tuned to Canadian universities — CAD pricing and Canadian English.',
    group: 'americas',
  },
  {
    id: 'uk',
    href: '/uk/assignment-help',
    flag: '🇬🇧',
    pillLabel: 'Assignment Help UK',
    linkTitle: 'Assignment Help UK',
    description: 'Russell Group–style essays, reports, and dissertations — GBP pricing, Harvard/OSCOLA referencing.',
    group: 'europe',
  },
  {
    id: 'europe',
    href: '/europe/assignment-help',
    flag: '🇪🇺',
    pillLabel: 'Assignment Help Europe',
    linkTitle: 'Assignment Help Europe',
    description: 'English-medium support for EU and continental campuses — ECTS-aware structure and major citation styles.',
    group: 'europe',
  },
  {
    id: 'aus',
    href: '/aus/assignment-help',
    flag: '🇦🇺',
    pillLabel: 'Assignment Help Australia',
    linkTitle: 'Assignment Help Australia',
    description: 'Go8 and nationwide university support — AUD pricing, APA/Harvard/AGLC, LMS-ready submissions.',
    group: 'asia-pacific',
  },
  {
    id: 'nz',
    href: '/nz/assignment-help',
    flag: '🇳🇿',
    pillLabel: 'Assignment Help New Zealand',
    linkTitle: 'Assignment Help New Zealand',
    description: 'NZ English coursework for Auckland, Otago, Victoria, and more — NZD pricing and local conventions.',
    group: 'asia-pacific',
  },
  {
    id: 'sg',
    href: '/sg/assignment-help',
    flag: '🇸🇬',
    pillLabel: 'Assignment Help Singapore',
    linkTitle: 'Assignment Help Singapore',
    description: 'NUS, NTU, SMU, and polytechnic pathways — SGD-friendly pricing and rigorous citation standards.',
    group: 'asia-pacific',
  },
  {
    id: 'arab',
    href: '/arab/assignment-help',
    flag: '🇦🇪',
    pillLabel: 'Assignment Help UAE & Saudi',
    linkTitle: 'Assignment Help UAE & Saudi Arabia',
    description: 'English-medium Gulf campuses in Dubai, Abu Dhabi, Riyadh, and Jeddah — USD pricing, GCC time zones.',
    group: 'gulf',
  },
] as const;

export function getRegionalAssignmentLinks(
  excludeId?: RegionalAssignmentId,
): RegionalAssignmentLink[] {
  if (!excludeId) return [...REGIONAL_ASSIGNMENT_PAGES];
  return REGIONAL_ASSIGNMENT_PAGES.filter((page) => page.id !== excludeId);
}

export function getRegionalAssignmentLink(id: RegionalAssignmentId): RegionalAssignmentLink {
  const page = REGIONAL_ASSIGNMENT_PAGES.find((p) => p.id === id);
  if (!page) throw new Error(`Unknown regional assignment id: ${id}`);
  return page;
}
