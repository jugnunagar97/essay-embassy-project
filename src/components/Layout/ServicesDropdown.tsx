// src/components/Layout/ServicesDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { servicesMenu } from '../../data/servicesData'; // Import the new data

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setIsOpen(false), 200);
  };

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
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 w-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            {servicesMenu.map((category) => (
              <div key={category.name} className="space-y-2">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white border-b border-primary-500 pb-1 mb-2">
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {category.subServices.map((service) => (
                    <li key={service.name}>
                      <Link
                        to={service.link}
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