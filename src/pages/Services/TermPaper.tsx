import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Plus, Minus, Mail, Phone, Download, Eye } from 'lucide-react';

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
// === MAIN TERM PAPER PAGE COMPONENT ===
// ==================================================================================

const TermPaper = () => {
  
  const samples: Sample[] = [
    { title: 'Term Paper: The Economic Impact of World War II', pages: 12, style: 'Chicago', content: 'This paper provides an in-depth analysis of the long-term economic consequences of World War II on the United States and Europe, focusing on industrial growth, technological innovation, and the establishment of new global financial institutions...', downloadUrl: '#' },
    { title: 'Term Paper: The Psychology of Consumer Behavior', pages: 10, style: 'APA', content: 'An exploration of the key psychological factors that influence consumer decision-making, including cognitive biases, social influence, and emotional triggers in marketing...', downloadUrl: '#' },
  ];
  const freebies = ['Thorough Research', 'Well-Structured Outline', 'Correct Citations', 'Coherent Argument', 'Plagiarism Report', 'Expert Proofreading'];
  const faqs = [
    { question: 'What is the difference between a term paper and a research paper?', answer: 'While similar, a term paper is typically a research-based essay due at the end of a semester, covering material from the course. A research paper can be a more independent project. We can help with both, tailoring the scope to your specific assignment.' },
    { question: 'Can you help me choose a topic for my term paper?', answer: 'Yes, if you\'re struggling to find a topic, our experts can help you brainstorm ideas that are relevant to your course, engaging, and have sufficient academic sources available for research.' },
    { question: 'How do you ensure the paper meets my professor\'s requirements?', answer: 'When you place your order, you can upload all relevant documents, including the assignment prompt, grading rubric, and any class notes. Our writers meticulously follow these instructions to ensure the final paper meets every requirement.' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      {selectedSample && <SampleModal sample={selectedSample} onClose={() => setSelectedSample(null)} />}
      
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="font-semibold text-primary-600 dark:text-primary-400">Term Paper Writing Service</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">Master Your End-of-Semester Papers</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">Our academic experts help you write comprehensive, well-researched term papers that demonstrate your knowledge of the course material.</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 my-8 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />In-Depth Course Knowledge</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Proper Structure & Flow</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Guaranteed On-Time</span>
          </div>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Write My Term Paper</Link>
        </div>
      </section>

      <section className="section container">
        <h2 className="heading-lg text-center mb-8">From Course Concepts to a Coherent Paper</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          <p>A term paper is a critical component of your final grade, designed to showcase your understanding of the entire semester's coursework. It requires you to synthesize lectures, readings, and discussions into a single, coherent research project. This can be a major challenge. At Essay Embassy, our writers specialize in transforming course material into well-structured and insightful term papers. We help you demonstrate your mastery of the subject by crafting a paper that is not only well-researched and correctly formatted but also directly reflects the key themes and concepts from your class.</p>
        </div>
      </section>
      
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">What Our Term Paper Service Delivers</h2>
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg">Term Paper Samples</h2>
          <p className="text-lg text-muted mt-4">See how we synthesize course knowledge into A-grade papers.</p>
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
      </section>

      <section className="section container">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-1 space-y-4 bg-secondary-50 dark:bg-secondary-800 p-8 rounded-lg shadow-soft">
            <h2 className="heading-md">Ask Our Term Paper Experts</h2>
            <p className="text-muted">Have a question about your term paper? We're here to help.</p>
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

export default TermPaper;