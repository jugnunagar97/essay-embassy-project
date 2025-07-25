import React from 'react';

// --- Data lists and utility ---
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

interface SocialProofNotificationProps {
  visible: boolean;
  content: string;
  timeAgo?: string;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
  onClose?: () => void;
}

const NOTIF_BG_COLOR = '#fff';
const NOTIF_BORDER_COLOR = '#e3e8ee';
const NOTIF_TEXT_COLOR = '#23272F';
const NOTIF_FONT = 'Inter, system-ui, Arial, sans-serif';

const SocialProofNotification: React.FC<SocialProofNotificationProps> = ({ visible, content, timeAgo, isHovered, onHover, onClose }) => {
  // Universal: Always highlight paper type and location using known lists
  function highlightNotificationText(content: string) {
    // Highlight paper type
    let highlighted = content;
    // Build regex for paper types and locations
    const paperTypeRegex = new RegExp(`(${GENERAL_PAPER_TYPES.concat(...Object.values(CATEGORY_MAP).map(c => c.paperTypes)).sort((a,b)=>b.length-a.length).join('|')})`, 'i');
    const locationRegex = new RegExp(`(${LOCATIONS.sort((a,b)=>b.length-a.length).join('|')})`, 'i');
    // Only highlight first occurrence of each
    highlighted = highlighted.replace(paperTypeRegex, '<span class="notif-paper">$1</span>');
    highlighted = highlighted.replace(locationRegex, '<span class="notif-location">$1</span>');
    return highlighted;
  }

  return (
    <div
      className={`spn-notification`}
      style={{
        position: 'fixed',
        left: '1.5rem',
        bottom: '1.5rem',
        zIndex: 50,
        background: NOTIF_BG_COLOR,
        borderRadius: '0.7rem',
        boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
        padding: '0.7rem 1rem',
        fontFamily: NOTIF_FONT,
        color: NOTIF_TEXT_COLOR,
        pointerEvents: visible ? 'auto' : 'none',
        minWidth: 260,
        maxWidth: 340,
        wordBreak: 'break-word',
        border: `1.5px solid ${NOTIF_BORDER_COLOR}`,
        transition: 'box-shadow 0.2s',
        display: visible ? 'block' : 'none',
      }}
      aria-live="polite"
      onMouseEnter={() => onHover && onHover(true)}
      onMouseLeave={() => onHover && onHover(false)}
    >
      {/* Inline style for notif-location and notif-paper */}
      <style>{`
        .notif-location {
          color: #3bb77e;
          font-weight: 600;
          background: #f1f3f7;
          border-radius: 0.35rem;
          padding: 2px 6px;
          margin: 0 2px;
          display: inline-block;
        }
        .notif-paper {
          color: #1976d2;
          font-weight: 600;
          background: #f1f3f7;
          border-radius: 0.35rem;
          padding: 2px 6px;
          margin: 0 2px;
          display: inline-block;
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {/* Close button: absolute top-right, always reserved space, no layout shift */}
        <div style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            aria-label="Close notification"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              opacity: isHovered ? 0.7 : 0,
              visibility: isHovered ? 'visible' : 'hidden',
              transition: 'opacity 0.15s',
              width: 22,
              height: 22,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="11" fill="#e3e8ee"/>
              <path d="M7.5 7.5L14.5 14.5" stroke="#7b8794" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M14.5 7.5L7.5 14.5" stroke="#7b8794" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {/* Main text with responsive font size for long content */}
        <div style={{
          fontSize: content.length > 90 ? '0.78rem' : '0.91rem',
          lineHeight: 1.5,
          fontWeight: 500,
          fontFamily: NOTIF_FONT,
          color: NOTIF_TEXT_COLOR,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          paddingRight: 32, // space for close button
        }}
        dangerouslySetInnerHTML={{
          __html: highlightNotificationText(content)
        }}
        />
        {/* Time ago */}
        {timeAgo && (
          <div style={{
            fontSize: '0.7rem',
            color: '#7b8794',
            fontWeight: 500,
            marginTop: 2,
            fontFamily: NOTIF_FONT,
          }}>{timeAgo}</div>
        )}
        {/* Badge */}
        <div style={{
          fontSize: '0.7rem',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          marginTop: 8,
          background: '#f4f6fb',
          borderRadius: '0.6rem',
          padding: '2px 10px 2px 6px',
          color: '#3bb77e',
          fontStyle: 'normal',
          boxShadow: 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 3 }}>
            <circle cx="9" cy="9" r="9" fill="#3bb77e" fillOpacity="0.13" />
            <path d="M5 9.5L8 12.5L13 7.5" stroke="#3bb77e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 400, color: '#23272F', fontStyle: 'normal', marginRight: 2 }}>Verified by </span>
          <span style={{
            fontFamily: NOTIF_FONT,
            color: '#3bb77e',
            fontWeight: 600,
            marginLeft: 2,
            fontSize: '0.7rem',
          }}>Mytruetraffic.com</span>
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