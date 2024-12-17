import { Scale, Calendar, Euro, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const regulations = [
  {
    icon: Scale,
    title: 'Seuils Légaux',
    description: 'Plafond de 3000€ par bénéficiaire',
    tooltip: 'Montant maximum autorisé par la législation en vigueur',
  },
  {
    icon: Calendar,
    title: 'Échéances',
    description: 'À verser avant le 31 décembre',
    tooltip: 'Date limite de versement pour l\'année en cours',
  },
  {
    icon: Euro,
    title: 'Conditions',
    description: 'Exonération sociale et fiscale',
    tooltip: 'Avantages fiscaux selon conditions spécifiques',
  },
  {
    icon: AlertCircle,
    title: 'Obligations',
    description: 'Accord d\'entreprise requis',
    tooltip: 'Documents légaux nécessaires pour la mise en place',
  },
];

export default function RegulatoryFramework() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadre Réglementaire</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {regulations.map((item, index) => {
            const Icon = item.icon;
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-start gap-4 rounded-lg border p-4 hover:bg-accent">
                      <Icon className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}