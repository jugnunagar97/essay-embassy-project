import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  FileCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  History,
  Layout,
  Lock,
  MapPin,
  PenTool,
  Plus,
  ScrollText,
  Search,
  Star,
  UserPlus,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import type { LucideIcon } from 'lucide-react';
import AuthenticTestimonials from '../../components/Services/AuthenticTestimonials';
import UsaAssignmentFinalCta from '../../components/Services/UsaAssignmentFinalCta';
import UnifiedPriceCalculator from '../../components/Services/UnifiedPriceCalculator';
import AssignmentHelpSpecializationsGrid from '../../components/Services/AssignmentHelpSpecializationsGrid';
import { UsaAssignmentHelpSection } from '../../components/Services/UsaAssignmentHelpSection';
import UsaAssignmentFaq from '../../components/Services/UsaAssignmentFaq';
import WhyEssayEmbassyProof from '../../components/Services/WhyEssayEmbassyProof';
const trustPoints = ['Turnitin® Verified', 'APA/MLA Specialist', '24/7 USA Support'];

/** Public folder URL — works when Vite `base` is not `/`. */
const publicAsset = (path: string) => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
};

/** Stock portraits shown blurred for privacy in the verified-reviews strip. */
const verifiedStudentBlurAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&h=128&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80',
] as const;

const services = [
  {
    title: 'Essay Writing',
    icon: FileText,
    desc:
      'Custom Essay Writing Help — Essays are the most frequent assignments you will encounter, especially within humanities programs. Whether you need a simple narrative or a complex argumentative piece, our native assignment writers USA deliver perfectly structured, custom essay writing help. We ensure every paragraph is crafted from scratch to match your specific university grading rubrics.',
  },
  {
    title: 'Assignment Help',
    icon: PenTool,
    desc:
      'Online Assignment Help USA — Struggling with tight deadlines or difficult homework? Our comprehensive assignment writing service USA covers over 400 academic disciplines, from Nursing and Law to Programming and Finance. We guarantee a 98.2% on-time delivery rate, ensuring that whenever you need urgent assignment help USA, your perfectly formatted work arrives exactly when you need it.',
  },
  {
    title: 'Research Paper Help',
    icon: Search,
    desc:
      'Expert Research Paper Help — Complex research assignments demand diligent data collection, deep analysis, and strict academic formatting. Let our subject-matter experts provide detailed research paper help, taking over the heavy lifting of gathering credible sources. We deliver 100% original, fully cited research papers designed to secure top grades without the stress.',
  },
  {
    title: 'Thesis Writing',
    icon: GraduationCap,
    desc:
      'Professional Thesis Writing — Securing a Master&apos;s degree requires an extensive, carefully researched thesis paper. Our top-tier academic experts provide in-depth thesis writing help across all subjects. We work closely with you to ensure your core arguments are thoroughly researched, meticulously structured, and meet the highest academic standards required by US institutions.',
  },
  {
    title: 'Dissertation Writing',
    icon: ScrollText,
    desc:
      'Complete Dissertation Writing Service — A dissertation is often the most crucial and demanding academic writing work for doctoral students. Get comprehensive support from our elite pool of over 2,000 PhD-qualified experts. We provide step-by-step assistance with your dissertation, from proposal to final draft, ensuring a 100% plagiarism-free submission that is ready for defense.',
  },
];

const whyUsFeatures = [
  {
    icon: Layout,
    title: 'Precise University Formatting',
    desc:
      'Universities are highly particular about document formatting and structuring. Whether you need APA 7th Ed, MLA, or Chicago style, our USA assignment writing help ensures every paper strictly adheres to your specific university guidelines so you never lose marks on technicalities.',
  },
  {
    icon: Award,
    title: 'Unique Solutions for Top Grades',
    desc:
      'No student wants to risk submitting unoriginal work. Every paper is meticulously researched and written entirely from scratch. We deliver 100% plagiarism free assignment help USA designed to exceed the critical grading rubrics of American professors and secure top results.',
  },
  {
    icon: Clock,
    title: 'Strict Deadline Adherence',
    desc:
      'On-time submission is mandatory for academic success. From standard deadlines to last minute assignment help USA, our team operates around the clock to ensure there is absolutely no delay in delivering your completed work well before your midnight cutoff.',
  },
  {
    icon: Users,
    title: 'Native Assignment Writers USA',
    desc:
      'To guarantee the highest quality English and academic rigor, we hire exclusively native writers. You will receive dedicated assignment help for American students from professionals who have a deep, firsthand understanding of the US curriculum and university demands.',
  },
  {
    icon: BookOpen,
    title: 'Complete Support Across 400+ Subjects',
    desc:
      "From the first week's homework prompt to your final capstone project, we provide consistent college assignment help USA. With professional experts covering over 400 academic disciplines, you can rely on us for complete, semester-ready support no matter what class you are taking.",
  },
];

