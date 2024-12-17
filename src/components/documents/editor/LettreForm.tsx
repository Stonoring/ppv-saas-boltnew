import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useCompanyStore } from '@/stores/company-store';
import { useEmployeeStore } from '@/stores/employee-store';
import { useToast } from '@/hooks/use-toast';
import { useNotificationStore } from '@/stores/notification-store';
import { useProgressStore } from '@/stores/progress-store';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatCurrency } from '@/lib/utils';

interface LettreFormProps {
  onComplete: () => void;
}

export function LettreForm({ onComplete }: LettreFormProps) {
  const { companyData } = useCompanyStore();
  const { employees } = useEmployeeStore();
  const { toast } = useToast();
  const { addNotification } = useNotificationStore();
  const { updateStepProgress } = useProgressStore();
  const navigate = useNavigate();

  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    montant: '',
    moisVersement: '',
    lieu: '',
    adresseEntreprise: '',
    signataire: '',
  });

  const generatePDF = async () => {
    try {
      // Charger la template
      const response = await fetch(
        '/src/components/documents/templates/lettre.txt'
      );
      const template = await response.text();

      const currentDate = format(new Date(), 'dd MMMM yyyy', { locale: fr });

      const documents = [];
      for (const employeeId of selectedEmployees) {
        const employee = employees.find((e) => e.id === employeeId);
        if (!employee) continue;

        const isImposable = employee.annualSalary > 64864.8;
        const impots = isImposable ? 'soumise' : 'non-soumise';

        // Remplacement des placeholders
        const replacements: Record<string, string> = {
          'nom-entreprise':
            companyData?.nom_entreprise || "Nom de l'entreprise",
          'adresse-entreprise':
            formData.adresseEntreprise || "Adresse de l'entreprise",
          nom: employee.lastName,
          prenom: employee.firstName,
          adresse: employee.address || 'Adresse employé',
          lieu: formData.lieu || 'Lieu',
          date: currentDate,
          montant: formData.montant || 'Montant',
          'mois-versement': formData.moisVersement || 'Mois de versement',
          impots,
          signataire: formData.signataire || 'Signataire',
        };

        let filledTemplate = template;
        Object.keys(replacements).forEach((key) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          filledTemplate = filledTemplate.replace(regex, replacements[key]);
        });

        // Générer le PDF pour chaque employé
        const doc = new jsPDF({
          unit: 'mm',
          format: 'a4',
        });
        const marginLeft = 20;
        const marginTop = 20;
        const lineHeight = 7;
        const pageHeight = doc.internal.pageSize.height;
        const textFontSize = 10;

        doc.setFontSize(textFontSize);
        const lines = doc.splitTextToSize(filledTemplate, 170);
        let cursorY = marginTop;

        lines.forEach((line) => {
          if (cursorY + lineHeight > pageHeight - marginTop) {
            doc.addPage();
            cursorY = marginTop;
          }
          doc.text(line, marginLeft, cursorY);
          cursorY += lineHeight;
        });

        const pdfName = `Lettre-${employee.firstName}-${employee.lastName}.pdf`;
        doc.save(pdfName);

        documents.push({
          type: 'lettre',
          data: replacements,
          timestamp: new Date().toISOString(),
          id: crypto.randomUUID(),
        });
      }

      // Enregistrer dans localStorage
      const existingDocs = JSON.parse(
        localStorage.getItem('documents') || '[]'
      );
      const updatedDocs = [...existingDocs, ...documents];
      localStorage.setItem('documents', JSON.stringify(updatedDocs));

      // Ajouter les notifications
      documents.forEach((doc) => {
        addNotification({
          title: 'Document créé',
          message: `Lettre de versement créée pour ${doc.data.prenom} ${doc.data.nom}`,
          type: 'document',
          documentId: doc.id,
        });
      });

      // Mettre à jour la progression
      const totalLetters = updatedDocs.filter(
        (doc) => doc.type === 'lettre'
      ).length;
      updateStepProgress('REDIGER', totalLetters, 3);

      toast({
        title: 'Documents enregistrés',
        description: `${documents.length} lettres ont été enregistrées dans "Mes documents"`,
      });

      navigate('/documents');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de générer les documents',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
    onComplete();
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedEmployees(checked ? employees.map((e) => e.id) : []);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Sélectionner les employés</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectedEmployees.length === employees.length}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all" className="text-sm">
              Tout sélectionner
            </Label>
          </div>
        </div>
        <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-4">
          {employees.map((employee) => (
            <div key={employee.id} className="flex items-center space-x-2">
              <Checkbox
                id={employee.id}
                checked={selectedEmployees.includes(employee.id)}
                onCheckedChange={(checked) => {
                  setSelectedEmployees((prev) =>
                    checked
                      ? [...prev, employee.id]
                      : prev.filter((id) => id !== employee.id)
                  );
                }}
              />
              <Label htmlFor={employee.id} className="flex-1">
                {employee.firstName} {employee.lastName}
                <span className="text-sm text-muted-foreground ml-2">
                  ({formatCurrency(employee.annualSalary)}/an)
                </span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="adresseEntreprise">Adresse de l'entreprise</Label>
          <Input
            id="adresseEntreprise"
            value={formData.adresseEntreprise}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                adresseEntreprise: e.target.value,
              }))
            }
            placeholder="12 rue des exemples, 75000 Paris"
            required
          />
        </div>

        <div>
          <Label htmlFor="montant">Montant de la prime</Label>
          <Input
            id="montant"
            type="number"
            value={formData.montant}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, montant: e.target.value }))
            }
            placeholder="3000"
            required
          />
        </div>

        <div>
          <Label htmlFor="moisVersement">Mois de versement</Label>
          <Input
            id="moisVersement"
            value={formData.moisVersement}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                moisVersement: e.target.value,
              }))
            }
            placeholder="janvier 2024"
            required
          />
        </div>

        <div>
          <Label htmlFor="lieu">Fait à</Label>
          <Input
            id="lieu"
            value={formData.lieu}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lieu: e.target.value }))
            }
            placeholder="Paris"
            required
          />
        </div>

        <div>
          <Label htmlFor="signataire">
            Nom, prénom et qualité du signataire
          </Label>
          <Input
            id="signataire"
            value={formData.signataire}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, signataire: e.target.value }))
            }
            placeholder="Jean Dupont, Directeur Général"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={selectedEmployees.length === 0}
      >
        Générer {selectedEmployees.length}
        lettre{selectedEmployees.length > 1 ? 's' : ''}
      </Button>
    </form>
  );
}
