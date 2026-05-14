// src/components/Layout/Header.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ServicesDropdown from './ServicesDropdown';
import MobileServicesMenu from './MobileServicesMenu';
import UsaAssignmentHelpNavLink from './UsaAssignmentHelpNavLink';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAdminPage = location.pathname.startsWith('/dashboard');
  const isMainDashboard = location.pathname === '/dashboard';
  const showProfileDropdown = user && !isMainDashboard;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setProfileDropdownOpen(false);
    if (isProfileDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isProfileDropdownOpen]);

  return (
    <>
      <header className={`header-main ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <a href="mailto:essayembassy@gmail.com" className="top-bar-item">
                <Mail size={12} />
                <span>essayembassy@gmail.com</span>
              </a>
              <span className="top-bar-divider"></span>
              <a href="tel:+1234567890" className="top-bar-item">
                <Phone size={12} />
                <span>24/7 Support</span>
              </a>
            </div>
            <div className="top-bar-right">
              <span className="top-bar-badge">🎓 Trusted by 50,000+ Students</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="header-content">
          <div className="header-inner">
            {/* Left: Logo */}
            <div className="header-left">
              {isAdminPage && (
                <button
                  onClick={onToggleSidebar}
                  className="sidebar-toggle"
                  aria-label="Open sidebar"
                >
                  <Menu size={20} />
                </button>
              )}
              <Link to="/" className="logo-link">
                <img
                  src="/images/logo.png"
                  alt="Essay Embassy"
                  className="logo-image"
                />
              </Link>
            </div>

            {/* Center: Navigation (Desktop) */}
            <nav className="main-nav">
              <ServicesDropdown />
              <UsaAssignmentHelpNavLink variant="desktop" />
              <Link to="/samples" className="nav-link">Samples</Link>
              <Link to="/reviews" className="nav-link">Reviews</Link>
              <Link to="/qa" className="nav-link">Q&A Library</Link>
              <Link to="/writers" className="nav-link">Our Writers</Link>
            </nav>

            {/* Right: Actions */}
            <div className="header-right">
              <Link to="/order-now" className="order-btn">
                <span>Order Now</span>
              </Link>

              {showProfileDropdown ? (
                <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="profile-btn"
                  >
                    <span className="profile-avatar">
                      {(user.displayName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
                    </span>
                    <ChevronDown size={14} className={`chevron ${isProfileDropdownOpen ? 'open' : ''}`} />
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="dropdown-menu">
                      <Link
                        to="/dashboard"
                        className="dropdown-item"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button onClick={logout} className="dropdown-item logout">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : user ? (
                !isMainDashboard && (
                  <button onClick={logout} className="signout-btn">
                    Sign Out
                  </button>
                )
              ) : (
                <Link to="/login" className="login-btn">
                  Login
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              {!isAdminPage && (
                <button
                  onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  className="mobile-toggle"
                  aria-label="Toggle menu"
                >
                  {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {!isAdminPage && isMobileNavOpen && (
          <MobileServicesMenu onClose={() => setIsMobileNavOpen(false)} />
        )}
      </header>

      <style>{`
        /* ========== CSS VARIABLES ========== */
        .header-main {
          --deep-navy: #0B1F42;
          --royal-blue: #1652A0;
          --light-blue: #2B6CB0;
          --gold: #D4A853;
          --success: #10B981;
          --white: #FFFFFF;
          --surface-light: #F8FAFC;
          --text-primary: #0B1F42;
          --text-secondary: #475569;
          --text-muted: #64748B;
          --border-light: #E2E8F0;

          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--white);
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          transition: box-shadow 0.3s ease;
        }

        .header-main.scrolled {
          box-shadow: 0 2px 20px rgba(11, 31, 66, 0.08);
        }

        /* ========== TOP BAR ========== */
        .top-bar {
          background: var(--deep-navy);
          color: var(--white);
          font-size: 12px;
        }

        .top-bar-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 8px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .top-bar-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .top-bar-item:hover {
          color: var(--gold);
        }

        .top-bar-divider {
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.25);
        }

        .top-bar-right {
          display: flex;
          align-items: center;
        }

        .top-bar-badge {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }

        /* ========== MAIN HEADER ========== */
        .header-content {
          border-bottom: 1px solid var(--border-light);
        }

        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ========== LEFT SECTION ========== */
        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sidebar-toggle {
          display: none;
          padding: 8px;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .sidebar-toggle:hover {
          background: var(--surface-light);
        }

        .logo-link {
          display: flex;
          align-items: center;
        }

        .logo-image {
          height: 48px;
          width: auto;
        }

        /* ========== CENTER NAV ========== */
        .main-nav {
          display: none;
          align-items: center;
          gap: 8px;
        }

        @media (min-width: 1024px) {
          .main-nav {
            display: flex;
          }
        }

        .nav-link {
          padding: 10px 16px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: var(--royal-blue);
          background: rgba(22, 82, 160, 0.06);
        }

        /* ========== RIGHT SECTION ========== */
        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .order-btn {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--light-blue) 100%);
          color: var(--white);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(22, 82, 160, 0.25);
        }

        .order-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 82, 160, 0.35);
        }

        .login-btn {
          padding: 10px 20px;
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .login-btn:hover {
          color: var(--royal-blue);
          background: rgba(22, 82, 160, 0.06);
        }

        .signout-btn {
          padding: 10px 16px;
          background: var(--surface-light);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .signout-btn:hover {
          background: var(--border-light);
        }

        /* ========== PROFILE DROPDOWN ========== */
        .profile-dropdown {
          position: relative;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px 6px 6px;
          background: var(--surface-light);
          border: 1px solid var(--border-light);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-btn:hover {
          border-color: var(--royal-blue);
        }

        .profile-avatar {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--light-blue) 100%);
          color: var(--white);
          font-size: 12px;
          font-weight: 700;
          border-radius: 50%;
        }

        .chevron {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 160px;
          background: var(--white);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(11, 31, 66, 0.12);
          overflow: hidden;
          z-index: 100;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 12px 16px;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .dropdown-item:hover {
          background: var(--surface-light);
        }

        .dropdown-item.logout {
          color: #EF4444;
          border-top: 1px solid var(--border-light);
        }

        /* ========== MOBILE TOGGLE ========== */
        .mobile-toggle {
          display: flex;
          padding: 8px;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .mobile-toggle:hover {
          background: var(--surface-light);
        }

        @media (min-width: 1024px) {
          .mobile-toggle {
            display: none;
          }
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .top-bar-content {
            padding: 6px 16px;
            flex-direction: column;
            gap: 4px;
          }

          .top-bar-right {
            display: none;
          }

          .header-inner {
            padding: 0 16px;
            height: 64px;
          }

          .logo-image {
            height: 40px;
          }

          .order-btn {
            padding: 8px 14px;
            font-size: 13px;
          }

          .order-btn span {
            display: none;
          }

          .order-btn::after {
            content: 'Order';
          }

          .login-btn {
            padding: 8px 12px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .top-bar-left {
            gap: 8px;
          }

          .top-bar-item span {
            display: none;
          }

          .top-bar-item::after {
            content: 'Email';
          }

          .top-bar-item:last-of-type::after {
            content: '24/7';
          }
        }
      `}</style>
    </>
  );
}
