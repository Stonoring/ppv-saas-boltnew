import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCompanyStore } from '@/stores/company-store';
import { useEmployeeStore } from '@/stores/employee-store';
import { EmployeeCard } from './EmployeeCard';
import { Plus, Search } from 'lucide-react';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { formatCurrency } from '@/lib/utils';

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { companyData } = useCompanyStore();
  const { employees } = useEmployeeStore();

  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSalary = employees.reduce((sum, emp) => sum + emp.annualSalary, 0);
  const averageSalary = employees.length ? totalSalary / employees.length : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestion des Bénéficiaires</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un bénéficiaire
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{employees.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Nombre total de bénéficiaires
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {formatCurrency(averageSalary)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Salaire moyen annuel
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {formatCurrency(totalSalary)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Masse salariale totale
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un bénéficiaire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Employee Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                />
              ))}
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                Aucun bénéficiaire trouvé
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddEmployeeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}