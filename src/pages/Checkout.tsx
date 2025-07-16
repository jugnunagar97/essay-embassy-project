import React from 'react';
// TODO: Import Firestore and payment logic

const Checkout: React.FC = () => {
  // TODO: Fetch Q&A entry by ID (from route param)
  // TODO: State for email, payment, loading, error

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow rounded p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        {/* Order Summary */}
        <div className="mb-6">
          <div className="font-semibold mb-1">Order Summary</div>
          <div className="mb-1">Question: Example Question Title</div>
          <div className="mb-1">Price: <span className="text-blue-600 font-bold">$12.99</span></div>
          <div className="mb-1 text-xs text-gray-500">Files included: solution-guide.pdf, diagram-1.png</div>
        </div>
        {/* Email Input */}
        <label className="block mb-2 font-semibold">Your Email (for delivery)</label>
        <input className="w-full border rounded px-3 py-2 mb-4" placeholder="Enter your email" type="email" required />
        {/* Payment Options */}
        <div className="mb-6">
          <div className="font-semibold mb-2">Payment Method</div>
          {/* TODO: Integrate Stripe and PayPal */}
          <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold mb-2">Pay with Card (Stripe)</button>
          <button className="w-full bg-gray-800 text-white py-2 rounded font-semibold">Pay with PayPal</button>
        </div>
        {/* Support Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Need help? <a href="mailto:support@example.com" className="text-blue-600 underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 