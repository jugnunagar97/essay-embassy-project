import { useState, useEffect } from 'react';
import HomeworkHelpDesktop from './HomeworkHelpDesktop';
import MobileHomeworkHelp from './MobileHomeworkHelp';

export default function HomeworkHelp() {
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
    return <MobileHomeworkHelp />;
  }

  return <HomeworkHelpDesktop />;
}
