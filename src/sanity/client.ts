import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 't1gjjyza',
  dataset: 'production',
  useCdn: true, // Set to false if you want to use the live API
  apiVersion: '2023-05-03', // Use today's date to target the latest API version
  perspective: 'published', // Only get published content
});