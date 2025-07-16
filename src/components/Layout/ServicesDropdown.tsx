// src/components/Layout/ServicesDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Effect to handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handlers for mouse enter/leave to control dropdown visibility with a slight delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setIsOpen(false), 200);
  };

  // Static services data - your existing service pages
  const servicesData = [
    {
      category: "Essay Writing",
      services: [
        { name: "Essay Writing", link: "essay-writing" },
        { name: "Argumentative Essay", link: "argumentative-essay" },
        { name: "Narrative Essay", link: "narrative-essay" },
        { name: "Admission Essay", link: "admission-essay" },
        { name: "Scholarship Essay", link: "scholarship-essay" },
      ]
    },
    {
      category: "Academic Writing",
      services: [
        { name: "Assignment Help", link: "assignment-help" },
        { name: "Homework Help", link: "homework-help" },
        { name: "Term Paper", link: "term-paper" },
        { name: "Research Paper", link: "research-paper-writing" },
        { name: "Research Proposal", link: "research-proposal" },
        { name: "Thesis Writing", link: "thesis-writing" },
        { name: "Dissertation Writing", link: "dissertation-writing" },
      ]
    },
    {
      category: "Specialized Help",
      services: [
        { name: "Case Study", link: "case-study" },
        { name: "Case Study Help", link: "case-study-help" },
        { name: "Book Review", link: "book-review" },
        { name: "Lab Report", link: "lab-report" },
        { name: "Programming Help", link: "programming-help" },
        { name: "English Assignment Help", link: "english-assignment-help" },
        { name: "Physics Assignment Help", link: "physics-assignment-help" },
      ]
    }
  ];

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Services</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 w-max min-w-[200px] md:min-w-[400px] lg:min-w-[600px] xl:min-w-[800px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
            {servicesData.map((category, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white border-b border-primary-500 pb-1 mb-2">
                  {category.category}
                </h3>
                <ul className="space-y-1">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex}>
                      <Link
                        to={`/services/${service.link}`}
                        className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
