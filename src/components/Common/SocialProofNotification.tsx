import React from 'react';

const PRIMARY_COLOR = '#20c997';
const SECONDARY_COLOR = '#1976d2'; // Modern blue

// --- Data lists and utility ---
const PAPER_TYPES = [
  'Research Paper', 'Essay', 'Literature Review', 'Case Study', 'Annotated Bibliography', 'Thesis', 'Dissertation', 'Research Proposal', 'Term Paper', 'Lab Report', 'Book Review', 'Article Critique', 'Systematic Review', 'Meta-Analysis', 'Position Paper', 'White Paper', 'Policy Brief', 'Feasibility Report', 'Technical Report', 'Project Report', 'Progress Report', 'Reflective Journal', 'Personal Statement', 'Statement of Purpose', 'Admission Essay', 'Scholarship Essay', 'Expository Essay', 'Argumentative Paper', 'Persuasive Essay', 'Compare and Contrast Essay', 'Cause and Effect Paper', 'Analytical Paper', 'Interpretive Paper', 'Discussion Board Post', 'Capstone Project', 'Field Report', 'Grant Proposal', 'Business Plan', 'Marketing Plan', 'SWOT Analysis', 'Manuscript', 'Conference Paper', 'Abstract', 'Executive Summary', 'Legal Brief', 'Memorandum of Law', 'Clinical Case Report', 'Patient Case Study', 'Research Summary', 'Thesis Chapter', 'Dissertation Prospectus', 'Concept Paper', 'Quantitative Analysis Report', 'Qualitative Study', 'Survey Research Paper', 'Experimental Paper', 'Observational Study Report'
];
const SUBJECTS = [
  'History', 'Psychology', 'Sociology', 'Literature', 'Philosophy', 'Political Science', 'Economics', 'Business Administration', 'Marketing', 'Finance', 'Nursing', 'Public Health', 'Computer Science', 'Biology', 'Chemistry', 'Physics', 'Environmental Science', 'Mechanical Engineering', 'Law', 'Criminology', 'Anthropology', 'International Relations', 'Art History', 'Music Theory', 'Architecture', 'Film Studies', 'Linguistics', 'Education', 'Social Work', 'Data Science', 'Neuroscience', 'Gender Studies', 'Urban Planning', 'Marine Biology', 'Astrophysics', 'Chemical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Macroeconomics', 'Microeconomics', 'Corporate Finance', 'Human Resource Management', 'Strategic Management', 'Supply Chain Management', 'English Literature', 'American History', 'European History', 'Ancient Philosophy', 'Ethics', 'Political Theory', 'Developmental Psychology', 'Cognitive Science', 'Abnormal Psychology', 'Social Psychology', 'Quantum Physics', 'Organic Chemistry', 'Genetics', 'Ecology', 'Statistics', 'Calculus', 'Software Development', 'Artificial Intelligence', 'Cybersecurity', 'Medical Science', 'Pharmacy', 'Kinesiology', 'Nutrition Science', 'Occupational Therapy', 'Physical Therapy', 'Early Childhood Education', 'Higher Education Administration', 'International Law', 'Constitutional Law', 'Criminal Justice', 'Forensic Science', 'Cultural Anthropology', 'Archaeology', 'Religious Studies', 'Theology', 'Classical Studies', 'East Asian Studies', 'African Studies', 'Latin American Studies', 'Communication Studies', 'Journalism', 'Public Relations', 'Graphic Design', 'Industrial Design', 'Theatre Arts', 'Dance', 'Geology', 'Geography', 'Meteorology', 'Oceanography', 'Agricultural Science', 'Veterinary Science', 'Forestry', 'Hospitality Management', 'Tourism Studies', 'Real Estate', 'Public Policy', 'Human Rights', 'Peace and Conflict Studies'
];
const LOCATIONS = [
  'Bozeman', 'Ames', 'Fayetteville', 'Bend', 'Ithaca', 'Flagstaff', 'Carbondale', 'Athens', 'Oshkosh', 'Laramie', 'Leamington Spa', 'Harrogate', 'Aberystwyth', 'Chichester', 'Stirling', 'Frome', 'Ludlow', 'Alnwick', 'Buxton', 'Enniskillen', 'Guelph', 'Kelowna', 'Moncton', 'Red Deer', 'Chicoutimi', 'Kamloops', 'Nanaimo', 'Fredericton', 'Moose Jaw', 'Whitehorse', 'Wollongong', 'Toowoomba', 'Ballarat', 'Bendigo', 'Launceston', 'Albany', 'Hervey Bay', 'Coffs Harbour', 'Bunbury', 'Rockhampton', 'Dunedin', 'Napier', 'New Plymouth', 'Invercargill', 'Whanganui', 'Gisborne', 'Nelson', 'Timaru', 'Blenheim', 'Rotorua', 'Ghent', 'Utrecht', 'Aarhus', 'Bergen', 'Malmö', 'Leipzig', 'Bologna', 'Seville', 'Brno', 'Wrocław', 'Marfa', 'Galena', 'Joseph', 'Whitefish', 'Beaufort', 'Decorah', 'Selma', 'Nantucket', 'Lunenburg', 'North Hatley', 'Brigus', 'Goderich', 'Tenterfield', 'Armidale', 'Bellingen', 'Montville', 'Rutherglen', 'Warburton', 'Sassafras', 'Broome', 'Townsville', 'Hyden', 'Humpty Doo', 'Kingston SE', 'Penguin', 'Silverton', 'Oodnadatta', 'Bungendore', 'Marysville', 'Winton', 'Coromandel', 'Taihape', 'Martinborough', 'Akaroa', 'Cromwell', 'Havelock', 'Clyde', 'Hanmer Springs', 'Görlitz', 'Granada', 'Toulouse', 'Sighisoara', 'Bremen', 'Zagreb', 'Graz', 'Berat', 'Annecy', 'Durham', 'Erfurt', 'Bansko', 'Nisyros', 'Monsanto', 'Plovdiv', 'Olomouc', 'Debrecen', 'Kaunas', 'Tartu', 'Haarlem', 'Lugano', 'Coimbra', 'Trondheim', 'San Sebastián', 'Lucerne', 'Dinant', 'Colmar', 'Giethoorn', 'Albi', 'Ronda', 'Orvieto', 'Ptuj', 'Kuldīga', 'Piran', 'Hallstatt', 'Guimarães', 'Bibury', 'Cochem', 'Telč', 'Rothenburg', 'Cesky Krumlov', 'Alberobello', 'Carcassonne', 'Portree', 'Oban', 'Tenby', 'Whitby', 'Haworth', 'Bakewell', 'Ripon', 'St Davids', 'Inveraray', 'Plockton', 'Tobermory', 'Portmeirion', 'Matlock', 'Hexham', 'Bakewell', 'Uppingham', 'Stamford', 'Ely', 'Bury St Edmunds', 'Sherborne', 'Shaftesbury', 'Dartmouth', 'Salcombe', 'Fowey', 'Padstow', 'St Ives', 'Penzance', 'Falmouth', 'Truro', 'Orange', 'Bathurst', 'Dubbo', 'Tamworth', 'Armidale', 'Lismore', 'Kalgoorlie', 'Geraldton', 'Port Hedland', 'Karratha', 'Broome', 'Mount Gambier', 'Port Lincoln', 'Whyalla', 'Port Pirie', 'Murray Bridge', 'Victor Harbor', 'Palmerston North', 'Hastings', 'Tauranga', 'Hamilton', 'Queenstown', 'Wanaka', 'Greymouth', 'Hokitika', 'Westport', 'Revelstoke', 'Canmore', 'Banff', 'Jasper', 'Penticton', 'Vernon', 'Nelson', 'Whistler', 'Squamish', 'Tofino', 'Ucluelet', 'Corner Brook', 'Gander', 'Grand Falls-Windsor', 'Charlottetown', 'Summerside', 'Yellowknife', 'Iqaluit', 'Dawson City', 'Aspen', 'Vail', 'Telluride', 'Park City', 'Jackson', 'Taos', 'Sedona', 'Bisbee', 'Carmel-by-the-Sea', 'Sausalito', 'Eureka', 'Ashland', 'Hood River', 'Coeur d\'Alene', 'Sandpoint', 'Whitefish', 'Kalispell', 'Missoula', 'Helena', 'Cody', 'Sheridan'
];
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
// --- End data lists ---

