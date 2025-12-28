import { Sparkles, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState, useRef, useEffect } from 'react';
import type { ProviderType } from '../types';

export function ModelSelector() {
  const { providers, activeProvider, selectedModel, setActiveProvider, setSelectedModel } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeProviders = (Object.keys(providers) as ProviderType[]).filter(
    (p) => providers[p].isActive
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (activeProviders.length === 0) {
    return null;
  }

  const currentProvider = providers[activeProvider];
  const availableModels = currentProvider.models;

  // Provider badge colors
  const providerColors = {
    cohere: 'from-blue-500 to-cyan-600',
    browser: 'from-purple-500 to-pink-600',
  };

  const providerNames = {
    cohere: 'Cohere',
    browser: 'Browser LLM',
  };

  const providerColor = providerColors[activeProvider] || 'from-purple-500 to-blue-600';

  const handleProviderSwitch = (provider: ProviderType) => {
    setActiveProvider(provider);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2 glass rounded-lg px-3 py-2 border border-white/10 hover:border-white/20 transition-all dark:border-white/10 light:border-black/15">
        <div className={`p-1.5 bg-gradient-to-br ${providerColor} rounded-lg`}>
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <div className="flex flex-col">
          {activeProviders.length > 1 ? (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 text-xs text-white/50 uppercase tracking-wide dark:text-white/50 light:text-black/60 hover:text-white/70 transition-colors"
            >
              {providerNames[activeProvider]}
              <ChevronDown className="w-3 h-3" />
            </button>
          ) : (
            <span className="text-xs text-white/50 uppercase tracking-wide dark:text-white/50 light:text-black/60">
              {providerNames[activeProvider]}
            </span>
          )}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-sm bg-transparent text-white font-medium focus:outline-none cursor-pointer hover:text-gradient-neural transition-colors dark:text-white light:text-black"
          >
            {availableModels.map((model) => (
              <option key={model} value={model} className="bg-slate-900 text-white dark:bg-slate-900 dark:text-white light:bg-white light:text-black">
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isOpen && activeProviders.length > 1 && (
        <div className="absolute top-full mt-2 right-0 z-50 min-w-[200px] glass rounded-lg border border-cyan-500/30 shadow-xl overflow-hidden animate-fade-in">
          {activeProviders.map((provider) => (
            <button
              key={provider}
              onClick={() => handleProviderSwitch(provider)}
              className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                provider === activeProvider ? 'bg-cyan-500/20' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 bg-gradient-to-br ${providerColors[provider]} rounded-lg`}>
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{providerNames[provider]}</div>
                  <div className="text-xs text-white/60">
                    {providers[provider].models.length} model{providers[provider].models.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
