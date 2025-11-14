import { useState, useEffect } from 'react';
import MobileContact from './MobileContact';
import DesktopContact from './DesktopContact';

export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  console.log('Contact - isMobile:', isMobile, 'width:', window.innerWidth); // Debug log

  return isMobile ? <MobileContact /> : <DesktopContact />;
}
