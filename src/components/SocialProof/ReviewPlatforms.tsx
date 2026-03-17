import { Star, ExternalLink } from 'lucide-react';

const platforms = [
    { name: "Trustpilot", logo: "/images/trustpilot-icon.svg", rating: "4.9/5 on Trustpilot", type: "img" },
    { name: "Sitejabber", logo: "/images/sitejabber-icon.webp", rating: "4.8/5 on Sitejabber", type: "img" },
    { name: "Google", rating: "4.9/5 on Google", type: "google" }
];

export default function ReviewPlatforms() {
    return (
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-widest mb-5 sm:mb-6">
                Trusted Across Major Review Platforms
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
                {platforms.map((platform, index) => (
                    <a
                        key={index}
                        href="#"
                        className="flex items-center gap-3 sm:gap-3.5 p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 no-underline group"
                    >
                        {platform.type === 'google' ? (
                            <div className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 75%, #EA4335 100%)' }}>
                                G
                            </div>
                        ) : (
                            <img src={platform.logo} alt={platform.name} className="w-9 h-9 flex-shrink-0 object-contain" />
                        )}
                        <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className="text-amber-500 fill-amber-500" />
                                ))}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-slate-600 truncate">{platform.rating}</span>
                        </div>
                        <ExternalLink size={13} className="text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                    </a>
                ))}
            </div>
        </div>
    );
}