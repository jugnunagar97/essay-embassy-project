import React from 'react';
import NoIndex from '../components/NoIndex';

export default function Cart() {
  return (
    <>
      <NoIndex title="Cart" />
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-xl font-bold mb-4">Cart</div>
        <div className="text-gray-500">Your cart is empty.</div>
      </div>
    </>
  );
}

