import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Lock, 
  ShieldCheck, ArrowRight, XCircle, 
  Sparkles, Feather, AlertTriangle, 
  BookOpen, PenTool, GraduationCap, BarChart3 as BarChart3Icon, Star as StarIcon
} from 'lucide-react';
import { apiEndpoint } from '../../config/api';

// --- Types ---
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

// --- Components ---

// 1. Refined Gauge
const CircularGauge = ({ score = 0, label, color = "teal", delay = 0 }: { score?: number, label: string, color?: "teal" | "bronze" | "rose" | "indigo", delay?: number }) => {
  const safeScore = (score === undefined || isNaN(score)) ? 0 : score;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const targetOffset = circumference - (safeScore / 100) * circumference;
    const timer = setTimeout(() => setOffset(targetOffset), 100 + delay);
    return () => clearTimeout(timer);
  }, [safeScore, circumference, delay]);
  
  const colors = {
    teal: "text-teal-700 stroke-teal-600",
    bronze: "text-amber-700 stroke-amber-600",
    rose: "text-rose-700 stroke-rose-600",
    indigo: "text-slate-700 stroke-slate-600",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <svg width="70" height="70" className="transform -rotate-90">
          <circle cx="35" cy="35" r={radius} stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
          <circle 
            cx="35" cy="35" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round"
            className={`${colors[color]} transition-all duration-[2000ms] ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-lg font-serif font-bold ${colors[color]}`}>{safeScore}</span>
        </div>
      </div>
      <span className="mt-2 text-[9px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  );
};

