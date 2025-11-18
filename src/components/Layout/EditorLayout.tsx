import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { PenSquare, MessageSquareText, FileText, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

const navItems = [
  { to: '/editor/reviews', label: 'Reviews', icon: PenSquare },
  { to: '/editor/qna', label: 'Q&A', icon: MessageSquareText },
  { to: '/editor/blog', label: 'Blog', icon: FileText }
];

export default function EditorLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when sidebar is open on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Close sidebar when navigating on mobile
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="flex flex-1 relative">
        {/* Backdrop Overlay - Mobile Only */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`
            fixed md:sticky top-0 left-0 h-full z-50
            w-64 md:w-64 bg-editorSidebar text-white flex flex-col p-4 md:p-6 shadow-2xl
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
          aria-label="Editor navigation"
        >
          {/* Close Button - Mobile Only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-6 md:mb-10">
            <img
              src="/images/logo.png"
              alt="Essay Embassy"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white p-2"
            />
            <div>
              <p className="text-xs md:text-sm uppercase tracking-wide opacity-70">Essay Embassy</p>
              <h2 className="text-lg md:text-xl font-bold">Editor Panel</h2>
            </div>
          </div>

          <nav className="flex-1 space-y-2" onClick={handleNavClick}>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-4 py-3 md:py-2 rounded-lg transition-all duration-200 min-h-[44px]',
                    'focus:outline-none focus:ring-2 focus:ring-white/50',
                    isActive
                      ? 'bg-white text-editorSidebar font-semibold shadow-md'
                      : 'text-white/80 hover:bg-white/10 active:bg-white/20'
                  ].join(' ')
                }
              >
                <Icon size={18} className="flex-shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 border-t border-white/20 pt-4 text-sm">
            <p className="font-semibold truncate">{user?.name || user?.email}</p>
            <p className="text-white/70 capitalize">{user?.role}</p>
            <button
              onClick={logout}
              className="mt-3 flex items-center gap-2 text-left text-white/80 hover:text-white transition-colors min-h-[44px] w-full px-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Sign out"
            >
              <LogOut size={16} className="flex-shrink-0" />
              <span>Sign out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white w-full md:w-auto min-w-0 relative">
          <header className="border-b border-gray-100 bg-white px-4 md:px-8 py-4 md:py-5 relative">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              ref={hamburgerRef}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden absolute top-4 left-4 z-50 w-11 h-11 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 border border-gray-200"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? (
                <X size={20} className="text-gray-700" />
              ) : (
                <Menu size={20} className="text-gray-700" />
              )}
            </button>
            <div className="pl-14 md:pl-0">
              <p className="text-xs md:text-sm uppercase tracking-wide text-gray-500">Editor workspace</p>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mt-1">Content Tools</h1>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                Manage reviews, Q&A entries, and blog posts assigned to you.
              </p>
            </div>
          </header>
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

