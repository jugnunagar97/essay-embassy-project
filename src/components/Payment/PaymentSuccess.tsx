import React from 'react';
import { CheckCircle, Download, Mail } from 'lucide-react';

interface PaymentSuccessProps {
  paymentId: string;
  amount: number;
  orderId?: string;
  onDownload?: () => void;
  onEmailReceipt?: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  paymentId,
  amount,
  orderId,
  onDownload,
  onEmailReceipt
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600">Your payment has been processed successfully.</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Payment ID:</span>
            <p className="font-mono text-gray-900">{paymentId}</p>
          </div>
          <div>
            <span className="text-gray-500">Amount:</span>
            <p className="font-semibold text-gray-900">₹{amount}</p>
          </div>
          {orderId && (
            <div className="col-span-2">
              <span className="text-gray-500">Order ID:</span>
              <p className="font-mono text-gray-900">{orderId}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onDownload}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Download Receipt</span>
        </button>

        <button
          onClick={onEmailReceipt}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Mail className="w-5 h-5" />
          <span>Email Receipt</span>
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>A confirmation email has been sent to your registered email address.</p>
        <p className="mt-2">Our team will contact you within 24 hours to discuss your requirements.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
