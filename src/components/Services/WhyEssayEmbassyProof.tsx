import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, FileCheck, GraduationCap, MessageSquare, RefreshCcw, ShieldCheck } from 'lucide-react';

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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
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

export default function WhyEssayEmbassyProof() {
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
              { num: '100%', label: 'Native English / US-educated writers' },
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
                  Partner with dedicated professionals who hold degrees from US universities in your specific field. From
                  psychology to engineering, your project is handled by a specialized graduate, never a generalist. This
                  guarantees authentic, knowledgeable content that perfectly matches your voice and academic level.
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
                We skip the generic templates. Every instruction, rubric, and specific grading criterion is thoroughly
                reviewed before writing begins. Whether you need specific peer-reviewed sources from the last five years or
                strict adherence to APA 7th edition, your exact requirements serve as our absolute blueprint.
              </p>
              <ProofTag variant="green" text="Zero instruction misses — or full rewrite free" />
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
