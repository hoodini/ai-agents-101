import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, CheckCircle, XCircle } from 'lucide-react';
import type { ExecutionResult } from '../types';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';

interface CodeCellProps {
  id?: string;
  initialCode: string;
  language?: 'typescript' | 'javascript';
  editable?: boolean;
  description?: string;
  onExecute?: (code: string) => Promise<ExecutionResult>;
}

// Detect if device is touch-enabled
const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export function CodeCell({
  initialCode,
  language = 'typescript',
  editable = true,
  description,
  onExecute,
}: CodeCellProps) {
  const { theme, language: lang } = useStore();
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isMobile, setIsMobile] = useState(false);
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
    <div className="border-2 border-cyan-500/30 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-xl shadow-2xl dark:from-slate-900/90 dark:to-blue-900/30 light:from-white/95 light:to-blue-50/95 dark:border-cyan-500/30 light:border-cyan-600/40 w-full max-w-full">
      {description && (
        <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/30 backdrop-blur-sm dark:from-cyan-500/10 dark:to-purple-500/10 light:from-cyan-100/70 light:to-purple-100/70 dark:border-cyan-500/30 light:border-cyan-600/30">
          <p className="text-xs sm:text-sm text-cyan-100 font-medium dark:text-cyan-100 light:text-cyan-900">{description}</p>
        </div>
      )}

      <div 
        ref={editorContainerRef}
        className="relative code-cell-editor w-full overflow-hidden" 
        style={{ 
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch',
          minHeight: isMobile ? '180px' : '250px',
          maxWidth: '100%'
        }}
      >
        <Editor
          height={isMobile ? "180px" : "250px"}
          language={language}
          value={code}
          onChange={(value) => editable && setCode(value || '')}
          theme={theme === 'light' ? 'light' : 'vs-dark'}
          options={{
            minimap: { enabled: false },
            fontSize: isMobile ? 11 : 14,
            lineNumbers: isMobile ? 'off' : 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly: !editable,
            tabSize: 2,
            wordWrap: 'on',
            wrappingIndent: 'indent',
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: isMobile ? 6 : 10,
              horizontalScrollbarSize: isMobile ? 6 : 10,
              useShadows: false,
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            folding: false,
            lineDecorationsWidth: isMobile ? 2 : 10,
            lineNumbersMinChars: isMobile ? 2 : 3,
            glyphMargin: false,
            renderLineHighlight: isMobile ? 'none' : 'line',
            // Touch-friendly settings - disable most intellisense on mobile
            quickSuggestions: !isMobile,
            parameterHints: { enabled: !isMobile },
            suggestOnTriggerCharacters: !isMobile,
            acceptSuggestionOnEnter: isMobile ? 'off' : 'on',
            hover: { enabled: !isMobile },
            contextmenu: !isMobile,
            // Additional mobile optimizations
            dragAndDrop: !isMobile,
            links: !isMobile,
            colorDecorators: !isMobile,
            cursorBlinking: isMobile ? 'solid' : 'blink',
            cursorSmoothCaretAnimation: isMobile ? 'off' : 'on',
            smoothScrolling: !isMobile,
            mouseWheelZoom: false,
            padding: { top: isMobile ? 8 : 12, bottom: isMobile ? 8 : 12 },
          }}
        />
      </div>

      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-slate-900/80 to-purple-900/20 border-t border-cyan-500/30 flex items-center justify-between backdrop-blur-sm dark:from-slate-900/80 dark:to-purple-900/20 light:from-slate-50/90 light:to-purple-50/30 dark:border-cyan-500/30 light:border-cyan-600/30">
        <button
          onClick={handleRun}
          disabled={isRunning || !onExecute}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-2.5 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 active:from-green-700 active:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-lg font-bold transition-all hover-lift disabled:cursor-not-allowed shadow-lg uppercase tracking-wide text-xs sm:text-sm touch-manipulation select-none"
          style={{ 
            minHeight: '44px', 
            minWidth: '100px',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t(lang, 'codeCell.running')}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>{t(lang, 'codeCell.runCode')}</span>
            </>
          )}
        </button>

        {result && (
          <div className="flex items-center gap-2">
            {result.error ? (
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 dark:text-red-400 light:text-red-600" style={{ filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.8))' }} />
            ) : (
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 dark:text-green-400 light:text-green-600" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }} />
            )}
          </div>
        )}
      </div>

      {result && (
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-cyan-500/30 bg-gradient-to-r from-slate-900/60 to-slate-800/60 dark:from-slate-900/60 dark:to-slate-800/60 light:from-slate-50/80 light:to-slate-100/80 dark:border-cyan-500/30 light:border-cyan-600/30">
          <div className="font-mono text-xs sm:text-sm">
            <div className={`text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wide dark:text-cyan-400 light:text-cyan-700 ${lang === 'he' ? 'text-right' : 'text-left'}`}>
              {t(lang, 'codeCell.output')}
            </div>
            {result.error ? (
              <pre className="text-red-300 whitespace-pre-wrap p-2 sm:p-3 rounded-lg bg-red-900/20 border border-red-500/30 dark:text-red-300 dark:bg-red-900/20 dark:border-red-500/30 light:text-red-700 light:bg-red-50 light:border-red-300 overflow-x-auto text-xs sm:text-sm break-words">
                {result.error}
              </pre>
            ) : (
              <pre className="text-green-200 whitespace-pre-wrap p-2 sm:p-3 rounded-lg bg-green-900/20 border border-green-500/30 dark:text-green-200 dark:bg-green-900/20 dark:border-green-500/30 light:text-green-800 light:bg-green-50 light:border-green-300 overflow-x-auto text-xs sm:text-sm break-words">
                {result.output}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
