import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Phone,
  Mail,
  MessageCircle,
  ShoppingCart // Added ShoppingCart icon for "Order Now"
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ServicesDropdown from './ServicesDropdown';
import MobileServicesMenu from './MobileServicesMenu';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Samples', href: '/samples' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-500 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>support@essayembassy.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>24/7 Customer Support Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              {user && (
                <button
                  onClick={onToggleSidebar}
                  className="mr-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden transition-colors"
                >
                  {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
              
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-primary-500 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">
                    Essay Embassy
                  </span>
                  <div className="text-xs text-gray-500 -mt-1">
                    Academic Excellence
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <ServicesDropdown />
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-2 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <MessageCircle size={20} />
                <span className="font-medium text-sm">WhatsApp</span>
              </a>

              {/* Restored Order Now button and adjusted login/signup */}
              {user ? (
                <>
                  <Link to="/order-now" className="btn-primary px-4 py-2 flex items-center">
                    <ShoppingCart size={16} className="mr-2" /> Order Now
                  </Link>
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-strong border border-gray-200 py-1 z-50">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User size={16} className="mr-2" />
                          Dashboard
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden lg:flex items-center space-x-2">
                  <Link to="/login" className="btn-ghost px-4 py-2">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary px-4 py-2">
                    Sign Up
                  </Link>
                  {/* Added Order Now button for unauthenticated users */}
                  <Link to="/order-now" className="btn-primary px-4 py-2 flex items-center">
                    <ShoppingCart size={16} className="mr-2" /> Order Now
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <MobileServicesMenu onLinkClick={() => setShowMobileMenu(false)} />
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary-500 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <>
                  <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                    <Link to="/login" className="block w-full text-center px-3 py-2 text-gray-700 hover:text-primary-500 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setShowMobileMenu(false)}>
                      Sign In
                    </Link>
                    <Link to="/register" className="block w-full text-center px-3 py-2 bg-primary-500 text-white rounded-lg font-medium" onClick={() => setShowMobileMenu(false)}>
                      Sign Up
                    </Link>
                    {/* Corrected: Removed 'block' as 'flex' is present */}
                    <Link to="/order-now" className="w-full text-center px-3 py-2 bg-primary-500 text-white rounded-lg font-medium flex items-center justify-center" onClick={() => setShowMobileMenu(false)}>
                      <ShoppingCart size={16} className="mr-2" /> Order Now
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
