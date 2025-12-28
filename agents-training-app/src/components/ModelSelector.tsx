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

  const currentProvider = providers[activeProvider];
  const hasMultipleModels = currentProvider.models.length > 1;
  const canOpenDropdown = activeProviders.length > 1 || hasMultipleModels;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => canOpenDropdown && setIsOpen(!isOpen)}
        className={`flex items-center gap-2 glass rounded-lg px-3 py-2 border border-white/10 transition-all dark:border-white/10 light:border-black/15 ${
          canOpenDropdown ? 'hover:border-white/20 cursor-pointer' : 'cursor-default'
        }`}
      >
        <div className={`p-1.5 bg-gradient-to-br ${providerColor} rounded-lg`}>
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1">
            <span className="text-xs text-white/50 uppercase tracking-wide dark:text-white/50 light:text-black/60">
              {providerNames[activeProvider]}
            </span>
            {canOpenDropdown && (
              <ChevronDown className="w-3 h-3 text-white/50" />
            )}
          </div>
          <span className="text-sm text-white font-medium dark:text-white light:text-black">
            {selectedModel}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 min-w-[240px] glass rounded-lg border border-cyan-500/30 shadow-xl overflow-hidden animate-fade-in">
          {activeProviders.map((provider) => (
            <div key={provider} className="border-b border-white/10 last:border-b-0">
              <div className="px-4 py-2 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 bg-gradient-to-br ${providerColors[provider]} rounded-lg`}>
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">
                    {providerNames[provider]}
                  </span>
                </div>
              </div>
              <div className="py-1">
                {providers[provider].models.map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      if (provider !== activeProvider) {
                        setActiveProvider(provider);
                      }
                      setSelectedModel(model);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${
                      provider === activeProvider && model === selectedModel
                        ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                        : 'text-white/70'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
