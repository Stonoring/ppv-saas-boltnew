"use client"

import { Card } from "@/components/ui/card"

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    name: string
  }>
  label?: string
}

export function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <Card className="p-3 bg-background border shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {item.name}: {item.value}
          </p>
        ))}
      </Card>
    )
  }

  return null
}
