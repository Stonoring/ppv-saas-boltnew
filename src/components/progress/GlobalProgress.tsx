import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ProgressStep {
  label: string;
  progress: number;
  description: string;
}

const steps: ProgressStep[] = [
  { label: 'Documents', progress: 80, description: '8/10 documents validés' },
  { label: 'Validation', progress: 60, description: '3/5 signatures obtenues' },
  { label: 'Paiement', progress: 40, description: 'En attente de validation finale' },
];

export default function GlobalProgress() {
  const [isOpen, setIsOpen] = useState(false);
  const totalProgress = Math.round(
    steps.reduce((acc, step) => acc + step.progress, 0) / steps.length
  );

  return (
    <>
      <Card
        onClick={() => setIsOpen(true)}
        className={cn(
          "relative overflow-hidden cursor-pointer transition-all",
          "hover:shadow-md hover:scale-[1.02]",
          "active:scale-[0.98]"
        )}
      >
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Avancement Global</h2>
            <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
          </div>
          
          <Progress value={totalProgress} className="h-2" />
          
          <p className="text-sm text-muted-foreground">
            Cliquez pour voir les détails
          </p>
        </div>
        
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/0 
          opacity-0 transition-opacity group-hover:opacity-100"
        />
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Détails de l'avancement</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {steps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{step.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {step.progress}%
                  </span>
                </div>
                <Progress value={step.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}