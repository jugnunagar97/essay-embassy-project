import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getAssignmentHelpSpecializationMeta } from './assignmentHelpSpecializationLinks';

export type AssignmentHelpSpecializationItem = {
  title: string;
  icon: LucideIcon;
  desc: string;
};

interface AssignmentHelpSpecializationsGridProps {
  services: AssignmentHelpSpecializationItem[];
}

export default function AssignmentHelpSpecializationsGrid({
  services,
}: AssignmentHelpSpecializationsGridProps) {
  return (
    <div className="mx-auto grid min-w-0 max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:gap-6">
      {services.map((service, index) => {
        const Icon = service.icon;
        const { link, cta } = getAssignmentHelpSpecializationMeta(service.title);

        return (
          <motion.div
            key={service.title}
            whileHover={{ y: -4 }}
            className={`group relative flex min-h-full flex-col rounded-2xl border-2 border-slate-100 bg-white p-5 transition-all hover:border-[#D4A853] hover:shadow-xl sm:p-7 lg:col-span-2 ${
              index === 3 ? 'lg:col-start-2' : ''
            } ${index === 4 ? 'lg:col-start-4' : ''} ${
              index === services.length - 1
                ? 'sm:col-span-2 sm:w-full sm:max-w-md sm:justify-self-center lg:max-w-none lg:justify-self-stretch'
                : ''
            }`}
          >
            <div className="mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1652A0] transition-colors group-hover:bg-[#0B1F42] group-hover:text-white sm:h-12 sm:w-12">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h4 className="mb-2 text-base font-bold text-[#0B1F42] sm:text-xl">{service.title}</h4>
            <p className="flex-1 text-sm leading-relaxed text-slate-600">{service.desc}</p>
            <Link
              to={link}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1652A0]/10 px-4 py-3 text-sm font-bold text-[#1652A0] transition-all hover:bg-[#1652A0] hover:text-white sm:mt-6 sm:text-base"
            >
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
