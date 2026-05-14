import { BookOpen, Headphones, Lock, Sparkles } from 'lucide-react';
import type { ScrollableContentCard } from './scrollableContentPanel.types';

/** Generic placeholder cards for service pages; replace with real copy per route when ready. */
export const SERVICE_SEO_PLACEHOLDER_CARDS: ScrollableContentCard[] = [
  {
    id: 'seo-ph-1',
    Icon: BookOpen,
    heading: 'Placeholder: clear briefs, cleaner drafts',
    body: 'Share your instructions, deadline, and format. This block is sample layout copy only—swap in your real service narrative later.',
  },
  {
    id: 'seo-ph-2',
    Icon: Headphones,
    heading: 'Placeholder: questions welcome',
    body: 'Use this card for policy, process, or support messaging. Short lines work best inside the scroll panel grid.',
  },
  {
    id: 'seo-ph-3',
    Icon: Lock,
    heading: 'Placeholder: privacy & originality',
    body: 'Placeholder tone is intentional. Replace with your actual guarantees, delivery details, and subject coverage.',
  },
  {
    id: 'seo-ph-4',
    Icon: Sparkles,
    heading: 'Placeholder: quality bar',
    body: 'Two to four cards is enough to prove the layout. Add or trim cards per page when you replace this content.',
  },
];
