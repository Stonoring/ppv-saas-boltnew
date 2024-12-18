import { ReactNode } from 'react';

export interface ChartDataPoint {
  name: string;
  shortName: string;
  cout: number;
  net: number;
}

export const chartData: ChartDataPoint[] = [
  { 
    name: 'Prime classique', 
    shortName: 'Prime\nclassique',
    cout: 3000, 
    net: 2340
  },
  { 
    name: 'PPV sans intéressement', 
    shortName: 'PPV sans\nintéressement',
    cout: 3000, 
    net: 3000
  },
  { 
    name: 'PPV avec intéressement', 
    shortName: 'PPV avec\nintéressement',
    cout: 6000, 
    net: 6000
  },
  { 
    name: 'PPV mixte', 
    shortName: 'PPV\nmixte',
    cout: 6000, 
    net: 5340
  },
];

export interface TableRow {
  name: string;
  cost: number;
  netAmount: number;
  taxExemption: string;
}

export const tableData: TableRow[] = [
  { 
    name: 'Prime classique', 
    cost: 3000, 
    netAmount: 2340,
    taxExemption: 'Non' 
  },
  { 
    name: 'PPV sans intéressement (3000 exonérés)', 
    cost: 3000, 
    netAmount: 3000,
    taxExemption: 'Oui (exonérée mais imposable)'
  },
  { 
    name: 'PPV avec intéressement (6000 €)', 
    cost: 6000, 
    netAmount: 6000,
    taxExemption: 'Oui (totalement exonérée)'
  },
  { 
    name: 'PPV sans intéressement (3000 exonérés + 3000 imposables)', 
    cost: 6000, 
    netAmount: 5340,
    taxExemption: 'Partielle (3000 € exonérés, 3000 € soumis)'
  },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: ChartDataPoint;
  }>;
  label?: string;
}

export function CustomTooltip({ active, payload, label }: TooltipProps): ReactNode {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-background border rounded-lg shadow-lg p-3">
      <p className="font-medium">{label}</p>
      <p className="text-sm text-primary">Coût total: {payload[0]?.value}€</p>
      <p className="text-sm text-success">Montant net: {payload[1]?.value}€</p>
    </div>
  );
}

interface XAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

export function CustomXAxisTick({ x, y, payload }: XAxisTickProps): JSX.Element {
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
          fill="currentColor"
          className="text-xs fill-current text-muted-foreground"
        >
          {line}
        </text>
      ))}
    </g>
  );
}