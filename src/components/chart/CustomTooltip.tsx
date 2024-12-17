import type { TooltipProps } from '@/types/chart';

export function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-lg">
      <p className="font-medium">{label}</p>
      <p className="text-sm text-primary">Coût total: {payload[0]?.value}€</p>
      <p className="text-sm text-success">Montant net: {payload[1]?.value}€</p>
    </div>
  );
}