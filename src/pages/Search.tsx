import React from 'react';
import NoIndex from '../components/NoIndex';

export default function Search() {
  return (
    <>
      <NoIndex title="Search" />
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-xl font-bold mb-4">Search</div>
        <div className="text-gray-500">Search functionality.</div>
      </div>
    </>
  );
}

