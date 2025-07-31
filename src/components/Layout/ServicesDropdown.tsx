// src/components/Layout/ServicesDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const PRIMARY_SERVICES = [
  {
    name: 'Essay Writing Services',
    slug: 'essay-writing',
    subServices: [
      { name: 'Admission Essay Writing', slug: 'admission' },
      { name: 'Narrative Essay', slug: 'narrative-essay' },
      { name: 'Argumentative Essay', slug: 'argumentative-essay' },
      { name: 'Scholarship Essay Writing', slug: 'scholarship-essay' },
      { name: 'Reflective Essay Writing', slug: 'reflective' },
      { name: 'Compare and Contrast Essay Writing', slug: 'compare-contrast' },
    ],
  },
  {
    name: 'Academic Writing Services',
    slug: 'academic-writing',
    subServices: [
      { name: 'Book Review', slug: 'book-review' },
      { name: 'Case Study', slug: 'case-study' },
      { name: 'Case Study Help', slug: 'case-study-help' },
      { name: 'Lab Report', slug: 'lab-report' },
      { name: 'Term Paper', slug: 'term-paper' },
    ],
  },
  {
    name: 'Assignment Help',
    slug: 'assignment-help',
    subServices: [
      { name: 'Management Assignment Help', slug: 'management' },
      { name: 'Engineering Assignment Help', slug: 'engineering' },
      { name: 'Mathematics Assignment Help', slug: 'math' },
      { name: 'English Assignment Help', slug: 'english-assignment-help' },
      { name: 'Physics Assignment Help', slug: 'physics-assignment-help' },
      { name: 'Accounting Assignment Help', slug: 'accounting' },
      { name: 'Chemistry Assignment Help', slug: 'chemistry' },
      { name: 'Maths Assignment Help', slug: 'maths' },
    ],
  },
  {
    name: 'Homework Help',
    slug: 'homework-help',
    subServices: [
      { name: 'Lab Report', slug: 'lab-report' },
    ],
  },
  {
    name: 'Programming Help',
    slug: 'programming-help',
    subServices: [
      { name: 'Python Programming Help', slug: 'python' },
      { name: 'Java Programming Help', slug: 'java' },
      { name: 'JS Programming Help', slug: 'js' },
      { name: 'C Programming Help', slug: 'c' },
      { name: 'C# Programming Help', slug: 'csharp' },
      { name: 'C++ Programming Help', slug: 'cpp' },
      { name: 'MATLAB Programming Help', slug: 'matlab' },
      { name: 'Ruby Programming Help', slug: 'ruby' },
    ],
  },
  {
    name: 'Thesis Writing Help',
    slug: 'thesis-writing-help',
    subServices: [],
  },
  {
    name: 'Dissertation Writing Help',
    slug: 'dissertation-writing-help',
    subServices: [],
  },
  {
    name: 'Research Paper Writing Help',
    slug: 'research-paper-help',
    subServices: [
      { name: 'Research Proposal', slug: 'research-proposal' },
    ],
  },
];

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 1024;
}

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePrimary, setActivePrimary] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Improved hover handling with delay
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (!isMobile()) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile()) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setActivePrimary(null);
      }, 150); // 150ms delay before closing
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActivePrimary(null);
        setMobileSubOpen(null);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Keyboard navigation and escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActivePrimary(null);
        setMobileSubOpen(null);
      }
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Desktop hover logic
  const handlePrimaryEnter = (slug: string) => {
    if (!isMobile()) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setActivePrimary(slug);
    }
  };

  const handlePrimaryLeave = () => {
    if (!isMobile()) {
      closeTimeoutRef.current = setTimeout(() => {
        setActivePrimary(null);
      }, 100); // 100ms delay for sub-menu
    }
  };

  // Mobile tap logic
  const handlePrimaryClick = (slug: string, e: React.MouseEvent) => {
    if (isMobile()) {
      e.preventDefault();
      setMobileSubOpen(mobileSubOpen === slug ? null : slug);
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center space-x-1 font-medium transition-colors px-3 py-2 rounded-lg
          ${isOpen ? 'bg-primary-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-700/20 dark:hover:text-primary-300'}`}
        style={{ minWidth: 110 }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span>Services</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 min-w-[260px] w-72 lg:w-80">
          <ul className="py-2">
            {PRIMARY_SERVICES.map((service) => {
              const hasSub = service.subServices.length > 0;
              const isActive = activePrimary === service.slug;
              return (
                <li
                  key={service.slug}
                  className="relative group"
                  onMouseEnter={() => handlePrimaryEnter(service.slug)}
                  onMouseLeave={handlePrimaryLeave}
                >
                  <Link
                    to={`/${service.slug}`}
                    className={`flex items-center justify-between px-5 py-2 text-sm font-semibold rounded-md transition-colors
                      ${isActive || (isMobile() && mobileSubOpen === service.slug) ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-300'}`}
                    onClick={hasSub && isMobile() ? (e) => handlePrimaryClick(service.slug, e) : undefined}
                    aria-haspopup={hasSub ? 'true' : undefined}
                    aria-expanded={hasSub && ((isMobile() && mobileSubOpen === service.slug) || (!isMobile() && isActive))}
                  >
                    <span>{service.name}</span>
                    {hasSub && <ChevronRight size={16} className="ml-2" />}
                  </Link>
                  {/* Sub-menu (Desktop: hover, Mobile: tap) */}
                  {hasSub && (
                    <div
                      className={`absolute top-0 left-full ml-1 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 z-50
                        ${isMobile() ? (mobileSubOpen === service.slug ? 'block' : 'hidden') : (isActive ? 'block' : 'hidden')}`}
                      style={{ minHeight: 0 }}
                    >
                      <ul className="py-2">
                        {service.subServices.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              to={`/${service.slug}/${sub.slug}`}
                              className="block px-5 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-300 rounded-md transition-colors"
                              onClick={() => { setIsOpen(false); setActivePrimary(null); setMobileSubOpen(null); }}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
