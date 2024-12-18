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
    id: 'COMPOSER',
    name: 'Composer',
    icon: Pencil,
    route: '/calculator',
  },
  {
    id: 'REDIGER',
    name: 'Rédiger',
    icon: FileText,
    route: '/redaction',
  },
  {
    id: 'FINALISER',
    name: 'Finaliser',
    icon: Check,
    route: '/validation',
  },
  {
    id: 'VERSER',
    name: 'Verser',
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
        <Progress value={(progress / steps.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {steps.map((step) => {
            const stepProgress = getStepProgress(step.id)
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = currentStep === step.id

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'relative flex h-12 w-12 items-center justify-center rounded-full border-2',
                    isCompleted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isCurrent
                      ? 'border-primary'
                      : 'border-muted-foreground'
                  )}
                >
                  <step.icon className="h-6 w-6" />
                  {stepProgress > 0 && !isCompleted && (
                    <Progress
                      value={stepProgress}
                      className="absolute -bottom-1 left-1/2 h-1 w-24 -translate-x-1/2"
                    />
                  )}
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{step.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {isCompleted
                          ? 'Terminé'
                          : isCurrent
                          ? 'En cours'
                          : 'À venir'}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(step.route)}
                      disabled={!isCompleted && !isCurrent}
                    >
                      {isCompleted ? 'Modifier' : isCurrent ? 'Continuer' : 'Commencer'}
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
