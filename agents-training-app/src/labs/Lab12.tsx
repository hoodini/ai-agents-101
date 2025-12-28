import { DollarSign, Calculator } from 'lucide-react';
import { celebrateCompletion } from '../utils/confetti';
import { useStore } from '../store/useStore';

export function Lab12() {
  const { markLabComplete } = useStore();

  const handleComplete = () => {
    markLabComplete(12);
    celebrateCompletion();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in w-full">
      <div className="hero-image-container mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-2xl">
        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <DollarSign className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-90" />
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">Budget Assistant Agent</h1>
            <p className="text-sm sm:text-lg opacity-90">Complete Production Agent</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg flex-shrink-0">
            <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 12: Complete Budget Assistant
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Production-ready financial agent - Coming Soon!
            </p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
            🚀 This Advanced Lab is Under Development
          </h3>
          <p className="text-green-800 dark:text-green-200 mb-4">
            Lab 12 will build a complete production-grade budget assistant inspired by AWS Strands:
          </p>
          <ul className="space-y-2 text-green-800 dark:text-green-200 text-sm">
            <li>✓ Structured outputs with Cohere</li>
            <li>✓ Domain-specific financial system prompts</li>
            <li>✓ Custom budget calculation tools</li>
            <li>✓ Interactive budget visualization with Chart.js</li>
            <li>✓ Conversation memory for budget tracking</li>
            <li>✓ Real-world production patterns</li>
          </ul>
          <p className="text-green-800 dark:text-green-200 mt-4 text-sm">
            This lab replicates the AWS Strands budget assistant lab using browser-based LangChain.js and Cohere.
            Complete Labs 9-10 while we finalize this comprehensive capstone project!
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm sm:text-base font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Real-World Application
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm">
          This agent combines everything: RAG for financial advice, function calling for calculations,
          structured outputs for reports, and conversation memory for personalized budgeting.
          It's the culmination of all advanced agent techniques!
        </p>
      </div>
      
      <button
        onClick={handleComplete}
        className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
      >
        Mark as Complete
      </button>
    </div>
  );
}
