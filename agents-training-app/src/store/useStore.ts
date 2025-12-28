import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState } from '../types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      apiKey: null,
      provider: 'cohere',
      selectedModel: 'command-a-03-2025',
      availableModels: [],
      currentLab: 1,
      labProgress: {},
      language: 'en',
      theme: 'dark',

      setApiKey: (key: string, provider: 'cohere' | 'browser') => {
        let defaultModel: string;
        if (provider === 'cohere') {
          defaultModel = 'command-a-03-2025';
        } else {
          // browser provider - use WebLLM model
          defaultModel = 'Phi-3.5-mini-instruct-q4f16_1-MLC';
        }
        set({ apiKey: key, provider, selectedModel: defaultModel });
      },

      setSelectedModel: (model: string) =>
        set({ selectedModel: model }),

      setAvailableModels: (models: string[]) =>
        set({ availableModels: models }),

      setCurrentLab: (labId: number) =>
        set({ currentLab: labId }),

      markLabComplete: (labId: number) =>
        set((state) => ({
          labProgress: { ...state.labProgress, [labId]: true },
        })),

      markLabCompleteAndAdvance: (labId: number, totalLabs: number) =>
        set((state) => {
          const nextLab = labId < totalLabs ? labId + 1 : labId;
          // Scroll to top when advancing to next lab
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }
          return {
            labProgress: { ...state.labProgress, [labId]: true },
            currentLab: nextLab,
          };
        }),

      setLanguage: (lang: 'en' | 'he') =>
        set({ language: lang }),

      setTheme: (theme: 'dark' | 'light') =>
        set({ theme }),
    }),
    {
      name: 'agents-training-storage',
    }
  )
);
