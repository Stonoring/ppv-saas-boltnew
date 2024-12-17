import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PAYMENT_MODES } from '@/lib/calculator/constants';
import { formatCurrency } from '@/lib/utils';

export function ImpactChart() {
  const renderCustomAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const lines = payload.value.split('\n');
    
    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line: string, index: number) => (
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
  };

  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="font-medium">{label.replace('\n', ' ')}</p>
        <p className="text-sm text-primary">
          Coût employeur: {formatCurrency(payload[0]?.value)}
        </p>
        <p className="text-sm text-success">
          Montant net: {formatCurrency(payload[1]?.value)}
        </p>
      </div>
    );
  };

  return (
    <div className="mt-8 h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={PAYMENT_MODES}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 80
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="shortName"
            height={80}
            tick={renderCustomAxisTick}
          />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip content={renderCustomTooltip} />
          <Legend verticalAlign="top" height={36} />
          <Bar
            dataKey="employerCost"
            name="Coût employeur"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="netAmount"
            name="Montant net reçu"
            fill="hsl(var(--success))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}