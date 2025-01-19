// src/store/Provider.tsx
'use client';

import {PropsWithChildren} from 'react';
import {useCalculatorStore} from './calculatorStore';

export function Provider({children}: PropsWithChildren) {
  // Initialize the store if needed
  useCalculatorStore.getState();

  return <>{children}</>;
}
