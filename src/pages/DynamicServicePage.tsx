import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { db, auth } from '../firebase';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import WritersCarousel from './Services/WritersCarousel';
import { ContentBlock, ContentBlockType, SubService } from '../types';
import type { AuthError } from 'firebase/auth';

type BlockComponentProps = {
  block: ContentBlock;
  service: SubService;
};

type HeroBlockData = {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  showOrderForm?: boolean;
};

type WritersBlockData = {
  title?: string;
  description?: string;
  subtitle?: string;
  logosImage?: string;
};

type WhyChooseUsItem = { title?: string; description?: string };
type WhyChooseUsBlockData = { title?: string; items?: WhyChooseUsItem[] };

type PricingBlockData = {
  title?: string;
  subtitle?: string;
  included?: string[];
  addOns?: string[];
};

type FAQItem = { question?: string; answer?: string };
type FAQBlockData = { title?: string; items?: FAQItem[] };

type StatItem = { value?: string; label?: string };
type StatsBlockData = { items?: StatItem[] };

type TestimonialItem = { quote?: string; name?: string; meta?: string; rating?: number; service?: string };
type TestimonialsBlockData = { title?: string; items?: TestimonialItem[] };

type StepItem = { title?: string; description?: string };
type StepsBlockData = { title?: string; steps?: StepItem[] };

type SampleItem = {
  title?: string;
  pages?: number;
  level?: string;
  type?: string;
  citation?: string;
};
type SamplesBlockData = {
  title?: string;
  description?: string;
  samples?: SampleItem[];
};

type TextBlockData = { title?: string; body?: string };

const priceConfig = {
  'High School': {
    '3 hours': { base: 18, urgent: 1.8 },
    '6 hours': { base: 16, urgent: 1.6 },
    '12 hours': { base: 14, urgent: 1.4 },
    '24 hours': { base: 12, urgent: 1.2 },
    '48 hours': { base: 12, urgent: 1.0 },
    '3 days': { base: 12, urgent: 1.0 },
    '5 days': { base: 12, urgent: 1.0 },
    '7 days': { base: 12, urgent: 1.0 },
    '10 days': { base: 12, urgent: 1.0 },
    '14 days': { base: 12, urgent: 1.0 },
  },
  College: {
    '3 hours': { base: 25, urgent: 1.8 },
    '6 hours': { base: 22, urgent: 1.6 },
    '12 hours': { base: 18, urgent: 1.4 },
    '24 hours': { base: 15, urgent: 1.2 },
    '48 hours': { base: 15, urgent: 1.0 },
    '3 days': { base: 15, urgent: 1.0 },
    '5 days': { base: 15, urgent: 1.0 },
    '7 days': { base: 15, urgent: 1.0 },
    '10 days': { base: 15, urgent: 1.0 },
    '14 days': { base: 15, urgent: 1.0 },
  },
  University: {
    '3 hours': { base: 28, urgent: 1.8 },
    '6 hours': { base: 25, urgent: 1.6 },
    '12 hours': { base: 21, urgent: 1.4 },
    '24 hours': { base: 18, urgent: 1.2 },
    '48 hours': { base: 18, urgent: 1.0 },
    '3 days': { base: 18, urgent: 1.0 },
    '5 days': { base: 18, urgent: 1.0 },
    '7 days': { base: 18, urgent: 1.0 },
    '10 days': { base: 18, urgent: 1.0 },
    '14 days': { base: 18, urgent: 1.0 },
  },
  PhD: {
    '3 hours': { base: 38, urgent: 1.8 },
    '6 hours': { base: 35, urgent: 1.6 },
    '12 hours': { base: 31, urgent: 1.4 },
    '24 hours': { base: 28, urgent: 1.2 },
    '48 hours': { base: 25, urgent: 1.0 },
    '3 days': { base: 25, urgent: 1.0 },
    '5 days': { base: 25, urgent: 1.0 },
    '7 days': { base: 25, urgent: 1.0 },
    '10 days': { base: 25, urgent: 1.0 },
    '14 days': { base: 25, urgent: 1.0 },
  },
} as const;

