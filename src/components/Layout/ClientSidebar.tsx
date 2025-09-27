import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  MessageCircle, 
  User,
  Settings,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  BarChart3,
  HelpCircle
} from "lucide-react";

const clientLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/my-orders", label: "My Orders", icon: FileText },
  { href: "/dashboard/pending-payments", label: "Pending Payments", icon: CreditCard },
  { href: "/order-now", label: "Place New Order", icon: PlusCircle },
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
    <aside className={`w-72 bg-gradient-to-b from-blue-600 to-blue-700 min-h-screen shadow-2xl border-r border-blue-500 ${isOpen ? "block" : "hidden"} z-40`}>
      {/* Header */}
      <div className="p-6 border-b border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">Essay Embassy</h2>
            <p className="text-blue-100 text-xs">Client Portal</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
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
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon 
                size={18} 
                className={`transition-colors ${
                  isActive ? "text-white" : "text-blue-200 group-hover:text-white"
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
      <div className="p-4 border-t border-blue-500/30 mt-auto">
        <div className="bg-white/10 rounded-lg p-3">
          <h4 className="text-blue-100 text-xs font-medium mb-2">Quick Stats</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-blue-200">
              <span className="flex items-center gap-1">
                <FileText size={12} />
                Total Orders
              </span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between text-blue-200">
              <span className="flex items-center gap-1">
                <CheckCircle size={12} />
                Completed
              </span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between text-blue-200">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                In Progress
              </span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/30">
        <div className="text-center">
          <p className="text-blue-100 text-xs">Client Portal v2.0</p>
          <p className="text-blue-200 text-xs mt-1">© 2024 Essay Embassy</p>
        </div>
      </div>
    </aside>
  );
};

export default ClientSidebar;
