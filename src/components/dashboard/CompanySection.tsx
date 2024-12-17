import { useState } from 'react';
import { Building2, Users, Banknote, Calendar, Clock, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompanyStore } from '@/stores/company-store';
import { formatCurrency } from '@/lib/utils';

export default function CompanySection() {
  const { companyData, isLoading, setCompanyData } = useCompanyStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(companyData);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Information Entreprise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!companyData) {
    return null;
  }

  const handleSave = () => {
    if (editData) {
      setCompanyData(editData);
      setIsEditing(false);
    }
  };

  const metrics = [
    {
      icon: Building2,
      label: 'Entreprise',
      value: companyData.nom_entreprise,
      editable: false,
    },
    {
      icon: Users,
      label: 'Effectif',
      value: companyData.effectifs,
      editable: true,
      field: 'effectifs',
      suffix: ' employés',
    },
    {
      icon: Banknote,
      label: "Chiffre d'affaires",
      value: formatCurrency(companyData.chiffre_affaires),
      editable: true,
      field: 'chiffre_affaires',
    },
    {
      icon: Calendar,
      label: 'Date de création',
      value: companyData.date_creation,
      editable: false,
    },
    {
      icon: History,
      label: "Années d'existence",
      value: `${companyData.annees_existence} ans`,
      editable: false,
    },
    {
      icon: Clock,
      label: 'Exercice comptable',
      value: companyData.debut_exercice_comptable,
      editable: false,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">Information Entreprise</CardTitle>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              Enregistrer
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => {
            setEditData(companyData);
            setIsEditing(true);
          }}>
            Modifier
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  {isEditing && metric.editable ? (
                    <Input
                      value={editData?.[metric.field as keyof typeof editData] || ''}
                      onChange={(e) => setEditData(prev => ({
                        ...prev!,
                        [metric.field!]: e.target.value
                      }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">{metric.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}