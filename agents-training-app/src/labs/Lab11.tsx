import { Network, Users } from 'lucide-react';
import { celebrateCompletion } from '../utils/confetti';
import { useStore } from '../store/useStore';

export function Lab11() {
  const { markLabComplete } = useStore();

  const handleComplete = () => {
    markLabComplete(11);
    celebrateCompletion();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in w-full">
      <div className="hero-image-container mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl">
        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <Users className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-90" />
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">Multi-Agent Orchestration</h1>
            <p className="text-sm sm:text-lg opacity-90">Teams of AI Agents Working Together</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex-shrink-0">
            <Network className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 11: Multi-Agent Orchestration
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Advanced collaboration patterns - Coming Soon!
            </p>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
            🚀 This Advanced Lab is Under Development
          </h3>
          <p className="text-indigo-800 dark:text-indigo-200 mb-4">
            Lab 11 will teach you production-grade multi-agent orchestration patterns:
          </p>
          <ul className="space-y-2 text-indigo-800 dark:text-indigo-200 text-sm">
            <li>✓ Sequential workflows (agent chains)</li>
            <li>✓ Supervisor pattern (intelligent task routing)</li>
            <li>✓ Iterative refinement (collaborative improvement)</li>
            <li>✓ Parallel execution (simultaneous work)</li>
            <li>✓ Complete orchestration (production patterns)</li>
          </ul>
          <p className="text-indigo-800 dark:text-indigo-200 mt-4 text-sm">
            This lab is being developed with interactive code examples using LangChain.js and Cohere.
            Check back soon or complete Labs 9-10 while we finalize this content!
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          💡 What You'll Learn (When Complete)
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm">
          Multi-agent systems power ChatGPT, Claude Projects, and enterprise AI.
          You'll master the patterns used by leading AI systems to coordinate multiple specialized agents!
        </p>
      </div>
      
      <button
        onClick={handleComplete}
        className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all"
      >
        Mark as Complete
      </button>
    </div>
  );
}
