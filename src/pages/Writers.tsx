import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star,
  Award,
  GraduationCap,
  TrendingUp,
  Clock,
  Zap,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface Writer {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  qualification: string;
  expertise: string;
  orders: number;
  successRate: number; // New: e.g., 98, 99, 100
  replyTime: string;   // New: e.g., "under 5 mins"
  isOnline: boolean;   // New: Status indicator
}

// --- Components ---

const WriterCard = ({ writer }: { writer: Writer }) => {
  const expertiseTags = writer.expertise.split(',').map(s => s.trim()).slice(0, 3);
  const isPhD = writer.qualification.toLowerCase().includes('ph.d');

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      
      {/* Premium Header Background */}
      <div className={`h-24 w-full relative overflow-hidden ${isPhD ? 'bg-gradient-to-r from-emerald-50 to-teal-100' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]"></div>
        {/* Top Right Badge */}
        <div className="absolute top-3 right-3 flex gap-2">
            {writer.isOnline && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-emerald-600 shadow-sm border border-emerald-100/50">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    LIVE
                </span>
            )}
        </div>
      </div>

      {/* Avatar Section */}
      <div className="relative px-5 -mt-12 mb-2 flex flex-col items-center">
        <div className="relative group-hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-24 rounded-full p-1.5 bg-white shadow-lg ring-1 ring-gray-100">
            <img 
              src={`/images/${writer.name}.jpg`}
              alt={writer.name}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${writer.name}&background=random&color=fff&bold=true`;
              }}
            />
          </div>
          {/* Verified Badge Icon */}
          <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-md" title="Verified Expert">
            <ShieldCheck className="w-6 h-6 text-blue-500 fill-blue-50" />
          </div>
        </div>

        {/* Name & Qualification */}
        <div className="text-center mt-3 w-full">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {writer.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${isPhD ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                <GraduationCap className="w-3 h-3" />
                {isPhD ? 'Ph.D. Scholar' : 'Masters Expert'}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Premium Stats Grid */}
      <div className="px-4 py-2 mt-1">
        <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/50 rounded-xl border border-gray-100 py-3">
          <div className="text-center px-1">
            <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-base">
              {writer.rating} <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
            </div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Rating</div>
          </div>
          <div className="text-center px-1">
            <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-base">
              {writer.orders}
            </div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Projects</div>
          </div>
          <div className="text-center px-1">
            <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-base">
              {writer.successRate}%
            </div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Success</div>
          </div>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="px-5 py-3 flex-grow">
        <div className="flex flex-wrap justify-center gap-1.5">
          {expertiseTags.map((tag, idx) => (
            <span key={idx} className="bg-white text-gray-600 text-[11px] px-2.5 py-1 rounded-md border border-gray-200 font-medium shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-3 bg-gray-50 py-1.5 rounded-lg">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{writer.replyTime}</span>
        </div>

        <Link
          to="/order-now"
          className="relative flex items-center justify-center w-full bg-gray-900 text-white font-semibold py-3 rounded-xl shadow-lg shadow-gray-200 overflow-hidden group/btn hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-teal-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            Hire {writer.name.split(' ')[0]} 
            <Award className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};

const Writers = () => {
  const [displayedWriters, setDisplayedWriters] = useState(6);
  const [loading, setLoading] = useState(false);

  // Diverse Writer Data
  const allWriters: Writer[] = [
    { id: 1, name: "Bronwyn G.", rating: 4.9, reviews: 451, qualification: "Ph.D. in English Literature", expertise: "Shakespearean Studies, Modernist Poetry, Literary Theory", orders: 521, successRate: 100, replyTime: "Replies instantly", isOnline: true },
    { id: 2, name: "Alistair P.", rating: 4.8, reviews: 398, qualification: "Master's in Business Administration", expertise: "Marketing Strategy, Business Management, Finance", orders: 488, successRate: 98, replyTime: "Replies in 5 mins", isOnline: true },
    { id: 3, name: "Tamsin R.", rating: 5.0, reviews: 512, qualification: "Ph.D. in Psychology", expertise: "Cognitive Psychology, Social Behavior, Clinical Studies", orders: 580, successRate: 99, replyTime: "Replies in 2 mins", isOnline: true },
    { id: 4, name: "Lachlan B.", rating: 4.7, reviews: 315, qualification: "Master's in Computer Science", expertise: "AI & Machine Learning, Software Development, Cybersecurity", orders: 397, successRate: 96, replyTime: "Replies in 15 mins", isOnline: false },
    { id: 5, name: "Rhiannon F.", rating: 4.8, reviews: 402, qualification: "Master's in History", expertise: "American History, European Studies, Political History", orders: 450, successRate: 97, replyTime: "Replies in 10 mins", isOnline: true },
    { id: 6, name: "Sterling C.", rating: 4.9, reviews: 489, qualification: "Ph.D. in Biology", expertise: "Molecular Biology, Genetics, Environmental Science", orders: 534, successRate: 99, replyTime: "Replies instantly", isOnline: false },
    { id: 7, name: "Cordelia H.", rating: 4.8, reviews: 380, qualification: "Ph.D. in Political Science", expertise: "International Relations, Public Policy, Comparative Politics", orders: 421, successRate: 98, replyTime: "Replies in 20 mins", isOnline: true },
    { id: 8, name: "Cormac J.", rating: 4.7, reviews: 345, qualification: "Master's in Engineering", expertise: "Mechanical Engineering, Thermodynamics, Robotics", orders: 401, successRate: 95, replyTime: "Replies in 1 hour", isOnline: false },
    { id: 9, name: "Beverley M.", rating: 4.9, reviews: 501, qualification: "Master's in Nursing", expertise: "Healthcare Ethics, Patient Care, Medical Research", orders: 559, successRate: 100, replyTime: "Replies in 3 mins", isOnline: true },
    { id: 10, name: "Declan K.", rating: 4.8, reviews: 411, qualification: "Ph.D. in Economics", expertise: "Microeconomics, Macroeconomics, Financial Markets", orders: 475, successRate: 97, replyTime: "Replies in 8 mins", isOnline: true },
    { id: 11, name: "Meredith W.", rating: 4.7, reviews: 330, qualification: "Master's in Sociology", expertise: "Social Theory, Cultural Studies, Urban Sociology", orders: 388, successRate: 96, replyTime: "Replies in 30 mins", isOnline: false },
    { id: 12, name: "Ewan S.", rating: 4.8, reviews: 420, qualification: "Master's in Chemistry", expertise: "Organic Chemistry, Biochemistry, Pharmacology", orders: 460, successRate: 98, replyTime: "Replies in 12 mins", isOnline: true },
    { id: 13, name: "Greer T.", rating: 4.9, reviews: 495, qualification: "Ph.D. in Philosophy", expertise: "Ethics, Metaphysics, Ancient Philosophy", orders: 540, successRate: 99, replyTime: "Replies instantly", isOnline: true },
    { id: 14, name: "Theron F.", rating: 4.7, reviews: 350, qualification: "Master's in Art History", expertise: "Renaissance Art, Modern Art, Art Criticism", orders: 399, successRate: 95, replyTime: "Replies in 45 mins", isOnline: false },
    { id: 15, name: "Sutton E.", rating: 4.8, reviews: 435, qualification: "Master's in Communications", expertise: "Media Studies, Public Relations, Journalism", orders: 481, successRate: 97, replyTime: "Replies in 6 mins", isOnline: true },
    { id: 16, name: "Caspian V.", rating: 4.9, reviews: 470, qualification: "Ph.D. in Physics", expertise: "Quantum Mechanics, Astrophysics, Particle Physics", orders: 515, successRate: 99, replyTime: "Replies in 4 mins", isOnline: true },
    { id: 17, name: "Philippa N.", rating: 4.8, reviews: 405, qualification: "Master's in Law (LL.M.)", expertise: "Corporate Law, International Law, Human Rights", orders: 445, successRate: 98, replyTime: "Replies in 15 mins", isOnline: true },
    { id: 18, name: "Rhys H.", rating: 4.7, reviews: 365, qualification: "Master's in Geography", expertise: "Human Geography, GIS, Environmental Planning", orders: 410, successRate: 96, replyTime: "Replies in 1 hour", isOnline: false },
    { id: 19, name: "Audra P.", rating: 4.9, reviews: 510, qualification: "Ph.D. in Anthropology", expertise: "Cultural Anthropology, Archaeology, Ethnography", orders: 570, successRate: 100, replyTime: "Replies in 2 mins", isOnline: true },
    { id: 20, name: "Finnegan D.", rating: 4.8, reviews: 440, qualification: "Master's in Education", expertise: "Curriculum Development, Educational Psychology, Pedagogy", orders: 490, successRate: 97, replyTime: "Replies in 9 mins", isOnline: true },
    { id: 21, name: "Siobhan Z.", rating: 4.7, reviews: 370, qualification: "Master's in Marketing", expertise: "Digital Marketing, SEO, Consumer Behavior", orders: 415, successRate: 96, replyTime: "Replies in 25 mins", isOnline: false },
    { id: 22, name: "Whittaker R.", rating: 4.9, reviews: 480, qualification: "Ph.D. in Mathematics", expertise: "Applied Mathematics, Statistics, Abstract Algebra", orders: 525, successRate: 99, replyTime: "Replies instantly", isOnline: true },
    { id: 23, name: "Maeve T.", rating: 4.8, reviews: 425, qualification: "Master's in Environmental Science", expertise: "Climate Change, Conservation, Sustainability", orders: 470, successRate: 97, replyTime: "Replies in 10 mins", isOnline: true },
    { id: 24, name: "Stellan G.", rating: 4.7, reviews: 355, qualification: "Ph.D. in Linguistics", expertise: "Sociolinguistics, Phonetics, Syntax", orders: 405, successRate: 95, replyTime: "Replies in 50 mins", isOnline: false },
    { id: 25, name: "Genevieve B.", rating: 4.9, reviews: 499, qualification: "Master's in Public Health", expertise: "Epidemiology, Health Policy, Global Health", orders: 550, successRate: 99, replyTime: "Replies in 5 mins", isOnline: true },
    { id: 26, name: "Orson C.", rating: 4.8, reviews: 415, qualification: "Master's in Film Studies", expertise: "Film Theory, Cinema History, Screenwriting", orders: 455, successRate: 97, replyTime: "Replies in 15 mins", isOnline: true },
    { id: 27, name: "Imogen W.", rating: 4.7, reviews: 375, qualification: "Ph.D. in Religious Studies", expertise: "World Religions, Theology, Ancient Texts", orders: 420, successRate: 96, replyTime: "Replies in 35 mins", isOnline: false },
    { id: 28, name: "Killian M.", rating: 4.9, reviews: 520, qualification: "Master's in Finance", expertise: "Investment Banking, Corporate Finance, Portfolio Management", orders: 585, successRate: 100, replyTime: "Replies instantly", isOnline: true },
    { id: 29, name: "Bellamy K.", rating: 4.8, reviews: 450, qualification: "Master's in Music Theory", expertise: "Composition, Musicology, Ethnomusicology", orders: 500, successRate: 98, replyTime: "Replies in 7 mins", isOnline: true },
    { id: 30, name: "Ronan A.", rating: 4.9, reviews: 530, qualification: "Ph.D. in Sociology", expertise: "Criminology, Social Stratification, Research Methods", orders: 600, successRate: 99, replyTime: "Replies in 3 mins", isOnline: true }
  ];

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading for authentic feel
    setTimeout(() => {
        setDisplayedWriters(prev => Math.min(prev + 6, allWriters.length));
        setLoading(false);
    }, 600);
  };

  const visibleWriters = allWriters.slice(0, displayedWriters);
  const hasMoreWriters = displayedWriters < allWriters.length;

  return (
    <div className="bg-gray-50/50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative py-20 bg-white overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 font-bold tracking-wide uppercase text-xs mb-4 border border-primary-100">
                Verified Expert Database
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Meet the Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-500">Excellence</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We don't just hire writers; we partner with scholars. Our team is curated from the top 1% of applicants, ensuring that your work is handled by a true subject matter expert.
            </p>
          </div>

          {/* Trust Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:border-blue-100 transition-colors">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-500">Degree Holders</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:border-emerald-100 transition-colors">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:border-purple-100 transition-colors">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-500">On-Time Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Writers Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">Featured Experts</h2>
                <span className="hidden sm:inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-semibold">Live Status</span>
            </div>
            <div className="text-sm text-gray-500 font-medium bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                Showing <span className="text-gray-900 font-bold">{visibleWriters.length}</span> of {allWriters.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleWriters.map((writer) => (
              <WriterCard key={writer.id} writer={writer} />
            ))}
          </div>

          {hasMoreWriters && (
            <div className="mt-16 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="group relative inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white bg-gray-900 rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-primary-500/30 disabled:opacity-70 disabled:cursor-wait transform hover:-translate-y-0.5"
              >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading profiles...
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        View More Experts
                        <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Chat directly with experts</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Found your perfect match?</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with your chosen writer instantly on the order form. Secure your grade with a verified expert today.
          </p>
          <Link
            to="/order-now"
            className="inline-block bg-white text-gray-900 hover:bg-gray-50 font-bold py-4 px-12 rounded-full shadow-2xl shadow-white/10 transition-all transform hover:scale-105 active:scale-95"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Writers;