const howItWorksSteps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Submit Your Requirements',
    desc: 'Share your assignment brief, rubrics, and deadline. Our system handles the rest.',
  },
  {
    number: '02',
    icon: UserPlus,
    title: 'Get Matched With a Writer',
    desc: 'We pair you with a US-native PhD expert specifically qualified in your subject area.',
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Receive & Review',
    desc: 'Download your Turnitin-passed paper, request any edits, and submit with confidence.',
  },
];

const subjectsCovered = [
  'Business Management',
  'Law & Ethics',
  'Nursing & Healthcare',
  'Mechanical Engineering',
  'Clinical Psychology',
  'American History',
  'Digital Marketing',
  'Corporate Finance',
  'Computer Science',
  'Sociology',
  'Early Childhood Education',
  'Architecture',
  'Data Science',
  'Economics',
  'Political Science',
  'Biology',
  'Accounting',
  'Statistics',
  'Criminology',
  'Public Health',
  'Information Technology',
  'English Literature',
  'Civil Engineering',
  'Philosophy',
];

/** Used in Academic Footprint — grid layout only (no marquee / nowrap strip). */
const academicFootprintUniversities = [
  'Harvard University',
  'MIT',
  'Stanford University',
  'Yale University',
  'Princeton University',
  'Columbia University',
  'UPenn',
  'Cornell University',
  'UC Berkeley',
  'UCLA',
  'NYU',
  'University of Michigan',
  'Duke University',
  'Johns Hopkins',
  'Georgia Tech',
  'UT Austin',
  'Georgetown',
  'Penn State',
];

const getSubjectPillStyle = (index: number) => {
  const styles = [
    'bg-[#0B1F42] text-white border-[#0B1F42]',
    'bg-[#D4A853] text-[#0B1F42] border-[#D4A853]',
    'bg-white text-[#1652A0] border-slate-200 hover:border-[#1652A0]',
    'bg-blue-50 text-[#1652A0] border-blue-100',
  ];
  return styles[index % styles.length];
};

const SubjectsCoveredSection = () => (
  <section className="relative overflow-hidden bg-white py-16 sm:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="mb-12 text-center lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853] sm:text-sm">
            Academic Diversity
          </h2>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-[#0B1F42] sm:text-4xl lg:text-5xl">
            We Cover Every Subject <br className="hidden sm:block" /> USA Students Need Help With
          </h3>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-900 to-red-600" />
          <p className="mx-auto mt-6 max-w-2xl text-slate-600">
            Our network of 500+ PhD writers spans across all major US university departments, ensuring specialized
            knowledge for every assignment.
          </p>
        </motion.div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {subjectsCovered.map((subject, index) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.03,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{
              y: -3,
              boxShadow: '0 10px 20px -10px rgba(0,0,0,0.1)',
            }}
            className={`cursor-default rounded-full border px-5 py-2.5 text-sm font-bold transition-all sm:px-7 sm:py-3 sm:text-base ${getSubjectPillStyle(index)}`}
          >
            {subject}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: subjectsCovered.length * 0.03 }}
          className="flex items-center gap-2 rounded-full border-2 border-dashed border-slate-300 px-5 py-2.5 text-sm font-black text-slate-400 sm:px-7 sm:py-3 sm:text-base"
        >
          <Plus className="h-4 w-4" />
          100+ More Disciplines
        </motion.div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm font-medium text-slate-400">
          All subjects follow{' '}
          <span className="font-bold italic text-[#0B1F42]">Latest 2024 US Curriculum Standards</span>
        </p>
      </div>
    </div>
  </section>
);

