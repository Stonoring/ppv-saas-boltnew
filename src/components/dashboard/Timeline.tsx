import { Check, Pencil, FileText, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/stores/progress-store';

const steps = [
  {
    id: 1,
    name: 'COMPOSER',
    icon: Pencil,
    route: '/calculator',
  },
  {
    id: 2,
    name: 'REDIGER',
    icon: FileText,
    route: '/redaction',
  },
  {
    id: 3,
    name: 'FINALISER',
    icon: Check,
    route: '/validation',
  },
  {
    id: 4,
    name: 'VERSER',
    icon: CreditCard,
    route: '/employees',
  },
] as const;

export default function Timeline() {
  const navigate = useNavigate();
  const { completedSteps, currentStep, getCurrentProgress, getStepProgress } = useProgressStore();
  const progress = getCurrentProgress();

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle>Progression PPV</CardTitle>
          <span className="text-sm font-medium">
            Étape {completedSteps.length + 1} sur {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isComplete = completedSteps.includes(step.name);
            const isCurrent = currentStep === step.name;
            const stepProgress = getStepProgress(step.name);
            
            return (
              <Button
                key={step.id}
                variant="outline"
                className={cn(
                  "h-auto flex-col items-start gap-4 p-6 hover:bg-accent",
                  isComplete && "border-primary",
                  isCurrent && "border-primary/50 bg-accent"
                )}
                onClick={() => navigate(step.route)}
              >
                <div className="flex w-full items-center gap-4">
                  <div
                    className={cn(
                      "relative shrink-0 rounded-full p-2",
                      isComplete && "bg-primary text-primary-foreground",
                      isCurrent && "bg-primary/50 text-primary",
                      !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {stepProgress > 0 && stepProgress < 100 && (
                      <svg className="absolute inset-0 h-full w-full -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          className="fill-none stroke-primary"
                          strokeWidth="10%"
                          strokeDasharray={`${stepProgress} 100`}
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-semibold">{step.name}</span>
                  {isComplete && (
                    <Check className="ml-auto h-4 w-4 text-primary" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}