// src/components/Layout/ServicesDropdown.tsx
import { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useServiceCategories, useSubServices } from '../../hooks/useData';
import type { ServiceCategory, SubService } from '../../types';

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 1024;
}

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { categories, isLoading: isLoadingCategories } = useServiceCategories();
  const { services, isLoading: isLoadingServices } = useSubServices();

  const isLoadingData = isLoadingCategories || isLoadingServices;

  const structuredCategories = useMemo(() => {
    if (isLoadingData) return [];
    const activeCategories = (categories as ServiceCategory[])
      .filter((category) => category.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    return activeCategories
      .map((category) => {
        const relatedServices = (services as SubService[])
          .filter((service) => service.categoryId === category.id && service.isActive)
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        return {
          id: category.id,
          name: category.name,
          services: relatedServices,
        };
      })
      .filter((group) => group.services.length > 0);
  }, [categories, services, isLoadingData]);

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
      }, 150); // 150ms delay before closing
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
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
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 min-w-[260px] w-[640px]">
          {isLoadingData ? (
            <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-300">Loading services…</div>
          ) : structuredCategories.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-300">No services available yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {structuredCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide uppercase">
                    {category.name}
                  </p>
                  <ul className="space-y-1.5">
                    {category.services.map((service) => (
                      <li key={service.id}>
                        <Link
                          to={`/services/${service.link}`}
                          className="flex items-center justify-between px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-300 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{service.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
