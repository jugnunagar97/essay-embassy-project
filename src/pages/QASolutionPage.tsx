import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import visaIcon from '../../public/images/visa.svg';
import mastercardIcon from '../../public/images/mastercard.svg';
import amexIcon from '../../public/images/amex.svg';
import discoverIcon from '../../public/images/discover.svg';
import paypalIcon from '../../public/images/paypal.svg';
import stripeIcon from '../../public/images/stripe.svg';
import gpayIcon from '../../public/images/Gpay.svg';

const QASolutionPage: React.FC = () => {
  const { subject, id } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [solution, setSolution] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [similarSolutions, setSimilarSolutions] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!solution?.subject) return;
      const q = query(
        collection(db, 'qaLibrary'),
        where('subject', '==', solution.subject),
        where('status', '==', 'published')
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((item: any) => item.id !== solution.id);
      setSimilarSolutions(results);
    };
    fetchSimilar();
  }, [solution]);

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

  // Helper for price formatting
  const formatPrice = (price: number) => {
    return price ? `$${price.toFixed(2)}` : '$8.00';
  };

  // Fading mask style for solution preview
  const fadeMask = {
    WebkitMaskImage: 'linear-gradient(180deg, #000 60%, transparent 100%)',
    maskImage: 'linear-gradient(180deg, #000 60%, transparent 100%)',
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-8">
          {/* Question Header */}
          {solution.title && /<[^>]+>/.test(solution.title) ? (
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#212529] mb-4" style={{ lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: solution.title }} />
          ) : (
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#212529] mb-4" style={{ lineHeight: 1.2 }}>{solution.title}</h1>
          )}
          {/* Question Body */}
          <div className="border-t border-[#DEE2E6] pt-6 mb-8">
            <div className="text-base font-semibold text-[#28a745] mb-2">❓ Question</div>
            <div className="prose max-w-none text-[#212529] text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: solution.question }} />
          </div>
          {/* Solution Preview Block */}
          <div className="mb-12">
            <div className="text-base font-semibold text-[#28a745] mb-2">📋 Solution Preview</div>
            <div className="relative">
              <div
                className="bg-white border border-[#DEE2E6] rounded-xl p-6 text-[#212529] text-base leading-relaxed"
                style={{ height: 250, overflow: 'hidden', ...fadeMask }}
                dangerouslySetInnerHTML={{ __html: solution.answer }}
              />
              {/* Locked Overlay */}
              {!hasAccess && (
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end h-32 bg-gradient-to-t from-white/90 to-transparent rounded-b-xl">
                  <div className="flex items-center gap-2 text-lg font-bold text-[#212529] mb-2">
                    <span role="img" aria-label="lock">🔒</span> Unlock the rest of the answer
                  </div>
                  <button
                    className="bg-[#28a745] hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg shadow transition mt-2"
                    onClick={handleBuyNow}
                  >
                    Purchase Solution
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Sidebar (Right Column, Sticky) */}
        <aside className="lg:col-span-4 w-full lg:sticky lg:top-10">
          {/* Purchase Box */}
          <div className="bg-[#F8F9FA] border border-[#DEE2E6] rounded-2xl shadow p-6 mb-6">
            <div className="text-xs font-bold text-[#868e96] tracking-widest mb-2">PURCHASE SOLUTION</div>
            <div className="text-4xl font-extrabold text-[#212529] mb-2">{formatPrice(solution.price)}</div>
            <button
              className="w-full bg-[#28a745] hover:bg-green-600 text-white font-bold py-3 rounded-lg text-lg shadow transition mb-4"
              onClick={handleBuyNow}
            >
              Purchase Solution &gt;
            </button>
            <div className="flex items-center gap-2 mt-2">
              <img src={gpayIcon} alt="Google Pay" className="h-6" />
              <img src={visaIcon} alt="Visa" className="h-6" />
              <img src={mastercardIcon} alt="Mastercard" className="h-6" />
              <img src={amexIcon} alt="Amex" className="h-6" />
              <img src={discoverIcon} alt="Discover" className="h-6" />
              <img src={paypalIcon} alt="PayPal" className="h-6" />
              <img src={stripeIcon} alt="Stripe" className="h-6" />
            </div>
          </div>
          {/* Registration CTA Block */}
          <div className="bg-[#E6F4FF] border border-[#B6E0FE] rounded-2xl shadow p-6">
            <div className="text-lg font-bold text-[#212529] mb-1">New Here?</div>
            <div className="text-[#495057] mb-4">Create a free account to track your purchases, access exclusive discounts, and get personalized support.</div>
            <button className="w-full border-2 border-[#28a745] text-[#28a745] font-bold py-2 rounded-lg text-base hover:bg-[#28a745] hover:text-white transition"
              onClick={() => navigate('/register')}
            >
              Create a Free Account
            </button>
          </div>
        </aside>
      </div>
      {/* Similar Solutions Section */}
      <section className="w-full bg-white border-t border-[#DEE2E6] py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#212529] mb-6">Similar Homework Solutions</h2>
          <div className="relative">
            {/* Left Scroll Button */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#DEE2E6] rounded-full shadow p-2 hover:bg-[#F8F9FA] transition hidden md:block"
              style={{ marginLeft: -32 }}
              onClick={() => {
                const container = document.getElementById('similar-scroll');
                if (container) container.scrollBy({ left: -320, behavior: 'smooth' });
              }}
              aria-label="Scroll left"
            >
              <svg width="24" height="24" fill="none" stroke="#212529" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {/* Cards */}
            <div id="similar-scroll" className="flex gap-6 overflow-x-auto pb-2 scroll-smooth">
              {similarSolutions.length === 0 ? (
                <div className="text-gray-400 p-8">No similar solutions found.</div>
              ) : similarSolutions.map((item) => (
                <div key={item.id} className="min-w-[280px] max-w-xs bg-white border border-[#DEE2E6] rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col">
                  <span className="inline-block bg-[#E6F4FF] text-[#2563eb] text-xs font-semibold rounded-full px-3 py-1 mb-2 w-fit">{item.subject}</span>
                  <div className="font-bold text-lg text-[#212529] mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.title || item.question || 'Untitled' }} />
                  <div className="text-[#28a745] font-bold text-xl mb-4">{formatPrice(item.price)}</div>
                  <button className="mt-auto bg-[#28a745] hover:bg-green-600 text-white font-bold py-2 rounded-lg text-base transition" onClick={() => navigate(`/qa-library/${encodeURIComponent(item.subject.toLowerCase())}/${item.id}`)}>
                    View This Solution
                  </button>
                </div>
              ))}
            </div>
            {/* Right Scroll Button */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#DEE2E6] rounded-full shadow p-2 hover:bg-[#F8F9FA] transition hidden md:block"
              style={{ marginRight: -32 }}
              onClick={() => {
                const container = document.getElementById('similar-scroll');
                if (container) container.scrollBy({ left: 320, behavior: 'smooth' });
              }}
              aria-label="Scroll right"
            >
              <svg width="24" height="24" fill="none" stroke="#212529" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QASolutionPage;