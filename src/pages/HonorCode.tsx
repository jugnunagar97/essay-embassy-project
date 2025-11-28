import { Link } from 'react-router-dom';
import { 
  Shield, 
  ShieldCheck,
  BookOpen, 
  UserCheck, 
  CheckCircle, 
  XCircle, 
  Copy, 
  UserX,
  AlertTriangle,
  Lock,
  Clock,
  GraduationCap,
  FileText,
  Flag,
  Briefcase,
  Scale
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const HonorCode = () => {
  
  const stakeholders = [
    {
      role: "For Students",
      icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
      text: "Our work is a learning aid, not a replacement. Use our expert papers to understand complex topics, structure your arguments, and cite sources correctly. Never submit our work as your own."
    },
    {
      role: "For Teachers & Schools",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      text: "We view ourselves as partners in education. If you suspect any misuse of our platform that violates academic integrity, we encourage you to report it immediately."
    },
    {
      role: "For Businesses",
      icon: <Briefcase className="w-6 h-6 text-purple-600" />,
      text: "We provide professional corporate writing. However, using our service to falsify reports, financial documents, or mislead stakeholders is strictly prohibited."
    },
    {
      role: "For Our Writers",
      icon: <FileText className="w-6 h-6 text-amber-600" />,
      text: "You are the guardians of our reputation. Facilitating cheating, plagiarism, or fraud results in an immediate, permanent ban. Ethics come before profit."
    }
  ];

  const violations = [
    { title: "Plagiarism", desc: "Presenting someone else's work as your own without credit.", icon: <Copy className="w-5 h-5" /> },
    { title: "Cheating", desc: "Using our service to complete exams or unapproved assignments.", icon: <XCircle className="w-5 h-5" /> },
    { title: "Impersonation", desc: "Identity theft or having someone else take a test for you.", icon: <UserX className="w-5 h-5" /> },
    { title: "Fabrication", desc: "Falsifying data, citations, or official documents.", icon: <AlertTriangle className="w-5 h-5" /> },
  ];

  return (
    <>
      <Helmet>
        <title>Honor Code & Academic Integrity | Essay Embassy</title>
        <meta
          name="description"
          content="Essay Embassy's commitment to academic integrity. Read our Honor Code regarding ethical use of our writing services for students and professionals."
        />
        <link rel="canonical" href="https://essayembassy.com/honor-code" />
      </Helmet>

      <div className="bg-white min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
        
        {/* Hero Section - Authoritative & Clean */}
        <section className="relative pt-24 pb-20 overflow-hidden bg-slate-900 text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 text-slate-800 opacity-20">
            <Shield size={400} strokeWidth={0.5} />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Scale className="w-3 h-3" /> Ethical Standards
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-serif mb-6 leading-tight">
              The Honor Code
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Integrity is the currency of education. At Essay Embassy, we refuse to devalue it. This code outlines our unwavering commitment to ethical academic assistance.
            </p>
          </div>
        </section>

        {/* The Statement */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 p-8 border-b border-slate-100 text-center">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                  What We Stand For
                </h2>
              </div>
              <div className="p-8 md:p-12">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  <span className="font-bold text-slate-900">Academic integrity</span> is the moral code of academia. It demands that knowledge be acquired and shared honestly. 
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We are not a "cheating service." We are an academic consultancy. Our goal is to provide high-quality reference materials that empower students to learn, not to bypass the learning process. We strictly prohibit the use of our materials in any way that violates the policies of your institution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stakeholder Grid (Replaces Tabs) */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Shared Responsibility</h2>
              <p className="text-slate-600">Ethics is a two-way street. Here is what we expect from our community.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {stakeholders.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The "Red Line" - Prohibited Acts */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Zero Tolerance Policy</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    We maintain a strict blacklist of activities. Any user—client or writer—found engaging in these acts will face immediate account termination and forfeiture of funds.
                  </p>
                  
                  <div className="space-y-4">
                    {violations.map((v, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-red-50/50 border border-red-100">
                        <div className="mt-1 p-1 bg-red-100 rounded-full text-red-600">
                          {v.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-red-900">{v.title}</h4>
                          <p className="text-sm text-red-700">{v.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: The "Correct Use" Card */}
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-100 rounded-3xl transform rotate-3"></div>
                  <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                      <UserCheck className="w-6 h-6 text-emerald-600" />
                      <h3 className="text-xl font-bold text-slate-900">Proper Use of Our Service</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "As a source of ideas and reasoning for your own work.",
                        "To understand correct citation and formatting styles.",
                        "As a model for structure, flow, and clarity.",
                        "To gain a deeper understanding of a specific topic."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-2">Our Promise</p>
                      <div className="flex justify-center gap-4 text-slate-500">
                        <span className="flex items-center gap-1 text-xs"><Lock size={12}/> Confidential</span>
                        <span className="flex items-center gap-1 text-xs"><Copy size={12}/> Original</span>
                        <span className="flex items-center gap-1 text-xs"><Clock size={12}/> Timely</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Reporting / Whistleblower */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <Flag className="w-12 h-12 text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">See something wrong?</h2>
              <p className="text-slate-300 mb-8 text-lg">
                We rely on our community to maintain these standards. If you suspect plagiarism, fraud, or unethical behavior on our platform, please report it directly to our compliance team.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-900/20">
                  Report a Violation
                </Link>
                <Link to="/terms-and-conditions" className="px-8 py-3 bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold rounded-lg transition-colors">
                  Read Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HonorCode;