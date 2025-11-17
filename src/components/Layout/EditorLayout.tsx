import { NavLink, Outlet } from 'react-router-dom';
import { PenSquare, MessageSquareText, FileText, LogOut } from 'lucide-react';
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="flex flex-1">
      <aside className="w-64 bg-editorSidebar text-white flex flex-col p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-10">
          <img src="/images/logo.png" alt="Essay Embassy" className="w-12 h-12 rounded-full bg-white p-2" />
          <div>
            <p className="text-sm uppercase tracking-wide opacity-70">Essay Embassy</p>
            <h2 className="text-xl font-bold">Editor Panel</h2>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200',
                  isActive ? 'bg-white text-editorSidebar font-semibold shadow-md' : 'text-white/80 hover:bg-white/10'
                ].join(' ')
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 border-t border-white/20 pt-4 text-sm">
          <p className="font-semibold">{user?.name || user?.email}</p>
          <p className="text-white/70 capitalize">{user?.role}</p>
          <button
            onClick={logout}
            className="mt-3 flex items-center gap-2 text-left text-white/80 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-white">
        <header className="border-b border-gray-100 bg-white px-8 py-5">
          <p className="text-sm uppercase tracking-wide text-gray-500">Editor workspace</p>
          <h1 className="text-2xl font-semibold text-gray-900">Content Tools</h1>
          <p className="text-gray-500 mt-1">Manage reviews, Q&A entries, and blog posts assigned to you.</p>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
      </div>
      <Footer />
    </div>
  );
}

