import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen, Star, Briefcase, ShieldCheck, Globe, CheckCircle, MapPin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Benjamin',
    role: 'Academic Writer',
    bio: 'Benjamin brings a passion for research and a talent for clear, persuasive writing to every project.',
    photo: '/images/Benjamin.jpg',
  },
  {
    name: 'Brandon Walls',
    role: 'CEO',
    bio: 'As CEO, Brandon leads the team with a vision for excellence and a commitment to student success.',
    photo: '/images/Brandon Walls CEO.jpg',
  },
  {
    name: 'Christina',
    role: 'Senior Editor',
    bio: 'Christina ensures every document is polished, accurate, and ready to impress.',
    photo: '/images/Christina.jpg',
  },
  {
    name: 'Daniel',
    role: 'STEM Specialist',
    bio: 'Daniel specializes in technical and scientific writing, making complex topics accessible.',
    photo: '/images/Daniel.png',
  },
  {
    name: 'Dylan',
    role: 'Research Analyst',
    bio: 'Dylan provides in-depth research and data analysis for high-quality academic work.',
    photo: '/images/Dylan.jpg',
  },
  {
    name: 'Kelsey',
    role: 'Client Support Lead',
    bio: 'Kelsey is dedicated to helping clients and ensuring a smooth, supportive experience.',
    photo: '/images/Kelsey.jpg',
  },
];

const testimonials = [
  {
    name: 'Jessica Miller',
    text: 'I was skeptical at first, but Essay Embassy delivered a flawless research paper ahead of my deadline. The communication was excellent throughout.',
    rating: 5,
    avatar: '/images/Jessica Miller.jpg',
    verified: true,
    orderId: 'EE-10234',
    paperType: 'Research Paper',
    plagiarism: '0.7%',
    subject: 'Psychology',
    cost: '$120',
    delivery: '7 days',
  },
  {
    name: 'Michael Johnson',
    text: 'The writer assigned to my project was a true expert in my field. I received an A and my professor was impressed with the depth of analysis.',
    rating: 5,
    avatar: '/images/Michael Johnson.jpg',
    verified: true,
    orderId: 'EE-10458',
    paperType: 'Case Study',
    plagiarism: '0.0%',
    subject: 'Business',
    cost: '$95',
    delivery: '11 days',
  },
  {
    name: 'Ashley Thompson',
    text: 'Customer support was responsive and friendly. They handled my revision requests quickly and professionally. Highly recommend!',
    rating: 5,
    avatar: '/images/Ashley Thompson.jpg',
    verified: true,
    orderId: 'EE-10987',
    paperType: 'Essay',
    plagiarism: '1.2%',
    subject: 'English Literature',
    cost: '$75',
    delivery: '2 days',
  },
];

const stats = [
  { icon: <Briefcase className="h-8 w-8 text-primary-500" />, label: 'Years in Business', value: '10+' },
  { icon: <Users className="h-8 w-8 text-primary-500" />, label: 'Clients Served', value: '5,000+' },
  { icon: <BookOpen className="h-8 w-8 text-primary-500" />, label: 'Papers Delivered', value: '20,000+' },
  { icon: <Star className="h-8 w-8 text-primary-500" />, label: 'Avg. Rating', value: '4.9/5' },
];

const awards = [
  { icon: <Award className="h-8 w-8 text-yellow-400" />, label: 'Top Academic Service 2024' },
  { icon: <ShieldCheck className="h-8 w-8 text-green-500" />, label: 'Trusted by 5,000+ Students' },
  { icon: <Globe className="h-8 w-8 text-blue-500" />, label: 'Global Reach' },
];

