import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  FileText,
  GraduationCap,
  Shield,
  RefreshCw,
  Headphones,
  Download,
  DollarSign,
  BookOpen,
  Search,
  FileCheck,
  ScrollText
} from 'lucide-react';
import HeroSection from '../components/Hero/HeroSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet-async';

function ConcernsSolutionsBlock(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>('concerns');
  return (
    <section className="concerns-solutions-block">
      <div className="dots dots-left"></div>
      <div className="dots dots-right"></div>
      <div className="stats-container">
        <div className="stat-item">
          <h2>5,000+</h2>
          <p>Students Helped</p>
        </div>
        <div className="stat-item">
          <h2>PhD & Master's</h2>
          <p>Level Writers Onboard</p>
        </div>
        <div className="stat-item">
          <h2>98%</h2>
          <p>Client Satisfaction</p>
        </div>
      </div>
      <div className="tabs-wrapper">
        <nav className="tab-nav">
          <button
            className={`tab-button${activeTab === 'concerns' ? ' active' : ''}`}
            data-tab="concerns"
            type="button"
            onClick={() => setActiveTab('concerns')}
          >Your Concerns</button>
          <button
            className={`tab-button${activeTab === 'solutions' ? ' active' : ''}`}
            data-tab="solutions"
            type="button"
            onClick={() => setActiveTab('solutions')}
          >How We Help</button>
        </nav>
        <div className="content-panel">
          <div className={`tab-content${activeTab === 'concerns' ? ' active' : ''}`} id="concerns">
            <ul>
              <li><FontAwesomeIcon icon={faTriangleExclamation as any} className="fa-triangle-exclamation" /><p>Facing a blank page? Get expert guidance to start your next assignment or project.</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation as any} className="fa-triangle-exclamation" /><p>Is your work generic? Receive personalized feedback so your submission stands out.</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation as any} className="fa-triangle-exclamation" /><p>Are you concerned your grammar, structure, or technical accuracy aren't strong enough for top grades?</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation as any} className="fa-triangle-exclamation" /><p>Your bright student struggles to write or code. Get specialized help to better articulate their ideas.</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation as any} className="fa-triangle-exclamation" /><p>No time to help with assignments? Our expert academic assistance saves you time and stress.</p></li>
              <li><FontAwesomeIcon icon={faTriangleExclamation as any} className="fa-triangle-exclamation" /><p>Tired of conflicting advice online? Get clear, expert guidance on what your instructors expect.</p></li>
            </ul>
          </div>
          <div className={`tab-content${activeTab === 'solutions' ? ' active' : ''}`} id="solutions">
            <ul>
              <li><FontAwesomeIcon icon={faCheck as any} className="fa-check" /><p><strong>Strategic Brainstorming:</strong> We'll help you craft a unique approach for any academic project, including essays, research papers, and programming assignments.</p></li>
              <li><FontAwesomeIcon icon={faCheck as any} className="fa-check" /><p><strong>Flawless Structure:</strong> Our experts guide you in outlining, writing, or coding assignments that flow perfectly and meet high academic standards.</p></li>
              <li><FontAwesomeIcon icon={faCheck as any} className="fa-check" /><p><strong>Meticulous Editing:</strong> Our team provides detailed proofreading for grammar, style, and technical accuracy, ensuring your work is truly flawless.</p></li>
              <li><FontAwesomeIcon icon={faCheck as any} className="fa-check" /><p><strong>Analytical Approach:</strong> Develop your own unique academic voice and strong analytical rigor for any subject or discipline.</p></li>
              <li><FontAwesomeIcon icon={faCheck as any} className="fa-check" /><p><strong>Personalized Guidance:</strong> A dedicated mentor creates a structured roadmap for your academic journey, keeping you on track and confident.</p></li>
              <li><FontAwesomeIcon icon={faCheck as any} className="fa-check" /><p><strong>Empower Your Work:</strong> We give you the tools and confidence to submit your best, most authentic academic work, whether it's written or technical in nature.</p></li>
            </ul>
          </div>
        </div>
      </div>
      <style>{`
.concerns-solutions-block {
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 2rem;
    background: linear-gradient(180deg, #f0f4f9 0%, #ffffff 100%);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
}
.stats-container {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-bottom: 4rem;
}
.stat-item h2 {
    font-size: 3rem;
    font-weight: 700;
    color: #0a2540;
    margin: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e0e6eb;
    display: inline-block;
}
.stat-item p {
    margin: 0.5rem 0 0;
    font-size: 1rem;
    color: #52667d;
    font-weight: 500;
}
.tabs-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tab-nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    z-index: 1;
}
.tab-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #6b7280;
    transition: all 0.3s ease;
}
.tab-button.active {
    background-color: #ffffff;
    color: #111827;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 -4px 10px -2px rgba(0, 0, 0, 0.05);
}
.content-panel {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    padding: 2.5rem;
    width: 100%;
    max-width: 900px;
    margin-top: -1px;
    z-index: 2;
    transition: all 0.3s ease;
}
.tab-content {
    display: none;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
}
.tab-content.active {
    display: block;
    opacity: 1;
}
.tab-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 2.5rem;
}
.tab-content li {
    display: flex;
    align-items: flex-start;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #374151;
}
.tab-content li i, .tab-content li .fa-triangle-exclamation, .tab-content li .fa-check {
    font-size: 1rem;
    margin-top: 5px;
    margin-right: 12px;
}
.fa-triangle-exclamation { color: #f59e0b; }
.fa-check { color: #10b981; }
.tab-content li p { margin: 0; }
.tab-content li p strong { color: #111827; }
.dots {
    position: absolute;
    z-index: 0;
}
.dots-left {
    width: 150px;
    height: 150px;
    top: 60px;
    left: 20px;
    background-image: radial-gradient(#e0e6eb 2px, transparent 2px);
    background-size: 20px 20px;
    opacity: 0.5;
}
.dots-right {
    width: 100px;
    height: 100px;
    bottom: 60px;
    right: 30px;
    background-image: radial-gradient(#0a2540 5px, transparent 5px);
    background-size: 30px 30px;
    opacity: 0.8;
}
@media (max-width: 820px) {
    .stats-container {
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 3rem;
    }
    .tab-content ul {
        grid-template-columns: 1fr;
    }
    .concerns-solutions-block {
        padding: 3rem 1rem;
    }
    .dots {
        display: none;
    }
}
@media (max-width: 480px) {
    .stat-item h2 {
        font-size: 2.25rem;
    }
    .content-panel {
        padding: 1.25rem;
    }
    .tab-button {
        padding: 0.5rem 0.9rem;
        font-size: 0.9rem;
    }
}
      `}</style>
    </section>
  );
}

