import type { XAxisTickProps } from '@/types/chart';

export function CustomXAxisTick({ x, y, payload }: XAxisTickProps) {
  const lines = payload.value.split('\n');
  
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={index * 20}
          dy={16}
          textAnchor="middle"
          className="fill-current text-xs text-muted-foreground"
        >
          {line}
        </text>
      ))}
    </g>
  );
}