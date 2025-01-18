'use client';

'use client';

import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '../../components/ui/card';
import {Slider} from '../../components/ui/slider';
import {Switch} from '../../components/ui/switch';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../../components/ui/select';
import {Badge} from '../../components/ui/badge';

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

  const [powerUps, setPowerUps] = useState({
    referral: false,
    signing: false,
    relocation: false,
    childcare: false,
    housing: false,
  });

  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      calculateReach();
    }
  }, [mounted, requirements, powerUps, selectedRegion]);

  const calculateReach = () => {
    if (!mounted) return;

    // Base population data
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

    // Calculate factors
    const distanceFactor = 0.01 + 0.99 * (requirements.distance / 100);

    // Segment factors
    const segmentFactors = {
      all: 1.0,
      five_star: 0.05,
      four_star: 0.35,
      three_star: 0.4,
      two_star: 0.15,
      apartments: 0.05,
    };
    const segmentFactor = segmentFactors[requirements.segment];

    // Age factors
    const ageFactors = {
      all: 1.0,
      under_25: 0.2,
      '25_35': 0.35,
      '36_45': 0.25,
      '46_55': 0.15,
      over_55: 0.05,
    };
    const ageFactor = ageFactors[requirements.ageGroup];

    // Demographic factors
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

    // Power-ups factor
    const powerUpsFactor = Object.values(powerUps).filter(Boolean).length * 0.2 + 1;

    // Calculate total reach
    const reach = basePopulation * distanceFactor * segmentFactor * ageFactor * demoFactor * powerUpsFactor;

    setTotalReach(Math.round(reach));
    setReachablePersons(Math.round(reach * 10));
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Results Dashboard */}
            <section className="border-t pt-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-6">Kampagnen-Ergebnis</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm font-medium text-gray-600">Potenzielle Kandidaten</div>
                    <div className="text-3xl font-bold text-blue-600">{reachablePersons}</div>
                    <div className="text-sm text-gray-500 mt-1">Basis: {selectedRegion} Region</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Gesamtreichweite</div>
                    <div className="text-3xl font-bold text-indigo-600">{totalReach}%</div>
                    <div className="text-sm text-gray-500 mt-1">inkl. aller Faktoren</div>
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
