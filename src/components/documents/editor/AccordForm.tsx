import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCompanyStore } from '@/stores/company-store';
import { useToast } from '@/hooks/use-toast';
import { useNotificationStore } from '@/stores/notification-store';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

interface AccordFormProps {
  onComplete: () => void;
}

export function AccordForm({ onComplete }: AccordFormProps) {
  const { companyData } = useCompanyStore();
  const { toast } = useToast();
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomEntreprise: companyData?.nom_entreprise || '',
    periodeApplication: '',
    siret: localStorage.getItem('siret') || '',
    nombreSalaries: companyData?.effectifs || '',
    adresse: '',
    idcc: '',
    exercicesRetenus: '',
    dateClotureExercice: '',
    lieu: '',
    nomQualiteSignataire: '',
  });

  const generatePDF = async () => {
    try {
      // Charger la template
      const response = await fetch(
        '/src/components/documents/templates/accord.txt'
      );
      const template = await response.text();

      // Calcul de la date limite de versement (5 mois après la date de clôture)
      const dateLimiteVersement = new Date(formData.dateClotureExercice);
      dateLimiteVersement.setMonth(dateLimiteVersement.getMonth() + 5);

      const currentDate = new Date().toLocaleDateString('fr-FR');

      // Remplacement sécurisé des placeholders
      const replacements: Record<string, string> = {
        nomEntreprise: formData.nomEntreprise || "Nom de l'entreprise",
        siret: formData.siret || 'Numéro SIRET',
        adresse: formData.adresse || 'Adresse complète',
        idcc: formData.idcc || 'Code IDCC',
        exercicesRetenus: formData.exercicesRetenus || 'Exercices retenus',
        periodeApplication:
          formData.periodeApplication || "Période d'application",
        nombreSalaries: formData.nombreSalaries || 'Nombre de salariés',
        dateClotureExercice: formData.dateClotureExercice || 'Date de clôture',
        lieu: formData.lieu || 'Lieu',
        nomQualiteSignataire:
          formData.nomQualiteSignataire || 'Nom et qualité du signataire',
        dateLimiteVersement: dateLimiteVersement.toLocaleDateString('fr-FR'),
        dateActuelle: currentDate,
        Date: currentDate, // Gestion d'un placeholder potentiel {{Date}}
      };

      let filledTemplate = template;
      Object.keys(replacements).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        filledTemplate = filledTemplate.replace(regex, replacements[key]);
      });

      // Génération du PDF
      const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
        lineHeight: 1.5,
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

      const pdfName = `Accord-${formData.nomEntreprise}.pdf`;
      doc.save(pdfName);

      // Enregistrement du document dans localStorage (bibliothèque)
      const documentData = {
        type: 'accord',
        data: replacements,
        timestamp: new Date().toISOString(),
        id: crypto.randomUUID(),
      };

      const existingDocs = JSON.parse(
        localStorage.getItem('documents') || '[]'
      );
      const updatedDocs = [...existingDocs, documentData];
      localStorage.setItem('documents', JSON.stringify(updatedDocs));

      // Création d'une notification
      addNotification({
        title: 'Accord généré',
        message: `Un accord a été généré pour ${formData.nomEntreprise}`,
        type: 'document',
        documentId: documentData.id,
      });

      // Alerte de succès via toast
      toast({
        title: 'PDF généré',
        description:
          'Le PDF a été généré avec succès et enregistré dans vos documents.',
      });

      // Redirection vers la page des documents
      navigate('/documents');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de générer le PDF.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nomEntreprise">Nom de l'entreprise</Label>
        <Input
          id="nomEntreprise"
          value={formData.nomEntreprise}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, nomEntreprise: e.target.value }))
          }
          placeholder="Nom de l'entreprise"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="siret">Numéro SIRET</Label>
        <Input
          id="siret"
          value={formData.siret}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, siret: e.target.value }))
          }
          placeholder="Numéro SIRET"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nombreSalaries">Nombre de salariés</Label>
        <Input
          id="nombreSalaries"
          value={formData.nombreSalaries}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, nombreSalaries: e.target.value }))
          }
          placeholder="Nombre de salariés"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse complète</Label>
        <Input
          id="adresse"
          value={formData.adresse}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, adresse: e.target.value }))
          }
          placeholder="12 rue des exemples, 75000 Paris"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="idcc">Code IDCC</Label>
        <Input
          id="idcc"
          value={formData.idcc}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, idcc: e.target.value }))
          }
          placeholder="Code IDCC"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exercicesRetenus">Exercices retenus</Label>
        <Input
          id="exercicesRetenus"
          value={formData.exercicesRetenus}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              exercicesRetenus: e.target.value,
              periodeApplication: e.target.value,
            }))
          }
          placeholder="16/06/2023 – 15/06/2024"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateClotureExercice">
          Date de clôture de l'exercice
        </Label>
        <Input
          id="dateClotureExercice"
          type="date"
          value={formData.dateClotureExercice}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dateClotureExercice: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className="space-y-2">
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

      <div className="space-y-2">
        <Label htmlFor="nomQualiteSignataire">
          Nom et qualité du signataire
        </Label>
        <Input
          id="nomQualiteSignataire"
          value={formData.nomQualiteSignataire}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              nomQualiteSignataire: e.target.value,
            }))
          }
          placeholder="Jean Dupont, Directeur Général"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Générer le PDF
      </Button>
    </form>
  );
}