// Add CSS styles for WritersSection
const writersStyles = `
  .writer-card {
    transition: all 0.5s ease-out;
    cursor: grab;
  }
  
  .writer-card:active {
    cursor: grabbing;
  }
  
  .writer-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .stats-overlay {
    opacity: 0;
    transition: all 0.5s ease-out;
    background: linear-gradient(135deg, hsla(0, 0%, 0%, 0.45) 0%, hsla(0, 0%, 0%, 0.35) 100%);
    backdrop-filter: blur(1px);
  }
  
  .writer-card:hover .stats-overlay {
    opacity: 1;
  }
  
  .writer-card:hover .base-content {
    opacity: 0;
  }
  
  .base-content {
    transition: opacity 0.5s ease-out;
  }
  
  .scroll-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
    scroll-behavior: auto;
  }
  
  .scroll-container:active {
    cursor: grabbing;
  }
  
  .scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .drag-scroll {
    user-select: none;
  }
`;

// Reviews Section Interfaces and Components
interface ReviewData {
  id: string;
  customerName: string;
  customerId: string;
  rating: number;
  reviewText: string;
  date: string;
  workType: string;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

// Platform configurations matching the exact design
const platforms: Platform[] = [
  {
    id: "google",
    name: "Google",
    icon: (
      <svg width="16" height="16" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
        <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
        <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
        <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
      </svg>
    ),
    color: "text-blue-600"
  },
  {
    id: "sitejabber", 
    name: "Sitejabber",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" fill="currentColor"/>
        <path d="M8 5l1 2h2l-1.5 1.5L10.5 11 8 9.5 5.5 11l1-2.5L5 7h2L8 5z" fill="white"/>
      </svg>
    ),
    color: "text-orange-500"
  },
  {
    id: "trustpilot",
    name: "TrustPilot", 
    icon: (
      <svg viewBox="0 0 799.89 761" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path d="M799.89 290.83H494.44L400.09 0l-94.64 290.83L0 290.54l247.37 179.92L152.72 761l247.37-179.63L647.16 761l-94.35-290.54z" fill="#00b67a"/>
        <path d="M574.04 536.24l-21.23-65.78-152.72 110.91z" fill="#005128"/>
      </svg>
    ),
    color: "text-green-600"
  }
];

