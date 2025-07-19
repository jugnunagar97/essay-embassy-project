import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  BookOpen, 
  UserCheck, 
  CheckCircle, 
  XCircle, 
  Copy, 
  UserX,
  AlertTriangle,
  Lock,
  Clock,
  Headphones,
  GraduationCap,
  Eye,
  FileText,
  Users,
  Heart,
  Flag,
  Zap
} from 'lucide-react';

const HonorCode = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    {
      title: "A Reminder for Students",
      icon: <BookOpen className="text-primary-500" size={20} />,
      content: `Balancing a heavy course load is challenging, but violating your institution's honor code is never the right solution as it can jeopardize your entire academic career.

Essay Embassy strictly prohibits the use of our platform for any activity that violates the academic policies of your institution.

You must not submit any material provided by our experts as your own work. It is for reference and guidance only.`
    },
    {
      title: "A Reminder for Businesses",
      icon: <Users className="text-primary-500" size={20} />,
      content: `Essay Embassy provides professional writing from field experts to enhance your business communications. However, violating company policies is strongly discouraged and may result in termination or legal action.

Business representatives must not use our platform to engage in fraud, misrepresentation, or any other illegal activity.

Using our services to create falsified documents for any purpose is a terminable offense.`
    },
    {
      title: "A Reminder for Teachers & Schools",
      icon: <GraduationCap className="text-primary-500" size={20} />,
      content: `We respect and support the hard work educators do to maintain academic integrity. We see ourselves as partners in the educational process.

If you become aware of any student using our platform in a manner that constitutes cheating or violates academic integrity, please report it to us immediately. Your help is vital in keeping our platform ethical.`
    },
    {
      title: "A Reminder for Writing Experts",
      icon: <FileText className="text-primary-500" size={20} />,
      content: `As a writer on our platform, you are a representative of Essay Embassy's commitment to quality and ethics. You are required to adhere to our strict guidelines at all times.

You must respect all academic honesty policies and never assist a client in any action that could be considered cheating or fraud.

Engaging in or facilitating any form of academic dishonesty will result in immediate termination and a permanent ban from our platform.`
    }
  ];

  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Essay Embassy Honor Code
              </h1>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                At Essay Embassy, academic integrity isn't just a policy; it's the foundation of our service. This Honor Code outlines our unwavering commitment to ethical practices and the high standards of quality we demand from our writers, staff, and clients.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We hold every member of our community accountable to these principles. Our dedication to excellence ensures that we operate with transparency and trust, and we do not tolerate any deviation from this code.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <Shield className="w-32 h-32 text-primary-500 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Definition of Academic Integrity */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <BookOpen className="w-32 h-32 text-primary-500 mx-auto" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Defining Academic Integrity
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Academic integrity represents the core moral and ethical principles governing all scholarly work. It is built on a foundation of honesty, trust, fairness, respect, and responsibility in how knowledge is created, shared, and utilized.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                True academic integrity requires individuals to take full ownership of their work while properly acknowledging the contributions of others. This means rigorously avoiding plagiarism, data fabrication, falsification, and all other forms of academic dishonesty.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As a premier essay writing service, Essay Embassy champions these principles in all our practices. We actively encourage our clients to embrace and uphold these same values in their own academic careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Foundation of Our Honor Code
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We do not support or condone cheating in any form. Our platform is built on a commitment to upholding academic integrity and fostering honest learning.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <UserX className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Student Impersonation is Strictly Forbidden
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We understand students may need guidance with their academic workload. However, fraudulently using another person's identity is a serious breach of integrity that we will not tolerate. Our commitment to ethical service means any writer or client found engaging in impersonation or academic dishonesty will be removed from our platform immediately.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <UserCheck className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                How to Use Our Services Ethically
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our work is designed to be a powerful learning tool to enhance your skills. It should be used as a reference to guide your own research and writing, not as a final product to be submitted directly. By using our papers for inspiration and understanding, you maximize the educational benefit while fully protecting the integrity of your academic work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Never Tolerate */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            We Never Support or Tolerate
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cheating</h3>
              <p className="text-gray-700">
                Using our expert writers or any non-approved sources to gain an unfair advantage or complete assignments when expressly forbidden by an academic institution.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
              <Copy className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Plagiarism</h3>
              <p className="text-gray-700">
                The act of taking someone else's work, ideas, or words and presenting them as your own without providing proper credit or citation.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
              <UserX className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impersonation</h3>
              <p className="text-gray-700">
                Identity theft or academic fraud where an individual pretends to be another student or has someone else complete their work or exams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Policy Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Policy
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We reject any work that is dishonest or fraudulent. Integrity is a core company value, and we take swift action against any writers or clients found violating our policies.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tab Navigation */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {tabData.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {tab.icon}
                      <span className="font-medium">{tab.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[300px]">
                <div className="flex items-center space-x-3 mb-6">
                  {tabData[activeTab].icon}
                  <h3 className="text-xl font-bold text-gray-900">{tabData[activeTab].title}</h3>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {tabData[activeTab].content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guarantees */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Guarantees to You
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We are committed to providing high-quality, ethical work. We back this promise with the following guarantees:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
              <CheckCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                <strong>100% Plagiarism-Free:</strong> Every paper is written from scratch using authentic sources to guarantee originality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
              <Clock className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                <strong>Money-Back Guarantee:</strong> You are eligible for a refund if your order is not delivered within the agreed-upon timeframe.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
              <Lock className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                <strong>Confidentiality & Privacy:</strong> Your personal information is secure and will never be shared with third parties without your explicit consent.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
              <Headphones className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                <strong>24/7 Customer Support:</strong> Our live support team is available around the clock to ensure transparency and assist you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Restricted Activities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              List of Restricted Task Requests
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The following activities are strictly prohibited on the Essay Embassy platform for all clients, businesses, and writers. This list is not exhaustive and may be updated based on our Terms of Service.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Prohibited Activities for All Users
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Please be aware that engaging in any of these honor code breaches will result in an immediate account ban and forfeiture of any funds. These activities include:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Falsifying or fabricating financial reports or official documents.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Creating CVs or Resumes with false or misleading job experience.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Passing yourself off as another person or using someone else's identity.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Submitting work from our service as your own for academic credit.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Ghostwriting dissertations, theses, term papers, or other major academic works intended for direct submission.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Fabricating or falsifying data, citations, or sources for any academic or professional material.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Violations */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Call-to-Action Banner */}
          <div className="bg-primary-700 rounded-2xl p-8 mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <GraduationCap className="w-32 h-32 text-white" />
              </div>
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Have You Noticed a Breach of Our Honor Code?
                </h2>
                <p className="text-xl mb-6 text-primary-100">
                  Please submit a complaint so our team can investigate and take action immediately.
                </p>
                <Link to="/contact" className="inline-block bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Report an Issue
                </Link>
              </div>
            </div>
          </div>
          
          {/* Violation Details */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Report a Violation
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We strive to provide the best and most ethical service possible. If you see anything that doesn't seem right, please let us know so we can stop it from happening.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <XCircle className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Academic Cheating & Dishonesty</h4>
              <p className="text-gray-700">
                This includes providing or requesting pre-written assignments, taking an exam for someone, or any other form of academic fraud.
              </p>
            </div>
            
            <div className="text-center">
              <Lock className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Privacy & Confidentiality Breach</h4>
              <p className="text-gray-700">
                At Essay Embassy, data security is paramount. Report any attempt to solicit or share private client data like passwords or payment details.
              </p>
            </div>
            
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Illegal or Unethical Activities</h4>
              <p className="text-gray-700">
                Our writers and clients must follow all laws and company policies. They cannot engage in or request any work that is illegal.
              </p>
            </div>
            
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Hatred or Violence</h4>
              <p className="text-gray-700">
                We have a zero-tolerance policy for any content that promotes hatred, discrimination, or violence.
              </p>
            </div>
            
            <div className="text-center">
              <Copy className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Plagiarism</h4>
              <p className="text-gray-700">
                It is vital to give credit where it is due. Report any instance where work is being presented dishonestly as someone else's.
              </p>
            </div>
            
            <div className="text-center">
              <Flag className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Other Concerns</h4>
              <p className="text-gray-700">
                If you see any other suspicious behavior that is not listed here, please let us know so we can review the problem immediately.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HonorCode; 