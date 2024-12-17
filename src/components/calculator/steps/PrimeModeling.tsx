import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useSimulation } from '@/contexts/SimulationContext';

export function PrimeModeling({ onNext }: { onNext: () => void }) {
  const { data, updateData } = useSimulation();

  // Calcul des montants maximums
  const maxExemptAmount = data.hasIncentive
    ? 6000 * (data.employees || 1)
    : 3000 * (data.employees || 1);
  const maxAmount = Math.max(maxExemptAmount, 6000 * (data.employees || 1));
  const [totalAmount, setTotalAmount] = useState<number>(
    data.totalAmount || 3000 * (data.employees || 1)
  );

  const handleNext = () => {
    updateData({
      totalAmount,
      distributionCriteria: 'equal',
    });
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment souhaitez-vous répartir votre prime ?</CardTitle>
        <CardDescription>
          Définissez le montant total à distribuer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Montant total à distribuer */}
        <div className="space-y-2">
          <Label>Montant total à distribuer :</Label>
          <div className="flex items-center space-x-4">
            <Slider
              min={0}
              max={maxAmount}
              step={100}
              value={[totalAmount]}
              onValueChange={(value) => setTotalAmount(value[0])}
            />
            <input
              type="number"
              className="border p-2 w-24"
              value={totalAmount}
              onChange={(e) =>
                setTotalAmount(
                  Math.min(
                    maxAmount,
                    Math.max(0, parseInt(e.target.value) || 0)
                  )
                )
              }
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {totalAmount <= maxExemptAmount
              ? `Montant exonéré jusqu'à ${maxExemptAmount.toLocaleString(
                  'fr-FR'
                )} €`
              : 'Montant non exonéré'}
          </p>
        </div>

        <Button onClick={handleNext} className="w-full">
          Suivant
        </Button>
      </CardContent>
    </Card>
  );
}