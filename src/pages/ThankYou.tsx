import React from 'react';
// TODO: Import Firestore and download/email logic

const ThankYou: React.FC = () => {
  // TODO: Fetch order info by ID (from route param)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow rounded p-8 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>
        <p className="mb-4">Your solution is ready for download below. A copy has also been sent to your email.</p>
        {/* Download Links */}
        <div className="mb-6">
          <a href="#" className="block bg-blue-600 text-white px-6 py-2 rounded font-semibold mb-2">Download solution-guide.pdf</a>
          <a href="#" className="block bg-blue-600 text-white px-6 py-2 rounded font-semibold">Download diagram-1.png</a>
        </div>
        {/* Support Info */}
        <div className="mt-6 text-sm text-gray-500">
          Need help? <a href="mailto:support@example.com" className="text-blue-600 underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 