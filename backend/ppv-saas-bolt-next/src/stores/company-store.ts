import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompanyData {
  nom_entreprise: string;
  effectifs: string;
  chiffre_affaires: string;
  date_creation: string;
  annees_existence: number;
  debut_exercice_comptable: string;
}

interface CompanyStore {
  companyData: CompanyData | null;
  isLoading: boolean;
  setCompanyData: (data: CompanyData | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      companyData: null,
      isLoading: false,
      setCompanyData: (data) => set({ companyData: data }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'company-storage',
    }
  )
);
