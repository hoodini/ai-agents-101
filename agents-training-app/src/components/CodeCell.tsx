import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, CheckCircle, XCircle } from 'lucide-react';
import type { ExecutionResult } from '../types';
import { useStore } from '../store/useStore';

interface CodeCellProps {
  id?: string;
  initialCode: string;
  language?: 'typescript' | 'javascript';
  editable?: boolean;
  description?: string;
  onExecute?: (code: string) => Promise<ExecutionResult>;
}

export function CodeCell({
  initialCode,
  language = 'typescript',
  editable = true,
  description,
  onExecute,
}: CodeCellProps) {
  const { theme } = useStore();
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const handleRun = async () => {
    if (!onExecute) return;

    setIsRunning(true);
    setResult(null);

    try {
      const output = await onExecute(code);
      setResult(output);
    } catch (error) {
      setResult({
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="border-2 border-cyan-500/30 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-xl shadow-2xl dark:from-slate-900/90 dark:to-blue-900/30 light:from-white/95 light:to-blue-50/95 dark:border-cyan-500/30 light:border-cyan-600/40">
      {description && (
        <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/30 backdrop-blur-sm dark:from-cyan-500/10 dark:to-purple-500/10 light:from-cyan-100/70 light:to-purple-100/70 dark:border-cyan-500/30 light:border-cyan-600/30">
          <p className="text-sm text-cyan-100 font-medium dark:text-cyan-100 light:text-cyan-900">{description}</p>
        </div>
      )}

      <div className="relative">
        <Editor
          height="250px"
          language={language}
          value={code}
          onChange={(value) => editable && setCode(value || '')}
          theme={theme === 'light' ? 'light' : 'vs-dark'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly: !editable,
            tabSize: 2,
          }}
        />
      </div>

      <div className="px-4 py-3 bg-gradient-to-r from-slate-900/80 to-purple-900/20 border-t border-cyan-500/30 flex items-center justify-between backdrop-blur-sm dark:from-slate-900/80 dark:to-purple-900/20 light:from-slate-50/90 light:to-purple-50/30 dark:border-cyan-500/30 light:border-cyan-600/30">
        <button
          onClick={handleRun}
          disabled={isRunning || !onExecute}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-lg font-bold transition-all hover-lift disabled:cursor-not-allowed shadow-lg uppercase tracking-wide text-sm"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Code
            </>
          )}
        </button>

        {result && (
          <div className="flex items-center gap-2">
            {result.error ? (
              <XCircle className="w-6 h-6 text-red-400 dark:text-red-400 light:text-red-600" style={{ filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.8))' }} />
            ) : (
              <CheckCircle className="w-6 h-6 text-green-400 dark:text-green-400 light:text-green-600" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }} />
            )}
          </div>
        )}
      </div>

      {result && (
        <div className="px-4 py-3 border-t border-cyan-500/30 bg-gradient-to-r from-slate-900/60 to-slate-800/60 dark:from-slate-900/60 dark:to-slate-800/60 light:from-slate-50/80 light:to-slate-100/80 dark:border-cyan-500/30 light:border-cyan-600/30">
          <div className="font-mono text-sm">
            <div className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wide dark:text-cyan-400 light:text-cyan-700">
              OUTPUT:
            </div>
            {result.error ? (
              <pre className="text-red-300 whitespace-pre-wrap p-3 rounded-lg bg-red-900/20 border border-red-500/30 dark:text-red-300 dark:bg-red-900/20 dark:border-red-500/30 light:text-red-700 light:bg-red-50 light:border-red-300">
                {result.error}
              </pre>
            ) : (
              <pre className="text-green-200 whitespace-pre-wrap p-3 rounded-lg bg-green-900/20 border border-green-500/30 dark:text-green-200 dark:bg-green-900/20 dark:border-green-500/30 light:text-green-800 light:bg-green-50 light:border-green-300">
                {result.output}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
