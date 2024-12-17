"use client"

interface CustomXAxisTickProps {
  x?: number
  y?: number
  payload?: {
    value: string
  }
}

export function CustomXAxisTick({ x, y, payload }: CustomXAxisTickProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="currentColor"
        className="text-xs"
      >
        {payload?.value}
      </text>
    </g>
  )
}
