import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Plus, Minus, Mail, Phone, Download, Eye } from 'lucide-react';
import TestimonialTabs from '../../components/Testimonials/TestimonialTabs';
import { useTestimonials } from '../../hooks/useTestimonials';

// ==================================================================================
// === TYPE DEFINITIONS ===
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
// === REUSABLE SUB-COMPONENTS ===
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
// === MAIN BOOK REVIEW PAGE COMPONENT ===
// ==================================================================================

const BookReview = () => {
  const { testimonials } = useTestimonials();
  
  const samples: Sample[] = [
    { title: 'Book Review: "Sapiens: A Brief History of Humankind"', pages: 3, style: 'MLA', content: 'This review analyzes Yuval Noah Harari\'s "Sapiens," evaluating its main arguments on cognitive, agricultural, and scientific revolutions. It critiques the book\'s broad scope while praising its engaging narrative and thought-provoking insights...', downloadUrl: '#' },
    { title: 'Literary Analysis: Symbolism in "The Great Gatsby"', pages: 4, style: 'Chicago', content: 'An in-depth analysis of the key symbols in F. Scott Fitzgerald\'s masterpiece, including the green light, the eyes of Dr. T.J. Eckleburg, and the Valley of Ashes, and their connection to themes of the American Dream, wealth, and moral decay...', downloadUrl: '#' },
  ];
  const freebies = ['Critical Analysis', 'Character & Theme Study', 'Plot Summary', 'Author\'s Context', 'Plagiarism-Free', 'Expert Review'];
  const faqs = [
    { question: 'Do I need to provide a copy of the book?', answer: 'Not necessarily. Our writers have access to extensive literary databases and can typically access most books. However, if the book is rare or a specific edition is required, providing a copy is helpful.' },
    { question: 'What is the difference between a book review and a book report?', answer: 'A book report primarily summarizes the plot and characters. A book review is more analytical, offering a critical evaluation of the book\'s themes, style, and significance. We can help with both.' },
    { question: 'Can you write a review from a specific critical perspective?', answer: 'Yes. Our literature experts are familiar with various critical theories (e.g., feminist, psychoanalytic, Marxist). You can specify a particular lens in your order requirements, and we will tailor the analysis accordingly.' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      {selectedSample && <SampleModal sample={selectedSample} onClose={() => setSelectedSample(null)} />}
      
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="font-semibold text-primary-600 dark:text-primary-400">Book Review Service</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">Insightful Analysis of Any Text</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">Get a professional book review that goes beyond summary to provide critical analysis and deep literary insight.</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 my-8 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Critical Evaluation</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Thematic Analysis</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Character Study</span>
          </div>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Review My Book</Link>
        </div>
      </section>

      <section className="section container">
        <h2 className="heading-lg text-center mb-8">Beyond Summary to True Literary Critique</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          <p>Writing a compelling book review requires a delicate balance of summary and analysis. You must demonstrate a thorough understanding of the text while also offering a unique, critical perspective on its themes, characters, style, and significance. At Essay Embassy, our literature experts are adept at this craft. We help you move beyond simple plot summaries to develop an insightful critique that engages with the text on a deeper level. Whether you're analyzing a classic novel, a contemporary work of fiction, or a complex non-fiction book, we provide a review that is articulate, well-supported, and academically rigorous.</p>
        </div>
      </section>
      
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">What Our Book Review Service Includes</h2>
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
            Hear From Our <span className="text-primary-500">Literary Critics</span>
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from students who mastered their literary analysis with us.
          </p>
        </div>
        <TestimonialTabs testimonials={testimonials} />
      </section>

      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg">Book Review Samples</h2>
            <p className="text-lg text-muted mt-4">See how we analyze texts with depth and critical insight.</p>
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
            <h2 className="heading-md">Ask Our Literature Experts</h2>
            <p className="text-muted">Have a question about your book review? We're here to help.</p>
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

export default BookReview;