import type { ChartDataPoint, TableRow } from '@/types/chart';

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