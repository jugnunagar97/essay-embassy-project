import { useEffect, useState } from 'react';
import { fetchServicePageBySlug } from '../sanity/queries';

interface ServicePageData {
  title: string;
  slug: {
    current: string;
  };
  heroHeading: string;
  heroDescription: string;
  writersSectionTitle?: string;
  writersSectionDescription?: string;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  pricingBase?: {
    highSchool: Record<string, number>;
    college: Record<string, number>;
    university: Record<string, number>;
    phd: Record<string, number>;
  };
  statistics?: Array<{
    value: string;
    label: string;
  }>;
  testimonialsTitle?: string;
  samplesTitle?: string;
  samplesDescription?: string;
  samples?: Array<{
    title: string;
    pages: number;
    level: string;
    type: string;
    citation: string;
    file: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  metaDescription?: string;
  metaKeywords?: string;
}

export function useServicePage(slug: string) {
  const [data, setData] = useState<ServicePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await fetchServicePageBySlug(slug);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return { data, loading, error };
}