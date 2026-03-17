import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import { BookOpen, FileText, Calculator, Microscope, MessageSquare, RefreshCw, DollarSign, Clock, Shield, Headphones } from 'lucide-react';

const serviceFAQs = [
    {
        id: "service-faq-1",
        question: "What subjects do you cover?",
        answer: "We cover 100+ subjects across all academic disciplines including English Literature, Business Management, Law, Nursing, Engineering, Computer Science, Psychology, History, and more. Our writers hold advanced degrees in their respective fields, ensuring subject-matter expertise.",
        icon: BookOpen,
    },
    {
        id: "service-faq-2",
        question: "Can you handle technical assignments?",
        answer: "Yes. We specialize in technical writing including lab reports, case studies, research papers, data analysis, programming assignments, and engineering projects. Our technical writers have industry experience and academic credentials in STEM fields.",
        icon: Microscope,
    },
    {
        id: "service-faq-3",
        question: "Do you write essays for all academic levels?",
        answer: "Absolutely. We serve high school, undergraduate, master's, and PhD students. Each academic level has dedicated writers who understand the specific requirements, citation styles, and depth of analysis expected at that stage.",
        icon: FileText,
    },
    {
        id: "service-faq-4",
        question: "What if my assignment has specific formatting requirements?",
        answer: "We follow all formatting guidelines precisely—APA, MLA, Chicago, Harvard, or custom university formats. Upload your style guide or rubric with your order, and we'll ensure every citation, heading, and margin meets your professor's specifications.",
        icon: Calculator,
    },
];

const policiesFAQs = [
    {
        id: "policy-faq-1",
        question: "How do I communicate with my writer?",
        answer: "Once your order is assigned, you'll have direct messaging access through your dashboard. You can share additional files, ask questions, or request updates anytime. Writers typically respond within 2-4 hours during business days.",
        icon: MessageSquare,
    },
    {
        id: "policy-faq-2",
        question: "What's your refund policy?",
        answer: "Full refunds are available if we fail to deliver on time or if the work doesn't meet your original instructions after reasonable revision attempts. Partial refunds may apply for minor issues. We review each case fairly based on our terms of service.",
        icon: DollarSign,
    },
    {
        id: "policy-faq-3",
        question: "Are revisions really unlimited?",
        answer: "Yes, for 14 days after delivery. As long as revision requests align with your original instructions, we'll make changes at no extra cost. If you change the assignment scope or add new requirements, additional fees may apply.",
        icon: RefreshCw,
    },
    {
        id: "policy-faq-4",
        question: "How fast can you deliver?",
        answer: "Standard turnaround is 3-14 days depending on length and complexity. Rush orders from 3-24 hours are available for most assignment types. Longer projects like dissertations require more time—typically 7-30 days based on chapters and word count.",
        icon: Clock,
    },
    {
        id: "policy-faq-5",
        question: "Is my payment information secure?",
        answer: "Completely. We use industry-standard SSL encryption and trusted payment processors. We never store your full credit card details on our servers. All transactions are PCI-DSS compliant, and your financial data is protected end-to-end.",
        icon: Shield,
    },
    {
        id: "policy-faq-6",
        question: "What if I need help outside business hours?",
        answer: "Our support team works 24/7/365. Whether it's 3 AM or a holiday, you can reach us via live chat, email, or phone. Emergency order changes, deadline extensions, or urgent questions are handled immediately by our night shift team.",
        icon: Headphones,
    },
];

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface FAQColumnProps {
    title: string;
    titleColor: string;
    subtitle: string;
    faqs: FAQItem[];
    testIdPrefix: string;
}