// Reviews data for each platform
const reviewsData = {
  google: [
    {
      id: "1",
      customerName: "Sarah M.",
      customerId: "679646",
      rating: 5,
      reviewText: "I was struggling with my research paper deadline and these guys saved me. The writer really understood my topic and delivered exactly what I needed. Will definitely use again!",
      date: "Jan 15, 2025",
      workType: "Research Paper"
    },
    {
      id: "2", 
      customerName: "Michael T.",
      customerId: "1808319",
      rating: 5,
      reviewText: "Amazing service! My essay was well-researched and perfectly formatted. The writer even included additional sources I hadn't thought of. Highly recommend!",
      date: "Dec 28, 2024",
      workType: "Essay"
    },
    {
      id: "3",
      customerName: "Jennifer L.", 
      customerId: "1146736",
      rating: 4,
      reviewText: "Good quality work, delivered on time. Had to request one small revision but the writer was very responsive and fixed it quickly.",
      date: "Dec 15, 2024",
      workType: "Case Study"
    },
    {
      id: "4",
      customerName: "David R.",
      customerId: "954836",
      rating: 5,
      reviewText: "Outstanding service! The writer went above and beyond with my dissertation chapter. The analysis was thorough and the writing was professional.",
      date: "Nov 30, 2024", 
      workType: "Dissertation Chapter"
    },
    {
      id: "5",
      customerName: "Emily K.",
      customerId: "401493",
      rating: 5,
      reviewText: "Fast delivery and excellent quality. The writer clearly understood the assignment requirements and delivered exactly what I asked for.",
      date: "Nov 22, 2024",
      workType: "Term Paper"
    },
    {
      id: "6",
      customerName: "Robert P.",
      customerId: "523891",
      rating: 5,
      reviewText: "I was skeptical at first but this service exceeded my expectations. The research was comprehensive and the arguments were well-structured.",
      date: "Nov 10, 2024",
      workType: "Argumentative Essay"
    },
    {
      id: "7",
      customerName: "Lisa W.",
      customerId: "892456",
      rating: 4,
      reviewText: "Good work overall. The writer followed my instructions well and the paper was well-written. Would use again for future assignments.",
      date: "Oct 28, 2024",
      workType: "Literature Review"
    },
    {
      id: "8",
      customerName: "James H.",
      customerId: "345672",
      rating: 5,
      reviewText: "Excellent service! The writer was knowledgeable about my subject and delivered a high-quality paper that helped me get an A.",
      date: "Oct 15, 2024",
      workType: "Analytical Essay"
    },
    {
      id: "9",
      customerName: "Amanda F.",
      customerId: "789123",
      rating: 5,
      reviewText: "I'm so glad I found this service. The writer helped me with my thesis proposal and it was approved by my committee on the first try!",
      date: "Oct 5, 2024",
      workType: "Thesis Proposal"
    },
    {
      id: "10",
      customerName: "Thomas B.",
      customerId: "456789",
      rating: 4,
      reviewText: "Solid work, delivered on time. The writer understood the assignment and provided good analysis. Minor formatting issues but overall satisfied.",
      date: "Sep 20, 2024",
      workType: "Book Review"
    },
    {
      id: "11",
      customerName: "Rachel G.",
      customerId: "234567",
      rating: 5,
      reviewText: "Fantastic service! The writer was professional and delivered exactly what I needed. The paper was well-researched and properly cited.",
      date: "Sep 8, 2024",
      workType: "Research Proposal"
    },
    {
      id: "12",
      customerName: "Kevin M.",
      customerId: "876543",
      rating: 5,
      reviewText: "I was struggling with my assignment and these guys really helped me out. The quality was excellent and the price was reasonable.",
      date: "Aug 25, 2024",
      workType: "Coursework"
    },
    {
      id: "13",
      customerName: "Nicole S.",
      customerId: "654321",
      rating: 4,
      reviewText: "Good experience overall. The writer delivered on time and the work was of good quality. Would recommend to others.",
      date: "Aug 12, 2024",
      workType: "Lab Report"
    },
    {
      id: "14",
      customerName: "Christopher L.",
      customerId: "987654",
      rating: 5,
      reviewText: "Outstanding quality and service! The writer was very professional and the paper exceeded my expectations. Will definitely use again.",
      date: "Jul 30, 2024",
      workType: "Critical Analysis"
    },
    {
      id: "15",
      customerName: "Melissa R.",
      customerId: "123456",
      rating: 5,
      reviewText: "Excellent work! The writer really understood my topic and delivered a comprehensive analysis. Highly satisfied with the service.",
      date: "Jul 18, 2024",
      workType: "Comparative Essay"
    },
    {
      id: "16",
      customerName: "Daniel K.",
      customerId: "567890",
      rating: 4,
      reviewText: "Good service, delivered on time. The writer followed my instructions and the work was well-done. Would use again.",
      date: "Jul 5, 2024",
      workType: "Reflection Paper"
    },
    {
      id: "17",
      customerName: "Stephanie W.",
      customerId: "345678",
      rating: 5,
      reviewText: "Amazing quality! The writer was very knowledgeable and delivered exactly what I needed. The paper was well-researched and well-written.",
      date: "Jun 22, 2024",
      workType: "Position Paper"
    },
    {
      id: "18",
      customerName: "Andrew P.",
      customerId: "789012",
      rating: 5,
      reviewText: "Great service! The writer was professional and the work was delivered on time. The quality exceeded my expectations.",
      date: "Jun 10, 2024",
      workType: "Discussion Post"
    },
    {
      id: "19",
      customerName: "Jessica T.",
      customerId: "456123",
      rating: 4,
      reviewText: "Good experience overall. The writer understood the assignment and delivered quality work. Would recommend.",
      date: "May 28, 2024",
      workType: "Response Paper"
    },
    {
      id: "20",
      customerName: "Matthew S.",
      customerId: "890123",
      rating: 5,
      reviewText: "Excellent service! The writer was very professional and delivered high-quality work. Will definitely use again for future assignments.",
      date: "May 15, 2024",
      workType: "Annotated Bibliography"
    },
    {
      id: "21",
      customerName: "Lauren M.",
      customerId: "234890",
      rating: 5,
      reviewText: "Outstanding work! The writer really helped me understand the topic and delivered a comprehensive paper. Highly satisfied!",
      date: "May 3, 2024",
      workType: "Literature Analysis"
    },
    {
      id: "22",
      customerName: "Ryan B.",
      customerId: "678901",
      rating: 4,
      reviewText: "Good quality work, delivered on time. The writer followed my instructions well and the paper was well-structured.",
      date: "Apr 20, 2024",
      workType: "Argumentative Essay"
    },
    {
      id: "23",
      customerName: "Ashley L.",
      customerId: "345901",
      rating: 5,
      reviewText: "Fantastic service! The writer was very knowledgeable and delivered exactly what I needed. The quality was excellent.",
      date: "Apr 8, 2024",
      workType: "Research Summary"
    },
    {
      id: "24",
      customerName: "Brandon K.",
      customerId: "789234",
      rating: 5,
      reviewText: "Great experience! The writer was professional and the work was delivered on time. The quality exceeded my expectations.",
      date: "Mar 25, 2024",
      workType: "Critical Review"
    },
    {
      id: "25",
      customerName: "Victoria R.",
      customerId: "456789",
      rating: 4,
      reviewText: "Good work overall. The writer understood the assignment and delivered quality work. Would use again for future assignments.",
      date: "Mar 12, 2024",
      workType: "Essay Analysis"
    }
  ],
  sitejabber: [
    {
      id: "26",
      customerName: "Alex M.",
      customerId: "745821",
      rating: 5,
      reviewText: "Excellent service and quick turnaround. The quality exceeded my expectations and the writer was very professional throughout the process.",
      date: "Jan 20, 2025",
      workType: "Research Paper"
    },
    {
      id: "27",
      customerName: "Samantha K.", 
      customerId: "892304",
      rating: 4,
      reviewText: "Good work overall. Minor revisions needed but writer was responsive and fixed everything quickly. Satisfied with the final result.",
      date: "Jan 8, 2025",
      workType: "Case Study"
    },
    {
      id: "28",
      customerName: "Marcus T.",
      customerId: "567123",
      rating: 5,
      reviewText: "Outstanding quality! The writer really understood my topic and delivered a comprehensive analysis. Will definitely use again.",
      date: "Dec 30, 2024",
      workType: "Dissertation Chapter"
    },
    {
      id: "29",
      customerName: "Hannah P.",
      customerId: "234567",
      rating: 5,
      reviewText: "Amazing service! The writer was very knowledgeable and delivered exactly what I needed. The paper was well-researched and properly formatted.",
      date: "Dec 18, 2024",
      workType: "Literature Review"
    },
    {
      id: "30",
      customerName: "Jordan L.",
      customerId: "789456",
      rating: 4,
      reviewText: "Good experience overall. The writer followed my instructions well and delivered quality work on time. Would recommend.",
      date: "Dec 5, 2024",
      workType: "Term Paper"
    },
    {
      id: "31",
      customerName: "Taylor R.",
      customerId: "345678",
      rating: 5,
      reviewText: "Excellent work! The writer was professional and the quality exceeded my expectations. The paper was well-structured and well-written.",
      date: "Nov 22, 2024",
      workType: "Analytical Essay"
    },
    {
      id: "32",
      customerName: "Morgan S.",
      customerId: "901234",
      rating: 5,
      reviewText: "Fantastic service! The writer really helped me understand the topic and delivered a comprehensive paper. Highly satisfied!",
      date: "Nov 10, 2024",
      workType: "Critical Analysis"
    },
    {
      id: "33",
      customerName: "Casey W.",
      customerId: "567890",
      rating: 4,
      reviewText: "Good quality work, delivered on time. The writer understood the assignment and provided good analysis. Minor issues but overall satisfied.",
      date: "Oct 28, 2024",
      workType: "Book Review"
    },
    {
      id: "34",
      customerName: "Riley M.",
      customerId: "123789",
      rating: 5,
      reviewText: "Outstanding service! The writer was very knowledgeable and delivered exactly what I needed. The research was comprehensive.",
      date: "Oct 15, 2024",
      workType: "Research Proposal"
    },
    {
      id: "35",
      customerName: "Quinn B.",
      customerId: "456123",
      rating: 5,
      reviewText: "Great experience! The writer was professional and the work was delivered on time. The quality exceeded my expectations.",
      date: "Oct 3, 2024",
      workType: "Coursework"
    },
    {
      id: "36",
      customerName: "Avery K.",
      customerId: "789012",
      rating: 4,
      reviewText: "Good work overall. The writer followed my instructions and delivered quality work. Would use again for future assignments.",
      date: "Sep 20, 2024",
      workType: "Lab Report"
    },
    {
      id: "37",
      customerName: "Parker L.",
      customerId: "234901",
      rating: 5,
      reviewText: "Excellent quality! The writer really understood my topic and delivered a comprehensive analysis. Will definitely use again.",
      date: "Sep 8, 2024",
      workType: "Discussion Post"
    },
    {
      id: "38",
      customerName: "Drew R.",
      customerId: "678345",
      rating: 5,
      reviewText: "Amazing service! The writer was very professional and delivered exactly what I needed. The paper was well-researched.",
      date: "Aug 25, 2024",
      workType: "Response Paper"
    },
    {
      id: "39",
      customerName: "Blake S.",
      customerId: "901567",
      rating: 4,
      reviewText: "Good experience overall. The writer understood the assignment and delivered quality work on time. Would recommend.",
      date: "Aug 12, 2024",
      workType: "Position Paper"
    },
    {
      id: "40",
      customerName: "Cameron T.",
      customerId: "345123",
      rating: 5,
      reviewText: "Fantastic work! The writer was knowledgeable and the quality exceeded my expectations. The paper was well-structured.",
      date: "Jul 30, 2024",
      workType: "Comparative Essay"
    },
    {
      id: "41",
      customerName: "Dakota M.",
      customerId: "567234",
      rating: 5,
      reviewText: "Excellent service! The writer really helped me understand the topic and delivered a comprehensive paper. Highly satisfied!",
      date: "Jul 18, 2024",
      workType: "Reflection Paper"
    },
    {
      id: "42",
      customerName: "Emery L.",
      customerId: "789345",
      rating: 4,
      reviewText: "Good quality work, delivered on time. The writer followed my instructions well and provided good analysis.",
      date: "Jul 5, 2024",
      workType: "Annotated Bibliography"
    },
    {
      id: "43",
      customerName: "Finley R.",
      customerId: "123456",
      rating: 5,
      reviewText: "Outstanding quality! The writer was very professional and delivered exactly what I needed. Will definitely use again.",
      date: "Jun 22, 2024",
      workType: "Literature Analysis"
    },
    {
      id: "44",
      customerName: "Gray S.",
      customerId: "456789",
      rating: 5,
      reviewText: "Great experience! The writer was knowledgeable and the work was delivered on time. The quality exceeded my expectations.",
      date: "Jun 10, 2024",
      workType: "Critical Review"
    },
    {
      id: "45",
      customerName: "Hayden W.",
      customerId: "789123",
      rating: 4,
      reviewText: "Good work overall. The writer understood the assignment and delivered quality work. Would use again for future assignments.",
      date: "May 28, 2024",
      workType: "Essay Analysis"
    },
    {
      id: "46",
      customerName: "Indigo M.",
      customerId: "234567",
      rating: 5,
      reviewText: "Excellent service! The writer was very knowledgeable and delivered a comprehensive analysis. Highly satisfied!",
      date: "May 15, 2024",
      workType: "Research Summary"
    },
    {
      id: "47",
      customerName: "Jules L.",
      customerId: "567890",
      rating: 5,
      reviewText: "Amazing quality! The writer really understood my topic and delivered exactly what I needed. The paper was well-researched.",
      date: "May 3, 2024",
      workType: "Argumentative Essay"
    },
    {
      id: "48",
      customerName: "Kai R.",
      customerId: "901234",
      rating: 4,
      reviewText: "Good experience overall. The writer followed my instructions and delivered quality work on time. Would recommend.",
      date: "Apr 20, 2024",
      workType: "Case Study"
    },
    {
      id: "49",
      customerName: "Lane S.",
      customerId: "345678",
      rating: 5,
      reviewText: "Fantastic work! The writer was professional and the quality exceeded my expectations. Will definitely use again.",
      date: "Apr 8, 2024",
      workType: "Term Paper"
    },
    {
      id: "50",
      customerName: "Nova T.",
      customerId: "678901",
      rating: 5,
      reviewText: "Excellent service! The writer really helped me understand the topic and delivered a comprehensive paper. Highly satisfied!",
      date: "Mar 25, 2024",
      workType: "Dissertation Chapter"
    }
  ],
  trustpilot: [
    {
      id: "51",
      customerName: "Oliver M.",
      customerId: "567890",
      rating: 5,
      reviewText: "Professional service with attention to detail. The writer was very knowledgeable and delivered exactly what I needed. Highly recommended!",
      date: "Jan 25, 2025",
      workType: "Thesis"
    },
    {
      id: "52",
      customerName: "Emma L.",
      customerId: "234567", 
      rating: 5,
      reviewText: "Amazing quality and delivered on time. The writer really understood my topic and provided excellent analysis. Will use again!",
      date: "Jan 12, 2025",
      workType: "Assignment"
    },
    {
      id: "53",
      customerName: "William T.",
      customerId: "789123",
      rating: 4,
      reviewText: "Good work overall. The writer followed my instructions well and delivered quality work. Minor revisions needed but quickly resolved.",
      date: "Dec 30, 2024",
      workType: "Research Paper"
    },
    {
      id: "54",
      customerName: "Sophia R.",
      customerId: "456789",
      rating: 5,
      reviewText: "Outstanding service! The writer was very professional and the quality exceeded my expectations. The paper was well-researched.",
      date: "Dec 18, 2024",
      workType: "Literature Review"
    },
    {
      id: "55",
      customerName: "James K.",
      customerId: "123456",
      rating: 5,
      reviewText: "Excellent work! The writer really understood my topic and delivered a comprehensive analysis. Highly satisfied with the service.",
      date: "Dec 5, 2024",
      workType: "Case Study"
    },
    {
      id: "56",
      customerName: "Isabella M.",
      customerId: "678901",
      rating: 4,
      reviewText: "Good experience overall. The writer delivered on time and the work was of good quality. Would recommend to others.",
      date: "Nov 22, 2024",
      workType: "Analytical Essay"
    },
    {
      id: "57",
      customerName: "Benjamin S.",
      customerId: "234567",
      rating: 5,
      reviewText: "Fantastic service! The writer was knowledgeable and delivered exactly what I needed. The quality was excellent.",
      date: "Nov 10, 2024",
      workType: "Critical Analysis"
    },
    {
      id: "58",
      customerName: "Mia W.",
      customerId: "789012",
      rating: 5,
      reviewText: "Amazing quality! The writer really helped me understand the topic and delivered a comprehensive paper. Highly satisfied!",
      date: "Oct 28, 2024",
      workType: "Book Review"
    },
    {
      id: "59",
      customerName: "Lucas P.",
      customerId: "345678",
      rating: 4,
      reviewText: "Good work overall. The writer understood the assignment and delivered quality work. Would use again for future assignments.",
      date: "Oct 15, 2024",
      workType: "Research Proposal"
    },
    {
      id: "60",
      customerName: "Charlotte L.",
      customerId: "567890",
      rating: 5,
      reviewText: "Excellent service! The writer was very professional and delivered exactly what I needed. The research was comprehensive.",
      date: "Oct 3, 2024",
      workType: "Coursework"
    },
    {
      id: "61",
      customerName: "Mason R.",
      customerId: "901234",
      rating: 5,
      reviewText: "Outstanding quality! The writer really understood my topic and delivered a comprehensive analysis. Will definitely use again.",
      date: "Sep 20, 2024",
      workType: "Lab Report"
    },
    {
      id: "62",
      customerName: "Amelia S.",
      customerId: "456123",
      rating: 4,
      reviewText: "Good experience overall. The writer followed my instructions and delivered quality work on time. Would recommend.",
      date: "Sep 8, 2024",
      workType: "Discussion Post"
    },
    {
      id: "63",
      customerName: "Ethan T.",
      customerId: "789345",
      rating: 5,
      reviewText: "Fantastic work! The writer was knowledgeable and the quality exceeded my expectations. The paper was well-structured.",
      date: "Aug 25, 2024",
      workType: "Response Paper"
    },
    {
      id: "64",
      customerName: "Harper M.",
      customerId: "123789",
      rating: 5,
      reviewText: "Excellent service! The writer really helped me understand the topic and delivered a comprehensive paper. Highly satisfied!",
      date: "Aug 12, 2024",
      workType: "Position Paper"
    },
    {
      id: "65",
      customerName: "Alexander K.",
      customerId: "567234",
      rating: 4,
      reviewText: "Good quality work, delivered on time. The writer understood the assignment and provided good analysis. Overall satisfied.",
      date: "Jul 30, 2024",
      workType: "Comparative Essay"
    },
    {
      id: "66",
      customerName: "Evelyn L.",
      customerId: "901567",
      rating: 5,
      reviewText: "Amazing quality! The writer was very professional and delivered exactly what I needed. The paper was well-researched.",
      date: "Jul 18, 2024",
      workType: "Reflection Paper"
    },
    {
      id: "67",
      customerName: "Henry R.",
      customerId: "345901",
      rating: 5,
      reviewText: "Outstanding service! The writer really understood my topic and delivered a comprehensive analysis. Will definitely use again.",
      date: "Jul 5, 2024",
      workType: "Annotated Bibliography"
    },
    {
      id: "68",
      customerName: "Abigail S.",
      customerId: "678234",
      rating: 4,
      reviewText: "Good work overall. The writer followed my instructions well and delivered quality work. Would use again for future assignments.",
      date: "Jun 22, 2024",
      workType: "Literature Analysis"
    },
    {
      id: "69",
      customerName: "Sebastian W.",
      customerId: "234890",
      rating: 5,
      reviewText: "Excellent quality! The writer was very knowledgeable and delivered exactly what I needed. The research was comprehensive.",
      date: "Jun 10, 2024",
      workType: "Critical Review"
    },
    {
      id: "70",
      customerName: "Emily T.",
      customerId: "789012",
      rating: 5,
      reviewText: "Fantastic service! The writer really helped me understand the topic and delivered a comprehensive paper. Highly satisfied!",
      date: "May 28, 2024",
      workType: "Essay Analysis"
    },
    {
      id: "71",
      customerName: "Jack M.",
      customerId: "456789",
      rating: 4,
      reviewText: "Good experience overall. The writer understood the assignment and delivered quality work on time. Would recommend.",
      date: "May 15, 2024",
      workType: "Research Summary"
    },
    {
      id: "72",
      customerName: "Elizabeth L.",
      customerId: "123456",
      rating: 5,
      reviewText: "Amazing quality! The writer was professional and the quality exceeded my expectations. Will definitely use again.",
      date: "May 3, 2024",
      workType: "Argumentative Essay"
    },
    {
      id: "73",
      customerName: "Owen R.",
      customerId: "567890",
      rating: 5,
      reviewText: "Excellent service! The writer was very professional and delivered exactly what I needed. The paper was well-structured.",
      date: "Apr 20, 2024",
      workType: "Case Study"
    },
    {
      id: "74",
      customerName: "Sofia S.",
      customerId: "901234",
      rating: 4,
      reviewText: "Good work overall. The writer followed my instructions and delivered quality work. Would use again for future assignments.",
      date: "Apr 8, 2024",
      workType: "Term Paper"
    },
    {
      id: "75",
      customerName: "Daniel W.",
      customerId: "345678",
      rating: 5,
      reviewText: "Outstanding quality! The writer really understood my topic and delivered a comprehensive analysis. Highly satisfied!",
      date: "Mar 25, 2024",
      workType: "Dissertation Chapter"
    }
  ]
};

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-0.5 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

