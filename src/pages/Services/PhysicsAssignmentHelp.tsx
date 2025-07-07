import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Plus, Minus, Mail, Phone, Download, Eye } from 'lucide-react';
import TestimonialTabs from '../../components/Testimonials/TestimonialTabs';
import { useTestimonials } from '../../hooks/useTestimonials';

// TYPE DEFINITIONS
interface FaqItemProps { question: string; answer: string; isOpen: boolean; onClick: () => void; }
interface Sample { title: string; pages: number; style: string; content: string; downloadUrl: string; }
interface SampleModalProps { sample: Sample; onClose: () => void; }

// REUSABLE SUB-COMPONENTS
const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-secondary-200 dark:border-secondary-700">
    <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left group">
      <span className="font-semibold text-lg text-secondary-800 dark:text-secondary-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{question}</span>
      {isOpen ? <Minus className="h-6 w-6 text-primary-500" /> : <Plus className="h-6 w-6 text-secondary-500" />}
    </button>
    {isOpen && <div className="pb-5 pr-8 text-muted animate-fade-in"><p>{answer}</p></div>}
  </div>
);

const SampleModal: React.FC<SampleModalProps> = ({ sample, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 animate-fade-in">
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-strong max-w-3xl w-full max-h-[90vh] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-secondary-200 dark:border-secondary-700">
        <h3 className="text-xl font-bold text-secondary-900 dark:text-white">{sample.title}</h3>
        <button onClick={onClose} className="text-secondary-500 hover:text-red-500 transition-colors p-2 rounded-full -m-2">&times;</button>
      </div>
      <div className="p-6 overflow-y-auto"><h4 className="font-bold text-lg mb-2">Abstract</h4><p className="text-muted whitespace-pre-wrap">{sample.content}</p></div>
      <div className="p-4 bg-secondary-50 dark:bg-secondary-900/50 border-t border-secondary-200 dark:border-secondary-700 flex justify-end space-x-4">
        <button onClick={onClose} className="btn-outline">Close</button>
        <a href={sample.downloadUrl} download className="btn-primary">Download PDF</a>
      </div>
    </div>
  </div>
);

// MAIN COMPONENT
const PhysicsAssignmentHelp = () => {
  const { testimonials } = useTestimonials();
  const samples: Sample[] = [
    { title: 'Problem Set: Newtonian Mechanics', pages: 3, style: 'Problem Set', content: 'This document provides fully worked-out solutions for a series of problems related to Newton\'s laws of motion, including free-body diagrams and kinematic calculations...', downloadUrl: '#' },
    { title: 'Lab Report: Ohm\'s Law Experiment', pages: 5, style: 'AIP', content: 'A detailed lab report on an experiment designed to verify Ohm\'s Law. Includes circuit diagrams, data tables, graphical analysis of voltage vs. current, and a discussion of experimental error...', downloadUrl: '#' },
  ];
  const freebies = ['Problem Solving', 'Lab Reports', 'Theoretical Concepts', 'Data Analysis', 'Plagiarism-Free', 'Expert Review'];
  const faqs = [
    { question: 'Can you help with complex physics problems?', answer: 'Yes, our team includes physicists with advanced degrees who can solve complex problems in a wide range of areas, including mechanics, electromagnetism, thermodynamics, and quantum mechanics.' },
    { question: 'Do you show the steps in your solutions?', answer: 'Absolutely. We provide clear, step-by-step solutions for all problem-solving assignments, ensuring you can follow the logic and understand how to arrive at the final answer.' },
    { question: 'What if I need help preparing for a physics exam?', answer: 'While we primarily focus on assignments, we can create custom study guides, summaries of key concepts, and practice problem sets to help you prepare effectively for your exams.' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      {selectedSample && <SampleModal sample={selectedSample} onClose={() => setSelectedSample(null)} />}
      
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="font-semibold text-primary-600 dark:text-primary-400">Physics Assignment Help</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">Solve Complex Physics Problems</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">From classical mechanics to quantum physics, our experts provide clear, accurate solutions to help you succeed.</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 my-8 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Step-by-Step Solutions</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Theoretical Explanations</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Lab Report Assistance</span>
          </div>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Get Physics Help</Link>
        </div>
      </section>

      <section className="section container">
        <h2 className="heading-lg text-center mb-8">Making Sense of the Laws of the Universe</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          <p>Physics is the science of matter, motion, and energy, and its concepts can be abstract and mathematically demanding. Whether you're struggling with a complex problem set, analyzing data from a lab experiment, or trying to grasp theoretical concepts, our physics experts are here to provide the clarity you need. At Essay Embassy, we offer specialized assistance tailored to your physics curriculum. We provide detailed, step-by-step solutions to problems, help you write clear and accurate lab reports, and explain complex theories in a way that is easy to understand, helping you build a strong foundation in the subject.</p>
        </div>
      </section>
      
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">What Our Physics Help Includes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {freebies.map(item => (
              <div key={item} className="bg-white dark:bg-secondary-800 rounded-lg shadow-soft p-4 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary-500 mr-3" />
                <span className="font-medium text-secondary-700 dark:text-secondary-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
             <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Get Started Now</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hear From Our <span className="text-primary-500">Future Physicists</span>
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from students who mastered physics with our help.
          </p>
        </div>
        <TestimonialTabs testimonials={testimonials} />
      </section>

      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg">Physics Assignment Samples</h2>
            <p className="text-lg text-muted mt-4">See how we tackle complex problems and structure lab reports.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {samples.map((sample, i) => (
              <div key={i} className="bg-white dark:bg-secondary-800 rounded-lg shadow-soft p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-medium">
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{sample.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted mb-4">
                  <span>{sample.pages} Pages</span>
                  <span>&bull;</span>
                  <span>{sample.style} Style</span>
                </div>
                <div className="flex-grow"></div>
                <div className="flex items-center space-x-4 mt-4">
                  <button onClick={() => setSelectedSample(sample)} className="btn-outline w-full flex items-center justify-center"><Eye className="h-4 w-4 mr-2" /> Preview</button>
                  <a href={sample.downloadUrl} download className="btn-primary w-full flex items-center justify-center"><Download className="h-4 w-4 mr-2" /> Download</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-1 space-y-4 bg-secondary-50 dark:bg-secondary-800 p-8 rounded-lg shadow-soft">
            <h2 className="heading-md">Ask Our Physics Experts</h2>
            <p className="text-muted">Have a question about a physics problem? We're here to help.</p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center"><Phone className="h-5 w-5 text-primary-500 mr-3" /><span className="text-muted">+1 (555) 123-4567</span></div>
              <div className="flex items-center"><Mail className="h-5 w-5 text-primary-500 mr-3" /><a href="mailto:support@essayembassy.com" className="text-muted hover:text-primary-500">support@essayembassy.com</a></div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="heading-lg mb-6">Frequently Asked Questions</h2>
            {faqs.map((faq, i) => <FaqItem key={i} question={faq.question} answer={faq.answer} isOpen={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)} />)}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PhysicsAssignmentHelp;