'use client';

import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Slider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const JobCalculator = () => {
  // Use null as initial state to handle hydration
  const [mounted, setMounted] = useState < boolean > false;
  const [selectedRegion, setSelectedRegion] = useState < string > 'vorarlberg';
  const [totalReach, setTotalReach] = useState < number > 0;
  const [reachablePersons, setReachablePersons] = useState < number > 0;

  const [requirements, setRequirements] = useState({
    distance: 30,
    segment: 'all',
    ageGroup: 'all',
    demographic: 'all',
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

  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      calculateReach();
    }
  }, [mounted, requirements, marketing, powerUps, selectedRegion]);

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
    const segmentFactor = requirements.segment === 'all' ? 1.0 : 0.2;
    const ageFactor = requirements.ageGroup === 'all' ? 1.0 : 0.2;
    const demoFactor = requirements.demographic === 'all' ? 1.0 : 0.2;
    const powerUpsFactor = Object.values(powerUps).filter(Boolean).length * 0.2 + 1;
    const marketingFactor = marketing.reach / 100;
    const durationFactor = Math.min(marketing.duration / 30, 12) / 12;

    // Calculate total reach
    const reach =
      basePopulation *
      distanceFactor *
      segmentFactor *
      ageFactor *
      demoFactor *
      powerUpsFactor *
      marketingFactor *
      durationFactor;

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
          <CardTitle>Job-Rechner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Region Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vorarlberg">Vorarlberg</SelectItem>
                  <SelectItem value="tirol">Tirol</SelectItem>
                  <SelectItem value="salzburg">Salzburg</SelectItem>
                  {/* Add other regions as needed */}
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

            {/* Results */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Reichweite</div>
                  <div className="text-2xl font-bold text-blue-600">{totalReach}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Erreichbare Personen</div>
                  <div className="text-2xl font-bold text-blue-600">{reachablePersons}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCalculator;
