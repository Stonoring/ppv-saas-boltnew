import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { fetchCompanyData } from '@/lib/company';
import { useCompanyStore } from '@/stores/company-store';

interface SiretEntryProps {
  onAuthenticate: () => void;
}

export default function SiretEntry({ onAuthenticate }: SiretEntryProps) {
  const [siret, setSiret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCompanyData, setLoading } = useCompanyStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanSiret = siret.replace(/\D/g, '');
    if (cleanSiret.length !== 14) {
      toast({
        title: "Format invalide",
        description: "Le numéro SIRET doit contenir 14 chiffres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setLoading(true);

    try {
      const data = await fetchCompanyData(cleanSiret);
      
      if (data) {
        localStorage.setItem('siret', cleanSiret);
        setCompanyData(data);
        onAuthenticate();
        navigate('/dashboard');
      } else {
        throw new Error('Données entreprise non disponibles');
      }
    } catch (error) {
      toast({
        title: "Erreur d'authentification",
        description: "Impossible de vérifier le numéro SIRET",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Share2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Primeasy
              </span>
            </CardTitle>
            <CardDescription>
              Gestion de la Prime de Partage de Valeur
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siret">Numéro SIRET</Label>
              <Input
                id="siret"
                type="text"
                value={siret}
                onChange={(e) => setSiret(e.target.value.replace(/\D/g, ''))}
                className="text-lg tracking-wide"
                maxLength={14}
                placeholder="Entrez votre numéro SIRET"
                autoComplete="off"
                required
              />
              <p className="text-sm text-muted-foreground">
                14 chiffres sans espaces
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !siret.replace(/\D/g, '').length}
            >
              {isLoading ? (
                "Vérification..."
              ) : (
                <>
                  Accéder à mon espace
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}