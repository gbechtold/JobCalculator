'use client';

import dynamic from 'next/dynamic';
import {Suspense} from 'react';

// Import JobCalculator.jsx with no SSR
const JobCalculator = dynamic(() => import('./JobCalculator.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  ),
});

export default function ClientWrapper() {
  return (
    <div className="w-full" suppressHydrationWarning>
      <Suspense fallback={<div>Loading...</div>}>
        <JobCalculator />
      </Suspense>
    </div>
  );
}
