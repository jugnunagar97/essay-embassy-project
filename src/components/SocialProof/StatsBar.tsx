import { Star, Award, Clock, Users } from 'lucide-react';

const statsData = [
    { value: "96%", label: "A/A+ Grades", icon: Award, description: "Consistently exceptional" },
    { value: "4.9", label: "Average Rating", icon: Star, description: "Out of 5 stars" },
    { value: "14,247", label: "Essays Delivered", icon: Users, description: "Satisfied students" },
    { value: "98.7%", label: "On-Time Delivery", icon: Clock, description: "Never miss a deadline" }
];

export default function StatsBar() {
    return (
        <div className="rounded-2xl overflow-hidden mb-10 sm:mb-12 md:mb-14" style={{ background: 'linear-gradient(135deg, #0B1F42 0%, #0D2649 100%)' }}>
            <div className="grid grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 lg:p-7 hover:bg-white/[0.04] transition-colors duration-200"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.2) 0%, rgba(212,168,83,0.1) 100%)' }}>
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-amber-500" />
                            </div>
                            <div className="min-w-0">
                                <span className="block text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-none tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="block text-xs sm:text-sm font-semibold text-white mt-0.5 truncate">
                                    {stat.label}
                                </span>
                                <span className="block text-[10px] sm:text-xs text-white/60 mt-0.5 truncate">
                                    {stat.description}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}