import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Currency types and interfaces
export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export interface CurrencyRate {
  currency: Currency;
  rate: number;
  symbol: string;
  flag: string;
  name: string;
}

export interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
  getCurrencySymbol: () => string;
  rates: CurrencyRate[];
  isLoading: boolean;
}

// Currency data with realistic exchange rates
const CURRENCY_RATES: CurrencyRate[] = [
  {
    currency: 'USD',
    rate: 1,
    symbol: '$',
    flag: '🇺🇸',
    name: 'US Dollar'
  },
  {
    currency: 'INR',
    rate: 83.50,
    symbol: '₹',
    flag: '🇮🇳',
    name: 'Indian Rupee'
  },
  {
    currency: 'EUR',
    rate: 0.92,
    symbol: '€',
    flag: '🇪🇺',
    name: 'Euro'
  },
  {
    currency: 'GBP',
    rate: 0.79,
    symbol: '£',
    flag: '🇬🇧',
    name: 'British Pound'
  },
  {
    currency: 'CAD',
    rate: 1.36,
    symbol: 'C$',
    flag: '🇨🇦',
    name: 'Canadian Dollar'
  },
  {
    currency: 'AUD',
    rate: 1.52,
    symbol: 'A$',
    flag: '🇦🇺',
    name: 'Australian Dollar'
  }
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [rates, setRates] = useState<CurrencyRate[]>(CURRENCY_RATES);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching live rates (in real app, you'd call an API)
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, you'd fetch from an API like:
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      // const data = await response.json();
      
      // For now, we'll use static rates with slight variations
      const updatedRates = CURRENCY_RATES.map(rate => ({
        ...rate,
        rate: rate.rate * (0.98 + Math.random() * 0.04) // ±2% variation
      }));
      
      setRates(updatedRates);
      setIsLoading(false);
    };

    fetchRates();
    
    // Update rates every 15 minutes
    const interval = setInterval(fetchRates, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert USD price to selected currency
  const convertPrice = (usdPrice: number): number => {
    const selectedRate = rates.find(rate => rate.currency === selectedCurrency);
    if (!selectedRate) return usdPrice;
    
    return Math.round(usdPrice * selectedRate.rate * 100) / 100;
  };

  // Format price with currency symbol
  const formatPrice = (usdPrice: number): string => {
    const convertedPrice = convertPrice(usdPrice);
    const symbol = getCurrencySymbol();
    
    if (selectedCurrency === 'INR') {
      return `${symbol}${convertedPrice.toLocaleString('en-IN')}`;
    }
    
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const selectedRate = rates.find(rate => rate.currency === selectedCurrency);
    return selectedRate?.symbol || '$';
  };

  const value: CurrencyContextType = {
    selectedCurrency,
    setSelectedCurrency,
    convertPrice,
    formatPrice,
    getCurrencySymbol,
    rates,
    isLoading
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
