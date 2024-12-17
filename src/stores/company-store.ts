import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CompanyData } from '@/lib/company';

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