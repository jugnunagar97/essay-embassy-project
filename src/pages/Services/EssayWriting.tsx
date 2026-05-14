import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import UnifiedPriceCalculator from '../../components/Services/UnifiedPriceCalculator';
import { CheckCircle2, Star, ShieldCheck, ArrowRight, Shield, Headphones, GraduationCap, FileText, ChevronDown, Clock, Award, Users, Zap, BookOpen, Target, Sparkles, MessageCircle, DollarSign, CheckCircle, RefreshCw, Brain, Rocket, Trophy, Lock, Edit3, FileCheck, Pen, AlignLeft, Search, Scale, TrendingUp, Lightbulb, Microscope } from 'lucide-react';
import ScrollableContentPanel from '../../components/Services/ScrollableContentPanel';
import { SERVICE_SEO_PLACEHOLDER_CARDS } from '../../components/Services/serviceSeoPlaceholderCards';

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl bg-white mb-4 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        className="w-full px-6 py-5 text-left font-semibold text-gray-800 flex justify-between items-center hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg pr-4">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#0B1F42]/5 flex items-center justify-center text-[#1652A0] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 text-gray-600 leading-loose">
          {answer}
        </div>
      </div>
    </div>
  );
};


// Essay Types Grid Component
// ─── Essay Services Grid ──────────────────────────────────────────────────────
const EssayServicesGrid = () => {
  const services = [
    {
      emoji: '📝',
      icon: Pen,
      title: 'Personal Statement Writing',
      description: 'A polished personal statement built entirely from scratch that tells your story compellingly. Perfect for graduate programs, medical schools, law schools, and undergraduate applications worldwide.',
      features: ['Compelling story arc', 'Program-specific tailoring', 'Authentic voice preserved', 'Free Turnitin & AI detection reports'],
      cta: 'Write My Personal Statement',
      slug: '/essay-writing/personal-statement',
      popular: true,
    },
    {
      emoji: '🎯',
      icon: Target,
      title: 'Argumentative Essay Writing',
      description: 'Build powerful arguments with evidence-based reasoning. Perfect for debate-focused assignments requiring strong logical structure.',
      features: ['Strong thesis development', 'Evidence-based claims', 'Counterargument handling', 'Logical progression'],
      cta: 'Order Argumentative Essay',
      slug: '/essay-writing/argumentative',
      popular: false,
    },
    {
      emoji: '💬',
      icon: MessageCircle,
      title: 'Persuasive Essay Writing',
      description: 'Craft persuasive essays that move readers to action. Ideal for any assignment requiring compelling rhetoric and powerful appeals.',
      features: ['Ethos, pathos, logos balance', 'Audience-targeted tone', 'Strong call to action', 'Polished argumentation'],
      cta: 'Write My Persuasive Essay',
      slug: '/essay-writing/persuasive',
      popular: false,
    },
    {
      emoji: '📖',
      icon: BookOpen,
      title: 'Narrative Essay Writing',
      description: 'Engaging personal stories with vivid descriptions. Ideal for creative assignments that connect real experiences with deeper themes.',
      features: ['Compelling storytelling', 'Vivid imagery', 'Clear story arc', 'Thematic depth'],
      cta: 'Write My Narrative Essay',
      slug: '/essay-writing/narrative',
      popular: false,
    },
    {
      emoji: '✨',
      icon: Sparkles,
      title: 'Descriptive Essay Writing',
      description: 'Rich sensory details that immerse readers. Perfect for assignments requiring detailed observations and vivid imagery.',
      features: ['Sensory language mastery', 'Vivid descriptions', 'Literary devices', 'Engaging prose'],
      cta: 'Get Descriptive Help',
      slug: '/essay-writing/descriptive',
      popular: false,
    },
    {
      emoji: '📋',
      icon: AlignLeft,
      title: 'Expository Essay Writing',
      description: 'Clear, informative essays that explain topics with precision. Perfect for assignments requiring balanced facts and structured explanation.',
      features: ['Fact-based explanations', 'Logical organization', 'Clear topic sentences', 'Neutral, academic tone'],
      cta: 'Order Expository Essay',
      slug: '/essay-writing/expository',
      popular: false,
    },
    {
      emoji: '🔍',
      icon: Search,
      title: 'Analytical Essay Writing',
      description: 'Deep critical analysis that breaks down complex ideas, texts, or events into clear, structured arguments with academic rigor.',
      features: ['Critical idea breakdown', 'Strong analytical thesis', 'Evidence-based paragraphs', 'Correct academic format'],
      cta: 'Get Analytical Help',
      slug: '/essay-writing/analytical',
      popular: false,
    },
    {
      emoji: '⚖️',
      icon: Scale,
      title: 'Compare & Contrast Essay',
      description: 'Balanced comparison highlighting similarities and differences. Ideal for comparative analysis assignments across any subject.',
      features: ['Point-by-point & block method', 'Balanced analysis', 'Clear comparisons', 'Insightful synthesis'],
      cta: 'Order Comparison Essay',
      slug: '/essay-writing/compare-contrast',
      popular: false,
    },
    {
      emoji: '🔗',
      icon: TrendingUp,
      title: 'Cause & Effect Essay',
      description: 'Explore relationships between events and their outcomes. Perfect for analyzing consequences and meaningful academic connections.',
      features: ['Chain & block structure', 'Logical causal reasoning', 'Supporting evidence', 'Strong conclusions'],
      cta: 'Write Cause & Effect',
      slug: '/essay-writing/cause-effect',
      popular: false,
    },
    {
      emoji: '💡',
      icon: Lightbulb,
      title: 'Problem Solution Essay',
      description: 'Identify problems and propose practical, well-reasoned solutions. Great for assignments that require structured critical thinking.',
      features: ['Actionable thesis statements', 'Viable real-world solutions', 'Right transition words', 'Peer-reviewed sources'],
      cta: 'Get Solution Help',
      slug: '/essay-writing/problem-solution',
      popular: false,
    },
    {
      emoji: '🔬',
      icon: Microscope,
      title: 'Critical Analysis Essay',
      description: 'In-depth evaluation of texts, theories, or works. Perfect for literature, film, philosophy, and any course requiring analytical depth.',
      features: ['Evaluative framework', 'Textual evidence', 'Author intent analysis', 'Scholarly citations'],
      cta: 'Order Critical Analysis',
      slug: '/essay-writing/critical-analysis',
      popular: false,
    },
    {
      emoji: '🎓',
      icon: Award,
      title: 'Admission Essay Writing',
      description: 'Expert admission essays built to match your authentic voice. Our writers understand admissions committee expectations and craft narratives that get you accepted.',
      features: ['Authentic personal narrative', 'Admissions committee insight', 'Leadership & extracurriculars highlighted', 'Free Turnitin & AI detection reports'],
      cta: 'Write My Admission Essay',
      slug: '/essay-writing/admission',
      popular: false,
    },
    {
      emoji: '🏆',
      icon: Trophy,
      title: 'Scholarship Essay Writing',
      description: 'Compelling scholarship essays that help you win funding. We highlight your achievements and demonstrate why you deserve support — all in your authentic voice.',
      features: ['Achievement-focused narrative', 'Winning scholarship format', 'Selection committee insight', 'Free Turnitin & AI detection reports'],
      cta: 'Win My Scholarship',
      slug: '/essay-writing/scholarship',
      popular: false,
    },
    {
      emoji: '✏️',
      icon: Edit3,
      title: 'Essay Editing',
      description: 'Polish your existing work to perfection. Professional editing for grammar, structure, flow, and citation accuracy.',
      features: ['Grammar correction', 'Style improvement', 'Structure refinement', 'Citation checking'],
      cta: 'Edit My Essay',
      slug: '/essay-writing/editing',
      popular: false,
    },
    {
      emoji: '🔎',
      icon: FileCheck,
      title: 'Essay Proofreading',
      description: 'Final review to catch every error before submission. Spelling, punctuation, formatting, and citation accuracy covered.',
      features: ['Spelling & punctuation', 'Citation checking', 'Formatting compliance', 'Final accuracy check'],
      cta: 'Proofread My Essay',
      slug: '/essay-writing/proofreading',
      popular: false,
    },
    {
      emoji: '🔄',
      icon: RefreshCw,
      title: 'Essay Rewriting',
      description: 'Transform existing essays into stronger, clearer versions. Improve clarity, flow, originality, and overall academic quality.',
      features: ['Content improvement', 'Better flow', 'Enhanced clarity', 'Originality boost'],
      cta: 'Rewrite My Essay',
      slug: '/essay-writing/rewriting',
      popular: false,
    },
    {
      emoji: '🤔',
      icon: Users,
      title: 'Reflective Essay Writing',
      description: 'Connect experiences to learning. We help you articulate personal growth with academic depth, linking self-reflection to broader concepts.',
      features: ['Meaningful self-reflection', 'Personal-academic integration', 'Growth demonstration', 'Scholarly connections'],
      cta: 'Write Reflective Essay',
      slug: '/essay-writing/reflective',
      popular: false,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-6 border-2 ${service.popular ? 'border-[#1652A0] shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
        >
          {service.popular && (
            <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> POPULAR
            </div>
          )}
          <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-all text-3xl">
            {service.emoji}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1652A0] transition-colors leading-snug">{service.title}</h3>
          <p className="text-gray-600 mb-6 leading-[1.7] text-[15px]">{service.description}</p>
          <ul className="space-y-2.5 mb-6">
            {service.features.map((f, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            to={service.slug}
            className="w-full px-4 py-3 bg-[#1652A0]/10 text-[#1652A0] hover:bg-[#1652A0] hover:text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            {service.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  );
};



// Main Component
export default function EssayWriting() {
  return (
    <>
      <Helmet>
        <title>Professional Essay Writing Services | Expert Writers | EssayEmbassy.com</title>
        <meta name="description" content="Get professional essay writing services from verified academic experts. Starting at $10/page. 100% original, human-written content. 24/7 support and on-time delivery. Trusted by 500+ students." />
        <meta name="keywords" content="essay writing service, professional essay writers, academic writing help, custom essays, college essay writing, buy essays online, essay help" />
      </Helmet>

      <div className="min-h-screen bg-white font-sans">
        {/* PROFESSIONAL HERO SECTION */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-700">Highly Rated Academic Writers</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-green-700">100% Verified Plagiarism-Free</span>
                  </div>
                </div>

                {/* Power Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1F42] mb-6 leading-tight">
                  Academic Excellence, <br />
                  <span className="text-[#1652A0]">Tailored to Your Success</span>
                </h1>

                {/* Power Subheadline */}
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-loose font-medium">
                  Experience professional academic writing tailored to your rubric. Get 100% original, human-written essays from verified experts starting at just <span className="text-[#1652A0] font-bold">$10/page</span>.
                </p>

                {/* Unique Value Props */}
                <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
                  {[
                    { icon: Shield, text: 'Strict Copyright Safety' },
                    { icon: Award, text: 'Expert Researchers' },
                    { icon: RefreshCw, text: 'Client-focused Revisions' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                      <item.icon className="w-4 h-4 text-[#1652A0]" />
                      <span className="font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/order-now"
                    className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/samples"
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold text-lg rounded-xl transition-all border border-gray-200 shadow-sm flex items-center justify-center gap-3"
                  >
                    <FileCheck className="w-5 h-5" />
                    Review Our Samples
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                <div className="px-4">
                  <div className="text-4xl font-extrabold text-[#1652A0] mb-2">500+</div>
                  <div className="text-gray-600 font-medium">Happy Students</div>
                </div>
                <div className="px-4">
                  <div className="text-4xl font-extrabold text-[#1652A0] mb-2">99%</div>
                  <div className="text-gray-600 font-medium">On-Time Delivery</div>
                </div>
                <div className="px-4">
                  <div className="text-4xl font-extrabold text-[#1652A0] mb-2">5+</div>
                  <div className="text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="px-4">
                  <div className="text-4xl font-extrabold text-[#D4A853] mb-2">4.9/5</div>
                  <div className="text-gray-600 font-medium">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POWERFUL WHY CHOOSE US */}
        <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1652A0] via-transparent to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  WHY CHOOSE US
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  What Sets Our Service Apart
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-loose text-center">
                  We focus on <span className="text-[#1652A0] font-medium">quality, reliability, and transparency</span> â€” the fundamentals that matter to every student.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 - HERO FEATURE */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1F42] to-[#1652A0] p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-3xl font-black mb-4">100% Original, Zero Plagiarism Guarantee</h3>

                    <p className="text-gray-300 text-lg mb-6 leading-loose">
                      Every single essay is written from absolute scratch by human experts. No AI. No templates. No recycled content. You get a <span className="text-white font-bold">FREE Turnitin report</span> proving 0% plagiarism with every order.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <CheckCircle2 className="w-6 h-6 text-green-300 mb-2" />
                        <p className="font-bold text-lg">Free Turnitin Report</p>
                        <p className="text-gray-300 text-sm">Proves 0% plagiarism</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <Brain className="w-6 h-6 text-purple-300 mb-2" />
                        <p className="font-bold text-lg">100% Human Written</p>
                        <p className="text-gray-300 text-sm">Zero AI content</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <FileCheck className="w-6 h-6 text-yellow-300 mb-2" />
                        <p className="font-bold text-lg">Original Research</p>
                        <p className="text-gray-300 text-sm">Fresh sources only</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <Lock className="w-6 h-6 text-pink-300 mb-2" />
                        <p className="font-bold text-lg">Ownership Rights</p>
                        <p className="text-gray-300 text-sm">It's yours forever</p>
                      </div>
                    </div>

                    <div className="bg-green-500 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 font-bold text-lg shadow-xl">
                      <Trophy className="w-6 h-6" />
                      Your Work, Your Success
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualified Academic Writers</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    Our writers hold <span className="text-[#1652A0] font-medium">advanced degrees</span> and have <span className="text-[#1652A0] font-medium">genuine academic experience</span> in their respective fields.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Verified PhD & Master\'s degrees',
                      'Published academic authors',
                      'Average 8+ years experience',
                      'Native English speakers'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-purple-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Reliable, On-Time Delivery</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    We prioritize meeting your deadlines. The vast majority of orders are <span className="text-[#1652A0] font-medium">delivered on or ahead of schedule</span>.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Urgent orders accommodated',
                      'Real-time progress tracking',
                      'Proactive delivery updates',
                      'On-time delivery commitment'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Rocket className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feature 4 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-orange-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    <span className="text-orange-600 font-bold">Human support agents</span> ready to help anytime. Chat directly with your writer. Get updates in real-time.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Instant chat response',
                      'Direct writer communication',
                      'Progress notifications',
                      'Personal account manager'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Headphones className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feature 5 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-red-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Revisions Included</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    Not satisfied? We'll revise your essay until it meets your expectations. <span className="text-[#1652A0] font-medium">Revisions are included</span> within the delivery window at no extra cost.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Unlimited revisions (14 days)',
                      'Same writer guarantee',
                      'Zero additional charges',
                      'Fast revision turnaround'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Edit3 className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feature 6 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-indigo-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy, Protected</h3>
                  <p className="text-gray-600 leading-loose mb-6">
                    Your data is <span className="text-[#1652A0] font-medium">securely encrypted</span> and we never share your information with third parties.
                  </p>
                  <ul className="space-y-3">
                    {[
                      '256-bit SSL encryption',
                      'Anonymous payments',
                      'No data sharing ever',
                      'GDPR & Data Protection compliant'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Shield className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <Link
                  to="/order-now"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Start Your Project Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ESSAY TYPES */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                  ESSAY TYPES WE COVER
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  Expertise Across All Essay Formats
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  From argumentative to reflective, our writers handle every essay format with <span className="text-[#1652A0] font-medium">academic precision</span>
                </p>
              </div>

              <div className="container mx-auto px-4 mt-20 mb-8">
                <div className="max-w-6xl mx-auto text-center">
                  <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    ESSAY WRITING SERVICES WE OFFER
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                    Find the Perfect Essay Service
                  </h2>
                </div>
              </div>
              <EssayServicesGrid />


              {/* Bottom Section */}
              <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Don't See Your Essay Type?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We handle a wide range of academic writing formats. Reach out and we'll match you with the right expert.
                </p>
                <Link
                  to="/order-now"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                >
                  Request a Custom Essay <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                  HOW IT WORKS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  Simple Process, Quality Results
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  A straightforward process designed for busy students. <span className="text-[#1652A0] font-medium">Get started in minutes</span>.
                </p>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    step: '1',
                    icon: FileText,
                    title: 'Tell Us What You Need',
                    desc: 'Fill our super-simple form (takes 2 minutes). Upload files, set your deadline, choose academic level. Done.',
                    highlight: 'Takes just 2 minutes',
                    stepBg: 'bg-[#1652A0]',
                    iconBg: 'bg-[#1652A0]/10',
                    iconText: 'text-[#1652A0]',
                    badgeBg: 'bg-[#1652A0]/10',
                    badgeText: 'text-[#1652A0]',
                    checkColor: 'text-[#1652A0]',
                    features: ['Easy form', 'Upload files', 'Pick deadline', 'Choose level']
                  },
                  {
                    step: '2',
                    icon: Users,
                    title: 'We Match You With an Expert',
                    desc: 'We carefully match you with a qualified writer for your topic. Review their credentials, past work, and ratings before confirming.',
                    highlight: 'You choose your writer',
                    stepBg: 'bg-[#0B1F42]',
                    iconBg: 'bg-[#0B1F42]/10',
                    iconText: 'text-[#0B1F42]',
                    badgeBg: 'bg-[#0B1F42]/10',
                    badgeText: 'text-[#0B1F42]',
                    checkColor: 'text-[#0B1F42]',
                    features: ['See profiles', 'Check ratings', 'View samples', 'Pick your match']
                  },
                  {
                    step: '3',
                    icon: Rocket,
                    title: 'Track Progress in Real-Time',
                    desc: 'Stay informed throughout the process. Communicate with your writer directly and request adjustments as needed.',
                    highlight: 'Direct writer communication',
                    stepBg: 'bg-[#10B981]',
                    iconBg: 'bg-[#10B981]/10',
                    iconText: 'text-[#10B981]',
                    badgeBg: 'bg-[#10B981]/10',
                    badgeText: 'text-[#10B981]',
                    checkColor: 'text-[#10B981]',
                    features: ['Live chat', 'Progress updates', 'Draft previews', 'Full control']
                  },
                  {
                    step: '4',
                    icon: Trophy,
                    title: 'Download Your A+ Essay',
                    desc: 'Receive your completed essay along with an originality report. If adjustments are needed, revisions are included at no extra cost.',
                    highlight: 'Free plagiarism report included',
                    stepBg: 'bg-[#D4A853]',
                    iconBg: 'bg-[#D4A853]/10',
                    iconText: 'text-[#D4A853]',
                    badgeBg: 'bg-[#D4A853]/10',
                    badgeText: 'text-[#D4A853]',
                    checkColor: 'text-[#D4A853]',
                    features: ['Download essay', 'Plagiarism report', 'Free revisions', 'Submit & succeed']
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-[#1652A0] group">
                    <div className="flex items-start gap-6">
                      {/* Step Number */}
                      <div className={`flex-shrink-0 w-14 h-14 rounded-full ${item.stepBg} flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-110 transition-transform`}>
                        {item.step}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Icon & Title */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconText}`}>
                            <item.icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-[#0B1F42]">{item.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {item.desc}
                        </p>

                        {/* Highlight Badge */}
                        <div className={`inline-block ${item.badgeBg} ${item.badgeText} px-4 py-2 rounded-lg text-sm font-semibold mb-4`}>
                          âœ“ {item.highlight}
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-2">
                          {item.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className={`w-4 h-4 ${item.checkColor} mr-2`} />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center bg-[#0B1F42] rounded-2xl p-10">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Take the first step toward your next great essay.
                </p>
                <Link
                  to="/order-now"
                  className="px-10 py-4 bg-[#D4A853] text-[#0B1F42] font-bold text-lg rounded-xl hover:bg-[#C49843] transition-all shadow-md inline-flex items-center gap-3"
                >
                  Place Your Order <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div>
                  <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    TRANSPARENT PRICING
                  </div>

                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Get Your Exact Estimate in Seconds
                  </h2>

                  <p className="text-lg text-gray-600 mb-8 leading-loose">
                    No surprises. No hidden fees. Just honest, <span className="text-[#1652A0] font-medium">student-friendly pricing</span> aligned with the quality of work.
                  </p>

                  {/* Value Props */}
                  <div className="space-y-4">
                    {[
                      { icon: DollarSign, title: 'Starting at $12/page', desc: 'Accessible rates without sacrificing quality' },
                      { icon: Zap, title: 'Rush orders available', desc: 'Fast delivery for urgent deadlines' },
                      { icon: Shield, title: 'Satisfaction promise', desc: 'Committed to meeting expectations' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#1652A0] flex-shrink-0 border border-gray-200">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-0.5">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right - Calculator */}
                <div>
                  <UnifiedPriceCalculator />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEES SECTION */}
        <section className="py-24 bg-[#0B1F42] text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-block bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                  OUR COMMITMENTS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                  Our Guarantees to You
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Commitments we take seriously with every single order we deliver.
                </p>
              </div>

              {/* Guarantees Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: Trophy,
                    title: 'Quality Commitment',
                    description: 'Your essay is crafted to strong academic standards. If the quality doesn\'t meet your requirements, we\'ll revise it at no extra cost.'
                  },
                  {
                    icon: Clock,
                    title: 'On-Time Delivery',
                    description: 'We work diligently to meet every deadline. In the rare event of a delay, we\'ll find a resolution that works for you.'
                  },
                  {
                    icon: RefreshCw,
                    title: 'Unlimited Revisions',
                    description: 'Not 100% happy? We\'ll revise it until you are. Unlimited times. Within 14 days. Completely free.'
                  },
                  {
                    icon: Lock,
                    title: 'Privacy First',
                    description: 'Your data is securely encrypted. We do not share your personal information with any third parties.'
                  },
                  {
                    icon: DollarSign,
                    title: 'Money-Back Promise',
                    description: 'Unsatisfied for any reason? Get your money back. No hassle. No fine print. Just a full refund.'
                  },
                  {
                    icon: ShieldCheck,
                    title: '0% Plagiarism',
                    description: 'Every essay is 100% original. We prove it with a free Turnitin report showing 0% plagiarism.'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all group">
                    <div className="w-16 h-16 rounded-xl bg-[#1652A0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                    <p className="text-gray-300 leading-loose">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-3">We Stand Behind Our Work</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Confidence in quality is at the core of everything we do.
                </p>
                <Link
                  to="/guarantees"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1652A0] font-bold rounded-xl hover:bg-gray-100 transition-all"
                >
                  Learn More About Our Guarantees <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.12) 0%, rgba(212, 168, 83, 0.06) 100%)', border: '1px solid rgba(212, 168, 83, 0.3)', color: '#D4A853' }}>
                  <Star className="w-4 h-4" />
                  CLIENT REVIEWS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  What Our Clients Say
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Authentic reviews from verified customers across different subjects.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Isabella R.",
                    tag: "Returning Client",
                    date: "February 12, 2025",
                    subject: "Sociology",
                    rating: 5,
                    text: "Submitted a 12-page sociology paper on social stratification and the writer clearly understood the theoretical frameworks. My professor commented on the 'depth of analysis' â€” only asked for minor APA adjustments. Not my first order here, and this consistency is why I keep coming back."
                  },
                  {
                    name: "Julian W.",
                    tag: "First-Time User",
                    date: "January 5, 2025",
                    subject: "Business Strategy",
                    rating: 5,
                    text: "Was honestly skeptical because I've tried similar services before and gotten generic work. But this was different â€” the case analysis actually reflected the course material we covered in class. My professor said the strategic framework was 'well-constructed.' Definitely worth it."
                  },
                  {
                    name: "Sophie L.",
                    tag: "Verified Purchase",
                    date: "December 18, 2024",
                    subject: "Public Health",
                    rating: 5,
                    text: "Third time ordering for my MPH coursework. What I appreciate most is that they actually read my rubric and followed the marking criteria. The turnaround on revisions was also fast â€” got minor edits done within a few hours. Reliable service."
                  },
                  {
                    name: "Oliver K.",
                    tag: "Graduate Student",
                    date: "November 29, 2024",
                    subject: "Environmental Science",
                    rating: 5,
                    text: "Needed a literature review for my thesis proposal on water conservation policies. The depth of sources they found was impressive â€” several specific research papers I hadn't encountered in my own search. My advisor approved the proposal on the first submission."
                  },
                  {
                    name: "Chloe M.",
                    tag: "Returning Client",
                    date: "October 14, 2024",
                    subject: "Psychology",
                    rating: 5,
                    text: "The statistical analysis section was the reason I reached out. They ran the SPSS tests correctly AND explained the methodology in a way that made sense for my level. My TA said it was one of the cleaner outputs she'd reviewed this semester."
                  },
                  {
                    name: "Ethan C.",
                    tag: "Verified Purchase",
                    date: "September 3, 2024",
                    subject: "Corporate Finance",
                    rating: 5,
                    text: "I was in a tough spot with overlapping deadlines. The finance paper covered DCF analysis exactly how our textbook approaches it. Clean formatting, proper Excel models attached as appendix. Communication throughout was straightforward and professional."
                  }
                ].map((review, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1652A0]/30 transition-all">
                    {/* Top Row: Name + Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#0B1F42]">{review.name}</span>
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981]">{review.tag}</span>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>

                    {/* Subject + Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-[#1652A0] bg-[#1652A0]/5 px-3 py-1 rounded-full">{review.subject}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(review.rating))].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 text-[#D4A853] fill-[#D4A853]" />
                        ))}
                        {review.rating % 1 !== 0 && (
                          <span className="text-xs text-[#D4A853] font-bold ml-0.5">{review.rating}</span>
                        )}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 leading-loose text-[14px]">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>

              {/* More Reviews CTA */}
              <div className="mt-10 text-center">
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1F42] hover:bg-[#1652A0] text-white font-bold rounded-xl transition-all shadow-md"
                >
                  See All Reviews <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Service SEO scroll panel (placeholder) ── */}
        <section className="bg-slate-50 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollableContentPanel
              ariaLabel="Service overview"
              cards={SERVICE_SEO_PLACEHOLDER_CARDS}
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-6">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Common Questions Answered
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Clear, honest answers to help you make an informed decision.
              </p>
            </div>

            <div className="space-y-4">
              <FAQItem
                question="Is this actually legal? Won't I get in trouble?"
                answer="Yes, it's 100% legal. We're an academic assistance service, like a tutor. Students use our essays as learning materials, reference guides, and examples of how to structure arguments. What you do with our work is up to you, but our service itself is completely legal and operates worldwide. We've been doing this since 2019 with zero legal issues."
              />
              <FAQItem
                question="How do I know my essay won't be plagiarized?"
                answer="Every single essay is written from absolute scratch by a human expert. No AI. No templates. No copying. We include a FREE Turnitin plagiarism report with every order showing 0% plagiarism. Plus, you own full rights to the essay once it's delivered - we'll never reuse it. If you find ANY plagiarism, we'll refund you 100% immediately."
              />
              <FAQItem
                question="Who will actually write my essay?"
                answer="Your essay will be written by a verified academic professional with at least a Master's degree in your subject. Many have PhDs. All are native English speakers with years of teaching or research experience. You can review their profiles, check ratings from past students, see sample work, and choose who you want. We don't use random freelancers - only vetted experts."
              />
              <FAQItem
                question="How quickly can you deliver a completed essay?"
                answer="We can accommodate urgent deadlines as short as 24 hours depending on complexity and length. That said, giving us more time (like 3-7 days) allows for deeper research and refinement, which often leads to a stronger final product. We always communicate honestly about what's realistic for your specific requirements."
              />
              <FAQItem
                question="What if I need changes to the delivered essay?"
                answer="We include free revisions within a reasonable window after delivery. The same writer will handle your revisions based on your specific feedback. If after revisions the work still doesn't meet expectations, we'll work with you to find a fair resolution."
              />
              <FAQItem
                question="How does pricing work?"
                answer="Our pricing is completely transparent, starting at just $10 per page. The final price depends on your academic level, page count, and deadline, with absolutely no hidden fees. Title pages, bibliographies, formatting, and plagiarism reports are all included free."
              />
              <FAQItem
                question="Is my personal information safe? Will anyone find out?"
                answer="Your privacy is LOCKED DOWN. We use bank-level 256-bit SSL encryption. Your payment info is never stored. Your identity is completely anonymous - even your writer doesn't know your real name. We never, EVER share your data with anyone. Not universities. Not third parties. Nobody. Your secret is safe with us."
              />
              <FAQItem
                question="Do you offer refunds if something goes wrong?"
                answer="Yes. Full refunds if: 1) We miss the deadline (rare), 2) The essay doesn't match your instructions after revisions, 3) You're not satisfied for any reason. No complicated process. No fighting. Just contact support and we'll process your refund. We've refunded less than 1% of orders because our quality is that good, but the guarantee is real."
              />
            </div>

            {/* Bottom Support Section */}
            <div className="mt-12 bg-[#1652A0] rounded-2xl p-10 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-gray-200 mb-6">Our support team is happy to help you.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1652A0] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-md"
                >
                  <Headphones className="w-5 h-5" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-[#0B1F42]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Ready to Focus on What Matters?
              </h2>

              <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-loose">
                Let experienced academic writers handle the heavy lifting. Original work, delivered on time, with your success in mind.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <Link
                  to="/order-now"
                  className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/samples"
                  className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all border border-white/20 inline-flex items-center gap-3"
                >
                  <FileCheck className="w-5 h-5" />
                  Browse Samples
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                {[
                  { icon: CheckCircle, text: 'Original Work Guaranteed' },
                  { icon: CheckCircle, text: 'Revisions Included' },
                  { icon: CheckCircle, text: 'Confidential Service' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-[#D4A853]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
