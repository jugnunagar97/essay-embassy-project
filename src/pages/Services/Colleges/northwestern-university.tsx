import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  MapPin,
  Building2,
  Users,
  Check,
  Lock,
  Clock,
  Star,
  ArrowRight,
  LucideIcon,
  BarChart3,
  Award,
  DollarSign,
  AlertTriangle,
  Flame,
  BookOpen,
  Stethoscope,
  Brain,
  Quote,
  FileText,
  ClipboardList,
  Search,
  GraduationCap,
  Pencil,
  BadgeCheck,
  ShieldCheck,
  Headphones,
  Sparkles,
} from "lucide-react";

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
      {/* Decorative blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
        }}
      />
      {/* Breadcrumb */}
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

      {/* Title row */}
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

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="relative mt-8 max-w-3xl text-white/85 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed"
      >
        {data.description}
      </motion.p>

      {/* CTAs */}
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

      {/* Divider */}
      <div className="relative mt-12 h-px bg-white/20" />

      {/* Trust chips */}
      <ul
        data-testid="hero-trust-chips"
        className="relative mt-8 flex flex-wrap gap-x-10 gap-y-4 text-white/90 text-base sm:text-lg"
      >
        {data.trustChips.map((c, i) => {
          const Icon = trustIconMap[c.icon];
          return (
            <li
              key={i}
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
            <div className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">{s.caption}</div>
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
    <div
      data-testid="college-alert"
      role="status"
      className="mt-8 sm:mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 sm:px-8 py-5 sm:py-6 flex gap-4 items-start"
    >
      <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" aria-hidden />
      <p className="text-base sm:text-lg leading-relaxed text-amber-900">
        <span className="font-semibold text-amber-900">{data.title}</span>{" "}
        <span className="text-amber-800/90">{data.body}</span>
      </p>
    </div>
  );
};

// ==========================================
// CALENDAR SECTION COMPONENT
// ==========================================

type Tone = "red" | "rose" | "amber" | "blue";
const accentStyles: Record<Tone, { border: string; range: string; ring: string }> = {
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
      <h2
        id="calendar-title"
        className="college-h2"
      >
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
      <h2
        id="curriculum-title"
        className="college-h2"
      >
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
      <h2
        id="prof-intel-title"
        className="college-h2"
      >
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

              <p className="mt-8 college-eyebrow !mb-3" data-testid={`prof-intel-style-label-${i}`}>
                Assignment style
              </p>
              <ul className="mt-4 space-y-4">
                {c.bullets.map((b, j) => (
                  <li
                    key={j}
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
      <h2
        id="services-title"
        className="college-h2"
      >
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
                featured ? "!border-[#1652A0] shadow-[0_24px_60px_-30px_rgba(22,82,160,0.35)]" : ""
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
      className="college-section -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 rounded-none sm:rounded-3xl"
      style={{ backgroundColor: "#FAFBFC" }}
    >
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <p className="college-eyebrow" data-testid="testimonials-eyebrow">
            {eyebrow}
          </p>
          <h2
            id="testimonials-title"
            className="college-h2"
          >
            {title}
          </h2>
          <p className="college-lead">
            {subtitle}
          </p>
        </div>

        {canCarousel && (
          <motion.div
            className="hidden sm:flex items-center gap-2 shrink-0"
            data-testid="testimonials-nav-desktop"
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white shadow-soft flex items-center justify-center text-[#0F172A] hover:border-[#1652A0] hover:text-[#1652A0] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white shadow-soft flex items-center justify-center text-[#0F172A] hover:border-[#1652A0] hover:text-[#1652A0] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </motion.div>

      <div className="mt-12 sm:mt-14 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {items.map((t, i) => (
          <TestimonialCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>

      <div className="mt-9 md:hidden" data-testid="testimonials-carousel-mobile">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[activeIdx]?.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {items[activeIdx] && (
              <TestimonialCard testimonial={items[activeIdx]} index={activeIdx} />
            )}
          </motion.div>
        </AnimatePresence>

        {canCarousel && (
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" data-testid="testimonials-nav-mobile">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white shadow-soft flex items-center justify-center text-[#0F172A]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white shadow-soft flex items-center justify-center text-[#0F172A]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial slides">
              {items.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIdx ? "w-7 bg-[#1652A0]" : "w-2 bg-[#CBD5E1] hover:bg-[#E8F0FE]"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <p
        className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-[#64748B]"
        data-testid="testimonials-verified"
      >
        <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden />
        <span>Verified orders from real students — names shortened for privacy</span>
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      data-testid={`testimonial-card-${t.id}`}
      className="college-card group flex flex-col min-h-[360px] hover:border-[#CBD5E1]"
    >
      <Quote
        className="absolute top-5 right-5 w-9 h-9 text-[#E8F0FE] group-hover:text-[#CBD5E1] transition-colors"
        aria-hidden
      />

      <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < t.rating ? "text-amber-500 fill-amber-500" : "text-[#E2E8F0] fill-[#E2E8F0]"
            }`}
          />
        ))}
      </div>

      <p className="mt-5 text-[#0F172A] text-[15px] sm:text-base leading-relaxed flex-1 relative z-[1]">
        &ldquo;{t.quote}&rdquo;
      </p>

      {t.course && (
        <span
          className="mt-4 self-start inline-flex text-xs font-mono font-medium text-[#0B1F42] bg-[#E8F0FE] border border-[#E8F0FE] rounded-full px-2.5 py-1"
          data-testid={`testimonial-course-${t.id}`}
        >
          {t.course}
        </span>
      )}

      <motion.div className="mt-6 pt-5 border-t border-[#E2E8F0]/80 flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1652A0] to-[#0B1F42] text-white flex items-center justify-center text-sm font-semibold shadow-soft shrink-0"
          aria-hidden
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[#0F172A] text-[15px] truncate">{t.name}</p>
          <p className="text-[#64748B] text-sm truncate">
            {t.major} · {t.year}
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-full px-2 py-0.5">
          <ShieldCheck className="w-3 h-3" aria-hidden />
          Verified
        </span>
      </motion.div>
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
          role="region"
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
      <h2
        id="faq-title"
        className="college-h2"
      >
        {title}
      </h2>
      <p className="college-lead">{subtitle}</p>

      <div className="mt-9 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        <div className="flex-1 w-full min-w-0 space-y-3">
          {items.map((item, i) => (
            <FaqAccordionItem
              key={i}
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
              Typical reply under 3 minutes during quarter-system midterms.
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
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
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
            Keep up with the Quarter System
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
            <p className="mt-4 text-xs sm:text-sm text-white/60">{data.trustLine}</p>
          )}
        </div>
      </motion.div>
    </section>
  );
};

// ==========================================
// TAILORED DATA (NORTHWESTERN UNIVERSITY)
// ==========================================

export const nuCollegeData: CollegeData = {
  breadcrumb: {
    rootHref: "/",
    collegesHref: "/colleges",
    collegesLabel: "Colleges",
  },
  fullName: "Northwestern University",
  shortCode: "NU",
  heroTitle: "Northwestern University Essay & Assignment Help",
  location: "Evanston & Chicago, Illinois",
  type: "Top-Tier Private Research Institution",
  studentsLabel: "Join 20,500+ global students",
  description:
    "Expert coursework and academic writing services matched perfectly to NU’s rapid 10-week quarter pace. From high-level journalism research at Medill and quantitative case frameworks for Kellogg, to liberal arts essays across the Weinberg College.",
  cta: {
    primary: { href: "/order-now", label: "Get help for NU coursework" },
    secondary: { href: "/writers", label: "Browse expert writers" },
  },
  trustChips: [
    { icon: "check", label: "Strict AP & Chicago Formatting" },
    { icon: "clock", label: "12-Hour Urgent Turnarounds" },
    { icon: "star", label: "Subject-Matter MBA & STEM Experts" },
    { icon: "lock", label: "Private & Untraceable" },
  ],
};

export const nuStats: StatCard[] = [
  {
    icon: "bars",
    label: "NU tasks delivered",
    value: "3,850+",
    caption: "Spanning Evanston and Chicago campuses",
  },
  {
    icon: "award",
    label: "Ranked Excellence",
    value: "#42",
    caption: "Aligned with QS World 2026 rigorous standards",
  },
  {
    icon: "users",
    label: "Specialized writers",
    value: "140+",
    caption: "Alumni & experts familiar with Kellogg / Medill",
  },
  {
    icon: "dollar",
    label: "Per-page pricing",
    value: "$14.50",
    caption: "Transparent rate · Elite university standards",
  },
];

export const nuAlert: AlertBanner = {
  title: "The Quarter System Alert:",
  body: "NU’s lightning-fast 10-week quarters mean overlapping deadlines. Week 5 Midterms and Week 9 Finals bring huge spikes in demand. Reserve a writer ahead of your syllabus.",
};

export const nuCalendarPeriods: CalendarPeriod[] = [
  {
    accent: "red",
    range: "WEEK 4-5",
    title: "Midterm Crisis",
    body: "First round of heavy essays hits the Weinberg College of Arts and Sciences fast. Don't fall behind.",
    tag: { tone: "red", label: "Book Ahead" },
  },
  {
    accent: "amber",
    range: "WEEK 8-9",
    title: "Dillo Day / Reading Week",
    body: "Spring festivals collide with deep research paper drafting for history and political science.",
    tag: { tone: "amber", label: "High Volume" },
  },
  {
    accent: "blue",
    range: "WEEK 10",
    title: "Final Exams",
    body: "Lengthy McCormick labs and Kellogg final MBA presentations due at midnight on Canvas.",
  },
  {
    accent: "rose",
    range: "ADMISSIONS",
    title: "MBA / Grad Apps",
    body: "Hitting that GMAT 590+ average is tough enough. Let us refine your personal admissions statement.",
  },
];

export const nuDepartments: Department[] = [
  {
    icon: "quote",
    name: "Medill School of Journalism",
    courses: ["JOUR 201-1", "JOUR 320", "IMC 303", "COMM_ST 225"],
  },
  {
    icon: "chart",
    name: "Kellogg School of Management",
    courses: ["MKTG 430", "FINC 440", "ACCT 430", "MORS 430"],
  },
  {
    icon: "brain",
    name: "McCormick Engineering",
    courses: ["COMP_SCI 111", "IEMS 201", "BMES 270", "EECS 211"],
  },
  {
    icon: "book",
    name: "Weinberg College of Arts",
    courses: ["ECON 202", "POLI_SCI 240", "SOCIOL 110", "ENGLISH 211"],
  },
];

export const nuProfessorCards: ProfessorIntel[] = [
  {
    icon: "quote",
    title: "Journalism & Media",
    subtitle: "AP Style precision & aggressive fact-checking",
    bullets: [
      "Rigid adherence to the current AP Stylebook parameters.",
      "Clear, active journalistic voice that aligns with Medill expectations.",
      "Fact-checked research sources integrated cleanly without bloat.",
    ],
    footnote: "Professors at Medill grade heavily on syntax and structural reporting ethics. We edit mercilessly for clarity.",
  },
  {
    icon: "chart",
    title: "Business & Strategy Cases",
    subtitle: "MBA frameworks fit for Kellogg standards",
    bullets: [
      "Data-backed action plans driven by modern marketing insights (IMC).",
      "Spreadsheets that supplement qualitative executive summaries.",
      "Nuanced organizational management reports based on peer-reviewed cases.",
    ],
    footnote: "Whether for undergraduate or Kellogg students, case analysis must be instantly readable for executives.",
  },
  {
    icon: "brain",
    title: "STEM & Liberal Arts",
    subtitle: "Technical jargon meets Chicago style formatting",
    bullets: [
      "Coding projects and heavy analytical labs tailored to McCormick standards.",
      "Thorough literature reviews spanning Weinberg history and psychology disciplines.",
      "Perfect implementation of Chicago/Turabian endnotes where requested.",
    ],
    footnote: "Provide your TA's exact Canvas grading rubric, and we tailor the technical depths directly to it.",
  },
];

export const nuServiceCards: ServiceCard[] = [
  {
    id: "research",
    icon: "doc",
    title: "Heavy Research Papers",
    body: "Intensively vetted papers spanning economics to psychology. Formatted flawlessly in APA, Chicago, or MLA.",
    cta: "Hire a researcher",
    href: "/order-now",
    badge: "Quarter favorite",
  },
  {
    id: "journalism",
    icon: "clipboard",
    title: "Reporting & Edit Reviews",
    body: "Draft polishing that tightens paragraphs into pure, readable AP-styled gold fit for Media majors.",
    cta: "Perfect my piece",
    href: "/essay-writing/editing",
  },
  {
    id: "business",
    icon: "chart",
    title: "Kellogg MBA Analysis",
    body: "Comprehensive write-ups on supply chain operations, organizational behavior, and venture pitch decks.",
    cta: "MBA assignments",
    href: "/business-assignment-help",
  },
  {
    id: "admission",
    icon: "diploma",
    title: "Undergrad & Master Admissions",
    body: "Help overcoming standard baselines (like TOEFL 105+ or 3.5 GPA) via powerful essays showcasing diversity.",
    cta: "Get accepted",
    href: "/essay-writing/admission",
  },
  {
    id: "science",
    icon: "search",
    title: "Engineering Lab Reports",
    body: "From abstract to methodology—detailed procedural papers required to maintain honors GPAs in McCormick.",
    cta: "Lab report help",
    href: "/science-homework-help",
  },
];

export const nuSampleTestimonials: CollegeTestimonial[] = [
  {
    id: "NU-882",
    name: "Caleb F.",
    major: "Marketing/IMC",
    year: "Senior",
    rating: 5,
    course: "IMC 303 · Consumer Insight",
    quote: "With the Quarter system moving so fast, I was drowning. My writer compiled my market analysis over a 24-hour sprint. Clean data charts and spot-on qualitative insights. A true lifesaver.",
  },
  {
    id: "NU-399",
    name: "Aarti M.",
    major: "Political Science",
    year: "Sophomore",
    rating: 5,
    course: "POLI_SCI 240 · Intro to International Relations",
    quote: "Required heavy Chicago Manual formatting. The thesis was incredibly nuanced regarding current global structures. It felt like they genuinely understood Weinberg's teaching approach.",
  },
  {
    id: "NU-105",
    name: "Sam J.",
    major: "Engineering",
    year: "Grad Student",
    rating: 5,
    course: "IEMS 201 · Statistics",
    quote: "A tricky literature review wrapping up massive data modules. Got my work back quickly without needing a single structural edit before Dillo day. Kept me entirely stress-free.",
  },
];

export const nuSampleFaq: FaqItem[] = [
  {
    question: "Do you understand the fast-paced nature of Northwestern’s quarter system?",
    answer: "Absolutely. While many universities stretch out the term, we know Northwestern’s 10-week schedule means weeks 4 and 5 bring intense midterms and quick turnovers. Our writing team guarantees delivery starting from as quick as a few hours to match your crunch times."
  },
  {
    question: "I am an international student applying. Can you help me gain admission?",
    answer: "Yes! Nearly 21% of Northwestern's campus features brilliant international students. We can help construct essays highlighting your background while balancing common admission hurdles like English proficiency test expectations (Duolingo 115+, IELTS 6.5+) in the underlying tone of the paper."
  },
  {
    question: "Is this going to be caught by my Professor's Canvas scanners?",
    answer: "Our system produces 100% original work customized uniquely from your individual prompt. No recycled content, no essay banks. It reads naturally because real domain-expert academics write it based off standard literature parameters. Fully confidential."
  },
  {
    question: "Can your writers execute exact formatting required by Medill or Kellogg?",
    answer: "Our roster features over 100 post-graduate level writers that understand explicit school requirements—such as flawlessly executing strict AP journalistic guidelines, writing formal Harvard business case responses, or setting proper Turabian endnotes."
  }
];

export const nuSampleFaqSupport: FaqSupportCard = {
  heading: "Need Quarter Crunch Help?",
  name: "Marcus",
  role: "Midwest Operations Manager",
  imageSrc: "/images/marcus-support.avif",
  imageAlt: "Marcus, Support Team Lead",
  contactHref: "/contact",
  contactLabel: "Chat to match your prompt",
};

export const nuSampleBottomCta: BottomCtaData = {
  title: "Stay Ahead of the Wildcat Quarter Schedule",
  subtitle: "Thousands of Evanston and Chicago students turn to Essay Embassy when overlapping midterms stack up. Don't let your GPA slip because of impossible 10-week schedules.",
  primary: { href: "/order-now", label: "Quote your syllabus exactly" },
  secondary: { href: "/samples", label: "Check out writing styles" },
  trustLine: "Pay only when the final draft matches your school's expectations.",
};

// ==========================================
// PAGE COMPONENT EXPORT
// ==========================================

export default function NorthwesternUniversity() {
  return (
    <>
      <Helmet>
        <title>Northwestern University Essay Help | Northwestern Assignment Writing</title>
        <meta
          name="description"
          content="Overcome the 10-week quarter crush at Northwestern University. Premium essay writers tailored for Medill AP guidelines, Kellogg case analyses, and Weinberg thesis papers."
        />
        <link rel="canonical" href="https://essayembassy.com/colleges/northwestern-university/" />
      </Helmet>

      <motion.div className="college-page min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 sm:pb-28">
          <Hero data={nuCollegeData} />
          <Stats stats={nuStats} />
          <Alert data={nuAlert} />
          <CalendarSection
            eyebrow="Northwestern academic pulse"
            title="When the 10-Week Quarter gets Heavy"
            subtitle="Plan ahead during those dreaded 4th week and 9th week timeline crunches. We help match the wild tempo."
            periods={nuCalendarPeriods}
          />
          <Curriculum
            eyebrow="School-Specific Knowledge"
            title="Navigating the Chicago Campuses"
            subtitle="Syllabi matching perfectly executed for different Northwestern environments."
            departments={nuDepartments}
          />
          <ProfessorIntelligence
            eyebrow="Faculty & TA expectations"
            title="Matching High Academic Ceilings"
            subtitle="To thrive inside top-42 ranked global environments, papers demand extreme academic rigors and models."
            cards={nuProfessorCards}
          />
          <Services
            eyebrow="Expert academic solutions"
            title="Custom Support Built for Wildcats"
            subtitle="Whatever your curriculum demands. Drop your file, pick a timeline, and secure your grade."
            cards={nuServiceCards}
          />
          <Testimonials
            eyebrow="Wildcats succeeding"
            title="What Students Tell Us"
            subtitle="Don't take our word for it—listen to our active users handling Evanston and Chicago programs right now."
            items={nuSampleTestimonials}
          />
          <Faq
            eyebrow="Common questions"
            title="Trust & Safety Protocols"
            subtitle="Everything you need before hitting order on your latest heavy paper prompt."
            items={nuSampleFaq}
            support={nuSampleFaqSupport}
          />
          <BottomCta data={nuSampleBottomCta} />
        </div>
      </motion.div>
    </>
  );
}