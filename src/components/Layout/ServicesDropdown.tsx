// src/components/Layout/ServicesDropdown.tsx
import { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useServiceCategories, useSubServices } from '../../hooks/useData';
import type { ServiceCategory, SubService } from '../../types';

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 1024;
}

interface ChildService {
  id: string;
  name: string;
  link: string;
}

interface PillarService {
  id: string;
  name: string;
  link: string;
  children?: ChildService[];
}

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { categories, isLoading: isLoadingCategories } = useServiceCategories();
  const { services, isLoading: isLoadingServices } = useSubServices();

  const isLoadingData = isLoadingCategories || isLoadingServices;

  const structuredCategories = useMemo(() => {
    if (isLoadingData) return [];
    const activeCategories = (categories as ServiceCategory[])
      .filter((category) => category.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const dbCategories = activeCategories
      .map((category) => {
        const relatedServices = (services as SubService[])
          .filter((service) =>
            service.categoryId === category.id &&
            service.isActive &&
            service.name.trim() !== 'My Assignment Help'
          )
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        return {
          id: category.id,
          name: category.name,
          services: relatedServices.map(s => ({
            id: s.id,
            name: s.name,
            link: `/services/${s.link}`
          })) as PillarService[],
        };
      })
      .filter((group) => group.services.length > 0);

    const pillarServicesGroup = {
      id: 'pillar-services',
      name: '',
      services: [
        {
          id: 'p1', name: 'Essay Writing Services', link: '/essay-writing', children: [
            { id: 'p1-c1', name: 'Argumentative Essay Writing', link: '/essay-writing/argumentative' },
            { id: 'p1-c2', name: 'Persuasive Essay Writing', link: '/essay-writing/persuasive' },
            { id: 'p1-c3', name: 'Narrative Essay Writing', link: '/essay-writing/narrative' },
            { id: 'p1-c4', name: 'Descriptive Essay Writing', link: '/essay-writing/descriptive' },
            { id: 'p1-c5', name: 'Expository Essay Writing', link: '/essay-writing/expository' },
            { id: 'p1-c6', name: 'Analytical Essay Writing', link: '/essay-writing/analytical' },
            { id: 'p1-c7', name: 'Compare & Contrast Essay Writing', link: '/essay-writing/compare-contrast' },
            { id: 'p1-c8', name: 'Cause and Effect Essay Writing', link: '/essay-writing/cause-effect' },
            { id: 'p1-c9', name: 'Problem Solution Essay Writing', link: '/essay-writing/pro' },
            { id: 'p1-c10', name: 'Critical Analysis Essay Writing', link: '/essay-writing/critical-analysis' },
            { id: 'p1-c11', name: 'Admission Essay Writing', link: '/essay-writing/admission' },
            { id: 'p1-c12', name: 'Scholarship Essay Writing', link: '/essay-writing/scholarship' },
            { id: 'p1-c13', name: 'Personal Statement Writing', link: '/essay-writing/personal-statement' },
            { id: 'p1-c14', name: 'Essay Editing', link: '/essay-writing/editing' },
            { id: 'p1-c15', name: 'Essay Proofreading', link: '/essay-writing/proofreading' },
            { id: 'p1-c16', name: 'Essay Rewriting', link: '/essay-writing/rewriting' },
          ]
        },
        { id: 'p2', name: 'Assignment Help', link: '/assignment-help' },
        { id: 'p3', name: 'Homework Help', link: '/homework-help' },
        { id: 'p4', name: 'Paper Writing Services', link: '/paper-writing-services' },
        { id: 'p5', name: 'Thesis Writing Services', link: '/thesis-writing-services' },
        { id: 'p6', name: 'Dissertation Writing Services', link: '/dissertation-writing-services' },
      ] as PillarService[]
    };

    return [pillarServicesGroup, ...dbCategories];
  }, [categories, services, isLoadingData]);

  // Flatten all services for rendering
  const allServices = useMemo(() => {
    return structuredCategories.flatMap(cat => cat.services);
  }, [structuredCategories]);

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
        setHoveredService(null);
      }, 200);
    }
  };

  const handleServiceHover = (serviceId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredService(serviceId);
    }, 80);
  };

  const handleServiceLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Don't immediately clear - let the sub-panel hover take over
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHoveredService(null);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setHoveredService(null);
      }
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Find the currently hovered service's children
  const hoveredChildren = useMemo(() => {
    if (!hoveredService) return [];
    const found = allServices.find(s => s.id === hoveredService);
    return found?.children || [];
  }, [hoveredService, allServices]);

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

      {isOpen && (
        <>
          <div className="dropdown-bridge" />

          <div className="services-dropdown-panel">
            {isLoadingData ? (
              <div className="dropdown-loading">Loading services…</div>
            ) : allServices.length === 0 ? (
              <div className="dropdown-empty">No services available yet.</div>
            ) : (
              <div className="dropdown-flyout-container">
                {/* Left: Main services list */}
                <div className="dropdown-main-list">
                  <ul className="main-service-links">
                    {allServices.map((service) => {
                      const hasChildren = service.children && service.children.length > 0;
                      const isHovered = hoveredService === service.id;
                      return (
                        <li
                          key={service.id}
                          className={`main-service-item ${isHovered ? 'hovered' : ''}`}
                          onMouseEnter={() => handleServiceHover(service.id)}
                          onMouseLeave={handleServiceLeave}
                        >
                          <Link
                            to={service.link}
                            className={`main-service-link ${hasChildren ? 'has-children' : ''}`}
                            onClick={() => { setIsOpen(false); setHoveredService(null); }}
                          >
                            <span>{service.name}</span>
                            {hasChildren && <ChevronRight size={14} className="child-indicator" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Right: Sub-service flyout panel */}
                {hoveredChildren.length > 0 && (
                  <div
                    className="dropdown-sub-panel"
                    onMouseEnter={() => {
                      // Keep sub-panel visible
                      if (closeTimeoutRef.current) {
                        clearTimeout(closeTimeoutRef.current);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredService(null);
                    }}
                  >
                    <div className="sub-panel-header">Sub-services</div>
                    <ul className="sub-service-links">
                      {hoveredChildren.map((child) => (
                        <li key={child.id}>
                          <Link
                            to={child.link}
                            className="sub-service-link"
                            onClick={() => { setIsOpen(false); setHoveredService(null); }}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(11, 31, 66, 0.12);
          z-index: 100;
          overflow: visible;
        }

        .dropdown-loading,
        .dropdown-empty {
          padding: 24px;
          text-align: center;
          font-size: 14px;
          color: #64748B;
          min-width: 260px;
        }

        .dropdown-flyout-container {
          display: flex;
          position: relative;
        }

        .dropdown-main-list {
          padding: 8px;
          min-width: 260px;
        }

        .main-service-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .main-service-item {
          border-radius: 8px;
          transition: background 0.15s ease;
        }

        .main-service-item.hovered {
          background: rgba(22, 82, 160, 0.06);
        }

        .main-service-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: #334155;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.15s ease;
        }

        .main-service-link:hover {
          color: #1652A0;
        }

        .main-service-item.hovered .main-service-link {
          color: #1652A0;
        }

        .child-indicator {
          color: #94A3B8;
          flex-shrink: 0;
          transition: color 0.15s ease, transform 0.15s ease;
        }

        .main-service-item.hovered .child-indicator {
          color: #1652A0;
          transform: translateX(2px);
        }

        /* ── Sub-service flyout panel ── */
        .dropdown-sub-panel {
          position: absolute;
          top: 0;
          left: 100%;
          min-width: 240px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(11, 31, 66, 0.10);
          padding: 8px;
          margin-left: 4px;
          animation: fadeSlideIn 0.15s ease;
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .sub-panel-header {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94A3B8;
          padding: 4px 12px 8px;
        }

        .sub-service-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .sub-service-link {
          display: block;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .sub-service-link:hover {
          background: rgba(22, 82, 160, 0.06);
          color: #1652A0;
        }

        @media (max-width: 768px) {
          .services-dropdown-panel {
            left: -20px;
          }

          .dropdown-sub-panel {
            position: relative;
            left: 0;
            margin-left: 0;
            margin-top: 4px;
            border: none;
            box-shadow: none;
            background: rgba(22, 82, 160, 0.03);
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
}
