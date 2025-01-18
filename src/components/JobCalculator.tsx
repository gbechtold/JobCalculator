'use client';

import {useState} from 'react';

export default function JobCalculator() {
  const [reach, setReach] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Job-Rechner</h2>

      <div className="space-y-4">
        {/* Hier kommen später die Eingabefelder */}
        <p>Reichweite: {reach}</p>
        <p>Kosten: {cost}€</p>
      </div>
    </div>
  );
}
