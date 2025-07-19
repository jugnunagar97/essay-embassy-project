import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Minus, 
  GraduationCap
} from 'lucide-react';

// Accordion Component
interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Accordion = ({ question, answer, isOpen, onToggle }: AccordionProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-all duration-300 ${
          isOpen 
            ? 'bg-primary-50 border-b border-gray-200' 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        <span className={`font-medium text-lg transition-colors duration-300 ${
          isOpen ? 'text-primary-600' : 'text-gray-900'
        }`}>
          {question}
        </span>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary-600 transition-transform duration-300" />
          ) : (
            <Plus className="w-5 h-5 text-primary-600 transition-transform duration-300" />
          )}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-4 bg-white">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// FAQ Section Component
interface FAQSectionProps {
  title: string;
  description: string;
  questions: Array<{ question: string; answer: string }>;
  openStates: boolean[];
  setOpenStates: (states: boolean[]) => void;
}

const FAQSection = ({ title, description, questions, openStates, setOpenStates }: FAQSectionProps) => {
  const toggleQuestion = (index: number) => {
    const newStates = [...openStates];
    newStates[index] = !newStates[index];
    setOpenStates(newStates);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {questions.map((item, index) => (
            <Accordion
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openStates[index]}
              onToggle={() => toggleQuestion(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  // State for managing accordion open/close states for each section
  const [generalOpenStates, setGeneralOpenStates] = useState<boolean[]>(new Array(7).fill(false));
  const [orderOpenStates, setOrderOpenStates] = useState<boolean[]>(new Array(5).fill(false));
  const [writersOpenStates, setWritersOpenStates] = useState<boolean[]>(new Array(4).fill(false));
  const [qualityOpenStates, setQualityOpenStates] = useState<boolean[]>(new Array(5).fill(false));
  const [pricingOpenStates, setPricingOpenStates] = useState<boolean[]>(new Array(3).fill(false));
  const [securityOpenStates, setSecurityOpenStates] = useState<boolean[]>(new Array(6).fill(false));

  // FAQ Data
  const generalQuestions = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of academic and professional writing services, including: Essays (all types), Research Papers, Term Papers, Dissertations & Theses, Case Studies, Lab Reports, Article Reviews, Admission Essays, Editing & Proofreading, and other custom writing tasks."
    },
    {
      question: "Can you write essays on any topic?",
      answer: "Yes. Our diverse team consists of experts across a vast array of academic disciplines. From the humanities to hard sciences, we can match your project with a writer who has the specific knowledge and experience required for your topic."
    },
    {
      question: "Can you write in different formats and citation styles?",
      answer: "Absolutely. Our writers are proficient in all major academic citation styles, including APA, MLA, Chicago/Turabian, Harvard, and Oxford. Simply specify your required format in the order details, and we will ensure perfect compliance."
    },
    {
      question: "Do you have customer support available 24/7?",
      answer: "Yes, our customer support team is available 24/7, 365 days a year. You can reach us anytime via live chat, email, or phone. We are always here to answer your questions and provide assistance."
    },
    {
      question: "Can you provide testimonials or reviews?",
      answer: "Yes, we are proud of the feedback from our clients! You can find verified testimonials directly on our website. For independent reviews, we encourage you to visit platforms like SiteJabber and Reviews.io to see what our customers have to say."
    },
    {
      question: "Why should I trust Essay Embassy?",
      answer: "Students trust us for several key reasons: 1. Quality: Our writers produce high-quality work that meets academic standards. 2. Confidentiality: Your personal information is always kept private and secure. 3. Speed: We can handle urgent deadlines, delivering papers in as little as 3 hours. 4. Communication: Our support and writing teams are accessible 24/7."
    },
    {
      question: "Do you provide pre-written essays?",
      answer: "No, never. Every paper we deliver is written completely from scratch according to your specific requirements. We guarantee 100% original content to ensure your academic integrity and success."
    }
  ];

  const orderQuestions = [
    {
      question: "How can I place an order?",
      answer: "Placing an order is a simple 3-step process: 1. Fill out the order form: Provide all your project details, including paper type, academic level, and deadline. 2. Make a secure payment: We require a minimum 50% deposit to begin. 3. Download your paper: We'll notify you via email and text as soon as your paper is ready for download from your personal account."
    },
    {
      question: "Can you meet tight deadlines?",
      answer: "Yes. We have a dedicated team of writers who specialize in handling rush orders. We can reliably deliver high-quality, original papers in as little as 3 hours."
    },
    {
      question: "How do I receive my completed essay?",
      answer: "Your completed essay will be delivered to your secure client account on our website. You will also receive an email notification with a direct link to download the file."
    },
    {
      question: "When will you deliver my paper?",
      answer: "We guarantee your paper will be delivered on or before the deadline you specify. We pride ourselves on punctuality without ever compromising on quality."
    },
    {
      question: "What happens if my writer misses my deadline?",
      answer: "In the extremely rare event that a deadline is missed due to an issue on our end, you are entitled to a full refund of your deposit as per our Money-Back Guarantee. Punctuality is a cornerstone of our service."
    }
  ];

  const writersQuestions = [
    {
      question: "How do I communicate with my writer?",
      answer: "You can communicate directly and anonymously with your assigned writer through the secure messaging system in your personal account area. This allows you to ask questions, provide clarifications, and track progress."
    },
    {
      question: "Can I share additional files with my writer?",
      answer: "Yes, absolutely. We encourage you to upload any relevant materials such as lecture notes, textbooks, articles, or specific instructions. The more information you provide, the better we can tailor the paper to your needs."
    },
    {
      question: "How much writing experience will my writer have?",
      answer: "We only hire writers with a minimum of 3 years of professional academic writing experience. Your order will be matched with a writer who holds a relevant degree and is qualified in your specific field of study."
    },
    {
      question: "Are your writers open to feedback and revision requests?",
      answer: "Yes. All orders come with a free revision period. Our writers are happy to receive your feedback and make adjustments to ensure the final paper meets your initial requirements perfectly."
    }
  ];

  const qualityQuestions = [
    {
      question: "How do you ensure the quality of your essays?",
      answer: "We have a multi-step Quality Assurance process. Every paper is written by a qualified expert, reviewed by a professional editor for grammar and clarity, and passed through plagiarism-detection software to ensure originality."
    },
    {
      question: "Do you offer revisions and refunds?",
      answer: "Yes. We offer a free revision period (typically 14 days) to fine-tune your paper. We also have a clear money-back guarantee that protects you in cases of non-delivery or plagiarism."
    },
    {
      question: "What if I am not satisfied with the final product?",
      answer: "Your satisfaction is our priority. If you are not satisfied, please utilize the free revision period to request changes. Our team is committed to working with you until the paper meets your initial instructions."
    },
    {
      question: "How do you ensure plagiarism-free work?",
      answer: "We guarantee 100% plagiarism-free work by: 1. Writing every paper from scratch. 2. Citing all sources correctly. 3. Checking every paper with advanced plagiarism-detection software like Turnitin."
    },
    {
      question: "How can I be sure of my essay's originality?",
      answer: "Upon request, we can provide you with an official plagiarism report with your final order. This report will show you the detailed originality score of your paper, giving you complete peace of mind."
    }
  ];

  const pricingQuestions = [
    {
      question: "How much will it cost to write my essay?",
      answer: "Our pricing is competitive, starting from $11/page. The final cost depends on three factors: the academic level, the number of pages, and the urgency of the deadline."
    },
    {
      question: "How do I make payment for my order?",
      answer: "You can pay securely using any major credit or debit card. We accept Visa, MasterCard, American Express, and Discover through our encrypted payment gateway."
    },
    {
      question: "Are your prices affordable?",
      answer: "Yes, we strive to keep our prices affordable for students. Our rates are competitive and reflect the high quality of work from our expert writers. For the best price, we recommend placing your order with the longest possible deadline."
    }
  ];

  const securityQuestions = [
    {
      question: "Is my personal and payment information secure?",
      answer: "Yes, 100%. We use SSL encryption for all transactions, and we never share your personal or payment data with any third parties. Your identity and order details are kept completely confidential."
    },
    {
      question: "Can other users on your website view my details?",
      answer: "Absolutely not. Your account is private. All communication and order details are strictly between you and our staff."
    },
    {
      question: "What if I forget my account password?",
      answer: "If you forget your password, simply click the \"Forgot Password\" link on the login page. Follow the secure instructions to verify your identity, and a password reset link will be sent to your registered email address."
    },
    {
      question: "What is your privacy policy?",
      answer: "Our Privacy Policy clearly explains how your data is collected, stored, and used. It outlines your rights and the robust security measures we have in place. You can read it in full by clicking the link in our website footer."
    },
    {
      question: "Can my teacher tell that I used your service?",
      answer: "No. Our service is completely confidential. We use a unique ID system for all clients, so your personal information is never attached to the final product. The work we provide is 100% original and will pass any plagiarism check, ensuring your privacy."
    },
    {
      question: "Can I delete my account or papers from my account?",
      answer: "Yes. You have full control over your account. You can delete specific papers or your entire account at any time from your account settings. Please note that account deletion is permanent and cannot be undone."
    }
  ];

  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About Our Essay Service
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Welcome to the Essay Embassy FAQ page! Here you'll find answers to all your questions. Learn how our expert writers and dedicated support team make the process of getting academic help simple, safe, and effective.
          </p>
        </div>
      </section>

      {/* FAQ Sections with Pattern Background */}
      <div className="relative">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10">
          {/* General Questions */}
          <FAQSection
            title="General Questions"
            description="Our company provides premier academic services with guaranteed quality. This section addresses common questions about our functions and our commitment to you."
            questions={generalQuestions}
            openStates={generalOpenStates}
            setOpenStates={setGeneralOpenStates}
          />

          {/* Order & Delivery */}
          <FAQSection
            title="Order & Delivery"
            description="Curious about our ordering and delivery process? Here are the answers to ensure you know exactly how we get your perfect paper delivered right on time."
            questions={orderQuestions}
            openStates={orderOpenStates}
            setOpenStates={setOrderOpenStates}
          />

          {/* About Our Writers */}
          <FAQSection
            title="About Our Writers"
            description="Our team of talented writers are vetted experts in their fields. Let us answer your questions about their skills and how they provide the best possible help."
            questions={writersQuestions}
            openStates={writersOpenStates}
            setOpenStates={setWritersOpenStates}
          />

          {/* Quality & Satisfaction */}
          <FAQSection
            title="Quality & Satisfaction"
            description="We have a variety of guarantees to ensure you receive the high-quality paper you expect. Find out how we can help if you're not completely satisfied."
            questions={qualityQuestions}
            openStates={qualityOpenStates}
            setOpenStates={setQualityOpenStates}
          />

          {/* Pricing & Payment */}
          <FAQSection
            title="Pricing & Payment"
            description="Find clear, comprehensive information about our transparent pricing structure and secure payment process here."
            questions={pricingQuestions}
            openStates={pricingOpenStates}
            setOpenStates={setPricingOpenStates}
          />

          {/* Account Security */}
          <FAQSection
            title="Account Security"
            description="With online security as a top priority, we are dedicated to providing you with the utmost safety and protection. We understand your concerns and have answered them here."
            questions={securityQuestions}
            openStates={securityOpenStates}
            setOpenStates={setSecurityOpenStates}
          />
        </div>
      </div>

      {/* Final CTA Banner */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary-700 rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <GraduationCap className="w-32 h-32 text-white" />
              </div>
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How Our Service Should Be Used
                </h2>
                <p className="text-xl mb-6 text-primary-100">
                  The services provided by Essay Embassy are for research, reference, and informational purposes. The drafts we deliver for essays, case studies, and other projects are intended to help you with your studies and should not be submitted as your own final work.
                </p>
                <Link 
                  to="/order-now" 
                  className="inline-block bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Place Your Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ; 