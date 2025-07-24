import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

// FAQAccordion component for the FAQ section
const FAQAccordion: React.FC = () => {
  const faqs = [
    {
      question: 'What is the Q&A Library?',
      answer:
        'The Q&A Library is a curated collection of expertly solved homework questions across a wide range of subjects and paper types. You can search, preview, and purchase solutions instantly.',
    },
    {
      question: 'How do I purchase a solution?',
      answer:
        'Simply search for your question, select the solution you need, and follow the checkout process. Once your purchase is complete, you will have instant access to the full solution.',
    },
    {
      question: 'Are the solutions reviewed for quality?',
      answer:
        'Yes! All solutions are reviewed by our academic team to ensure accuracy, clarity, and educational value before being added to the library.',
    },
    {
      question: 'Can I request a refund if I am not satisfied?',
      answer:
        'We offer a satisfaction guarantee. If you believe a solution does not meet our quality standards, please contact support within 7 days for assistance or a possible refund.',
    },
    {
      question: 'Is my payment information secure?',
      answer:
        'Absolutely. We use industry-leading security protocols to protect your payment and personal information at all times.',
    },
  ];

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      {faqs.map((faq, idx) => (
        <div key={idx}>
          <div
            className="flex justify-between items-center cursor-pointer border-b"
            style={{
              borderColor: '#E9ECEF',
              padding: '20px 0',
              userSelect: 'none',
            }}
            onClick={() => handleToggle(idx)}
            aria-expanded={openIndex === idx}
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') handleToggle(idx);
            }}
            role="button"
          >
            <span
              className="font-medium"
              style={{ fontSize: 18, color: '#212529', fontWeight: 500 }}
            >
              {faq.question}
            </span>
            <span
              className="transition-transform duration-300"
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#2563eb',
                transform: openIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
              aria-label={openIndex === idx ? 'Collapse' : 'Expand'}
            >
              +
            </span>
          </div>
          <div
            style={{
              maxHeight: openIndex === idx ? 500 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
              padding: openIndex === idx ? '16px 5px 24px 5px' : '0 5px',
              fontSize: 16,
              color: '#6C757D',
              lineHeight: 1.6,
              background: 'transparent',
            }}
            aria-hidden={openIndex !== idx}
          >
            {openIndex === idx && (
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const QALibrary: React.FC = () => {
  const [qaEntries, setQaEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaperType, setSelectedPaperType] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filtered entries (move this up)
  const filteredEntries = useMemo(() => qaEntries.filter(entry => {
    const matchesPaperType = selectedPaperType ? entry.paperType === selectedPaperType : true;
    const matchesSubject = selectedSubject ? entry.subject === selectedSubject : true;
    const matchesSearch = search ? (
      (entry.title && entry.title.toLowerCase().includes(search.toLowerCase())) ||
      (entry.question && entry.question.toLowerCase().includes(search.toLowerCase()))
    ) : true;
    return matchesPaperType && matchesSubject && matchesSearch;
  }), [qaEntries, selectedPaperType, selectedSubject, search]);

  const totalPages = Math.ceil(filteredEntries.length / pageSize);
  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEntries.slice(start, start + pageSize);
  }, [filteredEntries, currentPage]);

  useEffect(() => {
    const q = query(
      collection(db, 'qaLibrary'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setQaEntries(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
      setError(null);
    }, () => {
      setError('Failed to load Q&A entries.');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Extract unique paper types and subjects
  const paperTypes = useMemo(() => Array.from(new Set(qaEntries.map(e => e.paperType).filter(Boolean))), [qaEntries]);
  const subjects = useMemo(() => Array.from(new Set(qaEntries.map(e => e.subject).filter(Boolean))), [qaEntries]);

  return (
    <>
      {/* Hero Section with 3D-inspired gradient and overlay */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[340px] w-full"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #2563eb 60%, #312e81 100%)',
          overflow: 'hidden',
        }}
      >
        {/* 3D Glow/Spotlight Effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '300px',
              height: '180px',
              background: 'radial-gradient(circle, #60a5fa55 0%, transparent 80%)',
              filter: 'blur(32px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '15%',
              width: '220px',
              height: '120px',
              background: 'radial-gradient(circle, #818cf855 0%, transparent 80%)',
              filter: 'blur(28px)',
            }}
          />
        </div>
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center pt-12 pb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 drop-shadow-lg">Q&amp;A Library</h1>
          <p className="text-lg md:text-xl text-white mb-8" style={{ opacity: 0.9 }}>
            Browse thousands of expertly solved homework questions. Search by keyword, paper type, or subject to find exactly what you need.
          </p>
          {/* Filter Bar - floating effect */}
          <div className="w-full max-w-4xl mx-auto -mb-16">
            <div className="bg-white/95 rounded-2xl shadow-2xl px-6 py-4 flex flex-col md:flex-row gap-4 items-center relative z-20 border border-gray-200 backdrop-blur-md">
              <input
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Search questions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                className="border border-gray-200 rounded-lg px-4 py-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                value={selectedPaperType}
                onChange={e => setSelectedPaperType(e.target.value)}
              >
                <option value="">Select a Paper Type</option>
                {paperTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                className="border border-gray-200 rounded-lg px-4 py-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
              >
                <option value="">Select a Subject</option>
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold shadow-md transition">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to offset the floating filter bar */}
      <div className="h-16" />

      {/* Results Count */}
      <section className="max-w-6xl mx-auto mb-2">
        <div className="text-sm text-gray-500 mb-2">
          {loading ? 'Loading solutions...' : error ? error : `Showing ${filteredEntries.length} solution${filteredEntries.length !== 1 ? 's' : ''}`}
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-400">Loading...</div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-500">{error}</div>
          ) : paginatedEntries.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-400">No Q&A solutions found.</div>
          ) : paginatedEntries.map(entry => {
            // Get a short preview from question or answer
            const preview = (() => {
              const div = document.createElement('div');
              div.innerHTML = entry.question || entry.answer || '';
              return (div.textContent || div.innerText || '').slice(0, 120) + (div.textContent && div.textContent.length > 120 ? '...' : '');
            })();
            return (
              <div
                key={entry.id}
                className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-xl border border-gray-100"
                style={{ minHeight: 220 }}
              >
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full mb-1 w-fit">{entry.subject || 'Subject'}</span>
                <div className="font-bold text-lg text-gray-900 mb-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: entry.title || entry.question || 'Untitled' }} />
                <div className="text-gray-500 text-sm mb-2 line-clamp-2" title={preview}>{preview}</div>
                <div className="flex items-center justify-between mt-auto gap-2">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold text-base rounded-full px-3 py-1 shadow-sm">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4' /></svg>
                    {entry.price ? `$${entry.price}` : ''}
                  </span>
                  <Link
                    to={`/qa-library/${entry.subject ? encodeURIComponent(entry.subject.toLowerCase()) : 'general'}/${entry.id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition"
                  >
                    View This Solution
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 ml-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {/* Pagination (future) */}
        <div className="flex justify-center gap-2 mb-12">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-green-600 text-white border-green-600 font-bold' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'}`}
              onClick={() => setCurrentPage(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Value Proposition Section */}
        <section className="w-full bg-[#F8F9FA] py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {/* Box 1 */}
            <div className="flex flex-col items-center text-center px-4">
              {/* Icon: Book/Document */}
              <svg width="48" height="48" fill="none" stroke="#2563eb" strokeWidth="2.2" viewBox="0 0 48 48" className="mb-4">
                <rect x="8" y="8" width="32" height="32" rx="6" stroke="#2563eb" fill="#e0e7ff" />
                <path d="M16 20h16M16 28h16M16 24h10" stroke="#2563eb" strokeLinecap="round" />
              </svg>
              <h3 className="text-xl font-bold text-[#212529] mb-2">Solutions at your fingertips</h3>
              <p className="text-base text-[#6C757D]">Access a vast library of expertly solved homework questions, available instantly whenever you need them.</p>
            </div>
            {/* Box 2 */}
            <div className="flex flex-col items-center text-center px-4">
              {/* Icon: Shield/Check */}
              <svg width="48" height="48" fill="none" stroke="#2563eb" strokeWidth="2.2" viewBox="0 0 48 48" className="mb-4">
                <path d="M24 6l16 6v8c0 10.5-7.5 18.5-16 22-8.5-3.5-16-11.5-16-22V12l16-6z" fill="#e0f2fe" stroke="#2563eb" />
                <path d="M18 24l4 4 8-8" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="text-xl font-bold text-[#212529] mb-2">Trusted & Secure</h3>
              <p className="text-base text-[#6C757D]">Purchase with confidence. All solutions are reviewed for quality and your transactions are protected by industry-leading security.</p>
            </div>
            {/* Box 3 */}
            <div className="flex flex-col items-center text-center px-4">
              {/* Icon: Lightning/Speed */}
              <svg width="48" height="48" fill="none" stroke="#2563eb" strokeWidth="2.2" viewBox="0 0 48 48" className="mb-4">
                <path d="M24 4L12 26h9l-3 18 15-24h-9l3-16z" fill="#f0fdf4" stroke="#2563eb" />
              </svg>
              <h3 className="text-xl font-bold text-[#212529] mb-2">Instant Access</h3>
              <p className="text-base text-[#6C757D]">Get immediate access to your purchased solutions and files—no waiting, no hassle, just results.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          style={{ backgroundColor: '#F8F9FA', padding: '80px 0' }}
          className="w-full"
        >
          <div
            className="mx-auto rounded-lg shadow-none"
            style={{ backgroundColor: '#fff', maxWidth: 800 }}
          >
            <div className="text-center" style={{ padding: '0 24px' }}>
              <span
                className="inline-block mb-4 font-bold uppercase"
                style={{ fontSize: 14, color: '#2563eb', letterSpacing: 1 }}
              >
                FAQ
              </span>
              <h2
                className="font-bold mb-12"
                style={{ fontSize: 36, color: '#212529' }}
              >
                Frequently Asked Questions
              </h2>
            </div>
            <div style={{ padding: '0 24px' }}>
              <FAQAccordion />
            </div>
          </div>
        </section>

        {/* Submit Your Homework CTA Section */}
        <section
          style={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            backgroundColor: '#147873',
            backgroundImage:
              'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.07) 1px, transparent 80%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.04) 1px, transparent 80%)',
            padding: '100px 0',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h1
              style={{
                fontSize: 42,
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: 16,
              }}
            >
              Submit Your Homework
            </h1>
            <p
              style={{
                fontSize: 18,
                color: '#E0E0E0',
                maxWidth: 600,
                margin: '0 auto 32px auto',
              }}
            >
              Let us help you with your homework, we will match you with one of our professional tutors.
            </p>
            <Link
              to="/order-now"
              style={{
                display: 'inline-block',
                backgroundColor: '#fff',
                color: '#147873',
                border: '2px solid #147873',
                padding: '16px 32px',
                fontSize: 18,
                fontWeight: 'bold',
                borderRadius: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(20,120,115,0.08)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#147873';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#147873';
              }}
            >
              Submit My Homework
            </Link>
          </div>
        </section>
      </section>
    </>
  );
};

export default QALibrary; 