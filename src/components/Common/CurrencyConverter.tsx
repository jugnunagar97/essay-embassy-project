import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, RefreshCw } from 'lucide-react';
import { useCurrency, Currency } from '../../context/CurrencyContext';

interface CurrencyConverterProps {
  variant?: 'header' | 'card' | 'widget' | 'footer';
  showLabel?: boolean;
  className?: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ 
  variant = 'header', 
  showLabel = false,
  className = '' 
}) => {
  const { selectedCurrency, setSelectedCurrency, rates, isLoading } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedRate = rates.find(rate => rate.currency === selectedCurrency);

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  // Different styles for different variants
  const getVariantStyles = () => {
    switch (variant) {
      case 'header':
        return {
          container: 'relative',
          button: 'flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white hover:text-white border border-white/20',
          dropdown: 'absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50',
          item: 'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer',
          flag: 'text-lg',
          text: 'text-gray-900',
          subtext: 'text-sm text-gray-500'
        };
      
      case 'card':
        return {
          container: 'relative',
          button: 'flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-700 border border-gray-200',
          dropdown: 'absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50',
          item: 'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer',
          flag: 'text-lg',
          text: 'text-gray-900',
          subtext: 'text-sm text-gray-500'
        };
      
      case 'widget':
        return {
          container: 'relative',
          button: 'flex items-center gap-2 px-4 py-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors text-primary-700 hover:text-primary-700 border border-primary-200',
          dropdown: 'absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50',
          item: 'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer',
          flag: 'text-lg',
          text: 'text-gray-900',
          subtext: 'text-sm text-gray-500'
        };
      
      case 'footer':
        return {
          container: 'relative',
          button: 'flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white hover:text-white border border-gray-600 min-w-[120px]',
          dropdown: 'absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50',
          item: 'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer',
          flag: 'text-lg',
          text: 'text-gray-900',
          subtext: 'text-sm text-gray-500'
        };
      
      default:
        return {
          container: 'relative',
          button: 'flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-700 border border-gray-200',
          dropdown: 'absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50',
          item: 'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer',
          flag: 'text-lg',
          text: 'text-gray-900',
          subtext: 'text-sm text-gray-500'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`} ref={dropdownRef}>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Currency
        </label>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
        disabled={isLoading}
      >
        {variant === 'header' ? (
          <Globe size={16} />
        ) : (
          <span className={styles.flag}>{selectedRate?.flag}</span>
        )}
        
        <span className="font-medium">
          {variant === 'footer' ? `${selectedRate?.flag} ${selectedCurrency}` : selectedCurrency}
        </span>
        
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
        
        {isLoading && (
          <RefreshCw size={14} className="animate-spin" />
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Select Currency</h3>
            <p className="text-sm text-gray-500">Choose your preferred currency</p>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {rates.map((rate) => (
              <div
                key={rate.currency}
                onClick={() => handleCurrencyChange(rate.currency)}
                className={`${styles.item} ${
                  selectedCurrency === rate.currency ? 'bg-primary-50 text-primary-700' : ''
                }`}
              >
                <span className={styles.flag}>{rate.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${styles.text}`}>
                      {rate.currency}
                    </span>
                    {selectedCurrency === rate.currency && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className={styles.subtext}>{rate.name}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${styles.text}`}>
                    {rate.symbol}1 = ${(1 / rate.rate).toFixed(4)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Rates updated every 15 minutes
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
