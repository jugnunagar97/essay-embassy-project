import { useState, useEffect } from 'react';
import MobileEssayWriting from './MobileEssayWriting';
import EssayWritingDesktop from './EssayWritingDesktop';

export default function EssayWriting() {
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
    return <MobileEssayWriting />;
  }

  return <EssayWritingDesktop />;
}
