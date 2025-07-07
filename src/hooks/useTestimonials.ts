import { useState } from 'react';
import { Testimonial } from '../types';

// Mock testimonials data with platform assignments
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'University Student',
    content: 'Essay Embassy helped me achieve my academic goals with their exceptional writing services. The quality exceeded my expectations and the support was outstanding!',
    rating: 5,
    platform: 'google',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Graduate Student',
    content: 'Professional, reliable, and high-quality work. The writers are truly experts in their fields. I received my dissertation chapter ahead of schedule.',
    rating: 5,
    platform: 'google',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'PhD Candidate',
    content: 'The research quality and attention to detail in my dissertation was outstanding. They saved me months of work and stress!',
    rating: 5,
    platform: 'trustpilot',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-08'
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'College Student',
    content: 'Amazing service! Got my essay done perfectly and on time. The customer support team was very helpful throughout the process.',
    rating: 5,
    platform: 'trustpilot',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-05'
  },
  {
    id: '5',
    name: 'Lisa Rodriguez',
    role: 'Master\'s Student',
    content: 'Excellent quality and fast delivery. The writer followed all my instructions perfectly. Highly recommend for academic writing needs.',
    rating: 4,
    platform: 'sitejabber',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-03'
  },
  {
    id: '6',
    name: 'David Thompson',
    role: 'Undergraduate',
    content: 'Great experience overall. The essay was well-researched and properly formatted. Will definitely use their services again.',
    rating: 4,
    platform: 'sitejabber',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-01'
  },
  {
    id: '7',
    name: 'Anna Martinez',
    role: 'Graduate Student',
    content: 'Outstanding service! The quality of writing was exceptional and the delivery was prompt. Customer service was very responsive.',
    rating: 5,
    platform: 'google',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2023-12-28'
  },
  {
    id: '8',
    name: 'Robert Kim',
    role: 'PhD Student',
    content: 'Impressed with the depth of research and analysis. The writer clearly understood the topic and delivered exactly what I needed.',
    rating: 5,
    platform: 'trustpilot',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2023-12-25'
  }
];

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: Date.now().toString()
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
    return newTestimonial;
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id ? { ...testimonial, ...updates } : testimonial
    ));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
  };

  return {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
  };
}