const TIME_AGO_LIST = [
  'just now',
  'a moment ago',
  '5 minutes ago',
  '12 minutes ago',
  '22 minutes ago',
  'about an hour ago',
  'earlier today',
];

// SVG icons
const ServiceIcon = () => (
  <div style={{
    width: 28, height: 28, borderRadius: '0.9rem', background: 'rgba(255,255,255,0.16)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(32,201,151,0.08)',
    marginRight: 8, flexShrink: 0
  }}>
    <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="20" height="16" rx="3" fill="#fff" fillOpacity="0.18"/>
      <rect x="7" y="9" width="14" height="2" rx="1" fill={PRIMARY_COLOR}/>
      <rect x="7" y="13" width="10" height="2" rx="1" fill={PRIMARY_COLOR}/>
      <rect x="7" y="17" width="6" height="2" rx="1" fill={PRIMARY_COLOR}/>
    </svg>
  </div>
);

const HIGHLIGHT_COLOR = PRIMARY_COLOR;
const PROVESOURCE_COLOR = PRIMARY_COLOR; // Use brand accent teal for highlight

const CheckmarkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
    <circle cx="9" cy="9" r="9" fill={HIGHLIGHT_COLOR} fillOpacity="0.15"/>
    <path d="M5 9.5L8 12.5L13 7.5" stroke={HIGHLIGHT_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface SocialProofNotificationProps {
  visible: boolean;
  content: string;
  animationState: 'entering' | 'exiting' | 'hidden' | 'visible';
  timeAgo?: string;
}

const parseContent = (content: string) => {
  // Try to extract key details for bolding
  // Template 1: Someone from {city} just ordered a {paperType} in {subject}.
  let match = content.match(/Someone from (.+?) just ordered a (.+?) in (.+?)\./);
  if (match) return { location: match[1], paperType: match[2], subject: match[3], plural: false };
  // Template 2: A {paperType} on {subject} was just ordered from {city}.
  match = content.match(/A (.+?) on (.+?) was just ordered from (.+?)\./);
  if (match) return { location: match[3], paperType: match[1], subject: match[2], plural: false };
  // Template 3: {N} people recently ordered a {paperType}.
  match = content.match(/(\d+) people recently ordered a (.+?)\./);
  if (match) return { location: '', paperType: match[2], subject: '', plural: true, pluralCount: match[1] };
  // Fallback
  return { location: '', paperType: '', subject: '', plural: false };
};

const SocialProofNotification: React.FC<SocialProofNotificationProps> = ({ visible, content, animationState, timeAgo }) => {
  // Animation classes
  let animationClass = '';
  if (animationState === 'entering') {
    animationClass = 'spn-enter';
  } else if (animationState === 'exiting') {
    animationClass = 'spn-exit';
  } else if (animationState === 'hidden') {
    animationClass = 'spn-hidden';
  } else {
    animationClass = 'spn-visible';
  }

  return (
    <div
      className={`spn-notification fixed bottom-6 left-6 z-50 ${animationClass}`}
      style={{
        background: `linear-gradient(90deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
        borderRadius: '1rem',
        boxShadow: '0 4px 16px rgba(25,118,210,0.10)',
        padding: '0.5rem 1rem 0.5rem 0.5rem',
        fontFamily: 'Inter, system-ui, Arial, sans-serif',
        color: '#fff',
        pointerEvents: visible ? 'auto' : 'none',
        minWidth: 200,
        maxWidth: 320,
        display: 'flex',
        alignItems: 'center',
        wordBreak: 'break-word',
      }}
      aria-live="polite"
    >
      <ServiceIcon />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.92rem', lineHeight: 1.32, marginBottom: 1, fontWeight: 400 }}>
          {content}
        </div>
        {/* Timestamp line */}
        {timeAgo && (
          <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400, marginBottom: 1 }}>
            {timeAgo}
          </div>
        )}
        <div style={{ fontSize: '0.78rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', fontWeight: 500, marginTop: 1 }}>
          <span style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.70)',
            borderRadius: '0.9rem',
            padding: '1.5px 10px 1.5px 4px',
            color: HIGHLIGHT_COLOR,
            fontWeight: 600,
            fontStyle: 'normal',
            boxShadow: '0 1px 4px rgba(32,201,151,0.08)',
          }}>
            <CheckmarkIcon />
            <span style={{ fontWeight: 500, color: '#222', fontStyle: 'normal' }}>Verified by </span>
            <span style={{
              fontFamily: 'Poppins, system-ui, Arial, sans-serif',
              color: PROVESOURCE_COLOR,
              fontWeight: 700,
              letterSpacing: '0.01em',
              marginLeft: 2,
              fontSize: '0.82rem',
            }}>ProveSource</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export { SocialProofNotification };

// General & Common Paper Types
const GENERAL_PAPER_TYPES = [
  'Research Paper', 'Essay', 'Term Paper', 'Annotated Bibliography', 'Literature Review', 'Article Critique', 'Research Proposal', 'Abstract', 'Presentation', 'Reflective Journal'
];

// Category-specific subjects and paper types
const CATEGORY_MAP: Record<string, { subjects: string[]; paperTypes: string[]; userTypes: string[] }> = {
  STEM: {
    subjects: [
      'Biology', 'Chemistry', 'Physics', 'Computer Science', 'Data Science', 'Environmental Science', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Astrophysics', 'Genetics', 'Ecology', 'Statistics', 'Calculus', 'Software Development', 'Artificial Intelligence', 'Cybersecurity', 'Geology'
    ],
    paperTypes: [
      'Lab Report', 'Technical Report', 'Feasibility Study', 'Systematic Review', 'Quantitative Analysis Report', 'Experimental Paper', 'Data Analysis Report', 'Project Report', 'Manuscript'
    ],
    userTypes: ['PhD researcher', 'graduate student', 'researcher', 'student']
  },
  Humanities: {
    subjects: [
      'History', 'Psychology', 'Sociology', 'Literature', 'Philosophy', 'Political Science', 'Anthropology', 'International Relations', 'Gender Studies', 'Religious Studies', 'Classical Studies', 'Communication Studies', 'Archaeology'
    ],
    paperTypes: [
      'Argumentative Paper', 'Persuasive Essay', 'Compare and Contrast Essay', 'Book Review', 'Position Paper', 'Qualitative Study', 'Discourse Analysis', 'Interpretive Paper', 'Expository Essay', 'Thesis Chapter'
    ],
    userTypes: ['university student', 'college student', 'student']
  },
  Business: {
    subjects: [
      'Business Administration', 'Marketing', 'Finance', 'Economics', 'Human Resource Management', 'Strategic Management', 'Supply Chain Management', 'Hospitality Management', 'Real Estate', 'Public Policy'
    ],
    paperTypes: [
      'Case Study', 'Business Plan', 'Marketing Plan', 'SWOT Analysis', 'Feasibility Report', 'White Paper', 'Policy Brief', 'Executive Summary', 'Progress Report'
    ],
    userTypes: ['business student', 'MBA candidate', 'student']
  },
  Health: {
    subjects: [
      'Nursing', 'Public Health', 'Medical Science', 'Pharmacy', 'Kinesiology', 'Nutrition Science', 'Occupational Therapy', 'Physical Therapy', 'Neuroscience'
    ],
    paperTypes: [
      'Clinical Case Report', 'Patient Case Study', 'Systematic Review', 'Meta-Analysis', 'Grant Proposal', 'Observational Study Report', 'Health Policy Brief'
    ],
    userTypes: ['medical student', 'nursing student', 'student']
  },
  Law: {
    subjects: [
      'Law', 'Criminology', 'International Law', 'Constitutional Law', 'Criminal Justice', 'Forensic Science', 'Human Rights'
    ],
    paperTypes: [
      'Legal Brief', 'Memorandum of Law', 'Case Brief', 'Policy Analysis', 'Position Paper'
    ],
    userTypes: ['law student', 'paralegal', 'student']
  },
  Arts: {
    subjects: [
      'Art History', 'Music Theory', 'Architecture', 'Film Studies', 'Graphic Design', 'Theatre Arts', 'Education', 'Early Childhood Education'
    ],
    paperTypes: [
      'Admission Essay', 'Personal Statement', 'Statement of Purpose', 'Capstone Project', 'Portfolio Statement', 'Curriculum Plan', 'Exhibition Review'
    ],
    userTypes: ['art student', 'music student', 'architecture student', 'student']
  }
};

// Helper to get category by subject
function getCategoryBySubject(subject: string): string | null {
  for (const [cat, data] of Object.entries(CATEGORY_MAP)) {
    if (data.subjects.includes(subject)) return cat;
  }
  return null;
}

// Helper to get a logical paper type for a subject
function getLogicalPaperType(subject: string): string {
  const category = getCategoryBySubject(subject);
  let paperTypes = [...GENERAL_PAPER_TYPES];
  if (category) paperTypes = paperTypes.concat(CATEGORY_MAP[category].paperTypes);
  return getRandomItem(paperTypes);
}

// Helper to get a logical user type for a subject
function getLogicalUserType(subject: string): string {
  const category = getCategoryBySubject(subject);
  if (category) return getRandomItem(CATEGORY_MAP[category].userTypes);
  return 'student';
}

// Helper to get a random time reference
const TIME_REFERENCES = [
  'Just now', 'A few minutes ago', 'Earlier today', 'Recently'
];

export function generateNotificationContent() {
  const subject = getRandomItem(SUBJECTS);
  const paperType = getLogicalPaperType(subject);
  const city = getRandomItem(LOCATIONS);
  const userType = getLogicalUserType(subject);
  const timeRef = getRandomItem(TIME_REFERENCES);

  // Template 1: Classic & Trustworthy
  const template1 = `A ${userType} from ${city} has just commissioned a ${paperType} in ${subject}.`;
  // Template 2: Expertise Angle
  const template2 = `Our ${subject} specialist is now working on a detailed ${paperType} for a ${userType} from ${city}.`;
  // Template 3: Simple & Quick
  const template3 = `${timeRef}, a ${paperType} in ${subject} was ordered by a ${userType} in ${city}.`;

  const templates = [template1, template2, template3];
  const message = getRandomItem(templates);
  return {
    message,
    timeAgo: undefined // Not needed, as timeRef is in template3
  };
} 