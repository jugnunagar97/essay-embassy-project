import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Plus, Check, Clock, RefreshCcw, Users } from 'lucide-react';

type ColorVariant = 'blue' | 'green' | 'amber' | 'teal';

interface FAQType {
  id: string;
  num: string;
  question: string;
  answerBeforeBold: string;
  boldText: string;
  answerAfterBold: string;
  proofText: string;
  proofVariant: ColorVariant;
}

const faqsLeft: FAQType[] = [
  {
    id: 'q01',
    num: '01',
    question: "I've never done this before. What exactly am I paying for?",
    answerBeforeBold:
      'You are paying for comprehensive, custom academic research and writing conducted by subject-matter experts. Your payment covers ',
    boldText: 'deep dives into scholarly databases, careful adherence to your grading rubric, structural formatting, and rigorous quality assurance',
    answerAfterBold: ' to guarantee original, high-level writing.',
    proofText: 'Custom research & rubric-aligned delivery',
    proofVariant: 'green',
  },
  {
    id: 'q02',
    num: '02',
    question: "How do I know I won't get garbage and lose my money?",
    answerBeforeBold: 'We guarantee quality by exclusively hiring ',
    boldText: 'US-educated professionals with verifiable degrees in their respective fields',
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
      'We tailor every project to your specific academic level, whether you are a college freshman or a graduate student. ',
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
      '. We never use AI tools, spun content, or recycled essays, meaning your paper will pass Turnitin and any other plagiarism checkers with flying colors.',
    proofText: 'Original writing — plagiarism-check ready',
    proofVariant: 'blue',
  },
  {
    id: 'q07',
    num: '07',
    question: "$10 a page sounds too cheap. What's the catch?",
    answerBeforeBold: 'There is no catch. We keep our rates competitive by operating efficiently and ',
    boldText: 'matching you directly with writers, cutting out the bloated agency overhead',
    answerAfterBold:
      '. You get premium, US-based writing talent at a price that actually fits a student budget.',
    proofText: 'Fair student pricing — no agency bloat',
    proofVariant: 'amber',
  },
  {
    id: 'q08',
    num: '08',
    question: 'Is this even legal for US students?',
    answerBeforeBold: 'Yes, utilizing a custom writing service is entirely legal. ',
    boldText: 'The customized papers we provide are designed to serve as comprehensive research models and reference guides',
    answerAfterBold: ', empowering you to better understand complex academic topics and improve your own writing.',
    proofText: 'Model papers for learning & reference',
    proofVariant: 'teal',
  },
  {
    id: 'q09',
    num: '09',
    question: 'What if I need APA format? Or a specific citation style?',
    answerBeforeBold: 'We write strictly to your required rubric. Whether you need ',
    boldText: 'APA 7th edition, MLA, Chicago, or Harvard formatting',
    answerAfterBold:
      ', your writer will perfectly execute the title page, in-text citations, and bibliography using peer-reviewed sources from your specified timeframe.',
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
      '. Your personal information, payment details, and project instructions are never shared with third parties or your university.',
    proofText: 'Encrypted data — never shared with third parties',
    proofVariant: 'blue',
  },
];

const proofVariantStyles: Record<ColorVariant, string> = {
  blue: 'bg-[#E6F1FB] text-[#0C447C]',
  green: 'bg-[#EAF3DE] text-[#27500A]',
  amber: 'bg-[#FAEEDA] text-[#633806]',
  teal: 'bg-[#E1F5EE] text-[#085041]',
};

const ProofLine: React.FC<{ text: string; variant: ColorVariant }> = ({ text, variant }) => (
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

export default function UsaAssignmentFaq() {
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
            Stuff every US student wants to know before ordering.
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
              &quot;I Googled every possible scam warning before ordering. Spent 2 hours. Then just ordered. Got an A- on my
              Business Ethics paper. Wish I&apos;d stopped overthinking sooner.&quot;
              <span className="text-gray-500"> — Marcus T., Junior, Ohio State</span>
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
              <span className="text-[11px] text-gray-500">Support replies in under 3 minutes — EST & PST, 24/7</span>
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
              <span className="mb-0.5 text-[12px] font-medium text-gray-900">50,000+ US students</span>
              <span className="text-[11px] text-gray-500">Served across all 50 states — community college to PhD</span>
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
