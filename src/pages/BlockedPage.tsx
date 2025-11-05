import React, { useEffect } from 'react';

const BlockedPage: React.FC = () => {
  useEffect(() => {
    // Remove favicon links
    const faviconLinks = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
    faviconLinks.forEach(link => link.remove());

    // Remove or blank out the title tag (shows in browser tab)
    document.title = '';
    
    // Remove the title element entirely if it exists
    const titleElement = document.querySelector('title');
    if (titleElement) {
      titleElement.textContent = '';
    }

    // Watch for title changes and keep it blank (prevents React Helmet from updating it)
    const titleObserver = new MutationObserver(() => {
      if (document.title !== '') {
        document.title = '';
      }
      const titleEl = document.querySelector('title');
      if (titleEl && titleEl.textContent !== '') {
        titleEl.textContent = '';
      }
    });

    // Observe title element changes
    const titleEl = document.querySelector('title');
    if (titleEl) {
      titleObserver.observe(titleEl, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }

    // Also watch document.title changes
    let lastTitle = document.title;
    const titleCheckInterval = setInterval(() => {
      if (document.title !== lastTitle && document.title !== '') {
        document.title = '';
        lastTitle = '';
      }
    }, 100);

    // Remove or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', '');
      document.head.appendChild(metaDescription);
    }

    // Remove meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.remove();
    }

    // Remove Open Graph meta tags (og:title, og:description, og:image, etc.)
    const ogTags = document.querySelectorAll('meta[property^="og:"]');
    ogTags.forEach(tag => tag.remove());

    // Remove Twitter Card meta tags
    const twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
    twitterTags.forEach(tag => tag.remove());

    // Remove any other branding-related meta tags
    const authorTag = document.querySelector('meta[name="author"]');
    if (authorTag) authorTag.remove();

    const generatorTag = document.querySelector('meta[name="generator"]');
    if (generatorTag) generatorTag.remove();

    // Remove any link tags with rel="canonical" or other branding links
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    canonicalLinks.forEach(link => link.remove());

    // Hide/Remove Tawk.to widget if it exists
    const hideTawkTo = () => {
      // Hide Tawk.to widget container
      const tawkIframe = document.querySelector('iframe[src*="tawk.to"]');
      if (tawkIframe) {
        (tawkIframe as HTMLElement).style.display = 'none';
        (tawkIframe as HTMLElement).remove();
      }

      // Hide Tawk.to widget container by ID
      const tawkContainer = document.getElementById('tawkchat-container');
      if (tawkContainer) {
        tawkContainer.style.display = 'none';
        tawkContainer.remove();
      }

      // Hide Tawk.to widget by class
      const tawkWidget = document.querySelector('.tawk-widget');
      if (tawkWidget) {
        (tawkWidget as HTMLElement).style.display = 'none';
        (tawkWidget as HTMLElement).remove();
      }

      // Hide any element with Tawk.to in ID or class
      const allTawkElements = document.querySelectorAll('[id*="tawk"], [class*="tawk"], [id*="Tawk"], [class*="Tawk"]');
      allTawkElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).remove();
      });

      // Prevent Tawk.to from initializing
      if (window.Tawk_API) {
        window.Tawk_API = {
          hideWidget: function() {},
          showWidget: function() {},
          maximize: function() {},
          minimize: function() {},
          toggle: function() {},
          onLoad: function() {},
          onChatStarted: function() {},
          onChatEnded: function() {},
          onOfflineSubmit: function() {}
        };
      }

      // Remove Tawk.to script if it hasn't loaded yet
      const tawkScripts = document.querySelectorAll('script[src*="tawk.to"], script[src*="embed.tawk.to"]');
      tawkScripts.forEach(script => script.remove());
    };

    // Hide Tawk.to immediately
    hideTawkTo();

    // Keep checking and hiding Tawk.to as it loads (it loads asynchronously)
    const intervalId = setInterval(hideTawkTo, 100);

    // Use MutationObserver to catch Tawk.to when it dynamically adds elements
    const observer = new MutationObserver(() => {
      hideTawkTo();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      clearInterval(titleCheckInterval);
      observer.disconnect();
      titleObserver.disconnect();
    };
  }, []);

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

