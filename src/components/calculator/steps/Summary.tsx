import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSimulation } from '@/contexts/SimulationContext';
import { useCompanyStore } from '@/stores/company-store';
import { useNavigate } from 'react-router-dom';
import { generatePPVReport } from '@/lib/pdf';
import { useToast } from '@/hooks/use-toast';
import { Download, Save } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { useNotificationStore } from '@/stores/notification-store';
import { formatCurrency } from '@/lib/utils';

interface SummaryProps {
  onPrev: () => void;
}

export function Summary({ onPrev }: SummaryProps) {
  const { data } = useSimulation();
  const { companyData } = useCompanyStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { completeStep } = useProgressStore();
  const { addNotification } = useNotificationStore();

  const montantTotal = data.totalAmount || 0;
  const nombreBeneficiaires = data.employees || 1;
  const primeParEmploye = montantTotal / nombreBeneficiaires;
  const coutTotal = primeParEmploye > 3000 && !data.hasIncentive ? montantTotal * 1.2 : montantTotal;
  const montantNetSalarie = (montantTotal * 0.8 * 0.9) / nombreBeneficiaires;

  const handleSave = async () => {
    try {
      if (!companyData) {
        throw new Error('Données entreprise non disponibles');
      }

      await generatePPVReport(companyData, data);

      const simulationRecord = {
        type: 'simulation',
        data: {
          ...data,
          companyData,
          timestamp: new Date().toISOString(),
        },
        id: crypto.randomUUID(),
      };

      const documents = JSON.parse(localStorage.getItem('documents') || '[]');
      documents.push(simulationRecord);
      localStorage.setItem('documents', JSON.stringify(documents));

      addNotification({
        title: "Simulation enregistrée",
        message: "La simulation PPV a été enregistrée avec succès",
        type: 'simulation',
        documentId: simulationRecord.id,
      });

      completeStep('COMPOSER');

      toast({
        title: "Simulation enregistrée",
        description: "La simulation a été enregistrée et est disponible dans 'Mes documents'",
      });

      navigate('/documents');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer la simulation",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif de votre simulation</CardTitle>
          <CardDescription>
            Vérifiez les détails de votre simulation avant de l'enregistrer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Information */}
          <div>
            <h3 className="font-semibold mb-2">Informations entreprise</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nom</TableCell>
                  <TableCell>{companyData?.nom_entreprise}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Effectif</TableCell>
                  <TableCell>{companyData?.effectifs}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chiffre d'affaires</TableCell>
                  <TableCell>{formatCurrency(companyData?.chiffre_affaires || '0')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Simulation Details */}
          <div>
            <h3 className="font-semibold mb-2">Détails de la prime</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Montant total</TableCell>
                  <TableCell>{formatCurrency(montantTotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nombre de bénéficiaires</TableCell>
                  <TableCell>{nombreBeneficiaires}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Prime moyenne par employé</TableCell>
                  <TableCell>{formatCurrency(primeParEmploye)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Coût total employeur</TableCell>
                  <TableCell>{formatCurrency(coutTotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Montant net perçu par employé</TableCell>
                  <TableCell>{formatCurrency(montantNetSalarie)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Distribution Method */}
          <div>
            <h3 className="font-semibold mb-2">Méthode de distribution</h3>
            <p>Distribution égalitaire entre tous les bénéficiaires</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between space-x-4">
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => navigate('/calculator')}>
            Nouvelle simulation
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}