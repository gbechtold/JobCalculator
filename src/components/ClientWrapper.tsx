'use client';

import dynamic from 'next/dynamic';

const JobCalculator = dynamic(() => import('./JobCalculator'), {
  ssr: false,
});

export default function ClientWrapper() {
  return <JobCalculator />;
}
