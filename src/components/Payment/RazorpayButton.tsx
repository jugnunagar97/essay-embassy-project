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

      // Create order on your server with timeout
      let response;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      try {
        response = await fetch('https://essay-embassy-project.onrender.com/api/create-order', {
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
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (networkError: any) {
        clearTimeout(timeoutId);
        // Network error (server unreachable, CORS, timeout, etc.)
        if (networkError.name === 'AbortError') {
          throw new Error('Payment request timed out. The server is taking too long to respond. Please try again.');
        }
        throw new Error('Unable to connect to payment server. Please check your internet connection and try again.');
      }

      // Parse response body first (whether success or error)
      // Clone the response so we can read it multiple times if needed
      let responseData: any = null;
      let responseText = '';
      
      try {
        // Always try to get text first, then parse as JSON
        responseText = await response.text();
        
        // Try to parse as JSON
        if (responseText) {
          try {
            responseData = JSON.parse(responseText);
          } catch (jsonError) {
            // Not JSON, that's okay - we'll use status-based messages
            console.warn('Response is not JSON:', responseText.substring(0, 100));
          }
        }
      } catch (readError) {
        console.error('Error reading response:', readError);
        // If we can't read the response, use status-based error
      }

      // Check if response indicates an error
      if (!response.ok) {
        // Priority: Use error message from JSON response, then status-based message
        let errorMessage = '';
        
        if (responseData?.error) {
          // Server provided an error message - use it directly
          errorMessage = responseData.error;
          // If it's a generic message, add more context for 503
          if (response.status === 503 && errorMessage.toLowerCase().includes('unavailable')) {
            errorMessage = 'Payment service is temporarily unavailable. The payment gateway may not be configured on the server. Please contact support for assistance.';
          }
        } else if (response.status === 503) {
          errorMessage = 'Payment service is temporarily unavailable. The server may be restarting or the payment gateway is not configured. Please wait a moment and try again, or contact support if the issue persists.';
        } else if (response.status === 500) {
          errorMessage = 'Payment server error. Please try again later or contact support.';
        } else if (response.status === 400) {
          errorMessage = 'Invalid payment request. Please check your order details.';
        } else if (response.status === 404) {
          errorMessage = 'Payment endpoint not found. Please contact support.';
        } else {
          errorMessage = `Payment service error (${response.status}). Please try again or contact support.`;
        }
        
        throw new Error(errorMessage);
      }

      // Check if response has the expected structure
      if (!responseData || !responseData.order) {
        throw new Error('Invalid response from payment server. Please try again.');
      }

      const { order } = responseData;

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
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      toast.error(errorMessage);
      if (onError) {
        onError(errorMessage);
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

