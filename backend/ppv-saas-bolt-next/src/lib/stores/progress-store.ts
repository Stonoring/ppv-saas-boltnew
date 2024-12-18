import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Step = 'COMPOSER' | 'REDIGER' | 'FINALISER' | 'VERSER';

interface StepProgress {
  completed: number;
  total: number;
}

interface ProgressState {
  completedSteps: Step[];
  currentStep: Step;
  stepProgress: Record<Step, StepProgress>;
  completeStep: (step: Step) => void;
  updateStepProgress: (step: Step, completed: number, total: number) => void;
  getCurrentProgress: () => number;
  getStepProgress: (step: Step) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedSteps: [],
      currentStep: 'COMPOSER',
      stepProgress: {
        COMPOSER: { completed: 0, total: 1 },
        REDIGER: { completed: 0, total: 3 },
        FINALISER: { completed: 0, total: 1 },
        VERSER: { completed: 0, total: 1 },
      },
      completeStep: (step) => set((state) => {
        const newCompletedSteps = [...new Set([...state.completedSteps, step])];
        const steps: Step[] = ['COMPOSER', 'REDIGER', 'FINALISER', 'VERSER'];
        const currentStepIndex = steps.indexOf(step);
        const nextStep = steps[currentStepIndex + 1] || step;
        
        return {
          completedSteps: newCompletedSteps,
          currentStep: nextStep,
        };
      }),
      updateStepProgress: (step, completed, total) => set((state) => ({
        stepProgress: {
          ...state.stepProgress,
          [step]: { completed, total }
        }
      })),
      getCurrentProgress: () => {
        const state = get();
        return (state.completedSteps.length / 4) * 100;
      },
      getStepProgress: (step) => {
        const state = get();
        const { completed, total } = state.stepProgress[step];
        return (completed / total) * 100;
      },
    }),
    {
      name: 'ppv-progress',
    }
  )
);