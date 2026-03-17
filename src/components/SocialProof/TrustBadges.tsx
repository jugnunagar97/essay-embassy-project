import { Shield, CheckCircle2, Sparkles } from 'lucide-react';

const trustBadges = [
    { icon: Shield, label: "100% Confidential", sublabel: "Your privacy guaranteed" },
    { icon: CheckCircle2, label: "Plagiarism-Free", sublabel: "Original work always" },
    { icon: Sparkles, label: "Expert Writers", sublabel: "PhD & Masters holders" }
];

export default function TrustBadges() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-14">
            {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Icon size={18} className="text-emerald-600" />
                        </div>
                        <div className="min-w-0">
                            <span className="block text-sm font-semibold text-slate-800 truncate">{badge.label}</span>
                            <span className="block text-xs text-slate-500 truncate">{badge.sublabel}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}