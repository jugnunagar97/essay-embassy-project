// src/pages/Services/DynamicServicePage.tsx

import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { SubService } from '../../types'; // Assuming SubService type is defined in types.ts
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { Helmet } from 'react-helmet-async'; // For SEO meta tags
import ReactQuill from 'react-quill'; // For rendering rich text content
import 'react-quill/dist/quill.bubble.css'; // Use 'bubble' theme for display, or 'snow' if you prefer

// Lucide React Icons for FAQs
import { PlusCircle, MinusCircle } from 'lucide-react';

export default function DynamicServicePage() {
  const { slug } = useParams<{ slug: string }>(); // Get the URL slug from the route parameters
  const [service, setService] = useState<SubService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null); // State for active FAQ in accordion

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) {
        setError("Service slug is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setService(null); // Clear previous service data

      try {
        // Query the 'subServices' collection for a document matching the slug
        const q = query(collection(db, 'subServices'), where('link', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // If a service is found, set it to state
          const serviceData = querySnapshot.docs[0].data() as SubService;
          setService({ ...serviceData, id: querySnapshot.docs[0].id });
        } else {
          // If no service found for the slug, set error
          setError("Service page not found.");
        }
      } catch (err: any) {
        console.error("Error fetching service page:", err);
        setError(`Failed to load service page: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [slug]); // Re-run effect if slug changes

  // Toggle FAQ accordion
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    // If service not found, navigate to a 404 page or home.
    // For now, we'll just show an error message.
    // In a real app, you might use <Navigate to="/404" replace />
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-red-500 p-8 text-center">
        <p className="text-xl">{error}</p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Please check the URL or return to the <a href="/" className="text-primary-500 hover:underline">homepage</a>.</p>
      </div>
    );
  }

  if (!service || !service.isActive) { // Also check if service is active
    // If service is null (not found) or inactive, redirect to home or 404
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12 lg:py-16">
      {/* Helmet for SEO */}
      <Helmet>
        <title>{service.seoTitle || service.name || "Essay Embassy Service"}</title>
        <meta name="description" content={service.seoDescription || service.description || "Learn more about our academic writing services."} />
        {/* Add other meta tags like og:title, og:description, etc. if needed */}
      </Helmet>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Image */}
        {service.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={service.featuredImage}
              alt={service.name || "Service Featured Image"}
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}

        {/* Service Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {service.name}
        </h1>

        {/* Short Description */}
        {service.description && (
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {service.description}
          </p>
        )}

        {/* Main Content (Rich Text) */}
        {service.content && (
          <div className="prose dark:prose-invert max-w-none mb-12">
            {/* ReactQuill is used here to safely render HTML content */}
            <ReactQuill
              value={service.content}
              readOnly={true}
              theme="bubble"
              modules={{}} // Empty modules to disable toolbar
            />
          </div>
        )}

        {/* FAQs Section */}
        {(service.faqs && service.faqs.length > 0) && (
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <button
                    className="flex justify-between items-center w-full p-5 text-left font-semibold text-lg text-gray-900 dark:text-white"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    {activeFaq === index ? (
                      <MinusCircle size={20} className="text-primary-500" />
                    ) : (
                      <PlusCircle size={20} className="text-primary-500" />
                    )}
                  </button>
                  {activeFaq === index && (
                    <div className="p-5 pt-0 text-gray-700 dark:text-gray-300">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}