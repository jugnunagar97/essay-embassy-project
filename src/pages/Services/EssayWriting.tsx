import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Plus, Minus, Mail, Phone, Download, Eye, Users, BookOpen } from 'lucide-react';
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
// === MAIN ESSAY WRITING PAGE COMPONENT ===
// ==================================================================================

const EssayWriting = () => {
  const { testimonials } = useTestimonials();
  
  const writers = [
    { name: 'Isabel T.', degree: 'MA | English Teacher', photo: 'https://placehold.co/100x100/EBF4FF/134e4a?text=IT', focus: ['Literature', 'Poetry'], loves: 'Essays, book reviews', stats: { satisfaction: '97%', onTime: '100%', rating: '4.8/5' } },
    { name: 'Noah V.', degree: 'BA | Historian', photo: 'https://placehold.co/100x100/EBF4FF/134e4a?text=NV', focus: ['History', 'Geopolitics'], loves: 'Case studies, essays', stats: { satisfaction: '99%', onTime: '98%', rating: '4.9/5' } },
    { name: 'Susan R.', degree: 'MA | Certified Nurse', photo: 'https://placehold.co/100x100/EBF4FF/134e4a?text=SR', focus: ['Healthcare', 'Nursing'], loves: 'Lab reports, research', stats: { satisfaction: '99%', onTime: '100%', rating: '5/5' } },
  ];
  const samples: Sample[] = [
    { title: 'Argumentative Essay: The Ethics of Artificial Intelligence', pages: 4, style: 'MLA', content: 'This paper argues for the implementation of a universal ethical framework in the development of artificial intelligence to mitigate risks associated with autonomous decision-making...', downloadUrl: '#' },
    { title: 'Compare & Contrast: Romanticism vs. Transcendentalism', pages: 5, style: 'Chicago', content: 'An in-depth comparison of the core tenets of Romanticism and Transcendentalism, analyzing their similarities in celebrating individualism and nature, while contrasting their differing views on the divine and societal structures.', downloadUrl: '#' },
  ];
  const freebies = ['Topic Brainstorming', 'Outline Creation', 'Plagiarism Report', 'Formatting & Citation', 'Unlimited Revisions', '24/7 Support'];
  const faqs = [
    { question: 'Can you write an essay on any topic?', answer: 'Yes, our diverse team of experts covers virtually every academic subject. From literature and history to complex scientific topics, we can match you with a writer who has the right expertise for your essay.' },
    { question: 'What if my essay requires specific sources?', answer: 'You can provide a list of required sources or even upload the documents directly when you place your order. Your writer will incorporate them into your essay as instructed.' },
    { question: 'Is buying an essay considered cheating?', answer: 'Our service is designed to be an academic tool. The essays we provide are intended to be used as a reference or model answer to guide you in writing your own work, helping you understand structure, argumentation, and source integration.' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      {selectedSample && <SampleModal sample={selectedSample} onClose={() => setSelectedSample(null)} />}
      
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="font-semibold text-primary-600 dark:text-primary-400">Custom Essay Writing Service</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">Crafting Perfect Essays, Just for You</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">Get a high-quality, 100% original essay written by a subject expert to meet your exact needs.</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 my-8 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />100% Original Content</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Expert Writers</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Any Citation Style</span>
          </div>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Write My Essay</Link>
          <p className="text-xs text-secondary-500 mt-4">(From $12 per page)</p>
        </div>
      </section>

      <section className="section container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg">Why Choose Our Essay Writing Service?</h2>
          <p className="text-lg text-muted mt-4">Experience the difference that a professional touch can make.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-secondary-800 shadow-soft rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-medium"><Users className="h-12 w-12 mx-auto text-primary-500 mb-4" /><h3 className="heading-sm mb-2">Expert Writers</h3><p className="text-muted">Our writers are masters of their craft with proven academic backgrounds.</p></div>
            <div className="bg-white dark:bg-secondary-800 shadow-soft rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-medium"><BookOpen className="h-12 w-12 mx-auto text-primary-500 mb-4" /><h3 className="heading-sm mb-2">Custom-Crafted</h3><p className="text-muted">Every essay is written from scratch to your exact specifications.</p></div>
            <div className="bg-white dark:bg-secondary-800 shadow-soft rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-medium"><ShieldCheck className="h-12 w-12 mx-auto text-primary-500 mb-4" /><h3 className="heading-sm mb-2">Authenticity Guaranteed</h3><p className="text-muted">We ensure 100% originality with every order, backed by a plagiarism report.</p></div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-900 dark:to-secondary-800">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg">Meet our top essay writers</h2>
            <p className="text-lg text-muted mt-4">The creative minds behind our most compelling essays.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {writers.map((writer, i) => (
              <div key={i} className="bg-white dark:bg-secondary-800 rounded-lg shadow-soft p-6 transition-transform duration-300 hover:scale-105 hover:shadow-medium">
                <div className="text-center">
                  <img src={writer.photo} alt={writer.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" />
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white">{writer.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-4">{writer.degree}</p>
                </div>
                <div className="text-left space-y-3 text-sm text-muted mb-5">
                  <p><strong className="text-secondary-700 dark:text-secondary-300">Focus areas:</strong> {writer.focus.join(', ')}</p>
                  <p><strong className="text-secondary-700 dark:text-secondary-300">Loves to write:</strong> {writer.loves}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm border-t border-secondary-200 dark:border-secondary-700 pt-4">
                  <div><p className="font-bold text-lg text-primary-600">{writer.stats.satisfaction}</p><p className="text-muted text-xs">Satisfaction</p></div>
                  <div><p className="font-bold text-lg text-primary-600">{writer.stats.onTime}</p><p className="text-muted text-xs">On-Time</p></div>
                  <div><p className="font-bold text-lg text-primary-600">{writer.stats.rating}</p><p className="text-muted text-xs">Rating</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="heading-lg text-center mb-8">Master Any Essay with Our Expert Help</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          <p>Essays are a fundamental part of academic life, serving as a key tool for instructors to assess your understanding, critical thinking, and writing skills. However, crafting a compelling essay requires time, research, and a clear, structured argument. Whether you're facing a challenging topic, a tight deadline, or simply wish to elevate the quality of your work, Essay Embassy is your trusted partner. Our service provides custom-written essays on any subject, tailored precisely to your prompt and instructions. From argumentative and persuasive essays to narrative and expository ones, our writers have the expertise to deliver a piece that is not only well-written but also insightful and academically sound.</p>
        </div>
      </section>
      
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">Everything Included in Your Essay Order</h2>
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
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from students who achieved academic success with our help.
          </p>
        </div>
        <TestimonialTabs testimonials={testimonials} />
      </section>

      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg">Check Out Our Sample Works</h2>
            <p className="text-lg text-muted mt-4">See the quality of our work for yourself. Explore samples written by our top experts.</p>
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
            <h2 className="heading-md">Ask Our Team</h2>
            <p className="text-muted">Questions about your essay? Our expert consultants are here to help.</p>
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

export default EssayWriting;