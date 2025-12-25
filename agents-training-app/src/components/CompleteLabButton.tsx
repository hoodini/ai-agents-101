import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { celebrateCompletion } from '../utils/confetti';

const TOTAL_LABS = 8;

interface CompleteLabButtonProps {
  labId: number;
}

export function CompleteLabButton({ labId }: CompleteLabButtonProps) {
  const { markLabCompleteAndAdvance, labProgress } = useStore();
  const isCompleted = labProgress[labId];

  const handleComplete = () => {
    celebrateCompletion();
    markLabCompleteAndAdvance(labId, TOTAL_LABS);
  };

  return (
    <div className="flex justify-end mt-8">
      <button
        onClick={handleComplete}
        disabled={isCompleted}
        className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover-lift shadow-2xl uppercase tracking-wide ${
          isCompleted
            ? 'bg-gradient-to-r from-green-600/50 to-cyan-600/50 cursor-not-allowed opacity-70'
            : 'bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500'
        } text-white`}
        style={isCompleted ? {} : { boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
      >
        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="hidden sm:inline">{isCompleted ? 'Lab Completed!' : 'Complete Lab & Continue'}</span>
        <span className="sm:hidden">{isCompleted ? 'Completed!' : 'Complete'}</span>
        {!isCompleted && <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>
    </div>
  );
}