const AcademicFootprintSection = () => (
  <section className="relative overflow-x-hidden bg-gradient-to-b from-white via-slate-50/80 to-slate-50 py-16 sm:py-24">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    <div className="relative mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 shadow-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4A853]" aria-hidden />
            Nationwide reach
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853] sm:text-sm">Academic Footprint</h2>
          <h3 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F42] sm:text-4xl lg:text-5xl">
            Helping Students From <br className="hidden sm:block" /> Top US Universities
          </h3>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-900 to-red-600" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            A snapshot of institutions where our clients pursue degrees—delivered with the same rigor your program
            expects.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-24px' }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="min-w-0 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8"
      >
        <ul className="m-0 grid min-w-0 list-none grid-cols-[repeat(2,minmax(0,1fr))] gap-2 p-0 sm:grid-cols-[repeat(3,minmax(0,1fr))] sm:gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))] lg:gap-3">
          {academicFootprintUniversities.map((name, index) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.24) }}
              className="min-w-0 list-none"
            >
              <span className="flex min-h-[3.25rem] min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2.5 text-center font-serif text-[0.8125rem] font-semibold leading-snug text-slate-700 shadow-sm transition-colors duration-200 hover:border-[#1652A0]/25 hover:bg-white hover:text-[#0B1F42] sm:min-h-0 sm:gap-2 sm:px-3 sm:py-3 sm:text-sm">
                <span className="shrink-0 text-[#D4A853]" aria-hidden>
                  /
                </span>
                <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">{name}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-10 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate-400 sm:mt-12 sm:text-sm sm:tracking-[0.1em]"
      >
        Recognized for Excellence in <span className="text-[#0B1F42]">All 50 US States</span>
      </motion.p>
    </div>
  </section>
);

