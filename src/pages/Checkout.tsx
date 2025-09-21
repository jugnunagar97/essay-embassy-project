import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('session_id')) {
      toast.success('Payment successful! Redirecting...');
      // Redirect to the solution page (mock: go to library for now)
      setTimeout(() => {
        navigate('/qa?success=1', { replace: true });
      }, 2000);
    } else if (params.get('canceled')) {
      toast.error('Payment canceled.');
      setTimeout(() => {
        navigate('/qa', { replace: true });
      }, 2000);
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="text-xl font-bold mb-4">Processing payment...</div>
      <div className="text-gray-500">Please wait while we confirm your payment status.</div>
    </div>
  );
};

export default Checkout; 