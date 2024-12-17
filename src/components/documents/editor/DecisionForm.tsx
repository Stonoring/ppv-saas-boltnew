import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCompanyStore } from '@/stores/company-store';
import { generatePDF } from '@/lib/pdf';
import { useToast } from '@/hooks/use-toast';

interface DecisionFormProps {
  onComplete: () => void;
}

export function DecisionForm({ onComplete }: DecisionFormProps) {
  const { companyData } = useCompanyStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    typeDistribution: 'plafond',
    typeAmount: 'fixe',
    montant: '',
    criteres: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await generatePDF('decision', {
        ...companyData,
        ...formData,
      });

      toast({
        title: "Document généré",
        description: "La décision a été générée avec succès",
      });

      onComplete();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le document",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Type de distribution</Label>
        <RadioGroup
          value={formData.typeDistribution}
          onValueChange={(value) => setFormData(prev => ({ ...prev, typeDistribution: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="plafond" id="plafond" />
            <Label htmlFor="plafond">Prime avec plafond de rémunération</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sans_plafond" id="sans_plafond" />
            <Label htmlFor="sans_plafond">Prime sans plafond de rémunération</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Type de montant</Label>
        <RadioGroup
          value={formData.typeAmount}
          onValueChange={(value) => setFormData(prev => ({ ...prev, typeAmount: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fixe" id="fixe" />
            <Label htmlFor="fixe">Montant fixe pour tous les salariés</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="module" id="module" />
            <Label htmlFor="module">Montant modulé</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="montant">Montant</Label>
        <Input
          id="montant"
          type="number"
          value={formData.montant}
          onChange={(e) => setFormData(prev => ({ ...prev, montant: e.target.value }))}
          placeholder="3000"
          required
        />
      </div>

      {formData.typeAmount === 'module' && (
        <div className="space-y-2">
          <Label htmlFor="criteres">Critères de modulation</Label>
          <Textarea
            id="criteres"
            value={formData.criteres}
            onChange={(e) => setFormData(prev => ({ ...prev, criteres: e.target.value }))}
            placeholder="Décrivez les critères de modulation..."
            required
          />
        </div>
      )}

      <Button type="submit" className="w-full">
        Générer la décision
      </Button>
    </form>
  );
}