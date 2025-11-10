import { useState, useEffect } from 'react';
import HeroSectionDesktop from './HeroSectionDesktop';
import HeroSectionSimple from './HeroSectionSimple';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <HeroSectionSimple /> : <HeroSectionDesktop />;
}
