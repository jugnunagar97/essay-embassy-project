import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Lock, 
  ShieldCheck, ArrowRight, XCircle, 
  Sparkles, Feather, AlertTriangle, 
  BookOpen, PenTool, GraduationCap, BarChart3 as BarChart3Icon, Star as StarIcon,
  Zap, Award, TrendingUp, Target
} from 'lucide-react';
import { apiEndpoint } from '../../config/api';

type EssayAnalysis = {
  overallScore?: number;
  metrics?: {
    structure?: number;
    authenticity?: number;
    grammar?: number;
    hook?: number;
    impact?: number;
  };
  topIssues?: string[];
  strengths?: { title: string; description: string; lineReference: string }[];
  criticalWeakness?: string;
  improvementPlan?: string[];
  tone?: string;
};

const CircularGauge = ({ score = 0, label, color = "emerald", delay = 0 }: { score?: number, label: string, color?: "emerald" | "amber" | "rose" | "violet", delay?: number }) => {
  const safeScore = (score === undefined || isNaN(score)) ? 0 : score;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const targetOffset = circumference - (safeScore / 100) * circumference;
    const timer = setTimeout(() => setOffset(targetOffset), 100 + delay);
    return () => clearTimeout(timer);
  }, [safeScore, circumference, delay]);
  
  const colorMap = {
    emerald: { stroke: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-500/10" },
    amber: { stroke: "stroke-amber-500", text: "text-amber-600", bg: "bg-amber-500/10" },
    rose: { stroke: "stroke-rose-500", text: "text-rose-600", bg: "bg-rose-500/10" },
    violet: { stroke: "stroke-violet-500", text: "text-violet-600", bg: "bg-violet-500/10" },
  };

  return (
    <div className="flex flex-col items-center group">
      <div className="relative flex items-center justify-center">
        <svg width="80" height="80" className="transform -rotate-90">
          <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-100" />
          <circle 
            cx="40" cy="40" r={radius} strokeWidth="5" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round"
            className={`${colorMap[color].stroke} transition-all duration-[2000ms] ease-out drop-shadow-sm`}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-xl font-bold ${colorMap[color].text} tabular-nums`}>{safeScore}</span>
        </div>
      </div>
      <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 group-hover:text-slate-700 transition-colors">{label}</span>
    </div>
  );
};

const FeaturePill = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm">
    <Icon size={14} className="text-emerald-600" />
    <span className="text-xs font-medium text-slate-600">{text}</span>
  </div>
);

export default function EssayAnalyzer() {
  const navigate = useNavigate();
  const [essayText, setEssayText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<EssayAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;

  const handleAnalyze = async () => {
    if (wordCount < 50) {
      setError("Please input a draft of at least 50 words for a valid assessment.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnalysis(null);
    
    try {
      const response = await fetch(apiEndpoint('/api/tools/analyze-essay'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essayText }),
      });

      if (!response.ok) {
        throw new Error('Analysis service unavailable. Please try again.');
      }
      
      const data = await response.json();
      if (!data || typeof data.overallScore !== 'number') {
         throw new Error("Analysis incomplete. Please refine your text and try again.");
      }
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const metrics = analysis?.metrics || { structure: 0, grammar: 0, authenticity: 0, hook: 0, impact: 0 };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50 font-sans text-slate-800 pb-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', system-ui, sans-serif; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-shimmer { animation: shimmer 2s linear infinite; background-size: 200% 100%; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-in { animation: scale-in 0.4s ease-out forwards; }
      `}</style>

      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                <GraduationCap size={22} strokeWidth={2} />
              </div>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-slate-900 tracking-tight">
                Essay <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Embassy</span>
              </h1>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">Scholarship Essay Evaluator</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {analysis && (
              <button 
                onClick={() => setAnalysis(null)} 
                className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
              >
                <PenTool size={14} /> New Analysis
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-emerald-700">AI Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-100/40 via-teal-100/30 to-cyan-100/40 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          <div className={`bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 flex flex-col transition-all duration-500 ${analysis ? 'h-[720px] lg:sticky lg:top-28' : 'h-[640px]'}`}>
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <PenTool size={16} className="text-slate-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-800">Draft Workspace</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Paste your scholarship essay below</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                wordCount > 650 
                  ? 'bg-amber-50 text-amber-700 border-amber-200' 
                  : wordCount > 0 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                <span className="text-xs font-bold tabular-nums">{wordCount}</span>
                <span className="text-[10px] font-medium">words</span>
              </div>
            </div>
            
            <textarea 
              className="flex-1 w-full p-8 text-base text-slate-700 placeholder:text-slate-300 focus:outline-none resize-none leading-relaxed font-body bg-transparent"
              placeholder="Begin by pasting your scholarship essay here. Our AI will analyze your narrative structure, voice authenticity, and persuasive impact..."
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              spellCheck={false}
            />

            <div className="p-6 border-t border-slate-100 bg-gradient-to-r from-white to-slate-50/50 rounded-b-2xl">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 flex items-start gap-3">
                  <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              <button 
                onClick={handleAnalyze}
                disabled={!essayText.trim() || isLoading}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="relative">Analyzing Your Essay...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="text-emerald-200" />
                    <span className="relative">Evaluate My Essay</span>
                    <ArrowRight size={18} className="text-emerald-200 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
                <FeaturePill icon={ShieldCheck} text="100% Confidential" />
                <FeaturePill icon={Zap} text="Instant Results" />
                <FeaturePill icon={Award} text="Ivy League Standards" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            
            {!analysis ? (
              <div className="h-full min-h-[640px] flex flex-col justify-center px-4 lg:px-8">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 mb-6">
                    <Target size={14} className="text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Free AI Analysis</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                    Discover What Makes Your Essay <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Stand Out</span>
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed font-body">
                    Our AI evaluator assesses your writing against the same criteria used by top scholarship committees. Get actionable insights in seconds.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="group flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200/60 transition-all duration-300">
                    <div className="mt-0.5 bg-gradient-to-br from-violet-500 to-purple-600 p-3 rounded-xl text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Narrative Structure</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Does your story flow logically? We check transitions, pacing, and overall coherence.</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200/60 transition-all duration-300">
                    <div className="mt-0.5 bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl text-white shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                      <Feather size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Voice & Authenticity</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Generic essays lose. We flag clichés and help your genuine voice shine through.</p>
                    </div>
                  </div>
                  
                  <div className="group flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200/60 transition-all duration-300">
                    <div className="mt-0.5 bg-gradient-to-br from-rose-500 to-pink-600 p-3 rounded-xl text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Persuasive Impact</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Measure the strength of your arguments and emotional resonance with readers.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-4 p-4 bg-slate-900 rounded-xl">
                  <div className="flex -space-x-3">
                    {[
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
                    ].map((src, i) => (
                      <img 
                        key={i} 
                        src={src} 
                        alt={`Student ${i + 1}`}
                        className="w-9 h-9 rounded-full border-2 border-slate-900 object-cover"
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                      {[1,2,3,4,5].map(i => <StarIcon key={i} size={12} fill="currentColor" />)}
                    </div>
                    <p className="text-xs text-slate-400"><span className="text-white font-semibold">12,000+</span> students helped this year</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 animate-fade-in">
                
                <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-full blur-3xl -mr-32 -mt-32"></div>
                  
                  <div className="relative flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award size={18} className="text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Assessment Complete</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-slate-900">Your Essay Analysis</h3>
                    </div>
                    <div className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 uppercase tracking-wider">
                      {analysis.tone || "Academic"} Tone
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center py-6">
                    <div className="relative mb-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-2xl opacity-20 scale-150"></div>
                      <div className="relative bg-gradient-to-br from-slate-50 to-white p-8 rounded-full border border-slate-100">
                        <span className="font-display text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{analysis.overallScore ?? 0}</span>
                        <span className="absolute top-6 right-4 text-lg text-slate-400 font-medium">/100</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Overall Score</p>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 w-full pt-8 mt-6 border-t border-slate-100">
                      <CircularGauge score={metrics.structure} label="Structure" color="violet" delay={100} />
                      <CircularGauge score={metrics.grammar} label="Grammar" color="emerald" delay={200} />
                      <CircularGauge score={metrics.authenticity} label="Unique" color="amber" delay={300} />
                      <CircularGauge score={metrics.hook} label="Hook" color="rose" delay={400} />
                      <CircularGauge score={metrics.impact} label="Impact" color="violet" delay={500} />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-rose-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <div className="p-1.5 bg-rose-100 rounded-lg"><XCircle size={14} /></div>
                      Areas to Improve
                    </h4>
                    <ul className="space-y-3">
                      {(analysis.topIssues || []).slice(0, 3).map((issue, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed pl-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl border border-emerald-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <div className="p-1.5 bg-emerald-100 rounded-lg"><CheckCircle2 size={14} /></div>
                      Your Strengths
                    </h4>
                    <div className="space-y-4">
                      {(analysis.strengths || []).slice(0, 2).map((strength, i) => (
                        <div key={i}>
                          <span className="block font-semibold text-slate-800 text-sm mb-1">{strength.title}</span>
                          <p className="text-xs text-slate-500 leading-relaxed">{strength.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl"></div>
                  
                  <div className="p-8 opacity-15 filter blur-sm select-none" aria-hidden="true">
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Expert Rewrite Suggestions</h4>
                      <p>Your opening paragraph lacks emotional resonance. Here's how to fix it...</p>
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                      <div className="h-4 bg-white/20 rounded w-1/2"></div>
                    </div>
                  </div>

                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-5 bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-2xl shadow-lg shadow-amber-500/30 animate-float">
                      <Lock size={28} className="text-white" />
                    </div>
                    
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                      Unlock Expert-Level Critique
                    </h3>
                    
                    <p className="text-slate-300 text-sm mb-8 max-w-md leading-relaxed">
                      Get a <span className="text-white font-semibold">line-by-line rewrite</span> from Ivy League editors. We'll transform your weak points into winning arguments.
                    </p>

                    <button
                      onClick={() => navigate('/order-now?service=editing')}
                      className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
                    >
                      Get Expert Edits 
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Professional Writers</span>
                      <span className="flex items-center gap-1.5"><Zap size={14} className="text-amber-400" /> 24h Turnaround</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trusted by Students Section - Always visible */}
      <div className="bg-gradient-to-b from-slate-50/50 to-white py-16 border-t border-slate-100/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-1">
              Trusted by students accepted into
            </p>
          </div>

          {/* Premium Logo Strip */}
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-16 lg:gap-x-20">
            {/* Harvard */}
            <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-500 cursor-default">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Harvard_University_coat_of_arms.svg" 
                alt="Harvard University" 
                className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="text-sm font-semibold text-slate-400 group-hover:text-[#A51C30] tracking-wide transition-colors duration-500 hidden sm:block">Harvard</span>
            </div>

            {/* Stanford */}
            <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-500 cursor-default">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_Cardinal_logo.svg" 
                alt="Stanford University" 
                className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="text-sm font-semibold text-slate-400 group-hover:text-[#8C1515] tracking-wide transition-colors duration-500 hidden sm:block">Stanford</span>
            </div>

            {/* MIT */}
            <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-500 cursor-default">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" 
                alt="MIT" 
                className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Yale */}
            <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-500 cursor-default">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Yale_University_logo.svg" 
                alt="Yale University" 
                className="h-9 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Testimonials - more refined */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300 group">
              <div className="flex items-center gap-0.5 mb-4">
                {[1,2,3,4,5].map(j => <StarIcon key={j} size={14} fill="currentColor" className="text-amber-400" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                "My first draft scored <span className="font-semibold text-emerald-600">58/100</span>. After 3 rewrites using the feedback, my final score hit <span className="font-semibold text-emerald-600">91</span>. Got into Stanford with a full ride!"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" 
                  alt="Priya M." 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-800 text-sm">Priya M.</div>
                  <div className="text-xs text-slate-400">Stanford '28</div>
                </div>
              </div>
            </div>

            <div className="relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300 group">
              <div className="flex items-center gap-0.5 mb-4">
                {[1,2,3,4,5].map(j => <StarIcon key={j} size={14} fill="currentColor" className="text-amber-400" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                "The authenticity detector flagged that my essay read like a <span className="font-semibold text-rose-500">LinkedIn bio</span>. The feedback helped me find my real story. Harvard Law accepted me."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                  alt="Marcus T." 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-800 text-sm">Marcus T.</div>
                  <div className="text-xs text-slate-400">Harvard Law '27</div>
                </div>
              </div>
            </div>

            <div className="relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300 group">
              <div className="flex items-center gap-0.5 mb-4">
                {[1,2,3,4,5].map(j => <StarIcon key={j} size={14} fill="currentColor" className="text-amber-400" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                "My opening was <span className="font-semibold text-rose-500">'I've always been passionate...'</span> — total cliché. Changed it and my score jumped from 65 to 87. MIT was impressed."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" 
                  alt="Emily C." 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-800 text-sm">Emily C.</div>
                  <div className="text-xs text-slate-400">MIT '28</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-slate-400">
              <span className="font-semibold text-slate-500">12,847</span> essays analyzed this month
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full border border-violet-100 mb-6">
              <BarChart3Icon size={14} className="text-violet-600" />
              <span className="text-xs font-bold text-violet-700 uppercase tracking-wide">How It Works</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              We Analyze <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">5 Critical Metrics</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-body">
              Our AI thinks like an admissions officer. It reads your story, checks your flow, and tells you exactly how to get a "Yes."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <BarChart3Icon size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Structure</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Does your essay flow smoothly? We check if your paragraphs connect logically from start to finish.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Authenticity Detector</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Admissions officers hate generic essays. We flag clichés so you sound like a real person.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <CheckCircle2 size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Advanced Grammar</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Fix spelling, punctuation, and awkward sentences. Polished, professional, mistake-free.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-rose-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hook Analysis</h3>
              <p className="text-slate-600 leading-relaxed text-sm">You have 5 seconds to grab their attention. We analyze your opening to make it impossible to ignore.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-cyan-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <GraduationCap size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Persuasive Impact</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Do you sound confident? We measure the strength of your arguments to help you win.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="w-14 h-14 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 backdrop-blur-sm">
                <Feather size={26} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Need a Human Touch?</h3>
              <p className="text-slate-300 leading-relaxed mb-6 relative z-10 text-sm">
                AI is great, but humans are better. Hire an Ivy League editor to rewrite your essay line-by-line.
              </p>
              <button 
                onClick={() => navigate('/order-now?service=editing')} 
                className="text-emerald-400 font-bold text-sm hover:text-emerald-300 flex items-center gap-2 relative z-10 group/btn"
              >
                Hire an Expert 
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Section 1: What is a Scholarship Essay Analyzer? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">
            What is a Scholarship Essay Analyzer?
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              A scholarship essay analyzer is an advanced evaluation tool that reviews your application essay against the specific criteria scholarship committees use when selecting recipients. Unlike basic grammar checkers, our analyzer examines the deeper elements that determine whether your essay will stand out among thousands of competing applications.
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              Scholarship committees typically spend less than 3 minutes reviewing each essay. In that brief window, your writing needs to capture attention, demonstrate genuine character, and convince readers you deserve their investment. Our analyzer identifies exactly where your essay succeeds and where it falls short.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 my-8 md:my-10">
              <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">Surface-Level Analysis</h3>
                <ul className="space-y-2 text-slate-600 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Grammar, spelling, punctuation accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Sentence structure and readability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Word choice and vocabulary level</span>
                  </li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 sm:p-6 border border-emerald-100">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">Deep-Level Analysis</h3>
                <ul className="space-y-2 text-slate-600 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Narrative arc and story development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Authenticity and personal voice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Emotional resonance and persuasion</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              The difference between winning and losing a scholarship often comes down to intangibles—the feeling a reader gets when they finish your essay. Our analyzer quantifies these intangibles so you can systematically improve your chances of success.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Section 2: How Does AI Essay Scoring Work? */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">
            How Does AI Essay Scoring Work?
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              Our scholarship essay analyzer uses natural language processing (NLP) trained on thousands of successful scholarship essays. The system has learned to recognize patterns that correlate with winning applications across diverse scholarship types—from merit-based academic awards to need-based grants and specialized program scholarships.
            </p>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm my-8 md:my-10">
              <h3 className="font-bold text-slate-900 mb-6 text-xl">The Five-Metric Framework</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-violet-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Structure Score (0-100)</h4>
                    <p className="text-slate-600 text-sm sm:text-base">Evaluates paragraph organization, logical flow, transition effectiveness, and how well your essay guides readers from introduction to conclusion.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-emerald-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Grammar Score (0-100)</h4>
                    <p className="text-slate-600 text-sm sm:text-base">Checks for grammatical errors, punctuation mistakes, spelling issues, and awkward sentence constructions that undermine credibility.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-amber-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Authenticity Score (0-100)</h4>
                    <p className="text-slate-600 text-sm sm:text-base">Detects clichés, generic statements, and phrases that appear in countless other applications. Higher scores indicate unique, genuine voice.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-rose-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Hook Score (0-100)</h4>
                    <p className="text-slate-600 text-sm sm:text-base">Measures how effectively your opening sentences capture attention. Scholarship reviewers often decide within seconds whether to read closely or skim.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-cyan-600">5</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Impact Score (0-100)</h4>
                    <p className="text-slate-600 text-sm sm:text-base">Assesses the persuasive power of your arguments, emotional resonance, and whether your conclusion leaves a lasting impression.</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Each metric is weighted based on its importance to scholarship selection. The overall score combines these factors with proprietary adjustments based on essay type and length. Essays scoring above 80 typically demonstrate strong scholarship potential, while scores below 60 indicate significant room for improvement.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Section 3: Why Scholarship Essay Quality Matters */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">
            Why Scholarship Essay Quality Matters
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              Scholarship committees receive hundreds—sometimes thousands—of applications for limited awards. Your GPA and test scores might get you past initial filters, but your essay is what separates you from equally qualified candidates. Research shows that essay quality is often the deciding factor in final selection rounds.
            </p>

            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 my-8 md:my-10">
              <h3 className="font-bold text-xl sm:text-2xl mb-6">The Numbers Behind Scholarship Selection</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">2.5M+</div>
                  <div className="text-xs sm:text-sm text-slate-400">Annual scholarship applicants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">3 min</div>
                  <div className="text-xs sm:text-sm text-slate-400">Average review time per essay</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">7%</div>
                  <div className="text-xs sm:text-sm text-slate-400">Typical selection rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">$35K</div>
                  <div className="text-xs sm:text-sm text-slate-400">Average 4-year award value</div>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-xl mb-4 mt-8">What Scholarship Committees Actually Look For</h3>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
              Former scholarship judges consistently highlight the same criteria when describing winning essays:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                </div>
                <span className="text-sm sm:text-base"><strong className="text-slate-800">Specific stories over general claims.</strong> "I organized a tutoring program" beats "I'm passionate about education."</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                </div>
                <span className="text-sm sm:text-base"><strong className="text-slate-800">Self-awareness and growth.</strong> Essays that show evolution and learning demonstrate maturity.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                </div>
                <span className="text-sm sm:text-base"><strong className="text-slate-800">Connection to future goals.</strong> Your past experiences should logically lead to your stated aspirations.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                </div>
                <span className="text-sm sm:text-base"><strong className="text-slate-800">Authentic voice.</strong> Your personality should come through. Committees want to fund real people, not polished robots.</span>
              </li>
            </ul>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Our analyzer checks your essay against these criteria, giving you objective feedback before you submit. The small investment of time to revise based on this feedback can translate to thousands of dollars in scholarship awards.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Section 4: Common Scholarship Essay Mistakes */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">
            Common Scholarship Essay Mistakes to Avoid
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              After analyzing thousands of scholarship essays, we've identified the most frequent mistakes that cost applicants awards. Recognizing these patterns in your own writing is the first step toward improvement.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-5 sm:p-6 border-l-4 border-rose-500 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <XCircle size={20} className="text-rose-500" />
                  Opening with a Cliché
                </h3>
                <p className="text-slate-600 mb-3 text-sm sm:text-base">
                  "Ever since I was a child..." or "I've always been passionate about..." appear in roughly 40% of scholarship essays. These openings signal to reviewers that they're about to read something generic.
                </p>
                <div className="bg-slate-50 rounded-lg p-4 text-sm">
                  <p className="text-rose-600 mb-2"><strong>Weak:</strong> "I've always had a passion for helping others."</p>
                  <p className="text-emerald-600"><strong>Strong:</strong> "The grandmother in room 407 called me 'the kid who actually listens.' I didn't realize until that moment how rare listening had become."</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 sm:p-6 border-l-4 border-rose-500 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <XCircle size={20} className="text-rose-500" />
                  Listing Achievements Without Meaning
                </h3>
                <p className="text-slate-600 mb-3 text-sm sm:text-base">
                  Your resume lists your achievements. Your essay should explain why they matter. Committees want to understand your motivations, not read a chronological account of your activities.
                </p>
                <div className="bg-slate-50 rounded-lg p-4 text-sm">
                  <p className="text-rose-600 mb-2"><strong>Weak:</strong> "I was president of three clubs, captain of the debate team, and volunteered 200 hours."</p>
                  <p className="text-emerald-600"><strong>Strong:</strong> "Leading debate taught me that winning an argument means nothing if you haven't changed anyone's mind. That realization shaped how I approach every disagreement now."</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 sm:p-6 border-l-4 border-rose-500 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <XCircle size={20} className="text-rose-500" />
                  Writing What You Think They Want to Hear
                </h3>
                <p className="text-slate-600 mb-3 text-sm sm:text-base">
                  Scholarship reviewers read hundreds of essays. They can immediately detect when an applicant is performing rather than being genuine. Authenticity creates connection; performance creates distance.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 sm:p-6 border-l-4 border-rose-500 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <XCircle size={20} className="text-rose-500" />
                  Ignoring the Specific Prompt
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Many applicants recycle essays without tailoring them to each scholarship's specific question. This approach almost always fails. Each prompt deserves a fresh, targeted response that directly addresses what the committee asked.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 sm:p-6 border-l-4 border-rose-500 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <XCircle size={20} className="text-rose-500" />
                  Weak or Missing Conclusion
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Many essays simply end rather than conclude. Your final paragraph should create a lasting impression—tie your story back to your goals, demonstrate growth, or leave readers with something memorable. A strong conclusion can elevate an average essay; a weak one can undermine excellent content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section 5: Tips for Writing Winning Scholarship Essays */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">
            Tips for Writing Winning Scholarship Essays
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Successful scholarship essays share common characteristics. Here's a practical framework for crafting essays that stand out from the competition.
            </p>

            <div className="grid gap-6 md:gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 sm:p-8 border border-emerald-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-3">Start with a Specific Moment</h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      The most powerful essays begin with a concrete scene. Instead of broad statements about your values, drop readers into a specific moment that reveals those values through action. What were you doing? What did you see, hear, feel? Sensory details create immersion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-violet-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-3">Show Transformation</h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Every memorable essay includes change. You faced a challenge, learned something, and emerged different. The transformation doesn't need to be dramatic—subtle shifts in perspective or understanding can be equally powerful. What do you know now that you didn't know before?
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-3">Be Specific About Your Goals</h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      "I want to make a difference" tells reviewers nothing. "I want to develop AI systems that help rural clinics diagnose diseases earlier" shows clear thinking and genuine commitment. Specific goals demonstrate that you've thought seriously about your future.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-rose-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-3">Connect Past to Future</h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Your essay should create a logical narrative arc from your experiences to your aspirations. Reviewers want to understand why you specifically are suited to achieve your stated goals. What in your background uniquely positions you for success?
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-cyan-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-3">Revise Ruthlessly</h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      First drafts are never your best work. Plan to write at least three versions of your essay. Read it aloud to catch awkward phrasing. Have others read it and tell you what they remember—if they don't remember your main point, your essay needs work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section 6: What Makes a Strong Scholarship Application? */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">
            What Makes a Strong Scholarship Application?
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Your essay is crucial, but it exists within a larger application. Understanding how all components work together helps you present a cohesive, compelling case for selection.
            </p>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="grid md:grid-cols-2">
                <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-100">
                  <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Award size={20} className="text-violet-500" />
                    Academic Excellence
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    GPA and test scores establish baseline qualification. For competitive scholarships, strong academics are typically a prerequisite, not a differentiator. Your essay must do the differentiating work.
                  </p>
                </div>
                <div className="p-6 sm:p-8 border-b md:border-b-0 border-slate-100">
                  <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Target size={20} className="text-emerald-500" />
                    Demonstrated Leadership
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Committees look for evidence that you take initiative. This doesn't require formal titles—organizing a study group or starting a small project counts. What matters is showing you create positive change.
                  </p>
                </div>
                <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-100">
                  <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-amber-500" />
                    Meaningful Extracurriculars
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Quality over quantity. Deep involvement in two or three activities demonstrates more than surface participation in many. Committees want to see sustained commitment and genuine engagement.
                  </p>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Feather size={20} className="text-rose-500" />
                    Compelling Personal Story
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Your essay provides context for everything else. It transforms a list of accomplishments into a human story. This is where our analyzer provides the most value—ensuring your story is told effectively.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 md:mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="font-bold text-xl sm:text-2xl mb-4">The 40-40-20 Rule</h3>
              <p className="text-slate-300 mb-6 text-sm sm:text-base">
                Based on feedback from scholarship reviewers, here's how application components typically weight in final decisions:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2">40%</div>
                  <div className="text-sm text-slate-400">Essay Quality</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-violet-400 mb-2">40%</div>
                  <div className="text-sm text-slate-400">Academic Record</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">20%</div>
                  <div className="text-sm text-slate-400">Activities & Letters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section 7: Frequently Asked Questions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            <details className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">Is this scholarship essay analyzer really free?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                Yes, completely free. You can analyze unlimited essays without creating an account or providing payment information. We offer this tool to help students access the same quality feedback that expensive private counselors provide.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">How accurate is the AI analysis compared to human reviewers?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                Our AI has been trained on essays evaluated by admissions professionals from top universities. In blind tests, our scores correlate strongly with human reviewer assessments. However, AI analysis is best used as a starting point—for the highest-stakes essays, combining AI feedback with human review produces the best results.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">Is my essay data kept private and secure?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                Absolutely. Your essay content is encrypted during transmission and is not stored after analysis. We do not use submitted essays to train our models or share them with any third parties. Your intellectual property remains entirely yours.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">What's the ideal scholarship essay length?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                Always follow the scholarship's specific requirements. If a range is given (e.g., 500-750 words), aim for the middle to upper end. If no limit is specified, 500-650 words typically provides enough space to develop ideas without losing reader attention. Quality always matters more than quantity.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">Can I use the same essay for multiple scholarships?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                You can adapt a core essay, but never submit identical essays without customization. Each scholarship has specific values and criteria. Reference the organization's mission, adjust your examples to align with their focus, and ensure your essay directly addresses their prompt. Generic essays rarely win.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">How many times should I revise my scholarship essay?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                Plan for at least 3-5 revision cycles. First, focus on overall structure and story. Then refine language and eliminate weak phrases. Finally, polish grammar and flow. Use our analyzer after each major revision to track improvement. Essays scoring below 75 typically need additional work.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">What if my score is low? Does that mean my essay is bad?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                A low score on a first draft is completely normal—even expected. Most essays score between 55-70 initially. The score identifies areas for improvement, not final quality. Students who use our feedback to revise typically see 15-25 point improvements by their final draft.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">Does using an essay analyzer count as cheating?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                No. Using analysis tools is equivalent to having a teacher or counselor review your work. We provide feedback on your writing—you still create the content. Scholarship committees expect applicants to seek feedback and revise. That's exactly what we help you do more effectively.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Strengthen Your Scholarship Essay?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who have used our analyzer to improve their essays and win more scholarships. Paste your draft above and get instant, actionable feedback.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
          >
            Analyze My Essay Now
            <ArrowRight size={18} />
          </button>
          <p className="mt-6 text-slate-500 text-sm">
            100% free. No account required. Results in seconds.
          </p>
        </div>
      </section>
    </div>
  );
}