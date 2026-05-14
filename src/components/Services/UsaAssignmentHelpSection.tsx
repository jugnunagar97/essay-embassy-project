import React from 'react';
import ScrollableContentPanel from './ScrollableContentPanel';
import type { ScrollableContentCard } from './scrollableContentPanel.types';
import {
  AlertTriangle,
  BookOpen,
  Brain,
  Clock,
  Coins,
  GraduationCap,
  Home,
} from 'lucide-react';

const cardsData: ScrollableContentCard[] = [
  {
    id: 1,
    Icon: BookOpen,
    heading: 'The heavy burden of homework and academic stress',
    body: `High school and college students in the U.S. are buckling under immense academic pressure, with homework being a primary culprit. According to a student survey, over 50% of students report feeling stressed, and 25% identify homework as their single biggest source of anxiety. Students spend about one-third of their study time feeling anxious or stuck, while research from Stanford indicates that assigning more than two hours of homework a night is actually counterproductive, leading to physical health problems and a lack of balance. Compounding this struggle, 64% of students report that their parents are entirely unable to help them with their complex assignments.

When you're feeling overwhelmed, stuck, or simply lack the support to complete rigorous assignments, our expert essay writing service steps in to relieve the pressure, providing you with high-quality, customized academic content so you can reclaim your balance and reduce your stress.`,
  },
  {
    id: 2,
    Icon: Clock,
    heading: 'Chronic procrastination and time management fatigue',
    body: `Balancing academics, personal life, extracurriculars, and work leaves many students feeling entirely exhausted and overwhelmed. Finding the time to complete a massive syllabus of essays, quizzes, and reading assignments often triggers deep anxiety and "syllabus shock". Because of this overwhelming workload, an estimated 90% of students fall into the trap of procrastination. Alarmingly, 25% of these students become chronic procrastinators, a habit that severely impacts their academic performance and is a leading factor in students dropping out of college entirely. Managing these rigid commitments without adequate strategies is a major hurdle.

If you find yourself chronically procrastinating or running out of time before a major deadline, our essay writing professionals can help you meet your due dates with perfectly crafted papers, saving your grades and keeping you on track to graduate.`,
  },
  {
    id: 3,
    Icon: Coins,
    heading: 'The impossible juggle of financial strain and rigorous coursework',
    body: `A staggering 68% of students struggle to pay for their education, and nearly two-thirds are forced to shoulder these massive expenses completely on their own. To survive, nearly 65% of college students take on jobs, with 40% of those employed students working full-time while trying to maintain their academic standing. Working more than 20 hours a week has been proven to negatively impact academic performance, and financial insecurity is the primary reason 42% of dropouts leave higher education altogether. Students are forced to prioritize survival over studying, causing their academics to suffer drastically.

When you are forced to work long shifts to afford your tuition, you simply don't have hours left to research and write lengthy papers. Our essay writing website gives working students their time back by handling complex writing assignments, allowing you to earn your paycheck without sacrificing your GPA.`,
  },
  {
    id: 4,
    Icon: Brain,
    heading: 'The silent battle with mental health and anxiety',
    body: `The transition to college life, coupled with rigorous coursework, has triggered a severe mental health crisis among American students. Data reveals that more than 60% of college students meet the criteria for at least one mental health problem, and nearly half experience symptoms of depression and anxiety. Tragically, around 75% of these struggling students are reluctant to seek professional help. The emotional turmoil of balancing classes, work, and personal relationships often leads to severe fatigue, insomnia, and burnout. When anxiety takes over, simply sitting down to write a cohesive, well-researched academic paper feels entirely impossible.

When anxiety and burnout make it impossible to focus on your assignments, Essay Embassy provides a vital safety net. We handle the heavy lifting of your research and writing, giving you the necessary breathing room to focus on your mental well-being without watching your grades suffer.`,
  },
  {
    id: 5,
    Icon: GraduationCap,
    heading: 'The shock of inadequate academic preparedness',
    body: `Many incoming college students are discovering that their high school education simply did not equip them for university-level academics. Recent studies indicate a historic dip in academic readiness, with the United States witnessing the lowest ACT scores in 30 years alongside declining SAT scores. As a result, students who earned satisfactory grades in high school arrive on campus only to find themselves struggling to write a basic paragraph or synthesize complex research. This under-preparedness causes intense stress, self-doubt, and the frustrating realization that they need remedial help just to attain baseline academic competency.

If you feel unprepared for the leap to college-level writing, Essay Embassy is your ultimate academic partner. Our native US writers provide perfectly structured, flawlessly written papers that not only secure your grade but also serve as a high-quality example to help you learn and improve your own writing skills.`,
  },
  {
    id: 6,
    Icon: Home,
    heading: 'Distracting dormitories and lack of study space',
    body: `Living on campus for the first time introduces a host of environmental challenges that severely derail a student's ability to focus. Navigating tiny shared spaces, noisy communal bathrooms, and differing sleep schedules with roommates makes finding a quiet place to study incredibly difficult. Students are frequently distracted by peers when attempting to complete reading assignments or draft complex projects. Combined with the rapid spread of dorm illnesses and a chronic lack of sleep, the physical living environment of a modern U.S. college student actively works against their ability to maintain high academic productivity.

When your dorm is too loud, your roommate is distracting, and you can't find a moment of peace to write, Essay Embassy steps in. Just send us your prompt, and our experts will craft a brilliant essay for you while you catch up on sleep or find a quieter environment.`,
  },
  {
    id: 7,
    Icon: AlertTriangle,
    heading: 'The financial terror of failing a class',
    body: `In the U.S., higher education is absurdly expensive and treated as a massive financial investment. Because tuition is often charged by the credit hour, failing a course is not just an academic setback; it is a financial catastrophe. Students and their parents are terrified of failure because it means having to pay thousands of dollars to take the course again or potentially losing crucial financial aid packages entirely. This transforms every major essay or final exam into a high-stakes, anxiety-inducing event where a single bad grade could literally force a student to drop out of university.

Don't let a difficult writing assignment jeopardize your tuition investment or financial aid. Essay Embassy guarantees top-tier, custom-written academic papers that ensure you pass your classes, protecting your GPA and your wallet from the devastating costs of retaking a course.`,
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'USA Assignment Help',
  description:
    'Professional academic writing assistance for US college and university students. Expert writers for essays, research papers, and all assignment types.',
  provider: {
    '@type': 'Organization',
    name: 'UsaAssignmentHelp',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50000',
    },
  },
  areaServed: 'US',
  audience: {
    '@type': 'Audience',
    audienceType: 'College and university students in the United States',
  },
};

