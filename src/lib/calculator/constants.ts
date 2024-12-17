import type { PaymentMode } from '@/types/calculator';

export const PAYMENT_MODES: PaymentMode[] = [
  {
    id: 'classic',
    name: 'Prime classique',
    shortName: 'Prime\nclassique',
    primeAmount: 3000,
    employerCost: 4500,
    netAmount: 1620,
    description: 'Prime soumise aux charges sociales et fiscales'
  },
  {
    id: 'ppv-no-interest',
    name: 'PPV sans intéressement',
    shortName: 'PPV sans\nintéressement',
    primeAmount: 3000,
    employerCost: 3000,
    netAmount: 2709,
    description: 'Exonération de charges sociales jusqu\'à 3000€'
  },
  {
    id: 'ppv-with-interest',
    name: 'PPV avec intéressement',
    shortName: 'PPV avec\nintéressement',
    primeAmount: 6000,
    employerCost: 6000,
    netAmount: 5418,
    description: 'Exonération totale jusqu\'à 6000€'
  },
  {
    id: 'ppv-mixed',
    name: 'PPV mixte',
    shortName: 'PPV\nmixte',
    primeAmount: 6000,
    employerCost: 6000,
    netAmount: 4329,
    description: 'Exonération partielle (3000€ exonérés + 3000€ soumis)'
  }
];

export const DISTRIBUTION_WEIGHTS = {
  single: 100,
  double: 50,
  triple: 33.33
} as const;