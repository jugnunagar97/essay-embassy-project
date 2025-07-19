import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Percent, 
  FileCheck, 
  Star,
  User
} from 'lucide-react';

// Writer Card Component
interface Writer {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  qualification: string;
  expertise: string;
  orders: number;
}

interface WriterCardProps {
  writer: Writer;
}

const WriterCard = ({ writer }: WriterCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 text-white">
        <div className="flex items-center space-x-3">
          {/* Writer Image */}
          <div className="relative">
            <img 
              src={`/images/${writer.name}.jpg`}
              alt={`${writer.name} - Academic Writer`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const currentSrc = target.src;
                if (currentSrc.includes('.jpg')) {
                  target.src = currentSrc.replace('.jpg', '.png');
                } else if (currentSrc.includes('.png')) {
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }
              }}
            />
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hidden">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            {/* Online status indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
          </div>
          
          {/* Name and Rating */}
          <div className="flex-1">
            <h3 className="text-base font-bold mb-0.5">{writer.name}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {renderStars(writer.rating)}
              </div>
              <span className="text-xs text-primary-100">
                {writer.rating} ({writer.reviews})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-lg font-bold text-primary-600">{writer.orders}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Orders</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-lg font-bold text-green-600">{writer.rating}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Rating</div>
          </div>
        </div>

        {/* Qualification */}
        <div className="mb-3">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
            <span className="text-xs font-semibold text-gray-900">Qualification</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">{writer.qualification}</p>
        </div>

        {/* Expertise */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
            <span className="text-xs font-semibold text-gray-900">Expertise</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">{writer.expertise}</p>
        </div>

        {/* Hire Button */}
        <Link
          to="/order-now"
          className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 px-3 rounded-md font-semibold text-sm text-center hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          Hire Writer
        </Link>
      </div>
    </div>
  );
};

