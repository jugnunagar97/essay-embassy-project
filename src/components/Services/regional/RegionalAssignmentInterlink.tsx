import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  getRegionalAssignmentLinks,
  type RegionalAssignmentId,
  type RegionalAssignmentLink,
} from './regionalAssignmentLinks';

type RegionalAssignmentInterlinkProps = {
  /** Current hub — excluded from outbound links (no self-referential loops). */
  currentRegion: RegionalAssignmentId;
  className?: string;
};

/** “Also Available In” pill row — regional internal linking below final CTA. */
function CompactRegionalInterlink({ links }: { links: RegionalAssignmentLink[] }) {
  if (links.length === 0) return null;

  return (
    <motion.section
      aria-label="Assignment help in other regions"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center pt-[20px]"
    >
      <span className="mb-[14px] text-[11px] font-black uppercase tracking-[0.12em] text-[#D4A853]">
        Also Available In
      </span>

      <nav
        aria-label="Regional assignment help destinations"
        className="grid w-full max-w-[920px] grid-cols-2 gap-[10px] px-4 sm:flex sm:flex-wrap sm:justify-center sm:px-0"
      >
        {links.map((page) => (
          <Link
            key={page.id}
            to={page.href}
            title={page.description}
            className="group flex items-center justify-center gap-[7px] rounded-full border border-slate-200 bg-white px-[12px] py-[10px] text-[13px] font-bold text-[#0B1F42] transition-all duration-150 hover:-translate-y-[1px] hover:border-[#1652A0]/45 hover:bg-slate-50 hover:shadow-sm sm:px-[18px] sm:py-[8px] sm:text-[13.5px]"
          >
            <span aria-hidden="true" className="text-[16px] leading-none">
              {page.flag}
            </span>
            <span className="truncate">{page.pillLabel}</span>
            <ArrowRight
              size={12}
              strokeWidth={2.5}
              className="ml-[2px] shrink-0 text-slate-400 transition-all duration-150 group-hover:translate-x-[2px] group-hover:text-[#1652A0]"
              aria-hidden
            />
          </Link>
        ))}
      </nav>
    </motion.section>
  );
}

export default function RegionalAssignmentInterlink({
  currentRegion,
  className = '',
}: RegionalAssignmentInterlinkProps) {
  const links = getRegionalAssignmentLinks(currentRegion);

  return (
    <motion.div className={className}>
      <CompactRegionalInterlink links={links} />
    </motion.div>
  );
}
