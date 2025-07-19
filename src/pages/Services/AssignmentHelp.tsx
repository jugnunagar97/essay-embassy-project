import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, BookOpen, Users, ShieldCheck, Plus, Minus, Mail, Phone, Download, Eye } from 'lucide-react';

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

const AssignmentHelp = () => {
  const writers = [
    { name: 'Noah V.', degree: 'BA | Historian', photo: 'https://placehold.co/100x100/EBF4FF/134e4a?text=NV', focus: ['History', 'Geopolitics'], loves: 'Case studies, essays', stats: { satisfaction: '99%', onTime: '98%', rating: '4.9/5' } },
    { name: 'Susan R.', degree: 'MA | Certified Nurse', photo: 'https://placehold.co/100x100/EBF4FF/134e4a?text=SR', focus: ['Healthcare', 'Nursing'], loves: 'Lab reports, research', stats: { satisfaction: '99%', onTime: '100%', rating: '5/5' } },
    { name: 'Isabel T.', degree: 'MA | English Teacher', photo: 'https://placehold.co/100x100/EBF4FF/134e4a?text=IT', focus: ['Literature', 'Poetry'], loves: 'Essays, book reviews', stats: { satisfaction: '97%', onTime: '100%', rating: '4.8/5' } },
  ];
  const samples: Sample[] = [
    { title: 'Analysis of Market Entry Strategies', pages: 5, style: 'APA', content: 'This paper analyzes the market entry strategies of technology firms into emerging markets, focusing on a case study of Netflix in India...', downloadUrl: '#' },
    { title: 'The Role of Dopamine in Motivation', pages: 8, style: 'Harvard', content: 'A comprehensive literature review on the neurochemical basis of motivation, with a specific focus on the role of the dopaminergic pathways...', downloadUrl: '#' },
    { title: 'Ethical Dilemmas in AI Development', pages: 6, style: 'Chicago', content: 'This essay explores the key ethical dilemmas faced by developers and policymakers in the age of artificial intelligence, including issues of bias, autonomy, and accountability...', downloadUrl: '#' },
  ];
  const freebies = ['Unlimited revisions', 'A paper draft', 'Premium writers', 'VIP Support', 'A plagiarism report', 'An AI report'];
  const faqs = [
    { question: 'How much time does it take for an assignment to be ready?', answer: 'The turnaround time depends on the complexity, length, and your specified deadline. We offer deadlines ranging from 3 hours to 14 days.' },
    { question: 'What assignments can Essay Embassy do?', answer: 'We handle a vast range of assignments including essays, research papers, case studies, lab reports, presentations, and more across all academic fields.' },
    { question: 'Who will do my assignment?', answer: 'Your assignment will be handled by a qualified expert with an advanced degree (Master\'s or PhD) in your specific subject area.' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      {selectedSample && <SampleModal sample={selectedSample} onClose={() => setSelectedSample(null)} />}
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="font-semibold text-primary-600 dark:text-primary-400">Assignment Writing Service</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">Ace Your College Assignments With Expert Help</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">Take the stress out of assignment writing and make more time to live!</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 my-8 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />19+ years on the market</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />100% originality guarantee</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Only a select 6% get hired</span>
          </div>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Order Assignment</Link>
          <p className="text-xs text-secondary-500 mt-4">(AI & Plagiarism Free)</p>
        </div>
      </section>
      <section className="section container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg">Why choose our assignment writing services?</h2>
          <p className="text-lg text-muted mt-4">Rely on us to handle any kind of assignment</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-secondary-800 shadow-soft rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-medium"><Users className="h-12 w-12 mx-auto text-primary-500 mb-4" /><h3 className="heading-sm mb-2">A Team of Pros</h3><p className="text-muted">We carefully select the qualified writers who join our team.</p></div>
          <div className="bg-white dark:bg-secondary-800 shadow-soft rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-medium"><BookOpen className="h-12 w-12 mx-auto text-primary-500 mb-4" /><h3 className="heading-sm mb-2">A-Level Quality</h3><p className="text-muted">We closely review each order before delivering it to you.</p></div>
          <div className="bg-white dark:bg-secondary-800 shadow-soft rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-medium"><ShieldCheck className="h-12 w-12 mx-auto text-primary-500 mb-4" /><h3 className="heading-sm mb-2">19+ Years of Work</h3><p className="text-muted">No request is too tricky for us to handle. Give it a try!</p></div>
        </div>
      </section>
      <section className="section bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-900 dark:to-secondary-800">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg">Meet our top assignment writers</h2>
            <p className="text-lg text-muted mt-4">Our experts are the foundation of our quality promise.</p>
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
        <h2 className="heading-lg text-center mb-8">Your Go-To Source for Professional Assignment Help</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          <p>Navigating the complexities of academic assignments can be a daunting task for any student. The pressure to deliver high-quality, original work within tight deadlines is immense. This is where Essay Embassy steps in as a reliable partner. Our assignment help service is meticulously designed to provide comprehensive support across all subjects and academic levels. Whether you are an undergraduate student grappling with your first case study or a postgraduate candidate working on a complex research project, our team has the expertise to guide you.</p>
          <p>We believe that quality assignment help goes beyond simply providing answers. It's about fostering a deeper understanding of the subject matter. Our experts craft detailed, step-by-step solutions that are not only accurate but also illustrative, helping you grasp core concepts and improve your own academic skills. We focus on delivering content that is not just a submission but a learning tool. Every paper is structured logically, argued coherently, and formatted perfectly according to your specified citation style, be it APA, MLA, Chicago, or Harvard.</p>
        </div>
      </section>
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">Get Top-Grade Help With Your Assignment!</h2>
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
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeFaq === i}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssignmentHelp;