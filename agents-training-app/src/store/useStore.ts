import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState } from '../types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      apiKey: null,
      provider: 'groq',
      selectedModel: 'llama-3.1-8b-instant',
      availableModels: [],
      currentLab: 1,
      labProgress: {},
      language: 'en',
      theme: 'dark',

      setApiKey: (key: string, provider: 'groq' | 'cohere') => {
        const defaultModel = provider === 'groq' ? 'llama-3.1-8b-instant' : 'command-a-03-2025';
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
