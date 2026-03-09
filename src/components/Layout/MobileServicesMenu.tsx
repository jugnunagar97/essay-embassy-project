// src/components/Layout/MobileServicesMenu.tsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, XCircle } from 'lucide-react';
import { useServiceCategories, useSubServices } from '../../hooks/useData';
import type { ServiceCategory, SubService } from '../../types';

interface MobileServicesMenuProps {
  onClose: () => void;
}

export default function MobileServicesMenu({ onClose }: MobileServicesMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const { categories, isLoading: isLoadingCategories } = useServiceCategories();
  const { services, isLoading: isLoadingServices } = useSubServices();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const structuredCategories = useMemo(() => {
    if (isLoadingCategories || isLoadingServices) {
      return [];
    }

    const activeCategories = (categories as ServiceCategory[])
      .filter((cat) => cat.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const dbCategories = activeCategories
      .map((category) => {
        const subServices = (services as SubService[])
          .filter((service) =>
            service.categoryId === category.id &&
            service.isActive &&
            service.name.trim() !== 'My Assignment Help'
          )
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        return {
          id: category.id,
          name: category.name,
          isActive: category.isActive,
          subServices: subServices.map(s => ({
            id: s.id,
            name: s.name,
            link: `/services/${s.link}`
          })),
        };
      })
      .filter((category) => category.subServices.length > 0);

    const pillarServicesGroup = {
      id: 'pillar-services',
      name: '',
      isActive: true,
      subServices: [
        { id: 'p1', name: 'Essay Writing Services', link: '/essay-writing' },
        { id: 'p1-c1', name: '  ↳ Argumentative Essay Writing', link: '/essay-writing/argumentative' },
        { id: 'p1-c2', name: '  ↳ Persuasive Essay Writing', link: '/essay-writing/persuasive' },
        { id: 'p1-c3', name: '  ↳ Narrative Essay Writing', link: '/essay-writing/narrative' },
        { id: 'p1-c4', name: '  ↳ Descriptive Essay Writing', link: '/essay-writing/descriptive' },
        { id: 'p1-c5', name: '  ↳ Expository Essay Writing', link: '/essay-writing/expository' },
        { id: 'p1-c6', name: '  ↳ Analytical Essay Writing', link: '/essay-writing/analytical' },
        { id: 'p1-c7', name: '  ↳ Compare & Contrast Essay Writing', link: '/essay-writing/compare-contrast' },
        { id: 'p1-c8', name: '  ↳ Cause and Effect Essay Writing', link: '/essay-writing/cause-effect' },
        { id: 'p1-c9', name: '  ↳ Problem Solution Essay Writing', link: '/essay-writing/problem-solution' },
        { id: 'p1-c10', name: '  ↳ Critical Analysis Essay Writing', link: '/essay-writing/critical-analysis' },
        { id: 'p1-c11', name: '  ↳ Admission Essay Writing', link: '/essay-writing/admission' },
        { id: 'p2', name: 'Assignment Help', link: '/assignment-help' },
        { id: 'p3', name: 'Homework Help', link: '/homework-help' },
        { id: 'p4', name: 'Paper Writing Services', link: '/paper-writing-services' },
        { id: 'p5', name: 'Thesis Writing Services', link: '/thesis-writing-services' },
        { id: 'p6', name: 'Dissertation Writing Services', link: '/dissertation-writing-services' },
      ]
    };

    return [pillarServicesGroup, ...dbCategories];
  }, [categories, services, isLoadingCategories, isLoadingServices]);

  if (isLoadingCategories || isLoadingServices) {
    return (
      <div className="lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 flex items-center justify-center">
        <p className="text-gray-500">Loading services menu...</p>
      </div>
    );
  }

  return (
    <div className="lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 overflow-y-auto transform transition-transform duration-300 ease-in-out">
      {/* Mobile Menu Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
        <button onClick={onClose} className="text-gray-600 dark:text-gray-300 hover:text-primary-600" aria-label="Close menu">
          <XCircle size={24} />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="p-4 space-y-2">
        {structuredCategories.length > 0 && (
          <Link
            to="/services"
            onClick={onClose}
            className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            All Services
          </Link>
        )}

        {structuredCategories.length === 0 ? (
          <p className="px-3 py-2 text-gray-500 text-sm">No active services or categories found.</p>
        ) : (
          structuredCategories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            return (
              <div key={category.id} className="border-t border-gray-100 dark:border-gray-700 pt-2 first:border-t-0 first:pt-0">
                {category.name && (
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex justify-between items-center px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border-b border-gray-100"
                  >
                    <span>{category.name}</span>
                    <ChevronDown size={20} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
                {(!category.name || isExpanded) && (
                  <div className={`${category.name ? 'ml-4 pl-2 border-l-2 border-primary-500' : ''} space-y-1 mt-1`}>
                    {category.subServices.map((service) => (
                      <Link
                        key={service.id}
                        to={service.link}
                        className="block px-3 py-2 text-base text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        onClick={onClose}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Other static navigation links */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
          <Link to="/samples" onClick={onClose} className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Samples</Link>
          <Link to="/reviews" onClick={onClose} className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Reviews</Link>
          <Link to="/about" onClick={onClose} className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">About</Link>
          <Link to="/blog" onClick={onClose} className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Blog</Link>
          <Link to="/contact" onClick={onClose} className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Contact</Link>
        </div>
      </nav>
    </div>
  );
}