// Review Card Component matching the exact design
const ReviewCard: React.FC<{ review: ReviewData }> = ({ review }: { review: ReviewData }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 w-[280px] h-[200px] shadow-sm flex-shrink-0 flex flex-col">
    {/* Work Type Header */}
    <div className="text-gray-600 text-sm font-medium mb-3">
      {review.workType}
    </div>
    
    {/* Review Text - Fixed height with proper wrapping */}
    <p className="text-gray-800 text-sm leading-relaxed mb-4 flex-1 overflow-hidden break-words hyphens-auto">
      {review.reviewText}
    </p>
    
    {/* Bottom Section - Fixed at bottom */}
    <div className="mt-auto">
      {/* Star Rating */}
      <StarRating rating={review.rating} />
      
      {/* Customer Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <div>Customer ID: {review.customerId}</div>
        <div>{review.date}</div>
      </div>
    </div>
  </div>
);

// Platform Tab Component
const PlatformTab: React.FC<{ 
  platform: Platform; 
  isActive: boolean; 
  onClick: () => void; 
}> = ({ platform, isActive, onClick }: { platform: Platform; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200
      ${isActive 
        ? 'bg-primary-500 text-white border-primary-500 shadow-sm' 
        : 'bg-transparent border-gray-200 text-gray-600 hover:bg-gray-50'
      }
    `}
  >
    <span className={isActive ? 'text-white' : platform.color}>
      {platform.icon}
    </span>
    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
      {platform.name}
    </span>
  </button>
);

// Writers Section Interfaces and Components
interface WriterStats {
  finishOnTime: number;
  lastReviews: number;
  successRate: number;
  repeatHire: number;
}

interface Writer {
  id: string;
  name: string;
  degree: string;
  rating: number;
  subjects: string[];
  imageUrl: string;
  stats: WriterStats;
}

const writers: Writer[] = [
  {
    id: '1',
    name: 'Connor Beatty',
    degree: "Master's degree",
    rating: 5.0,
    subjects: ['Business', 'Economics'],
    imageUrl: '/images/writers/Connor-Beatty-Writer.jpg',
    stats: { finishOnTime: 98, lastReviews: 52, successRate: 99, repeatHire: 67 }
  },
  {
    id: '2',
    name: 'David Berlin',
    degree: "PhD degree",
    rating: 4.9,
    subjects: ['Computer Science', 'Engineering'],
    imageUrl: '/images/writers/David-Berlin-Writer.jpg',
    stats: { finishOnTime: 97, lastReviews: 48, successRate: 98, repeatHire: 72 }
  },
  {
    id: '3',
    name: 'Brett Fuller',
    degree: "Master's degree",
    rating: 4.8,
    subjects: ['Healthcare', 'Biology'],
    imageUrl: '/images/writers/Brett-Fuller-Writer.jpg',
    stats: { finishOnTime: 96, lastReviews: 45, successRate: 97, repeatHire: 61 }
  },
  {
    id: '4',
    name: 'Jenifer Moralez',
    degree: "Master's degree",
    rating: 5.0,
    subjects: ['Psychology', 'Sociology'],
    imageUrl: '/images/writers/Jenifer-Moralez-Writer.webp',
    stats: { finishOnTime: 99, lastReviews: 54, successRate: 100, repeatHire: 75 }
  },
  {
    id: '5',
    name: 'Lauren Miller',
    degree: "Master's degree",
    rating: 4.9,
    subjects: ['Literature', 'History'],
    imageUrl: '/images/writers/Lauren-Miller-Writer.jpg',
    stats: { finishOnTime: 97, lastReviews: 49, successRate: 98, repeatHire: 68 }
  },
  {
    id: '6',
    name: 'Sarah Massari',
    degree: "PhD degree",
    rating: 5.0,
    subjects: ['Education', 'Research'],
    imageUrl: '/images/writers/Sarah-Massari-Writer.jpg',
    stats: { finishOnTime: 98, lastReviews: 51, successRate: 99, repeatHire: 73 }
  }
];

const WriterCard = ({ writer }: { writer: Writer }): React.ReactElement => {
  return (
    <div className="writer-card flex-none w-80 bg-white rounded-xl shadow-md hover:shadow-2xl relative overflow-hidden">
      <img 
        src={writer.imageUrl}
        alt={`${writer.name} - ${writer.degree} writer`}
        className="w-full h-80 object-cover"
      />
      
      {/* Enhanced Content with Better Readability */}
      <div className="base-content absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white">
        {/* Writer Name and Rating */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white drop-shadow-lg">{writer.name}</h3>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-white">{writer.rating}</span>
          </div>
        </div>
        
        {/* Degree */}
        <p className="text-gray-200 text-sm mb-4 font-medium drop-shadow-md">{writer.degree}</p>
        
        {/* Subjects with Better Contrast */}
        <div className="flex flex-wrap gap-2 mb-4">
          {writer.subjects.map((subject, index) => (
            <span 
              key={index}
              className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
      
      {/* Stats Overlay with Better Readability */}
      <div className="stats-overlay absolute inset-0 flex flex-col justify-end p-6 text-white">
        {/* Writer info at bottom with enhanced background */}
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white">{writer.name}</h3>
            <div className="flex items-center gap-1 bg-yellow-500/90 px-2 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-white">{writer.rating}</span>
            </div>
          </div>
          <p className="text-gray-200 text-sm mb-3 font-medium">{writer.degree}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {writer.subjects.map((subject, index) => (
              <span 
                key={index}
                className="bg-white/90 text-gray-800 px-2 py-1 rounded-md text-xs font-semibold"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Stats grid with better contrast */}
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white mb-1">{writer.stats.finishOnTime}%</div>
              <div className="text-xs text-gray-300 font-medium">Finish on time</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold text-white">{writer.rating}</span>
              </div>
              <div className="text-xs text-gray-300 font-medium">Last {writer.stats.lastReviews} reviews</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white mb-1">{writer.stats.successRate}%</div>
              <div className="text-xs text-gray-300 font-medium">Success</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white mb-1">{writer.stats.repeatHire}%</div>
              <div className="text-xs text-gray-300 font-medium">Repeat hire rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WritersSection: React.FC = (): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse wheel horizontal scrolling support
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 0.8;
      }
    };

    // Mouse drag scrolling
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
      container.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      container.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.2;
      container.scrollLeft = scrollLeft - walk;
    };

    // Touch/swipe support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          isScrolling = true;
          e.preventDefault();
        }
      }
      
      if (isScrolling) {
        const deltaX = touchStartX - e.touches[0].clientX;
        container.scrollLeft += deltaX * 0.3;
        touchStartX = e.touches[0].clientX;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <style>{writersStyles}</style>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
            Our team of <span className="text-primary-500">academic writers</span>
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto font-light">
            Top-rated academic writers for essays, research, programming, and more. Real experts. Real results.
          </p>
        </div>

        {/* Writers Container */}
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-container pb-6 drag-scroll"
          >
            {writers.map((writer) => (
              <React.Fragment key={writer.id}>
                <WriterCard writer={writer} />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* View All Writers Button */}
        <div className="text-center mt-16">
          <Link 
            to="/writers"
            className="bg-white tap-target text-gray-600 border border-gray-200 px-6 py-2.5 rounded-lg font-light hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
          >
            View all writers
          </Link>
        </div>
      </div>
    </section>
  );
};

// Main Reviews Section Component
const ReviewsSection: React.FC = (): React.ReactElement => {
  const [activePlatform, setActivePlatform] = useState<string>("google");
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev: number) => prev + 1);
    }, 30); // Smooth scroll speed

    return () => clearInterval(interval);
  }, []);

  const currentReviews = reviewsData[activePlatform as keyof typeof reviewsData] || [];
  
  // Duplicate reviews for infinite scroll effect
  const infiniteReviews = [...currentReviews, ...currentReviews, ...currentReviews];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-blue-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section - exactly as in image */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary-100 text-primary-500 px-3 py-1 rounded-full text-xs font-medium mb-6">
            Reviews 🔥
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Honest feedback about 
            <span className="block text-gray-700">
              EssayEmbassy
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            See what real students say about our academic writing, research, and technical assignment help. Your next top grade starts here!
          </p>
        </div>

        {/* Platform Tabs Row - exactly as in image */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {platforms.map((platform) => (
            <PlatformTab
              key={platform.id}
              platform={platform}
              isActive={activePlatform === platform.id}
              onClick={() => setActivePlatform(platform.id)}
            />
          ))}
        </div>

        {/* Infinite Scrolling Reviews Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex space-x-6 transition-transform duration-100 ease-linear"
            style={{ 
              transform: `translateX(-${scrollPosition % (304 * currentReviews.length)}px)`,
              width: `${infiniteReviews.length * 304}px`
            }}
          >
            {infiniteReviews.map((review, index) => (
              <ReviewCard 
                key={`${review.id}-${index}`} 
                review={review} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default function Home(): React.ReactElement {
  // Remove unused animated stats state and useEffect
  /*
  const [students, setStudents] = useState(0);
  const [success, setSuccess] = useState(0);
  const [support, setSupport] = useState(0);
  const [writers, setWriters] = useState(0);

  useEffect(() => {
    // Animate numbers up
    let s = 0, su = 0, sp = 0, w = 0;
    const sTarget = 5000, suTarget = 98, spTarget = 24, wTarget = 500;
    const interval = setInterval(() => {
      if (s < sTarget) s += Math.ceil(sTarget / 60);
      if (su < suTarget) su += 2;
      if (sp < spTarget) sp += 2;
      if (w < wTarget) w += 10;
      setStudents(Math.min(s, sTarget));
      setSuccess(Math.min(su, suTarget));
      setSupport(Math.min(sp, spTarget));
      setWriters(Math.min(w, wTarget));
      if (s >= sTarget && su >= suTarget && sp >= spTarget && w >= wTarget) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);
  */

  const whyChooseUs = [
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our customer service team is here for you 24/7. Get quick answers and guidance for any academic question, day or night. We're always available."
    },
    {
      icon: GraduationCap,
      title: "Expert Writers",
      description: "Our expert writers hold advanced degrees and are specialists in various fields. Your project will be handled by a subject matter professional."
    },
    {
      icon: Shield,
      title: "Original Content",
      description: "Every document is custom-written from a blank page. We guarantee 100% unique work and provide a detailed report to prove its originality."
    },
    {
      icon: Clock,
      title: "Always On Time",
      description: "We understand academic deadlines are crucial. Our streamlined process ensures your work is delivered on or before the agreed-upon submission time."
    },
    {
      icon: DollarSign,
      title: "Affordable Prices",
      description: "You can get the quality help you need without high costs. Our affordable rates are fair and friendly for any student's budget."
    },
    {
      icon: RefreshCw,
      title: "Free Unlimited Edits",
      description: "Your satisfaction is our main goal. We offer free, unlimited revisions on every project until it meets your exact requirements."
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Confidentiality",
      description: "Your personal information and orders are completely secure"
    },
    {
      icon: RefreshCw,
      title: "Free Revisions",
      description: "Unlimited revisions within 14 days of delivery"
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Personal support manager for every order"
    },
    {
      icon: CheckCircle,
      title: "Plagiarism-Free Guarantee",
      description: "Original content with detailed plagiarism reports"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Fill the Form",
      description: "Provide your assignment details and requirements",
      icon: FileText
    },
    {
      step: 2,
      title: "Writer Assigned",
      description: "We match you with the best expert for your subject",
      icon: Users
    },
    {
      step: 3,
      title: "Download Your Work",
      description: "Receive your completed assignment on time",
      icon: Download
    }
  ];

  const pricingPlans = [
    {
      name: "High School",
      price: "$12",
      period: "per page",
      features: ["Basic research", "Standard formatting", "Free revisions", "24/7 support"],
      popular: false
    },
    {
      name: "College",
      price: "$15",
      period: "per page",
      features: ["Advanced research", "Any citation style", "Free revisions", "Priority support"],
      popular: true
    },
    {
      name: "University",
      price: "$18",
      period: "per page",
      features: ["Expert writers", "Complex topics", "Free revisions", "Dedicated manager"],
      popular: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Essay Writing Service | Essay Embassy</title>
        <meta
          name="description"
          content="Professional essay writing service with expert writers. Get original, high-quality essays, research papers, and academic writing help."
        />
        <link rel="canonical" href="https://essayembassy.com/" />
      </Helmet>
      <div className="min-h-screen safe-area bg-gradient-to-b from-[#F7F9FF] via-[#E3E8F0] to-white dark:bg-gray-900">
        {/* Hero Section */}
        <HeroSection />
      <ConcernsSolutionsBlock />

      {/* Why Choose Essay Embassy */}
      <section className="py-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-slate-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Why Choose <span className="text-primary-500">Essay Embassy</span>?
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2"></div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              We deliver high-quality academic writing services with a focus on excellence,
              dependability, and your ultimate student success.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/90 dark:bg-gray-800/90 rounded-xl p-5 text-center shadow border border-slate-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:scale-[1.02] flex flex-col items-center relative overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary-100 dark:bg-primary-900/10 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="bg-primary-50 dark:bg-primary-900/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform duration-300 shadow">
                    <Icon className="text-primary-500" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Core Benefits */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-slate-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              Our <span className="text-primary-500">Core Benefits</span>
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2 rounded-full"></div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              Experience the advantages that make us the preferred choice for academic assistance.
            </p>
            <div className="flex justify-center mt-2">
              <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-0.5 rounded-full text-xs font-medium shadow-sm animate-pulse">
                <CheckCircle className="text-green-500" size={16} />
                Trusted by 10,000+ students
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl shadow border border-slate-100 dark:border-gray-700 hover:shadow-md hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:scale-[1.02] flex flex-col items-center relative overflow-hidden animate-fade-in h-full min-h-[220px]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-5 -right-5 w-12 h-12 bg-primary-100 dark:bg-primary-900/10 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="bg-primary-50 dark:bg-primary-900/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-105 transition-transform duration-300 shadow">
                    <Icon className="text-primary-500 group-hover:text-primary-600 transition-colors duration-300" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-primary-500 transition-colors duration-300 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-normal text-center flex-1 flex items-center justify-center">
                    {benefit.description}
                  </p>
                  {benefit.title === 'Plagiarism-Free Guarantee' && (
                    <span className="absolute top-2 right-2 bg-primary-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow animate-bounce z-10">
                      Verified
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Writing Services Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-xl mb-6">
              <GraduationCap className="w-8 h-8 text-primary-600" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Academic Writing
              <span className="block text-primary-600">Services</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive academic support across all disciplines with expert writers, 
              guaranteed quality, and timely delivery for your educational success.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Essay Writing Services",
                description: "Professional essay writing with original content, proper citations, and guaranteed quality for all academic levels.",
                icon: FileText,
                features: ["Original Content", "Proper Citations", "All Academic Levels"],
                buttonText: "Order Essay",
                href: "/services/essay-writing"
              },
              {
                title: "Assignment Help",
                description: "Expert assistance with assignments across all subjects, ensuring timely delivery and academic excellence.",
                icon: BookOpen,
                features: ["All Subjects", "Timely Delivery", "Expert Writers"],
                buttonText: "Get Help",
                href: "/services/assignment-help"
              },
              {
                title: "Homework Help",
                description: "Comprehensive homework support with step-by-step solutions and detailed explanations for better understanding.",
                icon: GraduationCap,
                features: ["Step-by-Step Solutions", "Detailed Explanations", "Quick Turnaround"],
                buttonText: "Start Now",
                href: "/services/homework-help"
              },
              {
                title: "Research Paper Help",
                description: "In-depth research papers with comprehensive analysis, credible sources, and academic formatting standards.",
                icon: Search,
                features: ["Comprehensive Analysis", "Credible Sources", "Academic Formatting"],
                buttonText: "Order Research",
                href: "/services/research-paper-writing"
              },
              {
                title: "Thesis Writing Help",
                description: "Professional thesis writing support with extensive research, proper methodology, and academic rigor.",
                icon: FileCheck,
                features: ["Extensive Research", "Proper Methodology", "Academic Rigor"],
                buttonText: "Get Started",
                href: "/services/thesis-writing"
              },
              {
                title: "Dissertation Writing Help",
                description: "Complete dissertation support from proposal to defense with expert guidance and comprehensive research.",
                icon: ScrollText,
                features: ["Proposal to Defense", "Expert Guidance", "Comprehensive Research"],
                buttonText: "Begin Dissertation",
                href: "/services/dissertation-writing"
              }
            ].map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon and Title */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                  {/* Action Button */}
                    <Link
                      to={service.href}
                    className="w-full tap-target bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group-hover:shadow-md"
                  >
                    <span>{service.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
              );
            })}
          </div>

          {/* Call-to-Action */}
          <div className="text-center mt-16">
            <Link 
              to="/services"
              className="inline-flex items-center justify-center tap-target px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 space-x-3"
            >
                <span>Explore All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Reviews Section */}
      <ReviewsSection />

      {/* How It Works */}
      <section className="py-14 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
              How It <span className="text-primary-500">Works</span>
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2 rounded-full"></div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              Get your assignment completed in three simple steps.
            </p>
            <div className="flex justify-center mt-2">
              <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-0.5 rounded-full text-xs font-medium shadow-sm animate-fade-in">
                🚀 Fast & Secure Process
              </span>
            </div>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Premium connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 z-0" style={{transform: 'translateY(-50%)'}}>
              <div className="w-full h-full bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 rounded-full opacity-40 blur-[1px]" />
            </div>
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative z-10 backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 shadow border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:scale-[1.03] flex flex-col items-center text-center animate-fade-in group h-full min-h-[220px]"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative mb-5">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-1 shadow group-hover:scale-105 group-hover:shadow-lg transition-transform duration-300 border-2 border-white dark:border-gray-900">
                      <Icon className="text-white group-hover:scale-105 transition-transform duration-300" size={22} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 border border-primary-500 w-7 h-7 rounded-full flex items-center justify-center text-primary-500 font-bold text-base shadow-soft group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 animate-bounce">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1 tracking-tight group-hover:text-primary-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs flex-1 flex items-center justify-center">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Writers Section */}
      <WritersSection />

      {/* Pricing Overview */}
      <section className="py-14 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
              <span className="text-primary-500">Transparent</span> Pricing
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-2 rounded-full"></div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
              Choose the plan that fits your academic level and budget.
            </p>
            <div className="flex justify-center mt-2">
              <span className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-0.5 rounded-full text-xs font-medium shadow-sm animate-fade-in">
                💎 100% Value Guarantee
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 shadow border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 flex flex-col items-center animate-fade-in h_full min-h-[220px] ${plan.popular ? 'md:scale-105 z-10 ring-2 ring-primary-200 dark:ring-primary-900/30 md:shadow-lg' : 'scale-100'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow z-20 animate-bounce flex items-center gap-2">
                    <Star className="text-yellow-300" size={14} /> Most Popular
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 tracking-tight group-hover:text-primary-500 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-1">
                    <span className="text-3xl font-bold text-primary-500 drop-shadow-sm mr-1">{plan.price}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{plan.period}</span>
                  </div>
                </div>
                <ul className="mb-4 space-y-2 w-full">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-700 dark:text-gray-300 font-normal gap-2">
                      <CheckCircle size={14} className="text-primary-500 mr-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/order-now?academicLevel=${encodeURIComponent(plan.name)}`}
                  className={`inline-flex items-center justify-center tap-target w-full px-4 py-2 rounded-md font-medium text-xs transition-all duration-200 shadow-sm group-hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:from-primary-600 hover:to-primary-500 shadow'
                      : 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white bg-white dark:bg-gray-900'
                  }`}
                >
                  Get Started
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-br from-primary-600/90 to-primary-800 relative overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
        <div className="container text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-5 sm:p-6 md:p-8 lg:p-10 border border-primary-200 dark:border-primary-900 animate-fade-in">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-800 dark:text-white mb-2 sm:mb-3 leading-tight px-2">
              Ready to Get Started?
            </h2>
            <p className="text-sm sm:text-base text-primary-700 dark:text-primary-100 mb-4 sm:mb-5 px-2 leading-relaxed">
              Join thousands of successful students who trust Essay Embassy for their academic needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center mb-3 sm:mb-4">
              <Link
                to="/order-now"
                className="bg-primary-600 hover:bg-primary-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium text-sm sm:text-base transition-colors inline-flex items-center justify-center shadow group-hover:scale-105 tap-target w-full sm:w-auto"
              >
                <GraduationCap className="mr-2 flex-shrink-0" size={16} />
                <span className="whitespace-nowrap">Place Your Order Now</span>
              </Link>
              <Link
                to="/contact"
                className="border border-primary-600 text-primary-700 dark:text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium text-sm sm:text-base hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group-hover:scale-105 tap-target w-full sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-3 sm:mt-4 text-primary-700 dark:text-primary-100">
              <p className="text-[10px] sm:text-xs flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2">
                <span className="inline-flex items-center whitespace-nowrap"><span className="mr-1">🔒</span> Secure Payment</span>
                <span className="inline-flex items-center whitespace-nowrap"><span className="mr-1">📞</span> 24/7 Support</span>
                <span className="inline-flex items-center whitespace-nowrap"><span className="mr-1">✅</span> Money-Back Guarantee</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}