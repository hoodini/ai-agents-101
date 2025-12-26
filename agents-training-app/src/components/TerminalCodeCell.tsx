import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Terminal, Check, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';
import type { ExecutionResult } from '../types';

// Detect if device is touch-enabled
const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

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
  const { language: lang } = useStore();
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || isTouchDevice());
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <div className="group relative animate-fade-in" dir="ltr">
      {/* Luxury Terminal Window */}
      <div className="relative rounded-2xl overflow-hidden glass-strong shadow-neural border-2 border-white/10 transition-all duration-300 hover:border-white/20 hover-lift">
        {/* Premium Terminal Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 glass border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xs:flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all cursor-pointer"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 transition-all cursor-pointer"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 hover:shadow-lg hover:shadow-green-500/50 transition-all cursor-pointer"></div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/60">
              <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-gradient-neural" />
              <span className="text-xs sm:text-sm font-mono text-white/80 truncate max-w-[100px] sm:max-w-none">{title || 'code-editor'}</span>
            </div>
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning || !onExecute}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 active:from-emerald-700 active:via-green-700 active:to-teal-800 disabled:from-slate-700 disabled:to-slate-800 text-white text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-luxury disabled:cursor-not-allowed hover-lift disabled:opacity-50 relative overflow-hidden group/btn touch-manipulation ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            {isRunning ? (
              <>
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin relative z-10" />
                <span className="font-mono relative z-10 hidden xs:inline">{t(lang, 'codeCell.running')}</span>
                <span className="font-mono relative z-10 xs:hidden">...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 sm:w-4 sm:h-4 relative z-10" />
                <span className="font-mono relative z-10">{t(lang, 'codeCell.runCode')}</span>
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
        <div className="relative code-cell-editor" style={{ touchAction: 'pan-y' }}>
          <Editor
            height={isMobile ? "250px" : "350px"}
            language={language}
            value={code}
            onChange={(value) => editable && setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: isMobile ? 12 : 15,
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
              lineNumbers: isMobile ? 'off' : 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              readOnly: !editable,
              tabSize: 2,
              padding: { top: isMobile ? 8 : 16, bottom: isMobile ? 8 : 16 },
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              wordWrap: 'on',
              wrappingIndent: 'indent',
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                verticalScrollbarSize: isMobile ? 8 : 12,
                horizontalScrollbarSize: isMobile ? 8 : 12,
              },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              overviewRulerBorder: false,
              folding: !isMobile,
              lineDecorationsWidth: isMobile ? 4 : 10,
              lineNumbersMinChars: isMobile ? 2 : 3,
              glyphMargin: false,
              renderLineHighlight: isMobile ? 'none' : 'line',
              // Touch-friendly settings
              quickSuggestions: !isMobile,
              parameterHints: { enabled: !isMobile },
              suggestOnTriggerCharacters: !isMobile,
              acceptSuggestionOnEnter: isMobile ? 'off' : 'on',
              hover: { enabled: !isMobile },
              contextmenu: !isMobile,
            }}
          />
        </div>

        {/* Premium Terminal Output */}
        {result && (
          <div
            className={`border-t border-white/10 glass backdrop-blur-xl transition-all duration-300 ${
              isExpanded ? 'max-h-[400px] sm:max-h-[600px]' : 'max-h-0'
            } overflow-hidden`}
          >
            <div className="p-3 sm:p-5 overflow-y-auto max-h-[350px] sm:max-h-[550px]">
              <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-white/10">
                {result.error ? (
                  <>
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    <span className="text-sm sm:text-base font-mono font-bold text-red-400">{t(lang, 'codeCell.error')}</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    <span className="text-sm sm:text-base font-mono font-bold text-gradient-neural">{t(lang, 'codeCell.success')}</span>
                  </>
                )}
              </div>

              <div className="font-mono text-xs sm:text-base space-y-1.5 sm:space-y-2 leading-relaxed overflow-x-auto">
                {terminalOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={`animate-fade-in whitespace-pre-wrap break-words ${
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
              className="w-full py-2 sm:py-2.5 text-xs sm:text-sm text-white/60 hover:text-white/90 active:text-white glass border-t border-white/10 transition-all font-mono font-semibold touch-manipulation"
            >
              {isExpanded
                ? `${lang === 'he' ? '' : '▼ '}${t(lang, 'codeCell.collapseOutput')}${lang === 'he' ? ' ▼' : ''}`
                : `${lang === 'he' ? '' : '▲ '}${t(lang, 'codeCell.expandOutput')}${lang === 'he' ? ' ▲' : ''}`
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