export const UsaAssignmentHelpSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-12 md:py-20">
      {/* Schema injected for Google Crawlers */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <style>{`
        .seo-trust-badge {
          font-size: 12px;
          font-weight: 600;
          background: #EFF6FF;
          color: #1652A0;
          padding: 6px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }
      `}</style>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-12">
          {/* Left Column (Sticky Anchor) */}
          <div className="flex-shrink-0 self-start lg:sticky lg:top-[80px] lg:w-[35%]">
            <h2 className="text-3xl font-black tracking-tight text-[#0B1F42] sm:text-4xl">
              Academic support for your USA assignment help requests
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Trusted by thousands of US students across all academic levels — from freshman essays to graduate-level
              research papers.
            </p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Service ratings and statistics">
              <span className="seo-trust-badge">⭐ 4.9/5 Rating</span>
              <span className="seo-trust-badge">50,000+ Orders Completed</span>
              <span className="seo-trust-badge">100% Plagiarism-Free</span>
            </div>
          </div>

          {/* Right Column (Scrollable Content Panel) */}
          <ScrollableContentPanel
            className="w-full lg:w-[65%]"
            ariaLabel="Assignment help information"
            cards={cardsData}
            fadeBottomColor="#F8FAFC"
          />
        </div>
      </div>
    </section>
  );
};