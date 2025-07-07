import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, Plus, Minus, Mail, Phone, Download, Eye, ShieldCheck } from 'lucide-react';
import TestimonialTabs from '../../components/Testimonials/TestimonialTabs';
import { useTestimonials } from '../../hooks/useTestimonials';

// ==================================================================================
// === TYPE DEFINITIONS (To fix all TypeScript errors) ===
// ==================================================================================
interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

interface Sample {
  title: string;
  pages: number;
  style: string;
  content: string;
  downloadUrl: string;
}

interface SampleModalProps {
  sample: Sample;
  onClose: () => void;
}

// ==================================================================================
// === REUSABLE SUB-COMPONENTS (With correct types) ===
// ==================================================================================

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


// ==================================================================================
// === MAIN HOMEWORK HELP PAGE COMPONENT ===
// ==================================================================================

const HomeworkHelp = () => {
  const { testimonials } = useTestimonials();
  
  const samples: Sample[] = [
    { title: 'Algebra II: Solving Quadratic Equations', pages: 2, style: 'Worksheet', content: 'This document provides step-by-step solutions for a set of 10 quadratic equation problems, demonstrating the use of the quadratic formula and factoring methods...', downloadUrl: '#' },
    { title: 'Chemistry Lab: Titration Experiment Summary', pages: 3, style: 'Lab Report', content: 'A summary of a titration experiment to determine the concentration of an unknown acid. Includes data tables, calculations, and a conclusion...', downloadUrl: '#' },
  ];
  const freebies: string[] = ['Step-by-step solutions', 'Quick turnaround', 'Plagiarism check', 'Expert verification', '24/7 Support', 'Affordable pricing'];
  const faqs: { question: string; answer: string }[] = [
    { question: 'How fast can you do my homework?', answer: 'We offer very fast turnaround times, with options as quick as 3 hours for most standard homework assignments. The exact time depends on the complexity and length of the task.' },
    { question: 'Is it possible to get help with a specific question?', answer: 'Yes, absolutely. You can submit single questions, problem sets, or entire worksheets. Our service is flexible to meet your specific needs.' },
    { question: 'Will the solution be explained?', answer: 'Yes. Our goal is to help you learn. Most of our homework solutions come with step-by-step explanations to help you understand the process and concepts involved.' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      {selectedSample && <SampleModal sample={selectedSample} onClose={() => setSelectedSample(null)} />}
      
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="font-semibold text-primary-600 dark:text-primary-400">Homework Help Service</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">Finish Your Homework In Minutes</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">Get quick, accurate, and explained solutions for your daily homework assignments.</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 my-8 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />All Subjects Covered</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Step-by-Step Explanations</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Fast & On-Time</span>
          </div>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Get Homework Help</Link>
          <p className="text-xs text-secondary-500 mt-4">(Starting from $10)</p>
        </div>
      </section>

      <section className="section container">
        <h2 className="heading-lg text-center mb-8">Your Go-To Source for Quick Homework Help</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          <p>Daily homework can be overwhelming, especially when juggling multiple subjects and tight deadlines. Essay Embassy provides a reliable and fast homework help service designed to alleviate that stress. We offer expert assistance across a wide array of subjects, from math and science to literature and history. Our goal is to provide you with not just the answers, but with clear, step-by-step solutions that help you understand the underlying concepts. This approach empowers you to learn effectively and tackle future assignments with greater confidence. Trust our team of specialists to deliver accurate, high-quality homework help exactly when you need it.</p>
        </div>
      </section>
      
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">Everything You Need for Homework Success</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {freebies.map(item => (
              <div key={item} className="bg-white dark:bg-secondary-800 rounded-lg shadow-soft p-4 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary-500 mr-3" />
                <span className="font-medium text-secondary-700 dark:text-secondary-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
             <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Place An Order</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-primary-500">Students Say</span>
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Real feedback from students who achieved academic success with our help.</p>
        </div>
        <TestimonialTabs testimonials={testimonials} />
      </section>

      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg">Check Out Our Sample Works</h2>
            <p className="text-lg text-muted mt-4">See the quality of our work for yourself. Explore samples written by our top experts.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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
            <h2 className="heading-md">Ask Our Team</h2>
            <p className="text-muted">Want to contact us directly? No problem. We are always here for you.</p>
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

export default HomeworkHelp;