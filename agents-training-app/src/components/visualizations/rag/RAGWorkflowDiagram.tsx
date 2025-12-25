import { FileText, Sparkles, Database, Search, Zap, ArrowRight } from 'lucide-react';

export function RAGWorkflowDiagram() {
  const steps = [
    {
      icon: FileText,
      title: 'Chunk',
      description: 'Split documents',
      color: 'cyan',
    },
    {
      icon: Sparkles,
      title: 'Embed',
      description: 'Create vectors',
      color: 'purple',
    },
    {
      icon: Database,
      title: 'Store',
      description: 'Vector database',
      color: 'pink',
    },
    {
      icon: Search,
      title: 'Search',
      description: 'Find similar',
      color: 'orange',
    },
    {
      icon: Zap,
      title: 'Generate',
      description: 'LLM response',
      color: 'green',
    },
  ];

  return (
    <div className="my-8 p-8 glass border border-cyan-500/30 rounded-2xl relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xl">🔄</span>
          </div>
          Complete RAG Pipeline
        </h3>

        {/* Desktop Flow */}
        <div className="hidden lg:flex items-center justify-between gap-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                {/* Hexagon Step */}
                <div className="relative group">
                  <div
                    className={`w-32 h-32 hexagon bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex flex-col items-center justify-center transition-all duration-300 hover-lift cursor-pointer shadow-neural`}
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                    }}
                  >
                    <Icon className="w-8 h-8 text-white mb-2" />
                    <div className="text-white font-bold text-sm">{step.title}</div>
                    <div className="text-white/80 text-xs">{step.description}</div>
                  </div>

                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 hexagon bg-${step.color}-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                    }}
                  />
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex flex-col items-center">
                    <ArrowRight className={`w-6 h-6 text-${step.color}-400 animate-pulse`} />
                    <div className={`h-1 w-12 bg-gradient-to-r from-${step.color}-400 to-${steps[index + 1].color}-400 rounded-full mt-2`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index}>
                <div className={`glass border-2 border-${step.color}-500/50 rounded-xl p-4 hover-lift transition-all duration-300`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center shadow-neural`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-grow">
                      <div className={`text-${step.color}-400 font-bold text-lg`}>{step.title}</div>
                      <div className="text-white/70 text-sm">{step.description}</div>
                    </div>
                    <div className={`text-${step.color}-400 text-2xl font-bold`}>{index + 1}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className={`w-1 h-8 bg-gradient-to-b from-${step.color}-400 to-${steps[index + 1].color}-400 rounded-full`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* User Query & Response Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-6 glass-strong border-2 border-blue-500/50 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <span className="text-white text-lg">❓</span>
                </div>
                <div className="text-blue-400 font-bold">User Query</div>
              </div>
              <div className="text-white/90 text-sm italic">
                "What is RAG and how does it work?"
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-blue-400">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Enters at Step 4 (Search)
              </div>
            </div>
          </div>

          <div className="p-6 glass-strong border-2 border-green-500/50 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div className="text-green-400 font-bold">Final Answer</div>
              </div>
              <div className="text-white/90 text-sm italic">
                "RAG combines retrieval with generation..."
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Generated from retrieved context
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 glass border border-purple-500/30 rounded-lg text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-purple-400 font-bold mb-1 text-sm">Accurate</div>
            <div className="text-xs text-white/70">Grounds responses in your data</div>
          </div>

          <div className="p-4 glass border border-cyan-500/30 rounded-lg text-center">
            <div className="text-3xl mb-2">🔄</div>
            <div className="text-cyan-400 font-bold mb-1 text-sm">Up-to-date</div>
            <div className="text-xs text-white/70">No retraining needed</div>
          </div>

          <div className="p-4 glass border border-pink-500/30 rounded-lg text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-pink-400 font-bold mb-1 text-sm">Private</div>
            <div className="text-xs text-white/70">Your data stays secure</div>
          </div>
        </div>
      </div>
    </div>
  );
}
