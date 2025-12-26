import { useState, useEffect, useRef } from 'react';
import { Cpu, Download, Play, Trash2, Terminal, Zap, Info, ChevronUp, Loader2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
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
      {/* Hero Image */}
      <div className="hero-image-container mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
        <img
          src="/browser-llm.jpg"
          alt="Browser-Based AI Playground - Run LLMs in Your Browser"
          className="w-full h-auto object-cover"
        />
      </div>

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
      <div className="mb-6 relative animate-fade-in">
        {/* Luxury Terminal Window */}
        <div className="relative rounded-2xl overflow-hidden glass-strong shadow-neural border-2 border-white/10 transition-all duration-300 hover:border-white/20 hover-lift">
          {/* Premium Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 glass border-b border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 transition-all cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 hover:shadow-lg hover:shadow-green-500/50 transition-all cursor-pointer"></div>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Terminal className="w-4 h-4 text-gradient-neural" />
                <span className="text-sm font-mono text-white/80">{t(language, 'advanced.pythonEditor')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPyodideReady ? 'bg-green-400 shadow-neural' : 'bg-yellow-400'}`} />
                <span className="text-xs text-white/70">
                  {isPyodideReady ? 'Python Ready' : 'Loading...'}
                </span>
              </div>

              <button
                onClick={runPythonCode}
                disabled={!isPyodideReady || isRunningPython}
                className={`inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 disabled:from-slate-700 disabled:to-slate-800 text-white text-sm font-bold rounded-lg transition-all duration-200 shadow-luxury disabled:cursor-not-allowed hover-lift disabled:opacity-50 relative overflow-hidden group/btn`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                {isRunningPython ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                    <span className="font-mono relative z-10">{t(language, 'advanced.running')}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 relative z-10" />
                    <span className="font-mono relative z-10">{t(language, 'advanced.runCode')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="h-[400px] relative bg-[#1e1e1e]">
            <Editor
              value={pythonCode}
              onChange={(value) => setPythonCode(value || '')}
              language="python"
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 4,
                insertSpaces: true,
                renderWhitespace: 'selection',
                fontFamily: 'Fira Code, Monaco, Consolas, monospace',
              }}
            />
          </div>

          {/* Action Buttons Footer */}
          <div className="flex gap-3 px-4 py-3 glass border-t border-white/10">
            <button
              onClick={clearOutput}
              className="flex items-center gap-2 px-4 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/20"
            >
              <Trash2 className="w-4 h-4" />
              <span className="font-medium">{t(language, 'advanced.clearOutput')}</span>
            </button>
          </div>
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
