// src/components/Layout/MobileServicesMenu.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { servicesMenu } from '../../data/servicesData'; // Import the new data

interface MobileServicesMenuProps {
  onLinkClick: () => void;
}

export default function MobileServicesMenu({ onLinkClick }: MobileServicesMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
      {servicesMenu.map((category) => {
        const isExpanded = expandedCategory === category.name;
        return (
          <div key={category.name}>
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex justify-between items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <span className="font-medium">{category.name}</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
              <div className="ml-4 pl-2 border-l-2 border-primary-500 space-y-1 mt-1">
                {category.subServices.map((service) => (
                  <Link
                    key={service.name}
                    to={service.link}
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={onLinkClick}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}