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
  DollarSign,
  Calendar
} from 'lucide-react';
import TestimonialTabs from '../components/Testimonials/TestimonialTabs';
import HeroSection from '../components/Hero/HeroSection';
import { useTestimonials } from '../hooks/useTestimonials';
import { useEffect, useState } from 'react';

export default function Home() {
  const { testimonials } = useTestimonials();

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

  const blogPosts = [
    {
      title: "How to Write an Effective Essay Introduction",
      excerpt: "Learn the key elements of a strong essay introduction that captures attention and sets the tone for your entire paper.",
      image: "https://images.pexels.com/photos/159844/pencil-office-design-creative-159844.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "Jan 20, 2024",
      readTime: "5 min read",
      slug: "effective-essay-introduction"
    },
    {
      title: "Research Methods for Academic Papers",
      excerpt: "Discover proven research methods to strengthen your academic writing and create compelling, well-supported arguments.",
      image: "https://images.pexels.com/photos/159832/books-book-pages-read-literature-159832.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "Jan 18, 2024",
      readTime: "7 min read",
      slug: "research-methods-academic-papers"
    },
    {
      title: "Citation Styles Guide: APA vs MLA vs Chicago",
      excerpt: "A comprehensive guide to the most common citation styles used in academic writing, with examples and best practices.",
      image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "Jan 15, 2024",
      readTime: "6 min read",
      slug: "citation-styles-guide"
    }
  ];

  const [testimonialTab, setTestimonialTab] = useState('Google');
  const testimonialData = [
    { title: 'Discussion post', text: 'I keep coming back to Kaylin because her work is always amazing. She delivers on time and always makes suggestions so that the work is top of the line. Thank you so much Kaylin.', rating: 5, customerId: '679646', date: 'Nov 23, 2024', platform: 'Google' },
    { title: 'Essay (any type)', text: 'Katie always provides 10/10 work. She is fast and reliable.', rating: 5, customerId: '1808319', date: 'Nov 19, 2024', platform: 'Google' },
    { title: 'Case Study', text: 'The writer followed all my instructions and delivered a well-researched case study. Will use again!', rating: 4, customerId: '202311', date: 'Nov 17, 2024', platform: 'Google' },
    { title: 'Assignment', text: 'I was skeptical at first, but Essay Embassy delivered beyond my expectations. The support team was always available and the quality was top-notch. I received my dissertation chapter ahead of schedule.', rating: 5, customerId: '123456', date: 'Nov 15, 2024', platform: 'Trustpilot' },
    { title: 'Lab Report', text: 'Quick turnaround and clear explanations. Lost one star for minor formatting issues, but overall great!', rating: 4, customerId: '998877', date: 'Nov 13, 2024', platform: 'Trustpilot' },
    { title: 'Homework', text: 'I was skeptical at first, but Essay Embassy delivered beyond my expectations. The support team was always available and the quality was top-notch. I received my dissertation chapter ahead of schedule.', rating: 5, customerId: '789012', date: 'Nov 10, 2024', platform: 'Sitejabber' },
    { title: 'Book Review', text: 'Impressed with the depth of analysis and timely delivery. Highly recommend!', rating: 5, customerId: '556677', date: 'Nov 08, 2024', platform: 'Sitejabber' },
    { title: 'Research Paper', text: 'I was skeptical at first, but Essay Embassy delivered beyond my expectations. The support team was always available and the quality was top-notch. I received my dissertation chapter ahead of schedule.', rating: 5, customerId: '345678', date: 'Nov 05, 2024', platform: 'Google' },
    { title: 'Scholarship Essay', text: 'My essay helped me win a scholarship! Thank you for the excellent work.', rating: 5, customerId: '334455', date: 'Nov 03, 2024', platform: 'Trustpilot' },
    { title: 'Term Paper', text: 'Solid research and clear writing. Would have liked a bit more detail in the conclusion.', rating: 4, customerId: '112233', date: 'Nov 01, 2024', platform: 'Sitejabber' },
  ];
  const filteredTestimonials = testimonialData.filter(t => t.platform === testimonialTab);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Signals Bar */}
      {/* Removed old review bar section here */}

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Happy Students */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center group">
              <Users className="w-10 h-10 mb-3 text-primary-500 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-extrabold text-primary-500 mb-2">
                {students.toLocaleString()}+
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">Happy Students</div>
            </div>
            {/* Success Rate */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center group">
              <CheckCircle className="w-10 h-10 mb-3 text-green-500 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-extrabold text-green-500 mb-2">
                {success}%
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">Success Rate</div>
            </div>
            {/* Support */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center group">
              <Headphones className="w-10 h-10 mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-extrabold text-blue-500 mb-2">
                {support}/7
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">Support</div>
            </div>
            {/* Expert Writers */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center group">
              <GraduationCap className="w-10 h-10 mb-3 text-purple-500 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-extrabold text-purple-500 mb-2">
                {writers}+
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">Expert Writers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Essay Embassy */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-primary-500">Essay Embassy</span>?
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We provide comprehensive academic writing services with a focus on quality,
              reliability, and student success.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 text-center shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] flex flex-col items-center relative overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary-100 dark:bg-primary-900/10 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="bg-primary-50 dark:bg-primary-900/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Icon className="text-primary-500" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Dynamic Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="w-full">
          <div className="text-center mb-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Honest feedback about EssayEmbassy</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Check out real reviews from those who've nailed their assignments with our essay writing service. Your next great paper could be just an order away!</p>
          </div>
          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {['Google', 'Trustpilot', 'Sitejabber'].map((platform, idx) => (
              <button
                key={platform}
                onClick={() => setTestimonialTab(platform)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 transition font-semibold text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400
                  ${testimonialTab === platform ? 'bg-white border-primary-400 text-primary-700 shadow-md' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-white hover:border-primary-300'}`}
              >
                {platform === 'Google' && <span className="bg-blue-500 text-white rounded w-6 h-6 flex items-center justify-center font-bold">G</span>}
                {platform === 'Trustpilot' && <span className="bg-green-500 text-white rounded w-6 h-6 flex items-center justify-center font-bold">T</span>}
                {platform === 'Sitejabber' && <span className="bg-orange-500 text-white rounded w-6 h-6 flex items-center justify-center font-bold">S</span>}
                {platform}
              </button>
            ))}
          </div>
          {/* Carousel with infinite auto-scroll, full-bleed */}
          <div className="overflow-x-hidden w-screen relative left-1/2 right-1/2 -mx-[50vw] px-0" style={{ transform: 'translateX(-50%)' }}>
            <div
              className="flex gap-6 animate-testimonial-scroll group hover:[animation-play-state:paused]"
              style={{ animationDuration: '40s' }}
            >
              {[...filteredTestimonials, ...filteredTestimonials].map((review, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-md p-6 min-w-[320px] max-w-[340px] flex-shrink-0 flex flex-col justify-between border border-gray-100">
                  <div>
                    <div className="text-lg font-semibold text-gray-800 mb-2">{review.title}</div>
                    <div className="text-gray-600 mb-4">{review.text}</div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 font-mono">Customer ID: {review.customerId}</div>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Our <span className="text-primary-500">Core Benefits</span>
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the advantages that make us the preferred choice for academic assistance.
            </p>
            <div className="flex justify-center mt-4">
              <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-1 rounded-full text-sm font-semibold shadow-sm animate-pulse">
                <CheckCircle className="text-green-500" size={18} />
                Trusted by 10,000+ students
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:scale-[1.04] flex flex-col items-center relative overflow-hidden animate-fade-in h-full min-h-[320px]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-8 -right-8 w-20 h-20 bg-primary-100 dark:bg-primary-900/10 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="bg-primary-50 dark:bg-primary-900/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Icon className="text-primary-500 group-hover:text-primary-600 transition-colors duration-300" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-primary-500 transition-colors duration-300 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base text-center flex-1 flex items-center justify-center">
                    {benefit.description}
                  </p>
                  {benefit.title === 'Plagiarism-Free Guarantee' && (
                    <span className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-bounce z-10">
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
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-primary-500">Popular</span> Services
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive academic writing solutions for all your educational needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.slice(0, 5).map((service, index) => (
              <div
                key={index}
                className="group bg-white/90 dark:bg-gray-800/90 rounded-2xl p-0 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] flex flex-col overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">{service.title}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{service.description}</p>
                  <ul className="mb-4 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle size={16} className="text-primary-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.link}
                    className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-medium hover:bg-primary-500 hover:text-white transition-all duration-200 group-hover:scale-105"
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-medium hover:shadow-strong">
              View All Services
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              How It <span className="text-primary-500">Works</span>
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get your assignment completed in three simple steps.
            </p>
            <div className="flex justify-center mt-4">
              <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-semibold shadow-sm animate-fade-in">
                🚀 Fast & Secure Process
              </span>
            </div>
          </div>

          <div className="relative grid md:grid-cols-3 gap-10 max-w-5xl mx-auto items-stretch">
            {/* Premium connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 z-0" style={{transform: 'translateY(-50%)'}}>
              <div className="w-full h-full bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 rounded-full opacity-60 blur-[1px]" />
            </div>
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative z-10 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl p-10 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:scale-[1.04] flex flex-col items-center text-center animate-fade-in group h-full min-h-[340px]"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-400 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-transform duration-300 border-4 border-white dark:border-gray-900">
                      <Icon className="text-white group-hover:scale-110 transition-transform duration-300" size={38} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 border-2 border-primary-500 w-10 h-10 rounded-full flex items-center justify-center text-primary-500 font-bold text-lg shadow-soft group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 animate-bounce">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-primary-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base flex-1 flex items-center justify-center">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              <span className="text-primary-500">Transparent</span> Pricing
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your academic level and budget.
            </p>
            <div className="flex justify-center mt-4">
              <span className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-4 py-1 rounded-full text-sm font-semibold shadow-sm animate-fade-in">
                💎 100% Value Guarantee
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto items-stretch">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-3xl p-10 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 flex flex-col items-center animate-fade-in h-full min-h-[420px] ${plan.popular ? 'scale-105 z-10 ring-4 ring-primary-200 dark:ring-primary-900/40 shadow-2xl' : 'scale-100'} ${plan.popular ? 'shadow-2xl' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-400 text-white px-6 py-2 rounded-full text-base font-bold shadow-lg z-20 animate-bounce flex items-center gap-2">
                    <Star className="text-yellow-300" size={20} /> Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-primary-500 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-black text-primary-500 drop-shadow-sm mr-2">{plan.price}</span>
                    <span className="text-lg text-gray-600 dark:text-gray-400">{plan.period}</span>
                  </div>
                </div>
                <ul className="mb-8 space-y-4 w-full">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-lg text-gray-700 dark:text-gray-300 font-medium gap-2">
                      <CheckCircle size={22} className="text-primary-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/order-now?academicLevel=${encodeURIComponent(plan.name)}`}
                  className={`inline-flex items-center justify-center w-full px-8 py-4 rounded-xl font-extrabold text-lg transition-all duration-200 shadow-md group-hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:from-primary-600 hover:to-primary-500 shadow-2xl'
                      : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white bg-white dark:bg-gray-900'
                  }`}
                >
                  Get Started
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest <span className="text-primary-500">Blog Posts</span>
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest tips and insights for academic success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="group bg-white/90 dark:bg-gray-700/90 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-600 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] animate-fade-in flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">Blog</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <Calendar size={14} className="mr-2 text-primary-500" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-primary-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center hover:scale-105 transition-transform duration-200"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/blog" className="inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-medium hover:bg-primary-500 hover:text-white transition-all duration-200 hover:scale-105">
              View All Posts
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600/90 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container text-center relative z-10">
          <div className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-10 md:p-16 border border-primary-200 dark:border-primary-900 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 dark:text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-700 dark:text-primary-100 mb-8">
              Join thousands of successful students who trust Essay Embassy for their academic needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/order-now"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center shadow-lg transform hover:scale-105"
              >
                <GraduationCap className="mr-2" size={20} />
                Place Your Order Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-primary-600 text-primary-700 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-8 text-primary-700 dark:text-primary-100">
              <p className="text-sm flex flex-wrap items-center justify-center gap-4">
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