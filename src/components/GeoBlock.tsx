import React, { useEffect, useState } from 'react';
import BlockedPage from '../pages/BlockedPage';

const BLOCKED_COUNTRIES = ['IN', 'PK']; // India and Pakistan

interface GeoBlockProps {
  children: React.ReactNode;
}

const GeoBlock: React.FC<GeoBlockProps> = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Prevent Tawk.to from loading while checking
    if (typeof window !== 'undefined') {
      // Set a flag to prevent Tawk.to from initializing
      (window as any).__BLOCKED_CHECK_IN_PROGRESS__ = true;
      
      // Immediately remove favicons while checking (early prevention)
      const removeFaviconsEarly = () => {
        const faviconSelectors = [
          'link[rel="icon"]',
          'link[rel="shortcut icon"]',
          'link[rel="apple-touch-icon"]',
          'link[rel="apple-touch-icon-precomposed"]',
          'link[rel*="icon"]'
        ];
        
        faviconSelectors.forEach(selector => {
          const links = document.querySelectorAll(selector);
          links.forEach(link => {
            link.remove();
            if (link instanceof HTMLLinkElement) {
              link.href = '';
            }
          });
        });
      };

      // Remove favicons immediately
      removeFaviconsEarly();
      
      // Keep removing while checking
      const earlyFaviconInterval = setInterval(removeFaviconsEarly, 50);
      
      // Store interval to clear later
      (window as any).__EARLY_FAVICON_INTERVAL__ = earlyFaviconInterval;
      
      // Override Tawk.to initialization if it tries to load
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget = () => {};
        window.Tawk_API.showWidget = () => {};
      }
    }

    const checkCountry = async () => {
      try {
        // Try multiple free IP geolocation services for reliability
        const services = [
          'https://ipapi.co/json/',
          'https://ip-api.com/json/?fields=countryCode',
          'https://api.country.is/'
        ];

        let countryCode: string | null = null;

        // Try first service
        try {
          const response = await fetch(services[0], { 
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          if (response.ok) {
            const data = await response.json();
            countryCode = data.country_code || data.countryCode;
          }
        } catch (e) {
          console.log('First geolocation service failed, trying next...');
        }

        // Try second service if first failed
        if (!countryCode) {
          try {
            const response = await fetch(services[1], { 
              method: 'GET',
              headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
              const data = await response.json();
              countryCode = data.countryCode;
            }
          } catch (e) {
            console.log('Second geolocation service failed, trying next...');
          }
        }

        // Try third service if previous failed
        if (!countryCode) {
          try {
            const response = await fetch(services[2], { 
              method: 'GET',
              headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
              const data = await response.json();
              // api.country.is returns { country: "US", ip: "..." }
              countryCode = data.country || data.country_code || data.countryCode;
            }
          } catch (e) {
            console.log('All geolocation services failed');
          }
        }

        // If we got a country code, check if it's blocked
        if (countryCode) {
          const blocked = BLOCKED_COUNTRIES.includes(countryCode.toUpperCase());
          setIsBlocked(blocked);
          
          // Set flag if blocked
          if (typeof window !== 'undefined') {
            (window as any).__IS_BLOCKED__ = blocked;
          }
        } else {
          // If we can't determine country, allow access (fail open)
          // Change to setIsBlocked(true) if you want to block on error
          setIsBlocked(false);
          
          if (typeof window !== 'undefined') {
            (window as any).__IS_BLOCKED__ = false;
          }
        }
      } catch (error) {
        console.error('Error checking geolocation:', error);
        // Fail open - allow access if check fails
        // Change to setIsBlocked(true) if you want to block on error
        setIsBlocked(false);
        
        if (typeof window !== 'undefined') {
          (window as any).__IS_BLOCKED__ = false;
        }
      } finally {
        setIsChecking(false);
        
        // Clear the check-in-progress flag
        if (typeof window !== 'undefined') {
          (window as any).__BLOCKED_CHECK_IN_PROGRESS__ = false;
          
          // Clear early favicon interval if blocked
          if ((window as any).__EARLY_FAVICON_INTERVAL__) {
            clearInterval((window as any).__EARLY_FAVICON_INTERVAL__);
          }
        }
      }
    };

    checkCountry();
  }, []);

  // Show nothing while checking (or a loading state if preferred)
  if (isChecking) {
    return null; // Or return a minimal loading component
  }

  // Show blocked page if country is blocked
  if (isBlocked) {
    return <BlockedPage />;
  }

  // Allow access if not blocked
  return <>{children}</>;
};

export default GeoBlock;

