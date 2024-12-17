"use client"

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle } from 'lucide-react'
import { useSimulation } from '@/contexts/SimulationContext'
import { useCompanyStore } from '@/stores/company-store'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface CompanyInfoProps {
  onNext: () => void
  onPrev: () => void
}

export function CompanyInfo({ onNext, onPrev }: CompanyInfoProps) {
  const { data, updateData } = useSimulation()
  const { companyData } = useCompanyStore()

  const getEmployeeCount = () => {
    if (!companyData?.effectifs) return ''
    const match = companyData.effectifs.match(/\d+/)
    return match ? match[0] : ''
  }

  const [employees, setEmployees] = useState<string>(data.employees?.toString() || getEmployeeCount())
  const [profits, setProfits] = useState<string>('0')
  const [hasIncentive, setHasIncentive] = useState<string>(data.hasIncentive ? 'yes' : 'no')

  const employeeNumber = parseInt(employees, 10) || 0
  const profitNumber = parseInt(profits, 10) || 0
  const isObligatoryForEmployees = employeeNumber >= 11 && employeeNumber <= 49
  const isValid = employees !== '' && hasIncentive !== null

  const handleNext = useCallback(() => {
    if (isValid) {
      updateData({
        employees: employeeNumber,
        profits: profitNumber,
        hasIncentive: hasIncentive === 'yes',
      })
      onNext()
    }
  }, [employeeNumber, profitNumber, hasIncentive, updateData, onNext, isValid])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Dites-nous en plus sur votre entreprise</CardTitle>
        <CardDescription>
          Ces informations nous aideront à vérifier votre éligibilité et vos obligations liées au dispositif PPV.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="employees">Nombre d'employés</Label>
          <Input
            id="employees"
            type="number"
            min="1"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            placeholder="Entrez le nombre d'employés"
          />
          {isObligatoryForEmployees && (
            <p className="text-sm text-yellow-600 dark:text-yellow-500 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Votre entreprise est soumise à l'obligation de mise en place d'un dispositif d'épargne salariale.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="profits">Bénéfices annuels (€)</Label>
          <Input
            id="profits"
            type="number"
            min="0"
            value={profits}
            onChange={(e) => setProfits(e.target.value)}
            placeholder="Entrez les bénéfices annuels"
          />
        </div>

        <div className="space-y-2">
          <Label>Avez-vous déjà un accord d'intéressement ?</Label>
          <RadioGroup
            value={hasIncentive}
            onValueChange={setHasIncentive}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Oui</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">Non</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onPrev}
        >
          Retour
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
        >
          Suivant
        </Button>
      </CardFooter>
    </Card>
  )
}
