import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

// Define the type for our form inputs
type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // In a real app, you'd send this data to a backend API
    console.log('Form Data Submitted:', data);
    
    // Show a success message
    toast.success('Your message has been sent successfully!');
    
    // Reset the form after submission
    reset();
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="bg-slate-50 dark:bg-slate-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="heading-lg mb-4">Contact Us</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Have questions or ready to start an order? We're here to help, 24/7.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="section container">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* Contact Information Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="heading-md">Get in Touch</h2>
            <p className="text-muted">
              Use the details below to contact us directly or fill out the form and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-lg mr-4">
                  <MapPin className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">Our Address</h3>
                  <p className="text-muted">1309 Beacon Street, Suite 300, Brookline, MA, 02446</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-lg mr-4">
                  <Mail className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">Email Us</h3>
                  <a href="mailto:support@essayembassy.com" className="text-muted hover:text-primary-500">support@essayembassy.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-lg mr-4">
                  <Phone className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">Call Us</h3>
                  <p className="text-muted">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-3 card p-8">
            <h2 className="heading-md mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="form-input"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="form-input"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Entered value does not match email format'
                    } 
                  })}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g., Question about my order"
                  className="form-input"
                  {...register('subject', { required: 'Subject is required' })}
                />
                {errors.subject && <p className="form-error">{errors.subject.message}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your message..."
                  className="form-input"
                  {...register('message', { required: 'Message is required' })}
                ></textarea>
                {errors.message && <p className="form-error">{errors.message.message}</p>}
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;