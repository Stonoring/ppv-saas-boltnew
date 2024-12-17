import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ImpactTable } from './ImpactTable';
import { ImpactChart } from './ImpactChart';

interface ImpactProps {
  onNext: () => void;
  onPrev: () => void;
}

export function Impact({ onNext, onPrev }: ImpactProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quel sera l'impact de vos choix ?</CardTitle>
        <CardDescription>
          Comparez les options pour optimiser vos coûts et maximiser les bénéfices pour vos salariés.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div id="impact-content" className="space-y-8">
          <div id="impact-table">
            <ImpactTable />
          </div>
          
          <div id="impact-chart">
            <ImpactChart />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>Précédent</Button>
        <Button onClick={onNext}>Suivant</Button>
      </CardFooter>
    </Card>
  );
}