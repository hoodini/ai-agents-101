export interface CodeCell {
  id: string;
  code: string;
  language: 'typescript' | 'javascript';
  editable: boolean;
  description?: string;
}

export interface Lab {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  cells: CodeCell[];
  completed: boolean;
}

export interface ExecutionResult {
  output: string;
  error?: string;
  timestamp: number;
}

export type ProviderType = 'cohere' | 'browser';

export interface ProviderConfig {
  apiKey: string | null;
  models: string[];
  isActive: boolean;
}

export interface AppState {
  providers: Record<ProviderType, ProviderConfig>;
  activeProvider: ProviderType;
  selectedModel: string;
  currentLab: number;
  labProgress: Record<number, boolean>;
  language: 'en' | 'he';
  theme: 'dark' | 'light';
  activateProvider: (provider: ProviderType, apiKey: string, models: string[]) => void;
  setActiveProvider: (provider: ProviderType) => void;
  setSelectedModel: (model: string) => void;
  setCurrentLab: (labId: number) => void;
  markLabComplete: (labId: number) => void;
  markLabCompleteAndAdvance: (labId: number, totalLabs: number) => void;
  setLanguage: (lang: 'en' | 'he') => void;
  setTheme: (theme: 'dark' | 'light') => void;
}
