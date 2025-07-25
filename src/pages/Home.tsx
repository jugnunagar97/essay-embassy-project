import { Link } from 'react-router-dom';
import {
  Users,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  FileText,
  GraduationCap,
  Shield,
  RefreshCw,
  Headphones,
  Download,
  DollarSign
} from 'lucide-react';
import HeroSection from '../components/Hero/HeroSection';
import { useEffect, useState } from 'react';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';

function ConcernsSolutionsBlock() {
  const concerns = [
    "I'm staring at a blank page. How do I even start my college essay?",
    "My essay sounds generic. How can I make my application stand out?",
    "I'm worried my grammar and structure aren't strong enough for top universities.",
    "My student is a great kid, but they struggle to write about themselves.",
    "I have no time to help with essays between work, school, and deadlines.",
    "I'm overwhelmed by conflicting advice online about what admissions officers want."
  ];
  const solutions = [
    "Strategic Brainstorming: We help you discover a unique personal story that captures your strengths and personality.",
    "Compelling Narrative Structure: Our experts guide you in outlining and writing an essay that flows perfectly and holds the reader's attention.",
    "Expert Editing & Polishing: Meticulous proofreading for grammar, style, and clarity to ensure your essay is flawless.",
    "A Thematic Approach: We develop a unique brand and story to help your application stand out from thousands of others.",
    "1-on-1 Personalized Guidance: A dedicated mentor provides a structured roadmap to keep you on track and confident.",
    "Empowering Your Authentic Voice: We don't write for you; we empower you to write your best, most authentic essay."
  ];
  const [tab, setTab] = useState('concerns');
  const [fade, setFade] = useState(false);
  const handleTab = (newTab: string) => {
    if (tab === newTab) return;
    setFade(true);
    setTimeout(() => {
      setTab(newTab);
      setFade(false);
    }, 300);
  };
  return (
    <section className="ee-concerns-solutions-block">
      {/* Decorative Dots Left */}
      <div className="ee-dots-left"></div>
      {/* Decorative Dots Right */}
      <div className="ee-dots-right">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      {/* Statistics Section */}
      <div className="ee-stats">
        <div className="ee-stat-item">
          <h2>5,000+</h2>
          <hr />
          <p>Students Helped</p>
        </div>
        <div className="ee-stat-item">
          <h2>Up to 12x</h2>
          <hr />
          <p>Improved Admission Odds</p>
        </div>
        <div className="ee-stat-item">
          <h2>98%</h2>
          <hr />
          <p>Client Satisfaction</p>
        </div>
      </div>
      {/* Tab Navigation */}
      <nav className="ee-tabs">
        <button
          className={`ee-tab-btn${tab === 'concerns' ? ' active' : ''}`}
          type="button"
          onClick={() => handleTab('concerns')}
        >Your Concerns</button>
        <button
          className={`ee-tab-btn${tab === 'solutions' ? ' active' : ''}`}
          type="button"
          onClick={() => handleTab('solutions')}
        >How We Help</button>
      </nav>
      {/* Content Panel */}
      <div className="ee-content-panel">
        <ul className={`ee-content-list${fade ? ' ee-fade' : ''}`}>
          {(tab === 'concerns' ? concerns : solutions).map((item, idx) => (
            <li key={idx}>
              {tab === 'concerns' ? (
                <svg className="ee-icon ee-icon-warning" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 3L2 21h20L12 3z"/><circle cx="12" cy="17" r="1.2" fill="currentColor"/><path d="M12 9v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
              ) : (
                <svg className="ee-icon ee-icon-check" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
.ee-concerns-solutions-block {
  position: relative;
  background: linear-gradient(to bottom, #f0f4f9, #ffffff);
  padding: 64px 0 72px 0;
  overflow: hidden;
  z-index: 0;
}
@media (max-width: 600px) {
  .ee-concerns-solutions-block {
    padding: 36px 0 40px 0;
  }
}
.ee-dots-left {
  position: absolute;
  top: 32px;
  left: 0;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #e5eaf1 2px, transparent 2.5px) 0 0/18px 18px repeat;
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
}
@media (max-width: 600px) {
  .ee-dots-left { width: 70px; height: 70px; }
}
.ee-dots-right {
  position: absolute;
  bottom: 32px;
  right: 32px;
  z-index: 1;
  display: flex;
  gap: 8px;
  pointer-events: none;
}
.ee-dots-right span {
  display: inline-block;
  background: #0a2540;
  border-radius: 50%;
  opacity: 0.18;
}
.ee-dots-right span:nth-child(1) { width: 18px; height: 18px; }
.ee-dots-right span:nth-child(2) { width: 10px; height: 10px; }
.ee-dots-right span:nth-child(3) { width: 7px; height: 7px; }
.ee-dots-right span:nth-child(4) { width: 13px; height: 13px; }
.ee-dots-right span:nth-child(5) { width: 5px; height: 5px; }
@media (max-width: 600px) {
  .ee-dots-right { right: 10px; bottom: 10px; }
}
.ee-stats {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 48px;
  margin-bottom: 56px;
  z-index: 2;
  position: relative;
}
.ee-stat-item {
  background: transparent;
  text-align: center;
  min-width: 120px;
  flex: 1 1 0;
  max-width: 220px;
}
.ee-stat-item h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0a2540;
  margin: 0;
  letter-spacing: -1px;
}
.ee-stat-item hr {
  border: none;
  border-bottom: 2px solid #e5eaf1;
  width: 36px;
  margin: 12px auto 12px auto;
}
.ee-stat-item p {
  font-size: 1rem;
  color: #3b4a5a;
  margin: 0;
  font-weight: 500;
}
@media (max-width: 900px) {
  .ee-stats { gap: 24px; }
}
@media (max-width: 700px) {
  .ee-stats { flex-direction: column; gap: 18px; margin-bottom: 32px; }
  .ee-stat-item { max-width: 100%; }
}
.ee-tabs {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0;
  position: relative;
  z-index: 2;
  margin-bottom: -28px;
}
.ee-tab-btn {
  position: relative;
  background: transparent;
  color: #6b7280;
  font-weight: 500;
  font-size: 1.13rem;
  border: none;
  outline: none;
  padding: 18px 44px 18px 44px;
  margin: 0 2px;
  border-radius: 12px 12px 0 0;
  cursor: pointer;
  transition: color 0.18s, background 0.18s;
  z-index: 1;
}
.ee-tab-btn:hover:not(.active) {
  color: #374151;
  background: #f3f4f6;
}
.ee-tab-btn.active {
  background: #fff;
  color: #111827;
  font-weight: 700;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10);
  z-index: 3;
}
.ee-content-panel {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10);
  padding: 2.5rem 2.5rem 2.2rem 2.5rem;
  margin: 0 auto;
  max-width: 720px;
  min-height: 320px;
  z-index: 4;
  position: relative;
  margin-top: -32px;
  transition: box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 900px) {
  .ee-content-panel { padding: 1.5rem 1rem 1.2rem 1rem; min-height: 220px; }
}
@media (max-width: 600px) {
  .ee-content-panel { padding: 1.1rem 0.5rem 1.1rem 0.5rem; min-height: 0; }
}
.ee-content-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px 32px;
  width: 100%;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
.ee-content-list.ee-fade {
  opacity: 0;
}
@media (max-width: 700px) {
  .ee-content-list { grid-template-columns: 1fr; gap: 16px 0; }
}
.ee-content-list li {
  display: flex;
  align-items: flex-start;
  font-size: 1.08rem;
  color: #1f2937;
  line-height: 1.6;
  font-weight: 500;
  background: none;
  border: none;
  padding: 0;
}
.ee-content-list .ee-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;
  margin-top: 2px;
}
.ee-content-list .ee-icon-warning {
  color: #f59e0b;
}
.ee-content-list .ee-icon-check {
  color: #10b981;
}
.ee-content-list p {
  margin: 0;
  color: #1f2937;
  font-size: 1.08rem;
  font-weight: 500;
  line-height: 1.6;
}
      `}</style>
    </section>
  );
}

export default function Home() {
  // Animated stats state
  const [students, setStudents] = useState(0);
  const [success, setSuccess] = useState(0);
  const [support, setSupport] = useState(0);
  const [writers, setWriters] = useState(0);

  useEffect(() => {
    // Animate numbers up
    let s = 0, su = 0, sp = 0, w = 0;
    const sTarget = 5000, suTarget = 98, spTarget = 24, wTarget = 500;
    const interval = setInterval(() => {
      if (s < sTarget) s += Math.ceil(sTarget / 60);
      if (su < suTarget) su += 2;
      if (sp < spTarget) sp += 2;
      if (w < wTarget) w += 10;
      setStudents(Math.min(s, sTarget));
      setSuccess(Math.min(su, suTarget));
      setSupport(Math.min(sp, spTarget));
      setWriters(Math.min(w, wTarget));
      if (s >= sTarget && su >= suTarget && sp >= spTarget && w >= wTarget) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const whyChooseUs = [
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service for all your needs"
    },
    {
      icon: GraduationCap,
      title: "PhD Experts",
      description: "Writers with advanced degrees in various academic fields"
    },
    {
      icon: Shield,
      title: "Originality Guarantee",
      description: "100% plagiarism-free content with detailed reports"
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Never miss a deadline with our punctual service"
    },
    {
      icon: DollarSign,
      title: "Affordable Rates",
      description: "Student-friendly pricing without compromising quality"
    },
    {
      icon: RefreshCw,
      title: "Free Revisions",
      description: "Unlimited revisions until you're completely satisfied"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Confidentiality",
      description: "Your personal information and orders are completely secure"
    },
    {
      icon: RefreshCw,
      title: "Free Revisions",
      description: "Unlimited revisions within 14 days of delivery"
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Personal support manager for every order"
    },
    {
      icon: CheckCircle,
      title: "Plagiarism-Free Guarantee",
      description: "Original content with detailed plagiarism reports"
    }
  ];

  const services = [
    {
      title: "Essay Writing",
      description: "Custom essays for all academic levels and subjects",
      features: ["Any citation style", "Original content", "Expert writers"],
      image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/services/essay-writing"
    },
    {
      title: "Assignment Help",
      description: "Comprehensive assistance with various assignments",
      features: ["All subjects", "Step-by-step solutions", "Detailed explanations"],
      image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/services/assignment-help"
    },
    {
      title: "Homework Help",
      description: "Quick and reliable homework assistance",
      features: ["Fast turnaround", "Affordable pricing", "Quality guaranteed"],
      image: "https://images.pexels.com/photos/159832/books-book-pages-read-literature-159832.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/services/homework-help"
    },
    {
      title: "Dissertation Writing",
      description: "Professional dissertation and thesis writing",
      features: ["PhD writers", "Research included", "Chapter-wise delivery"],
      image: "https://images.pexels.com/photos/159844/pencil-office-design-creative-159844.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/services/dissertation-writing"
    },
    {
      title: "Research Paper Writing",
      description: "In-depth research papers with proper citations",
      features: ["Extensive research", "Proper formatting", "Quality sources"],
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/services/research-paper-writing"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Fill the Form",
      description: "Provide your assignment details and requirements",
      icon: FileText
    },
    {
      step: 2,
      title: "Writer Assigned",
      description: "We match you with the best expert for your subject",
      icon: Users
    },
    {
      step: 3,
      title: "Download Your Work",
      description: "Receive your completed assignment on time",
      icon: Download
    }
  ];

  const pricingPlans = [
    {
      name: "High School",
      price: "$12",
      period: "per page",
      features: ["Basic research", "Standard formatting", "Free revisions", "24/7 support"],
      popular: false
    },
    {
      name: "College",
      price: "$15",
      period: "per page",
      features: ["Advanced research", "Any citation style", "Free revisions", "Priority support"],
      popular: true
    },
    {
      name: "University",
      price: "$18",
      period: "per page",
      features: ["Expert writers", "Complex topics", "Free revisions", "Dedicated manager"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FF] via-[#E3E8F0] to-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection />
      <ConcernsSolutionsBlock />

      {/* Why Choose Essay Embassy */}
      <section className="py-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-slate-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Why Choose <span className="text-primary-500">Essay Embassy</span>?
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2"></div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              We provide comprehensive academic writing services with a focus on quality,
              reliability, and student success.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/90 dark:bg-gray-800/90 rounded-xl p-5 text-center shadow border border-slate-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:scale-[1.02] flex flex-col items-center relative overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary-100 dark:bg-primary-900/10 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="bg-primary-50 dark:bg-primary-900/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform duration-300 shadow">
                    <Icon className="text-primary-500" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Core Benefits */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-slate-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              Our <span className="text-primary-500">Core Benefits</span>
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2 rounded-full"></div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              Experience the advantages that make us the preferred choice for academic assistance.
            </p>
            <div className="flex justify-center mt-2">
              <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-0.5 rounded-full text-xs font-medium shadow-sm animate-pulse">
                <CheckCircle className="text-green-500" size={16} />
                Trusted by 10,000+ students
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl shadow border border-slate-100 dark:border-gray-700 hover:shadow-md hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:scale-[1.02] flex flex-col items-center relative overflow-hidden animate-fade-in h-full min-h-[220px]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-5 -right-5 w-12 h-12 bg-primary-100 dark:bg-primary-900/10 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="bg-primary-50 dark:bg-primary-900/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-105 transition-transform duration-300 shadow">
                    <Icon className="text-primary-500 group-hover:text-primary-600 transition-colors duration-300" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-primary-500 transition-colors duration-300 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-normal text-center flex-1 flex items-center justify-center">
                    {benefit.description}
                  </p>
                  {benefit.title === 'Plagiarism-Free Guarantee' && (
                    <span className="absolute top-2 right-2 bg-primary-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow animate-bounce z-10">
                      Verified
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-slate-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              <span className="text-primary-500">Popular</span> Services
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2"></div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              Comprehensive academic writing solutions for all your educational needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.slice(0, 5).map((service, index) => (
              <div
                key={index}
                className="group bg-white/90 dark:bg-gray-800/90 rounded-xl p-0 shadow border border-slate-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">{service.title}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 flex-1 text-sm font-normal">{service.description}</p>
                  <ul className="mb-3 space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <CheckCircle size={14} className="text-primary-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.link}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-primary-500 text-primary-500 rounded-md font-medium hover:bg-primary-500 hover:text-white transition-all duration-200 group-hover:scale-105 text-sm"
                  >
                    Learn More
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/services" className="inline-flex items-center px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium text-base transition-all duration-200 transform hover:scale-105 shadow">
              View All Services
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team of Essay Writers */}
      {/* Removed EssayWritersSection component */}

      {/* Insert Testimonials Section here */}
      <TestimonialsSection />

      {/* How It Works */}
      <section className="py-14 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
              How It <span className="text-primary-500">Works</span>
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2 rounded-full"></div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              Get your assignment completed in three simple steps.
            </p>
            <div className="flex justify-center mt-2">
              <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-0.5 rounded-full text-xs font-medium shadow-sm animate-fade-in">
                🚀 Fast & Secure Process
              </span>
            </div>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Premium connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 z-0" style={{transform: 'translateY(-50%)'}}>
              <div className="w-full h-full bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 rounded-full opacity-40 blur-[1px]" />
            </div>
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative z-10 backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 shadow border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:scale-[1.03] flex flex-col items-center text-center animate-fade-in group h-full min-h-[220px]"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative mb-5">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-1 shadow group-hover:scale-105 group-hover:shadow-lg transition-transform duration-300 border-2 border-white dark:border-gray-900">
                      <Icon className="text-white group-hover:scale-105 transition-transform duration-300" size={22} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 border border-primary-500 w-7 h-7 rounded-full flex items-center justify-center text-primary-500 font-bold text-base shadow-soft group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 animate-bounce">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1 tracking-tight group-hover:text-primary-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs flex-1 flex items-center justify-center">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-14 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
              <span className="text-primary-500">Transparent</span> Pricing
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2 rounded-full"></div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              Choose the plan that fits your academic level and budget.
            </p>
            <div className="flex justify-center mt-2">
              <span className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-0.5 rounded-full text-xs font-medium shadow-sm animate-fade-in">
                💎 100% Value Guarantee
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 shadow border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 flex flex-col items-center animate-fade-in h-full min-h-[220px] ${plan.popular ? 'scale-105 z-10 ring-2 ring-primary-200 dark:ring-primary-900/30 shadow-lg' : 'scale-100'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow z-20 animate-bounce flex items-center gap-2">
                    <Star className="text-yellow-300" size={14} /> Most Popular
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 tracking-tight group-hover:text-primary-500 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-1">
                    <span className="text-3xl font-bold text-primary-500 drop-shadow-sm mr-1">{plan.price}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{plan.period}</span>
                  </div>
                </div>
                <ul className="mb-4 space-y-2 w-full">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-700 dark:text-gray-300 font-normal gap-2">
                      <CheckCircle size={14} className="text-primary-500 mr-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/order-now?academicLevel=${encodeURIComponent(plan.name)}`}
                  className={`inline-flex items-center justify-center w-full px-4 py-2 rounded-md font-medium text-xs transition-all duration-200 shadow-sm group-hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:from-primary-600 hover:to-primary-500 shadow'
                      : 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white bg-white dark:bg-gray-900'
                  }`}
                >
                  Get Started
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-10 bg-gradient-to-br from-primary-600/90 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 md:p-10 border border-primary-200 dark:border-primary-900 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 dark:text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-base text-primary-700 dark:text-primary-100 mb-5">
              Join thousands of successful students who trust Essay Embassy for their academic needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Link
                to="/order-now"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium text-base transition-colors inline-flex items-center justify-center shadow group-hover:scale-105"
              >
                <GraduationCap className="mr-2" size={16} />
                Place Your Order Now
              </Link>
              <Link
                to="/contact"
                className="border border-primary-600 text-primary-700 dark:text-white px-6 py-3 rounded-md font-medium text-base hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group-hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-4 text-primary-700 dark:text-primary-100">
              <p className="text-xs flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center"><span className="mr-1">🔒</span> Secure Payment</span>
                <span className="inline-flex items-center"><span className="mr-1">📞</span> 24/7 Support</span>
                <span className="inline-flex items-center"><span className="mr-1">✅</span> Money-Back Guarantee</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}