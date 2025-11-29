import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wand2, CheckCircle2, Lock, Clock, 
  Star, ShieldCheck, ArrowRight, XCircle, 
  BarChart3, FileText, Sparkles, Feather, AlertTriangle
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

// 1. Elegant Circular Gauge (Light Mode)
const CircularGauge = ({ score = 0, label, color = "emerald" }: { score?: number, label: string, color?: "emerald" | "amber" | "rose" | "blue" }) => {
  const safeScore = isNaN(score) ? 0 : score;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeScore / 100) * circumference;
  
  const colors = {
    emerald: "text-emerald-600 stroke-emerald-500",
    amber: "text-amber-600 stroke-amber-500",
    rose: "text-rose-600 stroke-rose-500",
    blue: "text-blue-600 stroke-blue-500",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <svg width="80" height="80" className="transform -rotate-90">
          <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-gray-100" />
          <circle 
            cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round"
            className={`${colors[color]} transition-all duration-1000 ease-out`}
          />
        </svg>
        <span className={`absolute text-lg font-bold ${colors[color]}`}>{safeScore}</span>
      </div>
      <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
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
      setError("Please enter at least 50 words for a valid analysis.");
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
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Analysis failed. Please try again.');
      }
      
      const data = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">
      
      {/* 1. Header Section */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide border border-blue-100 mb-6">
            <Sparkles size={14} /> Free Admissions Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Scholarship Essay <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Evaluator</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an instant, Ivy-League level critique. We analyze structure, tone, and impact to help you win funding.
          </p>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">
          
          {/* LEFT COLUMN: Input Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full min-h-[600px] hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700 font-bold text-sm uppercase tracking-wide">
                <FileText size={16} className="text-blue-500" />
                Your Draft
              </div>
              <div className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                {wordCount} Words
              </div>
            </div>
            
            <textarea 
              className="flex-1 w-full p-6 text-base text-gray-700 placeholder-gray-300 focus:outline-none resize-none leading-relaxed font-serif"
              placeholder="Paste your scholarship essay here..."
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
            />

            <div className="p-6 border-t border-gray-100 bg-white">
              {error && <p className="text-red-500 text-sm font-medium mb-3 flex items-center gap-1"><AlertCircle size={14}/> {error}</p>}
              
              <button 
                onClick={handleAnalyze}
                disabled={!essayText.trim() || isLoading}
                className="w-full group bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 size={20} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
                    Analyze My Essay Free
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">100% Private. No sign-up required.</p>
            </div>
          </div>

          {/* RIGHT COLUMN: The Report Card */}
          <div className="relative bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-200 overflow-hidden min-h-[600px] flex flex-col">
            
            {!analysis ? (
              // Empty State
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gray-50/50">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                  <BarChart3 size={32} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Grade</h3>
                <p className="text-gray-500 max-w-sm text-sm">
                  We will evaluate your essay based on <span className="text-blue-600 font-semibold">Clarity</span>, <span className="text-blue-600 font-semibold">Persuasion</span>, and <span className="text-blue-600 font-semibold">Authenticity</span>.
                </p>
              </div>
            ) : (
              // Results State
              <div className="flex flex-col h-full animate-fade-in">
                
                {/* 1. Header: Big Score */}
                <div className="p-8 pb-6 border-b border-gray-100 bg-gradient-to-b from-blue-50/50 to-white">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Essay Strength Score</span>
                    <div className="text-6xl font-extrabold text-gray-900 mb-4">{analysis.overallScore ?? 0}<span className="text-2xl text-gray-400 font-medium">/100</span></div>
                    
                    {/* Metrics Row */}
                    <div className="w-full grid grid-cols-5 gap-2 mt-4">
                      <CircularGauge score={analysis.metrics?.structure} label="Structure" color="blue" />
                      <CircularGauge score={analysis.metrics?.grammar} label="Grammar" color="emerald" />
                      <CircularGauge score={analysis.metrics?.authenticity} label="Unique" color="amber" />
                      <CircularGauge score={analysis.metrics?.hook} label="Hook" color="rose" />
                      <CircularGauge score={analysis.metrics?.impact} label="Impact" color="blue" />
                    </div>
                  </div>
                </div>

                {/* 2. Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Top Issues */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wide">
                      <XCircle size={14} /> Top Issues Found
                    </h4>
                    {(analysis.topIssues || []).map((issue, i) => (
                      <div key={i} className="flex gap-3 items-start bg-rose-50 p-3 rounded-lg border border-rose-100 text-sm text-rose-800">
                        <span className="font-bold">{i+1}.</span> {issue}
                      </div>
                    ))}
                  </div>

                  {/* What's Working */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wide">
                      <CheckCircle2 size={14} /> What's Working
                    </h4>
                    {(analysis.strengths || []).map((strength, i) => (
                      <div key={i} className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-emerald-800 text-sm">{strength.title}</span>
                          <span className="text-[10px] bg-white text-emerald-600 px-2 py-0.5 rounded border border-emerald-200 shadow-sm">
                            {strength.lineReference}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-700">{strength.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* 3. BLURRED PAYWALL SECTION */}
                  <div className="relative pt-4">
                    <div className="filter blur-sm select-none opacity-50 space-y-4">
                      <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                        <AlertTriangle size={14}/> Critical Weakness
                      </h4>
                      <p className="text-gray-600 text-sm">This essay fails to connect the personal narrative with the broader academic goals...</p>
                      
                      <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wide flex items-center gap-2 mt-6">
                        <Feather size={14}/> Expert Improvements
                      </h4>
                      <div className="h-20 bg-gray-100 rounded-lg"></div>
                      <div className="h-20 bg-gray-100 rounded-lg"></div>
                    </div>

                    {/* UNLOCK CARD */}
                    <div className="absolute inset-0 top-0 z-10 flex items-center justify-center">
                      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 text-center w-full max-w-sm transform hover:scale-[1.02] transition-transform duration-300">
                        <div className="flex justify-center mb-4 text-amber-500">
                          <Lock size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock Full Report</h3>
                        <p className="text-sm text-gray-500 mb-6">See your critical weakness & get 3 actionable fixes.</p>
                        
                        <div className="flex items-center justify-center gap-3 mb-6 text-sm">
                          <span className="line-through text-gray-400">$95</span>
                          <span className="font-bold text-gray-900 bg-amber-100 px-2 py-1 rounded text-amber-800">Only $29</span>
                        </div>

                        <button
                          onClick={() => navigate('/order-now?service=editing')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center gap-2"
                        >
                          Fix My Essay <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}