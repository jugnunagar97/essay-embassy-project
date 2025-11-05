import React from 'react';

const BlockedPage: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: '600px',
        width: '100%'
      }}>
        {/* Error Icon */}
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
          color: '#808080'
        }}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        
        {/* Main Heading */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#000000',
          margin: '0 0 16px 0',
          lineHeight: '1.2'
        }}>
          This site can't be reached
        </h1>
        
        {/* Error Message */}
        <p style={{
          fontSize: '14px',
          color: '#000000',
          margin: '0 0 8px 0',
          lineHeight: '1.5'
        }}>
          {window.location.hostname} is unreachable.
        </p>
        
        {/* Error Code */}
        <p style={{
          fontSize: '13px',
          color: '#808080',
          margin: '0 0 32px 0',
          lineHeight: '1.5'
        }}>
          ERR_ADDRESS_UNREACHABLE
        </p>
        
        {/* Reload Button */}
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#1a73e8',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1557b0';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#1a73e8';
          }}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default BlockedPage;

