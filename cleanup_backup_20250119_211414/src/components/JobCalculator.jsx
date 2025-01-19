'use client';

import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Slider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const JobCalculator = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('vorarlberg');
  const [totalReach, setTotalReach] = useState(0);
  const [reachablePersons, setReachablePersons] = useState(0);

  const [requirements, setRequirements] = useState({
    distance: 30,
    segment: 'four_star',
    ageGroup: '25_35',
    demographic: 'gender_male',
  });

  const [marketing, setMarketing] = useState({
    reach: 50,
    duration: 30,
  });

  const [powerUps, setPowerUps] = useState({
    referral: false,
    signing: false,
    relocation: false,
    childcare: false,
    housing: false,
  });

  const [campaignFactors, setCampaignFactors] = useState({
    wechselgruende: [],
    anreize: [],
    hinderungsgruende: [],
    loesungsansaetze: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      calculateReach();
    }
  }, [mounted, requirements, marketing, powerUps, selectedRegion, campaignFactors]);

  const calculateReach = () => {
    if (!mounted) return;

    const basePopulation =
      {
        vorarlberg: 2500,
        tirol: 4500,
        salzburg: 3800,
        kaernten: 3200,
        steiermark: 4800,
        oberoesterreich: 5200,
        niederoesterreich: 5800,
        wien: 7500,
        burgenland: 2200,
      }[selectedRegion] || 0;

    const distanceFactor = 0.01 + 0.99 * (requirements.distance / 100);

    const segmentFactors = {
      all: 1.0,
      five_star: 0.05,
      four_star: 0.35,
      three_star: 0.4,
      two_star: 0.15,
      apartments: 0.05,
    };
    const segmentFactor = segmentFactors[requirements.segment];

    const ageFactors = {
      all: 1.0,
      under_25: 0.2,
      '25_35': 0.35,
      '36_45': 0.25,
      '46_55': 0.15,
      over_55: 0.05,
    };
    const ageFactor = ageFactors[requirements.ageGroup];

    const demoFactors = {
      all: 1.0,
      gender_male: 0.45,
      gender_female: 0.55,
      migration_yes: 0.4,
      migration_no: 0.6,
      education_professional: 0.6,
      education_trained: 0.3,
      education_higher: 0.1,
    };
    const demoFactor = demoFactors[requirements.demographic];

    const powerUpsFactor = Object.values(powerUps).filter(Boolean).length * 0.2 + 1;
    const marketingFactor = marketing.reach / 100;
    const durationFactor = Math.min(marketing.duration / 30, 12) / 12;

    const wechselgruendeBoost = campaignFactors.wechselgruende.length * 0.2;
    const anreizeBoost = campaignFactors.anreize.length * 0.25;
    const hinderungsReduction = campaignFactors.hinderungsgruende.length * -0.2;
    const loesungsBoost = campaignFactors.loesungsansaetze.length * 0.25;

    const campaignMultiplier = 1 + wechselgruendeBoost + anreizeBoost + Math.abs(hinderungsReduction) + loesungsBoost;

    const reach =
      basePopulation *
      distanceFactor *
      segmentFactor *
      ageFactor *
      demoFactor *
      powerUpsFactor *
      marketingFactor *
      durationFactor *
      campaignMultiplier;

    setTotalReach(Math.round(reach));
    setReachablePersons(Math.round(reach * 10));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>Stellenreichweiten-Kalkulator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* 1. Target Group Definition */}
            <section>
              <h2 className="text-xl font-bold mb-4">1. Zielgruppen-Definition</h2>

              {/* Region Selection */}
              <div className="space-y-4 mb-6">
                <label className="block text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full border-2 border-slate-200 dark:border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vorarlberg">Vorarlberg (2.500 Fachkräfte)</SelectItem>
                    <SelectItem value="tirol">Tirol (4.500 Fachkräfte)</SelectItem>
                    <SelectItem value="salzburg">Salzburg (3.800 Fachkräfte)</SelectItem>
                    <SelectItem value="kaernten">Kärnten (3.200 Fachkräfte)</SelectItem>
                    <SelectItem value="steiermark">Steiermark (4.800 Fachkräfte)</SelectItem>
                    <SelectItem value="oberoesterreich">Oberösterreich (5.200 Fachkräfte)</SelectItem>
                    <SelectItem value="niederoesterreich">Niederösterreich (5.800 Fachkräfte)</SelectItem>
                    <SelectItem value="wien">Wien (7.500 Fachkräfte)</SelectItem>
                    <SelectItem value="burgenland">Burgenland (2.200 Fachkräfte)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hotel Segment */}
              <div className="space-y-4 mb-6">
                <label className="block text-sm font-medium">Hotelsegment</label>
                <Select
                  value={requirements.segment}
                  onValueChange={(value) => setRequirements((prev) => ({...prev, segment: value}))}
                >
                  <SelectTrigger className="w-full border-2 border-slate-200 dark:border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Segmente (100%)</SelectItem>
                    <SelectItem value="five_star">5-Sterne-Hotels (5%)</SelectItem>
                    <SelectItem value="four_star">4-Sterne-Hotels (35%)</SelectItem>
                    <SelectItem value="three_star">3-Sterne-Hotels (40%)</SelectItem>
                    <SelectItem value="two_star">2-Sterne und Pensionen (15%)</SelectItem>
                    <SelectItem value="apartments">Ferienwohnungen (5%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age Group */}
              <div className="space-y-4 mb-6">
                <label className="block text-sm font-medium">Altersgruppe</label>
                <Select
                  value={requirements.ageGroup}
                  onValueChange={(value) => setRequirements((prev) => ({...prev, ageGroup: value}))}
                >
                  <SelectTrigger className="w-full border-2 border-slate-200 dark:border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Altersgruppen (100%)</SelectItem>
                    <SelectItem value="under_25">Unter 25 Jahre (20%)</SelectItem>
                    <SelectItem value="25_35">25-35 Jahre (35%)</SelectItem>
                    <SelectItem value="36_45">36-45 Jahre (25%)</SelectItem>
                    <SelectItem value="46_55">46-55 Jahre (15%)</SelectItem>
                    <SelectItem value="over_55">Über 55 Jahre (5%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Demographics */}
              <div className="space-y-4 mb-6">
                <label className="block text-sm font-medium">Demographische Merkmale</label>
                <Select
                  value={requirements.demographic}
                  onValueChange={(value) => setRequirements((prev) => ({...prev, demographic: value}))}
                >
                  <SelectTrigger className="w-full border-2 border-slate-200 dark:border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Demographien (100%)</SelectItem>
                    <SelectItem value="gender_male">Männlich (45%)</SelectItem>
                    <SelectItem value="gender_female">Weiblich (55%)</SelectItem>
                    <SelectItem value="migration_yes">Mit Migrationshintergrund (40%)</SelectItem>
                    <SelectItem value="migration_no">Ohne Migrationshintergrund (60%)</SelectItem>
                    <SelectItem value="education_professional">Mit Berufsausbildung (60%)</SelectItem>
                    <SelectItem value="education_trained">Angelernt (30%)</SelectItem>
                    <SelectItem value="education_higher">Höhere Ausbildung (10%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distance Slider */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">Maximale Distanz: {requirements.distance}km</label>
                <Slider
                  value={[requirements.distance]}
                  onValueChange={([value]) => setRequirements((prev) => ({...prev, distance: value}))}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </section>

            {/* 2. Additional Benefits */}
            <section>
              <h2 className="text-xl font-bold mb-4">2. Zusatzleistungen</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries({
                  referral: 'Mitarbeiterempfehlung 👥',
                  signing: 'Startbonus 💰',
                  relocation: 'Umzugshilfe 🏠',
                  childcare: 'Kinderbetreuung 👶',
                  housing: 'Personalwohnung 🏘️',
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Switch
                      checked={powerUps[key]}
                      onCheckedChange={(checked) => setPowerUps((prev) => ({...prev, [key]: checked}))}
                      className="border-2 border-slate-300 dark:border-slate-600"
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Marketing Campaign */}
            <section>
              <h2 className="text-xl font-bold mb-4">3. Recruiting Kampagne</h2>

              {/* Marketing Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <label className="block text-sm font-medium">Marketing-Reichweite: {marketing.reach}%</label>
                  <Slider
                    value={[marketing.reach]}
                    onValueChange={([value]) => setMarketing((prev) => ({...prev, reach: value}))}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium">Kampagnen-Dauer: {marketing.duration} Tage</label>
                  <Slider
                    value={[marketing.duration]}
                    onValueChange={([value]) => setMarketing((prev) => ({...prev, duration: value}))}
                    min={7}
                    max={365}
                    step={7}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Wechselgründe */}
              <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-medium">Möglich Wechselgründe zukünftiger Mitarbeiter (+)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {id: 'work_life', label: 'Work-Life-Balance', boost: 20},
                    {id: 'gehalt', label: 'Gehaltsniveau', boost: 25},
                    {id: 'belastung', label: 'Körperliche Belastung', boost: 15},
                    {id: 'aufstieg', label: 'Aufstiegsmöglichkeiten', boost: 20},
                    {id: 'klima', label: 'Betriebsklima', boost: 15},
                    {id: 'sicherheit', label: 'Arbeitsplatzsicherheit', boost: 20},
                  ].map((grund) => (
                    <div key={grund.id} className="flex items-center space-x-2">
                      <Switch
                        checked={campaignFactors.wechselgruende.includes(grund.id)}
                        onCheckedChange={(checked) => {
                          setCampaignFactors((prev) => ({
                            ...prev,
                            wechselgruende: checked
                              ? [...prev.wechselgruende, grund.id]
                              : prev.wechselgruende.filter((id) => id !== grund.id),
                          }));
                        }}
                        className="border-2 border-slate-300 dark:border-slate-600"
                      />
                      <span>
                        {grund.label} (+{grund.boost}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anreize */}
              <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-medium">Erforderliche Anreize (+)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {id: 'flexibel', label: 'Flexible Arbeitszeiten', boost: 25},
                    {id: 'gehalt_plus', label: 'Überdurchschnittliches Gehalt', boost: 30},
                    {id: 'gesundheit', label: 'Gesundheitsförderung', boost: 15},
                    {id: 'karriere', label: 'Karriereprogramm', boost: 20},
                    {id: 'teamevents', label: 'Regelmäßige Teamevents', boost: 10},
                    {id: 'weiterbildung', label: 'Weiterbildungsbudget', boost: 20},
                  ].map((anreiz) => (
                    <div key={anreiz.id} className="flex items-center space-x-2">
                      <Switch
                        checked={campaignFactors.anreize.includes(anreiz.id)}
                        onCheckedChange={(checked) => {
                          setCampaignFactors((prev) => ({
                            ...prev,
                            anreize: checked
                              ? [...prev.anreize, anreiz.id]
                              : prev.anreize.filter((id) => id !== anreiz.id),
                          }));
                        }}
                        className="border-2 border-slate-300 dark:border-slate-600"
                      />
                      <span>
                        {anreiz.label} (+{anreiz.boost}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hinderungsgründe */}
              <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-medium">Hinderungsgründe (-)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {id: 'standort', label: 'Standort/Erreichbarkeit', reduction: 20},
                    {id: 'arbeitszeiten', label: 'Ungünstige Arbeitszeiten', reduction: 25},
                    {id: 'familie', label: 'Familiäre Gründe', reduction: 30},
                    {id: 'physisch', label: 'Körperliche Anforderungen', reduction: 20},
                    {id: 'qualifikation', label: 'Fehlende Qualifikation', reduction: 25},
                    {id: 'saison', label: 'Saisonale Unsicherheit', reduction: 25},
                  ].map((grund) => (
                    <div key={grund.id} className="flex items-center space-x-2">
                      <Switch
                        checked={campaignFactors.hinderungsgruende.includes(grund.id)}
                        onCheckedChange={(checked) => {
                          setCampaignFactors((prev) => ({
                            ...prev,
                            hinderungsgruende: checked
                              ? [...prev.hinderungsgruende, grund.id]
                              : prev.hinderungsgruende.filter((id) => id !== grund.id),
                          }));
                        }}
                        className="border-2 border-slate-300 dark:border-slate-600"
                      />
                      <span>
                        {grund.label} (-{grund.reduction}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lösungsansätze */}
              <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-medium">Lösungsansätze (+)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {id: 'einstieg', label: 'Flexible Einstiegsmodelle', boost: 25},
                    {id: 'mobilitaet', label: 'Mobilitätsunterstützung', boost: 20},
                    {id: 'familienfreundlich', label: 'Familienfreundliche Organisation', boost: 30},
                    {id: 'qualifizierung', label: 'Qualifizierungsprogramme', boost: 25},
                    {id: 'balance', label: 'Work-Life-Balance Maßnahmen', boost: 25},
                    {id: 'integration', label: 'Soziale Integration', boost: 15},
                  ].map((loesung) => (
                    <div key={loesung.id} className="flex items-center space-x-2">
                      <Switch
                        checked={campaignFactors.loesungsansaetze.includes(loesung.id)}
                        onCheckedChange={(checked) => {
                          setCampaignFactors((prev) => ({
                            ...prev,
                            loesungsansaetze: checked
                              ? [...prev.loesungsansaetze, loesung.id]
                              : prev.loesungsansaetze.filter((id) => id !== loesung.id),
                          }));
                        }}
                        className="border-2 border-slate-300 dark:border-slate-600"
                      />
                      <span>
                        {loesung.label} (+{loesung.boost}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Results Dashboard */}
            <section className="border-t pt-8">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold mb-6">Kampagnen-Ergebnis</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Potenzielle Kandidaten</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{reachablePersons}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Basis: {selectedRegion} Region
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Gesamtreichweite</div>
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{totalReach}%</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">inkl. aller Faktoren</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCalculator;
