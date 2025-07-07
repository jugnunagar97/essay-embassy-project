import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  CheckCircle, 
  Star,
  ArrowRight,
  PenTool,
  FileText,
  GraduationCap,
  Shield,
  RefreshCw,
  Headphones,
  Upload,
  Calendar,
  Download,
  TrendingUp,
  DollarSign,
  MessageCircle,
  Zap,
  Target,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import TestimonialTabs from '../components/Testimonials/TestimonialTabs';
import HeroSection from '../components/Hero/HeroSection';
import { useTestimonials } from '../hooks/useTestimonials';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { testimonials } = useTestimonials();

  const slides = [
    {
      title: "Plagiarism-Free Work",
      subtitle: "100% original content with detailed reports",
      description: "Every paper is written from scratch by our expert writers with comprehensive plagiarism checking",
      image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800&h=400",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      title: "Delivered On Time",
      subtitle: "We meet your deadlines, always",
      description: "100% on-time delivery guarantee with express options for urgent assignments",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800&h=400",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      title: "Affordable Rates",
      subtitle: "Student-friendly pricing from $12/page",
      description: "Quality academic help that fits your budget without compromising on excellence",
      image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800&h=400",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "24/7 Expert Support",
      subtitle: "Always here when you need us",
      description: "Round-the-clock customer support and expert guidance throughout your order",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=400",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const trustSignals = [
    { 
      name: "Google Reviews", 
      rating: "4.8/5", 
      reviews: "2,500+", 
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">G</span>
          </div>
          <div>
            <div className="flex text-yellow-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">4.8/5 (2,500+ reviews)</div>
          </div>
        </div>
      )
    },
    { 
      name: "Trustpilot", 
      rating: "4.9/5", 
      reviews: "1,800+", 
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center mr-3">
            <Star size={16} fill="white" className="text-white" />
          </div>
          <div>
            <div className="flex text-green-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">4.9/5 (1,800+ reviews)</div>
          </div>
        </div>
      )
    },
    { 
      name: "Sitejabber", 
      rating: "4.7/5", 
      reviews: "3,200+", 
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <div>
            <div className="flex text-orange-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">4.7/5 (3,200+ reviews)</div>
          </div>
        </div>
      )
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Signals Bar */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6 shadow-soft">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center md:text-left animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Trusted by Students Worldwide
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join thousands of satisfied customers
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {trustSignals.map((signal, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 px-6 py-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-600 hover:shadow-medium transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  {signal.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-100 dark:border-gray-700 hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up">
              <div className="text-4xl font-bold text-primary-500 mb-2">5000+</div>
              <div className="text-gray-600 dark:text-gray-400">Happy Students</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-100 dark:border-gray-700 hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold text-primary-500 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-100 dark:border-gray-700 hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-primary-500 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Support</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-100 dark:border-gray-700 hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold text-primary-500 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Expert Writers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Essay Embassy */}
      <section className="py-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-medium transition-all duration-300 border border-gray-100 dark:border-gray-600 animate-slide-up hover:scale-105 shadow-soft" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-primary-100 dark:bg-primary-900/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto hover:scale-110 transition-transform duration-300">
                    <Icon className="text-primary-500" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-primary-500">Core Benefits</span>
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the advantages that make us the preferred choice for academic assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 text-center border border-gray-100 dark:border-gray-700 animate-slide-up hover:scale-105 border-l-4 border-l-primary-500" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-primary-100 dark:bg-primary-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto hover:scale-110 transition-transform duration-300">
                    <Icon className="text-primary-500" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-primary-500">Popular</span> Services
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive academic writing solutions for all your educational needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 5).map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:transform hover:-translate-y-1 animate-slide-up hover:scale-105" style={{animationDelay: `${index * 0.1}s`}}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-lg mb-6 hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={16} className="text-primary-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.link}
                  className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-medium hover:bg-primary-500 hover:text-white transition-all duration-200 group hover:scale-105"
                >
                  Learn More
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
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
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It <span className="text-primary-500">Works</span>
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get your assignment completed in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center animate-slide-up bg-white dark:bg-gray-800 rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-105" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="relative mb-8">
                    <div className="bg-primary-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-medium hover:scale-110 transition-transform duration-300">
                      <Icon className="text-white" size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 border-2 border-primary-500 w-8 h-8 rounded-full flex items-center justify-center text-primary-500 font-bold text-sm shadow-soft">
                      {step.step}
                    </div>
                    {index < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 dark:bg-gray-600 -translate-y-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-primary-500">Transparent</span> Pricing
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your academic level and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 dark:border-gray-600 relative animate-slide-up hover:scale-105 ${plan.popular ? 'ring-2 ring-primary-500' : ''}`} style={{animationDelay: `${index * 0.1}s`}}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-primary-500">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle size={16} className="text-primary-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/order"
                  className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                    plan.popular 
                      ? 'bg-primary-500 hover:bg-primary-600 text-white transform shadow-medium hover:shadow-strong' 
                      : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our <span className="text-primary-500">Students Say</span>
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real feedback from students who achieved academic success with our help.
            </p>
          </div>

          <TestimonialTabs testimonials={testimonials} />
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest <span className="text-primary-500">Blog Posts</span>
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest tips and insights for academic success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:transform hover:-translate-y-1 animate-slide-up hover:scale-105" style={{animationDelay: `${index * 0.1}s`}}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <Calendar size={14} className="mr-2 text-primary-500" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-primary-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
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
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of successful students who trust Essay Embassy for their academic needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order"
                className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center shadow-medium transform hover:scale-105"
              >
                <GraduationCap className="mr-2" size={20} />
                Place Your Order Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-500 transition-colors hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-8 text-primary-100">
              <p className="text-sm">
                🔒 Secure Payment • 📞 24/7 Support • ✅ Money-Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}