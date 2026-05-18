import type React from "react";
import { useState } from "react";

import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  DollarSign,
  FileText,
  Flame,
  GraduationCap,
  Headphones,
  Home,
  Lock,
  type LucideIcon,
  MapPin,
  Pencil,
  Quote,
  Search,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface CollegeData {
  breadcrumb: {
    rootHref: string;
    collegesHref: string;
    collegesLabel: string;
  };
  fullName: string;
  shortCode: string;
  heroTitle: string;
  location: string;
  type: string;
  studentsLabel: string;
  description: string;
  cta: {
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
  trustChips: Array<{ icon: string; label: string }>;
}

export interface StatCard {
  icon: string;
  label: string;
  value: string;
  caption: string;
}

export interface AlertBanner {
  title: string;
  body: string;
}

export interface CalendarPeriod {
  accent: "red" | "rose" | "amber" | "blue";
  range: string;
  title: string;
  body: string;
  tag?: { tone: "red" | "rose" | "amber" | "blue"; label: string };
}

export interface Department {
  icon: string;
  name: string;
  courses: string[];
}

export interface ProfessorIntel {
  icon: string;
  title: string;
  subtitle: string;
  bullets: string[];
  footnote: string;
}

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  badge?: string;
}

export interface CollegeTestimonial {
  id: string;
  name: string;
  major: string;
  year: string;
  rating: number;
  quote: string;
  course?: string;
  serviceUsed?: string;
  semester?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BottomCtaData {
  title: string;
  subtitle: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  trustLine?: string;
}

export interface FaqSupportCard {
  heading: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  contactHref: string;
  contactLabel: string;
}

// ==========================================
// HERO COMPONENT
// ==========================================

const trustIconMap: Record<string, LucideIcon> = {
  check: Check,
  lock: Lock,
  clock: Clock,
  star: Star,
};

export const Hero: React.FC<{ data: CollegeData }> = ({ data }) => {
  return (
    <section
      data-testid="college-hero"
      aria-labelledby="college-hero-title"
      className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] px-8 sm:px-12 lg:px-16 py-14 sm:py-16 lg:py-20 text-white"
      style={{
        background:
          "linear-gradient(165deg, #0B1F42 0%, #0D2B5A 35%, #0F3570 65%, #1652A0 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
        }}
      />
      <nav
        aria-label="Breadcrumb"
        data-testid="hero-breadcrumb"
        className="relative flex items-center gap-2 text-white/75 text-sm sm:text-base"
      >
        <a
          href={data.breadcrumb.rootHref}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          data-testid="breadcrumb-home"
        >
          <Home className="w-4 h-4" />
        </a>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <a
          href={data.breadcrumb.collegesHref}
          className="hover:text-white transition-colors"
          data-testid="breadcrumb-colleges"
        >
          {data.breadcrumb.collegesLabel}
        </a>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <span className="text-white/95">{data.fullName}</span>
      </nav>

      <div className="relative mt-8 flex items-start gap-5 sm:gap-7">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          data-testid="college-monogram"
          className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/15 border border-white/25 text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-lg backdrop-blur-sm"
        >
          {data.shortCode}
        </motion.div>

        <div className="min-w-0">
          <motion.h1
            id="college-hero-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-bold text-white text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight"
          >
            {data.heroTitle}
          </motion.h1>

          <div
            data-testid="hero-meta"
            className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/80 text-base sm:text-lg"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {data.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Building2 className="w-4 h-4" /> {data.type}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="w-4 h-4" /> {data.studentsLabel}
            </span>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="relative mt-8 max-w-3xl text-white/85 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed"
      >
        {data.description}
      </motion.p>

      <div className="relative mt-10 flex flex-wrap gap-4">
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          href={data.cta.primary.href}
          data-testid="hero-cta-primary"
          className="btn-pill primary group"
        >
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          {data.cta.primary.label}
        </motion.a>
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          href={data.cta.secondary.href}
          data-testid="hero-cta-secondary"
          className="college-btn-secondary !border-white/35 !bg-white/10 !text-white hover:!bg-white/15 hover:!text-white"
        >
          {data.cta.secondary.label}
        </motion.a>
      </div>

      <div className="relative mt-12 h-px bg-white/20" />

      <ul
        data-testid="hero-trust-chips"
        className="relative mt-8 flex flex-wrap gap-x-10 gap-y-4 text-white/90 text-base sm:text-lg"
      >
        {data.trustChips.map((c, i) => {
          const Icon = trustIconMap[c.icon];
          return (
            <li
              key={c.label}
              className="inline-flex items-center gap-2.5"
              data-testid={`hero-trust-chip-${i}`}
            >
              <Icon className="w-4 h-4" />
              <span>{c.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

// ==========================================
// STATS COMPONENT
// ==========================================

const statsIconMap: Record<string, LucideIcon> = {
  bars: BarChart3,
  users: Users,
  award: Award,
  dollar: DollarSign,
};

export const Stats: React.FC<{ stats: StatCard[] }> = ({ stats }) => {
  return (
    <section
      data-testid="college-stats"
      aria-label="College statistics"
      className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
    >
      {stats.map((s, i) => {
        const Icon = statsIconMap[s.icon];
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            data-testid={`stat-card-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="college-card hover:bg-[#F8FAFC]"
          >
            <div className="flex items-center gap-2 text-[#64748B] text-sm">
              <Icon className="w-4 h-4" />
              <span>{s.label}</span>
            </div>
            <div className="mt-5 text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#0B1F42] leading-none tracking-tight">
              {s.value}
            </div>
            <div className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
              {s.caption}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

// ==========================================
// ALERT COMPONENT
// ==========================================

export const Alert: React.FC<{ data: AlertBanner }> = ({ data }) => {
  return (
    <output
      data-testid="college-alert"
      className="mt-8 sm:mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 sm:px-8 py-5 sm:py-6 flex gap-4 items-start"
    >
      <AlertTriangle
        className="w-6 h-6 text-amber-600 mt-0.5 shrink-0"
        aria-hidden
      />
      <p className="text-base sm:text-lg leading-relaxed text-amber-900">
        <span className="font-semibold text-amber-900">{data.title}</span>{" "}
        <span className="text-amber-800/90">{data.body}</span>
      </p>
    </output>
  );
};

// ==========================================
// CALENDAR SECTION COMPONENT
// ==========================================

type Tone = "red" | "rose" | "amber" | "blue";
const accentStyles: Record<
  Tone,
  { border: string; range: string; ring: string }
> = {
  red: {
    border: "border-red-400/70",
    range: "text-red-600",
    ring: "hover:shadow-[0_18px_40px_-18px_rgba(239,68,68,0.45)]",
  },
  rose: {
    border: "border-rose-400/70",
    range: "text-rose-600",
    ring: "hover:shadow-[0_18px_40px_-18px_rgba(244,63,94,0.4)]",
  },
  amber: {
    border: "border-amber-400/80",
    range: "text-amber-600",
    ring: "hover:shadow-[0_18px_40px_-18px_rgba(245,158,11,0.45)]",
  },
  blue: {
    border: "border-blue-400/70",
    range: "text-blue-600",
    ring: "hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.4)]",
  },
};

const tagStyles: Record<Tone, string> = {
  red: "bg-red-50 text-red-700 border-red-200/80",
  rose: "bg-rose-50 text-rose-700 border-rose-200/80",
  amber: "bg-amber-50 text-amber-800 border-amber-200/80",
  blue: "bg-blue-50 text-blue-700 border-blue-200/80",
};

export const CalendarSection: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
  periods: CalendarPeriod[];
}> = ({ eyebrow, title, subtitle, periods }) => {
  return (
    <section
      data-testid="college-calendar"
      aria-labelledby="calendar-title"
      className="college-section"
    >
      <p className="college-eyebrow" data-testid="calendar-eyebrow">
        {eyebrow}
      </p>
      <h2 id="calendar-title" className="college-h2">
        {title}
      </h2>
      <p className="college-lead">{subtitle}</p>

      <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {periods.map((p, i) => {
          const accent = accentStyles[p.accent];
          return (
            <motion.article
              key={p.range}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              data-testid={`calendar-card-${i}`}
              className={`group relative rounded-2xl bg-white border-2 ${accent.border} ${accent.ring} px-7 sm:px-8 py-9 sm:py-10 transition-all duration-300 flex flex-col min-h-[220px]`}
            >
              <span
                className={`font-mono text-xs tracking-[0.18em] font-semibold ${accent.range}`}
                data-testid={`calendar-range-${i}`}
              >
                {p.range}
              </span>
              <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#0B1F42] leading-snug">
                {p.title}
              </h3>
              <p className="mt-4 text-[#64748B] text-base sm:text-lg leading-relaxed flex-1">
                {p.body}
              </p>
              {p.tag && (
                <span
                  data-testid={`calendar-tag-${i}`}
                  className={`mt-5 self-start inline-flex items-center gap-1.5 text-xs font-medium rounded-full border px-2.5 py-1 ${tagStyles[p.tag.tone]}`}
                >
                  <Flame className="w-3 h-3" />
                  {p.tag.label}
                </span>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

// ==========================================
// CURRICULUM COMPONENT
// ==========================================

const curriculumIconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  chart: BarChart3,
  stethoscope: Stethoscope,
  brain: Brain,
  quote: Quote,
};

export const Curriculum: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
  departments: Department[];
}> = ({ eyebrow, title, subtitle, departments }) => {
  return (
    <section
      data-testid="college-curriculum"
      aria-labelledby="curriculum-title"
      className="college-section"
    >
      <p className="college-eyebrow" data-testid="curriculum-eyebrow">
        {eyebrow}
      </p>
      <h2 id="curriculum-title" className="college-h2">
        {title}
      </h2>
      <p className="college-lead">{subtitle}</p>

      <div className="mt-12 sm:mt-14 space-y-12 sm:space-y-14">
        {departments.map((d, i) => {
          const Icon = curriculumIconMap[d.icon];
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              data-testid={`dept-block-${i}`}
            >
              <div className="flex items-center gap-2.5 text-[#0F172A]">
                <Icon className="w-[18px] h-[18px] text-[#64748B]" />
                <h3 className="font-bold text-xl sm:text-2xl text-[#0B1F42]">
                  {d.name}
                </h3>
              </div>
              <ul className="mt-6 flex flex-wrap gap-3">
                {d.courses.map((c, j) => (
                  <li key={c}>
                    <span
                      data-testid={`course-chip-${i}-${j}`}
                      className="chip font-mono text-[13px] sm:text-sm"
                    >
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

// ==========================================
// PROFESSOR INTELLIGENCE COMPONENT
// ==========================================

const profIconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  chart: BarChart3,
  stethoscope: Stethoscope,
  brain: Brain,
  quote: Quote,
};

export const ProfessorIntelligence: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: ProfessorIntel[];
}> = ({ eyebrow, title, subtitle, cards }) => {
  return (
    <section
      data-testid="college-professor-intel"
      aria-labelledby="prof-intel-title"
      className="college-section"
    >
      <p className="college-eyebrow" data-testid="prof-intel-eyebrow">
        {eyebrow}
      </p>
      <h2 id="prof-intel-title" className="college-h2">
        {title}
      </h2>
      <p className="college-lead">{subtitle}</p>

      <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((c, i) => {
          const Icon = profIconMap[c.icon];
          return (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              data-testid={`prof-intel-card-${i}`}
              className="college-card flex flex-col min-h-[360px]"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px] text-[#64748B]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1F42] text-xl sm:text-2xl leading-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[#64748B] text-base">{c.subtitle}</p>
                </div>
              </div>

              <p
                className="mt-8 college-eyebrow !mb-3"
                data-testid={`prof-intel-style-label-${i}`}
              >
                Assignment style
              </p>
              <ul className="mt-4 space-y-4">
                {c.bullets.map((b, j) => (
                  <li
                    key={b}
                    data-testid={`prof-intel-bullet-${i}-${j}`}
                    className="flex gap-3 text-[#0F172A] text-base sm:text-lg leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                <p className="text-[#64748B] text-base italic leading-relaxed">
                  {c.footnote}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

// ==========================================
// SERVICES COMPONENT
// ==========================================

const servicesIconMap: Record<string, LucideIcon> = {
  doc: FileText,
  clipboard: ClipboardList,
  search: Search,
  book: BookOpen,
  diploma: GraduationCap,
  pencil: Pencil,
  chart: BarChart3,
};

export const Services: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: ServiceCard[];
}> = ({ eyebrow, title, subtitle, cards }) => {
  return (
    <section
      data-testid="college-services"
      aria-labelledby="services-title"
      className="college-section"
    >
      <p className="college-eyebrow" data-testid="services-eyebrow">
        {eyebrow}
      </p>
      <h2 id="services-title" className="college-h2">
        {title}
      </h2>
      <p className="college-lead">{subtitle}</p>

      <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((s, i) => {
          const Icon = servicesIconMap[s.icon];
          const featured = !!s.badge;
          return (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              data-testid={`service-card-${s.id}`}
              className={`college-card group flex flex-col min-h-[380px] ${
                featured
                  ? "!border-[#1652A0] shadow-[0_24px_60px_-30px_rgba(22,82,160,0.35)]"
                  : ""
              }`}
            >
              {s.badge && (
                <span
                  data-testid={`service-badge-${s.id}`}
                  className="absolute -top-2.5 left-6 inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-[#E8F0FE] text-[#0B1F42] border border-[#E2E8F0]"
                >
                  {s.badge}
                </span>
              )}

              <div className="w-11 h-11 rounded-xl bg-[#E8F0FE] border border-[#E8F0FE] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#1652A0]" />
              </div>

              <h3 className="mt-5 font-bold text-xl text-[#0F172A]">
                {s.title}
              </h3>
              <p className="mt-3 text-[#64748B] text-base sm:text-lg leading-relaxed flex-1">
                {s.body}
              </p>

              <a
                href={s.href}
                data-testid={`service-cta-${s.id}`}
                className="mt-8 college-btn-secondary w-full !rounded-xl"
              >
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                {s.cta}
              </a>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

// ==========================================
// TESTIMONIALS COMPONENT
// ==========================================

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export const Testimonials: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
  items: CollegeTestimonial[];
}> = ({ eyebrow, title, subtitle, items }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const canCarousel = items.length > 1;

  const goPrev = () =>
    setActiveIdx((i) => (i - 1 + items.length) % items.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % items.length);

  return (
    <section
      data-testid="college-testimonials"
      aria-labelledby="testimonials-title"
      className="college-section -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 rounded-none sm:rounded-2xl"
      style={{ backgroundColor: "#FAFBFC" }}
    >
      <motion.div
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <p className="college-eyebrow" data-testid="testimonials-eyebrow">
            {eyebrow}
          </p>
          <h2 id="testimonials-title" className="college-h2">
            {title}
          </h2>
          <p className="college-lead">{subtitle}</p>
          {/* Inline aggregate star anchor - minimal */}
          <div
            className="mt-4 flex items-center gap-2"
            data-testid="testimonials-aggregate-stars"
            aria-label="4.9 out of 5 average rating"
          >
            <span className="flex items-center gap-0.5">
              {([1, 2, 3, 4, 5] as const).map((n) => (
                <Star
                  key={n}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                  aria-hidden
                />
              ))}
            </span>
            <span className="text-sm font-semibold text-[#0B1F42]">4.9</span>
            <span className="text-sm text-[#64748B]">
              from 4,100+ verified orders
            </span>
          </div>
        </div>

        {canCarousel && (
          <motion.div
            className="hidden sm:flex items-center gap-1 shrink-0"
            data-testid="testimonials-nav-desktop"
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-8 h-8 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-8 h-8 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Desktop / tablet grid */}
      <div className="mt-10 sm:mt-12 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((t, i) => (
          <TestimonialCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>

      {/* Mobile carousel */}
      <div
        className="mt-8 md:hidden"
        data-testid="testimonials-carousel-mobile"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={items[activeIdx]?.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {items[activeIdx] && (
              <TestimonialCard
                testimonial={items[activeIdx]}
                index={activeIdx}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {canCarousel && (
          <div className="mt-5 flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-1.5"
              data-testid="testimonials-nav-mobile"
            >
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="w-8 h-8 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="w-8 h-8 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div
              className="flex items-center gap-1"
              role="tablist"
              aria-label="Testimonial slides"
            >
              {items.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? "w-2 h-2 bg-[#1652A0]"
                      : "w-1.5 h-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <p
        className="mt-6 text-center text-xs text-[#94A3B8]"
        data-testid="testimonials-verified"
      >
        All reviews are from verified customer orders
      </p>
    </section>
  );
};

const TestimonialCard: React.FC<{
  testimonial: CollegeTestimonial;
  index: number;
}> = ({ testimonial: t, index }) => {
  const initials = initialsFromName(t.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      data-testid={`testimonial-card-${t.id}`}
      className="rounded-lg border border-[#E2E8F0] bg-white p-5 sm:p-6 hover:border-[#CBD5E1] transition-colors duration-200"
    >
      {/* Header: Stars + Verified badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className="flex items-center gap-1"
          aria-label={`${t.rating} out of 5 stars`}
        >
          <span className="flex items-center gap-0.5">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <Star
                key={n}
                className={`w-3.5 h-3.5 ${
                  n <= t.rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-[#E2E8F0] fill-[#E2E8F0]"
                }`}
              />
            ))}
          </span>
        </div>
        <span
          className="text-[10px] font-medium text-emerald-700 bg-emerald-50 rounded px-2 py-0.5 border border-emerald-200/60"
          data-testid={`testimonial-verified-${t.id}`}
        >
          Verified
        </span>
      </div>

      {/* Quote — clean and readable */}
      <p className="text-[#0F172A] text-sm sm:text-[15px] leading-relaxed flex-1">
        {t.quote}
      </p>

      {/* Course/Service metadata — minimal */}
      {(t.course || t.serviceUsed) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {t.course && (
            <span
              className="text-[11px] font-mono text-[#64748B] bg-[#F8FAFC] rounded px-2 py-1"
              data-testid={`testimonial-course-${t.id}`}
            >
              {t.course}
            </span>
          )}
          {t.serviceUsed && (
            <span
              className="text-[11px] text-[#64748B] bg-[#F8FAFC] rounded px-2 py-1"
              data-testid={`testimonial-service-${t.id}`}
            >
              {t.serviceUsed}
            </span>
          )}
        </div>
      )}

      {/* Author section — compact and clean */}
      <div className="mt-4 pt-4 border-t border-[#F0F1F3] flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-full bg-[#E8F0FE] text-[#1652A0] text-xs font-semibold flex items-center justify-center shrink-0"
          aria-hidden
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-[#0F172A] text-[13px] truncate">
            {t.name}
          </p>
          <p className="text-[#94A3B8] text-[12px] truncate">
            {t.major.split(" · ")[0]}
            {t.semester && ` · ${t.semester}`}
            {!t.semester && t.year && ` · ${t.year}`}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

// ==========================================
// FAQ COMPONENT
// ==========================================

const FaqAccordionItem: React.FC<{
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, index, isOpen, onToggle }) => (
  <div
    data-testid={`faq-item-${index}`}
    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
      isOpen
        ? "border-[#E2E8F0] bg-[#E8F0FE]/40 shadow-soft"
        : "border-[#E2E8F0] bg-white hover:border-[#E8F0FE]"
    }`}
  >
    <button
      type="button"
      id={`faq-trigger-${index}`}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      onClick={onToggle}
      className="w-full flex items-start justify-between gap-4 px-6 sm:px-8 py-5 sm:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652A0] focus-visible:ring-offset-2 rounded-2xl"
    >
      <span
        className={`font-semibold text-[15px] sm:text-base leading-snug pr-2 transition-colors ${
          isOpen ? "text-[#0B1F42]" : "text-[#0F172A]"
        }`}
      >
        {item.question}
      </span>
      <span
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isOpen
            ? "bg-[#1652A0] border-[#1652A0] text-white rotate-180"
            : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]"
        }`}
      >
        <ChevronDown className="w-4 h-4" aria-hidden />
      </span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-panel-${index}`}
          aria-labelledby={`faq-trigger-${index}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#64748B] text-[15px] leading-relaxed border-t border-[#E8F0FE]/60 pt-4">
            {item.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const Faq: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
  support?: FaqSupportCard;
}> = ({ eyebrow, title, subtitle, items, support }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      data-testid="college-faq"
      aria-labelledby="faq-title"
      className="college-section"
    >
      <p className="college-eyebrow" data-testid="faq-eyebrow">
        {eyebrow}
      </p>
      <h2 id="faq-title" className="college-h2">
        {title}
      </h2>
      <p className="college-lead">{subtitle}</p>

      <div className="mt-9 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        <div className="flex-1 w-full min-w-0 space-y-3">
          {items.map((item, i) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        {support && (
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            data-testid="faq-support-card"
            className="w-full lg:w-[min(100%,360px)] shrink-0 college-card text-center lg:sticky lg:top-28 !p-8 sm:!p-10"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#E8F0FE] border border-[#E8F0FE] flex items-center justify-center">
              <Headphones className="w-5 h-5 text-[#1652A0]" aria-hidden />
            </div>
            <h3 className="mt-4 font-bold text-lg text-[#0F172A]">
              {support.heading}
            </h3>
            <img
              src={support.imageSrc}
              alt={support.imageAlt}
              className="mt-5 mx-auto w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-2xl border border-[#E2E8F0] shadow-soft"
              loading="lazy"
            />
            <p className="mt-4 font-bold text-[#0F172A]">{support.name}</p>
            <p className="text-[#64748B] text-sm">{support.role}</p>
            <p className="mt-3 text-[#64748B] text-sm leading-relaxed">
              Typical reply under 3 minutes during semester midterms.
            </p>
            <a
              href={support.contactHref}
              data-testid="faq-support-cta"
              className="mt-8 college-btn-primary w-full !rounded-xl"
            >
              {support.contactLabel}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.aside>
        )}
      </div>
    </section>
  );
};

// ==========================================
// BOTTOM CTA COMPONENT
// ==========================================

export const BottomCta: React.FC<{ data: BottomCtaData }> = ({ data }) => {
  return (
    <section
      data-testid="college-bottom-cta"
      aria-labelledby="bottom-cta-title"
      className="college-section pb-8 sm:pb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] px-8 sm:px-12 lg:px-16 py-14 sm:py-18 lg:py-20 text-center text-white"
        style={{
          background:
            "linear-gradient(165deg, #0B1F42 0%, #0D2B5A 40%, #1652A0 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.14] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-[#1652A0]/30 blur-3xl"
        />

        <div className="relative max-w-2xl mx-auto">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-xs font-medium text-white/95 mb-6"
            data-testid="bottom-cta-badge"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden />
            Keep up with the Greenwich Village Pace
          </span>

          <h2
            id="bottom-cta-title"
            className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight"
          >
            {data.title}
          </h2>
          <p className="mt-4 text-white/85 text-base sm:text-lg leading-relaxed">
            {data.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              href={data.primary.href}
              data-testid="bottom-cta-primary"
              className="college-btn-primary w-full sm:w-auto !rounded-xl !px-8 !py-4 !text-base !bg-white !text-[#0B1F42] hover:!bg-[#F8FAFC] shadow-lg group"
            >
              {data.primary.label}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
            {data.secondary && (
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href={data.secondary.href}
                data-testid="bottom-cta-secondary"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl border-2 border-white/40 text-white font-semibold text-base px-8 py-4 hover:bg-white/10 transition-colors"
              >
                {data.secondary.label}
              </motion.a>
            )}
          </div>

          <ul
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80"
            data-testid="bottom-cta-trust"
          >
            <li className="inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" aria-hidden />
              Confidential
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden />
              Deadlines met
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" aria-hidden />
              Original drafts
            </li>
          </ul>

          {data.trustLine && (
            <p className="mt-4 text-xs sm:text-sm text-white/60">
              {data.trustLine}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
};

// ==========================================
// TAILORED DATA (NEW YORK UNIVERSITY - NYU)
// ==========================================

export const nyuCollegeData: CollegeData = {
  breadcrumb: {
    rootHref: "/",
    collegesHref: "/colleges",
    collegesLabel: "Colleges",
  },
  fullName: "New York University (NYU)",
  shortCode: "NYU",
  heroTitle: "NYU Essay & Assignment Help",
  location: "New York City, NY",
  type: "Top-Ranked Private Research University",
  studentsLabel: "Trusted by NYU Violets",
  description:
    "Specialized academic writing support built for NYU students navigating the rigorous demands of Stern, Tandon, CAS, and Tisch. Whether you’re analyzing a philosophy text in Greenwich Village or coding an engineering capstone in Brooklyn, our expert writers know exactly what New York University professors expect.",
  cta: {
    primary: { href: "/order-now", label: "Get help for NYU coursework" },
    secondary: { href: "/writers", label: "Browse expert writers" },
  },
  trustChips: [
    { icon: "check", label: "Strictly Original Writing" },
    { icon: "clock", label: "12-Hour Urgent Turnarounds" },
    { icon: "star", label: "Stern & Tandon Alumni Writers" },
    { icon: "lock", label: "Fully Confidential" },
  ],
};

export const nyuStats: StatCard[] = [
  {
    icon: "award",
    label: "QS World Ranking",
    value: "#55",
    caption: "Rated Max 5 QS Stars for research & innovation",
  },
  {
    icon: "bars",
    label: "Top Ranked Subjects",
    value: "#1",
    caption: "Elite globally in Philosophy, Math, and Law",
  },
  {
    icon: "users",
    label: "Specialized writers",
    value: "140+",
    caption: "Experts familiar with Stern, CAS, and Tandon expectations",
  },
  {
    icon: "dollar",
    label: "Per-page pricing",
    value: "$14.50",
    caption: "Transparent rate \u00b7 Premium NYC academic standards",
  },
];

export const nyuAlert: AlertBanner = {
  title: "NYC Semester Pace Alert:",
  body: "NYU's fast-paced environment means assignments pile up rapidly. From the notorious Stern curve to CAS midterms in October and March, the workload is intense. Lock in your specialized writer before the campus-wide crunch hits.",
};

export const nyuCalendarPeriods: CalendarPeriod[] = [
  {
    accent: "red",
    range: "OCT WEEK 6\u20138",
    title: "Fall Midterms",
    body: "CAS humanities papers, early Stern finance cases, and Tandon lab milestones converge. The fast NYC pace hits hard right before Halloween.",
    tag: { tone: "red", label: "Book Ahead" },
  },
  {
    accent: "amber",
    range: "DEC WEEK 13\u201315",
    title: "Fall Finals",
    body: "Cumulative exams, deep research papers, and crucial final projects stack up in early December just as the city gets busy.",
    tag: { tone: "amber", label: "High Volume" },
  },
  {
    accent: "blue",
    range: "MAR WEEK 7\u20138",
    title: "Spring Midterms",
    body: "The spring semester pressure peaks with intensive psychology reviews, math problem sets, and Stern group project evaluations.",
  },
  {
    accent: "rose",
    range: "MAY WEEK 14\u201315",
    title: "Finals & Capstones",
    body: "Tandon engineering capstones, Stern final presentations, and comprehensive CAS theses are due. Demand for top writers is at its peak.",
    tag: { tone: "rose", label: "Thesis Rush" },
  },
];

export const nyuDepartments: Department[] = [
  {
    icon: "chart",
    name: "Stern School of Business",
    courses: [
      "FIN-UB 2",
      "ACCT-UB 1",
      "MGMT-UB 1",
      "MKTG-UB 1",
      "ECON-UB 11",
    ],
  },
  {
    icon: "brain",
    name: "Tandon School of Engineering",
    courses: ["CS-UY 1114", "EG-UY 1001", "MA-UY 1024", "PH-UY 1013"],
  },
  {
    icon: "book",
    name: "College of Arts & Science (CAS)",
    courses: ["MATH-UA 121", "PSYCH-UA 1", "PHIL-UA 1", "SOC-UA 1"],
  },
  {
    icon: "stethoscope",
    name: "Life Sciences & Medicine",
    courses: ["BIOL-UA 11", "CHEM-UA 125", "NEUR-UA 100", "BMS-GY 1003"],
  },
];

export const nyuProfessorCards: ProfessorIntel[] = [
  {
    icon: "chart",
    title: "Stern Business Cases",
    subtitle: "Rigor designed to survive the famous 'Stern Curve'",
    bullets: [
      "Executive summaries that mirror Wall Street brevity—straight to the data and action plan.",
      "Flawless integration of financial models and strategic frameworks (SWOT, Porter's Five Forces).",
      "Clear, professional tone that business school professors expect for case competition readiness.",
    ],
    footnote:
      "Stern graders penalize fluff heavily. We ensure your analyses are concise, data-driven, and highly analytical to stand out on the curve.",
  },
  {
    icon: "book",
    title: "CAS Humanities & Social Sciences",
    subtitle: "Deep theoretical engagement for top-ranked programs",
    bullets: [
      "Thesis-driven essays that engage critically with course readings in Philosophy, Psychology, and Sociology.",
      "Perfectly formatted citations (APA for Psych/Soc, Chicago/MLA for Philosophy/History).",
      "Original argumentation—not just summary—showing deep comprehension of complex lectures.",
    ],
    footnote:
      "NYU is globally renowned for its Philosophy and Psychology programs. Our writers match this elite standard with profound, nuanced academic writing.",
  },
  {
    icon: "brain",
    title: "Tandon Engineering & Tech",
    subtitle: "Precision lab reports and clean technical methodology",
    bullets: [
      "Rigorous adherence to technical lab report structures expected by Brooklyn campus TAs.",
      "Clear, step-by-step methodology explanations and data visualizations.",
      "Accurate technical terminology appropriate for both undergraduate and master's level STEM courses.",
    ],
    footnote:
      "Tandon professors care about reproducible methods and clear technical communication. We help you explain the math and code perfectly.",
  },
];

export const nyuServiceCards: ServiceCard[] = [
  {
    id: "essay",
    icon: "doc",
    title: "Essay Writing Help",
    body: "Professional essay writing across all types \u2014 argumentative, narrative, analytical, reflective, and more. APA, MLA, Chicago formatting available.",
    cta: "Browse essay types",
    href: "/essay-writing",
    badge: "Most ordered",
  },
  {
    id: "assignment",
    icon: "clipboard",
    title: "Assignment Help",
    body: "Comprehensive assignment writing support for all subjects \u2014 management, programming, math, humanities, engineering, and more. Expert writers for every discipline.",
    cta: "Get assignment help",
    href: "/assignment-help",
  },
  {
    id: "research",
    icon: "search",
    title: "Research Paper Help",
    body: "In-depth research papers spanning STEM, humanities, social sciences, and business. Properly sourced, cited, and formatted to your institution\u2019s standards.",
    cta: "Order research paper",
    href: "/paper-writing-services",
  },
  {
    id: "thesis",
    icon: "book",
    title: "Thesis Writing Help",
    body: "From proposal to final chapter \u2014 structured thesis support for undergraduate honors, master\u2019s, and graduate-level thesis projects across all disciplines.",
    cta: "Start your thesis",
    href: "/thesis-writing-services",
  },
  {
    id: "dissertation",
    icon: "diploma",
    title: "Dissertation Writing Help",
    body: "Comprehensive dissertation support from conceptualization through defense preparation. Expert writers with doctoral experience in your field.",
    cta: "Get dissertation help",
    href: "/dissertation-writing-services",
  },
];

export const nyuSampleTestimonials: CollegeTestimonial[] = [
  {
    id: "NYU-204",
    name: "Sarah M.",
    major: "Finance",
    year: "Junior · Stern School of Business",
    rating: 5,
    course: "FIN-UB 2 · Foundations of Finance",
    serviceUsed: "Case Analysis · 48-hr turnaround",
    semester: "Fall 2024",
    quote:
      "The Stern curve is brutal, and I had a major case study due the same week as my accounting midterm. The writer perfectly nailed the DCF analysis formatting and the executive summary was spotless. Saved my grade.",
  },
  {
    id: "NYU-517",
    name: "David L.",
    major: "Computer Science",
    year: "Sophomore · Tandon School of Engineering",
    rating: 5,
    course: "CS-UY 1114 · Intro to Programming",
    serviceUsed: "Technical Report · 5-day turnaround",
    semester: "Spring 2024",
    quote:
      "Writing up the documentation and complexity analysis for my coding project was taking way too long. The writer broke down my algorithm clearly and formatted it exactly to Tandon's lab standards.",
  },
  {
    id: "NYU-339",
    name: "Chloe T.",
    major: "Psychology",
    year: "Senior · College of Arts & Science",
    rating: 4,
    course: "PSYCH-UA 30 · Personality",
    serviceUsed: "Research Paper · 4-day turnaround",
    semester: "Fall 2024",
    quote:
      "NYU's psych department is top-tier so I was nervous about outsourcing. The paper cited recent journals in perfect APA format and drew great connections. Just needed a tiny edit on the thesis statement, which they did in an hour.",
  },
  {
    id: "NYU-712",
    name: "Javier R.",
    major: "Philosophy",
    year: "Junior · CAS",
    rating: 5,
    course: "PHIL-UA 40 · Ethics",
    serviceUsed: "Analytical Essay · 3-day turnaround",
    semester: "Spring 2025",
    quote:
      "My professor expects extremely deep readings of Kant and Mill. I didn't have time because of my internship in Midtown. The essay I got back was profound, well-argued, and didn't use any generic SparkNotes filler.",
  },
  {
    id: "NYU-088",
    name: "Emily W.",
    major: "Marketing",
    year: "Senior · Stern School of Business",
    rating: 5,
    course: "MKTG-UB 1 · Intro to Marketing",
    serviceUsed: "Market Strategy Plan · 24-hr turnaround",
    semester: "Fall 2024",
    quote:
      "Had a 15-page market entry strategy due and I was drowning. The writer used real data, formatted the SWOT beautifully, and made it sound like an actual consulting deliverable. Unbelievable quality for 24 hours.",
  },
  {
    id: "NYU-631",
    name: "Jason H.",
    major: "Pre-Med / Biology",
    year: "Sophomore · CAS",
    rating: 5,
    course: "BIOL-UA 11 · Principles of Biology",
    serviceUsed: "Lab Write-up · 36-hr turnaround",
    semester: "Spring 2025",
    quote:
      "Chem and Bio lab reports back-to-back are a nightmare. I sent over my raw data and the TA's rubric. The results and discussion sections came back flawless, explaining the reaction yield perfectly.",
  },
];

export const nyuSampleFaq: FaqItem[] = [
  {
    question:
      "Are your writers familiar with NYU's specific program requirements?",
    answer:
      "Yes. NYU's academic landscape is diverse—from the quantitative rigor of Stern and Tandon to the deep humanities focus of CAS and Steinhardt. We match your assignment with writers who hold degrees in your specific discipline and understand the difference in grading rubrics across the Manhattan and Brooklyn campuses.",
  },
  {
    question:
      "I’m an international student at NYU. Can you help me meet the language expectations?",
    answer:
      "Absolutely. NYU has one of the highest international student populations in the US. If you gained admission meeting the TOEFL 100+ or IELTS 7.5+ requirements, you are expected to write at a very high academic level. Our native English-speaking experts help bridge any gaps, ensuring your ideas are communicated flawlessly without losing your unique voice.",
  },
  {
    question: "Will my paper pass Turnitin and NYU's strict academic integrity checks?",
    answer:
      "100%. NYU has a zero-tolerance policy for plagiarism. Every assignment we deliver is written entirely from scratch based on your specific prompt and syllabus. We never use recycled content, essay banks, or AI generation. You will receive a fully original document that passes Turnitin and NYU Brightspace checks with flying colors.",
  },
  {
    question:
      "Can you handle complex formatting like Stern case studies or Tandon lab reports?",
    answer:
      "Yes. Our team includes specialists who know how to format executive summaries for Stern, technical IEEE reports for Tandon, and standard APA/Chicago styles for CAS psychology and philosophy papers. Just attach your professor's instructions and we will follow them to the letter.",
  },
];

export const nyuSampleFaqSupport: FaqSupportCard = {
  heading: "Live Chat Support for NYU",
  name: "Marcus",
  role: "East Coast Academic Advisor",
  imageSrc: "/images/writers/Marcus-East-Coast.jpg",
  imageAlt: "Marcus, East Coast Academic Advisor",
  contactHref: "/contact",
  contactLabel: "Chat about your assignment",
};

export const nyuSampleBottomCta: BottomCtaData = {
  title: "Don't Let the NYU Semester Overwhelm You",
  subtitle:
    "Thousands of Violets trust Essay Embassy when Washington Square Park gets busy and deadlines overlap. Keep your grades high while navigating the fast pace of New York City.",
  primary: { href: "/order-now", label: "Get your quote now" },
  secondary: { href: "/samples", label: "View writing samples" },
  trustLine: "Pay only when the final draft meets your course requirements.",
};

// ==========================================
// PAGE COMPONENT EXPORT
// ==========================================

export default function NewYorkUniversityNYU() {
  return (
    <>
      <title>
        NYU Essay Help | New York University Assignment Writing Service
      </title>
      <meta
        name="description"
        content="Expert academic writing for New York University (NYU) students. Tailored support for Stern business cases, Tandon engineering labs, and CAS research papers."
      />
      <link
        rel="canonical"
        href="https://essayembassy.com/colleges/new-york-university-nyu/"
      />

      <motion.div className="college-page min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 sm:pb-28">
          <Hero data={nyuCollegeData} />
          <Stats stats={nyuStats} />
          <Alert data={nyuAlert} />
          <CalendarSection
            eyebrow="NYU academic pulse"
            title="When the Semester Pressure Builds"
            subtitle="The fast-paced NYC environment means assignments stack up fast. Get ahead of Stern, Tandon, and CAS deadlines."
            periods={nyuCalendarPeriods}
          />
          <Curriculum
            eyebrow="School-Specific Knowledge"
            title="Covering Manhattan to Brooklyn"
            subtitle="From Greenwich Village to the Brooklyn Tech Triangle \u2014 we know what your professors expect."
            departments={nyuDepartments}
          />
          <ProfessorIntelligence
            eyebrow="Faculty & TA expectations"
            title="Built for NYU’s Elite Standards"
            subtitle="With a top-55 global ranking, NYU sets a high bar. Our writers understand exactly what it takes to excel across all schools."
            cards={nyuProfessorCards}
          />
          <Services
            eyebrow="Expert academic solutions"
            title="Custom Support Built for Violets"
            subtitle="Whatever your program demands \u2014 drop your prompt, set your deadline, and lock in your grade."
            cards={nyuServiceCards}
          />
          <Testimonials
            eyebrow="Violets succeeding"
            title="What NYU Students Tell Us"
            subtitle="Real feedback from NYU students navigating the semester grind across Stern, CAS, and Tandon."
            items={nyuSampleTestimonials}
          />
          <Faq
            eyebrow="Common questions"
            title="Trust & Safety Protocols"
            subtitle="Everything you need to know before placing your first order for NYU coursework."
            items={nyuSampleFaq}
            support={nyuSampleFaqSupport}
          />
          <BottomCta data={nyuSampleBottomCta} />
        </div>
      </motion.div>
    </>
  );
}