function FAQColumn({ title, titleColor, subtitle, faqs, testIdPrefix }: FAQColumnProps) {
    return (
        <div data-testid={`${testIdPrefix}-faq-column`}>
            <div className="mb-6 sm:mb-8">
                <h3
                    className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 tracking-tight"
                    style={{
                        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        color: titleColor,
                        fontWeight: 600
                    }}
                >
                    {title}
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: '#94A3B8' }}>
                    {subtitle}
                </p>
            </div>

            <Accordion
                type="single"
                collapsible
                className="space-y-1 sm:space-y-2"
                data-testid={`${testIdPrefix}-accordion`}
            >
                {faqs.map((faq: FAQItem, index: number) => {
                    const IconComponent = faq.icon;
                    return (
                        <AccordionItem
                            key={faq.id}
                            value={faq.id}
                            className="overflow-hidden border-none"
                            style={{ backgroundColor: 'transparent' }}
                            data-testid={`${testIdPrefix}-faq-item-${index + 1}`}
                        >
                            <AccordionTrigger
                                className="py-3.5 sm:py-5 hover:no-underline group border-b"
                                style={{ borderColor: '#E2E8F0' }}
                                data-testid={`${testIdPrefix}-faq-question-${index + 1}`}
                            >
                                <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-left w-full pr-2">
                                    <IconComponent
                                        className="w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-60 transition-opacity duration-200 mt-0.5 sm:mt-0"
                                        style={{ color: titleColor, strokeWidth: 2 }}
                                    />
                                    <span
                                        className="text-sm sm:text-base font-semibold leading-snug"
                                        style={{
                                            fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                                            color: '#0F172A',
                                            fontWeight: 600
                                        }}
                                    >
                                        {faq.question}
                                    </span>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent
                                className="pt-3 sm:pt-4 pb-4 sm:pb-5"
                                data-testid={`${testIdPrefix}-faq-answer-${index + 1}`}
                            >
                                <p
                                    className="text-[13px] sm:text-[15px] leading-relaxed pl-6 sm:pl-7"
                                    style={{
                                        color: '#64748B',
                                        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                                        fontWeight: 400
                                    }}
                                >
                                    {faq.answer}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}

export default function FAQSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12" style={{ backgroundColor: '#FAFBFC' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-14 lg:mb-20">
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-5">
                        <span
                            className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase"
                            style={{ color: '#94A3B8' }}
                        >
                            Everything You Need to Know
                        </span>
                    </div>

                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-5 tracking-tight"
                        style={{
                            fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                            color: '#0B1F42',
                            fontWeight: 700,
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Frequently Asked Questions
                    </h2>

                    <p
                        className="text-base sm:text-lg max-w-2xl mx-auto px-2"
                        style={{ color: '#64748B', fontWeight: 400 }}
                    >
                        Clear answers to help you make informed decisions
                    </p>
                </div>

                {/* Two Column FAQ Grid — stacks on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
                    <FAQColumn
                        title="Our Services"
                        titleColor="#1652A0"
                        subtitle="Academic writing capabilities and subject expertise"
                        faqs={serviceFAQs}
                        testIdPrefix="services"
                    />
                    <FAQColumn
                        title="Policies & Support"
                        titleColor="#D4A853"
                        subtitle="How we work, guarantees, and customer support"
                        faqs={policiesFAQs}
                        testIdPrefix="policies"
                    />
                </div>

                {/* Bottom CTA */}
                <div
                    className="relative px-5 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16 text-center overflow-hidden"
                    style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px'
                    }}
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3
                            className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 tracking-tight"
                            style={{
                                color: '#0B1F42',
                                fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                                fontWeight: 700,
                                letterSpacing: '-0.01em'
                            }}
                        >
                            Can't Find Your Answer?
                        </h3>
                        <p
                            className="mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed px-2"
                            style={{ color: '#64748B' }}
                        >
                            Our support team is available 24/7 to address any specific questions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <button
                                className="w-full sm:w-auto px-7 py-3 sm:py-3.5 font-semibold text-sm sm:text-[15px] transition-all duration-200"
                                style={{
                                    backgroundColor: '#0B1F42',
                                    color: '#FFFFFF',
                                    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                                    fontWeight: 600,
                                    borderRadius: '12px',
                                    border: 'none'
                                }}
                                data-testid="live-chat-button"
                            >
                                Start Live Chat
                            </button>
                            <button
                                className="w-full sm:w-auto px-7 py-3 sm:py-3.5 font-semibold text-sm sm:text-[15px] transition-all duration-200"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#475569',
                                    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                                    fontWeight: 600,
                                    borderRadius: '12px',
                                    border: '1px solid #E2E8F0'
                                }}
                                data-testid="email-support-button"
                            >
                                Email Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}