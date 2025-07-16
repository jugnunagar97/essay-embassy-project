import React, { useState, useRef, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TABS = [
  {
    name: 'Essay Embassy',
    key: 'Essay Embassy',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#4F46E5"/><text x="16" y="22" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">EE</text></svg>
    ),
  },
  {
    name: 'Sitejabber',
    key: 'Sitejabber',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#F26722"/><path d="M16 7l2.472 7.608h7.996l-6.468 4.696 2.472 7.608L16 19.216l-6.472 4.696 2.472-7.608-6.468-4.696h7.996L16 7z" fill="#fff"/></svg>
    ),
  },
  {
    name: 'TrustPilot',
    key: 'TrustPilot',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#00B67A"/><polygon points="16,6 18.09,13.26 25,13.27 19.45,17.14 21.54,24.02 16,20.18 10.45,24.02 12.54,17.14 7,13.27 13.91,13.26" fill="#fff"/></svg>
    ),
  },
  {
    name: 'Google Reviews',
    key: 'Google Reviews',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#4285F4"/><text x="16" y="22" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">G</text></svg>
    ),
  },
];

// Define Review type
interface Review {
  orderId: string;
  name: string;
  date: string;
  paperType: string;
  rating: number;
  category: string;
  text: string;
}

// Update REVIEWS orderId fields to be unique, random-looking strings in the format 'EE' + 4 random digits
const REVIEWS: { [key: string]: Review[] } = {
  'Essay Embassy': [
    { orderId: 'EE4821', name: 'Adelaide W.', date: '2025-02-22', paperType: 'Essay', rating: 5, category: 'English', text: 'The essay was written and completed early. The writing was great! Adelaide makes an effort to fact-check and get things right in her writing. I was impressed by the attention to detail and the willingness to revise the work until it was perfect. Highly recommended for anyone who needs a reliable writer.' },
    { orderId: 'EE9307', name: 'Nora M.', date: '2024-08-01', paperType: 'Case Study', rating: 5, category: 'Business and management', text: 'Great & Expert SME in field of Analyses and have multi skills across different academic fields. The writer provided in-depth research and clear explanations, making complex topics easy to understand. I will definitely use this service again.' },
    { orderId: 'EE1574', name: 'Brenda V.', date: '2023-11-17', paperType: 'Lab Report', rating: 5, category: 'Statistics', text: 'Can trust this writer with any subject and any assignment and will always deliver before deadline. No plagiarism or AI used. Great work. The communication was excellent and the writer was open to feedback throughout the process.' },
    { orderId: 'EE6042', name: 'Mollie S.', date: '2025-02-22', paperType: 'Research Paper', rating: 5, category: 'Nursing', text: 'Always deliver high quality work. Follows all instructions and maintains communication. The paper was well-structured and referenced, and I received an A on my assignment.' },
    { orderId: 'EE2189', name: 'James T.', date: '2024-03-10', paperType: 'Essay', rating: 4, category: 'History', text: 'Good research and timely delivery. Would recommend for history assignments. The writer included primary and secondary sources and formatted everything correctly.' },
    { orderId: 'EE7753', name: 'Priya K.', date: '2023-12-15', paperType: 'Case Study', rating: 5, category: 'Law', text: 'Excellent legal analysis and referencing. Very satisfied. The writer was knowledgeable about case law and statutes, and the arguments were well-supported.' },
    { orderId: 'EE3498', name: 'Lucas P.', date: '2024-05-20', paperType: 'Programming Assignment', rating: 5, category: 'Computer Science', text: 'Code was clean and well-documented. Helped me understand the logic too. The writer even provided comments in the code and answered my follow-up questions.' },
    { orderId: 'EE5916', name: 'Sophie L.', date: '2023-09-25', paperType: 'Essay', rating: 4, category: 'Psychology', text: 'Insightful essay, but could use more recent references. The analysis was strong and the writer was responsive to my requests for changes.' },
    { orderId: 'EE8640', name: 'Ahmed R.', date: '2024-10-28', paperType: 'Engineering Project', rating: 5, category: 'Engineering', text: 'Complex calculations handled perfectly. Impressed with the detail. The diagrams and explanations made the concepts much clearer.' },
    { orderId: 'EE4205', name: 'Maria G.', date: '2023-07-30', paperType: 'Literature Review', rating: 5, category: 'Literature', text: 'Beautifully written analysis. Captured the themes very well. The writer provided unique insights and supported them with textual evidence.' },
  ],
  'Sitejabber': [
    { orderId: 'EE3027', name: 'Olivia H.', date: '2023-04-01', paperType: 'Essay', rating: 5, category: 'Philosophy', text: 'Deep and thoughtful arguments. My professor was impressed. The essay was well-structured and referenced, and the writer was very responsive to my feedback. I appreciated the unique perspective and the way the writer tied in real-world examples.' },
    { orderId: 'EE5871', name: 'Ethan S.', date: '2024-03-03', paperType: 'Math Assignment', rating: 4, category: 'Math', text: 'Accurate solutions, but a bit slow on delivery. The explanations were clear and easy to follow. The writer was patient with my questions and provided step-by-step guidance. I learned a lot from the process.' },
    { orderId: 'EE1946', name: 'Chloe B.', date: '2025-05-04', paperType: 'Lab Report', rating: 5, category: 'Biology', text: 'Great diagrams and explanations. Helped me ace my test. The writer included all the required sections and data analysis. Communication was prompt and professional throughout.' },
    { orderId: 'EE8603', name: 'Mason D.', date: '2023-07-07', paperType: 'Lab Report', rating: 5, category: 'Chemistry', text: 'Lab report was detailed and well-structured. The writer followed the guidelines exactly and delivered on time. I was impressed by the depth of research and the clarity of the results section.' },
    { orderId: 'EE4712', name: 'Ella F.', date: '2024-09-09', paperType: 'Research Paper', rating: 5, category: 'Economics', text: 'Clear graphs and solid economic analysis. The writer used up-to-date sources and provided a thorough discussion. I received positive feedback from my professor and will use this service again.' },
    { orderId: 'EE6298', name: 'Logan J.', date: '2025-11-11', paperType: 'Essay', rating: 4, category: 'Political Science', text: 'Good arguments, but some minor typos. The writer was open to revisions and fixed the issues quickly. The essay was well-organized and covered all the required points. I appreciated the quick turnaround on edits.' },
    { orderId: 'EE7534', name: 'Ava K.', date: '2023-01-13', paperType: 'Case Study', rating: 5, category: 'Sociology', text: 'Very insightful and well-researched. The case study included real-world examples and was easy to understand. The writer provided additional resources for further reading, which was a nice touch.' },
    { orderId: 'EE2159', name: 'Benjamin L.', date: '2024-02-15', paperType: 'Art Critique', rating: 5, category: 'Art', text: 'Creative and original critique. Loved it. The writer provided thoughtful feedback and suggestions for improvement. The analysis was both deep and accessible.' },
    { orderId: 'EE6902', name: 'Mia M.', date: '2023-08-17', paperType: 'Music Analysis', rating: 5, category: 'Music', text: 'Analysis was spot on and very engaging. The writer clearly has a passion for music and it showed in the work. I appreciated the historical context and the technical breakdown.' },
    { orderId: 'EE3817', name: 'William N.', date: '2025-09-19', paperType: 'Geography Report', rating: 5, category: 'Geography', text: 'Maps and data were accurate and well-presented. The report was visually appealing and informative. The writer included recent case studies and made the topic interesting.' },
  ],
  'TrustPilot': [
    { orderId: 'EE5408', name: 'Charlotte O.', date: '2024-05-02', paperType: 'Medical Essay', rating: 5, category: 'Medicine', text: 'Medical essay was thorough and referenced recent studies. The writer explained complex concepts in a simple way. I appreciated the clear structure and the use of up-to-date sources. The feedback from my instructor was very positive.' },
    { orderId: 'EE1092', name: 'Henry P.', date: '2023-05-04', paperType: 'Physics Lab', rating: 5, category: 'Physics', text: 'Explained complex concepts in a simple way. The lab report was detailed and included all calculations. The writer was available for questions and provided helpful diagrams. I would recommend this service to my classmates.' },
    { orderId: 'EE7841', name: 'Amelia Q.', date: '2025-05-06', paperType: 'Business Plan', rating: 4, category: 'Business', text: 'Good business plan, but formatting could be improved. The content was solid and well-researched. The writer was receptive to my suggestions and made the necessary changes quickly.' },
    { orderId: 'EE2675', name: 'Jack R.', date: '2023-05-08', paperType: 'Engineering Project', rating: 5, category: 'Engineering', text: 'Blueprints and calculations were perfect. The writer provided step-by-step explanations. The project was delivered ahead of schedule and exceeded my expectations.' },
    { orderId: 'EE8136', name: 'Harper S.', date: '2024-05-10', paperType: 'Lesson Plan', rating: 5, category: 'Education', text: 'Lesson plan was creative and practical. The writer included activities and assessments. The plan was easy to follow and adaptable to different classroom settings.' },
    { orderId: 'EE4920', name: 'Sebastian T.', date: '2025-05-12', paperType: 'Case Study', rating: 5, category: 'Law', text: 'Case study was well-argued and cited. The writer used relevant case law and statutes. The analysis was deep and the recommendations were actionable.' },
    { orderId: 'EE3761', name: 'Emily U.', date: '2023-05-14', paperType: 'Care Plan', rating: 5, category: 'Nursing', text: 'Care plan was detailed and compassionate. The writer addressed all patient needs and provided evidence-based recommendations. The feedback from my instructor was excellent.' },
    { orderId: 'EE2054', name: 'Alexander V.', date: '2024-05-16', paperType: 'Math Assignment', rating: 4, category: 'Math', text: 'Correct answers, but explanations could be longer. The writer was responsive to my questions. I appreciated the extra resources provided for further study.' },
    { orderId: 'EE6583', name: 'Grace W.', date: '2025-05-18', paperType: 'History Essay', rating: 5, category: 'History', text: 'Very engaging and well-researched. The essay included primary sources and was well-organized. The writer provided a unique perspective and made the topic interesting.' },
    { orderId: 'EE4917', name: 'Daniel X.', date: '2023-05-20', paperType: 'CS Project', rating: 5, category: 'Computer Science', text: 'Project code was efficient and well-commented. The writer helped me understand the logic and structure. The documentation was clear and easy to follow.' },
  ],
  'Google Reviews': [
    { orderId: 'EE7284', name: 'Sofia Y.', date: '2023-06-22', paperType: 'Essay', rating: 5, category: 'English', text: 'Essay was creative and original. Loved the writing style. The writer provided unique insights and supported them with evidence. The feedback from my professor was very positive.' },
    { orderId: 'EE3159', name: 'Liam Z.', date: '2024-06-24', paperType: 'Finance Report', rating: 5, category: 'Finance', text: 'Financial analysis was spot on and easy to follow. The report was well-organized and included all necessary calculations. The writer was quick to respond to my questions and made helpful suggestions.' },
    { orderId: 'EE6047', name: 'Zoe A.', date: '2025-06-26', paperType: 'Marketing Plan', rating: 5, category: 'Marketing', text: 'Marketing plan was detailed and actionable. The writer included market research and strategies. The plan was easy to implement and helped me get a top grade.' },
    { orderId: 'EE1593', name: 'Noah B.', date: '2023-06-28', paperType: 'Philosophy Essay', rating: 4, category: 'Philosophy', text: 'Good arguments, but could use more sources. The writer was open to revisions and improved the essay. The final version was much stronger and well-supported.' },
    { orderId: 'EE8472', name: 'Lily C.', date: '2024-06-30', paperType: 'Psychology Paper', rating: 5, category: 'Psychology', text: 'Very empathetic and insightful analysis. The writer addressed all aspects of the assignment. I appreciated the clear explanations and the use of recent research.' },
    { orderId: 'EE2906', name: 'Matthew D.', date: '2025-07-02', paperType: 'Biology Lab', rating: 5, category: 'Biology', text: 'Lab report was clear and well-structured. The writer included all required data and analysis. The feedback from my instructor was excellent.' },
    { orderId: 'EE9631', name: 'Ella E.', date: '2023-07-04', paperType: 'Art Critique', rating: 5, category: 'Art', text: 'Art critique was creative and thoughtful. The writer provided constructive feedback and suggestions. The analysis was both deep and accessible.' },
    { orderId: 'EE5728', name: 'James F.', date: '2024-07-06', paperType: 'Engineering Report', rating: 5, category: 'Engineering', text: 'Technical report was precise and well-documented. The writer included diagrams and explanations. The report was easy to follow and very informative.' },
    { orderId: 'EE4810', name: 'Avery G.', date: '2025-07-08', paperType: 'Math Assignment', rating: 5, category: 'Math', text: 'Solutions were correct and easy to understand. The writer explained each step clearly. I learned a lot from the detailed feedback.' },
    { orderId: 'EE1068', name: 'Scarlett H.', date: '2023-07-10', paperType: 'Legal Essay', rating: 5, category: 'Law', text: 'Legal essay was well-structured and persuasive. The writer used relevant case law and statutes. The arguments were clear and well-supported.' },
  ],
};

