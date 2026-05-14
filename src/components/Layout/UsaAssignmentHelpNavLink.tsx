import { Link, useLocation } from 'react-router-dom';

export const USA_ASSIGNMENT_HELP_PATH = '/usa/assignment-help';

/** Compact US flag (stylized) for nav — decorative only */
function UsFlagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 32" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="32" fill="#B22234" />
      <path
        fill="#fff"
        d="M0 4h60v4H0zm0 8h60v4H0zm0 8h60v4H0z"
      />
      <rect width="24" height="18" fill="#002868" />
      <path
        fill="#fff"
        d="M12 5.5l1.2 3.7h3.8l-3.1 2.3 1.2 3.7-3.1-2.3-3.1 2.3 1.2-3.7-3.1-2.3h3.8z"
      />
    </svg>
  );
}

interface UsaAssignmentHelpNavLinkProps {
  variant: 'desktop' | 'mobile';
  onClick?: () => void;
}

export default function UsaAssignmentHelpNavLink({ variant, onClick }: UsaAssignmentHelpNavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === USA_ASSIGNMENT_HELP_PATH;

  if (variant === 'desktop') {
    return (
      <Link
        to={USA_ASSIGNMENT_HELP_PATH}
        onClick={onClick}
        className={[
          'group inline-flex shrink-0 items-center gap-2 rounded-lg border-2 px-3 py-2 no-underline transition-all duration-200',
          'border-[#B22234] bg-gradient-to-b from-white to-slate-50 shadow-[0_2px_8px_rgba(178,34,52,0.15)]',
          'hover:-translate-y-0.5 hover:border-[#002868] hover:shadow-[0_4px_14px_rgba(0,40,104,0.2)]',
          isActive ? 'ring-2 ring-[#002868] ring-offset-2 ring-offset-white' : '',
        ].join(' ')}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className="flex h-3.5 w-6 shrink-0 overflow-hidden rounded-sm shadow-sm ring-1 ring-black/10">
          <UsFlagIcon className="h-full w-full" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B22234]">USA</span>
          <span className="text-[13px] font-bold text-[#0B1F42] group-hover:text-[#002868]">
            Assignment Help
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={USA_ASSIGNMENT_HELP_PATH}
      onClick={onClick}
      className={[
        'flex items-center gap-3 rounded-xl border-2 px-4 py-3 no-underline transition-all',
        'border-[#B22234] bg-gradient-to-r from-white via-slate-50 to-blue-50/80',
        'shadow-[0_2px_12px_rgba(178,34,52,0.12)] active:scale-[0.99]',
        'hover:border-[#002868] hover:shadow-[0_4px_16px_rgba(0,40,104,0.15)]',
        isActive ? 'ring-2 ring-[#002868] ring-offset-2 ring-offset-white' : '',
      ].join(' ')}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="flex h-[22px] w-10 shrink-0 overflow-hidden rounded-md shadow-md ring-2 ring-white">
        <UsFlagIcon className="h-full w-full" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-extrabold uppercase tracking-widest text-[#B22234]">For U.S. students</span>
        <span className="block text-lg font-bold leading-snug text-[#0B1F42]">USA Assignment Help</span>
      </span>
    </Link>
  );
}
