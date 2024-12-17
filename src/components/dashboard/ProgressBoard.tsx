import { Download, FileCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ProgressBoard() {
  const progress = 65;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Avancement Global</h2>
          <p className="text-sm text-muted-foreground">
            Mise à jour: {new Date().toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <FileCheck className="h-6 w-6 text-green-500" />
          <div>
            <p className="font-medium">Documents Validés</p>
            <p className="text-sm text-muted-foreground">8/12 fichiers</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border p-4">
          <Clock className="h-6 w-6 text-yellow-500" />
          <div>
            <p className="font-medium">Temps Restant</p>
            <p className="text-sm text-muted-foreground">15 jours</p>
          </div>
        </div>
      </div>
    </div>
  );
}