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

// Static fallback currency data (used if live API fails)
const FALLBACK_RATES: CurrencyRate[] = [
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
  const [rates, setRates] = useState<CurrencyRate[]>(FALLBACK_RATES);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);

  // Fetch live exchange rates from a free API with USD as base
  useEffect(() => {
    const SUPPORTED: Currency[] = ['USD', 'INR', 'EUR', 'GBP', 'CAD', 'AUD'];

    const mapToCurrencyRates = (apiRates: Record<string, number>): CurrencyRate[] => {
      const meta: Record<Currency, { symbol: string; flag: string; name: string }> = {
        USD: { symbol: '$', flag: '🇺🇸', name: 'US Dollar' },
        INR: { symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee' },
        EUR: { symbol: '€', flag: '🇪🇺', name: 'Euro' },
        GBP: { symbol: '£', flag: '🇬🇧', name: 'British Pound' },
        CAD: { symbol: 'C$', flag: '🇨🇦', name: 'Canadian Dollar' },
        AUD: { symbol: 'A$', flag: '🇦🇺', name: 'Australian Dollar' }
      };

      return SUPPORTED.map((c) => ({
        currency: c,
        rate: apiRates[c] ?? FALLBACK_RATES.find(r => r.currency === c)!.rate,
        symbol: meta[c].symbol,
        flag: meta[c].flag,
        name: meta[c].name
      }));
    };

    const CACHE_KEY = 'currencyRatesCache.v2';

    const loadFromCache = (): { rates: CurrencyRate[]; ts: number } | null => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch {
        return null;
      }
    };

    const saveToCache = (r: CurrencyRate[]) => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ rates: r, ts: Date.now() }));
      } catch {}
    };

    const fetchRates = async () => {
      setIsLoading(true);

      // Use cached rates immediately if fresh (< 30 min)
      const cached = loadFromCache();
      if (cached && Date.now() - cached.ts < 30 * 60 * 1000) {
        setRates(cached.rates);
        setLastUpdatedAt(cached.ts);
        setIsLoading(false);
        return;
      }

      try {
        // 1) Primary: Open ER API (hourly updates, no key)
        const res1 = await fetch('https://open.er-api.com/v6/latest/USD');
        const data1 = await res1.json();
        if (res1.ok && data1 && data1.result === 'success' && data1.rates) {
          const filteredRates: Record<string, number> = {};
          SUPPORTED.forEach((c) => { filteredRates[c] = data1.rates[c]; });
          const updated = mapToCurrencyRates(filteredRates);
          setRates(updated);
          const ts = Date.now();
          setLastUpdatedAt(ts);
          saveToCache(updated);
          return;
        }

        // 2) Fallback: exchangerate.host
        const symbols = SUPPORTED.join(',');
        const res2 = await fetch(`https://api.exchangerate.host/latest?base=USD&symbols=${symbols}`);
        const data2 = await res2.json();
        if (res2.ok && data2 && data2.rates) {
          const updated: CurrencyRate[] = mapToCurrencyRates(data2.rates);
          setRates(updated);
          const ts = Date.now();
          setLastUpdatedAt(ts);
          saveToCache(updated);
          return;
        }

        throw new Error('All providers failed');
      } catch (err) {
        // Fallback to last cached or static rates
        const cachedFallback = loadFromCache();
        if (cachedFallback) {
          setRates(cachedFallback.rates);
          setLastUpdatedAt(cachedFallback.ts);
        } else {
          setRates(FALLBACK_RATES);
          setLastUpdatedAt(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();

    // Refresh every 15 minutes
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
