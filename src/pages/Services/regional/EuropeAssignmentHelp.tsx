/**
 * Europe assignment help hub (single-file page).
 * Copy, schema, and UI cues are localised for European students (EUR, academic English, EU/EEA institutions).
 * Scrollable SEO cards: paste your content into `cardsData` below (right column of sticky SEO section).
 */
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
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
  MessageSquare,
  PenTool,
  Plus,
  Quote,
  RefreshCcw,
  ScrollText,
  Search,
  ShieldCheck,
  Star,
  UserPlus,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import RegionalAssignmentStickySeoSection from '../../../components/Services/regional/RegionalAssignmentStickySeoSection';
import RegionalAssignmentInterlink from '../../../components/Services/regional/RegionalAssignmentInterlink';
import AssignmentHelpSpecializationsGrid from '../../../components/Services/AssignmentHelpSpecializationsGrid';


// =============================================================================
// INLINED MODULES
// =============================================================================

type UnifiedPriceCalculatorProps = {
  compact?: boolean;
};

function UnifiedPriceCalculator({ compact = false }: UnifiedPriceCalculatorProps) {
  const [academicLevel, setAcademicLevel] = useState<'highschool' | 'undergraduate' | 'masters' | 'phd'>('undergraduate');
  const [pages, setPages] = useState(1);
  const [deadline, setDeadline] = useState<'3hours' | '6hours' | '12hours' | '24hours' | '3days' | '7days' | '14days' | '30days'>('7days');

  const baseRates: Record<typeof academicLevel, number> = {
    highschool: 15,
    undergraduate: 18,
    masters: 24,
    phd: 30,
  };

  const deadlineMultipliers: Record<typeof deadline, number> = {
    '3hours': 2.3,
    '6hours': 2.0,
    '12hours': 1.7,
    '24hours': 1.4,
    '3days': 1.2,
    '7days': 1.0,
    '14days': 0.9,
    '30days': 0.85,
  };

  const totalPrice = Math.round(baseRates[academicLevel] * pages * deadlineMultipliers[deadline]);
  const perPage = Math.round(totalPrice / pages);

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${compact ? 'p-6 lg:p-5' : 'p-8'}`}>
      <div className={`text-center ${compact ? 'mb-6' : 'mb-8'}`}>
        <h3 className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 mb-2`}>Calculate your live price</h3>
        <p className="text-gray-600 text-sm">From €10 per page. Clear estimate, no hidden fees.</p>
      </div>

      <div className={compact ? 'space-y-5' : 'space-y-6'}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#1652A0]" />
            Study level
          </label>
          <select
            value={academicLevel}
            onChange={(e) => setAcademicLevel(e.target.value as typeof academicLevel)}
            className={`w-full px-4 ${compact ? 'py-2.5' : 'py-3'} rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50`}
          >
            <option value="highschool">IB / Baccalaureate / Abitur (or equivalent)</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="masters">Postgraduate (coursework)</option>
            <option value="phd">Doctoral / PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1652A0]" />
              Length (pages)
            </span>
            <span className="text-[#1652A0] font-bold">{pages} {pages === 1 ? 'page' : 'pages'}</span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1652A0]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>1 page</span>
            <span className="text-gray-700">~{pages * 250} words</span>
            <span>50 pages</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1652A0]" />
            Deadline
          </label>
          <select
            value={deadline}
            onChange={(e) => setDeadline(e.target.value as typeof deadline)}
            className={`w-full px-4 ${compact ? 'py-2.5' : 'py-3'} rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50`}
          >
            <option value="3hours">3 Hours (Super Urgent)</option>
            <option value="6hours">6 Hours (Urgent)</option>
            <option value="12hours">12 Hours</option>
            <option value="24hours">24 Hours</option>
            <option value="3days">3 Days</option>
            <option value="7days">7 Days (Standard)</option>
            <option value="14days">14 Days (Relaxed)</option>
            <option value="30days">30 Days</option>
          </select>
        </div>

        <div className={`bg-[#0B1F42]/5 rounded-2xl ${compact ? 'p-4' : 'p-6'} border border-[#0B1F42]/10`}>
          <div className={`flex justify-between items-center ${compact ? 'mb-4' : 'mb-6'}`}>
            <div>
              <p className="text-[#0B1F42] text-sm font-semibold mb-1">Estimated Total:</p>
              <p className={`${compact ? 'text-3xl' : 'text-4xl'} font-black text-[#0B1F42]`}>€{totalPrice}</p>
            </div>
            <div className="text-right bg-white rounded-lg px-3 py-2 border border-[#0B1F42]/10">
              <p className="text-xs text-gray-500 font-medium">Per page</p>
              <p className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>€{perPage}</p>
            </div>
          </div>

          <Link
            to="/order-now"
            className={`w-full px-6 ${compact ? 'py-3.5 text-base' : 'py-4 text-lg'} bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
          >
            Proceed to order <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-gray-600">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free originality report</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> No hidden fees</span>
          </div>
        </div>
      </div>
    </div>
  );
}


/**
 * Paste your scrollable SEO cards here (right column of the sticky section below).
 * Example shape: { id: 1, Icon: BookOpen, heading: '...', body: `...` }
 */
/** Local assets under /public/images (brand SVGs). */
const BRAND_IMG = {
  gmail: '/images/gmail-icon.svg',
  google: '/images/google-icon.svg',
  trustpilot: '/images/trustpilot-logo.svg',
  sitejabber: '/images/sitejabber-wordmark.svg',
  instagram: '/images/instagram-gradient.svg',
} as const;

function AuthenticTestimonials() {
  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-[#FAFAFA] px-4 py-[80px] font-sans md:px-8">
      <div className="mx-auto mb-12 flex max-w-6xl min-w-0 flex-col items-center text-center">
        <span className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">Social Proof</span>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Real Words. Real Clients. <br className="hidden md:block" /> Zero Filters.
        </h2>
        <p className="mx-auto max-w-xl text-base font-medium text-gray-600 md:text-lg">
          Screenshots straight from inboxes, chats, and review platforms.
        </p>
      </div>

      <div className="mx-auto grid min-w-0 max-w-5xl auto-rows-max grid-cols-1 items-start gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))] md:gap-[15px]">
        {/* CARD 1: GMAIL */}
        <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white font-sans text-[13px] shadow-[0px_4px_16px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2 md:text-[14px]">
          <div className="flex items-center space-x-4 border-b border-gray-100 bg-white p-3">
            <img
              src={BRAND_IMG.gmail}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 object-contain"
              decoding="async"
            />
            <div className="text-[12px] text-gray-500">Inbox</div>
          </div>
          <div className="flex flex-col px-5 py-4">
            <h3 className="mb-2 text-[18px] text-[#202124] md:text-[20px]" style={{ fontWeight: 400 }}>
              Re: Final thesis check – you guys saved me
            </h3>

            <div className="mt-2 flex min-w-0 items-start justify-between gap-2">
              <div className="flex min-w-0 items-center space-x-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[14px] font-bold text-blue-700">
                  E
                </div>
                <div className="flex min-w-0 flex-col">
                  <div className="text-[13px] md:text-[14px]">
                    <span className="font-semibold text-black">Emily Parker</span>
                    <span
                      className="ml-2 select-none text-[12px] font-normal text-gray-500 blur-[2px] md:text-[13px]"
                      aria-label="Email hidden for privacy"
                    >
                      &lt;hannah.k@student.ethz.ch&gt;
                    </span>
                  </div>
                  <div className="text-[12px] text-gray-500">
                    to me <span className="mx-1">▾</span>
                  </div>
                </div>
              </div>
              <span className="shrink-0 text-[11px] text-gray-500 md:text-[12px]">3 weeks ago</span>
            </div>

            <div className="ml-0 mt-4 pb-4 font-[400] text-[14px] leading-relaxed text-[#222] sm:ml-10">
              Hey guys,
              <br />
              <br />
              Just wanted to drop a quick note. I got my dissertation chapter results back last month and I honestly
              can&apos;t believe it. Strong grade on the literature review section and I handed in on time.
              <br />
              <br />
              Literally wouldn&apos;t have graduated on time without this. Expect my sister to order something for her
              psychology module next week lmao.
              <br />
              <br />
              Best,
              <br />
              Emily
            </div>
          </div>
        </div>

        {/* CARD 2: WHATSAPP */}
        <div
          className="-rotate-[0.5deg] flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[20px] border border-gray-100 bg-[#E5DDD5] shadow-[0px_4px_16px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1 md:row-span-2"
          style={{
            backgroundImage: 'radial-gradient(#d3cbc1 1px, transparent 1px)',
            backgroundSize: '10px 10px',
          }}
        >
          <div className="sticky top-0 z-10 flex h-[60px] min-w-0 shrink-0 items-center bg-[#008069] px-4 shadow-sm">
            <div className="flex h-[16px] w-[10px] shrink-0 items-center text-white">←</div>
            <div className="mx-3 ml-2 flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-gray-300 text-[18px] text-white">
              🎓
            </div>
            <div className="min-w-0 flex-1 overflow-hidden text-white">
              <div className="truncate text-[15px] font-semibold leading-tight">Jake B.</div>
              <div className="mt-[-1px] truncate text-[12px] font-normal text-white/80">
                last seen Thu 21:18
              </div>
            </div>
            <div className="flex shrink-0 space-x-4 text-[18px] text-white">
              📹 📞
            </div>
          </div>

          <div className="flex flex-grow flex-col space-y-[14px] p-4">
            <div className="flex w-full justify-center pb-2">
              <div className="rounded-lg bg-[#D3E8EE] px-3 py-[2px] text-[11.5px] font-medium uppercase text-slate-500">
                Apr 12
              </div>
            </div>

            <div className="flex w-full justify-end">
              <div
                className="relative max-w-[85%] rounded-l-xl rounded-b-xl rounded-tr-[4px] bg-[#DCF8C6] px-2 py-[6px] pl-3 shadow-sm"
                style={{ boxSizing: 'border-box' }}
              >
                <div
                  className="inline-block max-w-full break-words pr-8 text-[14px] leading-snug tracking-[-0.2px] whitespace-pre-wrap text-[#303030]"
                  style={{ fontFamily: '-apple-system, system-ui' }}
                >
                  Hi Jake, just checking if you were happy with the final economics rewrite we delivered yesterday?
                </div>
                <div className="float-right ml-[-30px] mt-[5px] flex h-[14px] w-[35px] items-end justify-end text-right text-[10px] font-semibold text-[#136652]/70">
                  11:32
                  <div className="relative bottom-[1px] ml-[3px] text-[13px] tracking-[-4px] text-[#53BDEB]">
                    ✓✓
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex w-full">
              <div className="relative max-w-[85%] rounded-r-xl rounded-b-xl rounded-tl-[4px] bg-white px-2 py-[6px] pl-3 shadow-sm">
                <div className="inline-block pr-10 text-[14px] leading-[19px] whitespace-pre-wrap text-[#303030]">
                  bro u have no idea.
                  <br />
                  my prof literally said it was the clearest arg he read in my class so far 😭😭
                </div>
                <div className="absolute bottom-1 right-1.5 inline-block pl-[6px] text-[10px] text-gray-400">12:14</div>
              </div>
            </div>

            <div className="relative mt-[2px] flex w-full">
              <div className="relative max-w-[85%] rounded-bl-xl rounded-br-xl rounded-r-xl rounded-tl-[2px] bg-white px-2 py-[6px] pl-3 shadow-sm">
                <div className="inline-block pr-10 text-[14px] leading-[19px] whitespace-pre-wrap text-[#303030]">
                  you guys delivered fast af too. saved my degree classification seriously
                </div>
                <div className="absolute bottom-1 right-1.5 inline-block pl-[6px] text-[10px] text-gray-400">12:15</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: TRUSTPILOT */}
        <div
          className="relative flex min-w-0 rotate-[0.8deg] flex-col border-t-2 border-[#00B67A] bg-white p-[24px] font-sans shadow-[0px_4px_16px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1"
          style={{ borderRadius: '4px' }}
        >
          <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
            <img
              src={BRAND_IMG.trustpilot}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 object-contain"
              decoding="async"
            />
            <span className="text-[15px] font-bold tracking-tight text-[#191919]">Trustpilot</span>
          </div>
          <div className="mb-[6px] flex items-center space-x-[2px]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex h-5 w-5 items-center justify-center bg-[#00B67A] pb-[2px] text-white">
                ★
              </div>
            ))}
          </div>

          <div className="mb-3 flex items-center text-gray-500">
            <span className="mt-1 flex items-center gap-[4px] rounded-[3px] border border-gray-200 bg-[#E3EDE9]/60 px-1.5 text-[12px] font-semibold text-gray-500/80">
              <span className="relative top-[1px] text-[#00B67A]">✓</span> Verified
            </span>
          </div>

          <h3 className="mb-2 text-[16px] font-[700] leading-tight tracking-tight text-[#1a1a1a]">
            Consistently transparent and strict with native English
          </h3>
          <p
            className="mb-[20px] hyphens-auto text-justify text-[14px] font-medium leading-[22px] text-[#1a1a1a]"
            style={{ opacity: 0.85 }}
          >
            It&apos;s the 3rd time ordering, primarily for deep literature reviews. A bit anxious at first due to sketchy
            sites online, but Essay Embassy communicates instantly. 10/10 layout & perfectly matched standard of my native
            uni context. Zero AI detected on Turnitin as well.
          </p>
          <div className="absolute bottom-4 flex w-[calc(100%-48px)] items-center justify-between text-[13px] font-semibold text-[#6c6c85]">
            <span className="font-bold text-[#1a1a1a]">Marcus R. 🇩🇪</span>
            <span className="text-[12px] font-medium text-gray-500">Oct 14, 2024</span>
          </div>
        </div>

        {/* CARD 4: GOOGLE */}
        <div className="relative flex min-h-[220px] min-w-0 flex-col rounded-lg border border-gray-50 bg-white p-5 shadow-[0px_2px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1">
          <div className="mb-3 flex w-full items-center justify-between">
            <div className="flex min-w-0 items-center">
              <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#7B1FA2] text-lg font-bold text-white">
                A
              </div>
              <div className="ml-3 flex min-w-0 flex-col">
                <span className="text-[15px] font-[500] text-[#202124]">Austin R.</span>
                <span className="text-[12px] font-[400] tracking-[-0.2px] text-[#70757a]">Local Guide • 14 reviews</span>
              </div>
            </div>
            <img
              src={BRAND_IMG.google}
              alt="Google"
              width={28}
              height={28}
              className="mr-1 h-7 w-7 shrink-0 object-contain"
              decoding="async"
            />
          </div>

          <div className="mb-2 flex items-center gap-0 text-[18px] tracking-widest text-[#F4B400]">
            ★ ★ ★ ★ ★{' '}
            <span className="mt-1 ml-2 block align-middle text-[13px] font-medium leading-[20px] tracking-normal text-[#70757a]">
              4 days ago
            </span>
          </div>

          <p className="text-[14px] font-[400] leading-[20px] text-[#3c4043]">
            The drafting team actually listened to the specific rubric requirements instead of just giving generic waffle.
            Will highly recommend the premium writer option if u are a grad student struggling. They actually read the
            files u upload!
          </p>

          <div className="absolute bottom-4 mt-6 flex w-[calc(100%-40px)] items-center text-[13px] text-[#70757a]">
            <div className="flex cursor-default items-center rounded-[32px] border border-gray-200 bg-[#F8F9FA] px-[12px] py-[6px] hover:bg-gray-50">
              <svg focusable="false" viewBox="0 0 24 24" height="18px" width="18px" className="fill-current text-[#4285F4]">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
              <span className="ml-1 text-[13px] font-[500] text-black">12 Helpful</span>
            </div>
          </div>
        </div>

        {/* CARD 5: SITEJABBER */}
        <div className="flex min-w-0 flex-col rounded border border-gray-200 bg-white p-6 pb-5 pt-5 font-sans shadow-[0px_4px_16px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2">
          <div className="mb-[4px] space-y-3 border-b border-gray-100 pb-3">
            <div className="flex min-w-0 items-center justify-between gap-3">
              <img
                src={BRAND_IMG.sitejabber}
                alt="Sitejabber"
                className="h-6 w-auto min-w-0 max-w-[min(160px,55vw)] object-contain object-left md:h-7 md:max-w-[180px]"
                decoding="async"
              />
              <div className="shrink-0 text-[18px] font-[900] tracking-[0px] text-[#FF6600]">★ ★ ★ ★ ★</div>
            </div>
            <div className="flex min-w-0 items-center gap-[6px]">
              <div className="h-[32px] w-[32px] shrink-0 overflow-hidden rounded-full bg-slate-200" />
              <div className="min-w-0">
                <div className="text-[15px] font-[600] leading-tight text-gray-900">sarah_writes8</div>
                <div className="text-[12px] font-semibold tracking-[-0.3px] text-gray-500">Amsterdam, NL</div>
              </div>
            </div>
          </div>

          <h3 className="mb-2 pt-[10px] text-[18px] font-[600] text-[#111827]">
            Literally the only writing service I&apos;ll ever trust with my final-year marks.
          </h3>

          <p
            className="hyphens-auto break-words pb-5 pr-2 text-[14px] font-[400] leading-snug text-gray-800"
            style={{ wordBreak: 'break-word' }}
          >
            Tried multiple writing providers before (not gonna name drop them but most suck with non-English outsourced
            AI bs). Essay Embassy is totally completely different. Communication felt genuine. Real writers fixing
            citations exactly correctly in Harvard Style and integrating scholarly articles seamlessly. Support actually
            responses at 2am which saved me since my deadline was in 4hrs lmao. If u need help, actually trust these guys
            over the mega mills online. Quality is raw, unfiltered accuracy. Highly recommend their 24hr premium speed.
          </p>

          <div className="mt-auto mt-2 flex items-center gap-4 border-t border-gray-100 pt-1 text-[#4b5563]">
            <span className="flex items-center gap-[5px] rounded border border-[#FFD9C6] bg-[#FFF2ED] px-[6px] py-[1px] text-[13px] font-[500] text-[#FF6600]">
              ✓ Verified Buyer
            </span>
            <span className="flex gap-[2px] text-[13px] font-[600]">
              👍 Helpful <span className="ml-1 font-normal text-gray-400"> (16)</span>
            </span>
          </div>
        </div>

        {/* CARD 6: INSTAGRAM DM */}
        <div
          className="-rotate-[1.5deg] flex min-h-[230px] min-w-0 flex-col justify-end overflow-hidden rounded-2xl border-[1px] border-gray-200 bg-white px-3 pb-4 pt-[10px] font-sans shadow-[0px_4px_16px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1 md:min-h-[280px]"
        >
          <div className="mt-1 mb-5 flex w-full items-center justify-center gap-2 border-b border-gray-50 px-1 pb-2">
            <img
              src={BRAND_IMG.instagram}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] shrink-0 object-contain"
              decoding="async"
            />
            <div className="text-[15px] font-[600] text-gray-800">m_scott9</div>
          </div>

          <div className="flex w-full justify-center pb-3 text-[12px] font-semibold text-[#a8a8a8]">Wed 20:12</div>

          <div className="relative mb-2 mt-auto flex h-full w-full flex-grow-0 flex-col items-end justify-end gap-2 self-end pr-2">
            <div className="max-w-[85%] rounded-2xl bg-[#efefef] px-3 py-[8px] text-[14px] leading-[18px] text-[#000]">
              bro your service is literally goated 😭🙏 sent it directly to the portal as is!
            </div>

            <div className="relative max-w-[80%] rounded-[18px] bg-[#efefef] px-[12px] py-[8px] pr-8 text-[14px] leading-[18px] text-[#000]">
              the tutor actually commented &quot;excellent structural logic on Q4&quot; haha. definitely bookmarking u for
              next year ty❤️
            </div>
            <div className="mr-[2px] mt-1 text-[11px] text-[#A0A0A0]">Seen</div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[48px] flex max-w-4xl min-w-0 flex-col items-center">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4 px-4 font-bold text-gray-500 md:gap-8">
          <div className="flex min-w-[80px] flex-col items-center gap-[4px]">
            <img
              src={BRAND_IMG.google}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              decoding="async"
            />
            <span className="text-[11px]">4.9 ⭐ (850+)</span>
          </div>
          <div className="block h-6 w-[1px] shrink-0 bg-gray-200" />
          <div className="flex min-w-[80px] flex-col items-center gap-[4px]">
            <img
              src={BRAND_IMG.trustpilot}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              decoding="async"
            />
            <span className="text-[11px]">4.8 ⭐ (600+)</span>
          </div>
          <div className="hidden h-6 w-[1px] shrink-0 bg-gray-200 md:block" />
          <div className="flex min-w-[80px] flex-col items-center gap-[4px]">
            <img
              src={BRAND_IMG.sitejabber}
              alt=""
              className="h-5 w-auto max-w-[104px] object-contain"
              decoding="async"
            />
            <span className="text-[11px]">4.9 ⭐ (520+)</span>
          </div>
        </div>
        <span className="mt-3 flex w-full justify-center bg-transparent text-center text-[13px] font-[500] tracking-wide text-gray-400 backdrop-blur">
          Showing 6 of 2,400+ verified reviews across platforms. Names protected for privacy.
        </span>
      </div>
    </section>
  );
}


type ColorVariant = 'blue' | 'green' | 'amber' | 'teal' | 'purple';

interface ProofTagProps {
  text: string;
  variant: ColorVariant;
}

interface WriterProps {
  image: string;
  initials: string;
  name: string;
  degree: string;
  rating: string;
  orders: number;
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const colorMaps: Record<ColorVariant, { bg: string; text: string }> = {
  blue: { bg: 'bg-[#E6F1FB]', text: 'text-[#0C447C]' },
  green: { bg: 'bg-[#EAF3DE]', text: 'text-[#27500A]' },
  amber: { bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  teal: { bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  purple: { bg: 'bg-[#EEEDFE]', text: 'text-[#3C3489]' },
};

const ProofTag: React.FC<ProofTagProps> = ({ text, variant }) => {
  const { bg, text: textColor } = colorMaps[variant];
  return (
    <div className={`mt-auto inline-flex items-center self-start rounded-full px-[10px] py-[3px] ${bg} ${textColor}`}>
      <Check size={11} strokeWidth={3} className="mr-1.5" />
      <span className="text-[11px] leading-none font-medium">{text}</span>
    </div>
  );
};

const WriterProfile: React.FC<WriterProps> = ({ image, initials, name, degree, rating, orders }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
        {!imgError ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[13px] font-medium text-gray-700">
            {initials}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-gray-900">{name}</span>
          <div className="flex items-center rounded bg-[#E6F1FB] px-1.5 py-0.5 text-[#0C447C]">
            <span className="text-[10px] font-medium">
              ★ {rating} · {orders} orders
            </span>
          </div>
        </div>
        <span className="text-[11px] text-gray-500">{degree}</span>
      </div>
    </div>
  );
};

function WhyEssayEmbassyProof() {
  return (
    <section className="bg-white px-4 py-[80px] md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col items-start text-left">
          <span className="mb-2 text-[11px] font-medium tracking-[0.09em] text-gray-500 uppercase">Why Essay Embassy</span>
          <h2 className="mb-2 text-[22px] font-medium text-gray-900">Not promises. Here&apos;s the actual proof.</h2>
          <p className="text-[14px] text-gray-500">
            Every claim below is backed by real numbers, real writers, and real student outcomes.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col gap-3"
        >
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-[10px] md:grid-cols-4">
            {[
              { num: '100%', label: 'English-first writers with European university experience' },
              { num: '94%', label: 'Students said writer understood their subject deeply' },
              { num: '98.6%', label: 'On-time delivery rate across all orders' },
              { num: '4.9/5', label: 'Average rating across Google, Trustpilot & SiteJabber' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start justify-center rounded-lg bg-[#F5F5F5] p-4">
                <span className="mb-1 text-[26px] leading-none font-medium text-gray-900">{stat.num}</span>
                <span className="text-[12px] leading-[1.4] text-gray-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-3 w-full rounded-xl border-2 border-[#185FA5] bg-white p-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
              <div className="flex flex-col items-start">
                <div className="mb-4 flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-[#E6F1FB] text-[#0C447C]">
                  <GraduationCap size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-[14px] font-medium text-gray-900">
                  Dedicated professionals in your discipline
                </h3>
                <p className="mb-5 text-[13px] leading-[1.6] text-gray-500">
                  Subject-qualified writers for essays, reports, and lab write-ups. Your brief sets the structure and
                  referencing style (APA, Harvard, Vancouver, Chicago, etc.).
                </p>
                <ProofTag variant="blue" text="500+ subject-specialist writers on roster" />
              </div>

              <div className="flex flex-col pt-2 md:border-l-[0.5px] md:border-gray-200 md:pl-6 md:pt-0">
                <span className="mb-3 text-[11px] font-medium text-gray-400 uppercase">Sample Writer Profiles</span>
                <div className="flex flex-col divide-y divide-gray-100">
                  <WriterProfile
                    image="/images/Sutton E..jpg"
                    initials="SE"
                    name="Sutton E."
                    degree="Master's in Communications | Media Studies, Public Relations"
                    rating="4.8"
                    orders={481}
                  />
                  <WriterProfile
                    image="/images/Tamsin R..png"
                    initials="TR"
                    name="Tamsin R."
                    degree="Ph.D. in Psychology | Cognitive Psychology, Social Behavior"
                    rating="5.0"
                    orders={580}
                  />
                  <WriterProfile
                    image="/images/Theron F..jpg"
                    initials="TF"
                    name="Theron F."
                    degree="Master's in Art History | Renaissance Art, Modern Art"
                    rating="4.7"
                    orders={399}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
            <div className="flex flex-col items-start rounded-xl border-[0.5px] border-gray-200 bg-white p-[18px]">
              <div className="mb-4 flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-[#EAF3DE] text-[#27500A]">
                <FileCheck size={20} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-[14px] font-medium text-gray-900">Your requirements are the blueprint</h3>
              <p className="mb-5 text-[13px] leading-[1.6] text-gray-500">
                We skip generic templates. Every instruction, marking criteria, and module requirement is thoroughly
                reviewed before writing begins. Whether you need specific peer-reviewed sources from the last five years or
                strict adherence to APA 7th, Harvard, OSCOLA, Chicago, or IEEE as required, your brief is our blueprint.
              </p>
              <ProofTag variant="green" text="Missed brief? Full rewrite free" />
            </div>

            <div className="flex flex-col items-start rounded-xl border-[0.5px] border-gray-200 bg-[#FAFAFA] p-[18px]">
              <div className="mb-4 flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-[#FAEEDA] text-[#633806]">
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-[14px] font-medium text-gray-900">Unique content from human experts</h3>
              <p className="mb-5 text-[13px] leading-[1.6] text-gray-500">
                Get completely unique content written entirely from scratch by human experts. Every piece is rigorously
                checked for originality before delivery. With zero AI-generated text, spun articles, or recycled
                materials, you receive exclusive content that has never existed anywhere else.
              </p>
              <ProofTag variant="amber" text="Turnitin report attached to every order" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
            <div className="flex flex-col items-start rounded-xl border-[0.5px] border-gray-200 bg-white p-[14px]">
              <div className="mb-3 flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-[#E1F5EE] text-[#085041]">
                <Clock size={18} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-[14px] font-medium text-gray-900">Deadline is a promise, not a target</h3>
              <p className="mb-4 text-[12px] leading-[1.6] text-gray-500">
                98.6% of orders land before deadline. The 1.4% that don&apos;t get a full refund. No excuses, no
                extensions.
              </p>
              <ProofTag variant="teal" text="Late = full refund, guaranteed" />
            </div>

            <div className="flex flex-col items-start rounded-xl border-[0.5px] border-gray-200 bg-[#FAFAFA] p-[14px]">
              <div className="mb-3 flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-[#EEEDFE] text-[#3C3489]">
                <MessageSquare size={18} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-[14px] font-medium text-gray-900">Talk directly to your writer</h3>
              <p className="mb-4 text-[12px] leading-[1.6] text-gray-500">
                No middlemen, no ticket systems. Message your writer directly, share notes, request a draft preview.
                You&apos;re in control.
              </p>
              <ProofTag variant="purple" text="Live writer chat on every order" />
            </div>

            <div className="flex flex-col items-start rounded-xl border-[0.5px] border-gray-200 bg-white p-[14px]">
              <div className="mb-3 flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-[#EAF3DE] text-[#27500A]">
                <RefreshCcw size={18} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-[14px] font-medium text-gray-900">Not happy? We rewrite it. Free.</h3>
              <p className="mb-4 text-[12px] leading-[1.6] text-gray-500">
                Unlimited revisions until it matches your expectations exactly. Most revision requests turned around
                within 6 hours.
              </p>
              <ProofTag variant="green" text="Avg revision turnaround: 6 hours" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


type FaqColorVariant = 'blue' | 'green' | 'amber' | 'teal';

interface FAQType {
  id: string;
  num: string;
  question: string;
  answerBeforeBold: string;
  boldText: string;
  answerAfterBold: string;
  proofText: string;
  proofVariant: FaqColorVariant;
}

const faqsLeft: FAQType[] = [
  {
    id: 'q01',
    num: '01',
    question: "I've never done this before. What exactly am I paying for?",
    answerBeforeBold:
      'You are paying for comprehensive, custom academic research and writing conducted by subject-matter experts. Your payment covers ',
    boldText: 'deep dives into scholarly databases, careful adherence to your brief and marking criteria, structural formatting, and rigorous quality assurance',
    answerAfterBold: ' to guarantee original, high-level writing.',
    proofText: 'Custom research & rubric-aligned delivery',
    proofVariant: 'green',
  },
  {
    id: 'q02',
    num: '02',
    question: "How do I know I won't get garbage and lose my money?",
    answerBeforeBold: 'We guarantee quality by exclusively hiring ',
    boldText: 'professionals with verifiable degrees in their respective fields and New Zealand–relevant academic experience',
    answerAfterBold:
      ". We don't use generalists. Plus, our service includes satisfaction guarantees and revision policies to ensure the final product meets your exact academic standards.",
    proofText: 'Verifiable credentials — no generalists',
    proofVariant: 'blue',
  },
  {
    id: 'q03',
    num: '03',
    question: 'Will it actually sound like me, or obviously written by someone else?',
    answerBeforeBold:
      'We tailor every project to your specific academic level, whether you are in year one of your undergraduate degree or completing postgraduate work. ',
    boldText: 'By following your exact instructions and reviewing any writing samples you provide',
    answerAfterBold: ', we ensure the final paper authentically matches your voice and capabilities.',
    proofText: 'Matched to your level, tone & samples',
    proofVariant: 'teal',
  },
  {
    id: 'q04',
    num: '04',
    question: 'My deadline is in 24 hours. Is that even possible?',
    answerBeforeBold: 'Yes! We specialize in ',
    boldText: 'rapid-turnaround academic writing',
    answerAfterBold:
      '. Because our writers are subject-matter experts, they can efficiently research and draft high-quality content without sacrificing academic rigor, even on tight 24-hour deadlines.',
    proofText: '24-hour deadlines — subject experts',
    proofVariant: 'amber',
  },
  {
    id: 'q05',
    num: '05',
    question: 'I know nothing about the subject. Does that matter?',
    answerBeforeBold: 'Not at all. When you hire us, you are matched with ',
    boldText: 'a writer who already holds a degree in your subject area',
    answerAfterBold:
      ". They bring the foundational knowledge and research expertise required to tackle complex topics, meaning you don't need to do any of the heavy lifting.",
    proofText: 'Degree-matched writer on every order',
    proofVariant: 'green',
  },
];

const faqsRight: FAQType[] = [
  {
    id: 'q06',
    num: '06',
    question: 'Will my professor know? Will Turnitin flag it?',
    answerBeforeBold: 'No. Every paper is written entirely from scratch and guaranteed to be ',
    boldText: '100% human-written and undetectable',
    answerAfterBold:
      '. We never use AI tools, spun content, or recycled essays, meaning your paper should pass Turnitin and other originality checks used by NZ universities and institutes.',
    proofText: 'Original writing — plagiarism-check ready',
    proofVariant: 'blue',
  },
  {
    id: 'q07',
    num: '07',
    question: "NZD $15 a page sounds too cheap. What's the catch?",
    answerBeforeBold: 'There is no catch. We keep our rates competitive by operating efficiently and ',
    boldText: 'matching you directly with writers, cutting out bloated agency overhead',
    answerAfterBold:
      '. You get experienced academic writers and clear NZD pricing that fits a typical student budget.',
    proofText: 'Fair student pricing — no agency bloat',
    proofVariant: 'amber',
  },
  {
    id: 'q08',
    num: '08',
    question: 'Is this even legal for New Zealand students?',
    answerBeforeBold: 'Yes, using a model answer service is legal when you use it responsibly. ',
    boldText: 'The bespoke papers we provide are designed to serve as comprehensive research models and reference guides',
    answerAfterBold: ', empowering you to better understand complex academic topics and improve your own writing.',
    proofText: 'Model papers for learning & reference',
    proofVariant: 'teal',
  },
  {
    id: 'q09',
    num: '09',
    question: 'What if I need APA, AGLC, or a specific referencing style?',
    answerBeforeBold: 'We write strictly to your brief. Whether you need ',
    boldText: 'APA 7th, Harvard, AGLC (law), Vancouver (medicine), Chicago, or MLA',
    answerAfterBold:
      ', your writer will format the title page (if required), in-text citations, footnotes, and bibliography to your handbook rules, using peer-reviewed sources where specified.',
    proofText: 'Any major style — peer-reviewed sources',
    proofVariant: 'green',
  },
  {
    id: 'q10',
    num: '10',
    question: 'Will anyone find out I used this service?',
    answerBeforeBold: 'Your privacy is our top priority. We operate with ',
    boldText: 'strict confidentiality and secure data encryption',
    answerAfterBold:
      '. Your personal information, payment details, and project instructions are never sold to third parties or shared beyond what is needed to complete your order.',
    proofText: 'Encrypted data — never shared with third parties',
    proofVariant: 'blue',
  },
];

const proofVariantStyles: Record<FaqColorVariant, string> = {
  blue: 'bg-[#E6F1FB] text-[#0C447C]',
  green: 'bg-[#EAF3DE] text-[#27500A]',
  amber: 'bg-[#FAEEDA] text-[#633806]',
  teal: 'bg-[#E1F5EE] text-[#085041]',
};

const ProofLine: React.FC<{ text: string; variant: FaqColorVariant }> = ({ text, variant }) => (
  <div className={`mt-3 inline-flex items-center self-start rounded-lg px-[12px] py-[7px] ${proofVariantStyles[variant]}`}>
    <Check size={12} strokeWidth={2.5} className="mr-1.5 shrink-0" />
    <span className="text-[12px] font-medium leading-none">{text}</span>
  </div>
);

const FAQItem: React.FC<{ faq: FAQType; isOpen: boolean; onToggle: () => void; isFirst: boolean }> = ({
  faq,
  isOpen,
  onToggle,
  isFirst,
}) => {
  return (
    <div className={`border-b-[0.5px] border-gray-200 ${isFirst ? 'border-t-[0.5px]' : ''}`}>
      <div onClick={onToggle} className="group flex cursor-pointer select-none items-start py-[15px]">
        <span className="mt-[3px] min-w-[18px] text-[11px] font-medium text-gray-400">{faq.num}</span>
        <h3 className="flex-1 px-[10px] text-[14px] font-medium leading-[1.45] text-gray-900">{faq.question}</h3>
        <div
          className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[0.5px] transition-colors duration-200 ${
            isOpen ? 'border-gray-200 bg-gray-100' : 'border-gray-200 bg-transparent group-hover:bg-gray-50'
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Plus size={11} strokeWidth={2} className="text-gray-900" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-start pb-[15px] pl-[28px] pr-8">
              <p className="text-[13px] leading-[1.75] text-gray-500">
                {faq.answerBeforeBold}
                <span className="font-medium text-gray-900">{faq.boldText}</span>
                {faq.answerAfterBold}
              </p>
              <ProofLine text={faq.proofText} variant={faq.proofVariant} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQColumn: React.FC<{ items: FAQType[] }> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex w-full flex-col">
      {items.map((faq, index) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isOpen={openId === faq.id}
          onToggle={() => toggleItem(faq.id)}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

function NzAssignmentFaqSection() {
  const handleOpenChat = useCallback(() => {
    const tawkApi = window.Tawk_API;

    if (!tawkApi) {
      // Widget loads lazily for allowed regions, so this may be unavailable briefly.
      console.warn('Tawk.to widget is not ready yet.');
      return;
    }

    try {
      tawkApi.showWidget?.();
      tawkApi.maximize?.();
    } catch (error) {
      console.error('Failed to open Tawk.to chat widget:', error);
    }
  }, []);

  return (
    <section className="bg-white px-4 py-[80px] md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-[28px] flex flex-col items-start text-left">
          <span className="mb-2 text-[11px] font-medium uppercase tracking-[0.09em] text-gray-500">
            Real Questions. Real Answers.
          </span>
          <h2 className="mb-2 text-[22px] font-medium text-gray-900">
            Stuff most NZ students want to know before ordering.
          </h2>
          <p className="text-[14px] text-gray-500">
            No fine print. No dodging. If you&apos;re on the fence — this is the page that settles it.
          </p>
        </div>

        <div className="mb-[24px] flex w-full flex-col items-start gap-4 rounded-xl bg-[#F8F9FA] p-4 md:flex-row md:items-center md:gap-5 md:px-5 md:py-4">
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#E6F1FB] text-[#0C447C]">
            <Quote size={16} strokeWidth={2} className="fill-current" />
          </div>
          <div className="flex flex-col text-left">
            <span className="mb-1 text-[11px] font-medium uppercase tracking-[0.07em] text-gray-400">
              From a student who was skeptical too
            </span>
            <p className="text-[13px] leading-[1.6] text-gray-900">
              &quot;I Googled every possible scam warning before ordering. Spent 2 hours. Then just ordered. Got an A on my
              Business Ethics essay. Wish I&apos;d stopped overthinking sooner.&quot;
              <span className="text-gray-500"> — Marcus T., Year 2, Victoria University of Wellington</span>
            </p>
          </div>
        </div>

        <div className="mb-[24px] grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-[32px]">
          <FAQColumn items={faqsLeft} />
          <FAQColumn items={faqsRight} />
        </div>

        <div className="mb-[20px] grid grid-cols-1 gap-[10px] md:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl bg-[#F8F9FA] p-4">
            <Clock size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-gray-400" />
            <div className="flex flex-col">
              <span className="mb-0.5 text-[12px] font-medium text-gray-900">Average response time</span>
              <span className="text-[11px] text-gray-500">Support replies in under 3 minutes — NZST-friendly hours, 24/7</span>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-[#F8F9FA] p-4">
            <RefreshCcw size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-gray-400" />
            <div className="flex flex-col">
              <span className="mb-0.5 text-[12px] font-medium text-gray-900">Revision turnaround</span>
              <span className="text-[11px] text-gray-500">Most revision requests completed within 6 hours</span>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-[#F8F9FA] p-4">
            <Users size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-gray-400" />
            <div className="flex flex-col">
              <span className="mb-0.5 text-[12px] font-medium text-gray-900">50,000+ students worldwide</span>
              <span className="text-[11px] text-gray-500">Including thousands across NZ universities and Te Pūkenga — undergrad to PhD</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border-[0.5px] border-gray-200 bg-white px-[20px] py-[16px] md:flex-row md:items-center md:gap-0">
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#3B6D11]" />
              <span className="text-[14px] font-medium text-gray-900">Still not sure? Just ask.</span>
            </div>
            <span className="text-[12px] text-gray-500">Real person. No bots. Average reply: 3 minutes.</span>
          </div>
          <button
            type="button"
            onClick={handleOpenChat}
            className="w-full rounded-lg bg-[#185FA5] px-[20px] py-[9px] text-[13px] font-medium text-white transition-colors hover:bg-[#124B83] md:w-auto"
          >
            Chat with us now
          </button>
        </div>
      </div>
    </section>
  );
}


const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function EuropeAssignmentFinalCtaSection() {
  return (
    <div className="w-full bg-white pb-[28px]">
      <motion.section
        aria-label="Call to action"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center overflow-hidden bg-[#0B1F42] px-[24px] py-[48px] text-center sm:my-[40px] sm:rounded-[24px] sm:px-[40px] sm:py-[64px]"
      >
        <div className="pointer-events-none absolute -right-[40px] -top-[60px] h-[260px] w-[260px] rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute -bottom-[80px] -left-[80px] h-[320px] w-[320px] rounded-full bg-white/[0.03]" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            variants={itemVariants}
            className="mb-[24px] rounded-full border border-[#D4A853]/40 bg-[#D4A853]/15 px-[16px] py-[6px] text-[11px] font-black uppercase tracking-[0.12em] text-[#D4A853]"
          >
            Trusted by 50,000+ students
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mb-[20px] max-w-[560px] text-[26px] font-black leading-[1.12] tracking-tight text-white sm:text-[38px]"
          >
            Don&apos;t Let Deadlines{' '}
            <span className="relative whitespace-nowrap text-[#D4A853] after:absolute after:bottom-[2px] after:left-0 after:h-[3px] after:w-full after:rounded-[2px] after:bg-[#D4A853]/55">
              Define Your Grade
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="mb-[32px] max-w-[420px] text-[15px] leading-[1.6] text-slate-200">
            Join <strong className="font-semibold text-white">students across Europe</strong> who trust Essay Embassy for
            expert assignment help — delivered on time, every time.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-[40px] flex w-full flex-col items-center justify-center gap-[14px] sm:w-auto sm:flex-row"
          >
            <a
              href="#order"
            className="group flex w-full items-center justify-center rounded-full bg-[#D4A853] px-[32px] py-[14px] text-[15px] font-bold text-[#0B1F42] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#c39540] hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] sm:w-auto"
            >
              Place Your Order Now
              <span className="ml-[6px] transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
            </a>

            <a
              href="#how-it-works"
              className="flex w-full items-center justify-center rounded-full border border-white/25 bg-transparent px-[24px] py-[14px] text-[15px] font-bold text-white/90 transition-colors duration-200 hover:border-[#D4A853]/70 hover:text-[#D4A853] sm:w-auto"
            >
              See How It Works
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-x-[16px] gap-y-[12px] sm:flex sm:flex-wrap sm:justify-center sm:gap-x-[24px]"
          >
            {[
              { text: '100% Plagiarism-Free', icon: ShieldCheck },
              { text: 'On-Time Delivery', icon: Clock },
              { text: 'Free Revisions', icon: RefreshCcw },
              { text: '100% Confidential', icon: Lock },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-start gap-[6px] text-[12.5px] font-semibold text-slate-100 sm:justify-center"
              >
                <item.icon size={14} className="text-[#D4A853]" strokeWidth={2.5} />
                {item.text}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <RegionalAssignmentInterlink currentRegion="europe" />
    </div>
  );
}




const trustPoints = ['Turnitin® ready', 'Harvard / APA / OSCOLA', '24/7 CET-friendly support'];

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
      'Custom essay writing — Essays and coursework briefs sit at the heart of most European degree programmes. Whether you need a discursive humanities essay or a tightly argued report, our writers deliver clear structure, critical analysis, and referencing that matches your module handbook and ECTS learning outcomes. Every section is written from scratch against your marking criteria.',
  },
  {
    title: 'Assignment Help',
    icon: PenTool,
    desc:
      'Online assignment help — Tight deadlines on Moodle, Canvas, or Turnitin submissions? We cover 400+ disciplines, from Nursing and Law to Engineering and Economics, with a 98.2% on-time delivery rate so your work lands before the cut-off, even when the brief is complex or data-heavy.',
  },
  {
    title: 'Research Paper Help',
    icon: Search,
    desc:
      'Research paper support — Literature reviews, methodology chapters, and evidence-based arguments need credible sources and clean synthesis. Our subject experts gather peer-reviewed material, apply your required style (Harvard, APA 7th, Chicago, OSCOLA, etc.), and produce original, fully cited model papers you can learn from.',
  },
  {
    title: 'Thesis Writing',
    icon: GraduationCap,
    desc:
      'Masters thesis writing — Many European postgraduate programmes culminate in a substantial thesis or dissertation under the Bologna framework. We help with structure, argument flow, ethics-committee-ready wording (where applicable), and chapter-by-chapter drafting so your core research is presented to the standard your examiners expect.',
  },
  {
    title: 'Dissertation Writing',
    icon: ScrollText,
    desc:
      'Complete dissertation support — Your doctoral thesis is the largest single assessment many students undertake. Our PhD-qualified experts help with proposals, chapters, analysis, and discussion, producing original, fully referenced drafts you can refine ahead of submission and your viva.',
  },
];

const whyUsFeatures = [
  {
    icon: Layout,
    title: 'Precise university formatting',
    desc:
      'European universities are strict on structure, word limits, and referencing. Whether your faculty requires Harvard, APA 7th, OSCOLA, Chicago, or Vancouver, we follow your handbook and brief so you do not lose marks on presentation or citation detail.',
  },
  {
    icon: Award,
    title: 'Original work for strong results',
    desc:
      'No one wants similarity flags or recycled paragraphs. Each order is researched and written from scratch, checked for originality, and aligned to European higher-education assessment expectations so you receive a clean model answer you can adapt responsibly.',
  },
  {
    icon: Clock,
    title: 'Deadline-first delivery',
    desc:
      'Late penalties add up fast. From standard weekly deadlines to last-minute hand-ins, our team works across CET/CEST and global hours so your completed draft reaches you with time to review before you upload to Turnitin or your VLE.',
  },
  {
    icon: Users,
    title: 'Writers who understand European HE',
    desc:
      'We match you with fluent English writers experienced in European undergraduate and postgraduate conventions — from first-year reports to dissertation chapters — so tone, structure, and referencing feel native to your programme.',
  },
  {
    icon: BookOpen,
    title: 'Support across 400+ subjects',
    desc:
      'From seminar prep to your final-year thesis, one team can cover essays, reports, reflective pieces, and technical write-ups across more than 400 subject areas.',
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
    desc: 'We pair you with a graduate-qualified writer in your subject area — many with experience at leading European universities and research institutes.',
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
  'European Studies',
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
  'ETH Zurich',
  'EPFL',
  'Sorbonne University',
  'Sciences Po',
  'TU Munich',
  'Ludwig Maximilian University of Munich',
  'Humboldt University of Berlin',
  'University of Amsterdam',
  'Utrecht University',
  'KU Leuven',
  'University of Copenhagen',
  'University of Oslo',
  'Trinity College Dublin',
  'Bocconi University',
  'University of Milan',
  'University of Barcelona',
  'Complutense University of Madrid',
  'University of Vienna',
  'University of Warsaw',
  'Central European University',
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
            We Cover Every Subject <br className="hidden sm:block" /> European students ask us for
          </h3>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-900 to-[#1652A0]" />
          <p className="mx-auto mt-6 max-w-2xl text-slate-600">
            Our network of 500+ graduate writers spans major European faculties and research areas, so you get specialist depth on
            niche modules as well as mainstream courses.
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
          <span className="font-bold italic text-[#0B1F42]">Bologna-aligned academic writing conventions</span>
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
            Pan-European reach
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853] sm:text-sm">Academic Footprint</h2>
          <h3 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F42] sm:text-4xl lg:text-5xl">
            Helping Students From <br className="hidden sm:block" /> Leading European Universities
          </h3>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-900 to-[#1652A0]" />
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
        Trusted by students at <span className="text-[#0B1F42]">research universities &amp; grandes écoles</span>
      </motion.p>
    </div>
  </section>
);

const SampleWorkSection = () => (
  <section className="relative overflow-x-hidden border-t border-slate-100 bg-white py-16 sm:py-24 lg:py-32">
    <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-[0.03]">
      <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#0B1F42] blur-[100px]" />
      <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[#1652A0] blur-[100px]" />
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
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-900 to-[#1652A0]" />
          <p className="mx-auto mt-6 max-w-2xl text-slate-600">
            We don&apos;t just write; we architect papers that aim for the criteria behind a high 2:1 or Distinction at
            research-intensive European universities.
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
              className="absolute -right-4 top-8 z-20 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#D4A853]/30 bg-white p-2 shadow-xl sm:h-32 sm:w-32"
            >
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-[#D4A853] text-[#0B1F42]">
                <span className="text-xs font-black uppercase leading-none">Mark</span>
                <span className="text-3xl font-black sm:text-4xl">2:1</span>
                <span className="text-[10px] font-bold">68%</span>
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
                  <span className="font-bold text-[#0B1F42]">Format:</span> APA 7th (European university layout; title page &amp; references per your brief).
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
                formatting is flawless. A benchmark for this term.&rdquo;
              </p>
              <p className="mt-3 text-xs font-black uppercase tracking-widest text-slate-400 not-italic">
                — Module leader, University of Amsterdam
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
              100% ownership transferred to you
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
        <pattern id="europe-assignment-help-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="#0B1F42" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#europe-assignment-help-dots)" />
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
          <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-900 to-[#1652A0]" />
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

// Subtle hero backdrop — brand palette (navy / cobalt / gold).
const EuropeHeroBackdrop = () => (
  <motion.div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
    <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="europeHeroWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1F42" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#1652A0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#D4A853" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d="M0 20 Q 25 10 50 20 T 100 20 V 80 Q 75 90 50 80 T 0 80 Z"
        fill="url(#europeHeroWaveGrad)"
      />
    </svg>
  </motion.div>
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

export default function EuropeAssignmentHelp() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Europe Assignment Help | University &amp; Masters Essay Support in EUR</title>
        <meta
          name="description"
          content="Europe assignment help from €10 per page in EUR. Academic English, Harvard/OSCOLA/APA, Turnitin-ready model essays, coursework, and dissertation support for European students."
        />
      </Helmet>

      {/* ── HERO SECTION ── */}
      {/* FIX: Removed lg:min-h-[90vh] lg:flex lg:items-center — these caused the section to
          stretch to viewport height even when content was short, creating the "tall stretch".
          Now it's height-by-content with generous padding only. */}
      <section className="relative overflow-hidden bg-[#0B1F42] pb-14 pt-20 sm:pt-24 sm:pb-16 lg:py-20">
        <EuropeHeroBackdrop />
        <div className="absolute right-0 top-1/4 h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-600/20 blur-[80px] sm:h-72 sm:w-72 lg:h-[480px] lg:w-[480px] lg:blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 h-48 w-48 translate-y-1/2 -translate-x-1/2 rounded-full bg-[#1652A0]/10 blur-[80px] sm:h-72 sm:w-72 lg:h-[480px] lg:w-[480px] lg:blur-[120px]" />

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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4A853] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4A853]" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white sm:text-xs sm:tracking-[0.2em]">
                  EU students · Academic English · EUR pricing
                </span>
              </div>

              {/* FIX: Removed text-balance (poor Tailwind support); added explicit leading */}
              <h1 className="mb-5 max-w-4xl text-[1.65rem] font-black leading-[1.12] tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08] xl:text-6xl">
                Trusted Europe assignment help for university &amp; postgraduate students
              </h1>
              <p className="mx-auto mb-7 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:mb-8 sm:text-lg lg:mx-0 lg:text-xl">
                Falling behind on deadlines or a difficult module brief? If you are searching for{' '}
                <strong className="font-semibold text-white">assignment help Europe</strong> with clear{' '}
                <strong className="font-semibold text-white">euro</strong> pricing, our writers deliver
                original, properly referenced model work from <strong className="font-semibold text-white">€10 per page</strong> so you can plan your time and budget with confidence.
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
              European assignment writing across every major discipline
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Tailored to European university expectations — clear structure, critical analysis, and referencing that matches
              your department handbook. From short essays and online submissions to dissertations, our writers deliver structured model
              answers across more than 400 subject areas.
            </p>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-blue-900 to-[#1652A0] sm:mt-6 sm:w-24" />
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
                    alt="Sample assignment graphic: clinical psychology case study on telehealth and rural mental health, high 2:1 mark 68%, APA 7 layout, 15+ peer-reviewed sources, SPSS analysis, and module leader review quote."
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
                  Why students choose Essay Embassy for Europe assignment help
                </h3>
                <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-900 to-[#1652A0] lg:mx-0" />
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

      {/* ── EUROPE ASSIGNMENT HELP CONTENT (SEO) — scrollable cards: fill cardsData above ── */}
      <RegionalAssignmentStickySeoSection region="europe" />

      {/* ── FAQ (LAST SECTION) — content edited manually ── */}
      <NzAssignmentFaqSection />

      {/* ── FINAL CTA (LAST SECTION) ── */}
      <EuropeAssignmentFinalCtaSection />
    </div>
  );
}