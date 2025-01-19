'use client';

import {Calculator} from '@/features/calculator/ui/Calculator';
import {Provider} from '@/store/Provider';

export default function Home() {
  return (
    <main className="container mx-auto">
      <Provider>
        <Calculator />
      </Provider>
    </main>
  );
}
