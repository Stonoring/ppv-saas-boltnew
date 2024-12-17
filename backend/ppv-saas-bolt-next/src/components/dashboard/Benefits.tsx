"use client"

import { Sparkles, TrendingUp, Shield, Coins } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const benefits = [
  {
    icon: Sparkles,
    title: 'Motivation',
    description: 'Renforce l\'engagement des employés',
    color: 'text-yellow-500',
  },
  {
    icon: TrendingUp,
    title: 'Performance',
    description: 'Améliore la productivité',
    color: 'text-green-500',
  },
  {
    icon: Shield,
    title: 'Sécurité',
    description: 'Cadre légal optimisé',
    color: 'text-blue-500',
  },
  {
    icon: Coins,
    title: 'Économies',
    description: 'Avantages fiscaux',
    color: 'text-purple-500',
  },
]

export default function Benefits() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avantages PPV</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border p-4 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Icon className={cn("h-6 w-6", benefit.color)} />
                  <div>
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
