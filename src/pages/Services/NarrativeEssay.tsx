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
// === MAIN NARRATIVE ESSAY PAGE COMPONENT ===
// ==================================================================================

const NarrativeEssay = () => {
  const { testimonials } = useTestimonials();
  
  const samples: Sample[] = [
    { title: 'A Personal Narrative: Lessons from a Summer Abroad', pages: 3, style: 'Narrative', content: 'This essay recounts the author\'s transformative experience while volunteering in a rural community, focusing on themes of cultural exchange, personal growth, and the challenges of stepping outside one\'s comfort zone...', downloadUrl: '#' },
    { title: 'Fictional Narrative: The Clockmaker\'s Secret', pages: 5, style: 'Creative Writing', content: 'A short story about an apprentice clockmaker who discovers a hidden message in his master\'s final creation, leading him on a quest through a steampunk-inspired city...', downloadUrl: '#' },
  ];
  const freebies = ['Compelling Storytelling', 'Vivid Descriptions', 'Character Development', 'Clear Narrative Arc', 'Plagiarism-Free', 'Expert Editing'];
  const faqs = [
    { question: 'What is a narrative essay?', answer: 'A narrative essay is a form of storytelling where you share a personal experience. The goal is to make a point, so the story should have a clear purpose and theme, often leading to a personal insight or lesson learned.' },
    { question: 'Can you help me make my story more interesting?', answer: 'Absolutely. Our writers are skilled storytellers. They can help you structure your narrative, use vivid language and sensory details, develop characters, and build suspense to make your story engaging for the reader.' },
    { question: 'Is this different from a creative writing assignment?', answer: 'While they share elements, a personal narrative essay is typically non-fiction and based on your real experiences. Creative writing can be entirely fictional. We offer help with both types of assignments.' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      {selectedSample && <SampleModal sample={selectedSample} onClose={() => setSelectedSample(null)} />}
      
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="font-semibold text-primary-600 dark:text-primary-400">Narrative Essay Service</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">Bring Your Story to Life</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">Our expert writers help you craft a powerful and engaging narrative essay that tells your unique story.</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 my-8 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Engaging Storytelling</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Authentic Voice</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Polished & Professional</span>
          </div>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Tell My Story</Link>
        </div>
      </section>

      <section className="section container">
        <h2 className="heading-lg text-center mb-8">The Power of a Well-Told Story</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          <p>A narrative essay is your chance to connect with your reader on a personal level. It’s not just about listing events; it’s about weaving them into a compelling story with a clear beginning, middle, and end. This requires a strong narrative voice, vivid descriptions, and a sense of purpose. At Essay Embassy, we help you find the story within your experience. Our writers guide you in structuring your thoughts, developing your narrative arc, and using literary techniques to make your story impactful and memorable, ensuring your personal account resonates with your audience.</p>
        </div>
      </section>
      
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">Elements of a Powerful Narrative</h2>
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
            What Our <span className="text-primary-500">Storytellers Say</span>
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from students who shared their stories successfully.
          </p>
        </div>
        <TestimonialTabs testimonials={testimonials} />
      </section>

      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg">Narrative Essay Samples</h2>
            <p className="text-lg text-muted mt-4">See how we help students craft compelling personal stories.</p>
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
            <h2 className="heading-md">Ask Our Story Experts</h2>
            <p className="text-muted">Have a question about your narrative essay? We're here to help.</p>
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

export default NarrativeEssay;