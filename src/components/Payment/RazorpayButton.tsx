import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCurrency } from '../../context/CurrencyContext';

interface RazorpayButtonProps {
  amount: number;
  currency?: string;
  orderId?: string;
  userId?: string;
  serviceType?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  amount,
  currency,
  orderId,
  userId,
  serviceType = 'essay',
  onSuccess,
  onError,
  className = '',
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedCurrency, convertPrice, getCurrencySymbol } = useCurrency();
  
  // Use selected currency if not specified
  const paymentCurrency = currency || selectedCurrency;
  const convertedAmount = convertPrice(amount);
  const currencySymbol = getCurrencySymbol();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Create order on your server
      const response = await fetch('https://essay-embassy-project.onrender.com/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: convertedAmount,
          currency: paymentCurrency,
          receipt: orderId || `order_${Date.now()}`,
          notes: {
            userId: userId,
            orderId: orderId,
            serviceType: serviceType
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { order } = await response.json();

      // Configure Razorpay options
      const options = {
        key: 'rzp_live_RMzGdPNQcGOzuP', // Your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Essay Embassy',
        description: `${serviceType} writing service`,
        image: 'https://essay-embassy.web.app/images/logo.png',
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Payment successful
            console.log('Payment successful:', response);
            toast.success('Payment successful!');
            
            if (onSuccess) {
              onSuccess(response.razorpay_payment_id);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
            if (onError) {
              onError('Payment verification failed');
            }
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        notes: {
          orderId: orderId,
          userId: userId,
          serviceType: serviceType
        },
        theme: {
          color: '#3182ce'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      if (onError) {
        onError(error instanceof Error ? error.message : 'Payment failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={`bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Processing...</span>
        </div>
      ) : (
        children || `Pay ${currencySymbol}${convertedAmount.toFixed(2)}`
      )}
    </button>
  );
};

export default RazorpayButton;
