"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { SimulationProvider } from '@/contexts/SimulationContext'
import { CompanyInfo } from './steps/CompanyInfo'
import { Needs } from './steps/Needs'
import { PrimeModeling } from './steps/PrimeModeling'
import { Impact } from './steps/Impact'
import { Summary } from './steps/Summary'

const steps = [
  { id: 1, component: CompanyInfo },
  { id: 2, component: Needs },
  { id: 3, component: PrimeModeling },
  { id: 4, component: Impact },
  { id: 5, component: Summary },
] as const

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <SimulationProvider>
      <div className="container max-w-4xl mx-auto py-6">
        <Card className="p-6">
          <CurrentStepComponent
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </Card>
      </div>
    </SimulationProvider>
  )
}
