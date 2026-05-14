import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, RefreshCcw, Lock, ArrowRight } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function UsaAssignmentFinalCta() {
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
            Trusted by 50,000+ US Students
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
            Join <strong className="font-semibold text-white">50,000+ US students</strong> who trust Essay Embassy for
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

      <motion.section
        aria-label="Also available in"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center pt-[20px]"
      >
        <span className="mb-[14px] text-[11px] font-black uppercase tracking-[0.12em] text-[#D4A853]">Also Available In</span>

        <div className="grid w-full max-w-[800px] grid-cols-2 gap-[10px] px-4 sm:flex sm:flex-wrap sm:justify-center sm:px-0">
          {[
            { flag: '🇬🇧', label: 'Assignment Help UK', link: '#' },
            { flag: '🇨🇦', label: 'Assignment Help Canada', link: '#' },
            { flag: '🇦🇺', label: 'Assignment Help Australia', link: '#' },
          ].map((pill, idx) => (
            <a
              key={idx}
              href={pill.link}
              aria-label={pill.label}
              className="group flex items-center justify-center gap-[7px] rounded-full border border-slate-200 bg-white px-[12px] py-[10px] text-[13px] font-bold text-[#0B1F42] transition-all duration-150 hover:-translate-y-[1px] hover:border-[#1652A0]/45 hover:bg-slate-50 hover:shadow-sm sm:px-[18px] sm:py-[8px] sm:text-[13.5px]"
            >
              <span aria-hidden="true" className="text-[16px] leading-none">
                {pill.flag}
              </span>
              <span className="truncate">{pill.label}</span>
              <ArrowRight
                size={12}
                strokeWidth={2.5}
                className="ml-[2px] shrink-0 text-slate-400 transition-all duration-150 group-hover:translate-x-[2px] group-hover:text-[#1652A0]"
              />
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
