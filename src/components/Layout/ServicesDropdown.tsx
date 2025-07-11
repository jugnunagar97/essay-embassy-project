// src/components/Layout/ServicesDropdown.tsx
import { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react'; // Make sure ChevronDown is imported
// Import the hooks to fetch dynamic data from Firestore
import { useServiceCategories, useSubServices } from '../../hooks/useData';
import { ServiceCategory, SubService } from '../../types'; // Import types

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Fetch categories and services from Firestore using your existing hooks
  const { categories, isLoading: isLoadingCategories } = useServiceCategories();
  const { services, isLoading: isLoadingServices } = useSubServices();

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

  // Memoize the structured menu data for efficient rendering
  const structuredServicesMenu = useMemo(() => {
    if (isLoadingCategories || isLoadingServices) {
      return []; // Return empty array while loading
    }

    // Filter and sort active categories
    const activeCategories = categories
      .filter((cat: ServiceCategory) => cat.isActive)
      .sort((a: ServiceCategory, b: ServiceCategory) => (a.order || 0) - (b.order || 0));

    // Structure the data: each category with its active, sorted sub-services
    return activeCategories.map((category: ServiceCategory) => {
      const subServices = services
        .filter((service: SubService) => service.categoryId === category.id && service.isActive)
        .sort((a: SubService, b: SubService) => (a.order || 0) - (b.order || 0));
      return {
        ...category, // Include all category properties
        subServices: subServices,
      };
    }).filter(category => category.subServices.length > 0); // Only show categories that have active services
  }, [categories, services, isLoadingCategories, isLoadingServices]);

  // Show nothing if still loading or no active categories with services
  if (isLoadingCategories || isLoadingServices || structuredServicesMenu.length === 0) {
    return null; // The component returns null, so the button itself won't be rendered if no data
  }

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
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 w-max min-w-[200px] md:min-w-[400px] lg:min-w-[600px] xl:min-w-[800px]"> {/* Adjusted min-width for better display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4"> {/* Adjusted grid for responsiveness */}
            {structuredServicesMenu.map((category) => (
              <div key={category.id} className="space-y-2"> {/* Use category.id as key */}
                <h3 className="font-bold text-sm text-gray-900 dark:text-white border-b border-primary-500 pb-1 mb-2">
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {category.subServices.map((service) => (
                    <li key={service.id}> {/* Use service.id as key */}
                      <Link
                        to={`/services/${service.link}`} // Link to the dynamic service page using its slug
                        className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        onClick={() => setIsOpen(false)} // Close dropdown on link click
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
