export interface ChartDataPoint {
  name: string;
  shortName: string;
  cout: number;
  net: number;
}

export interface TableRow {
  name: string;
  cost: number;
  netAmount: number;
  taxExemption: string;
}

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: ChartDataPoint;
  }>;
  label?: string;
}

export interface XAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}