const academicLevels = ['High School', 'College', 'University', 'PhD'];
const deadlines = ['3 hours', '6 hours', '12 hours', '24 hours', '48 hours', '3 days', '5 days', '7 days', '10 days', '14 days'];

const DynamicServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<SubService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        const q = query(collection(db, 'subServices'), where('link', '==', slug), limit(1));
        const snap = await getDocs(q);
        if (snap.empty) {
          setService(null);
        } else {
          setService({ id: snap.docs[0].id, ...(snap.docs[0].data() as SubService) });
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Unable to load this service page.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7FAFC]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7FAFC] text-center px-4">
        <p className="text-xl font-semibold text-gray-800">{error || 'Service not found.'}</p>
        <Link to="/" className="mt-6 btn-primary">
          Back to home
        </Link>
      </div>
    );
  }

  const blocks = Array.isArray(service.contentBlocks) ? service.contentBlocks : [];
  const pageTitle = service.seoTitle || `${service.name} | Essay Embassy`;
  const pageDescription = service.seoDescription || service.description || `Get expert help with ${service.name}.`;
  const canonicalUrl = `https://essayembassy.com/services/${service.link}`;

  return (
    <div className="background-icons min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7FAFC' }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {blocks.length === 0 ? (
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
          <p className="text-gray-600">
            This service is being rebuilt with the new block system. In the meantime, please contact support for details.
          </p>
        </div>
      ) : (
        blocks.map((block) => {
          const Component = BLOCK_COMPONENTS[block.type] || TextBlock;
          return <Component key={block.id} block={block} service={service} />;
        })
      )}
    </div>
  );
};

type AcademicLevel = keyof typeof priceConfig;

const getPriceEntry = (level: string, deadline: string) => {
  const levelConfig = priceConfig[level as AcademicLevel];
  if (!levelConfig) return null;
  return levelConfig[deadline as keyof typeof levelConfig] ?? null;
};

