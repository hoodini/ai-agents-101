import { useState } from 'react';
import { X, Key, ExternalLink, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const { apiKey, provider, setApiKey, setAvailableModels } = useStore();
  const [selectedProvider, setSelectedProvider] = useState<'groq' | 'cohere'>(provider);
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [isValidating, setIsValidating] = useState(false);
  // If we already have an API key stored, mark it as validated so user can save immediately
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>(apiKey ? 'success' : 'idle');
  const [validationMessage, setValidationMessage] = useState(apiKey ? '✓ API key loaded from storage' : '');

  if (!isOpen) return null;

  const validateApiKey = async () => {
    if (!inputKey.trim()) return;

    setIsValidating(true);
    setValidationStatus('idle');
    setValidationMessage('');

    try {
      const defaultModel = selectedProvider === 'groq'
        ? 'llama-3.1-8b-instant'
        : 'command-a-03-2025';

      const llm = createLLM(inputKey.trim(), selectedProvider, defaultModel);

      // Test the API key with a simple call
      await llm.invoke('Hi');

      // Fetch available models based on provider
      let models: string[] = [];
      if (selectedProvider === 'groq') {
        models = [
          'llama-3.1-8b-instant',
          'llama-3.1-70b-versatile',
          'llama-3.2-1b-preview',
          'llama-3.2-3b-preview',
          'mixtral-8x7b-32768',
          'gemma2-9b-it',
        ];
      } else if (selectedProvider === 'cohere') {
        models = ['command-a-03-2025', 'command-r-plus-08-2024', 'command-r-08-2024', 'command-r7b-12-2024'];
      }

      setAvailableModels(models);
      setValidationStatus('success');
      setValidationMessage(`✓ API key validated! Found ${models.length} available models`);
    } catch (error) {
      setValidationStatus('error');
      setValidationMessage(
        error instanceof Error
          ? `✗ Validation failed: ${error.message}`
          : '✗ Invalid API key or network error'
      );
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = () => {
    if (inputKey.trim() && validationStatus === 'success') {
      // Only update if the key or provider has changed
      if (inputKey.trim() !== apiKey || selectedProvider !== provider) {
        setApiKey(inputKey.trim(), selectedProvider);
      }
      onClose();
    }
  };

  const providerInfo = {
    groq: {
      name: 'Groq',
      url: 'https://console.groq.com/keys',
      description: 'Fastest inference, great for real-time demos',
    },
    cohere: {
      name: 'Cohere',
      url: 'https://dashboard.cohere.com/api-keys',
      description: 'Excellent for RAG and embeddings',
    },
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-auto">
      <div className="relative max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto pointer-events-auto">
        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl pointer-events-none -z-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative holo-border rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/95 via-blue-900/40 to-purple-900/40 backdrop-blur-xl shadow-2xl border-2 border-cyan-500/30 pointer-events-auto">
          <div className="sticky top-0 backdrop-blur-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/30 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg shadow-lg" style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}>
                <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold heading-font neon-cyan tracking-wider">
                API CONFIG
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/10 touch-manipulation"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="border border-cyan-500/30 rounded-xl p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm">
              <p className="text-sm text-cyan-100">
                {apiKey
                  ? '✓ Your API key is securely stored in your browser. You can update it below or click "Save & Continue" to keep using the current key.'
                  : 'Your API key is stored locally in your browser and never sent to any server except the LLM provider you choose.'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wide">
                Select Provider
              </label>
              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(providerInfo) as Array<'groq' | 'cohere'>).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedProvider(p);
                      if (p !== provider || !apiKey) {
                        setValidationStatus('idle');
                        setValidationMessage('');
                      }
                    }}
                    className={`text-left p-4 rounded-xl border-2 transition-all hover-lift ${
                      selectedProvider === p
                        ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-neural'
                        : 'border-white/20 glass hover:glass-strong hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-white text-lg">
                          {providerInfo[p].name}
                        </div>
                        <div className="text-sm text-white/70 mt-1">
                          {providerInfo[p].description}
                        </div>
                      </div>
                      <a
                        href={providerInfo[p].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wide">
                API Key
              </label>
              <input
                type="password"
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setValidationStatus('idle');
                  setValidationMessage('');
                }}
                placeholder="Enter your API key"
                className="w-full px-4 py-3 glass border border-cyan-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-white/40 transition-all"
              />
              <p className="text-xs text-white/60 mt-2">
                Get your API key from{' '}
                <a
                  href={providerInfo[selectedProvider].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  {providerInfo[selectedProvider].name}
                </a>
              </p>
            </div>

            {validationMessage && (
              <div
                className={`p-4 rounded-xl border-2 ${
                  validationStatus === 'success'
                    ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-green-400/50 text-green-100'
                    : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/50 text-red-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {validationStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">{validationMessage}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
              <button
                onClick={validateApiKey}
                disabled={!inputKey.trim() || isValidating}
                className="relative z-10 flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:from-blue-700 active:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-xl font-bold transition-all hover-lift disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shadow-lg pointer-events-auto touch-manipulation text-sm sm:text-base"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden xs:inline">VALIDATING...</span>
                    <span className="xs:hidden">...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden xs:inline">VALIDATE API KEY</span>
                    <span className="xs:hidden">VALIDATE</span>
                  </>
                )}
              </button>
              <button
                onClick={handleSave}
                disabled={!inputKey.trim() || validationStatus !== 'success'}
                className="relative z-10 flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:from-purple-700 active:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-xl font-bold transition-all hover-lift disabled:cursor-not-allowed shadow-lg pointer-events-auto touch-manipulation text-sm sm:text-base"
              >
                <span className="hidden xs:inline">SAVE & CONTINUE</span>
                <span className="xs:hidden">SAVE</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 glass hover:glass-strong active:bg-white/10 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-all hover-lift touch-manipulation text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
