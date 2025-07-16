import React from 'react';

const PRIMARY_COLOR = '#20c997';
const SECONDARY_COLOR = '#1976d2'; // Modern blue

// --- Data lists and utility ---
const PAPER_TYPES = [
  'Research Paper', 'Admissions Essay', 'Thesis Chapter', 'Case Study', 'Book Review',
  'Lab Report', 'Dissertation', 'Term Paper', 'Scholarship Essay', 'Argumentative Essay',
  'Programming Assignment', 'Homework Help', 'Assignment Help', 'English Essay', 'Physics Assignment',
];
const SUBJECTS = [
  'History', 'Computer Science', 'Psychology', 'Business', 'Nursing', 'Economics',
  'Sociology', 'Political Science', 'Literature', 'Engineering', 'Mathematics',
  'Biology', 'Philosophy', 'Education', 'Law',
];
const LOCATIONS = [
  'Bristol', 'Ghent', 'Toledo', 'Brno', 'Graz', 'Turku', 'Lille', 'Halifax', 'Odense',
  'Bergen', 'Pécs', 'Trieste', 'Kobe', 'Lodz', 'Debrecen', 'Aarhus', 'Cork', 'Uppsala',
  'Bielefeld', 'Perth', 'Boulder', 'Bendigo', 'Nancy', 'Sibiu', 'Tampere', 'Klaipeda',
  'Potsdam', 'Kingston', 'Rouen', 'Kalamazoo', 'Eindhoven', 'Kassel', 'Linz', 'Tartu',
  'Regina', 'Swansea', 'Jyvaskyla', 'Kolding', 'Kiel', 'Kecskemét', 'Kragujevac', 'Koper',
  'Kielce', 'Kokkola', 'Klagenfurt', 'Kaposvár', 'Kalisz', 'Kalamata', 'Kalisz', 'Kalisz',
  'Kalisz', 'Kalisz', 'Kalisz', 'Kalisz', 'Kalisz', 'Kalisz', 'Kalisz', 'Kalisz',
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
  const { location, paperType, subject, plural, pluralCount } = parseContent(content);

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
          {plural ? (
            <>
              <span style={{ fontWeight: 600 }}>{pluralCount}</span>
              <span style={{ fontWeight: 400, opacity: 0.92 }}>&nbsp;people recently ordered a&nbsp;</span>
              <span style={{ fontWeight: 600 }}>{paperType}</span>
              <span style={{ fontWeight: 400, opacity: 0.92 }}>.</span>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 400, opacity: 0.92 }}>Someone from </span>
              <span style={{ fontWeight: 600 }}>{location}</span>
              <span style={{ fontWeight: 400, opacity: 0.92 }}>&nbsp;just ordered a&nbsp;</span>
              <span style={{ fontWeight: 600 }}>{paperType}</span>
              <span style={{ fontWeight: 400, opacity: 0.92 }}>&nbsp;in&nbsp;</span>
              <span style={{ fontWeight: 600 }}>{subject}</span>
              <span style={{ fontWeight: 400, opacity: 0.92 }}>.</span>
            </>
          )}
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

export function generateNotificationContent() {
  const paperType = getRandomItem(PAPER_TYPES);
  const subject = getRandomItem(SUBJECTS);
  const location = getRandomItem(LOCATIONS);
  const timeAgo = getRandomItem(TIME_AGO_LIST);
  const pluralCount = Math.floor(Math.random() * 4) + 2; // 2-5

  // Message templates
  const templates = [
    // Template 1: Someone from {city} just ordered a {paperType} in {subject}.
    `Someone from ${location} just ordered a ${paperType} in ${subject}.`,
    // Template 2: A {paperType} on {subject} was just ordered from {city}.
    `A ${paperType} on ${subject} was just ordered from ${location}.`,
    // Template 3: {N} people recently ordered a {paperType}.
    `${pluralCount} people recently ordered a ${paperType}.`,
  ];
  const message = getRandomItem(templates);
  return {
    message,
    timeAgo,
  };
} 