const SampleWorkSection = () => (
  <section className="relative overflow-x-hidden border-t border-slate-100 bg-white py-16 sm:py-24 lg:py-32">
    <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-[0.03]">
      <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#0B1F42] blur-[100px]" />
      <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-red-600 blur-[100px]" />
    </div>

    <div className="relative z-10 mx-auto min-w-0 max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="mb-12 text-center lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853] sm:text-sm">
            Quality Assurance
          </h2>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-[#0B1F42] sm:text-4xl lg:text-5xl">
            See The Quality We Deliver
          </h3>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-900 to-red-600" />
          <p className="mx-auto mt-6 max-w-2xl text-slate-600">
            We don&apos;t just write; we architect papers that meet the specific high-distinction criteria of Top-Tier US
            Universities.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative mx-auto min-w-0 max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50"
      >
        <div className="grid min-w-0 grid-cols-1 lg:[grid-template-columns:repeat(12,minmax(0,1fr))]">
          <div className="relative col-span-1 min-w-0 bg-slate-100 p-6 sm:p-10 lg:col-span-7">
            <div className="relative aspect-[8.5/11] w-full min-w-0 rounded-lg bg-white p-8 shadow-inner ring-1 ring-slate-200 sm:p-12">
              <div className="pointer-events-none absolute inset-0 flex rotate-[-45deg] items-center justify-center opacity-[0.03]">
                <span className="text-6xl font-black uppercase tracking-widest text-[#0B1F42]">Confidential</span>
              </div>

              <div className="space-y-4">
                <div className="mb-8">
                  <div className="mb-2 h-4 w-1/3 rounded bg-slate-100" />
                  <div className="h-6 w-3/4 rounded bg-slate-200" />
                </div>

                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-full rounded bg-slate-100 blur-[2px]" />
                    <div className="h-3 w-[92%] rounded bg-slate-100 blur-[2px]" />
                    <div className="h-3 w-[96%] rounded bg-slate-100 blur-[2px]" />
                  </div>
                ))}

                <div className="mt-8 flex min-w-0 items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-6">
                  <Lock className="h-5 w-5 shrink-0 text-slate-400" />
                  <p className="min-w-0 text-xs font-medium italic text-slate-400">
                    Client data and specific research findings redacted for privacy. Order to see full original work.
                  </p>
                </div>
              </div>

              <div className="absolute bottom-6 right-6">
                <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 ring-1 ring-green-500/30">
                  <FileCheck2 className="h-4 w-4 text-green-600" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-green-700">
                    0% Similarity - Turnitin®
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: -12 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="absolute -right-4 top-8 z-20 flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-600/30 bg-white p-2 shadow-xl sm:h-32 sm:w-32"
            >
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-red-600 text-red-600">
                <span className="text-xs font-black uppercase leading-none">Grade</span>
                <span className="text-3xl font-black sm:text-4xl">A+</span>
                <span className="text-[10px] font-bold">98/100</span>
              </div>
            </motion.div>
          </div>

          <div className="col-span-1 flex min-w-0 flex-col justify-center p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-slate-100">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1652A0] ring-1 ring-[#1652A0]/20">
                Case Study: Clinical Psychology
              </span>
            </div>

            <h4 className="mb-4 text-2xl font-black text-[#0B1F42]">
              Impact of Telehealth on Rural Mental Health Systems
            </h4>

            <div className="mb-8 space-y-4">
              <div className="flex min-w-0 items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#D4A853]" />
                <p className="min-w-0 text-sm text-slate-600">
                  <span className="font-bold text-[#0B1F42]">Format:</span> APA 7th Edition with Professional Running Head.
                </p>
              </div>
              <div className="flex min-w-0 items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#D4A853]" />
                <p className="min-w-0 text-sm text-slate-600">
                  <span className="font-bold text-[#0B1F42]">Sources:</span> 15+ Peer-reviewed journals (Post-2020).
                </p>
              </div>
              <div className="flex min-w-0 items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#D4A853]" />
                <p className="min-w-0 text-sm text-slate-600">
                  <span className="font-bold text-[#0B1F42]">Analysis:</span> Statistical evidence integration via SPSS.
                </p>
              </div>
            </div>

            <div className="mb-8 rounded-2xl bg-slate-50 p-5 italic ring-1 ring-slate-100">
              <div className="mb-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#D4A853] text-[#D4A853]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                &ldquo;The student demonstrated exceptional critical thinking. The literature review is exhaustive, and the
                formatting is flawless. A benchmark for this semester.&rdquo;
              </p>
              <p className="mt-3 text-xs font-black uppercase tracking-widest text-slate-400 not-italic">
                — Faculty Reviewer, Georgetown Univ.
              </p>
            </div>

            <Link
              to="/order-now"
              className="group/btn flex w-full items-center justify-center gap-3 rounded-xl bg-[#0B1F42] py-4 text-lg font-bold text-white shadow-xl shadow-blue-900/10 transition-all hover:bg-[#1652A0] active:scale-[0.98]"
            >
              Order Similar Work
              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </Link>

            <p className="mt-4 text-center text-xs font-medium text-slate-400">
              100% Ownership & Copyright Transferred to You
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 lg:py-32">
    <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 opacity-[0.03]">
      <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="usa-assignment-help-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="#0B1F42" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#usa-assignment-help-dots)" />
      </svg>
    </div>
    <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="mb-16 text-center lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#D4A853] sm:text-sm">
            The Essay Embassy Process
          </h2>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-[#0B1F42] sm:text-5xl lg:text-6xl">
            Simple. Fast. Reliable.
          </h3>
          <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-900 to-red-600" />
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 px-24 lg:block">
          <div className="h-[2px] w-full border-t-2 border-dashed border-slate-200" />
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-[repeat(3,minmax(0,1fr))] lg:gap-8">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.45 }}
              className="group relative flex flex-col items-center text-center"
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-black text-slate-200/50 transition-colors group-hover:text-blue-100/50 lg:-top-16 lg:text-9xl">
                {step.number}
              </span>
              <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white text-[#0B1F42] shadow-xl shadow-slate-200 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-[#0B1F42] group-hover:text-white sm:h-24 sm:w-24">
                <step.icon className="h-10 w-10 transition-transform duration-500 group-hover:scale-110" />
                {index < howItWorksSteps.length - 1 && (
                  <div className="absolute -right-12 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ChevronRight className="h-8 w-8 text-slate-300" />
                  </div>
                )}
              </div>
              <div className="relative z-10">
                <h4 className="mb-4 text-xl font-black text-[#0B1F42] sm:text-2xl">{step.title}</h4>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600 sm:text-base">{step.desc}</p>
              </div>
              {index < howItWorksSteps.length - 1 && (
                <div className="mt-8 flex h-8 w-[2px] bg-slate-200 lg:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-20 text-center"
      >
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-8 py-4 text-lg font-bold text-[#0B1F42] shadow-lg shadow-yellow-900/20 transition-all hover:scale-105 hover:bg-[#c39540] active:scale-95"
        >
          Start Your First Order
          <ChevronRight className="h-5 w-5" />
        </button>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          Takes less than 2 minutes
        </p>
      </motion.div>
    </div>
  </section>
);

// FIX: Replaced motion.path (broken in plain <svg>) with a static SVG shape.
// The animated waving effect was causing render issues across some browsers.
const AmericanFlagMotion = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
    <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="flagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B22234" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3C3B6E" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M0 20 Q 25 10 50 20 T 100 20 V 80 Q 75 90 50 80 T 0 80 Z"
        fill="url(#flagGradient)"
      />
    </svg>
  </div>
);

const StatCounter = ({
  value,
  label,
  Icon,
  className,
}: {
  value: string;
  label: string;
  Icon: LucideIcon;
  className?: string;
}) => (
  <div
    className={`flex min-w-0 flex-col items-center justify-center px-2 py-4 text-center sm:px-4 sm:py-5 ${className ?? ''}`}
  >
    <div className="mb-2 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#0B1F42] sm:h-11 sm:w-11">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    </div>
    <h3 className="text-xl font-black text-[#0B1F42] sm:text-2xl md:text-3xl lg:text-4xl">{value}</h3>
    <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px] sm:tracking-widest">
      {label}
    </p>
  </div>
);

export default function UsaAssignmentHelp() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      <Helmet>
        <title>Trusted Online Assignment Help USA | College &amp; University Students</title>
        <meta
          name="description"
          content="Affordable assignment help USA from $10/page. Native writers, university formatting, essays through dissertations—trusted by US students."
        />
      </Helmet>

      {/* ── HERO SECTION ── */}
      {/* FIX: Removed lg:min-h-[90vh] lg:flex lg:items-center — these caused the section to
          stretch to viewport height even when content was short, creating the "tall stretch".
          Now it's height-by-content with generous padding only. */}
      <section className="relative overflow-hidden bg-[#0B1F42] pb-14 pt-20 sm:pt-24 sm:pb-16 lg:py-20">
        <AmericanFlagMotion />
        <div className="absolute right-0 top-1/4 h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-600/20 blur-[80px] sm:h-72 sm:w-72 lg:h-[480px] lg:w-[480px] lg:blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 h-48 w-48 translate-y-1/2 -translate-x-1/2 rounded-full bg-red-600/10 blur-[80px] sm:h-72 sm:w-72 lg:h-[480px] lg:w-[480px] lg:blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="grid min-w-0 grid-cols-1 gap-10 sm:gap-12 lg:[grid-template-columns:repeat(12,minmax(0,1fr))] lg:items-start">

            {/* Copy column */}
            <motion.div
              className="min-w-0 text-center lg:col-span-7 lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md sm:mb-6 sm:px-4">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white sm:text-xs sm:tracking-[0.2em]">
                  Official USA Academic Portal
                </span>
              </div>

              {/* FIX: Removed text-balance (poor Tailwind support); added explicit leading */}
              <h1 className="mb-5 max-w-4xl text-[1.65rem] font-black leading-[1.12] tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08] xl:text-6xl">
                Trusted Online Assignment Help USA for College &amp; University Students
              </h1>
              <p className="mx-auto mb-7 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:mb-8 sm:text-lg lg:mx-0 lg:text-xl">
                Falling behind on tough coursework? If you are asking, &ldquo;Who can do my assignment for me USA?&rdquo;
                we have the right team ready to step in. We are the best assignment help website for US students,
                delivering affordable assignment help USA starting at just $10 per page.
              </p>
            </motion.div>

            {/* Calculator column */}
            <motion.div
              className="w-full min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative mx-auto w-full max-w-[min(100%,420px)] lg:ml-auto lg:max-w-none">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-blue-500/20 to-red-500/20 blur-xl lg:hidden" />
                <div className="w-full min-w-0 overflow-hidden">
                  <UnifiedPriceCalculator compact />
                </div>
              </div>
            </motion.div>

            {/* Trust pills */}
            <div className="flex min-w-0 flex-wrap justify-center gap-2 lg:col-span-7 lg:justify-start">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  // FIX: bg-white/8 is not a valid Tailwind class → replaced with bg-white/[0.08]
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-[#D4A853] sm:h-4 sm:w-4" />
                  <span className="text-[11px] font-bold text-slate-200 sm:text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="relative z-20 bg-slate-50 py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid min-w-0 grid-cols-[repeat(2,minmax(0,1fr))] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 sm:grid-cols-[repeat(4,minmax(0,1fr))] sm:divide-x sm:divide-slate-200">
            <StatCounter Icon={Star}    value="4.9/5"  label="Rating"  className="border-b border-r border-slate-200 sm:border-0" />
            <StatCounter Icon={Award}   value="50K+"   label="Papers"  className="border-b border-slate-200 sm:border-0" />
            <StatCounter Icon={Users}   value="500+"   label="Experts" className="border-r border-slate-200 sm:border-0" />
            <StatCounter Icon={History} value="8+ Yrs" label="Est." />
          </div>
        </div>
      </section>

      {/* ── WRITING SERVICES TYPES ── */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853] sm:text-sm">
              Academic Specializations
            </h2>
            <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight text-[#0B1F42] sm:text-4xl md:text-5xl">
              Comprehensive Assignment Writing Service USA
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Tailored perfectly to strict American university formatting guidelines, we provide complete university
              assignment help USA. From standard essays and online coursework to advanced theses, research papers, and
              complete dissertation writing services, our native assignment writers USA deliver perfectly structured
              solutions across more than 400 academic disciplines.
            </p>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-blue-900 to-red-600 sm:mt-6 sm:w-24" />
          </div>
          <AssignmentHelpSpecializationsGrid services={services} />
        </div>
      </section>

      {/* ── THE ESSAY EMBASSY EDGE ── */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <motion.div
              initial={{ opacity: 1, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative order-2 min-w-0 lg:order-1"
            >
              <div className="relative z-10 min-h-0 min-w-0 overflow-hidden rounded-2xl border-8 border-slate-50 bg-slate-100 shadow-xl sm:rounded-3xl sm:border-10 sm:shadow-2xl lg:rounded-[3rem] lg:border-[12px]">
                <div
                  className="relative mx-auto w-full max-w-lg sm:max-w-2xl lg:max-w-none"
                  style={{ aspectRatio: '1200 / 1333', maxHeight: 'min(72vh, 720px)' }}
                >
                  <img
                    src={publicAsset('images/my-grades.jpg')}
                    alt="Sample assignment graphic: clinical psychology case study on telehealth and rural mental health, Grade A+ 98/100, APA 7 with running head, 15+ peer-reviewed sources, SPSS analysis, and faculty review quote."
                    sizes="(max-width: 1023px) min(100vw, 42rem), min(50vw, 36rem)"
                    width={1200}
                    height={1333}
                    className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-700 lg:hover:scale-[1.02]"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 rounded-xl bg-white/90 p-3 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-2xl sm:p-5 lg:bottom-10 lg:left-10 lg:right-10 lg:p-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className="flex shrink-0 -space-x-3"
                      aria-label="Student reviewers — profile photos shown blurred for privacy"
                    >
                      {verifiedStudentBlurAvatars.map((src) => (
                        <div
                          key={src}
                          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-slate-200 ring-1 ring-slate-200/80"
                        >
                          <img
                            src={src}
                            alt=""
                            width={40}
                            height={40}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full scale-110 object-cover blur-[7px]"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#0B1F42]">4.9/5 Rating</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Verified Student Reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-blue-50" />
              <div className="absolute -left-10 -top-10 -z-10 h-40 w-40 rotate-12 rounded-[2rem] bg-red-50" />
            </motion.div>

            <div className="order-1 flex min-w-0 flex-col lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 text-center lg:mb-12 lg:text-left"
              >
                <h2 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#D4A853] sm:text-sm">
                  The Essay Embassy Edge
                </h2>
                <h3 className="text-2xl font-black tracking-tight text-[#0B1F42] sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  Why Students Choose Our Assignment Writing Service USA
                </h3>
                <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-900 to-red-600 lg:mx-0" />
              </motion.div>
              <div className="space-y-4 sm:space-y-6">
                {whyUsFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                    className="group flex min-w-0 items-start gap-4 rounded-2xl border border-transparent bg-white p-4 transition-all hover:border-slate-100 hover:bg-slate-50 sm:gap-6 sm:p-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1652A0] shadow-sm transition-all group-hover:bg-[#0B1F42] group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <h4 className="text-lg font-bold text-[#0B1F42] sm:text-xl">{feature.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 block lg:hidden">
                <button
                  type="button"
                  className="w-full rounded-2xl bg-[#0B1F42] py-5 text-lg font-bold text-white shadow-xl"
                >
                  Experience the Difference
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowItWorksSection />

      {/* ── SUBJECTS COVERED ── */}
      <SubjectsCoveredSection />

      {/* ── ACADEMIC FOOTPRINT ── */}
      <AcademicFootprintSection />

      {/* ── SAMPLE WORK ── */}
      <SampleWorkSection />

      {/* ── WHY ESSAY EMBASSY PROOF ── */}
      <WhyEssayEmbassyProof />

      {/* ── TESTIMONIALS ── */}
      <AuthenticTestimonials />


      {/* ── USA ASSIGNMENT HELP CONTENT (SEO) ── */}
      <UsaAssignmentHelpSection />

      {/* ── FAQ (LAST SECTION) ── */}
      <UsaAssignmentFaq />

      {/* ── FINAL CTA (LAST SECTION) ── */}
      <UsaAssignmentFinalCta />
    </div>
  );
}