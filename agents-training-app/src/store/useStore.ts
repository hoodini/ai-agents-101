import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, ProviderType } from '../types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      providers: {
        cohere: {
          apiKey: null,
          models: [],
          isActive: false,
        },
        browser: {
          apiKey: 'browser-llm',
          models: [],
          isActive: false,
        },
      },
      activeProvider: 'cohere',
      selectedModel: 'command-a-03-2025',
      currentLab: 1,
      labProgress: {},
      language: 'en',
      theme: 'dark',

      activateProvider: (provider: ProviderType, apiKey: string, models: string[]) => {
        set((state) => {
          const defaultModel = models[0] || state.selectedModel;
          return {
            providers: {
              ...state.providers,
              [provider]: {
                apiKey,
                models,
                isActive: true,
              },
            },
            activeProvider: provider,
            selectedModel: defaultModel,
          };
        });
      },

      setActiveProvider: (provider: ProviderType) =>
        set((state) => {
          const providerConfig = state.providers[provider];
          if (!providerConfig.isActive) {
            return state; // Don't switch to inactive provider
          }
          const defaultModel = providerConfig.models[0] || state.selectedModel;
          return {
            activeProvider: provider,
            selectedModel: defaultModel,
          };
        }),

      setSelectedModel: (model: string) =>
        set({ selectedModel: model }),

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
