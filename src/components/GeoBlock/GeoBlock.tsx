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
    // Randomly show different error types to make it look more natural
    const errorType = Math.random();
    
    if (errorType < 0.5) {
      // Connection timeout error
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">This site can't be reached</h1>
              <p className="text-gray-600 mb-4">
                essayembassy.com took too long to respond.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Try:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Checking the connection</li>
                <li>• Checking the proxy and the firewall</li>
                <li>• Running Windows Network Diagnostics</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                ERR_CONNECTION_TIMED_OUT
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Reload
              </button>
              
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
    } else {
      // 404 Not Found error
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-gray-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">404 - Page Not Found</h1>
              <p className="text-gray-600 mb-4">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <strong>What you can do:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Go back to the previous page</li>
                <li>• Try searching for what you need</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.history.back()}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Go Back
              </button>
              
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
  }

  return <>{children}</>;
};

export default GeoBlock;
