export interface PaymentMode {
  id: string;
  name: string;
  shortName: string;
  primeAmount: number;
  employerCost: number;
  netAmount: number;
  description: string;
}

export interface DistributionCriteria {
  id: string;
  label: string;
  value: number;
}