"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSimulation } from '@/contexts/SimulationContext'
import { ImpactChart } from './ImpactChart'
import { ImpactTable } from './ImpactTable'

interface ImpactProps {
  onNext: () => void
  onPrev: () => void
}

export function Impact({ onNext, onPrev }: ImpactProps) {
  const { data } = useSimulation()
  const totalAmount = data.totalAmount || 0
  const employeeCount = data.employees || 1

  const averageAmount = totalAmount / employeeCount
  const monthlyAmount = averageAmount / 12
  const yearlyAmount = averageAmount

  return (
    <Card>
      <CardHeader>
        <CardTitle>Impact de la prime</CardTitle>
        <CardDescription>
          Visualisez l'impact financier de la prime sur vos employés
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <ImpactChart
              monthlyAmount={monthlyAmount}
              yearlyAmount={yearlyAmount}
            />
          </div>
          <div>
            <ImpactTable
              monthlyAmount={monthlyAmount}
              yearlyAmount={yearlyAmount}
            />
          </div>
        </div>
      </CardContent>
      <div className="flex justify-end gap-2 p-6">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <Button onClick={onNext}>
          Suivant
        </Button>
      </div>
    </Card>
  )
}
