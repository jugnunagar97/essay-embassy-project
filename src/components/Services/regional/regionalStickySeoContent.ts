import {
  AlertTriangle,
  BookOpen,
  Brain,
  Clock,
  Coins,
  GraduationCap,
  Home,
} from 'lucide-react';
import type { ScrollableContentCard } from '../scrollableContentPanel.types';

export type RegionalStickySeoId = 'canada' | 'aus' | 'nz' | 'sg' | 'arab' | 'europe';

export type RegionalStickySeoConfig = {
  cards: ScrollableContentCard[];
  schema: Record<string, unknown>;
  heading: string;
  description: string;
  badges: string[];
};

const baseProvider = {
  '@type': 'Organization' as const,
  name: 'Essay Embassy',
  aggregateRating: {
    '@type': 'AggregateRating' as const,
    ratingValue: '4.9',
    reviewCount: '50000',
  },
};

/** Placeholder scrollable SEO cards — replace with final copy when ready. */
export const REGIONAL_STICKY_SEO: Record<RegionalStickySeoId, RegionalStickySeoConfig> = {
  canada: {
    heading: 'Academic support built for Canadian assignment briefs',
    description:
      'Trusted by students at universities and colleges across Canada — from first-year coursework and LMS submissions to honours theses and graduate dissertations.',
    badges: ['⭐ 4.9/5 rating', '50,000+ orders completed', '100% original writing'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Canada Assignment Help',
      description:
        'Assignment writing support for Canadian students. Model essays and coursework in Canadian English with CAD pricing.',
      provider: baseProvider,
      areaServed: { '@type': 'Country', name: 'Canada' },
      audience: {
        '@type': 'Audience',
        audienceType: 'Students at Canadian universities and colleges',
      },
    },
    cards: [
      {
        id: 1,
        Icon: BookOpen,
        heading: 'Course load, deadlines, and academic stress',
        body: `Canadian undergraduates and postgraduates often face back-to-back deadlines across essays, labs, and group projects. When readings pile up and winter terms feel relentless, stress spikes — especially if English is your second language or your program expects APA/MLA precision on every submission.

Our writers deliver structured, original model work aligned to your rubric so you can catch up without sacrificing sleep or part-time shifts.`,
      },
      {
        id: 2,
        Icon: Clock,
        heading: 'Procrastination and overlapping due dates',
        body: `Three Brightspace or Canvas deadlines in one week is common. Many students describe procrastination as exhaustion, not laziness — after commutes, caregiving, or campus jobs. Last-minute panic is where argument quality and referencing slip.

We help you hit the cut-off with properly cited drafts you can review before upload.`,
      },
      {
        id: 3,
        Icon: Coins,
        heading: 'Tuition, rent, and working while you study',
        body: `Rising living costs push many Canadian students into long work weeks alongside full course loads. Hours spent on shifts are hours not spent on research and drafting — even when you understand the material.

We take on the heavy writing so you can keep earning without losing progression.`,
      },
      {
        id: 4,
        Icon: Brain,
        heading: 'Mental health and burnout',
        body: `Anxiety and burnout make it hard to start assignments, synthesize sources, or respond to instructor feedback. Campus wellness services are busy; meanwhile, blank documents keep growing.

We provide breathing room with research-backed model papers while you focus on recovery or catching up on lectures.`,
      },
      {
        id: 5,
        Icon: GraduationCap,
        heading: 'The jump to university-level writing',
        body: `Strong high-school grades do not always translate to critical analysis, literature reviews, or discipline-specific citation rules. First year is where many students discover they need models of what a proper university essay looks like.

Our Canada-focused writers match your syllabus, learning outcomes, and marking criteria.`,
      },
      {
        id: 6,
        Icon: Home,
        heading: 'Shared housing and noisy study spaces',
        body: `Residence halls, roommates, and long commutes make quiet writing time scarce. Library seats vanish during midterms and finals — and “I will finish it tonight” turns into distraction.

Send us your brief; we draft while you find a better environment.`,
      },
      {
        id: 7,
        Icon: AlertTriangle,
        heading: 'Failed modules and high-stakes assessments',
        body: `Repeating a course or losing scholarships hurts financially and emotionally. Capstones, dissertations, and major research papers carry extra weight toward your degree classification.

Protect your investment with original, Turnitin-ready model work built to your brief.`,
      },
    ],
  },
  aus: {
    heading: 'Academic support built for Australian assignment briefs',
    description:
      'Trusted by students at Group of Eight universities and institutes nationwide — from weekly LMS tasks to honours theses and postgraduate dissertations.',
    badges: ['⭐ 4.9/5 rating', '50,000+ orders completed', '100% original writing'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Australia Assignment Help',
      description:
        'Assignment help for Australian students. Model essays in Australian English with AUD pricing and major citation styles.',
      provider: baseProvider,
      areaServed: { '@type': 'Country', name: 'Australia' },
      audience: {
        '@type': 'Audience',
        audienceType: 'Students at Australian universities and TAFE pathways',
      },
    },
    cards: [
      {
        id: 1,
        Icon: BookOpen,
        heading: 'Assessment overload and academic stress',
        body: `Australian semesters stack quizzes, reports, and major essays across short teaching blocks. When subject guides are dense and Turnitin deadlines loom, stress is normal — especially across STEM, health, and law programs with strict rubrics.

We provide clear, referenced model answers you can learn from while regaining balance.`,
      },
      {
        id: 2,
        Icon: Clock,
        heading: 'Deadline clusters and procrastination',
        body: `Multiple Moodle or Canvas submissions in one week derail even organised students. Part-time work, sport, and placements shrink the hours available for reading and drafting.

We help you submit on time with work structured to your marking guide.`,
      },
      {
        id: 3,
        Icon: Coins,
        heading: 'Cost of living and student employment',
        body: `Rent, transport, and everyday expenses push many students into long shifts alongside full-time study. Working 20+ hours weekly often collides with assessment peaks.

We handle complex writing so your GPA does not suffer while you work.`,
      },
      {
        id: 4,
        Icon: Brain,
        heading: 'Wellbeing, anxiety, and burnout',
        body: `Counselling waitlists and assessment pressure combine for many Australian students. When anxiety blocks focus, starting a 2,000-word essay feels impossible.

Our team drafts while you prioritise support, rest, or catching up on missed content.`,
      },
      {
        id: 5,
        Icon: GraduationCap,
        heading: 'Expectations for HD-level writing',
        body: `The jump from school to university — or from coursework to thesis — raises the bar for critical thinking, Harvard/APA/AGLC referencing, and discipline tone. Models of strong work clarify what examiners expect.

We align to Australian conventions and your subject outline.`,
      },
      {
        id: 6,
        Icon: Home,
        heading: 'Share houses and distraction',
        body: `Noisy flats, long commutes, and packed libraries during SWOT vac make deep work difficult. International students adjusting to a new city face the same challenge.

We draft while you secure quieter time or recover from a chaotic week.`,
      },
      {
        id: 7,
        Icon: AlertTriangle,
        heading: 'High-stakes units and final-year pressure',
        body: `Failed units, academic progress reviews, and dissertation milestones carry real consequences for visas, scholarships, and graduation timelines.

Submit with confidence using original model work tailored to your brief.`,
      },
    ],
  },
  nz: {
    heading: 'Academic support built for New Zealand assignment briefs',
    description:
      'Trusted by students at universities and institutes across Aotearoa — from first-year reports to postgraduate dissertations in NZ English.',
    badges: ['⭐ 4.9/5 rating', '50,000+ orders completed', '100% original writing'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'New Zealand Assignment Help',
      description:
        'Assignment writing support for New Zealand students. Model essays and coursework in NZ English.',
      provider: baseProvider,
      areaServed: { '@type': 'Country', name: 'New Zealand' },
      audience: {
        '@type': 'Audience',
        audienceType: 'Students at New Zealand universities and institutes',
      },
    },
    cards: [
      {
        id: 1,
        Icon: BookOpen,
        heading: 'Workload, deadlines, and academic stress',
        body: `NZ students balance continuous assessment with part-time work and long commutes in Auckland, Wellington, Christchurch, and beyond. When readings stack up, stress follows — especially around mid-trimester and final submission windows.

We deliver rubric-aligned model work so you can rebalance your schedule.`,
      },
      {
        id: 2,
        Icon: Clock,
        heading: 'Overlapping due dates',
        body: `Several essays due in the same fortnight is routine. Procrastination often reflects fatigue after shifts or caregiving, not lack of ability — but penalties still apply.

Meet your portal deadline with structured, cited drafts.`,
      },
      {
        id: 3,
        Icon: Coins,
        heading: 'Living costs and student jobs',
        body: `Housing and transport squeeze student budgets. Extra hours at work mean fewer hours for research, drafting, and proofreading.

We take on the writing load while you keep earning.`,
      },
      {
        id: 4,
        Icon: Brain,
        heading: 'Mental health and study pressure',
        body: `Anxiety and burnout reduce focus and confidence. When wellbeing suffers, blank documents grow while grades do not.

Use model papers as a bridge while you access support or rest.`,
      },
      {
        id: 5,
        Icon: GraduationCap,
        heading: 'University writing standards',
        body: `Many students arrive with solid school results but still wrestle with analysis, referencing, and discipline-specific formats. Clear examples accelerate learning.

Our writers follow NZ academic conventions and your brief.`,
      },
      {
        id: 6,
        Icon: Home,
        heading: 'Flatting and study space',
        body: `Thin walls, flatmates, and distance from campus libraries make concentration difficult during peak assessment weeks.

We draft while you find quieter time.`,
      },
      {
        id: 7,
        Icon: AlertTriangle,
        heading: 'Progression and resubmissions',
        body: `Borderline grades and resubmissions cost time and money. Final projects and dissertations weigh heavily on your qualification outcome.

Protect progression with original work built to your criteria.`,
      },
    ],
  },
  sg: {
    heading: 'Academic support built for Singapore assignment briefs',
    description:
      'Trusted by students at NUS, NTU, SMU, polytechnics, and private institutions — from weekly coursework to capstone and dissertation milestones.',
    badges: ['⭐ 4.9/5 rating', '50,000+ orders completed', '100% original writing'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Singapore Assignment Help',
      description:
        'Assignment help for Singapore students. Rigorous referencing and English-medium model essays.',
      provider: baseProvider,
      areaServed: { '@type': 'Country', name: 'Singapore' },
      audience: {
        '@type': 'Audience',
        audienceType: 'Students at Singapore universities and polytechnics',
      },
    },
    cards: [
      {
        id: 1,
        Icon: BookOpen,
        heading: 'Intensive semesters and constant assessment',
        body: `Singapore programmes often run fast-paced modules with frequent quizzes, reports, and presentations. When every week brings a new deliverable, stress is predictable — especially in competitive faculties.

We provide polished model work aligned to your rubric and citation style.`,
      },
      {
        id: 2,
        Icon: Clock,
        heading: 'Deadline pressure and time management',
        body: `CCAs, internships, and family commitments shrink study hours. Last-minute submissions risk similarity flags and lost marks on structure.

Submit on time with drafts you can review before the LMS closes.`,
      },
      {
        id: 3,
        Icon: Coins,
        heading: 'Costs and part-time work',
        body: `Many students balance tuition, living expenses, and part-time employment. Long shifts leave little energy for literature reviews or data chapters.

We handle the heavy drafting so your grades stay competitive.`,
      },
      {
        id: 4,
        Icon: Brain,
        heading: 'Stress and performance anxiety',
        body: `High expectations — internal and external — amplify anxiety around major papers. When focus disappears, progress stalls.

Our writers give you a clear starting point while you recover bandwidth.`,
      },
      {
        id: 5,
        Icon: GraduationCap,
        heading: 'Rigorous writing and referencing',
        body: `Faculties expect tight argumentation, correct APA/Harvard/IEEE use, and discipline-appropriate tone. Models of strong answers clarify expectations quickly.

We match Singapore English-medium standards and your brief.`,
      },
      {
        id: 6,
        Icon: Home,
        heading: 'HDB noise and campus competition',
        body: `Shared homes, long MRT commutes, and packed study areas during exam season make deep work difficult.

We draft while you secure focus time.`,
      },
      {
        id: 7,
        Icon: AlertTriangle,
        heading: 'CAP, progression, and final projects',
        body: `Grades affect scholarships, exchange placements, and graduation honours. Capstones and dissertations carry outsized weight.

Protect your trajectory with original, properly referenced model work.`,
      },
    ],
  },
  arab: {
    heading: 'Academic support for UAE & Saudi assignment briefs',
    description:
      'English-medium support for students in Dubai, Abu Dhabi, Riyadh, Jeddah, and across the GCC — undergraduate coursework through doctoral chapters.',
    badges: ['⭐ 4.9/5 rating', '50,000+ orders completed', '100% original writing'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'UAE & Saudi Arabia Assignment Help',
      description:
        'Assignment help for English-medium students in the UAE and Saudi Arabia. USD pricing and Gulf timezone-friendly support.',
      provider: baseProvider,
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
      ],
      audience: {
        '@type': 'Audience',
        audienceType: 'University students in the UAE and Saudi Arabia',
      },
    },
    cards: [
      {
        id: 1,
        Icon: BookOpen,
        heading: 'English-medium workload and deadlines',
        body: `Students at UAE and Saudi campuses often complete entire degrees in English while juggling cultural, family, and work obligations. Dense rubrics on Blackboard, Moodle, or Canvas leave little margin when multiple assessments align.

We deliver model work that matches your programme handbook and citation rules.`,
      },
      {
        id: 2,
        Icon: Clock,
        heading: 'Tight timelines across the Gulf week',
        body: `Weekend-heavy schedules, Ramadan terms, and internship blocks compress study time. Procrastination before a portal deadline risks penalties and visa-related progression issues.

Meet your cut-off with structured drafts you can review before upload.`,
      },
      {
        id: 3,
        Icon: Coins,
        heading: 'Tuition, living costs, and employment',
        body: `International and local students alike balance fees, housing, and part-time roles. Hours at work are hours not spent on research synthesis or formatting.

We handle complex writing while you maintain income and attendance.`,
      },
      {
        id: 4,
        Icon: Brain,
        heading: 'Stress away from home',
        body: `Adjusting to campus life in a new city — or studying while family expectations weigh heavily — affects focus and confidence. Anxiety makes starting a major report feel impossible.

Our team drafts while you prioritise wellbeing or religious and family commitments.`,
      },
      {
        id: 5,
        Icon: GraduationCap,
        heading: 'Branch-campus and research-university standards',
        body: `Programmes range from foundation years to PhD research. Expectations for APA, Harvard, IEEE, and critical analysis vary by faculty — models clarify the bar quickly.

We align to your institution’s English-medium conventions.`,
      },
      {
        id: 6,
        Icon: Home,
        heading: 'Shared accommodation and distraction',
        body: `Roommates, long commutes in heat, and crowded campus zones during exam periods reduce quiet study hours.

Send your brief; we draft while you find focus.`,
      },
      {
        id: 7,
        Icon: AlertTriangle,
        heading: 'Progression, GPA, and final milestones',
        body: `Scholarships, sponsorships, and residency conditions often depend on steady grades. Thesis and capstone deadlines carry extra weight.

Protect outcomes with original, Turnitin-ready model work.`,
      },
    ],
  },
  europe: {
    heading: 'Academic support for European assignment briefs',
    description:
      'English-medium help for students across the EU, UK-adjacent programmes, and international campuses — essays, ECTS coursework, and graduate research.',
    badges: ['⭐ 4.9/5 rating', '50,000+ orders completed', '100% original writing'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Europe Assignment Help',
      description:
        'Assignment help for students at European universities. English-medium essays with major European citation styles.',
      provider: baseProvider,
      areaServed: { '@type': 'Place', name: 'Europe' },
      audience: {
        '@type': 'Audience',
        audienceType: 'University students in Europe',
      },
    },
    cards: [
      {
        id: 1,
        Icon: BookOpen,
        heading: 'ECTS workload and continuous assessment',
        body: `European bachelor and master programmes stack seminars, papers, and exams across short terms. Studying in a second language adds pressure when rubrics demand precise academic English.

We provide referenced model work aligned to your module learning outcomes.`,
      },
      {
        id: 2,
        Icon: Clock,
        heading: 'Overlapping deadlines and travel',
        body: `Erasmus terms, internships, and travel between cities make consistent study routines difficult. Missed seminars plus a looming essay deadline create panic.

We help you submit on time with coherent, cited drafts.`,
      },
      {
        id: 3,
        Icon: Coins,
        heading: 'Living abroad on a student budget',
        body: `Rent, visas, and currency changes strain budgets. Part-time work in a foreign language environment steals hours from research and writing.

We take on drafting so you can work and stay enrolled.`,
      },
      {
        id: 4,
        Icon: Brain,
        heading: 'Isolation, language, and burnout',
        body: `International students report loneliness and fatigue that block focus. When mental health dips, starting a 3,000-word paper in English feels overwhelming.

We offer model work as practical relief while you access support.`,
      },
      {
        id: 5,
        Icon: GraduationCap,
        heading: 'Citation styles across faculties',
        body: `APA, Harvard, Chicago, Vancouver, and footnote systems vary by department. Models show how evidence, structure, and references should look for your discipline.

Our writers follow your handbook and brief.`,
      },
      {
        id: 6,
        Icon: Home,
        heading: 'Shared flats and noisy cities',
        body: `Erasmus housing, thin walls, and busy urban campuses make concentration scarce during assessment season.

We draft while you find library time or quieter space.`,
      },
      {
        id: 7,
        Icon: AlertTriangle,
        heading: 'Progression, visas, and thesis milestones',
        body: `Failed modules can delay graduation and complicate residence permits. Master’s theses and dissertations determine final classifications.

Submit with confidence using original work built to your criteria.`,
      },
    ],
  },
};

export function getRegionalStickySeoConfig(region: RegionalStickySeoId): RegionalStickySeoConfig {
  return REGIONAL_STICKY_SEO[region];
}