const CARDS_PER_VIEW = {
  desktop: 4,
  tablet: 2,
  mobile: 1,
};

function getCardsPerView() {
  if (typeof window === 'undefined') return CARDS_PER_VIEW.desktop;
  if (window.innerWidth < 640) return CARDS_PER_VIEW.mobile;
  if (window.innerWidth < 1024) return CARDS_PER_VIEW.tablet;
  return CARDS_PER_VIEW.desktop;
}

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState('Essay Embassy');
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleResize() {
      setCardsPerView(getCardsPerView());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      const maxScroll = el!.scrollWidth - el!.clientWidth;
      setScrollProgress(maxScroll > 0 ? el!.scrollLeft / maxScroll : 0);
    }
    el.addEventListener('scroll', onScroll);
    return () => { el.removeEventListener('scroll', onScroll); };
  }, [activeTab]);

  // Mouse drag to scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    function onMouseDown(e: MouseEvent) {
      if (!el) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add('cursor-grabbing');
    }
    function onMouseLeave() { isDown = false; el?.classList.remove('cursor-grabbing'); }
    function onMouseUp() { isDown = false; el?.classList.remove('cursor-grabbing'); }
    function onMouseMove(e: MouseEvent) {
      if (!isDown || !el) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    }
    el?.addEventListener('mousedown', onMouseDown);
    el?.addEventListener('mouseleave', onMouseLeave);
    el?.addEventListener('mouseup', onMouseUp);
    el?.addEventListener('mousemove', onMouseMove);
    return () => {
      el?.removeEventListener('mousedown', onMouseDown);
      el?.removeEventListener('mouseleave', onMouseLeave);
      el?.removeEventListener('mouseup', onMouseUp);
      el?.removeEventListener('mousemove', onMouseMove);
    };
  }, [activeTab]);

  const reviews = REVIEWS[activeTab];

  return (
    <section className="w-full py-20 bg-white dark:bg-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-bold text-primary text-center mb-3">
          Customers are talking about{' '}
          <span className="text-primary">Essay Embassy</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 text-center mb-8 max-w-2xl">
          See what other customers have to say about our service. Once your order is complete, feel free to leave a review about your experience!
        </p>
        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-10">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-7 py-3 rounded-full font-semibold transition text-base shadow-sm border focus:outline-none focus:ring-2 focus:ring-primary
                ${activeTab === tab.key
                  ? 'bg-white text-primary border-primary'
                  : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'}
              `}
              style={{ minWidth: 170, justifyContent: 'center' }}
            >
              <span className="inline-block">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
        {/* Carousel */}
        <div className="w-full overflow-x-auto scrollbar-hide" ref={scrollRef} style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-8 py-4" style={{ minWidth: '100%' }}>
            {reviews.map((review: Review, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 flex-shrink-0 flex flex-col w-full"
                style={{
                  minWidth: `340px`,
                  maxWidth: `380px`,
                  minHeight: '260px',
                  maxHeight: '420px',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 rounded-full p-2">
                      {TABS.find(t => t.key === activeTab)?.icon}
                    </span>
                    <span className="font-bold text-slate-800 text-lg">{review.name}</span>
                  </div>
                  <span className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'text-amber-400' : 'text-slate-200'} />
                    ))}
                  </span>
                </div>
                <div className="flex items-center text-xs text-slate-400 mb-1 gap-3">
                  <span>Order ID: <span className="font-semibold text-slate-500">{review.orderId}</span></span>
                  <span>Type: <span className="font-semibold text-slate-500">{review.paperType}</span></span>
                  <span>{new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</span>
                </div>
                <div className="text-sm text-slate-500 mb-2 font-medium">{review.category}</div>
                <div className="text-base text-slate-700 leading-relaxed">{review.text}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full max-w-lg mt-6 mb-10">
          <div className="h-1 bg-slate-200 rounded-full relative">
            <div
              className="h-1 bg-primary rounded-full absolute top-0 left-0 transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
        {/* Read all reviews button */}
        <Link
          to="/reviews"
          className="mt-4 px-8 py-3 border border-slate-300 text-slate-600 rounded-full bg-transparent font-medium hover:border-slate-400 hover:text-primary transition"
        >
          Read all reviews
        </Link>
      </div>
    </section>
  );
} 