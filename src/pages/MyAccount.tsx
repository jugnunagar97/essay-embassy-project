import React from 'react';
import NoIndex from '../components/NoIndex';

export default function MyAccount() {
  return (
    <>
      <NoIndex title="My Account" />
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-xl font-bold mb-4">My Account</div>
        <div className="text-gray-500">Account management page.</div>
      </div>
    </>
  );
}

