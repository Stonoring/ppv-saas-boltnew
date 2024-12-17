"use client"

import { Check, Pencil, FileText, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useProgressStore } from '@/stores/progress-store'

const steps = [
  {
    id: 1,
    name: 'COMPOSER',
    icon: Pencil,
    route: '/calculator',
  },
  {
    id: 2,
    name: 'REDIGER',
    icon: FileText,
    route: '/redaction',
  },
  {
    id: 3,
    name: 'FINALISER',
    icon: Check,
    route: '/validation',
  },
  {
    id: 4,
    name: 'VERSER',
    icon: CreditCard,
    route: '/employees',
  },
] as const

export default function Timeline() {
  const router = useRouter()
  const { completedSteps, currentStep, getCurrentProgress, getStepProgress } = useProgressStore()
  const progress = getCurrentProgress()

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle>Progression PPV</CardTitle>
          <span className="text-sm font-medium">
            Étape {completedSteps.length + 1} sur {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {steps.map((step, index) => {
            const stepProgress = getStepProgress(step.id)
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = currentStep === step.id

            return (
              <div key={step.id} className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary"
                      : "border-muted"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{step.name}</div>
                      {stepProgress > 0 && !isCompleted && (
                        <Progress value={stepProgress} className="mt-1 h-1" />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(step.route)}
                    >
                      {isCompleted ? "Modifier" : "Commencer"}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
