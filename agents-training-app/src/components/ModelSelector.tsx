import { Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ModelSelector() {
  const { selectedModel, availableModels, setSelectedModel, provider } = useStore();

  if (availableModels.length === 0) {
    return null;
  }

  // Provider badge colors
  const providerColors = {
    groq: 'from-orange-500 to-red-600',
    cohere: 'from-blue-500 to-cyan-600',
  };

  const providerColor = providerColors[provider as keyof typeof providerColors] || 'from-purple-500 to-blue-600';

  return (
    <div className="flex items-center gap-2 glass rounded-lg px-3 py-2 border border-white/10 hover:border-white/20 transition-all">
      <div className={`p-1.5 bg-gradient-to-br ${providerColor} rounded-lg`}>
        <Sparkles className="w-3 h-3 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-white/50 uppercase tracking-wide">{provider || 'Model'}</span>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="text-sm bg-transparent text-white font-medium focus:outline-none cursor-pointer hover:text-gradient-neural transition-colors"
        >
          {availableModels.map((model) => (
            <option key={model} value={model} className="bg-slate-900 text-white">
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