// --- MAIN PAGE ---
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
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-800 pb-24">

      {/* 1. Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-teal-50 border border-teal-100 p-2 rounded-md text-teal-800">
                <GraduationCap size={20} />
            </div>
          <div>
                <h1 className="text-xl font-serif font-bold text-slate-900 tracking-tight">
                Essay Embassy <span className="text-teal-700">Evaluator</span>
                </h1>
            </div>
          </div>
          {analysis && (
             <button onClick={() => setAnalysis(null)} className="text-sm font-medium text-slate-500 hover:text-teal-700 transition-colors">
                New Assessment
             </button>
          )}
        </div>
      </div>

      {/* 2. Main Workspace */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* LEFT COLUMN: Input */}
          <div className={`bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col transition-all duration-500 ${analysis ? 'h-[700px] lg:sticky lg:top-28' : 'h-[600px]'}`}>
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <PenTool size={14} /> Draft Workspace
              </span>
              <span className={`text-xs font-serif italic px-3 py-1 rounded-md border ${wordCount > 650 ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-white text-slate-600 border-slate-200'}`}>
                {wordCount} words
              </span>
            </div>
            
            <textarea 
              className="flex-1 w-full p-8 text-lg text-slate-700 placeholder:text-slate-300 focus:outline-none resize-none leading-loose font-serif bg-white"
              placeholder="Paste your essay here for a comprehensive review..."
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              spellCheck={false}
            />

            <div className="p-6 border-t border-slate-100 bg-white rounded-b-xl">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-sm text-red-700">
                  {error}
                </div>
              )}
              
              <button 
                onClick={handleAnalyze}
                disabled={!essayText.trim() || isLoading}
                className="w-full group bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Reviewing Draft...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="text-teal-200" />
                    Evaluate My Draft
                  </>
                )}
              </button>
              <div className="mt-4 flex justify-center items-center gap-6 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1"><ShieldCheck size={12}/> Confidential</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={12}/> AI-Powered</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Results */}
          <div className="flex flex-col gap-8">
            
            {!analysis ? (
              // Empty State
              <div className="h-full min-h-[600px] flex flex-col justify-center px-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
                        How does your essay stack up?
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        We analyze your writing against the four pillars of successful scholarship applications.
                    </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div className="mt-1 bg-teal-50 p-2 rounded text-teal-700 h-fit"><BookOpen size={20}/></div>
                      <div>
                          <h4 className="font-bold text-slate-800">Narrative Structure</h4>
                          <p className="text-sm text-slate-500 mt-1">Does the story flow logically from hook to conclusion?</p>
                      </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div className="mt-1 bg-indigo-50 p-2 rounded text-indigo-700 h-fit"><Feather size={20}/></div>
                      <div>
                          <h4 className="font-bold text-slate-800">Voice & Authenticity</h4>
                          <p className="text-sm text-slate-500 mt-1">Does it sound like you, or a generic template?</p>
                      </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div className="mt-1 bg-rose-50 p-2 rounded text-rose-700 h-fit"><AlertTriangle size={20}/></div>
                      <div>
                          <h4 className="font-bold text-slate-800">Grammar & Mechanics</h4>
                          <p className="text-sm text-slate-500 mt-1">Checking for sophisticated syntax and error-free writing.</p>
                  </div>
                  </div>
                </div>
              </div>
            ) : (
              // Results State
              <div className="flex flex-col gap-6 animate-fade-in">
                
                {/* 1. Score Card */}
                <div className="bg-white rounded-xl shadow-md border border-slate-200/60 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-600 to-emerald-500"></div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-slate-900">Assessment Report</h3>
                        <p className="text-sm text-slate-500 mt-1">Based on Ivy League Rubrics</p>
                    </div>
                    <div className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded border border-slate-200 uppercase tracking-wider">
                        {analysis.tone || "Academic"} Tone
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                        <span className="text-6xl font-serif font-black text-slate-900">{analysis.overallScore ?? 0}</span>
                        <span className="absolute -top-2 -right-4 text-xl text-slate-400">/100</span>
                        </div>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 w-full pt-6 border-t border-slate-100">
                            <CircularGauge score={metrics.structure} label="Structure" color="indigo" delay={100} />
                            <CircularGauge score={metrics.grammar} label="Grammar" color="teal" delay={200} />
                        <CircularGauge score={metrics.authenticity} label="Unique" color="bronze" delay={300} />
                            <CircularGauge score={metrics.hook} label="Hook" color="rose" delay={400} />
                        <CircularGauge score={metrics.impact} label="Impact" color="indigo" delay={500} />
                    </div>
                  </div>
                </div>

                {/* 2. Insights Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-rose-100 p-5 shadow-sm">
                        <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <XCircle size={16} /> Attention Needed
                        </h4>
                        <ul className="space-y-4">
                            {(analysis.topIssues || []).slice(0, 3).map((issue, i) => (
                            <li key={i} className="text-sm text-slate-700 leading-snug pl-3 border-l-2 border-rose-200">
                                    {issue}
                                </li>
                                ))}
                            </ul>
                    </div>

                    <div className="bg-white rounded-lg border border-teal-100 p-5 shadow-sm">
                        <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <CheckCircle2 size={16} /> Draft Strengths
                        </h4>
                        <div className="space-y-4">
                            {(analysis.strengths || []).slice(0, 2).map((strength, i) => (
                                <div key={i}>
                                    <span className="block font-bold text-slate-800 text-xs mb-1">{strength.title}</span>
                                    <p className="text-xs text-slate-500 leading-relaxed">{strength.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. The Professional Upgrade (Paywall) */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 text-white shadow-xl mt-2">
                    
                    {/* Blurred Content Placeholder */}
                    <div className="p-8 opacity-20 filter blur-sm select-none" aria-hidden="true">
                      <div className="space-y-6">
                        <h4 className="font-bold text-lg">Detailed Action Plan</h4>
                        <p>The essay fails to connect the personal narrative with...</p>
                        <div className="h-4 bg-white/20 rounded w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded w-1/2"></div>
                      </div>
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
                      
                      <div className="mb-4 bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/10">
                        <Lock size={24} className="text-amber-400" />
                            </div>
                            
                      <h3 className="text-2xl font-serif font-bold text-white mb-3">
                        Comprehensive Critique
                      </h3>
                      
                      <p className="text-slate-300 text-sm mb-8 max-w-sm leading-relaxed">
                        Our experts will provide a <span className="text-white font-semibold">line-by-line rewrite</span> of your weak points and fix the critical flaw in your narrative.
                      </p>

                            <button
                                onClick={() => navigate('/order-now?service=editing')}
                          className="group bg-white text-slate-900 hover:bg-teal-50 font-bold py-3.5 px-8 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                            >
                          Get Expert Edits & Rewrite <ArrowRight size={18} className="text-teal-600 group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400">
                          <span>Professional Review</span>
                          <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                          <span>24h Turnaround</span>
                      </div>
                    </div>
                </div>

                {/* 4. Additional Resources / CTA */}
                {/* ===========================================================================
          PART 1: TRUST & RESULTS STRIP
          =========================================================================== */}
      <div className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* 1. University Trust Bar */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              Trusted by students accepted into top universities
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using Text/Icons to simulate Logos securely */}
              <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><BookOpen className="w-6 h-6" /> Harvard</div>
              <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><GraduationCap className="w-6 h-6" /> Stanford</div>
              <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><ShieldCheck className="w-6 h-6" /> Yale</div>
              <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><Sparkles className="w-6 h-6" /> Berkeley</div>
              <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><Feather className="w-6 h-6" /> Columbia</div>
            </div>
          </div>

          {/* 2. Success Stories Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
              </div>
              <p className="text-slate-700 font-medium text-lg mb-6 leading-relaxed">
                "I was stuck at a 60% score. The analyzer told me my hook was weak. I fixed it, hired an editor, and won a <span className="font-bold text-teal-700">$10,000 scholarship</span>."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">SM</div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Sarah M.</div>
                  <div className="text-xs text-slate-500">Class of '28 • Engineering</div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
              </div>
              <p className="text-slate-700 font-medium text-lg mb-6 leading-relaxed">
                "Most free tools just check grammar. This tool actually understood my <span className="font-bold text-teal-700">personal story</span> and told me where I sounded fake. Highly recommend."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">DJ</div>
                <div>
                  <div className="text-sm font-bold text-slate-900">David J.</div>
                  <div className="text-xs text-slate-500">Law School Applicant</div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
              </div>
              <p className="text-slate-700 font-medium text-lg mb-6 leading-relaxed">
                "The line-by-line rewrite feature is a game changer. It didn't just tell me what was wrong, it showed me <span className="font-bold text-teal-700">how to fix it</span>."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">AL</div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Anita L.</div>
                  <div className="text-xs text-slate-500">MBA Candidate</div>
                </div>
              </div>
            </div>

                      </div>
                    </div>
                </div>

              </div>
            )}
          </div>

        </div>
        {/* ===========================================================================
          PART 2: THE "DEEP DIVE" FEATURE GRID
          =========================================================================== */}
      <div className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 font-bold tracking-wide uppercase text-xs mb-4 border border-indigo-100">
              Under the Hood
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              We Analyze <span className="text-teal-600">5 Critical Metrics</span> to Help You Win
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Most tools just check for spelling errors. Our AI thinks like an admissions officer. It reads your story, checks your flow, and tells you exactly how to get a "Yes."
            </p>
          </div>

          {/* The Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1: Structure */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-300 transition-colors group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3Icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Structure Check</h3>
              <p className="text-slate-600 leading-relaxed">
                Does your essay flow smoothly? We check if your paragraphs connect logically. A good structure keeps the reader hooked from start to finish.
              </p>
            </div>

            {/* Feature 2: Authenticity */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-300 transition-colors group">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Authenticity Detector</h3>
              <p className="text-slate-600 leading-relaxed">
                Admissions officers hate generic essays. Our tool flags clichés and boring phrases so you can sound like a real person, not a robot.
              </p>
            </div>

            {/* Feature 3: Grammar */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-300 transition-colors group">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Advanced Grammar</h3>
              <p className="text-slate-600 leading-relaxed">
                Fix spelling, punctuation, and awkward sentences instantly. We ensure your writing is polished, professional, and mistake-free.
              </p>
            </div>

            {/* Feature 4: The Hook */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-300 transition-colors group">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">"The Hook" Analysis</h3>
              <p className="text-slate-600 leading-relaxed">
                You have 5 seconds to grab their attention. We analyze your opening sentence to make sure it's impossible to ignore.
              </p>
            </div>

            {/* Feature 5: Impact */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-300 transition-colors group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Persuasive Impact</h3>
              <p className="text-slate-600 leading-relaxed">
                Do you sound confident? We measure the strength of your arguments to help you convince the committee that you deserve the money.
              </p>
            </div>

            {/* Feature 6: Human Expert (The Bridge) */}
            <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-700 hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                <Feather size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Need a Human Touch?</h3>
              <p className="text-slate-300 leading-relaxed mb-6 relative z-10">
                AI is great, but humans are better. Hire an Ivy League editor to rewrite your essay line-by-line.
              </p>
              <button onClick={() => navigate('/order-now?service=editing')} className="text-teal-400 font-bold text-sm hover:text-teal-300 flex items-center gap-1 relative z-10">
                Hire an Expert <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}