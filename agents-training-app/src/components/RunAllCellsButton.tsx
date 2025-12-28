import { PlayCircle, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';

interface RunAllCellsButtonProps {
  onRunAll: () => Promise<void>;
  isRunning: boolean;
}

export function RunAllCellsButton({ onRunAll, isRunning }: RunAllCellsButtonProps) {
  const { language } = useStore();

  return (
    <div className="sticky top-20 z-30 mb-6 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <PlayCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 text-sm sm:text-base">
                {language === 'he' ? 'הרץ את כל התאים' : 'Run All Cells'}
              </h3>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                {language === 'he'
                  ? 'הרץ את כל תאי הקוד בסדר מלמעלה למטה'
                  : 'Execute all code cells from top to bottom'}
              </p>
            </div>
          </div>
          <button
            onClick={onRunAll}
            disabled={isRunning}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-600 hover:from-purple-600 hover:via-pink-600 hover:to-red-700 active:from-purple-700 active:via-pink-700 active:to-red-800 disabled:from-slate-700 disabled:to-slate-800 text-white text-sm font-bold rounded-lg transition-all duration-200 shadow-luxury disabled:cursor-not-allowed hover-lift disabled:opacity-50 relative overflow-hidden group touch-manipulation select-none ${language === 'he' ? 'flex-row-reverse' : 'flex-row'}`}
            style={{
              minHeight: '48px',
              minWidth: '140px',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                <span className="font-mono relative z-10">{language === 'he' ? 'מריץ...' : 'Running...'}</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5 relative z-10" />
                <span className="font-mono relative z-10">{language === 'he' ? 'הרץ הכל' : 'Run All'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
