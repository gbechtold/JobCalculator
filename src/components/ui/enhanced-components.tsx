import {Switch} from '@/components/ui/switch';
import {Slider} from '@/components/ui/slider';
import {Card} from '@/components/ui/card';

// Enhanced Switch Component
const EnhancedSwitch = React.forwardRef((props, ref) => (
  <Switch
    ref={ref}
    {...props}
    className={`
      relative inline-flex h-6 w-11 items-center rounded-full
      border-2 border-slate-400 dark:border-slate-600
      data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-200
      dark:data-[state=unchecked]:bg-slate-700
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      disabled:cursor-not-allowed disabled:opacity-50
    `}
  >
    <span
      className={`
        pointer-events-none block h-5 w-5 rounded-full
        bg-white shadow-lg ring-0 transition-transform
        data-[state=checked]:translate-x-5
        data-[state=unchecked]:translate-x-0
        dark:bg-slate-200
      `}
    />
  </Switch>
));
EnhancedSwitch.displayName = 'EnhancedSwitch';

// Enhanced Slider Component
const EnhancedSlider = React.forwardRef((props, ref) => (
  <Slider ref={ref} {...props} className="relative flex w-full touch-none select-none items-center">
    <span className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <span
        className="absolute h-full bg-blue-600 transition-all"
        style={{
          width: `${((props.value?.[0] || 0) / (props.max || 100)) * 100}%`,
        }}
      />
    </span>
    <span className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-200" />
  </Slider>
));
EnhancedSlider.displayName = 'EnhancedSlider';

// Enhanced Results Card Component
const EnhancedResultsCard = ({potentialCandidates, totalReach, region}) => (
  <Card className="bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
        Kampagnen-Ergebnis
      </h3>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Potenzielle Kandidaten</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{potentialCandidates}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Basis: {region} Region</div>
        </div>

        <div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Gesamtreichweite</div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{totalReach}%</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">inkl. aller Faktoren</div>
        </div>
      </div>
    </div>
  </Card>
);

export {EnhancedSwitch, EnhancedSlider, EnhancedResultsCard};
