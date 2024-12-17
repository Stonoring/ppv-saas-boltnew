"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useSimulation } from '@/contexts/SimulationContext'

interface PrimeModelingProps {
  onNext: () => void
  onPrev: () => void
}

export function PrimeModeling({ onNext, onPrev }: PrimeModelingProps) {
  const { data, updateData } = useSimulation()

  // Calcul des montants maximums
  const maxExemptAmount = data.hasIncentive
    ? 6000 * (data.employees || 1)
    : 3000 * (data.employees || 1)
  const maxAmount = Math.max(maxExemptAmount, 6000 * (data.employees || 1))
  const [totalAmount, setTotalAmount] = useState<number>(
    data.totalAmount || 3000 * (data.employees || 1)
  )

  const handleNext = () => {
    updateData({
      totalAmount,
      distributionCriteria: 'equal',
    })
    onNext()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment souhaitez-vous répartir votre prime ?</CardTitle>
        <CardDescription>
          Définissez le montant total à distribuer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Montant total à distribuer */}
        <div className="space-y-2">
          <Label>Montant total à distribuer :</Label>
          <div className="flex items-center space-x-4">
            <Slider
              min={0}
              max={maxAmount}
              step={100}
              value={[totalAmount]}
              onValueChange={([value]) => setTotalAmount(value)}
              className="flex-1"
            />
            <Input
              type="number"
              value={totalAmount}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (!isNaN(value) && value >= 0 && value <= maxAmount) {
                  setTotalAmount(value)
                }
              }}
              className="w-24"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Montant maximum exonéré : {maxExemptAmount.toLocaleString()}€
          </p>
        </div>

        {/* Montant par employé */}
        <div className="space-y-2">
          <Label>Montant moyen par employé :</Label>
          <p className="text-2xl font-bold">
            {Math.round(totalAmount / (data.employees || 1)).toLocaleString()}€
          </p>
          <p className="text-sm text-muted-foreground">
            Basé sur une répartition égalitaire
          </p>
        </div>
      </CardContent>
      <div className="flex justify-end gap-2 p-6">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <Button onClick={handleNext}>
          Suivant
        </Button>
      </div>
    </Card>
  )
}
