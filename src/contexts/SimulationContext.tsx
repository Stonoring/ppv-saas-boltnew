import { createContext, useContext, useState } from 'react';

interface SimulationData {
  employees?: number;
  profits?: number;
  hasIncentive?: boolean;
  selectedNeeds?: { id: string; label: string }[];
  otherNeed?: string;
  totalAmount?: number;
  distributionCriteria?: 'equal' | 'weighted';
  criteriaWeights?: Record<string, number>;
}

interface SimulationContextType {
  data: SimulationData;
  updateData: (newData: Partial<SimulationData>) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SimulationData>({});

  const updateData = (newData: Partial<SimulationData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <SimulationContext.Provider value={{ data, updateData }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}