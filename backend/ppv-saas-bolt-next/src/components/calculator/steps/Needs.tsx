"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSimulation } from '@/contexts/SimulationContext'

const needs = [
  { id: 'redistribute', label: 'Redistribuer les bénéfices aux salariés' },
  { id: 'increase', label: 'Augmenter le pouvoir d\'achat' },
  { id: 'reward', label: 'Récompenser des performances collectives' },
]

interface NeedsProps {
  onNext: () => void
  onPrev: () => void
}

export function Needs({ onNext, onPrev }: NeedsProps) {
  const { data, updateData } = useSimulation()
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(
    data.selectedNeeds?.map((need) => need.id) || []
  )
  const [otherNeed, setOtherNeed] = useState(data.otherNeed || '')

  const handleNeedToggle = (needId: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(needId) ? prev.filter((id) => id !== needId) : [...prev, needId]
    )
  }

  const handleNext = () => {
    const newSelectedNeeds = needs.filter((need) => selectedNeeds.includes(need.id))
    const newOtherNeed = selectedNeeds.includes('other') ? otherNeed : ''

    updateData({
      selectedNeeds: newSelectedNeeds,
      otherNeed: newOtherNeed,
    })

    onNext()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Pourquoi souhaitez-vous verser cette prime ?</CardTitle>
        <CardDescription>Choisissez les objectifs qui correspondent le mieux à votre entreprise.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {needs.map((need) => (
            <div key={need.id} className="flex items-center space-x-2">
              <Checkbox
                id={need.id}
                checked={selectedNeeds.includes(need.id)}
                onCheckedChange={() => handleNeedToggle(need.id)}
              />
              <Label htmlFor={need.id}>{need.label}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other"
              checked={selectedNeeds.includes('other')}
              onCheckedChange={() => handleNeedToggle('other')}
            />
            <Label htmlFor="other">Autre</Label>
          </div>
          {selectedNeeds.includes('other') && (
            <Input
              placeholder="Précisez votre objectif"
              value={otherNeed}
              onChange={(e) => setOtherNeed(e.target.value)}
              className="mt-2"
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <Button onClick={handleNext} disabled={selectedNeeds.length === 0}>
          Suivant
        </Button>
      </CardFooter>
    </Card>
  )
}
