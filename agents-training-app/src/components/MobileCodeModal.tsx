import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Play, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';
import type { ExecutionResult } from '../types';

interface MobileCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode: string;
  onExecute?: (code: string) => Promise<ExecutionResult>;
  onCodeChange?: (code: string) => void;
  language?: 'typescript' | 'javascript';
  editable?: boolean;
}

export function MobileCodeModal({
  isOpen,
  onClose,
  initialCode,
  onExecute,
  onCodeChange,
  editable = true,
}: MobileCodeModalProps) {
  const { language: lang } = useStore();
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCode(initialCode);
      setResult(null);
    }
  }, [isOpen, initialCode]);

  // Sync code changes back to parent
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{
        backgroundColor: 'rgb(15 23 42 / 0.98)',
        touchAction: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
      onClick={(e) => {
        // Only close if clicking the backdrop, not the modal content
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Header - Fixed */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-cyan-500/30 bg-gradient-to-r from-slate-900 to-blue-900/50"
        style={{ minHeight: '60px' }}
      >
        <h2 className="text-lg font-bold text-cyan-400">
          {t(lang, 'codeCell.editCode') || 'Edit Code'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white active:text-cyan-400 transition-colors touch-manipulation"
          style={{ minHeight: '44px', minWidth: '44px', WebkitTapHighlightColor: 'transparent' }}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Code Editor - Scrollable */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          minHeight: 0, // Important for flex scrolling
        }}
      >
        <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <textarea
            value={code}
            onChange={(e) => editable && handleCodeChange(e.target.value)}
            readOnly={!editable}
            className="w-full h-full min-h-[300px] px-4 py-3 bg-slate-950 text-green-300 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border-0"
            style={{
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>

        {/* Result Output - Collapsible */}
        {result && (
          <div
            className="flex-shrink-0 border-t border-cyan-500/30 bg-slate-900/90 overflow-y-auto"
            style={{
              maxHeight: '40vh',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {result.error ? (
                  <>
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-sm font-bold text-red-400">
                      {t(lang, 'codeCell.error')}
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm font-bold text-green-400">
                      {t(lang, 'codeCell.success')}
                    </span>
                  </>
                )}
              </div>
              <pre className={`font-mono text-xs whitespace-pre-wrap break-words p-3 rounded-lg border ${
                result.error
                  ? 'text-red-300 bg-red-900/20 border-red-500/30'
                  : 'text-green-200 bg-green-900/20 border-green-500/30'
              }`}>
                {result.error || result.output}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons - Fixed at Bottom */}
      <div
        className="flex-shrink-0 p-4 border-t border-cyan-500/30 bg-gradient-to-r from-slate-900 to-blue-900/50 flex gap-3"
        style={{
          minHeight: '80px',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))', // Handle iOS safe area
        }}
      >
        <button
          onClick={handleRun}
          disabled={isRunning || !onExecute}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 active:from-green-700 active:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-lg font-bold transition-all disabled:cursor-not-allowed shadow-lg uppercase tracking-wide text-sm touch-manipulation select-none"
          style={{ minHeight: '52px', WebkitTapHighlightColor: 'transparent' }}
        >
          {isRunning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t(lang, 'codeCell.running')}</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>{t(lang, 'codeCell.runCode')}</span>
            </>
          )}
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white rounded-lg font-bold transition-all shadow-lg uppercase tracking-wide text-sm touch-manipulation select-none"
          style={{ minHeight: '52px', WebkitTapHighlightColor: 'transparent' }}
        >
          {t(lang, 'codeCell.close') || 'Close'}
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
