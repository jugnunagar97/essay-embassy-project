import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Mail, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { apiEndpoint } from '../config/api';

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await fetch(apiEndpoint('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Your message has been sent successfully!');
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const reviews = [
    { rating: 5, isVerified: true, title: 'Double Success', text: 'We used IvyWise for both of our children, who went through the college admissions pro...', author: 'UK Parent', date: 'December 22, 2023' },
    { rating: 5, isVerified: true, title: 'Great experience!', text: 'Helped me so much with the college admissions process, especially Round Table! My cou...', author: 'SR', date: 'November 4, 2024' },
    { rating: 4, isVerified: true, title: 'Wonderful Dedicated Team', text: 'The entire IvyWise team was fully dedicated and driven to give our daughter getting i...', author: 'AS', date: 'January 2, 2025' },
    { rating: 5, isVerified: true, title: 'Amazing Support', text: 'The support team was always there to answer my questions and guide me through the process.', author: 'Emily R.', date: 'March 15, 2024' },
    { rating: 4, isVerified: false, title: 'Solid Service', text: 'I got the help I needed, but the process could have been a bit faster.', author: 'John D.', date: 'April 10, 2023' },
    { rating: 5, isVerified: true, title: 'Highly Recommend', text: 'My essay was delivered on time and exceeded my expectations.', author: 'Priya S.', date: 'May 22, 2025' },
    { rating: 5, isVerified: true, title: 'Professional Writers', text: 'The writer assigned to me was very professional and knowledgeable.', author: 'Carlos M.', date: 'June 8, 2024' },
    { rating: 4, isVerified: false, title: 'Good but Pricey', text: 'The service is good, but I wish it was a bit more affordable.', author: 'Lina', date: 'July 19, 2023' },
    { rating: 5, isVerified: true, title: 'Life Saver!', text: 'I was running out of time and this service saved my grade.', author: 'M. Chen', date: 'August 2, 2024' },
    { rating: 5, isVerified: true, title: 'Top Notch', text: 'The quality of writing was top notch and the customer service was excellent.', author: 'Olga V.', date: 'September 12, 2025' },
    { rating: 4, isVerified: true, title: 'Very Helpful', text: 'The feedback I received was very helpful for my next assignment.', author: 'Samir', date: 'October 5, 2023' },
    { rating: 5, isVerified: true, title: 'Fast and Reliable', text: 'I got my paper quickly and it was exactly what I needed.', author: 'Ava T.', date: 'November 18, 2024' },
    { rating: 5, isVerified: true, title: 'Great Communication', text: 'The writer communicated with me throughout the process.', author: 'Ben K.', date: 'December 1, 2023' },
    { rating: 4, isVerified: false, title: 'Good Experience', text: 'Overall a good experience, but there was a small delay.', author: 'Nina', date: 'January 14, 2025' },
    { rating: 5, isVerified: true, title: 'Exceeded Expectations', text: 'The essay was better than I expected. Thank you!', author: 'Lucas P.', date: 'February 9, 2024' },
    { rating: 5, isVerified: true, title: 'Will Use Again', text: 'I will definitely use this service again for future assignments.', author: 'Sophie L.', date: 'March 27, 2025' },
    { rating: 4, isVerified: true, title: 'Nice Service', text: 'Nice service, but the price was a bit high for me.', author: 'Ahmed', date: 'April 21, 2023' },
    { rating: 5, isVerified: true, title: 'Impressive Results', text: 'The results were impressive and the process was smooth.', author: 'Julia F.', date: 'May 30, 2024' },
    { rating: 5, isVerified: true, title: 'Friendly Staff', text: 'The staff was friendly and always ready to help.', author: 'Tom S.', date: 'June 14, 2025' },
    { rating: 4, isVerified: false, title: 'Decent', text: 'Decent service, but could use more payment options.', author: 'Ravi', date: 'July 3, 2024' },
    { rating: 5, isVerified: true, title: 'Superb Quality', text: 'The quality of the essay was superb and plagiarism-free.', author: 'Ella W.', date: 'August 25, 2023' },
    { rating: 5, isVerified: true, title: 'Very Satisfied', text: 'I am very satisfied with the service and the results.', author: 'George B.', date: 'September 7, 2024' },
    { rating: 4, isVerified: true, title: 'Met My Needs', text: 'The service met my needs, but the interface could be improved.', author: 'Isabel', date: 'October 29, 2025' },
    { rating: 5, isVerified: true, title: 'Fantastic!', text: 'Fantastic service and great results every time.', author: 'Victor', date: 'November 16, 2023' },
    { rating: 5, isVerified: true, title: 'Easy to Use', text: 'The website is easy to use and the process is straightforward.', author: 'Daria', date: 'December 3, 2024' },
    { rating: 4, isVerified: false, title: 'Could Be Better', text: 'Could be better, but overall I am happy with the outcome.', author: 'Leo', date: 'January 20, 2025' },
    { rating: 5, isVerified: true, title: 'Outstanding', text: 'Outstanding service and very professional writers.', author: 'Maya', date: 'February 11, 2023' },
    { rating: 5, isVerified: true, title: 'Quick Turnaround', text: 'Quick turnaround and high quality work.', author: 'Oscar', date: 'March 8, 2024' },
    { rating: 4, isVerified: true, title: 'Good Value', text: 'Good value for the price, would recommend.', author: 'Sana', date: 'April 17, 2025' },
    { rating: 5, isVerified: true, title: 'Perfect!', text: 'Everything was perfect from start to finish.', author: 'Yuki', date: 'May 2, 2023' },
  ];

  useEffect(() => {
    const viewport = document.getElementById('testimonial-carousel-viewport');
    if (!viewport) return;
    
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    
    function handleMouseDown(e: MouseEvent) {
      isDown = true;
      startX = e.pageX - viewport!.offsetLeft;
      scrollLeft = viewport!.scrollLeft;
      viewport!.classList.add('cursor-grabbing');
      viewport!.style.cursor = 'grabbing';
    }
    function handleMouseLeave() { 
      isDown = false; 
      viewport!.classList.remove('cursor-grabbing');
      viewport!.style.cursor = 'grab';
    }
    function handleMouseUp() { 
      isDown = false; 
      viewport!.classList.remove('cursor-grabbing');
      viewport!.style.cursor = 'grab';
    }
    function handleMouseMove(e: MouseEvent) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - viewport!.offsetLeft;
      const walk = (x - startX) * 1.5;
      viewport!.scrollLeft = scrollLeft - walk;
    }
    
    function handleTouchStart(e: TouchEvent) {
      isDown = true;
      startX = e.touches[0].pageX - viewport!.offsetLeft;
      scrollLeft = viewport!.scrollLeft;
    }
    function handleTouchMove(e: TouchEvent) {
      if (!isDown) return;
      const x = e.touches[0].pageX - viewport!.offsetLeft;
      const walk = (x - startX) * 1.5;
      viewport!.scrollLeft = scrollLeft - walk;
    }
    function handleTouchEnd() {
      isDown = false;
    }
    
    viewport.style.cursor = 'grab';
    viewport.addEventListener('mousedown', handleMouseDown);
    viewport.addEventListener('mouseleave', handleMouseLeave);
    viewport.addEventListener('mouseup', handleMouseUp);
    viewport.addEventListener('mousemove', handleMouseMove);
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      viewport.removeEventListener('mousedown', handleMouseDown);
      viewport.removeEventListener('mouseleave', handleMouseLeave);
      viewport.removeEventListener('mouseup', handleMouseUp);
      viewport.removeEventListener('mousemove', handleMouseMove);
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchmove', handleTouchMove);
      viewport.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us | Essay Embassy</title>
        <meta
          name="description"
          content="Get in touch with Essay Embassy. We're here to help with your academic writing needs. Contact us 24/7 for support and questions."
        />
        <link rel="canonical" href="https://essayembassy.com/contact" />
      </Helmet>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="bg-slate-50 dark:bg-slate-800 py-8 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:heading-lg mb-3 md:mb-4 font-bold">Contact Us</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto px-2">
              Have questions or ready to start an order? We're here to help, 24/7.
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="section container px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-6 md:gap-12">

            {/* Contact Information Column */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">Get in Touch</h2>
              <p className="text-sm md:text-base text-muted">
                Use the details below to contact us directly or fill out the form and we'll get back to you as soon as possible.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-primary-900/20 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                    <MapPin className="text-primary-500" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base text-slate-800 dark:text-white mb-1">Our Address</h3>
                    <p className="text-xs md:text-sm text-muted break-words">1309 Beacon Street, Suite 300, Brookline, MA, 02446</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-primary-900/20 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                    <Mail className="text-primary-500" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base text-slate-800 dark:text-white mb-1">Email Us</h3>
                    <a href="mailto:essayembassy@gmail.com" className="text-xs md:text-sm text-muted hover:text-primary-500 break-all">essayembassy@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-3 card p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                <div>
                  <label htmlFor="name" className="form-label text-sm md:text-base">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="form-input text-sm md:text-base"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="form-error text-xs md:text-sm">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label text-sm md:text-base">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="form-input text-sm md:text-base"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Entered value does not match email format'
                      } 
                    })}
                  />
                  {errors.email && <p className="form-error text-xs md:text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="form-label text-sm md:text-base">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g., Question about my order"
                    className="form-input text-sm md:text-base"
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  {errors.subject && <p className="form-error text-xs md:text-sm">{errors.subject.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="form-label text-sm md:text-base">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your message..."
                    className="form-input text-sm md:text-base resize-none"
                    {...register('message', { required: 'Message is required' })}
                  ></textarea>
                  {errors.message && <p className="form-error text-xs md:text-sm">{errors.message.message}</p>}
                </div>
                
                <button type="submit" className="btn-primary w-full text-sm md:text-base py-3 md:py-2.5 touch-manipulation">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-12 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <img src="/images/Who-We-Are.png" alt="Who We Are" className="rounded-xl object-contain w-full h-auto max-h-[20rem] sm:max-h-[24rem] md:h-[36rem] md:max-h-[44rem]" loading="lazy" />
            </div>
            <div className="order-1 md:order-2">
              <div>
                <span className="uppercase tracking-widest text-xs md:text-sm font-bold text-primary-600 font-sans">WHO WE ARE</span>
                <div className="h-0.5 w-8 md:w-10 bg-primary-500 mt-2 rounded"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mt-4 md:mt-6 font-sans tracking-tight leading-tight">Every day, we set out to change the world...together</h2>
              <p className="text-base md:text-lg text-gray-600 mt-4 md:mt-6 font-sans font-normal tracking-normal leading-relaxed">
                We are a passionate team of expert writers, editors, and support professionals dedicated to helping students achieve their academic goals. Our mission is to provide high-quality, original essays and assignments that empower learners to succeed with confidence.
              </p>
              <p className="text-base md:text-lg text-gray-600 mt-3 md:mt-4 font-sans font-normal tracking-normal leading-relaxed">
                With years of experience and a commitment to integrity, we believe in making a real difference—one paper at a time. Collaboration, trust, and excellence are at the heart of everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 md:py-24 bg-[#F5F4F0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 md:mb-12 text-center px-2" style={{fontFamily: 'Playfair Display, serif', color: '#20504F'}}>
              Check out what others have to say about us:
            </h2>
            <div className="relative">
              <div className="relative max-w-full mx-auto">
                <div
                  id="testimonial-carousel-viewport"
                  className="overflow-x-auto scrollbar-hide relative mx-auto px-1 md:px-2 scroll-smooth"
                  style={{WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                >
                  <div
                    id="testimonial-carousel-track"
                    className="inline-flex gap-3 md:gap-4 transition-transform duration-500 ease-in-out"
                    style={{willChange: 'transform', minWidth: '100%'}}
                  >
                    {reviews.map((review, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-3 md:p-4 flex-shrink-0 shadow flex flex-col w-[85vw] sm:w-[75vw] md:w-80 md:min-w-[20rem] md:max-w-[20rem] touch-manipulation"
                        id={`review-${idx}`}
                      >
                        <div className="flex items-center mb-1 flex-wrap gap-1">
                          <div className="flex items-center mr-2">
                            {[1,2,3,4,5].map(star => (
                              <svg
                                key={star}
                                width="14" height="14" viewBox="0 0 20 20"
                                fill={star <= review.rating ? '#10B981' : '#E5E7EB'}
                                className="mr-0.5"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/>
                              </svg>
                            ))}
                          </div>
                          {review.isVerified && (
                            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] md:text-xs font-semibold px-1.5 md:px-2 py-0.5 rounded">
                              <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#10B981"/><path d="M6.5 10.2l2.1 2.1L13.5 8.2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              Verified
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-sm md:text-base mt-2 mb-1 text-gray-900">{review.title}</h3>
                        <p className="text-gray-600 text-xs md:text-sm mb-3 overflow-hidden text-ellipsis flex-1" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>{review.text}</p>
                        <p className="text-[10px] md:text-xs text-gray-400 mt-auto">{review.author} &middot; {review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  id="testimonial-carousel-left"
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow-lg transition-colors duration-200 hover:bg-emerald-100 active:bg-emerald-200 focus:bg-emerald-100 touch-manipulation"
                  style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'}}
                  aria-label="Scroll left"
                  onClick={() => {
                    const viewport = document.getElementById('testimonial-carousel-viewport');
                    if (!viewport) return;
                    const cardWidth = window.innerWidth >= 768 ? 336 : (window.innerWidth * 0.85 + 12);
                    viewport.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                  }}
                >
                  <svg width="20" height="20" className="md:w-6 md:h-6" fill="none" stroke="#374151" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button
                  id="testimonial-carousel-right"
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow-lg transition-colors duration-200 hover:bg-emerald-100 active:bg-emerald-200 focus:bg-emerald-100 touch-manipulation"
                  style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'}}
                  aria-label="Scroll right"
                  onClick={() => {
                    const viewport = document.getElementById('testimonial-carousel-viewport');
                    if (!viewport) return;
                    const cardWidth = window.innerWidth >= 768 ? 336 : (window.innerWidth * 0.85 + 12);
                    viewport.scrollBy({ left: cardWidth, behavior: 'smooth' });
                  }}
                >
                  <svg width="20" height="20" className="md:w-6 md:h-6" fill="none" stroke="#374151" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
            <div className="mt-8 md:mt-12 flex flex-col items-center justify-center px-2">
              <p className="text-gray-700 text-sm md:text-base mb-2 text-center">Rated 4.7 / 5 based on 30 reviews. Showing our 5 star reviews.</p>
              <div className="flex items-center gap-2">
                <img src="/images/trustpilot logo 2.png" alt="Trustpilot" className="h-6 w-6 md:h-7 md:w-7 object-contain" loading="lazy" />
                <span className="text-base md:text-lg font-semibold text-[#00B67A]">Trustpilot</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-6xl mx-auto mt-12 md:mt-20 mb-12 md:mb-16 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-10 text-left">How It Works:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-black rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col">
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-cyan-400 rounded-md text-white font-bold text-base md:text-lg mb-3 md:mb-4">1</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Find your writer.</h3>
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">We'll connect you with a writer who will motivate, challenge, and inspire you.</p>
              <div className="relative mt-8 md:mt-12 h-48 md:h-56 w-full flex items-end justify-center overflow-hidden">
                <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-md flex items-center p-3 md:p-4 w-full max-w-[20rem] mx-auto z-0 absolute left-0 right-0 bottom-0 opacity-95">
                  <img src="/images/Jessica Miller.jpg" alt="Jessica Miller" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-3 md:mr-4 border border-gray-100 flex-shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <span className="block font-semibold text-gray-900 text-sm md:text-base truncate">Jessica Miller</span>
                    <span className="block text-[10px] md:text-xs text-gray-500 truncate">Essay writer</span>
                    <span className="block text-[10px] md:text-xs text-gray-400 flex items-center mt-0.5 truncate">
                      <svg className="inline-block mr-1 flex-shrink-0" width="12" height="12" fill="none" stroke="#6b7280" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10H6m6 0h6"/></svg>
                      <span className="truncate">Expert in English, Literature, +2</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <svg width="16" height="16" className="md:w-[18px] md:h-[18px]" fill="#FACC15" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                    <span className="font-semibold text-gray-900 text-sm md:text-base">4.8</span>
                  </div>
                </div>
                <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-lg flex items-center p-3 md:p-4 w-full max-w-[20rem] mx-auto z-10 absolute left-0 right-0 bottom-12 opacity-98">
                  <img src="/images/Bellamy K..jpg" alt="Bellamy K." className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-3 md:mr-4 border border-gray-100 flex-shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <span className="block font-semibold text-gray-900 text-sm md:text-base truncate">Bellamy K.</span>
                    <span className="block text-[10px] md:text-xs text-gray-500 truncate">Essay writer</span>
                    <span className="block text-[10px] md:text-xs text-gray-400 flex items-center mt-0.5 truncate">
                      <svg className="inline-block mr-1 flex-shrink-0" width="12" height="12" fill="none" stroke="#6b7280" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10H6m6 0h6"/></svg>
                      <span className="truncate">Expert in English, Literature, +2</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <svg width="16" height="16" className="md:w-[18px] md:h-[18px]" fill="#FACC15" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                    <span className="font-semibold text-gray-900 text-sm md:text-base">4.9</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg md:shadow-2xl flex items-center p-3 sm:p-4 md:p-5 w-full max-w-[20rem] mx-auto z-20 absolute left-0 right-0 bottom-0 md:bottom-24 md:scale-105">
                  <img src="/images/Ashley Thompson.jpg" alt="Ashley Thompson" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mr-3 md:mr-4 border-2 border-white shadow flex-shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <span className="block font-bold text-gray-900 text-sm md:text-lg truncate">Ashley Thompson</span>
                    <span className="block text-xs md:text-sm text-gray-500 truncate">Essay writer</span>
                    <span className="block text-[10px] md:text-xs text-gray-400 flex items-center mt-0.5 truncate">
                      <svg className="inline-block mr-1 flex-shrink-0" width="12" height="12" fill="none" stroke="#6b7280" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10H6m6 0h6"/></svg>
                      <span className="truncate">Expert in English, Literature, +2</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <svg width="16" height="16" className="md:w-5 md:h-5" fill="#FACC15" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                    <span className="font-bold text-gray-900 text-sm md:text-lg">4.9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-black rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col">
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-yellow-300 rounded-md text-white font-bold text-base md:text-lg mb-3 md:mb-4">2</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Start learning.</h3>
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">Your tutor will guide the way through your first lesson and help you plan your next steps.</p>
              <div className="flex-1 flex items-center justify-center min-h-[176px]">
                <img src="/images/Start-learning.jpg" alt="Start learning" className="rounded-xl shadow-md w-full h-auto max-h-[176px] md:h-44 object-cover" loading="lazy" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-black rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col">
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-blue-600 rounded-md text-white font-bold text-base md:text-lg mb-3 md:mb-4">3</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Speak. Read. Write. Repeat.</h3>
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">Choose how many lessons you want to take each week and get ready to reach your goals!</p>
              <div className="flex-1 flex items-center justify-center min-h-[176px]">
                <img src="/images/Speak-Read.jpg" alt="Speak Read Write Repeat" className="rounded-xl shadow-md w-full h-auto max-h-[176px] md:h-44 object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