const HeroBlock: React.FC<BlockComponentProps> = ({ block, service }) => {
  const data = (block.data || {}) as HeroBlockData;
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm<{
    academicLevel: string;
    pages: number;
    deadline: string;
  }>({
    defaultValues: {
      academicLevel: 'College',
      pages: 1,
      deadline: '48 hours',
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setIsLoggedIn(!!user));
    return () => unsubscribe();
  }, []);

  const watchedValues = watch();
  const price = useMemo(() => {
    const config = getPriceEntry(watchedValues.academicLevel, watchedValues.deadline);
    const base = config ? config.base : 0;
    return base * (watchedValues.pages || 1);
  }, [watchedValues.academicLevel, watchedValues.deadline, watchedValues.pages]);

  const onSubmit = (formData: { academicLevel: string; pages: number; deadline: string }) => {
    const params = new URLSearchParams({
      academicLevel: formData.academicLevel,
      pages: String(formData.pages),
      deadline: formData.deadline,
      service: service.name,
    });
    navigate(`/order-now?${params.toString()}`);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Signed in with Google!');
    } catch (error) {
      const authError = error as AuthError;
      if (authError.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = GoogleAuthProvider.credentialFromError(authError);
        const email = authError.customData?.email;
        if (email && pendingCred) {
          const password = window.prompt(`An account already exists with ${email}. Enter your password to link Google sign-in:`);
          if (!password) {
            return;
          }
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await linkWithCredential(userCredential.user, pendingCred);
            toast.success('Accounts linked successfully!');
          } catch (linkError) {
            const linkMessage = linkError instanceof Error ? linkError.message : 'Failed to link account.';
            toast.error(linkMessage);
          }
        }
      } else {
        const message = authError?.message || 'Google sign-in failed.';
        toast.error(message);
      }
    }
  };

  return (
    <section className="container mx-auto px-6 py-10 md:py-12 relative">
      <main className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          {data.badgeText && (
            <div className="inline-flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
              <span className="bg-white text-gray-800 rounded-full h-6 w-6 flex items-center justify-center mr-2">AI</span>
              {data.badgeText}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {data.title || service.name}
          </h1>
          <p className="text-lg text-gray-600">{data.subtitle || service.description}</p>
        </div>

        {(data.showOrderForm ?? true) && (
          <div className="bg-white p-8 rounded-2xl max-w-md mx-auto shadow-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Place an order</h2>
            {!isLoggedIn && (
              <div className="flex justify-center mb-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex items-center gap-2 border border-gray-300 rounded-lg py-2.5 px-6 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  <img src="/images/google logo.svg" alt="Google" className="h-5 w-5" />
                  Google
                </button>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium text-gray-700">Academic Level</label>
                <select {...register('academicLevel')} className="form-input mt-1">
                  {academicLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setValue('pages', Math.max(1, (watchedValues.pages || 1) - 1))}
                  className="px-4 py-2 text-2xl text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  -
                </button>
                <div className="text-center">
                  <input
                    type="number"
                    min={1}
                    {...register('pages', { valueAsNumber: true })}
                    className="text-lg font-semibold text-gray-800 w-16 text-center border-none outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setValue('pages', (watchedValues.pages || 1) + 1)}
                  className="px-4 py-2 text-2xl text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  +
                </button>
                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-md">
                  {(watchedValues.pages || 1) * 275} words
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Deadline</label>
                <select {...register('deadline')} className="form-input mt-1">
                  {deadlines.map((deadline) => (
                    <option key={deadline} value={deadline}>
                      {deadline}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-center justify-center mt-4">
                <span className="text-xs text-gray-500">From</span>
                <span className="font-bold text-2xl text-primary-600">${price.toFixed(2)}</span>
              </div>
              <button type="submit" className="w-full mt-6 btn-primary">
                Place your order
              </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-6">
              This site is protected by reCAPTCHA and the Google{' '}
              <Link to="/privacy-policy" className="text-primary-500 hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/terms-and-conditions" className="text-primary-500 hover:underline">
                Terms of Service
              </Link>{' '}
              apply.
            </p>
          </div>
        )}
      </main>
    </section>
  );
};

const WritersCarouselBlock: React.FC<BlockComponentProps> = ({ block }) => {
  const data = (block.data || {}) as WritersBlockData;
  return (
    <section className="w-full bg-[#F7FAFC] pt-8 pb-2">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{data.title || 'Meet Your Experts'}</h2>
        <p className="text-lg md:text-xl text-gray-700 mb-6">{data.description}</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
          <div className="text-base text-gray-600">{data.subtitle}</div>
          <div className="hidden md:block h-8 border-l border-emerald-400" />
          {data.logosImage && <img src={data.logosImage} alt="University logos" className="h-12" />}
        </div>
      </div>
      <div className="container mx-auto px-6 pb-10">
        <WritersCarousel />
      </div>
    </section>
  );
};

const FeaturesGridBlock: React.FC<BlockComponentProps> = ({ block }) => {
  const data = (block.data || {}) as WhyChooseUsBlockData;
  const items: WhyChooseUsItem[] = Array.isArray(data.items) ? data.items : [];
  return (
    <section className="w-full bg-[#F7FAFC] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-14 text-gray-900">{data.title || 'Why Choose Us'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white/30 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-3xl px-7 py-12 border border-white/40"
            >
              <div className="text-emerald-500 text-3xl mb-4">★</div>
              <div className="font-semibold text-lg text-gray-900 mb-2">{item?.title}</div>
              <div className="text-gray-500 text-base">{item?.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingTableBlock: React.FC<BlockComponentProps> = ({ block }) => {
  const data = (block.data || {}) as PricingBlockData;
  const included: string[] = Array.isArray(data.included) ? data.included : [];
  const addOns: string[] = Array.isArray(data.addOns) ? data.addOns : [];
  return (
    <section className="w-full bg-[#F7FAFC] py-12" id="pricing">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">{data.title || 'Prices & Services'}</h2>
        <p className="text-center text-lg text-gray-600 mb-10">{data.subtitle}</p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Included services</h3>
            <div className="text-gray-400 text-base mb-4">Always free</div>
            <div className="space-y-3 mt-6">
              {included.map((item: string, idx: number) => (
                <div key={idx} className="flex justify-between items-center font-semibold text-gray-800">
                  {item}
                  <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Free</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Add-ons</h3>
            <div className="text-gray-400 text-base mb-4">Optional upgrades</div>
            <div className="space-y-3 mt-6">
              {addOns.map((item: string, idx: number) => (
                <div key={idx} className="flex justify-between items-center font-semibold text-gray-800">
                  {item}
                  <span className="text-gray-500 text-sm">+cost</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQBlock: React.FC<BlockComponentProps> = ({ block }) => {
  const data = (block.data || {}) as FAQBlockData;
  const items: FAQItem[] = Array.isArray(data.items) ? data.items : [];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full bg-[#F7FAFC] py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">{data.title || 'Frequently Asked Questions'}</h2>
        <div className="space-y-3">
          {items.map((item: any, idx: number) => {
            const isOpen = open === idx;
            return (
              <div key={idx} className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-3 text-left"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <span className={`font-medium ${isOpen ? 'text-emerald-600' : 'text-gray-900'}`}>{item?.question}</span>
                  <span className="text-emerald-500">{isOpen ? '-' : '+'}</span>
                </button>
                <div className={`px-4 pb-4 text-gray-600 text-sm ${isOpen ? 'block' : 'hidden'}`}>{item?.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StatsRowBlock: React.FC<BlockComponentProps> = ({ block }) => {
  const data = (block.data || {}) as StatsBlockData;
  const items: StatItem[] = Array.isArray(data.items) ? data.items : [];
  return (
    <section className="w-full bg-[#F7FAFC] py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center items-stretch gap-4">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center text-center px-4 bg-white/80 rounded-xl shadow-md py-6"
          >
            <span className="text-3xl md:text-4xl font-bold text-emerald-500">{item?.value}</span>
            <span className="text-sm font-medium text-gray-500 mt-1">{item?.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsBlock: React.FC<BlockComponentProps> = ({ block }) => {
  const data = (block.data || {}) as TestimonialsBlockData;
  const items: TestimonialItem[] = Array.isArray(data.items) ? data.items : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items.length) return null;

  const goTo = (idx: number) => {
    if (idx < 0) idx = items.length - 1;
    if (idx > items.length - 1) idx = 0;
    setCurrentIndex(idx);
  };

  return (
    <section className="w-full py-24 bg-[#F7FAFC]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">{data.title || 'Client Testimonials'}</h2>
        <div className="relative flex items-center justify-center" style={{ minHeight: 340 }}>
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow"
          >
            ‹
          </button>
          <div className="w-full overflow-hidden flex items-center justify-center" style={{ minHeight: 320 }}>
            {items.map((t: any, idx: number) => {
              const offset = idx - currentIndex;
              const active = offset === 0;
              return (
                <div
                  key={t?.name + idx}
                  className={`bg-white rounded-2xl p-8 mx-2 shadow-xl transition-all duration-500 ease-in-out flex flex-col w-full max-w-xl absolute left-1/2 top-0 ${
                    active ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  style={{
                    transform: `translateX(-50%) scale(${active ? 1 : 0.9})`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-primary-700 text-lg">{t?.name || 'Client'}</div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= (t?.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-base mb-8">{t?.quote}</p>
                  <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <div className="font-bold text-gray-700 text-sm">Meta</div>
                      <div className="text-gray-600 text-sm">{t?.meta}</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-700 text-sm">Service</div>
                      <div className="text-gray-600 text-sm">{t?.service || 'Essay Help'}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow"
          >
            ›
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-primary-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepsBlock: React.FC<BlockComponentProps> = ({ block }) => {
  const data = (block.data || {}) as StepsBlockData;
  const steps: StepItem[] = Array.isArray(data.steps) ? data.steps : [];
  return (
    <section className="w-full bg-[#F7FAFC] py-12">
      <div className="max-w-md mx-auto px-4 bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">{data.title || 'How It Works'}</h2>
        <div className="flex flex-col items-center w-full">
          {steps.map((step: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center text-center mb-6">
              <span className="text-2xl mb-1">✍️</span>
              <div className="font-medium text-base md:text-lg text-gray-900 mb-1">
                {idx + 1}. {step?.title}
              </div>
              <div className="text-gray-500 text-sm">{step?.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SamplesBlock: React.FC<BlockComponentProps> = ({ block }) => {
  const data = (block.data || {}) as SamplesBlockData;
  const samples: SampleItem[] = Array.isArray(data.samples) ? data.samples : [];
  return (
    <section className="w-full py-10 px-2 bg-[#F7FAFC]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2 text-center">
          {data.title || 'See Real Admission Essay Examples'}
        </h2>
        <div className="border-b border-gray-200/70 w-16 mx-auto mb-6" />
        <p className="text-lg md:text-xl text-gray-500/90 font-light text-center max-w-2xl mx-auto mb-10">
          {data.description ||
            'Browse samples that secured admissions to top programs. Learn how the right narrative, structure, and tone can get you noticed.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {samples.map((sample, idx) => (
            <div key={idx} className="bg-white border border-blue-200 rounded-2xl shadow-sm p-6 flex flex-col min-h-[270px] text-left">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-red-100 rounded-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#EF4444" />
                      <text x="6" y="15" fontSize="9" fill="white" fontWeight="bold">
                        PDF
                      </text>
                    </svg>
                  </span>
                  <span className="font-bold text-gray-900 text-base">{sample?.title || `Sample ${idx + 1}`}</span>
                </div>
                <span className="text-gray-400 text-sm font-medium">{sample?.pages || 0} Pages</span>
              </div>
              <hr className="my-3 border-gray-200" />
              <div className="flex-1 flex flex-col gap-2 text-sm">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500 flex-shrink-0">Academic Level:</span>
                  <span className="font-bold text-gray-900 ml-2">{sample?.level}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-500 flex-shrink-0">Document Type:</span>
                  <span className="font-bold text-gray-900 ml-2">{sample?.type}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-500 flex-shrink-0">Citation Style:</span>
                  <span className="font-bold text-gray-900 ml-2">{sample?.citation}</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-full shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 text-left pl-6">
                Read
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TextBlock: React.FC<BlockComponentProps> = ({ block, service }) => {
  const data = (block.data || {}) as TextBlockData;
  return (
    <section className="w-full bg-[#F7FAFC] py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.title || service.name}</h2>
        {data.body ? (
          <div className="prose prose-lg max-w-none text-left md:text-justify text-gray-600" dangerouslySetInnerHTML={{ __html: data.body }} />
        ) : (
          <p className="text-gray-600 text-lg">{service.description}</p>
        )}
      </div>
    </section>
  );
};

const BLOCK_COMPONENTS: Record<ContentBlockType, React.FC<BlockComponentProps>> = {
  HERO: HeroBlock,
  WRITERS: WritersCarouselBlock,
  WRITERS_CAROUSEL: WritersCarouselBlock,
  WHY_CHOOSE_US: FeaturesGridBlock,
  FEATURES_GRID: FeaturesGridBlock,
  PRICING: PricingTableBlock,
  PRICING_TABLE: PricingTableBlock,
  FAQ: FAQBlock,
  STATS: StatsRowBlock,
  STATS_ROW: StatsRowBlock,
  TESTIMONIALS: TestimonialsBlock,
  STEPS: StepsBlock,
  SAMPLES: SamplesBlock,
  TEXT: TextBlock,
};

export default DynamicServicePage;

