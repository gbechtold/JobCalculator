import { RegionSelect } from '../components/RegionSelect';
import { Card, CardContent } from '@/components/ui/card';

export const TargetGroupSection = () => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">1. Zielgruppen-Definition</h2>
      <Card>
        <CardContent className="space-y-6">
          <RegionSelect />
          {/* Other target group components */}
        </CardContent>
      </Card>
    </section>
  );
};
