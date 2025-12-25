import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Terminal, Check, AlertCircle } from 'lucide-react';
import type { ExecutionResult } from '../types';

interface TerminalCodeCellProps {
  id?: string;
  title?: string;
  initialCode: string;
  language?: 'typescript' | 'javascript';
  editable?: boolean;
  description?: string;
  onExecute?: (code: string) => Promise<ExecutionResult>;
  autoRun?: boolean;
}

export function TerminalCodeCell({
  title,
  initialCode,
  language = 'typescript',
  editable = true,
  description,
  onExecute,
  autoRun = false,
}: TerminalCodeCellProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (autoRun && onExecute && !result) {
      handleRun();
    }
  }, [autoRun]);

  const handleRun = async () => {
    if (!onExecute) return;

    setIsRunning(true);
    setResult(null);
    setTerminalOutput([]);

    try {
      const output = await onExecute(code);
      setResult(output);

      if (output.error) {
        setTerminalOutput([output.error]);
      } else {
        setTerminalOutput([output.output]);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setResult({
        output: '',
        error: errorMsg,
        timestamp: Date.now(),
      });
      setTerminalOutput([errorMsg]);
    } finally {
      setIsRunning(false);
      setIsExpanded(true);
    }
  };

  return (
    <div className="group relative animate-fade-in">
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
              <span className="text-sm font-mono text-white/80">{title || 'code-editor'}</span>
            </div>
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning || !onExecute}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 disabled:from-slate-700 disabled:to-slate-800 text-white text-sm font-bold rounded-lg transition-all duration-200 shadow-luxury disabled:cursor-not-allowed hover-lift disabled:opacity-50 relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                <span className="font-mono relative z-10">Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 relative z-10" />
                <span className="font-mono relative z-10">Run Code</span>
              </>
            )}
          </button>
        </div>

        {description && (
          <div className="px-4 py-3 glass border-b border-white/10">
            <p className="text-sm text-cyan-300 font-mono">// {description}</p>
          </div>
        )}

        {/* Code Editor */}
        <div className="relative">
          <Editor
            height="350px"
            language={language}
            value={code}
            onChange={(value) => editable && setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              readOnly: !editable,
              tabSize: 2,
              padding: { top: 16, bottom: 16 },
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              wordWrap: 'on',
              wrappingIndent: 'indent',
            }}
          />
        </div>

        {/* Premium Terminal Output */}
        {result && (
          <div
            className={`border-t border-white/10 glass backdrop-blur-xl transition-all duration-300 ${
              isExpanded ? 'max-h-[600px]' : 'max-h-0'
            } overflow-hidden`}
          >
            <div className="p-5 overflow-y-auto max-h-[550px]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                {result.error ? (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-base font-mono font-bold text-red-400">Error</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-base font-mono font-bold text-gradient-neural">Success</span>
                  </>
                )}
              </div>

              <div className="font-mono text-base space-y-2 leading-relaxed">
                {terminalOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={`animate-fade-in ${
                      result?.error ? 'text-red-300' : 'text-emerald-300'
                    }`}
                    style={{
                      animationDelay: `${idx * 30}ms`,
                    }}
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-2.5 text-sm text-white/60 hover:text-white/90 glass border-t border-white/10 transition-all font-mono font-semibold"
            >
              {isExpanded ? '▼ Collapse Output' : '▲ Expand Output'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
