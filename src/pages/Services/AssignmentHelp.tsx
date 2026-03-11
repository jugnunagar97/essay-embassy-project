import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import UnifiedPriceCalculator from '../../components/Services/UnifiedPriceCalculator';
import {
  CheckCircle2,
  Star,
  ShieldCheck,
  ArrowRight,
  Shield,
  Headphones,
  GraduationCap,
  FileText,
  ChevronDown,
  Clock,
  Award,
  Users,
  Zap,
  Sparkles,
  MessageCircle,
  DollarSign,
  CheckCircle,
  RefreshCw,
  Brain,
  Rocket,
  Trophy,
  Lock,
  Edit3,
  FileCheck,
  Calculator,
  Monitor,
  BarChart2,
  Briefcase,
  Code,
  FlaskConical,
  Cpu,
  Heart,
  TrendingUp,
  PieChart,
  Scale,
  Layers,
  BookMarked
} from 'lucide-react';

// â”€â”€â”€ FAQ Item â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

// â”€â”€â”€ Assignment Types Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const AssignmentTypesGrid = () => {
  const types = [
    {
      title: 'Management Assignment Help',
      emoji: '📊',
      icon: Briefcase,
      description: 'Expert management homework help built from scratch. From strategic management case studies to HR planning.',
      features: ['Strategic management', 'SWOT & PESTLE analysis', 'Organizational behavior', 'Business planning'],
      cta: 'Get Management Help',
      popular: true,
      link: '/assignment-help/management',
    },
    {
      title: 'Math Assignment Help',
      emoji: '➕',
      icon: Calculator,
      description: 'Step-by-step solutions for all math topics — from algebra and calculus to discrete mathematics. Accurate workings with full explanations.',
      features: ['Algebra & calculus', 'Statistics & probability', 'Discrete mathematics', 'Step-by-step workings'],
      cta: 'Get Math Help',
      popular: false,
      link: '/assignment-help/math',
    },
    {
      title: 'Programming Assignment Help',
      emoji: '💻',
      icon: Code,
      description: 'Working, well-commented code solutions across all major languages and frameworks. From beginner scripts to advanced data structures.',
      features: ['Python, Java, C++', 'Data structures & algorithms', 'Database & web projects', 'Clean, commented code'],
      cta: 'Get Programming Help',
      popular: true,
      link: '/assignment-help/programming',
    },
    {
      title: 'Science Assignment Help',
      emoji: '🔬',
      icon: FlaskConical,
      description: 'Accurate science assignments across biology, chemistry, physics, and earth sciences. Expert-written lab reports and research tasks.',
      features: ['Biology, chemistry, physics', 'Lab report writing', 'Research & analysis', 'Peer-reviewed sources'],
      cta: 'Get Science Help',
      popular: false,
      link: '/assignment-help/science',
    },
    {
      title: 'Engineering Assignment Help',
      emoji: '⚙️',
      icon: Cpu,
      description: 'Technical engineering solutions across civil, mechanical, electrical, and software disciplines. Precise calculations and diagrams.',
      features: ['Civil, mechanical, electrical', 'Technical calculations', 'CAD & design tasks', 'Detailed explanations'],
      cta: 'Get Engineering Help',
      popular: true,
      link: '/assignment-help/engineering',
    },
    {
      title: 'MS Office Assignment Help',
      emoji: '🖥️',
      icon: Monitor,
      description: 'Professional help with Word, Excel, PowerPoint, and Access assignments. Spreadsheets, presentations, and formatted documents done right.',
      features: ['Excel formulas & macros', 'PowerPoint presentations', 'Word formatting & reports', 'Access database tasks'],
      cta: 'Get MS Office Help',
      popular: false,
      link: '/assignment-help/ms-office',
    },
    {
      title: 'Nursing Assignment Help',
      emoji: '🏥',
      icon: Heart,
      description: 'Evidence-based nursing assignments written by healthcare experts. Care plans, case studies, and clinical analysis all covered.',
      features: ['Evidence-based practice', 'Care plan writing', 'Clinical case studies', 'Reflective journals'],
      cta: 'Get Nursing Help',
      popular: false,
      link: '/assignment-help/nursing',
    },
    {
      title: 'Economics Assignment Help',
      emoji: '📈',
      icon: TrendingUp,
      description: 'Clear, well-researched economics assignments covering microeconomics, macroeconomics, econometrics, and behavioral economics.',
      features: ['Micro & macroeconomics', 'Econometrics & modelling', 'Policy analysis', 'Data interpretation'],
      cta: 'Get Economics Help',
      popular: false,
      link: '/assignment-help/economics',
    },
    {
      title: 'Finance Assignment Help',
      emoji: '💰',
      icon: PieChart,
      description: 'Accurate finance assignments covering corporate finance, investment analysis, financial modelling, and portfolio management.',
      features: ['Corporate finance', 'Investment analysis', 'Financial modelling', 'Portfolio management'],
      cta: 'Get Finance Help',
      popular: false,
      link: '/assignment-help/finance',
    },
    {
      title: 'Accounting Assignment Help',
      emoji: '🧾',
      icon: BarChart2,
      description: 'Precise accounting assignments covering financial statements, management accounting, auditing, and tax calculations.',
      features: ['Financial statements', 'Management accounting', 'Auditing & compliance', 'Tax calculations'],
      cta: 'Get Accounting Help',
      popular: false,
      link: '/assignment-help/accounting',
    },
    {
      title: 'Law Assignment Help',
      emoji: '⚖️',
      icon: Scale,
      description: 'Well-argued law assignments covering contract law, criminal law, tort law, constitutional law, and international law.',
      features: ['Contract & tort law', 'Criminal & constitutional law', 'Case law analysis', 'OSCOLA/Bluebook citations'],
      cta: 'Get Law Help',
      popular: false,
      link: '/assignment-help/law',
    },
    {
      title: 'Statistics Assignment Help',
      emoji: '📉',
      icon: Layers,
      description: 'Clear statistical solutions covering descriptive stats, hypothesis testing, regression analysis, and data visualization.',
      features: ['Descriptive & inferential stats', 'Hypothesis testing', 'Regression analysis', 'SPSS & R support'],
      cta: 'Get Statistics Help',
      popular: false,
      link: '/assignment-help/statistics',
    },
    {
      title: 'Humanities Assignment Help',
      emoji: '🌍',
      icon: BookMarked,
      description: 'Well-researched humanities assignments covering history, philosophy, sociology, cultural studies, and political science.',
      features: ['History & philosophy', 'Sociology & cultural studies', 'Political science', 'Critical analysis'],
      cta: 'Get Humanities Help',
      popular: false,
      link: '/assignment-help/humanities',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {types.map((type, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-6 border-2 ${type.popular ? 'border-[#1652A0] shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
        >
          {type.popular && (
            <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> POPULAR
            </div>
          )}
          {/* Icon */}
          <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-all text-3xl">
            {type.emoji}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1652A0] transition-colors">{type.title}</h3>
          <p className="text-gray-600 mb-5 leading-relaxed text-sm">{type.description}</p>
          <ul className="space-y-2.5 mb-6">
            {type.features.map((f, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            to={type.link}
            className="w-full px-4 py-3 bg-[#1652A0]/10 text-[#1652A0] hover:bg-[#1652A0] hover:text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            {type.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  );
};

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function AssignmentHelp() {
  return (
    <>
      <Helmet>
        <title>Professional Assignment Help | Expert Writers | EssayEmbassy.com</title>
        <meta name="description" content="Get professional assignment help from verified academic experts. Starting at $10/page. 100% original, human-written content. 24/7 support and on-time delivery. Trusted by 500+ students." />
        <meta name="keywords" content="assignment help, online assignment help, assignment writing service, do my assignment, college assignment help, university assignment help India" />
      </Helmet>

      <div className="min-h-screen bg-white font-sans">

        {/* â”€â”€ HERO â”€â”€ */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-gray-700">Original Work</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-700">Expert Writers</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-green-700">On-Time Delivery</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1F42] mb-6 leading-tight">
                  Professional Assignment Help <br />
                  <span className="text-[#1652A0]">for Every Subject</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-loose font-medium">
                  Struggling with complex assignments? Get on-time, 100% original, human-written solutions from verified experts starting at just <span className="text-[#1652A0] font-bold">$10/page</span>.
                </p>

                {/* Value Props */}
                <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
                  {[
                    { icon: Shield, text: 'Strict Copyright Safety' },
                    { icon: Award, text: 'Expert Researchers' },
                    { icon: RefreshCw, text: 'Client-focused Revisions' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                      <item.icon className="w-4 h-4 text-[#1652A0]" />
                      <span className="font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/order-now"
                    className="w-full sm:w-auto px-8 py-4 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                  >
                    Start Your Project <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/samples"
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold text-lg rounded-xl transition-all border border-gray-200 shadow-sm flex items-center justify-center gap-3"
                  >
                    <FileCheck className="w-5 h-5" /> Review Our Samples
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ STATISTICS â”€â”€ */}
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

        {/* â”€â”€ WHY CHOOSE US â”€â”€ */}
        <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1652A0] via-transparent to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  WHY CHOOSE US
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  What Sets Our Service Apart
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-loose text-center">
                  We focus on <span className="text-[#1652A0] font-medium">quality, speed, and total academic integrity</span> â€” the fundamentals every student deserves.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Hero Feature */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1F42] to-[#1652A0] p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 leading-tight">100% Originality & Plagiarism-Free Guarantee</h3>
                    <p className="text-gray-300 text-lg mb-6 leading-loose">
                      Every assignment is drafted from scratch by a verified subject expert, ensuring <span className="text-white font-bold">zero AI involvement</span>. We provide a Free Plagiarism & AI-Detection Report with every order to guarantee your academic integrity.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { icon: CheckCircle2, color: 'text-green-300', title: 'Free Turnitin Report', sub: 'Proves 0% plagiarism' },
                        { icon: Brain, color: 'text-purple-300', title: '100% Human Written', sub: 'Zero AI content' },
                        { icon: FileCheck, color: 'text-yellow-300', title: 'Original Research', sub: 'Fresh sources only' },
                        { icon: Lock, color: 'text-pink-300', title: 'Ownership Rights', sub: 'It\'s yours forever' },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                          <p className="font-bold text-lg">{item.title}</p>
                          <p className="text-gray-300 text-sm">{item.sub}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-green-500 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 font-bold text-lg shadow-xl">
                      <Trophy className="w-6 h-6" /> Your Work, Your Success
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-[#1652A0]">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualified Academic Writers</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our team consists of verified professionals holding <span className="text-[#1652A0] font-medium">Master's and Ph.D. degrees</span> from top Indian and global universities. They bring deep academic backgrounds and real-world expertise to your specific subject area.
                  </p>
                  <ul className="space-y-3">
                    {['Verified PhD & Master\'s degrees', 'Top Indian & global universities', 'Deep subject specialization', 'Real-world academic expertise'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-purple-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">On-Time Delivery Commitment</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We understand that missing a deadline is not an option. Whether you have weeks or just a few hours, our online assignment help ensures your work arrives <span className="text-[#1652A0] font-medium">exactly when you need it</span>.
                  </p>
                  <ul className="space-y-3">
                    {['Urgent 6-hour delivery available', 'Real-time progress tracking', 'Proactive delivery updates', 'On-time delivery commitment'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Rocket className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-orange-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive Support & Direct Communication</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Get <span className="text-orange-600 font-bold">24/7 access</span> to our dedicated support team. We also provide direct communication channels so you can chat with your writer anytime for quick updates and clear instructions.
                  </p>
                  <ul className="space-y-3">
                    {['24/7 dedicated support team', 'Direct writer chat access', 'Real-time progress updates', 'Personal account manager'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Headphones className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 5 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-red-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Revisions Policy</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Your satisfaction is our priority. If your assignment needs improvements or misses any initial criteria, we provide <span className="text-[#1652A0] font-medium">unlimited free revisions</span> until the final draft feels just right.
                  </p>
                  <ul className="space-y-3">
                    {['Unlimited revisions (14 days)', 'Same writer guarantee', 'Zero additional charges', 'Fast revision turnaround'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Edit3 className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 6 */}
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 group hover:border-indigo-500">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Confidentiality</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Your academic integrity and privacy are fully protected. We use <span className="text-[#1652A0] font-medium">secure 256-bit SSL encryption</span> for payments, and your personal data is never shared with third parties or universities.
                  </p>
                  <ul className="space-y-3">
                    {['256-bit SSL encryption', 'Anonymous payments accepted', 'No data sharing â€” ever', 'GDPR & Data Protection compliant'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-medium">
                        <Shield className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-16 text-center">
                <Link
                  to="/order-now"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Start Your Project Today <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ ASSIGNMENT TYPES â”€â”€ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                  ASSIGNMENT TYPES WE COVER
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  Expertise Across All Assignment Formats
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Whenever you think, "I need someone to do my assignment," our experts are ready. We cover a wide range of academic tasks with <span className="text-[#1652A0] font-medium">academic precision</span>.
                </p>
              </div>

              <AssignmentTypesGrid />

              <div className="mt-12 bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                <h3 className="text-2xl font-bold text-[#0B1F42] mb-3">Don't See Your Assignment Type?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We cover over 200 academic subjects. Reach out and we'll match you with the right expert for your specific task.
                </p>
                <Link
                  to="/order-now"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1652A0] text-white font-bold rounded-xl hover:bg-[#0B1F42] transition-all shadow-md"
                >
                  Request Custom Assignment Help <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ HOW IT WORKS â”€â”€ */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                  HOW IT WORKS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">
                  Simple Process, Quality Results
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Getting college assignment help has never been easier. <span className="text-[#1652A0] font-medium">Get started in minutes.</span>
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    step: '1', icon: FileText, stepBg: 'bg-[#1652A0]',
                    iconBg: 'bg-[#1652A0]/10', iconText: 'text-[#1652A0]',
                    badgeBg: 'bg-[#1652A0]/10', badgeText: 'text-[#1652A0]',
                    checkColor: 'text-[#1652A0]',
                    title: 'Submit Your Requirements',
                    desc: 'Fill out our secure order form with your topic, deadline, academic level, and specific university guidelines.',
                    highlight: 'Takes just 2 minutes',
                    features: ['Easy secure form', 'Upload guidelines', 'Pick your deadline', 'Choose academic level'],
                  },
                  {
                    step: '2', icon: Users, stepBg: 'bg-[#0B1F42]',
                    iconBg: 'bg-[#0B1F42]/10', iconText: 'text-[#0B1F42]',
                    badgeBg: 'bg-[#0B1F42]/10', badgeText: 'text-[#0B1F42]',
                    checkColor: 'text-[#0B1F42]',
                    title: 'Get Matched With an Expert',
                    desc: 'We review your needs and connect you with a highly qualified academic writer specializing in your exact field.',
                    highlight: 'Subject-matched expert',
                    features: ['See writer profiles', 'Check ratings', 'View past samples', 'Confirm your match'],
                  },
                  {
                    step: '3', icon: Rocket, stepBg: 'bg-[#10B981]',
                    iconBg: 'bg-[#10B981]/10', iconText: 'text-[#10B981]',
                    badgeBg: 'bg-[#10B981]/10', badgeText: 'text-[#10B981]',
                    checkColor: 'text-[#10B981]',
                    title: 'Track Progress & Communicate',
                    desc: 'Use our dashboard to track your assignment\'s progress and chat directly with your writer to share ideas or ask questions.',
                    highlight: 'Direct writer communication',
                    features: ['Live dashboard', 'Chat with writer', 'Share new ideas', 'Full visibility'],
                  },
                  {
                    step: '4', icon: Trophy, stepBg: 'bg-[#D4A853]',
                    iconBg: 'bg-[#D4A853]/10', iconText: 'text-[#D4A853]',
                    badgeBg: 'bg-[#D4A853]/10', badgeText: 'text-[#D4A853]',
                    checkColor: 'text-[#D4A853]',
                    title: 'Download & Submit',
                    desc: 'Review your completed assignment, request any needed revisions for free, and download your polished, plagiarism-free paper.',
                    highlight: 'Free plagiarism report included',
                    features: ['Download assignment', 'Plagiarism report', 'Free revisions', 'Submit & succeed'],
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-[#1652A0] group">
                    <div className="flex items-start gap-6">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-full ${item.stepBg} flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-110 transition-transform`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconText}`}>
                            <item.icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-[#0B1F42]">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-loose mb-4">{item.desc}</p>
                        <div className={`inline-block ${item.badgeBg} ${item.badgeText} px-4 py-2 rounded-lg text-sm font-semibold mb-4`}>
                          âœ“ {item.highlight}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {item.features.map((f, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className={`w-4 h-4 ${item.checkColor} mr-2`} /> {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center bg-[#0B1F42] rounded-2xl p-10">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Take the first step toward your next great assignment.</p>
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

        {/* â”€â”€ PRICING â”€â”€ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    TRANSPARENT PRICING
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Premium Quality, Transparent Pricing
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    As a trusted assignment writing service, we believe every student deserves <span className="text-[#1652A0] font-medium">affordable academic support</span> without hidden surprises.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: DollarSign, title: 'Transparent Pricing', desc: 'What you see is exactly what you pay â€” no hidden fees.' },
                      { icon: RefreshCw, title: 'Revisions Included', desc: 'Unlimited free modifications to ensure your complete satisfaction.' },
                      { icon: Shield, title: 'Satisfaction Promise', desc: 'Funds held securely and only released when you\'re completely happy.' },
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
                <div>
                  <UnifiedPriceCalculator />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ GUARANTEES â”€â”€ */}
        <section className="py-24 bg-[#0B1F42] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                  OUR COMMITMENTS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Our Unshakable Guarantees to You</h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Commitments we take seriously with every single assignment we deliver.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    icon: Trophy,
                    title: 'Quality Commitment',
                    description: 'We guarantee meticulously researched, perfectly formatted assignments that meet top-tier university standards.',
                  },
                  {
                    icon: Clock,
                    title: 'On-Time Delivery',
                    description: 'We respect your deadlines. If we agree to a timeframe, your paper will arrive on time, every time.',
                  },
                  {
                    icon: RefreshCw,
                    title: 'Free Revisions',
                    description: 'If we miss any of your initial instructions, we will revise your assignment for free until it is perfect.',
                  },
                  {
                    icon: Lock,
                    title: 'Privacy First',
                    description: 'Your personal information and university details are strictly confidential and never shared with anyone.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all group">
                    <div className="w-16 h-16 rounded-xl bg-[#1652A0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-4">{item.title}</h3>
                    <p className="text-gray-300 leading-loose text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-3">We Stand Behind Our Work</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Confidence in quality is at the core of everything we do.</p>
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

        {/* â”€â”€ TESTIMONIALS â”€â”€ */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.06) 100%)', border: '1px solid rgba(212,168,83,0.3)', color: '#D4A853' }}>
                  <Star className="w-4 h-4" /> CLIENT REVIEWS
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">What Our Clients Say</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  See what students from top global universities have to say about our assignment help.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Marcus J.', tag: 'Verified Client', date: 'Apr 22, 2024', subject: 'Assignment Help Math', rating: 5, text: 'The quality of help I received with my math homework was top-tier. I just got an A on my stats assignment thanks to the crystal-clear explanations provided by the expert here.' },
                  { name: 'Clara M.', tag: 'Returning Client', date: 'Aug 30, 2025', subject: 'Assignment Help Management', rating: 5, text: 'The expert has done a really good job and delivered right on time. The work showcases in-depth study and dedication. Very happy with the final submission.' },
                  { name: 'Philip W.', tag: 'First-Time User', date: 'Dec 06, 2023', subject: 'Assignment Help Science', rating: 5, text: 'The assignment involved a complex Physics experiment on wave-particle duality, and the level of expertise shown by the team was exceptional.' },
                  { name: 'Daniel C.', tag: 'Verified Client', date: 'Sep 03, 2025', subject: 'Assignment Help Programming', rating: 4.8, text: 'The code quality was excellent and I received the files right on time. Everything I needed for my final project was covered perfectly.' },
                  { name: 'Katherine B.', tag: 'Returning Client', date: 'Sep 05, 2025', subject: 'Assignment Help Economics', rating: 5, text: 'Professional and fast service. The economic analysis was thorough and the formatting was spot on. Highly recommend for Undergraduate students.' },
                  { name: 'Victor G.', tag: 'First-Time User', date: 'Mar 08, 2024', subject: 'Assignment Help Law', rating: 5, text: 'Needed urgent help with my law coursework and the writer was super helpful. They really know their stuff and got me out of a tight spot with solid legal arguments.' },
                ].map((review, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1652A0]/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#0B1F42]">{review.name}</span>
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981]">{review.tag}</span>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
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
                    <p className="text-gray-600 leading-loose text-[14px]">"{review.text}"</p>
                  </div>
                ))}
              </div>

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

        {/* â”€â”€ FAQ â”€â”€ */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-5 py-2 rounded-full text-sm font-semibold mb-6">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Common Questions Answered</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Clear, honest answers to help you make an informed decision.</p>
            </div>

            <div className="space-y-4">
              <FAQItem
                question="What subjects do you cover?"
                answer="We offer professional assignment help in over 200 academic subjects. From Management, Economics, and Law to Computer Science, Engineering, and Nursing, we have specialized experts for virtually every discipline offered at global universities."
              />
              <FAQItem
                question="How fast can you deliver?"
                answer="We can handle extremely tight deadlines. Depending on the length and complexity of the task, we can deliver high-quality assignments in as little as 3 to 6 hours. For best results, we always recommend giving us more lead time where possible."
              />
              <FAQItem
                question="Is the work original?"
                answer="Absolutely. Every assignment is written 100% from scratch by our experts â€” no templates, no AI, no recycled content. We also provide a free plagiarism report generated by advanced detection software (Turnitin) to guarantee originality with every completed order."
              />
              <FAQItem
                question="Can I communicate with the writer?"
                answer="Yes! We believe in a collaborative approach. You can chat directly with your assigned writer to share ideas, provide updates, and ask questions throughout the entire writing process via our secure dashboard."
              />
              <FAQItem
                question="What if I'm not satisfied?"
                answer="Your satisfaction is guaranteed. If the final draft is missing any initial requirements, we offer unlimited free revisions to make it right. If we fail to meet your core requirements after revisions, we also have a clear refund policy in place. No hassle, no fine print."
              />
              <FAQItem
                question="How does pricing work?"
                answer="Our pricing is completely transparent, starting at just $10 per page. The final price depends on your academic level, page count, and deadline, with absolutely no hidden fees. Plagiarism reports and formatting are included free."
              />
              <FAQItem
                question="Is my information secure?"
                answer="Yes. Your privacy is protected by strict confidentiality agreements and secure, encrypted payment gateways using 256-bit SSL. No one will ever know you used our services unless you choose to tell them. We are fully GDPR compliant and never share data with universities or third parties."
              />
              <FAQItem
                question="Do you handle urgent assignments?"
                answer="Yes, we specialize in urgent academic support. If you have a last-minute assignment that popped out of nowhere, our team is equipped to deliver quality work on tight turnarounds â€” even as short as 3 to 6 hours depending on complexity."
              />
            </div>

            <div className="mt-12 bg-[#1652A0] rounded-2xl p-10 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-gray-200 mb-6">Our support team is available 24/7 to help you.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1652A0] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-md"
                >
                  <Headphones className="w-5 h-5" /> Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ FINAL CTA â”€â”€ */}
        <section className="py-24 bg-[#0B1F42]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Stop Stressing Over Deadlines. <br /> Let the Experts Handle It.
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Take control of your academic success today. Get premium, AI-free assignment assistance tailored to your university's exact standards.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <Link
                  to="/order-now"
                  className="px-10 py-5 bg-[#D4A853] hover:bg-[#C49843] text-[#0B1F42] font-bold text-lg rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-3"
                >
                  Start Your Project Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/samples"
                  className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all border border-white/20 inline-flex items-center gap-3"
                >
                  <FileCheck className="w-5 h-5" /> Browse Subject Samples
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                {[
                  { icon: CheckCircle, text: 'Original Work Guaranteed' },
                  { icon: CheckCircle, text: 'Free Revisions Included' },
                  { icon: CheckCircle, text: '100% Confidential & Secure' },
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
