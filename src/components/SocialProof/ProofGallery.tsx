import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, CheckCircle2 } from 'lucide-react';

const proofItems = [
    { id: 1, image: "/images/proofs/G1atLIAaIAArANJ.jfif" },
    { id: 2, image: "/images/proofs/G2eAWjIbEAAjjMv.png" },
    { id: 3, image: "/images/proofs/G3ISCIZXwAAoXOd.jfif" },
    { id: 4, image: "/images/proofs/G3ISCIcXcAAqJBG.jfif" },
    { id: 5, image: "/images/proofs/G3ISCIeW8AAxjeC.jfif" },
    { id: 6, image: "/images/proofs/G3ISCIeWcAEQXES.jfif" },
    { id: 7, image: "/images/proofs/G3jVEzEXoAAlsJI.jfif" },
    { id: 8, image: "/images/proofs/G3kUNblWoAAgk-i.jfif" },
    { id: 9, image: "/images/proofs/G3kW1E0WEAAPcHJ.jfif" },
    { id: 10, image: "/images/proofs/G55CrCSWEAAe2-D.jfif" },
    { id: 11, image: "/images/proofs/G6OSJr9WgAAxTV-.jfif" },
    { id: 12, image: "/images/proofs/GuYOmM7aQAAe-VN.jfif" }
];

export default function ProofGallery() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [itemsPerView, setItemsPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerView(1);
            else if (window.innerWidth < 1024) setItemsPerView(2);
            else setItemsPerView(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxSlide = Math.ceil(proofItems.length / itemsPerView) - 1;

    useEffect(() => {
        if (currentSlide > maxSlide) setCurrentSlide(0);
    }, [itemsPerView, maxSlide, currentSlide]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, maxSlide]);

    const handlePrev = () => { setIsAutoPlaying(false); setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1); };
    const handleNext = () => { setIsAutoPlaying(false); setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1); };

    return (
        <div
            className="relative bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm mb-12 sm:mb-14 md:mb-16 overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <Award size={22} className="text-amber-500 flex-shrink-0" />
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">Proof of Excellence Gallery</h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Verified student results from top universities</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Swipe to explore</span>
                    <ChevronRight size={14} />
                </div>
            </div>

            {/* Nav Arrows */}
            <button
                className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur border border-slate-200 rounded-full shadow-md flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-200"
                onClick={handlePrev}
                aria-label="Previous slide"
            >
                <ChevronLeft size={18} />
            </button>
            <button
                className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur border border-slate-200 rounded-full shadow-md flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-200"
                onClick={handleNext}
                aria-label="Next slide"
            >
                <ChevronRight size={18} />
            </button>

            {/* Viewport */}
            <div className="overflow-hidden mx-4 sm:mx-8 md:mx-10">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {Array.from({ length: Math.ceil(proofItems.length / itemsPerView) }).map((_, slideIndex) => (
                        <div key={slideIndex} className="min-w-full flex justify-center gap-3 sm:gap-4 md:gap-6 px-1">
                            {proofItems.slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView).map((item) => (
                                <div
                                    key={item.id}
                                    className="flex-1 min-w-0 max-w-[320px] bg-white border border-slate-200 rounded-xl overflow-hidden group hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-400 transition-all duration-300"
                                >
                                    <div className="relative overflow-hidden bg-slate-50">
                                        <img
                                            src={item.image}
                                            alt="Student grade proof"
                                            className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/95 text-white rounded-full text-[10px] font-semibold">
                                                <CheckCircle2 size={12} />
                                                <span>Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 sm:gap-2.5 mt-5 sm:mt-6">
                {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                    <button
                        key={index}
                        className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index
                                ? 'w-7 sm:w-8 bg-blue-700'
                                : 'w-2.5 bg-slate-200 hover:bg-blue-400'
                            }`}
                        onClick={() => { setIsAutoPlaying(false); setCurrentSlide(index); }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Footer */}
            <p className="text-center text-xs sm:text-sm text-slate-400 mt-3 sm:mt-4">
                Showing <strong className="text-blue-700">{Math.min((currentSlide + 1) * itemsPerView, proofItems.length)}</strong> of <strong className="text-blue-700">{proofItems.length}</strong> success stories
            </p>
        </div>
    );
}