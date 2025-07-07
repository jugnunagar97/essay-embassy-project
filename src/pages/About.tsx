import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen } from 'lucide-react';

// You can replace these with actual team member photos later
const teamPhotos = [
  'https://placehold.co/150x150/EBF4FF/7C8B9E?text=E.C.',
  'https://placehold.co/150x150/EBF4FF/7C8B9E?text=J.D.',
  'https://placehold.co/150x150/EBF4FF/7C8B9E?text=M.C.',
];

const team = [
  { name: 'Dr. Emily Carter', role: 'Lead Writer, PhD in Literature', bio: 'With over 15 years of academic writing experience, Emily ensures every paper meets the highest standards of scholarship.', photo: teamPhotos[0] },
  { name: 'John Davis', role: 'Senior Editor, MA in Journalism', bio: 'John\'s keen eye for detail guarantees that every document is grammatically perfect and stylistically polished.', photo: teamPhotos[1] },
  { name: 'Dr. Michael Chen', role: 'STEM Specialist, PhD in Physics', bio: 'Michael heads our technical writing division, specializing in complex research papers for science and engineering.', photo: teamPhotos[2] },
];

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="bg-slate-50 dark:bg-slate-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="heading-lg mb-4">About Essay Embassy</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Your trusted partner in academic excellence. We are a dedicated team of professionals committed to your success.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <section className="section container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="heading-md">Our Mission & Values</h2>
            <p className="text-muted">
              At Essay Embassy, our mission is to provide students with the highest quality academic writing and editing services. We believe that every student deserves the chance to succeed, and we are here to provide the support and expertise needed to make that happen.
            </p>
            <p className="text-muted">
              Founded on principles of integrity, quality, and reliability, we strive to be more than just a service—we aim to be a partner in your educational journey.
            </p>
          </div>
          <div>
            <img 
              src="https://placehold.co/600x400/E2E8F0/4A5568?text=Our+Workspace" 
              alt="Our collaborative workspace" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-slate-50 dark:bg-slate-800">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-md">Why Choose Essay Embassy?</h2>
            <p className="text-muted mt-4">
              We provide a comprehensive, confidential, and expert-driven service designed for students who demand quality.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center p-8">
              <Award className="mx-auto h-12 w-12 text-primary-500 mb-4" />
              <h3 className="heading-sm mb-2">Expert Writers</h3>
              <p className="text-muted">All our writers hold Master’s or PhD degrees from top universities and are experts in their respective fields.</p>
            </div>
            <div className="card text-center p-8">
              <BookOpen className="mx-auto h-12 w-12 text-primary-500 mb-4" />
              <h3 className="heading-sm mb-2">100% Original Content</h3>
              <p className="text-muted">Every paper is written from scratch and meticulously checked with advanced plagiarism detection software.</p>
            </div>
            <div className="card text-center p-8">
              <Users className="mx-auto h-12 w-12 text-primary-500 mb-4" />
              <h3 className="heading-sm mb-2">24/7 Support</h3>
              <p className="text-muted">Our dedicated support team is available around the clock to assist you with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="section container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-md">Meet Our Core Team</h2>
          <p className="text-muted mt-4">
            Our strength lies in our team of dedicated professionals who bring a wealth of experience and passion to their work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="card text-center p-8">
              <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-200 dark:border-slate-700"/>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{member.name}</h3>
              <p className="text-primary-500 font-medium mb-2">{member.role}</p>
              <p className="text-muted">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-primary-500 text-white">
        <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Academic Goals?</h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">Let our experts provide the help you need. Place your order today and take the first step towards academic success.</p>
            <Link to="/order-now" className="btn-light">
              Order Now
            </Link>
        </div>
      </section>
    </div>
  );
};

export default About;