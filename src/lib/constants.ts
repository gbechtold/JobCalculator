export const REGIONS = {
  vorarlberg: { name: 'Vorarlberg', population: 2500 },
  tirol: { name: 'Tirol', population: 4500 },
  salzburg: { name: 'Salzburg', population: 3800 },
  kaernten: { name: 'Kärnten', population: 3200 },
  steiermark: { name: 'Steiermark', population: 4800 },
  oberoesterreich: { name: 'Oberösterreich', population: 5200 },
  niederoesterreich: { name: 'Niederösterreich', population: 5800 },
  wien: { name: 'Wien', population: 7500 },
  burgenland: { name: 'Burgenland', population: 2200 },
} as const;

export const SEGMENTS = {
  all: { label: 'Alle Segmente', factor: 1.0 },
  five_star: { label: '5-Sterne-Hotels', factor: 0.05 },
  four_star: { label: '4-Sterne-Hotels', factor: 0.35 },
  three_star: { label: '3-Sterne-Hotels', factor: 0.4 },
  two_star: { label: '2-Sterne und Pensionen', factor: 0.15 },
  apartments: { label: 'Ferienwohnungen', factor: 0.05 },
} as const;
