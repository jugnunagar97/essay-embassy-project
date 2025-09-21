import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "/admin/qa", label: "Q&A Manager" },
  { href: "/admin/qa/new", label: "Add New Question" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  
  return (
    <aside className={`w-64 border-r bg-card ${isOpen ? "block" : "hidden"}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <span className="font-semibold">Admin</span>
        {onClose ? (
          <button onClick={onClose} className="text-sm text-muted-foreground">Close</button>
        ) : null}
      </div>
      <nav className="p-2 space-y-1">
        {links.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className={`block rounded px-3 py-2 text-sm ${
              location.pathname === l.href 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-accent"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;