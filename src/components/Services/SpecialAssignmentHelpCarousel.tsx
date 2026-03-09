import React, { useRef, useState } from 'react';

const carouselItems = [
    {
        imgSrc: '/images/verification.jpg',
        title: 'Verification',
        description: 'We care about your projects and pick the best specialists. To ensure your safety, we verify the identity of each candidate via social media.'
    },
    {
        imgSrc: '/images/skill test.jpg',
        title: 'Skill Test',
        description: 'We test each candidate by examining their skills and knowledge with various examinations before they join our team.'
    },
    {
        imgSrc: '/images/quality analysis.jpg',
        title: 'Quality Analysis',
        description: "We developed an AI-based system that analyses the quality of each expert's performance to ensure you get the best results."
    },
    {
        imgSrc: '/images/education level.jpg',
        title: 'Education Level',
        description: 'Our experts have diverse educational backgrounds, ensuring you get help from someone who truly understands your field.'
    },
    {
        imgSrc: '/images/broad expertise.jpg',
        title: 'Broad Expertise',
        description: 'No matter how complicated your assignment is, we can find a specialist that is competent enough to provide you with a clear and effective solution to any academic problem.'
    },
    {
        imgSrc: '/images/communication skills.jpg',
        title: 'Communication Skills',
        description: 'You can chat with all the experts who can help you with your assignments, even before you hire them. Make your decision based not only on reviews and ratings but also on your own impression of the direct interaction.'
    }
];

export function SpecialAssignmentHelpCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragDelta, setDragDelta] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardWidthRef = useRef<number>(0);

    // Calculate card width after mount
    React.useEffect(() => {
        if (trackRef.current && trackRef.current.children.length > 0) {
            const card = trackRef.current.children[0] as HTMLElement;
            cardWidthRef.current = card.offsetWidth;
        }
        const handleResize = () => {
            if (trackRef.current && trackRef.current.children.length > 0) {
                const card = trackRef.current.children[0] as HTMLElement;
                cardWidthRef.current = card.offsetWidth;
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Navigation
    const goTo = (idx: number) => {
        if (idx < 0) idx = 0;
        if (idx > carouselItems.length - 1) idx = carouselItems.length - 1;
        setCurrentIndex(idx);
    };
    const handlePrev = () => goTo(currentIndex - 1);
    const handleNext = () => goTo(currentIndex + 1);

    // Drag/Swipe handlers
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        if ('touches' in e) {
            setDragStartX(e.touches[0].pageX);
        } else {
            setDragStartX(e.pageX);
        }
        setDragDelta(0);
    };
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging || dragStartX === null) return;
        let clientX = 0;
        if ('touches' in e && e.touches.length > 0) {
            clientX = e.touches[0].pageX;
        } else if ('pageX' in e) {
            clientX = (e as MouseEvent).pageX;
        }
        setDragDelta(clientX - dragStartX);
    };
    const handleDragEnd = (e: MouseEvent | TouchEvent) => {
        if (!isDragging || dragStartX === null) return;
        let clientX = 0;
        if ('changedTouches' in e && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].pageX;
        } else if ('pageX' in e) {
            clientX = (e as MouseEvent).pageX;
        }
        const dx = clientX - dragStartX;
        setIsDragging(false);
        setDragStartX(null);
        setDragDelta(0);
        if (dx > 50 && currentIndex > 0) {
            goTo(currentIndex - 1);
        } else if (dx < -50 && currentIndex < carouselItems.length - 1) {
            goTo(currentIndex + 1);
        }
    };

    // Attach/remove global listeners for drag
    React.useEffect(() => {
        if (!isDragging) return;
        const move = (e: MouseEvent | TouchEvent) => handleDragMove(e);
        const up = (e: MouseEvent | TouchEvent) => handleDragEnd(e);
        window.addEventListener('mousemove', move as any);
        window.addEventListener('mouseup', up as any);
        window.addEventListener('touchmove', move as any);
        window.addEventListener('touchend', up as any);
        return () => {
            window.removeEventListener('mousemove', move as any);
            window.removeEventListener('mouseup', up as any);
            window.removeEventListener('touchmove', move as any);
            window.removeEventListener('touchend', up as any);
        };
        // eslint-disable-next-line
    }, [isDragging, dragStartX, currentIndex]);

    // Calculate transform
    const gap = 32; // px, matches gap-8
    const cardWidth = cardWidthRef.current || 380; // fallback
    const offset = -currentIndex * (cardWidth + gap) + (isDragging ? dragDelta : 0);

    return (
        <section className="w-full bg-[#F7FAFC] py-10">
            <div className="max-w-6xl mx-auto px-4 bg-[#F7FAFC] shadow-none border-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    {/* Left Column: Static Content & Navigation */}
                    <div className="md:col-span-1 flex flex-col justify-between">
                        <div>
                            <div className="mb-4 flex items-center">
                                <span className="inline-block w-1 h-7 bg-primary-400 rounded-full mr-3"></span>
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide leading-snug" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}>
                                    What Makes Our Service Unique
                                </h2>
                            </div>
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed mt-2 mb-10 max-w-md" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}>
                                We provide expert-written work tailored to your needs. Each assignment is crafted to highlight the qualities that matter most in your academic journey.
                            </p>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={handlePrev} aria-label="Previous" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary-100 transition-colors shadow focus:outline-none" disabled={currentIndex === 0}>
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            <button onClick={handleNext} aria-label="Next" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary-100 transition-colors shadow focus:outline-none" disabled={currentIndex === carouselItems.length - 1}>
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>
                    </div>
                    {/* Right Column: Dynamic Carousel */}
                    <div className="md:col-span-2 relative overflow-x-hidden select-none">
                        <div
                            className="w-full overflow-x-hidden"
                            onMouseDown={handleDragStart}
                            onTouchStart={handleDragStart}
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                        >
                            <div
                                ref={trackRef}
                                className="flex gap-8 transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(${offset}px)`,
                                    transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(.4,0,.2,1)',
                                }}
                            >
                                {carouselItems.map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex-shrink-0 w-full md:w-[380px] bg-[#F7FAFC] rounded-2xl shadow-xl p-6"
                                        style={{ userSelect: 'none' }}
                                    >
                                        <img src={item.imgSrc} alt={item.title} className="w-full aspect-video object-cover rounded-xl mb-4" />
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-gray-600 text-base">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
