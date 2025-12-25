import { User, Search, PenTool, CheckCircle, ArrowRight } from 'lucide-react';

export function MultiAgentCollaborationFlow() {
  return (
    <div className="my-8 p-8 glass border border-blue-500/30 rounded-2xl relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-xl">🤝</span>
          </div>
          Agent Collaboration Pipeline
        </h3>

        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between gap-6">
            {/* User Query */}
            <div className="flex-shrink-0">
              <div className="glass border-2 border-cyan-500/50 rounded-xl p-6 w-56 hover-lift transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-neural">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-cyan-400 font-bold mb-2">User Request</div>
                  <div className="text-white/80 text-sm italic">
                    "Write an article about AI Agents"
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="flex flex-col items-center justify-center pt-12">
              <ArrowRight className="w-8 h-8 text-cyan-400 animate-pulse" />
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2" />
            </div>

            {/* Researcher Agent */}
            <div className="flex-shrink-0">
              <div className="glass border-2 border-blue-500/50 rounded-xl p-6 w-64 hover-lift transition-all duration-300 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-neural">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-blue-400 font-bold mb-2">Researcher Agent</div>
                  <div className="text-white/70 text-xs mb-3">Gathers facts and data</div>
                  <div className="glass-strong border border-blue-500/30 rounded-lg p-3 w-full">
                    <div className="text-xs text-white/90">
                      ✓ 3 key facts found<br />
                      ✓ Sources verified<br />
                      ✓ Data structured
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="flex flex-col items-center justify-center pt-12">
              <ArrowRight className="w-8 h-8 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2" />
              <div className="text-xs text-purple-400 mt-2 font-bold">Facts →</div>
            </div>

            {/* Writer Agent */}
            <div className="flex-shrink-0">
              <div className="glass border-2 border-purple-500/50 rounded-xl p-6 w-64 hover-lift transition-all duration-300 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-neural">
                    <PenTool className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-purple-400 font-bold mb-2">Writer Agent</div>
                  <div className="text-white/70 text-xs mb-3">Creates engaging content</div>
                  <div className="glass-strong border border-purple-500/30 rounded-lg p-3 w-full">
                    <div className="text-xs text-white/90">
                      ✓ Article drafted<br />
                      ✓ Facts integrated<br />
                      ✓ Tone optimized
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow 3 */}
            <div className="flex flex-col items-center justify-center pt-12">
              <ArrowRight className="w-8 h-8 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="h-1 w-16 bg-gradient-to-r from-purple-400 to-green-400 rounded-full mt-2" />
            </div>

            {/* Final Output */}
            <div className="flex-shrink-0">
              <div className="glass border-2 border-green-500/50 rounded-xl p-6 w-56 hover-lift transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 shadow-neural">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-green-400 font-bold mb-2">Final Article</div>
                  <div className="text-white/80 text-sm">
                    Researched, written, and polished content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-4">
          {[
            { icon: User, title: 'User Request', color: 'cyan', desc: 'Write an article about AI Agents' },
            { icon: Search, title: 'Researcher Agent', color: 'blue', desc: 'Gathers 3 key facts and sources' },
            { icon: PenTool, title: 'Writer Agent', color: 'purple', desc: 'Creates engaging article from facts' },
            { icon: CheckCircle, title: 'Final Output', color: 'green', desc: 'Polished, fact-based content' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <div className={`glass border-2 border-${item.color}-500/50 rounded-xl p-4`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center shadow-neural`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-grow">
                      <div className={`text-${item.color}-400 font-bold`}>{item.title}</div>
                      <div className="text-white/70 text-sm">{item.desc}</div>
                    </div>
                  </div>
                </div>
                {index < 3 && (
                  <div className="flex justify-center py-2">
                    <div className={`w-1 h-8 bg-gradient-to-b from-${item.color}-400 to-${['cyan', 'blue', 'purple', 'green'][index + 1]}-400 rounded-full`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 glass border border-blue-500/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-blue-400 font-bold mb-1 text-sm">Specialization</div>
            <div className="text-xs text-white/70">Each agent excels at its specific task</div>
          </div>

          <div className="p-4 glass border border-purple-500/30 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-purple-400 font-bold mb-1 text-sm">Efficiency</div>
            <div className="text-xs text-white/70">Parallel processing when possible</div>
          </div>

          <div className="p-4 glass border border-green-500/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-green-400 font-bold mb-1 text-sm">Scalable</div>
            <div className="text-xs text-white/70">Add more agents as needed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
