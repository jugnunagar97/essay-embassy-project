import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import { BookOpen, FileText, Calculator, Microscope, MessageSquare, RefreshCw, DollarSign, Clock, Shield, Headphones } from 'lucide-react';

const FAQSection = () => {
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

    return (
        <section className="py-24 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#FAFBFC' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 mb-5">
                        <span
                            className="text-xs font-semibold tracking-[0.15em] uppercase"
                            style={{ color: '#94A3B8' }}
                        >
                            Everything You Need to Know
                        </span>
                    </div>

                    <h2
                        className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight"
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
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: '#64748B', fontWeight: 400 }}
                    >
                        Clear answers to help you make informed decisions
                    </p>
                </div>

                {/* Two Column FAQ Grid */}
                <div className="grid lg:grid-cols-2 gap-16 mb-20">
                    {/* Left Column: Services */}
                    <div data-testid="services-faq-column">
                        <div className="mb-8">
                            <h3
                                className="text-xl font-bold mb-2 tracking-tight"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                                    color: '#1652A0',
                                    fontWeight: 600
                                }}
                            >
                                Our Services
                            </h3>
                            <p className="text-sm" style={{ color: '#94A3B8' }}>
                                Academic writing capabilities and subject expertise
                            </p>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-2"
                            data-testid="services-accordion"
                        >
                            {serviceFAQs.map((faq, index) => {
                                const IconComponent = faq.icon;
                                return (
                                    <AccordionItem
                                        key={faq.id}
                                        value={faq.id}
                                        className="overflow-hidden"
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 'none'
                                        }}
                                        data-testid={`service-faq-item-${index + 1}`}
                                    >
                                        <AccordionTrigger
                                            className="py-5 hover:no-underline group border-b"
                                            style={{ borderColor: '#E2E8F0' }}
                                            data-testid={`service-faq-question-${index + 1}`}
                                        >
                                            <div className="flex items-center gap-3 text-left w-full pr-2">
                                                <IconComponent
                                                    className="w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-60 transition-opacity duration-200"
                                                    style={{ color: '#1652A0', strokeWidth: 2 }}
                                                />
                                                <span
                                                    className="text-base font-semibold leading-snug"
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
                                            className="pt-4 pb-5"
                                            data-testid={`service-faq-answer-${index + 1}`}
                                        >
                                            <p
                                                className="text-[15px] leading-relaxed pl-7"
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

                    {/* Right Column: Policies */}
                    <div data-testid="policies-faq-column">
                        <div className="mb-8">
                            <h3
                                className="text-xl font-bold mb-2 tracking-tight"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                                    color: '#D4A853',
                                    fontWeight: 600
                                }}
                            >
                                Policies & Support
                            </h3>
                            <p className="text-sm" style={{ color: '#94A3B8' }}>
                                How we work, guarantees, and customer support
                            </p>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-2"
                            data-testid="policies-accordion"
                        >
                            {policiesFAQs.map((faq, index) => {
                                const IconComponent = faq.icon;
                                return (
                                    <AccordionItem
                                        key={faq.id}
                                        value={faq.id}
                                        className="overflow-hidden"
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 'none'
                                        }}
                                        data-testid={`policy-faq-item-${index + 1}`}
                                    >
                                        <AccordionTrigger
                                            className="py-5 hover:no-underline group border-b"
                                            style={{ borderColor: '#E2E8F0' }}
                                            data-testid={`policy-faq-question-${index + 1}`}
                                        >
                                            <div className="flex items-center gap-3 text-left w-full pr-2">
                                                <IconComponent
                                                    className="w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-60 transition-opacity duration-200"
                                                    style={{ color: '#D4A853', strokeWidth: 2 }}
                                                />
                                                <span
                                                    className="text-base font-semibold leading-snug"
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
                                            className="pt-4 pb-5"
                                            data-testid={`policy-faq-answer-${index + 1}`}
                                        >
                                            <p
                                                className="text-[15px] leading-relaxed pl-7"
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
                </div>

                {/* Bottom CTA - Minimal & Elegant */}
                <div
                    className="relative px-12 py-16 text-center overflow-hidden"
                    style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '20px'
                    }}
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3
                            className="text-3xl font-bold mb-3 tracking-tight"
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
                            className="mb-8 text-base leading-relaxed"
                            style={{ color: '#64748B' }}
                        >
                            Our support team is available 24/7 to address any specific questions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <button
                                className="px-7 py-3.5 font-semibold text-[15px] transition-all duration-200"
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
                                className="px-7 py-3.5 font-semibold text-[15px] transition-all duration-200"
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
};

export default FAQSection;
