'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Provider } from '@/store/Provider';

const Calculator = dynamic(
  () => import('@/features/calculator/ui/Calculator').then(mod => mod.Calculator),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function ClientWrapper() {
  return (
    <Provider>
      <div className="w-full" suppressHydrationWarning>
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="text-slate-600 dark:text-slate-400">Loading...</div>
          </div>
        }>
          <Calculator />
        </Suspense>
      </div>
    </Provider>
  );
}
