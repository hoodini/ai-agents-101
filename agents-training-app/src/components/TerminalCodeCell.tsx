import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Terminal, Check, AlertCircle, Code } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';
import type { ExecutionResult } from '../types';
import { MobileCodeModal } from './MobileCodeModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || isTouchDevice());
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle touch events to prevent page scroll while editing
  useEffect(() => {
    const container = editorContainerRef.current;
    if (!container || !isMobile) return;

    let startY = 0;
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = Math.abs(e.touches[0].clientY - startY);
      const deltaX = Math.abs(e.touches[0].clientX - startX);
      
      // If horizontal scroll is dominant, let Monaco handle it
      if (deltaX > deltaY) {
        e.stopPropagation();
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile]);

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
    <>
      <MobileCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCode={code}
        onExecute={onExecute}
        language={language}
        editable={editable}
      />

      <div className="group relative animate-fade-in w-full max-w-full" dir="ltr">
        {/* Luxury Terminal Window */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden glass-strong shadow-neural border-2 border-white/10 transition-all duration-300 hover:border-white/20 hover-lift w-full max-w-full">
          {/* Premium Terminal Header */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 glass border-b border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="hidden sm:flex gap-1.5 sm:gap-2 flex-shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all cursor-pointer"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 transition-all cursor-pointer"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 hover:shadow-lg hover:shadow-green-500/50 transition-all cursor-pointer"></div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/60 min-w-0">
                <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-gradient-neural flex-shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-white/80 truncate">{title || 'code-editor'}</span>
              </div>
            </div>

            <button
            onClick={isMobile ? () => setIsModalOpen(true) : handleRun}
            disabled={isRunning || !onExecute}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 active:from-emerald-700 active:via-green-700 active:to-teal-800 disabled:from-slate-700 disabled:to-slate-800 text-white text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-luxury disabled:cursor-not-allowed hover-lift disabled:opacity-50 relative overflow-hidden group/btn touch-manipulation select-none flex-shrink-0 ${lang === 'he' ? 'flex-row-reverse' : 'flex-row'}`}
            style={{
              minHeight: '44px',
              minWidth: '90px',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                <span className="font-mono relative z-10">{t(lang, 'codeCell.running')}</span>
              </>
            ) : (
              <>
                {isMobile ? <Code className="w-4 h-4 relative z-10" /> : <Play className="w-4 h-4 relative z-10" />}
                <span className="font-mono relative z-10">{isMobile ? (t(lang, 'codeCell.tryCode') || 'Try Code') : t(lang, 'codeCell.runCode')}</span>
              </>
            )}
            </button>
          </div>

          {description && (
            <div className="px-3 sm:px-4 py-2 sm:py-3 glass border-b border-white/10">
              <p className="text-xs sm:text-sm text-cyan-300 font-mono">// {description}</p>
            </div>
          )}

          {/* Code Editor */}
          {isMobile ? (
            <div className="relative w-full bg-slate-950">
              <pre className="px-4 py-3 text-green-300 font-mono text-xs leading-relaxed overflow-x-auto">
                <code>{code}</code>
              </pre>
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute top-2 right-2 p-2 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white rounded-lg shadow-lg transition-all touch-manipulation"
                style={{ minHeight: '40px', minWidth: '40px', WebkitTapHighlightColor: 'transparent' }}
              >
                <Code className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div
              ref={editorContainerRef}
              className="relative code-cell-editor w-full overflow-hidden"
              style={{
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'touch',
                minHeight: '350px',
                maxWidth: '100%'
              }}
            >
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
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto',
                    verticalScrollbarSize: 12,
                    horizontalScrollbarSize: 12,
                    useShadows: false,
                  },
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: true,
                  overviewRulerBorder: false,
                  folding: false,
                  lineDecorationsWidth: 10,
                  lineNumbersMinChars: 3,
                  glyphMargin: false,
                  renderLineHighlight: 'line',
                  quickSuggestions: true,
                  parameterHints: { enabled: true },
                  suggestOnTriggerCharacters: true,
                  acceptSuggestionOnEnter: 'on',
                  hover: { enabled: true },
                  contextmenu: true,
                  dragAndDrop: true,
                  links: true,
                  colorDecorators: true,
                  mouseWheelZoom: false,
                }}
              />
            </div>
          )}

          {/* Premium Terminal Output - Desktop Only */}
          {!isMobile && result && (
            <div
              className={`border-t border-white/10 glass backdrop-blur-xl transition-all duration-300 ${
                isExpanded ? 'max-h-[300px] sm:max-h-[600px]' : 'max-h-0'
              } overflow-hidden`}
            >
              <div className="p-3 sm:p-5 overflow-y-auto max-h-[250px] sm:max-h-[550px]">
                <div className="flex items-center gap-2 mb-2 sm:mb-4 pb-2 sm:pb-3 border-b border-white/10">
                  {result.error ? (
                    <>
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-mono font-bold text-red-400">{t(lang, 'codeCell.error')}</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-mono font-bold text-gradient-neural">{t(lang, 'codeCell.success')}</span>
                    </>
                  )}
                </div>

                <div className="font-mono text-xs sm:text-base space-y-1 sm:space-y-2 leading-relaxed overflow-x-auto">
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
                className="w-full py-2.5 sm:py-2.5 text-xs sm:text-sm text-white/60 hover:text-white/90 active:text-white glass border-t border-white/10 transition-all font-mono font-semibold touch-manipulation select-none"
                style={{
                  minHeight: '44px',
                  WebkitTapHighlightColor: 'transparent'
                }}
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
    </>
  );
}
