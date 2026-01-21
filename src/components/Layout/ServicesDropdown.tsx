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
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      }, 200); // 200ms delay before closing
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
      className="services-dropdown-wrapper"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`services-trigger ${isOpen ? 'active' : ''}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span>Services</span>
        <ChevronDown size={16} className={`trigger-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Invisible bridge to prevent gap hover issue */}
          <div className="dropdown-bridge" />

          <div className="services-dropdown-panel">
            {isLoadingData ? (
              <div className="dropdown-loading">Loading services…</div>
            ) : structuredCategories.length === 0 ? (
              <div className="dropdown-empty">No services available yet.</div>
            ) : (
              <div className="dropdown-grid">
                {structuredCategories.map((category) => (
                  <div key={category.id} className="dropdown-category">
                    <p className="category-title">{category.name}</p>
                    <ul className="category-links">
                      {category.services.map((service) => (
                        <li key={service.id}>
                          <Link
                            to={`/services/${service.link}`}
                            className="service-link"
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
            )}
          </div>
        </>
      )}

      <style>{`
        .services-dropdown-wrapper {
          position: relative;
        }

        .services-trigger {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 10px 16px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .services-trigger:hover,
        .services-trigger.active {
          color: #1652A0;
          background: rgba(22, 82, 160, 0.06);
        }

        .trigger-chevron {
          transition: transform 0.2s ease;
        }

        .trigger-chevron.open {
          transform: rotate(180deg);
        }

        /* Invisible bridge to connect button to dropdown */
        .dropdown-bridge {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 8px;
          background: transparent;
        }

        .services-dropdown-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          min-width: 280px;
          width: 680px;
          max-width: calc(100vw - 32px);
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(11, 31, 66, 0.12);
          z-index: 100;
          overflow: hidden;
        }

        .dropdown-loading,
        .dropdown-empty {
          padding: 24px;
          text-align: center;
          font-size: 14px;
          color: #64748B;
        }

        .dropdown-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 24px;
        }

        .dropdown-category {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .category-title {
          font-size: 11px;
          font-weight: 700;
          color: #1652A0;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #E2E8F0;
          margin: 0;
        }

        .category-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .service-link {
          display: block;
          padding: 8px 12px;
          font-size: 13px;
          color: #334155;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .service-link:hover {
          background: rgba(22, 82, 160, 0.06);
          color: #1652A0;
        }

        @media (max-width: 768px) {
          .services-dropdown-panel {
            width: 320px;
            grid-template-columns: 1fr;
          }

          .dropdown-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}

