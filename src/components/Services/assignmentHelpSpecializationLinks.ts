/** Routes and CTAs for the five Academic Specializations cards on assignment-help pages. */
export const ASSIGNMENT_HELP_SPECIALIZATION_LINKS: Record<
  string,
  { link: string; cta: string }
> = {
  'Essay Writing': { link: '/essay-writing', cta: 'Explore Essay Writing' },
  'Assignment Help': { link: '/assignment-help', cta: 'Get Assignment Help' },
  'Research Paper Help': { link: '/paper-writing-services', cta: 'Order My Paper' },
  'Thesis Writing': { link: '/thesis-writing-services', cta: 'Write My Thesis' },
  'Dissertation Writing': { link: '/dissertation-writing-services', cta: 'Get Dissertation Help' },
};

export function getAssignmentHelpSpecializationMeta(title: string) {
  const meta = ASSIGNMENT_HELP_SPECIALIZATION_LINKS[title];
  if (!meta) {
    throw new Error(`Missing specialization link for: ${title}`);
  }
  return meta;
}
