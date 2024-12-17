import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  annualSalary: number;
  contract: 'CDI' | 'CDD';
  workTime: 'full' | 'partial';
  workTimePercentage?: number;
}

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  removeEmployee: (id: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) =>
        set((state) => ({
          employees: [
            ...state.employees,
            { ...employee, id: crypto.randomUUID() },
          ],
        })),
      updateEmployee: (id, employee) =>
        set((state) => ({
          employees: state.employees.map((e) =>
            e.id === id ? { ...e, ...employee } : e
          ),
        })),
      removeEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((e) => e.id !== id),
        })),
    }),
    {
      name: 'employee-storage',
    }
  )
);