import React, { useState } from 'react';
import { HelpCircle, Search, BookOpen, MessageCircle, Phone, Mail, FileText, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I place an order?',
      answer: 'To place an order, click on "Place New Order" in your dashboard, fill out the order form with your requirements, upload any necessary files, and proceed to payment. Our system will automatically assign a qualified writer to your order.',
      category: 'ordering'
    },
    {
      id: '2',
      question: 'What types of papers do you write?',
      answer: 'We write all types of academic papers including essays, research papers, dissertations, case studies, lab reports, and more. We cover all academic levels from high school to PhD.',
      category: 'services'
    },
    {
      id: '3',
      question: 'How do I track my order progress?',
      answer: 'You can track your order progress in the "My Orders" section of your dashboard. You\'ll receive email notifications for status updates and can communicate directly with your assigned writer.',
      category: 'tracking'
    },
    {
      id: '4',
      question: 'What if I need revisions?',
      answer: 'We offer unlimited free revisions within 14 days of delivery. Simply request revisions through your order page or contact support. We\'ll work with you until you\'re completely satisfied.',
      category: 'revisions'
    },
    {
      id: '5',
      question: 'How do I make a payment?',
      answer: 'We accept all major credit cards, PayPal, and other secure payment methods. Payment is required before work begins. You can pay through the secure payment portal in your dashboard.',
      category: 'payment'
    },
    {
      id: '6',
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your personal information. We never share your details with third parties and maintain strict confidentiality.',
      category: 'security'
    },
    {
      id: '7',
      question: 'What if I\'m not satisfied with my paper?',
      answer: 'If you\'re not satisfied, we offer unlimited revisions at no extra cost. If revisions don\'t meet your expectations, we provide a full refund within 7 days of delivery.',
      category: 'satisfaction'
    },
    {
      id: '8',
      question: 'How do I communicate with my writer?',
      answer: 'You can communicate with your writer through the messaging system in your order page. You can also use our live chat support for immediate assistance.',
      category: 'communication'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Topics', count: faqData.length },
    { key: 'ordering', label: 'Ordering', count: faqData.filter(f => f.category === 'ordering').length },
    { key: 'services', label: 'Services', count: faqData.filter(f => f.category === 'services').length },
    { key: 'tracking', label: 'Tracking', count: faqData.filter(f => f.category === 'tracking').length },
    { key: 'revisions', label: 'Revisions', count: faqData.filter(f => f.category === 'revisions').length },
    { key: 'payment', label: 'Payment', count: faqData.filter(f => f.category === 'payment').length },
    { key: 'security', label: 'Security', count: faqData.filter(f => f.category === 'security').length },
    { key: 'satisfaction', label: 'Satisfaction', count: faqData.filter(f => f.category === 'satisfaction').length },
    { key: 'communication', label: 'Communication', count: faqData.filter(f => f.category === 'communication').length },
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
            <p className="text-gray-600 dark:text-gray-400">Find answers to common questions and get support</p>
          </div>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/dashboard/chat"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
              <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Live Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get instant help</p>
            </div>
          </div>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Phone Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">support@essayembassy.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div key={faq.id} className="p-6">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="mt-4 pl-2">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Order Guidelines</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn how to place effective orders</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Sample Papers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">View examples of our work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
