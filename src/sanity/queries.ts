import { groq } from 'next-sanity';
import { client } from './client';

// Query to fetch all service pages
export const getAllServicePages = groq`
  *[_type == "servicePage"] {
    title,
    slug,
    heroHeading,
    heroDescription
  }
`;

// Query to fetch a single service page by slug
export const getServicePageBySlug = (slug: string) => groq`
  *[_type == "servicePage" && slug.current == "${slug}"][0] {
    title,
    slug,
    heroHeading,
    heroDescription,
    writersSectionTitle,
    writersSectionDescription,
    features[] {
      title,
      description,
      icon
    },
    pricingBase {
      highSchool {
        threeHours,
        sixHours,
        twelveHours,
        twentyFourHours,
        fortyEightHours,
        threeDays,
        fiveDays,
        sevenDays,
        tenDays,
        fourteenDays
      },
      college {
        threeHours,
        sixHours,
        twelveHours,
        twentyFourHours,
        fortyEightHours,
        threeDays,
        fiveDays,
        sevenDays,
        tenDays,
        fourteenDays
      },
      university {
        threeHours,
        sixHours,
        twelveHours,
        twentyFourHours,
        fortyEightHours,
        threeDays,
        fiveDays,
        sevenDays,
        tenDays,
        fourteenDays
      },
      phd {
        threeHours,
        sixHours,
        twelveHours,
        twentyFourHours,
        fortyEightHours,
        threeDays,
        fiveDays,
        sevenDays,
        tenDays,
        fourteenDays
      }
    },
    statistics[] {
      value,
      label
    },
    testimonialsTitle,
    samplesTitle,
    samplesDescription,
    samples[] {
      title,
      pages,
      level,
      type,
      citation,
      file
    },
    faq[] {
      question,
      answer
    },
    metaDescription,
    metaKeywords
  }
`;

// Function to fetch all service pages
export async function fetchAllServicePages() {
  return client.fetch(getAllServicePages);
}

// Function to fetch a single service page by slug
export async function fetchServicePageBySlug(slug: string) {
  return client.fetch(getServicePageBySlug(slug));
}