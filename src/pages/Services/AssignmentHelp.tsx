import { useState, useEffect } from 'react';
import MobileAssignmentHelp from './MobileAssignmentHelp';
import AssignmentHelpDesktop from './AssignmentHelpDesktop';

export default function ResearchPaperWriting() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileAssignmentHelp />;
  }

  return <AssignmentHelpDesktop />;
}
