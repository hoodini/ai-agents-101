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

export interface AppState {
  apiKey: string | null;
  provider: 'groq' | 'cohere';
  selectedModel: string;
  availableModels: string[];
  currentLab: number;
  labProgress: Record<number, boolean>;
  setApiKey: (key: string, provider: 'groq' | 'cohere') => void;
  setSelectedModel: (model: string) => void;
  setAvailableModels: (models: string[]) => void;
  setCurrentLab: (labId: number) => void;
  markLabComplete: (labId: number) => void;
}