const process = [
  { icon: <CheckCircle className="h-7 w-7 text-primary-500" />, title: 'Submit Requirements', desc: 'Tell us what you need and your deadline.' },
  { icon: <Users className="h-7 w-7 text-primary-500" />, title: 'Expert Assigned', desc: 'We match you with the perfect writer for your subject.' },
  { icon: <BookOpen className="h-7 w-7 text-primary-500" />, title: 'Draft & Revisions', desc: 'Get drafts, request changes, and stay in the loop.' },
  { icon: <Star className="h-7 w-7 text-primary-500" />, title: 'Final Delivery', desc: 'Receive your polished, original paper on time.' },
];

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 py-20 mb-8 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white mb-4 drop-shadow-lg">About Essay Embassy</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-6">Your trusted partner in academic excellence. We are a dedicated team of professionals committed to your success.</p>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-2xl transition-shadow">Get Started</Link>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gradient-to-t from-primary-200/60 to-transparent rounded-t-full blur-2xl opacity-60" />
      </section>

      {/* Business Stats */}
      <section className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 flex flex-col items-center">
              {stat.icon}
              <div className="text-3xl font-bold mt-2 text-primary-600 dark:text-primary-400">{stat.value}</div>
              <div className="text-muted text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="heading-md">Our Mission & Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><ShieldCheck className="h-6 w-6 text-primary-500 mt-1" /><span className="text-muted">Integrity in every project</span></li>
              <li className="flex items-start gap-3"><Star className="h-6 w-6 text-yellow-400 mt-1" /><span className="text-muted">Uncompromising quality</span></li>
              <li className="flex items-start gap-3"><Users className="h-6 w-6 text-blue-500 mt-1" /><span className="text-muted">Client-focused support</span></li>
              <li className="flex items-start gap-3"><BookOpen className="h-6 w-6 text-green-500 mt-1" /><span className="text-muted">Commitment to learning</span></li>
            </ul>
            <p className="text-muted mt-4">
              At Essay Embassy, our mission is to provide students with the highest quality academic writing and editing services. We believe that every student deserves the chance to succeed, and we are here to provide the support and expertise needed to make that happen.
            </p>
          </div>
          <div>
            <img 
              src="/images/team office.webp" 
              alt="Essay Embassy team office workspace" 
              className="rounded-lg shadow-2xl w-full h-auto border-4 border-primary-100 dark:border-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Trust & Awards */}
      <section className="container py-10">
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {awards.map((award, i) => (
            <div key={i} className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-xl shadow p-6 min-w-[180px]">
              {award.icon}
              <div className="font-semibold mt-2 text-primary-700 dark:text-primary-300 text-center">{award.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
          <img src="/images/Sitejabber_logo.png" alt="Sitejabber" className="h-10" />
          <img src="/images/logo.png" alt="Essay Embassy Logo" className="h-10" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-slate-50 dark:bg-slate-800">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-md">What Our Clients Say</h2>
            <p className="text-muted mt-4">Real feedback from American students who trust Essay Embassy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-white to-primary-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-primary-100 dark:border-slate-800 hover:shadow-3xl transition-shadow duration-300">
                <div className="relative mb-3">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-primary-400 shadow object-cover" />
                  {t.verified && (
                    <span className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 shadow text-xs" title="Verified Reviewer">✔</span>
                  )}
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-5 w-5 text-yellow-400" fill="currentColor" />)}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 mb-2 w-full max-w-xs">
                  <div><span className="font-semibold text-gray-700">Order ID:</span> {t.orderId}</div>
                  <div><span className="font-semibold text-gray-700">Paper Type:</span> {t.paperType}</div>
                  <div><span className="font-semibold text-gray-700">Plagiarism:</span> {t.plagiarism}</div>
                  <div><span className="font-semibold text-gray-700">Subject:</span> {t.subject}</div>
                  <div><span className="font-semibold text-gray-700">Cost:</span> {t.cost}</div>
                  <div><span className="font-semibold text-gray-700">Delivery:</span> {t.delivery}</div>
                </div>
                <p className="text-muted text-center mb-4 font-medium">"{t.text}"</p>
                <div className="font-bold text-primary-600 text-base flex items-center gap-2">
                  {t.name}
                  {t.verified && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-1">Verified</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work / Process */}
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-md">How It Works</h2>
          <p className="text-muted mt-4">Our process is simple, transparent, and designed for your success.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {process.map((step, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 flex flex-col items-center">
              {step.icon}
              <div className="font-bold text-lg mt-2 mb-1 text-primary-700 dark:text-primary-300">{step.title}</div>
              <div className="text-muted text-sm text-center">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team Section (already premium) */}
      <section className="section container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-md">Meet Our Core Team</h2>
          <p className="text-muted mt-4">
            Our strength lies in our team of dedicated professionals who bring a wealth of experience and passion to their work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className={`relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-xl rounded-2xl text-center p-8 border border-slate-100 dark:border-slate-800 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${member.role === 'CEO' ? 'ring-2 ring-yellow-400' : ''}`}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-32 h-32 rounded-full border-4 border-slate-200 dark:border-slate-700 object-cover shadow-lg transition-all duration-500 opacity-0 animate-fade-in"
                  style={{ animationFillMode: 'forwards' }}
                  onLoad={e => e.currentTarget.classList.remove('opacity-0')}
                />
              </div>
              <h3 className="text-2xl font-extrabold font-serif text-slate-800 dark:text-white mb-1 flex items-center justify-center gap-2">
                {member.name}
                {member.role === 'CEO' && (
                  <span className="inline-block bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full ml-2 shadow">CEO</span>
                )}
              </h3>
              <p className={`font-medium mb-2 ${member.role === 'CEO' ? 'text-yellow-500' : 'text-primary-500'}`}>{member.role}</p>
              <p className="text-muted text-base leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Location Block */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-md mb-4">Contact Us</h2>
            <p className="text-muted mb-6">Have questions or want to discuss your project? Reach out to our team anytime.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary-500" /><a href="mailto:essayembassy@gmail.com" className="hover:underline">essayembassy@gmail.com</a></div>
              <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary-500" /><span>1309 Beacon Street, Suite 300, Brookline, Massachusetts 02446</span></div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-64 w-full">
            <iframe
              title="Essay Embassy Office Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1357%2C51.4975%2C-0.1277%2C51.5035&amp;layer=mapnik"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-primary-500 text-white">
        <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Academic Goals?</h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">Let our experts provide the help you need. Place your order today and take the first step towards academic success.</p>
            <Link to="/order-now" className="btn-light">
              Order Now
            </Link>
        </div>
      </section>
    </div>
  );
};

export default About;