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
        } else {
          // If we can't determine country, allow access (fail open)
          // Change to setIsBlocked(true) if you want to block on error
          setIsBlocked(false);
        }
      } catch (error) {
        console.error('Error checking geolocation:', error);
        // Fail open - allow access if check fails
        // Change to setIsBlocked(true) if you want to block on error
        setIsBlocked(false);
      } finally {
        setIsChecking(false);
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

