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
import { useState } from 'react';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';

function ConcernsSolutionsBlock() {
  const [activeTab, setActiveTab] = useState('concerns');
  return (
    <section className="concerns-solutions-block">
      <div className="dots dots-left"></div>
      <div className="dots dots-right"></div>
      <div className="stats-container">
        <div className="stat-item">
          <h2>5,000+</h2>
          <p>Students Helped</p>
        </div>
        <div className="stat-item">
          <h2>PhD & Master’s</h2>
          <p>Level Writers Onboard</p>
        </div>
        <div className="stat-item">
          <h2>98%</h2>
          <p>Client Satisfaction</p>
        </div>
      </div>
      <div className="tabs-wrapper">
        <nav className="tab-nav">
          <button
            className={`tab-button${activeTab === 'concerns' ? ' active' : ''}`}
            data-tab="concerns"
            type="button"
            onClick={() => setActiveTab('concerns')}
          >Your Concerns</button>
          <button
            className={`tab-button${activeTab === 'solutions' ? ' active' : ''}`}
            data-tab="solutions"
            type="button"
            onClick={() => setActiveTab('solutions')}
          >How We Help</button>
        </nav>
        <div className="content-panel">
          <div className={`tab-content${activeTab === 'concerns' ? ' active' : ''}`} id="concerns">
            <ul>
              <li><FontAwesomeIcon icon={faTriangleExclamation} className="fa-triangle-exclamation" /><p>"I'm staring at a blank page. How do I even start my college essay?"</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation} className="fa-triangle-exclamation" /><p>"My essay sounds generic. How can I make my application stand out?"</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation} className="fa-triangle-exclamation" /><p>"I'm worried my grammar and structure aren't strong enough for top universities."</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation} className="fa-triangle-exclamation" /><p>"My student is a great kid, but they struggle to write about themselves."</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation} className="fa-triangle-exclamation" /><p>"I have no time to help with essays between work, school, and deadlines."</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation} className="fa-triangle-exclamation" /><p>"I'm overwhelmed by conflicting advice online about what admissions officers want."</p></li>
            </ul>
          </div>
          <div className={`tab-content${activeTab === 'solutions' ? ' active' : ''}`} id="solutions">
            <ul>
              <li><FontAwesomeIcon icon={faCheck} className="fa-check" /><p><strong>Strategic Brainstorming:</strong> We help you discover a unique personal story that captures your strengths.</p></li>
              <li><FontAwesomeIcon icon={faCheck} className="fa-check" /><p><strong>Compelling Narrative Structure:</strong> Our experts guide you in outlining and writing an essay that flows perfectly.</p></li>
              <li><FontAwesomeIcon icon={faCheck} className="fa-check" /><p><strong>Expert Editing & Polishing:</strong> Meticulous proofreading for grammar, style, and clarity to ensure your essay is flawless.</p></li>
              <li><FontAwesomeIcon icon={faCheck} className="fa-check" /><p><strong>A Thematic Approach:</strong> We develop a unique brand to help your application stand out from thousands of others.</p></li>
              <li><FontAwesomeIcon icon={faCheck} className="fa-check" /><p><strong>1-on-1 Personalized Guidance:</strong> A dedicated mentor provides a structured roadmap to keep you on track and confident.</p></li>
              <li><FontAwesomeIcon icon={faCheck} className="fa-check" /><p><strong>Empowering Your Authentic Voice:</strong> We empower you to write your best, most authentic essay.</p></li>
            </ul>
          </div>
        </div>
      </div>
      <style>{`
.concerns-solutions-block {
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 2rem;
    background: linear-gradient(180deg, #f0f4f9 0%, #ffffff 100%);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
}
.stats-container {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-bottom: 4rem;
}
.stat-item h2 {
    font-size: 3rem;
    font-weight: 700;
    color: #0a2540;
    margin: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e0e6eb;
    display: inline-block;
}
.stat-item p {
    margin: 0.5rem 0 0;
    font-size: 1rem;
    color: #52667d;
    font-weight: 500;
}
.tabs-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tab-nav {
    display: flex;
    justify-content: center;
    z-index: 1;
}
.tab-button {
    padding: 0.75rem 1.75rem;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #6b7280;
    transition: all 0.3s ease;
}
.tab-button.active {
    background-color: #ffffff;
    color: #111827;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 -4px 10px -2px rgba(0, 0, 0, 0.05);
}
.content-panel {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    padding: 2.5rem;
    width: 100%;
    max-width: 900px;
    margin-top: -1px;
    z-index: 2;
    transition: all 0.3s ease;
}
.tab-content {
    display: none;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
}
.tab-content.active {
    display: block;
    opacity: 1;
}
.tab-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 2.5rem;
}
.tab-content li {
    display: flex;
    align-items: flex-start;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #374151;
}
.tab-content li i, .tab-content li .fa-triangle-exclamation, .tab-content li .fa-check {
    font-size: 1rem;
    margin-top: 5px;
    margin-right: 12px;
}
.fa-triangle-exclamation { color: #f59e0b; }
.fa-check { color: #10b981; }
.tab-content li p { margin: 0; }
.tab-content li p strong { color: #111827; }
.dots {
    position: absolute;
    z-index: 0;
}
.dots-left {
    width: 150px;
    height: 150px;
    top: 60px;
    left: 20px;
    background-image: radial-gradient(#e0e6eb 2px, transparent 2px);
    background-size: 20px 20px;
    opacity: 0.5;
}
.dots-right {
    width: 100px;
    height: 100px;
    bottom: 60px;
    right: 30px;
    background-image: radial-gradient(#0a2540 5px, transparent 5px);
    background-size: 30px 30px;
    opacity: 0.8;
}
@media (max-width: 820px) {
    .stats-container {
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 3rem;
    }
    .tab-content ul {
        grid-template-columns: 1fr;
    }
    .concerns-solutions-block {
        padding: 3rem 1rem;
    }
    .dots {
        display: none;
    }
}
      `}</style>
    </section>
  );
}

export default function Home() {
  // Remove unused animated stats state and useEffect
  /*
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
  */

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