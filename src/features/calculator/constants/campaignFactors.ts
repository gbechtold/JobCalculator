export const WECHSELGRUENDE = [
  { id: 'work_life', label: 'Work-Life-Balance', boost: 20 },
  { id: 'gehalt', label: 'Gehaltsniveau', boost: 25 },
  { id: 'belastung', label: 'Körperliche Belastung', boost: 15 },
  { id: 'aufstieg', label: 'Aufstiegsmöglichkeiten', boost: 20 },
  { id: 'klima', label: 'Betriebsklima', boost: 15 },
  { id: 'sicherheit', label: 'Arbeitsplatzsicherheit', boost: 20 }
] as const;

export const ANREIZE = [
  { id: 'flexibel', label: 'Flexible Arbeitszeiten', boost: 25 },
  { id: 'gehalt_plus', label: 'Überdurchschnittliches Gehalt', boost: 30 },
  { id: 'gesundheit', label: 'Gesundheitsförderung', boost: 15 },
  { id: 'karriere', label: 'Karriereprogramm', boost: 20 },
  { id: 'teamevents', label: 'Regelmäßige Teamevents', boost: 10 },
  { id: 'weiterbildung', label: 'Weiterbildungsbudget', boost: 20 }
] as const;

export const HINDERUNGSGRUENDE = [
  { id: 'standort', label: 'Standort/Erreichbarkeit', reduction: 20 },
  { id: 'arbeitszeiten', label: 'Ungünstige Arbeitszeiten', reduction: 25 },
  { id: 'familie', label: 'Familiäre Gründe', reduction: 30 },
  { id: 'physisch', label: 'Körperliche Anforderungen', reduction: 20 },
  { id: 'qualifikation', label: 'Fehlende Qualifikation', reduction: 25 },
  { id: 'saison', label: 'Saisonale Unsicherheit', reduction: 25 }
] as const;

export const LOESUNGSANSAETZE = [
  { id: 'einstieg', label: 'Flexible Einstiegsmodelle', boost: 25 },
  { id: 'mobilitaet', label: 'Mobilitätsunterstützung', boost: 20 },
  { id: 'familienfreundlich', label: 'Familienfreundliche Organisation', boost: 30 },
  { id: 'qualifizierung', label: 'Qualifizierungsprogramme', boost: 25 },
  { id: 'balance', label: 'Work-Life-Balance Maßnahmen', boost: 25 },
  { id: 'integration', label: 'Soziale Integration', boost: 15 }
] as const;

export type WechselgruendeId = typeof WECHSELGRUENDE[number]['id'];
export type AnreizeId = typeof ANREIZE[number]['id'];
export type HinderungsgruendeId = typeof HINDERUNGSGRUENDE[number]['id'];
export type LoesungsansaetzeId = typeof LOESUNGSANSAETZE[number]['id'];
