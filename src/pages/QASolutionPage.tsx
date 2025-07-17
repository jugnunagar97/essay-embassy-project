import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const QASolutionPage: React.FC = () => {
  const { subject, id } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [solution, setSolution] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchSolution = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'qaLibrary', id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSolution({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error('Solution not found.');
          navigate('/qa-library');
        }
      } catch (err) {
        toast.error('Failed to load solution.');
      } finally {
        setLoading(false);
      }
    };
    fetchSolution();
  }, [id, navigate]);

  useEffect(() => {
    // Mock: allow access if redirected from Stripe success
    const params = new URLSearchParams(location.search);
    if (params.get('success') === '1' || params.get('session_id')) {
      setHasAccess(true);
      toast.success('Payment successful! Solution unlocked.');
    } else {
      setHasAccess(false);
    }
  }, [location.search]);

  const handleBuyNow = async () => {
    if (!user) {
      toast.error('Please log in to purchase this solution.');
      return;
    }
    toast.loading('Redirecting to payment...');
    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: solution.price || 1000, // fallback price for demo
          qaId: solution.id,
          userId: user.id,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to start payment.');
      }
    } catch (err) {
      toast.error('Payment error. Please try again.');
    } finally {
      toast.dismiss();
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!solution) return null;

  // Get a short preview of the answer (first 120 chars, strip HTML)
  const getPreview = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    return (div.textContent || div.innerText || '').slice(0, 120) + ((div.textContent && div.textContent.length > 120) ? '...' : '');
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* Title and Subject */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 drop-shadow-sm">{solution.title || 'Q&A Solution'}</h1>
      <div className="mb-4 text-sm text-green-700 font-semibold bg-green-50 inline-block px-3 py-1 rounded-full">{solution.subject}</div>
      {/* Question Block */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow border border-gray-100">
        <div className="text-lg font-bold mb-2 text-gray-800">Question</div>
        <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: solution.question || 'No question provided.' }} />
      </div>
      {/* Answer Block with Paywall */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow border border-gray-100 relative">
        <div className="text-lg font-bold mb-2 text-gray-800">Answer</div>
        {hasAccess ? (
          <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: solution.answer || 'No answer provided.' }} />
        ) : (
          <>
            <div className="prose max-w-none text-gray-500 blur-sm select-none pointer-events-none" dangerouslySetInnerHTML={{ __html: solution.answer || 'No answer provided.' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-yellow-50/90 border-2 border-yellow-200 rounded-2xl z-10">
              <div className="text-lg font-semibold mb-2 text-yellow-900">This solution is locked.</div>
              <div className="mb-4 text-yellow-800">Purchase to unlock the full answer.</div>
              <button
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition mb-2"
                onClick={handleBuyNow}
              >
                Purchase Solution
              </button>
              <a
                href={`/qa-library`}
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
              >
                Go Back to Library
              </a>
            </div>
          </>
        )}
      </div>
      {/* Widgets/CTAs */}
      <div className="my-8 flex gap-4">
        <button className="bg-green-100 text-green-800 px-4 py-2 rounded font-semibold">Ask a follow-up</button>
        <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded font-semibold">Share</button>
      </div>
      {/* Similar Questions */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Similar Questions</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-600">Similar questions will appear here.</div>
      </div>
    </div>
  );
};

export default QASolutionPage;