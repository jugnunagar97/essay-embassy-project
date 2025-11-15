import React, { useEffect, useState } from 'react';
import BlockedPage from '../pages/BlockedPage';

// Geo-blocking: ONLY block India (IN) and Pakistan (PK)
// ALL OTHER COUNTRIES (including France, US, UK, etc.) should be ALLOWED
const BLOCKED_COUNTRIES = ['IN', 'PK'];

interface GeoBlockProps {
  children: React.ReactNode;
}

const GeoBlock: React.FC<GeoBlockProps> = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Bypass geoblock for development/testing
  const isDevelopment = import.meta.env.MODE === 'development';
  const bypassGeoblock = import.meta.env.VITE_BYPASS_GEOBLOCK === 'true';

  // If bypass is enabled, skip all geoblock checks
  useEffect(() => {
    if (isDevelopment || bypassGeoblock) {
      console.log('[GeoBlock] Bypass enabled - allowing access', {
        isDevelopment,
        bypassGeoblock
      });
      setIsBlocked(false);
      setIsChecking(false);
      if (typeof window !== 'undefined') {
        (window as any).__IS_BLOCKED__ = false;
        (window as any).__DETECTED_COUNTRY__ = 'BYPASS';
        (window as any).__BLOCKED_CHECK_IN_PROGRESS__ = false;
      }
      return;
    }
  }, [isDevelopment, bypassGeoblock]);

  useEffect(() => {
    // Skip geoblock check if bypass is enabled
    if (isDevelopment || bypassGeoblock) {
      return;
    }
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
        // Skip geo-blocking in development (localhost)
        // When accessing via localhost, browser connects directly and bypasses VPN
        // So we always allow access in development to avoid false blocks
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname;
          if (hostname === 'localhost' || 
              hostname === '127.0.0.1' || 
              hostname.startsWith('192.168.') ||
              hostname.startsWith('10.') ||
              hostname.startsWith('172.')) {
            console.log(`[GeoBlock] Development mode detected (${hostname}), allowing access`);
            setIsBlocked(false);
            setIsChecking(false);
            if (typeof window !== 'undefined') {
              (window as any).__IS_BLOCKED__ = false;
              (window as any).__DETECTED_COUNTRY__ = 'DEV';
            }
            return;
          }
        }

        // Try multiple free IP geolocation services for reliability
        const services = [
          'https://ipapi.co/json/',
          'https://ip-api.com/json/?fields=countryCode',
          'https://api.country.is/'
        ];

        let countryCode: string | null = null;
        let serviceUsed = '';

        // Try first service
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          const response = await fetch(services[0], { 
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            const data = await response.json();
            countryCode = data.country_code || data.countryCode || data.country;
            if (countryCode) {
              serviceUsed = 'ipapi.co';
            }
          }
        } catch (e) {
          console.log('[GeoBlock] First geolocation service failed, trying next...');
        }

        // Try second service if first failed
        if (!countryCode) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(services[1], { 
              method: 'GET',
              headers: { 'Accept': 'application/json' },
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
              const data = await response.json();
              countryCode = data.countryCode || data.country_code || data.country;
              if (countryCode) {
                serviceUsed = 'ip-api.com';
              }
            }
          } catch (e) {
            console.log('[GeoBlock] Second geolocation service failed, trying next...');
          }
        }

        // Try third service if previous failed
        if (!countryCode) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(services[2], { 
              method: 'GET',
              headers: { 'Accept': 'application/json' },
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
              const data = await response.json();
              // api.country.is returns { country: "US", ip: "..." }
              countryCode = data.country || data.country_code || data.countryCode;
              if (countryCode) {
                serviceUsed = 'api.country.is';
              }
            }
          } catch (e) {
            console.log('[GeoBlock] All geolocation services failed');
          }
        }

        // Process the country code
        if (countryCode && typeof countryCode === 'string') {
          const upperCode = countryCode.toUpperCase().trim();
          console.log(`[GeoBlock] Detected country: ${upperCode} (via ${serviceUsed || 'unknown'})`);
          
          // ONLY block if country is explicitly IN or PK
          // ALL other countries (including France, US, UK, etc.) are ALLOWED
          const blocked = BLOCKED_COUNTRIES.includes(upperCode);
          
          if (blocked) {
            console.log(`[GeoBlock] BLOCKED: Country ${upperCode} is in blocked list`);
          } else {
            console.log(`[GeoBlock] ALLOWED: Country ${upperCode} is not blocked`);
          }
          
          setIsBlocked(blocked);
          
          // Set flag
          if (typeof window !== 'undefined') {
            (window as any).__IS_BLOCKED__ = blocked;
            (window as any).__DETECTED_COUNTRY__ = upperCode;
          }
        } else {
          // If we can't determine country, ALLOW access (fail open)
          // This ensures we don't accidentally block legitimate users
          console.log('[GeoBlock] Could not determine country, ALLOWING access (fail open)');
          setIsBlocked(false);
          
          if (typeof window !== 'undefined') {
            (window as any).__IS_BLOCKED__ = false;
            (window as any).__DETECTED_COUNTRY__ = 'UNKNOWN';
          }
        }
      } catch (error) {
        console.error('[GeoBlock] Error checking geolocation:', error);
        // Fail open - ALLOW access if check fails
        // This ensures we don't accidentally block legitimate users
        console.log('[GeoBlock] Geo-check failed, ALLOWING access (fail open)');
        setIsBlocked(false);
        
        if (typeof window !== 'undefined') {
          (window as any).__IS_BLOCKED__ = false;
          (window as any).__DETECTED_COUNTRY__ = 'ERROR';
        }
      } finally {
        setIsChecking(false);
        
        // Clear the check-in-progress flag
        if (typeof window !== 'undefined') {
          (window as any).__BLOCKED_CHECK_IN_PROGRESS__ = false;
          
          // Clear early favicon interval
          if ((window as any).__EARLY_FAVICON_INTERVAL__) {
            clearInterval((window as any).__EARLY_FAVICON_INTERVAL__);
          }
        }
      }
    };

    checkCountry();
  }, [isDevelopment, bypassGeoblock]);

  // If bypass is enabled, always allow access
  if (isDevelopment || bypassGeoblock) {
    return <>{children}</>;
  }

  // Show nothing while checking (or a loading state if preferred)
  if (isChecking) {
    return null; // Or return a minimal loading component
  }

  // Show blocked page ONLY if country is IN or PK
  if (isBlocked === true) {
    console.log('[GeoBlock] Rendering blocked page');
    return <BlockedPage />;
  }

  // Allow access for ALL other countries (including France, US, UK, etc.)
  console.log('[GeoBlock] Allowing access - country is not blocked');
  return <>{children}</>;
};

export default GeoBlock;


