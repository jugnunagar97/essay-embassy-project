import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Calendar, Tag } from 'lucide-react';

const testimonials = [
    {
        id: 1, name: "Sarah M.", tag: "Repeat Customer", rating: 5, date: "March 14, 2024",
        text: "Submitted a 15-page research methodology paper on short notice. The writer clearly understood qualitative research frameworks — my advisor only requested minor citation adjustments. Not my first order, and the consistency is what keeps me coming back.",
        subject: "Research Methods"
    },
    {
        id: 2, name: "Marcus T.", tag: "First-Time User", rating: 5, date: "November 8, 2023",
        text: "Was honestly skeptical because I've been burned before by similar services. But this was different — the case analysis actually reflected the course material we covered. My professor commented on the 'strong analytical framework.' Worth every dollar.",
        subject: "Business Strategy"
    },
    {
        id: 3, name: "Jennifer K.", tag: "Verified Purchase", rating: 5, date: "January 22, 2025",
        text: "Third semester using this service for my capstone projects. What I appreciate most is the communication — they actually read my rubric and followed it. The turnaround on revisions is also surprisingly fast for the quality you get.",
        subject: "Healthcare Admin"
    },
    {
        id: 4, name: "David L.", tag: "Graduate Student", rating: 5, date: "August 3, 2024",
        text: "Needed a literature review for my thesis proposal. The depth of sources they found was impressive — several papers I hadn't encountered in my own research. My committee approved the proposal on the first submission.",
        subject: "Environmental Science"
    },
    {
        id: 5, name: "Rachel P.", tag: "Returning Client", rating: 5, date: "December 19, 2023",
        text: "The statistical analysis section was the main reason I reached out. They not only ran the tests correctly but explained the methodology in a way that made sense. My TA said it was one of the cleaner SPSS outputs she'd reviewed.",
        subject: "Psychology Stats"
    },
    {
        id: 6, name: "Anthony W.", tag: "Verified Purchase", rating: 5, date: "February 6, 2025",
        text: "I'll admit I was in a tough spot with overlapping deadlines. The finance paper they delivered covered DCF analysis exactly how our textbook approaches it. Clean formatting, proper Excel models attached. Lifesaver doesn't begin to describe it.",
        subject: "Corporate Finance"
    },
    {
        id: 7, name: "Christina B.", tag: "Long-term Client", rating: 5, date: "October 11, 2024",
        text: "Four orders in, and they've never missed a deadline or delivered anything below expectations. My comparative politics essay got the highest mark in my section. The argument structure was exactly what my professor looks for.",
        subject: "Political Science"
    },
    {
        id: 8, name: "Michael R.", tag: "First-Time User", rating: 5, date: "July 29, 2023",
        text: "Took a chance based on a friend's recommendation for my nursing care plan assignment. The clinical reasoning was spot-on, and the care interventions were evidence-based with recent journal citations. Exceeded my expectations.",
        subject: "Nursing Studies"
    }
];

export default function TestimonialCarousel() {
    const [active, setActive] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goTo = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActive(index);
        setTimeout(() => setIsTransitioning(false), 400);
    }, [isTransitioning]);

    const goPrev = useCallback(() => {
        goTo((active - 1 + testimonials.length) % testimonials.length);
    }, [active, goTo]);

    const goNext = useCallback(() => {
        goTo((active + 1) % testimonials.length);
    }, [active, goTo]);

    const prev = (active - 1 + testimonials.length) % testimonials.length;
    const next = (active + 1) % testimonials.length;

    const renderCard = (testimonial: typeof testimonials[0], position: 'left' | 'center' | 'right') => {
        const isCenter = position === 'center';
        const isLeft = position === 'left';

        return (
            <div
                key={`${testimonial.id}-${position}`}
                className={`
          rounded-2xl relative transition-all duration-500 ease-out border border-white/[0.08]
          ${isCenter
                        ? 'flex-shrink-0 w-full sm:w-[380px] md:w-[420px] p-5 sm:p-7 md:p-8 opacity-100 z-10 shadow-2xl shadow-slate-900/20'
                        : 'hidden lg:block flex-shrink-0 w-[240px] xl:w-[260px] p-5 opacity-30 scale-[0.88] blur-[1px]'
                    }
          ${isLeft ? 'translate-x-3' : ''}
          ${position === 'right' ? '-translate-x-3' : ''}
        `}
                style={{
                    background: isCenter
                        ? 'linear-gradient(145deg, #0D2449 0%, #132D5C 50%, #0B1F42 100%)'
                        : 'linear-gradient(145deg, #0D2449 0%, #0F2850 100%)'
                }}
            >
                {/* Quote */}
                <div className="text-amber-500/40 mb-3">
                    <Quote size={isCenter ? 22 : 18} />
                </div>

                {/* Text */}
                <p className={`text-white/95 leading-relaxed mb-5 font-normal ${isCenter
                        ? 'text-[15px] sm:text-base'
                        : 'text-sm line-clamp-4'
                    }`}>
                    "{testimonial.text}"
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-4" />

                {/* Author */}
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-white font-bold text-sm sm:text-base">{testimonial.name}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">
                            <Tag size={9} />
                            {testimonial.tag}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="text-white/60 font-medium">{testimonial.subject}</span>
                        <span className="flex items-center gap-1 text-white/40">
                            <Calendar size={11} />
                            {testimonial.date}
                        </span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={13}
                                className={i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-white/20'}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mb-12 sm:mb-14 md:mb-16 py-6 sm:py-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 mb-1.5">
                    What Our Clients Say
                </h3>
                <p className="text-sm sm:text-base text-slate-400">
                    Authentic reviews from verified customers
                </p>
            </div>

            {/* Carousel */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
                {/* Left Arrow */}
                <button
                    onClick={goPrev}
                    disabled={isTransitioning}
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-slate-200 rounded-full shadow-md flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Cards */}
                <div className="flex items-center justify-center gap-4 md:gap-5 overflow-hidden">
                    {renderCard(testimonials[prev], 'left')}
                    {renderCard(testimonials[active], 'center')}
                    {renderCard(testimonials[next], 'right')}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={goNext}
                    disabled={isTransitioning}
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-slate-200 rounded-full shadow-md flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${active === index
                                ? 'w-6 sm:w-7 bg-amber-500'
                                : 'w-2 bg-slate-200 hover:bg-blue-400'
                            }`}
                        onClick={() => goTo(index)}
                        aria-label={`Go to review ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}