import { Network, Brain, Code, Briefcase, Info, ArrowDown } from 'lucide-react';

export function OrchestratorFlowDiagram() {
  const specialists = [
    {
      icon: Code,
      title: 'Technical Agent',
      color: 'cyan',
      expertise: 'Code examples & implementation',
    },
    {
      icon: Briefcase,
      title: 'Business Agent',
      color: 'purple',
      expertise: 'ROI & strategy',
    },
    {
      icon: Info,
      title: 'General Agent',
      color: 'pink',
      expertise: 'Overview & concepts',
    },
  ];

  return (
    <div className="my-8 p-8 glass border border-amber-500/30 rounded-2xl relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <span className="text-white text-xl">🎯</span>
          </div>
          Intelligent Orchestrator Routing
        </h3>

        {/* User Query Input */}
        <div className="flex justify-center mb-8">
          <div className="glass border-2 border-blue-500/50 rounded-xl p-6 w-full max-w-md hover-lift transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-neural flex-shrink-0">
                <span className="text-white text-2xl">❓</span>
              </div>
              <div className="flex-grow">
                <div className="text-blue-400 font-bold mb-1">User Query</div>
                <div className="text-white/90 text-sm italic">
                  "How do I implement an AI agent with memory?"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-8 h-8 text-amber-400 animate-bounce" />
            <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-amber-400 rounded-full" />
          </div>
        </div>

        {/* Orchestrator */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="glass border-2 border-amber-500/50 rounded-2xl p-8 w-80 hover-lift transition-all duration-300 relative overflow-hidden">
              {/* Animated thinking particles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-amber-400 animate-ping"
                    style={{
                      animationDelay: `${i * 0.3}s`,
                      transform: `rotate(${i * 60}deg) translateX(60px)`,
                      opacity: 0.4,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-neural animate-pulse-glow">
                    <Network className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-amber-400 font-bold text-xl mb-2">Orchestrator Agent</div>
                  <div className="text-white/70 text-sm mb-4">Intelligent Router</div>

                  {/* Decision Process */}
                  <div className="glass-strong border border-amber-500/30 rounded-lg p-4 w-full">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-amber-400" />
                      <div className="text-amber-400 font-bold text-sm">Analyzing Query...</div>
                    </div>
                    <div className="space-y-2 text-xs text-white/80">
                      <div className="flex items-center justify-between">
                        <span>Contains "implement"</span>
                        <span className="text-cyan-400">✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Technical keywords</span>
                        <span className="text-cyan-400">✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Asking "how"</span>
                        <span className="text-cyan-400">✓</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-cyan-400 font-bold text-sm">→ Route to: Technical Agent</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Routing Paths */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-4">
            {[
              { color: 'cyan', width: '60%', label: 'Primary' },
              { color: 'purple', width: '20%', label: '' },
              { color: 'pink', width: '10%', label: '' },
            ].map((path, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-1 h-16 bg-gradient-to-b from-amber-400 to-${path.color}-400 rounded-full`} style={{ opacity: path.width === '60%' ? 1 : 0.3 }} />
                {path.label && (
                  <div className={`text-${path.color}-400 text-xs mt-2 font-bold`}>{path.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Specialist Agents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {specialists.map((specialist, index) => {
            const Icon = specialist.icon;
            const isSelected = index === 0; // Technical agent selected
            return (
              <div
                key={index}
                className={`glass border-2 ${
                  isSelected
                    ? `border-${specialist.color}-500/70 shadow-neural`
                    : `border-${specialist.color}-500/30 opacity-50`
                } rounded-xl p-6 transition-all duration-300 ${isSelected ? 'scale-105' : ''}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${specialist.color}-500 to-${specialist.color}-600 flex items-center justify-center mb-4 shadow-lg ${isSelected ? 'animate-pulse-glow' : ''}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-${specialist.color}-400 font-bold mb-2`}>{specialist.title}</div>
                  <div className="text-white/70 text-xs mb-3">{specialist.expertise}</div>
                  {isSelected && (
                    <div className="glass-strong border border-cyan-500/50 rounded-lg p-3 w-full animate-fade-in">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <div className="text-cyan-400 text-xs font-bold">Active</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Response */}
        <div className="flex justify-center">
          <div className="glass border-2 border-green-500/50 rounded-xl p-6 w-full max-w-md hover-lift transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-neural flex-shrink-0">
                <span className="text-white text-2xl">✓</span>
              </div>
              <div className="flex-grow">
                <div className="text-green-400 font-bold mb-1">Specialist Response</div>
                <div className="text-white/90 text-sm">
                  Technical implementation with code examples provided by Technical Agent
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 glass-strong border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-white text-lg">💡</span>
            </div>
            <div className="text-sm text-white/90">
              <div className="font-bold text-amber-400 mb-1">How Orchestration Works</div>
              <div>The orchestrator analyzes user intent using keywords, context, and query structure. It then routes to the most appropriate specialist agent, ensuring users get expert-level responses tailored to their needs. This scales better than a single generalist agent.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
