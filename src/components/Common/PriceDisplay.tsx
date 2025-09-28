import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

interface PriceDisplayProps {
  usdPrice: number;
  variant?: 'large' | 'medium' | 'small' | 'card' | 'inline';
  showOriginal?: boolean;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  usdPrice, 
  variant = 'medium',
  showOriginal = false,
  className = '' 
}) => {
  const { formatPrice, selectedCurrency, convertPrice } = useCurrency();

  const getVariantStyles = () => {
    switch (variant) {
      case 'large':
        return {
          container: 'text-4xl font-bold text-gray-900',
          original: 'text-lg text-gray-500 line-through'
        };
      
      case 'medium':
        return {
          container: 'text-2xl font-semibold text-gray-900',
          original: 'text-sm text-gray-500 line-through'
        };
      
      case 'small':
        return {
          container: 'text-lg font-medium text-gray-900',
          original: 'text-xs text-gray-500 line-through'
        };
      
      case 'card':
        return {
          container: 'text-xl font-bold text-primary-600',
          original: 'text-sm text-gray-400 line-through'
        };
      
      case 'inline':
        return {
          container: 'text-base font-medium text-gray-700',
          original: 'text-xs text-gray-400 line-through'
        };
      
      default:
        return {
          container: 'text-2xl font-semibold text-gray-900',
          original: 'text-sm text-gray-500 line-through'
        };
    }
  };

  const styles = getVariantStyles();
  const convertedPrice = convertPrice(usdPrice);
  const formattedPrice = formatPrice(usdPrice);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className="flex items-center gap-2">
        <span>{formattedPrice}</span>
        {showOriginal && selectedCurrency !== 'USD' && (
          <span className={styles.original}>
            ${usdPrice.toFixed(2)}
          </span>
        )}
      </div>
      
      {selectedCurrency !== 'USD' && (
        <div className="text-xs text-gray-500 mt-1">
          ≈ ${usdPrice.toFixed(2)} USD
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
