import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Edit3, Clock, GraduationCap, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const servicesList = [
  {
    icon: <Book size={28} className="text-primary-500" />,
    title: 'Essay Writing',
    description: 'Custom essays for all academic levels, from high school to university, written from scratch.',
    link: '/services/essay-writing'
  },
  {
    icon: <FileText size={28} className="text-primary-500" />,
    title: 'Research Papers',
    description: 'In-depth research papers with proper citations and formatting, tailored to your requirements.',
    link: '/paper-writing-services'
  },
  {
    icon: <GraduationCap size={28} className="text-primary-500" />,
    title: 'Dissertation & Thesis',
    description: 'Comprehensive assistance with dissertation and thesis writing, from proposal to final draft.',
    link: '/dissertation-writing-services'
  },
  {
    icon: <Edit3 size={28} className="text-primary-500" />,
    title: 'Editing & Proofreading',
    description: 'Polish your work to perfection. We check for grammar, style, and clarity.',
    link: '/order-now'
  },
  {
    icon: <Clock size={28} className="text-primary-500" />,
    title: 'Assignment Help',
    description: 'Reliable help with all types of assignments, ensuring you meet your deadlines with quality work.',
    link: '/services/assignment-help'
  },
  {
    icon: <Book size={28} className="text-primary-500" />,
    title: 'Homework Help',
    description: 'Quick and accurate solutions for your daily homework tasks across all subjects.',
    link: '/services/homework-help'
  }
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Academic Writing Services | Essay Embassy</title>
        <meta
          name="description"
          content="Professional academic writing services including essays, research papers, dissertations, and assignment help. Expert writers available 24/7."
        />
        <link rel="canonical" href="https://essayembassy.com/services/" />
      </Helmet>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="bg-slate-50 dark:bg-slate-800 py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="heading-lg mb-4">Our Academic Services</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Professional and reliable academic writing solutions tailored to help you succeed.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div key={index} className="card p-8 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-lg mr-4">
                  {service.icon}
                </div>
                <h3 className="heading-sm flex-1">{service.title}</h3>
              </div>
              <p className="text-muted mb-6 flex-grow">{service.description}</p>
              <Link to={service.link} className="btn-outline mt-auto">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>

       {/* Call to Action */}
       <section className="section bg-slate-100 dark:bg-slate-800">
        <div className="container text-center">
            <h2 className="heading-md mb-4">Don't See What You Need?</h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">We handle a wide variety of custom academic tasks. Contact our support team with your specific requirements and we'll be happy to assist you.</p>
            <Link to="/contact" className="btn-primary">
              Contact Support
            </Link>
        </div>
      </section>
      </div>
    </>
  );
};

export default Services;