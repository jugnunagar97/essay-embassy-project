import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface GeoBlockProps {
  children: React.ReactNode;
}

const GeoBlock: React.FC<GeoBlockProps> = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        // Method 1: Using ipapi.co (free, no API key required)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'IN') {
          setIsBlocked(true);
        }
      } catch (error) {
        console.log('Primary geo-check failed, trying backup method');
        
        try {
          // Method 2: Using ip-api.com (backup)
          const response = await fetch('http://ip-api.com/json/');
          const data = await response.json();
          
          if (data.countryCode === 'IN') {
            setIsBlocked(true);
          }
        } catch (backupError) {
          console.log('Backup geo-check failed, allowing access');
          // If both fail, allow access to prevent blocking legitimate users
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkLocation();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isBlocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
            <p className="text-gray-600">
              We're sorry, but our services are not available in your region at this time.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact our support team.
            </p>
          </div>
          
          <div className="space-y-3">
            <a
              href="mailto:support@essayembassy.com"
              className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Contact Support
            </a>
            
            <button
              onClick={() => window.location.href = 'https://www.google.com'}
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Go to Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GeoBlock;
