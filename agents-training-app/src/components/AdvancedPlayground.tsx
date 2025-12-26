import { useState, useEffect, useRef } from 'react';
import { Cpu, Download, Play, Trash2, Terminal, Zap, Info, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';
import * as webllm from '@mlc-ai/web-llm';

declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

interface ModelInfo {
  id: string;
  name: string;
  size: string;
  description: string;
}

const AVAILABLE_MODELS: ModelInfo[] = [
  {
    id: 'Phi-3.5-mini-instruct-q4f16_1-MLC',
    name: 'Phi-3.5 Mini (Q4)',
    size: '~2.3GB',
    description: 'Fast and efficient, great for most tasks',
  },
  {
    id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC',
    name: 'Llama 3.2 3B (Q4)',
    size: '~1.9GB',
    description: 'Lightweight and quick, good for simple tasks',
  },
  {
    id: 'Qwen2.5-3B-Instruct-q4f16_1-MLC',
    name: 'Qwen 2.5 3B (Q4)',
    size: '~2.0GB',
    description: 'Balanced performance for coding and text',
  },
];

export function AdvancedPlayground() {
  const { language } = useStore();
  const [selectedModel, setSelectedModel] = useState<string>(AVAILABLE_MODELS[0].id);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [loadProgress, setLoadProgress] = useState('');
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [pythonCode, setPythonCode] = useState(`# Python with Browser-based LLM!
# Access the LLM via the global 'llm' object

import js

# Example: Simple LLM query
prompt = "Explain what WebAssembly is in one sentence"
print(f"Asking LLM: {prompt}")

# Call the LLM (this connects to WebLLM running in the browser!)
response = await js.callLLM(prompt)
print(f"LLM Response: {response}")

# You can also use Python libraries
import math
print(f"\\nPython calculation: sqrt(16) = {math.sqrt(16)}")`);
  const [pythonOutput, setPythonOutput] = useState('');
  const [isRunningPython, setIsRunningPython] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const engineRef = useRef<webllm.MLCEngine | null>(null);
  const pyodideRef = useRef<any>(null);

  // Load Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        // Load Pyodide from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
        script.async = true;

        script.onload = async () => {
          setPythonOutput('Loading Python environment...\n');
          const pyodide = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
          });
          pyodideRef.current = pyodide;

          // Setup LLM calling function for Python
          (window as any).callLLM = async (prompt: string) => {
            if (!engineRef.current) {
              return "Error: LLM not loaded. Please load a model first.";
            }
            try {
              const messages = [{ role: 'user' as const, content: prompt }];
              const reply = await engineRef.current.chat.completions.create({
                messages,
                temperature: 0.7,
                max_tokens: 256,
              });
              return reply.choices[0].message.content || '';
            } catch (error: any) {
              return `Error calling LLM: ${error.message}`;
            }
          };

          setPythonOutput('✓ Python environment ready!\n');
          setIsPyodideReady(true);
        };

        document.body.appendChild(script);
      } catch (error: any) {
        setPythonOutput(`Error loading Pyodide: ${error.message}\n`);
      }
    };

    loadPyodide();
  }, []);

  const loadModel = async () => {
    if (isLoadingModel || isModelLoaded) return;

    setIsLoadingModel(true);
    setLoadProgress('Initializing WebLLM engine...');

    try {
      const initProgressCallback = (progress: webllm.InitProgressReport) => {
        setLoadProgress(progress.text);
      };

      const engine = await webllm.CreateMLCEngine(selectedModel, {
        initProgressCallback,
      });

      engineRef.current = engine;
      setIsModelLoaded(true);
      setLoadProgress('✓ Model loaded successfully!');
    } catch (error: any) {
      setLoadProgress(`Error: ${error.message}`);
    } finally {
      setIsLoadingModel(false);
    }
  };

  const unloadModel = async () => {
    if (engineRef.current) {
      engineRef.current = null;
      setIsModelLoaded(false);
      setLoadProgress('');
    }
  };

  const runPythonCode = async () => {
    if (!pyodideRef.current) {
      setPythonOutput('Error: Python environment not ready\n');
      return;
    }

    setIsRunningPython(true);
    setPythonOutput('Running Python code...\n');

    try {
      // Redirect Python stdout to capture print statements
      await pyodideRef.current.runPythonAsync(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      // Run the user's code
      await pyodideRef.current.runPythonAsync(pythonCode);

      // Get the output
      const output = await pyodideRef.current.runPythonAsync('sys.stdout.getvalue()');
      setPythonOutput(output || '(no output)');
    } catch (error: any) {
      setPythonOutput(`Error:\n${error.message}`);
    } finally {
      setIsRunningPython(false);
    }
  };

  const clearOutput = () => {
    setPythonOutput('');
  };

  const selectedModelInfo = AVAILABLE_MODELS.find(m => m.id === selectedModel);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-neural">
              {t(language, 'advanced.title')}
            </h1>
            <p className="text-sm sm:text-base text-white/60 mt-1">
              {t(language, 'advanced.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      {showInfo && (
        <div className="mb-6 p-4 sm:p-6 glass rounded-xl border border-cyan-500/30">
          <div className="flex items-start gap-3 sm:gap-4">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {t(language, 'advanced.infoTitle')}
              </h3>
              <p className="text-sm sm:text-base text-white/70 mb-3">
                {t(language, 'advanced.infoText')}
              </p>
              <ul className="text-xs sm:text-sm text-white/60 space-y-1 list-disc list-inside">
                <li>{t(language, 'advanced.infoPoint1')}</li>
                <li>{t(language, 'advanced.infoPoint2')}</li>
                <li>{t(language, 'advanced.infoPoint3')}</li>
              </ul>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="text-white/40 hover:text-white/60 transition-colors"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Model Selection & Loading */}
      <div className="mb-6 p-4 sm:p-6 glass rounded-xl border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {t(language, 'advanced.modelSection')}
          </h2>
        </div>

        {/* Model Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white/80 mb-2">
            {t(language, 'advanced.selectModel')}
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={isModelLoaded || isLoadingModel}
            className="w-full px-4 py-3 glass rounded-lg border border-white/20 text-white focus:border-purple-500/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {AVAILABLE_MODELS.map((model) => (
              <option key={model.id} value={model.id} className="bg-gray-900 text-white">
                {model.name} - {model.size}
              </option>
            ))}
          </select>
          {selectedModelInfo && (
            <p className="text-xs sm:text-sm text-white/60 mt-2">
              {selectedModelInfo.description}
            </p>
          )}
        </div>

        {/* Load/Unload Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!isModelLoaded ? (
            <button
              onClick={loadModel}
              disabled={isLoadingModel}
              className="flex items-center justify-center gap-2 px-4 py-3 glass hover:glass-strong rounded-lg transition-all hover-lift border border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">
                {isLoadingModel ? t(language, 'advanced.loading') : t(language, 'advanced.loadModel')}
              </span>
            </button>
          ) : (
            <button
              onClick={unloadModel}
              className="flex items-center justify-center gap-2 px-4 py-3 glass hover:glass-strong rounded-lg transition-all hover-lift border border-red-500/30 text-red-400"
            >
              <Trash2 className="w-5 h-5" />
              <span className="font-medium">{t(language, 'advanced.unloadModel')}</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-4 py-3 glass rounded-lg border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isModelLoaded ? 'bg-green-400 shadow-neural' : 'bg-gray-500'}`} />
            <span className="text-sm text-white/70">
              {isModelLoaded ? t(language, 'advanced.modelReady') : t(language, 'advanced.modelNotLoaded')}
            </span>
          </div>
        </div>

        {/* Progress */}
        {loadProgress && (
          <div className="mt-4 p-3 glass rounded-lg border border-cyan-500/20">
            <p className="text-xs sm:text-sm text-cyan-400 font-mono">{loadProgress}</p>
          </div>
        )}
      </div>

      {/* Python Code Editor */}
      <div className="mb-6 p-4 sm:p-6 glass rounded-xl border border-cyan-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {t(language, 'advanced.pythonEditor')}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPyodideReady ? 'bg-green-400 shadow-neural' : 'bg-yellow-400'}`} />
            <span className="text-xs sm:text-sm text-white/70">
              {isPyodideReady ? 'Python Ready' : 'Loading...'}
            </span>
          </div>
        </div>

        <textarea
          value={pythonCode}
          onChange={(e) => setPythonCode(e.target.value)}
          className="w-full h-64 sm:h-80 px-4 py-3 glass rounded-lg border border-white/20 text-white font-mono text-xs sm:text-sm focus:border-cyan-500/50 focus:outline-none resize-none"
          placeholder="Write your Python code here..."
          spellCheck={false}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={runPythonCode}
            disabled={!isPyodideReady || isRunningPython}
            className="flex items-center gap-2 px-4 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            <span className="font-medium">
              {isRunningPython ? t(language, 'advanced.running') : t(language, 'advanced.runCode')}
            </span>
          </button>

          <button
            onClick={clearOutput}
            className="flex items-center gap-2 px-4 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/20"
          >
            <Trash2 className="w-4 h-4" />
            <span className="font-medium">{t(language, 'advanced.clearOutput')}</span>
          </button>
        </div>
      </div>

      {/* Output */}
      {pythonOutput && (
        <div className="p-4 sm:p-6 glass rounded-xl border border-purple-500/30">
          <div className="flex items-center gap-3 mb-3">
            <Terminal className="w-5 h-5 text-purple-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              {t(language, 'advanced.output')}
            </h3>
          </div>
          <pre className="text-xs sm:text-sm font-mono text-green-400 whitespace-pre-wrap break-words">
            {pythonOutput}
          </pre>
        </div>
      )}
    </div>
  );
}
