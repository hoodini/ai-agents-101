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

export interface LabCustomizations {
  lab3SystemPrompt?: string;
  lab3UserPrompt?: string;
  lab3PiratePrompt?: string;
  lab3PirateQuestion?: string;
  lab4TestMessages?: string[];
  lab5KnowledgeBase?: string;
  lab6Documents?: string[];
  lab6EmbeddingModel?: string;
  lab7ResearcherPrompt?: string;
  lab7WriterPrompt?: string;
  lab8RouterPrompt?: string;
  lab8TechnicalPrompt?: string;
  lab8BusinessPrompt?: string;
  lab9Documents?: string[];
  lab9EmbeddingModel?: string;
  lab10ToolName?: string;
  lab10ToolDescription?: string;
}

export interface AppState {
  providers: Record<ProviderType, ProviderConfig>;
  activeProvider: ProviderType;
  selectedModel: string;
  currentLab: number;
  labProgress: Record<number, boolean>;
  language: 'en' | 'he';
  theme: 'dark' | 'light';
  labCustomizations: LabCustomizations;
  activateProvider: (provider: ProviderType, apiKey: string, models: string[]) => void;
  setActiveProvider: (provider: ProviderType) => void;
  setSelectedModel: (model: string) => void;
  setCurrentLab: (labId: number) => void;
  markLabComplete: (labId: number) => void;
  markLabCompleteAndAdvance: (labId: number, totalLabs: number) => void;
  setLanguage: (lang: 'en' | 'he') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setLabCustomization: <K extends keyof LabCustomizations>(key: K, value: LabCustomizations[K]) => void;
}
