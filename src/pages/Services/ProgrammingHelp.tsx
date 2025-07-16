import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Plus, Minus, Mail, Phone, Download, Eye, Terminal } from 'lucide-react';

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
      <div className="p-6 overflow-y-auto"><h4 className="font-bold text-lg mb-2">Code Snippet</h4><pre className="bg-secondary-100 dark:bg-secondary-900 p-4 rounded-md text-sm text-muted whitespace-pre-wrap"><code>{sample.content}</code></pre></div>
      <div className="p-4 bg-secondary-50 dark:bg-secondary-900/50 border-t border-secondary-200 dark:border-secondary-700 flex justify-end space-x-4">
        <button onClick={onClose} className="btn-outline">Close</button>
        <a href={sample.downloadUrl} download className="btn-primary">Download Full Code</a>
      </div>
    </div>
  </div>
);

// MAIN COMPONENT
const ProgrammingHelp = () => {
  const samples: Sample[] = [
    { title: 'Python Script for Data Scraping', pages: 1, style: 'Python', content: 'import requests\nfrom bs4 import BeautifulSoup\n\nURL = "http://example.com"\npage = requests.get(URL)\n\nsoup = BeautifulSoup(page.content, "html.parser")\n# ... rest of the script', downloadUrl: '#' },
    { title: 'Java: Binary Search Tree Implementation', pages: 2, style: 'Java', content: 'class Node {\n  int key;\n  Node left, right;\n\n  public Node(int item) {\n    key = item;\n    left = right = null;\n  }\n}\n// ... rest of the class implementation', downloadUrl: '#' },
  ];
  const freebies = ['Code Debugging', 'Algorithm Design', 'Well-Commented Code', 'Database Help', 'Web Development', '24/7 Expert Support'];
  const faqs = [
    { question: 'What programming languages do you support?', answer: 'We support a wide range of popular languages, including Python, Java, C++, JavaScript, R, and more. If you have an assignment in a specific language, please contact us to confirm.' },
    { question: 'Can you help me debug my existing code?', answer: 'Yes, absolutely. Our experts are skilled at debugging. You can provide your code and a description of the error, and we will help you identify and fix the issue.' },
    { question: 'Do you provide comments and explanations with the code?', answer: 'Yes. We believe in helping you learn. All code we provide is well-commented to explain the logic, and we can provide additional explanations for complex algorithms or functions upon request.' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      {selectedSample && <SampleModal sample={selectedSample} onClose={() => setSelectedSample(null)} />}
      
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="font-semibold text-primary-600 dark:text-primary-400">Programming Assignment Help</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">Debug Your Code, Ace Your Project</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">From Python scripts to complex Java applications, get expert help with your programming assignments.</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 my-8 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Clean, Efficient Code</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />Well-Commented & Explained</span>
            <span className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary-500" />All Major Languages</span>
          </div>
          <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">Get Coding Help</Link>
        </div>
      </section>

      <section className="section container">
        <h2 className="heading-lg text-center mb-8">From Pseudocode to Perfect Execution</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          <p>Programming assignments require a unique combination of logical thinking, problem-solving, and attention to detail. A single misplaced semicolon can bring an entire application to a halt. At Essay Embassy, our team of experienced developers and computer science experts can help you navigate the challenges of any coding assignment. Whether you need help designing an algorithm, debugging existing code, or building a project from scratch, we provide clean, efficient, and well-commented solutions in a wide range of languages. We're here to help you not only submit a working assignment but also to understand the principles behind the code.</p>
        </div>
      </section>
      
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">What Our Programming Help Includes</h2>
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
          <h2 className="heading-lg">Programming Samples</h2>
          <p className="text-lg text-muted mt-4">See examples of our clean, well-commented code.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {samples.map((sample, i) => (
            <div key={i} className="bg-white dark:bg-secondary-800 rounded-lg shadow-soft p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-medium">
              <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{sample.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted mb-4">
                <Terminal className="h-4 w-4" />
                <span>{sample.style}</span>
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
            <h2 className="heading-md">Ask Our Coding Experts</h2>
            <p className="text-muted">Have a question about your coding assignment? We're here to help.</p>
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

export default ProgrammingHelp;