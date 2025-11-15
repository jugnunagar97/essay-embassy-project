import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  MessageCircle, 
  User,
  CreditCard,
  Clock,
  CheckCircle,
  PlusCircle,
  HelpCircle
} from "lucide-react";

const clientLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/my-orders", label: "My Orders", icon: FileText },
  { href: "/dashboard/pending-payments", label: "Pending Payments", icon: CreditCard },
  { href: "/dashboard/place-order", label: "Place New Order", icon: PlusCircle },
  { href: "/dashboard/client-chat", label: "Live Chat", icon: MessageCircle },
  { href: "/dashboard/my-settings", label: "My Settings", icon: User },
  { href: "/dashboard/help", label: "Help & Support", icon: HelpCircle },
];

interface ClientSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  
  return (
    <aside className={`w-72 bg-gradient-to-b from-primary-600 to-primary-700 min-h-screen shadow-2xl border-r border-primary-500 ${isOpen ? "block" : "hidden"} z-40`}>
      {/* Header */}
      <div className="p-6 border-b border-primary-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">Essay Embassy</h2>
            <p className="text-primary-100 text-xs">Client Portal</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-primary-200 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {clientLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.href;
          
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-white/20 text-white shadow-lg shadow-white/10" 
                  : "text-primary-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon 
                size={18} 
                className={`transition-colors ${
                  isActive ? "text-white" : "text-primary-200 group-hover:text-white"
                }`} 
              />
              <span className="flex-1">{link.label}</span>
              {isActive && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-primary-500/30 mt-auto">
        <div className="bg-white/10 rounded-lg p-3">
          <h4 className="text-primary-100 text-xs font-medium mb-2">Quick Stats</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-primary-200">
              <span className="flex items-center gap-1">
                <FileText size={12} />
                Total Orders
              </span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between text-primary-200">
              <span className="flex items-center gap-1">
                <CheckCircle size={12} />
                Completed
              </span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between text-primary-200">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                In Progress
              </span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ClientSidebar;
