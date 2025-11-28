import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  BookOpen, 
  Star, 
  Briefcase, 
  ShieldCheck, 
  Globe, 
  MapPin, 
  Mail,
  Zap,
  Target,
  Heart
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// --- Data ---
const team = [
  {
    name: 'Brandon Walls',
    role: 'CEO & Founder',
    bio: 'Leading with a vision for academic integrity and student success since 2013.',
    photo: '/images/Brandon Walls CEO.jpg',
  },
  {
    name: 'Christina',
    role: 'Head of Quality Control',
    bio: 'Ensuring every document meets our rigorous ISO-9001 quality standards.',
    photo: '/images/Christina.jpg',
  },
  {
    name: 'Daniel',
    role: 'STEM Department Lead',
    bio: 'Specializing in complex data analysis and technical dissertation guidance.',
    photo: '/images/Daniel.png',
  },
  {
    name: 'Benjamin',
    role: 'Senior Writer',
    bio: 'A decade of experience in crafting persuasive Ivy League admission essays.',
    photo: '/images/Benjamin.jpg',
  },
  {
    name: 'Dylan',
    role: 'Lead Researcher',
    bio: 'Expert in sourcing credible data from top-tier academic journals.',
    photo: '/images/Dylan.jpg',
  },
  {
    name: 'Kelsey',
    role: 'Client Success Manager',
    bio: 'Dedicated to ensuring your experience is smooth, confidential, and stress-free.',
    photo: '/images/Kelsey.jpg',
  },
];

const stats = [
  { label: 'Years of Excellence', value: '10+', sub: 'Established 2013' },
  { label: 'Satisfied Students', value: '5k+', sub: 'Across 15 Countries' },
  { label: 'Papers Delivered', value: '20k+', sub: '99% Approval Rate' },
  { label: 'Experts Online', value: '500+', sub: 'PhD & Masters' },
];

const values = [
  { icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, title: 'Absolute Integrity', desc: 'We operate with strict confidentiality and zero tolerance for plagiarism.' },
  { icon: <Target className="w-6 h-6 text-blue-600" />, title: 'Precision', desc: 'Every paper is crafted to meet the exact rubric requirements of your institution.' },
  { icon: <Heart className="w-6 h-6 text-rose-600" />, title: 'Empathy', desc: 'We understand the pressure of academic life and treat every deadline as sacred.' },
  { icon: <Zap className="w-6 h-6 text-amber-600" />, title: 'Speed', desc: 'Capable of delivering high-quality analysis in as little as 3 hours.' },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Essay Embassy | Trusted Academic Writing Service</title>
        <meta
          name="description"
          content="Meet the team behind Essay Embassy. We are a collective of PhD scholars and academic experts dedicated to your success. verified and trusted since 2013."
        />
        <link rel="canonical" href="https://essayembassy.com/about" />
      </Helmet>

      <div className="bg-white min-h-screen font-sans selection:bg-primary-100 selection:text-primary-900">
        
        {/* Hero Section - Clean & Corporate */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 font-bold tracking-wide uppercase text-xs mb-6 border border-slate-200">
              EST. 2013 • Brookline, MA
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              More Than Just a <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-500">Writing Service.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              We are an academic consultancy firm dedicated to bridging the gap between your potential and your grades. Real experts, real results.
            </p>
            
            {/* Stats Row - Premium Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-bold text-slate-700 uppercase tracking-wide">{stat.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The "Why Us" Section - Bento Grid Style */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full blur-2xl opacity-60"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="/images/team office.webp" 
                    alt="Essay Embassy Office" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/80 to-transparent p-8">
                    <p className="text-white font-medium text-lg">"Quality is not an act, it is a habit."</p>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our DNA</h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    Essay Embassy wasn't founded by marketers, it was founded by academics. We noticed a gap in the industry for a service that prioritized <strong>educational value</strong> over mass production. Today, we stand as the gold standard for personalized academic assistance.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {values.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-primary-100 transition-colors">
                      <div className="bg-slate-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team - Premium Cards */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Leadership & Experts</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Transparency matters. Meet the real people working behind the scenes to ensure your order is perfect.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="group relative bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className={`h-24 w-full ${member.role.includes('CEO') ? 'bg-gradient-to-r from-amber-50 to-orange-50' : 'bg-slate-50'}`}></div>
                  <div className="px-6 relative -mt-12 text-center">
                    <div className="relative inline-block">
                        <img 
                        src={member.photo} 
                        alt={member.name} 
                        className={`w-24 h-24 rounded-full border-4 border-white shadow-md object-cover ${member.role.includes('CEO') ? 'ring-2 ring-amber-400 ring-offset-2' : ''}`}
                        />
                        {member.role.includes('CEO') && (
                            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-1.5 rounded-full border-2 border-white" title="Founder">
                                <Star className="w-3 h-3 fill-current" />
                            </div>
                        )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mt-4">{member.name}</h3>
                    <p className={`text-sm font-semibold mb-3 ${member.role.includes('CEO') ? 'text-amber-600' : 'text-primary-600'}`}>{member.role}</p>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                        {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Trust Badges */}
        <section className="py-12 border-t border-slate-100">
            <div className="container mx-auto px-6">
                <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by students from</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Logos would ideally be SVGs here. Using text placeholders styled like logos for now */}
                    <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><Globe className="w-6 h-6" /> University of Oxford</div>
                    <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><BookOpen className="w-6 h-6" /> Harvard University</div>
                    <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><Award className="w-6 h-6" /> University of Toronto</div>
                    <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800"><Briefcase className="w-6 h-6" /> University of Melbourne</div>
                </div>
            </div>
        </section>

        {/* Office Location - Integrated Design */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
             
             <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Visit Our Headquarters</h2>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            While we operate globally, our roots are in Massachusetts. We believe in being a real, reachable company.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-slate-800 p-3 rounded-lg">
                                    <MapPin className="w-6 h-6 text-primary-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Office Address</h4>
                                    <p className="text-slate-400 text-sm">1309 Beacon Street, Suite 300<br/>Brookline, Massachusetts 02446</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-slate-800 p-3 rounded-lg">
                                    <Mail className="w-6 h-6 text-primary-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Direct Contact</h4>
                                    <a href="mailto:essayembassy@gmail.com" className="text-slate-400 text-sm hover:text-primary-400 transition-colors">essayembassy@gmail.com</a>
                                    <p className="text-xs text-slate-500 mt-1">Response time: &lt; 2 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Map Card */}
                    <div className="bg-slate-800 p-2 rounded-2xl shadow-2xl border border-slate-700">
                        <iframe
                            title="Essay Embassy Office Location"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-71.1350%2C42.3300%2C-71.1000%2C42.3500&amp;layer=mapnik&amp;marker=42.3418,-71.1213"
                            className="w-full h-80 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
             </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to work with the best?</h2>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                    Experience the difference of working with a verified academic consultancy.
                </p>
                <Link to="/order-now" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-primary-200 transition-all transform hover:scale-105">
                    Start Your Order Now
                </Link>
            </div>
        </section>

      </div>
    </>
  );
};

export default About;