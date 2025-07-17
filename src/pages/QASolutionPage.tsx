import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import 'react-quill/dist/quill.snow.css';
import { ArrowRight } from 'lucide-react';

interface QAEntry {
  id: string;
  title: string;
  question: string;
  answer: string;
  subject: string;
  price: number;
  files?: string[];
}

// Utility to strip HTML tags
function stripHtml(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

const QASolutionPage: React.FC = () => {
  const { subject, questionTitleId } = useParams<{ subject: string; questionTitleId: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<QAEntry | null>(null);
  const [related, setRelated] = useState<QAEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    async function fetchEntry() {
      setLoading(true);
      setError(null);
      try {
        console.log('questionTitleId:', questionTitleId);
        const docRef = doc(db, 'qaLibrary', questionTitleId!);
        console.log('docRef:', docRef);
        const docSnap = await getDoc(docRef);
        console.log('docSnap.exists():', docSnap.exists());
        if (!docSnap.exists()) {
          setError('Solution not found.');
          setLoading(false);
          return;
        }
        const data = docSnap.data();
        console.log('docSnap.data():', data);
        setEntry({ id: docSnap.id, ...data } as QAEntry);
        // Fetch related
        const q = query(
          collection(db, 'qaLibrary'),
          where('subject', '==', data.subject),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'),
          limit(6)
        );
        const relSnap = await getDocs(q);
        setRelated(relSnap.docs.filter(d => d.id !== docSnap.id).map(d => ({ id: d.id, ...d.data() } as QAEntry)));
      } catch (e) {
        console.error('Fetch error:', e);
        setError('Failed to load solution: ' + (e && e.message ? e.message : e));
      }
      setLoading(false);
    }
    if (questionTitleId) fetchEntry();
  }, [questionTitleId]);

  // REMOVE paywalled state and logic
  // Always render the full answer:
  // const handlePurchase = () => {
  //   setPaywalled(false);
  //   // In real app, redirect to checkout or integrate payment
  //   // navigate(`/checkout/${entry?.id}`);
  // };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-[60vh] flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: entry.title }} />
        <div className="mb-8">
          <div className="text-lg text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: entry.question }} />
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-start mb-6">
            <div className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z' /></svg>
              Solution
            </div>
            {!unlocked ? (
              <>
                <div className="text-gray-500 italic mb-4 w-full" style={{ filter: 'blur(3px)', minHeight: 40 }}>
                  {(() => {
                    const div = document.createElement('div');
                    div.innerHTML = entry.answer;
                    return (div.textContent || div.innerText || '').slice(0, 120) + '... (Unlock to view full answer)';
                  })()}
                </div>
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center text-lg shadow transition"
                  onClick={() => setUnlocked(true)}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z' /></svg>
                  Purchase Solution (${entry.price})
                </button>
              </>
            ) : (
              <div className="text-gray-800 prose prose-lg w-full" dangerouslySetInnerHTML={{ __html: entry.answer }} />
            )}
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-8">
          <span className="font-semibold">Subject:</span> {entry.subject} &nbsp;|&nbsp;
          <span className="font-semibold">Price:</span> ${entry.price}
        </div>
        {/* Related Questions */}
        <div className="mt-12">
          <div className="font-semibold mb-2 text-lg">Related Questions</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.length === 0 ? (
              <div className="text-gray-400 col-span-2">No related questions found.</div>
            ) : related.map(r => (
              <div key={r.id} className="bg-white shadow rounded p-4 flex flex-col justify-between">
                <div className="text-xs font-semibold text-gray-500 mb-1">{r.subject}</div>
                <div className="font-medium text-gray-800 mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: r.title }} />
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-blue-600 font-bold">${r.price}</span>
                  <a href={`/qa-library/${encodeURIComponent(r.subject.toLowerCase())}/${r.id}`} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">View</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <aside className="w-full lg:w-80 flex flex-col gap-6 h-fit sticky top-24">
        {/* Premium Paywall Widget */}
        {!unlocked && (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center mb-6">
            <div className="uppercase text-xs font-semibold tracking-widest text-gray-500 mb-2">Purchase Solution</div>
            <div className="text-4xl font-extrabold text-gray-900 mb-4">${entry.price}</div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center text-lg mb-4 shadow transition"
              onClick={() => setUnlocked(true)}
            >
              Purchase Solution
            </button>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {/* Local SVG payment icons, each in a larger uniform box, GPay removed */}
              <div className="bg-white rounded shadow p-1 flex items-center justify-center" style={{ width: 56, height: 40 }}>
                <img src="/images/visa.svg" alt="Visa" className="h-8 object-contain" />
              </div>
              <div className="bg-white rounded shadow p-1 flex items-center justify-center" style={{ width: 56, height: 40 }}>
                <img src="/images/mastercard.svg" alt="Mastercard" className="h-8 object-contain" />
              </div>
              <div className="bg-white rounded shadow p-1 flex items-center justify-center" style={{ width: 56, height: 40 }}>
                <img src="/images/amex.svg" alt="AMEX" className="h-8 object-contain" />
              </div>
              <div className="bg-white rounded shadow p-1 flex items-center justify-center" style={{ width: 56, height: 40 }}>
                <img src="/images/paypal.svg" alt="PayPal" className="h-8 object-contain" />
              </div>
              <div className="bg-white rounded shadow p-1 flex items-center justify-center" style={{ width: 56, height: 40 }}>
                <img src="/images/discover.svg" alt="Discover" className="h-8 object-contain" />
              </div>
              <div className="bg-white rounded shadow p-1 flex items-center justify-center" style={{ width: 56, height: 40 }}>
                <img src="/images/stripe.svg" alt="Stripe" className="h-8 object-contain" />
              </div>
            </div>
          </div>
        )}
        {/* Enhanced CTAs */}
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl text-center mb-2">
          <div className="font-bold text-gray-800 mb-1">Need a custom solution?</div>
          <div className="text-sm text-blue-700 mb-3">Submit your own question and get expert help fast.</div>
          <a href="/order-now" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold inline-block shadow">Ask a New Question</a>
        </div>
        <div className="p-5 bg-green-50 border border-green-200 rounded-xl text-center">
          <div className="font-bold text-green-700 mb-2 text-lg">Get 10% Off Your First Solution!</div>
          <div className="text-sm text-green-800 mb-3">Sign up now and receive a discount code for your first purchase.</div>
          <a href="/register" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-bold inline-block shadow">Sign Up & Save</a>
        </div>
      </aside>
    </div>
  );

  console.log('entry:', entry);

  // QAPage structured data (JSON-LD)
  const qaPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    'mainEntity': {
      '@type': 'Question',
      'name': entry.title,
      'text': entry.question,
      'answerCount': 1,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': entry.answer,
        'isPartOf': {
          '@type': 'WebPage',
          // REMOVE paywalled logic
          'url': window.location.href
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${entry.title} | ${entry.subject} Solution | Q&A Library`}</title>
        <meta name="description" content={`Get a detailed solution for: ${entry.title} (${entry.subject}). Pay-per-answer, instant download.`} />
        <script type="application/ld+json">{JSON.stringify(qaPageJsonLd)}</script>
      </Helmet>
      {/* Breadcrumb Navigation */}
      <nav className="max-w-6xl mx-auto py-4 text-sm text-gray-500">
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Home</span> &gt;{' '}
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/qa-library')}>Q&amp;A Library</span> &gt;{' '}
        <span className="capitalize">{entry.subject}</span> &gt;{' '}
        <span className="font-semibold">{entry.title}</span>
      </nav>

      <main className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Column: Content */}
        <section className="flex-1">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: entry.title }} />
          <div className="mb-6">
            {/* Question */}
            <div className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: entry.question }} />
          </div>
          <div className="mb-6 bg-gray-100 p-4 rounded">
            <div className="mb-2 font-semibold">Solution</div>
            {/* REMOVE paywalled logic */}
            <div className="text-gray-800 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: entry.answer }} />
            {entry.files && entry.files.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">Files included: {entry.files.join(', ')}</div>
            )}
          </div>
        </section>

        {/* Right Column: Purchase Sidebar */}
        <aside className="w-full lg:w-80 bg-white shadow rounded p-6 flex flex-col gap-4 sticky top-24 h-fit">
          <div className="text-3xl font-bold text-blue-600">${entry.price}</div>
          {/* REMOVE paywalled logic */}
          {/* <button className="bg-blue-600 text-white py-3 rounded font-semibold text-lg" onClick={handlePurchase}>Purchase Solution</button> */}
          {/* <button className="bg-green-600 text-white py-3 rounded font-semibold text-lg" disabled>Purchased ✓</button> */}
          <div className="flex gap-2 items-center mt-2">
            <span className="bg-gray-200 px-2 py-1 rounded text-xs">Stripe</span>
            <span className="bg-gray-200 px-2 py-1 rounded text-xs">PayPal</span>
            <span className="bg-gray-200 px-2 py-1 rounded text-xs">Visa</span>
            <span className="bg-gray-200 px-2 py-1 rounded text-xs">Mastercard</span>
            <span className="bg-gray-200 px-2 py-1 rounded text-xs">AMEX</span>
          </div>
          {/* CTA Block */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-center">
            <div className="font-semibold mb-1">Need a custom solution?</div>
            <div className="text-sm text-blue-700 mb-2">Submit your own question and get expert help fast.</div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold" onClick={() => navigate('/order-now')}>Ask a New Question</button>
          </div>
        </aside>
      </main>

      {/* Related Solutions Sidebar/Carousel */}
      <section className="max-w-6xl mx-auto mt-12 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="font-semibold mb-2">Similar Homework Solutions</div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {related.length === 0 ? (
              <div className="text-gray-400">No similar solutions found.</div>
            ) : related.map(r => (
              <div key={r.id} className="bg-white shadow rounded p-4 min-w-[220px] flex flex-col justify-between">
                <div className="text-xs font-semibold text-gray-500 mb-1">{r.subject}</div>
                <div className="font-medium text-gray-800 mb-2 line-clamp-2">{r.title}</div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-blue-600 font-bold">${r.price}</span>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={() => navigate(`/qa-library/${encodeURIComponent(r.subject.toLowerCase())}/${r.id}`)}>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Sidebar CTA for desktop */}
        <div className="hidden lg:block w-80">
          <div className="p-6 bg-green-50 border border-green-200 rounded shadow text-center">
            <div className="font-bold text-green-700 mb-2">Get 10% Off Your First Solution!</div>
            <div className="text-sm text-green-800 mb-3">Sign up now and receive a discount code for your first purchase.</div>
            <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold" onClick={() => navigate('/register')}>Sign Up & Save</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default QASolutionPage;