const Writers = () => {
  const [displayedWriters, setDisplayedWriters] = useState(6);

  // Writer data
  const allWriters: Writer[] = [
    {
      id: 1,
      name: "Bronwyn G.",
      rating: 4.9,
      reviews: 451,
      qualification: "Ph.D. in English Literature",
      expertise: "Shakespearean Studies, Modernist Poetry, Literary Theory",
      orders: 521
    },
    {
      id: 2,
      name: "Alistair P.",
      rating: 4.8,
      reviews: 398,
      qualification: "Master's in Business Administration",
      expertise: "Marketing Strategy, Business Management, Finance",
      orders: 488
    },
    {
      id: 3,
      name: "Tamsin R.",
      rating: 4.9,
      reviews: 512,
      qualification: "Ph.D. in Psychology",
      expertise: "Cognitive Psychology, Social Behavior, Clinical Studies",
      orders: 580
    },
    {
      id: 4,
      name: "Lachlan B.",
      rating: 4.7,
      reviews: 315,
      qualification: "Master's in Computer Science",
      expertise: "AI & Machine Learning, Software Development, Cybersecurity",
      orders: 397
    },
    {
      id: 5,
      name: "Rhiannon F.",
      rating: 4.8,
      reviews: 402,
      qualification: "Master's in History",
      expertise: "American History, European Studies, Political History",
      orders: 450
    },
    {
      id: 6,
      name: "Sterling C.",
      rating: 4.9,
      reviews: 489,
      qualification: "Ph.D. in Biology",
      expertise: "Molecular Biology, Genetics, Environmental Science",
      orders: 534
    },
    {
      id: 7,
      name: "Cordelia H.",
      rating: 4.8,
      reviews: 380,
      qualification: "Ph.D. in Political Science",
      expertise: "International Relations, Public Policy, Comparative Politics",
      orders: 421
    },
    {
      id: 8,
      name: "Cormac J.",
      rating: 4.7,
      reviews: 345,
      qualification: "Master's in Engineering",
      expertise: "Mechanical Engineering, Thermodynamics, Robotics",
      orders: 401
    },
    {
      id: 9,
      name: "Beverley M.",
      rating: 4.9,
      reviews: 501,
      qualification: "Master's in Nursing",
      expertise: "Healthcare Ethics, Patient Care, Medical Research",
      orders: 559
    },
    {
      id: 10,
      name: "Declan K.",
      rating: 4.8,
      reviews: 411,
      qualification: "Ph.D. in Economics",
      expertise: "Microeconomics, Macroeconomics, Financial Markets",
      orders: 475
    },
    {
      id: 11,
      name: "Meredith W.",
      rating: 4.7,
      reviews: 330,
      qualification: "Master's in Sociology",
      expertise: "Social Theory, Cultural Studies, Urban Sociology",
      orders: 388
    },
    {
      id: 12,
      name: "Ewan S.",
      rating: 4.8,
      reviews: 420,
      qualification: "Master's in Chemistry",
      expertise: "Organic Chemistry, Biochemistry, Pharmacology",
      orders: 460
    },
    {
      id: 13,
      name: "Greer T.",
      rating: 4.9,
      reviews: 495,
      qualification: "Ph.D. in Philosophy",
      expertise: "Ethics, Metaphysics, Ancient Philosophy",
      orders: 540
    },
    {
      id: 14,
      name: "Theron F.",
      rating: 4.7,
      reviews: 350,
      qualification: "Master's in Art History",
      expertise: "Renaissance Art, Modern Art, Art Criticism",
      orders: 399
    },
    {
      id: 15,
      name: "Sutton E.",
      rating: 4.8,
      reviews: 435,
      qualification: "Master's in Communications",
      expertise: "Media Studies, Public Relations, Journalism",
      orders: 481
    },
    {
      id: 16,
      name: "Caspian V.",
      rating: 4.9,
      reviews: 470,
      qualification: "Ph.D. in Physics",
      expertise: "Quantum Mechanics, Astrophysics, Particle Physics",
      orders: 515
    },
    {
      id: 17,
      name: "Philippa N.",
      rating: 4.8,
      reviews: 405,
      qualification: "Master's in Law (LL.M.)",
      expertise: "Corporate Law, International Law, Human Rights",
      orders: 445
    },
    {
      id: 18,
      name: "Rhys H.",
      rating: 4.7,
      reviews: 365,
      qualification: "Master's in Geography",
      expertise: "Human Geography, GIS, Environmental Planning",
      orders: 410
    },
    {
      id: 19,
      name: "Audra P.",
      rating: 4.9,
      reviews: 510,
      qualification: "Ph.D. in Anthropology",
      expertise: "Cultural Anthropology, Archaeology, Ethnography",
      orders: 570
    },
    {
      id: 20,
      name: "Finnegan D.",
      rating: 4.8,
      reviews: 440,
      qualification: "Master's in Education",
      expertise: "Curriculum Development, Educational Psychology, Pedagogy",
      orders: 490
    },
    {
      id: 21,
      name: "Siobhan Z.",
      rating: 4.7,
      reviews: 370,
      qualification: "Master's in Marketing",
      expertise: "Digital Marketing, SEO, Consumer Behavior",
      orders: 415
    },
    {
      id: 22,
      name: "Whittaker R.",
      rating: 4.9,
      reviews: 480,
      qualification: "Ph.D. in Mathematics",
      expertise: "Applied Mathematics, Statistics, Abstract Algebra",
      orders: 525
    },
    {
      id: 23,
      name: "Maeve T.",
      rating: 4.8,
      reviews: 425,
      qualification: "Master's in Environmental Science",
      expertise: "Climate Change, Conservation, Sustainability",
      orders: 470
    },
    {
      id: 24,
      name: "Stellan G.",
      rating: 4.7,
      reviews: 355,
      qualification: "Ph.D. in Linguistics",
      expertise: "Sociolinguistics, Phonetics, Syntax",
      orders: 405
    },
    {
      id: 25,
      name: "Genevieve B.",
      rating: 4.9,
      reviews: 499,
      qualification: "Master's in Public Health",
      expertise: "Epidemiology, Health Policy, Global Health",
      orders: 550
    },
    {
      id: 26,
      name: "Orson C.",
      rating: 4.8,
      reviews: 415,
      qualification: "Master's in Film Studies",
      expertise: "Film Theory, Cinema History, Screenwriting",
      orders: 455
    },
    {
      id: 27,
      name: "Imogen W.",
      rating: 4.7,
      reviews: 375,
      qualification: "Ph.D. in Religious Studies",
      expertise: "World Religions, Theology, Ancient Texts",
      orders: 420
    },
    {
      id: 28,
      name: "Killian M.",
      rating: 4.9,
      reviews: 520,
      qualification: "Master's in Finance",
      expertise: "Investment Banking, Corporate Finance, Portfolio Management",
      orders: 585
    },
    {
      id: 29,
      name: "Bellamy K.",
      rating: 4.8,
      reviews: 450,
      qualification: "Master's in Music Theory",
      expertise: "Composition, Musicology, Ethnomusicology",
      orders: 500
    },
    {
      id: 30,
      name: "Ronan A.",
      rating: 4.9,
      reviews: 530,
      qualification: "Ph.D. in Sociology",
      expertise: "Criminology, Social Stratification, Research Methods",
      orders: 600
    }
  ];

  const handleLoadMore = () => {
    setDisplayedWriters(prev => Math.min(prev + 6, allWriters.length));
  };

  const visibleWriters = allWriters.slice(0, displayedWriters);
  const hasMoreWriters = displayedWriters < allWriters.length;

  return (
    <div className="animate-fade-in bg-white">
      {/* Introduction & Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet Our Team of Expert Writers
              </h1>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Essay Embassy, we exclusively recruit the most qualified and skilled academic writers to help you achieve your goals. Our experts possess a genuine passion for writing, a meticulous attention to detail, and an unwavering commitment to delivering the best possible results.
              </p>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Let our team of experienced professionals handle your writing tasks with the excellence they deserve.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Writers?
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                No assignment is too complex for our team. Whether you need an essay, a research paper, or a dissertation, we guarantee content that exceeds expectations. The following qualities make our writers the best choice for your work:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Expertise:</strong> Our writers have years of experience in the academic writing industry, with the knowledge and skills to produce flawless essays on a vast range of subjects.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Quality:</strong> We understand the importance of high-quality work. From in-depth research to perfect formatting and proofreading, no detail is overlooked.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Timeliness:</strong> Deadlines are sacred to us. Our writers are committed to delivering exceptional essays on time, every time, even under pressure.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Support:</strong> Our writers are available to provide guidance throughout the process. They are always happy to answer any questions you may have about your order.
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column - Info Cards */}
            <div className="space-y-6">
              {/* Info Card 1 */}
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-primary-300 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Percent className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Our average page is <strong>300 WORDS</strong>, so you get up to <strong>20% more value</strong> than standard double-spaced pages.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Card 2 */}
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-primary-300 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <FileCheck className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Getting your paper done is easy with our <strong>streamlined ordering process</strong> and direct communication with your writer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Writers Showcase Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our List of Writers Available For Any Grade or Discipline
            </h2>
          </div>

          {/* Writers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visibleWriters.map((writer) => (
              <WriterCard key={writer.id} writer={writer} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreWriters && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Writers; 