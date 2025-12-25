import { CheckCircle, Circle, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

interface LabNavigationProps {
  labs: { id: number; title: string }[];
}

export function LabNavigation({ labs }: LabNavigationProps) {
  const { currentLab, labProgress, setCurrentLab } = useStore();

  return (
    <nav className="relative h-full overflow-y-auto bg-gradient-to-b from-slate-900/95 via-blue-900/30 to-purple-900/30 backdrop-blur-xl border-r border-cyan-500/20">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative p-6">
        <div className="mb-6 pb-6 border-b border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg" style={{ boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold heading-font neon-cyan tracking-wider">
              AI AGENTS 101
            </h2>
          </div>
          <p className="text-sm text-gradient-gold font-semibold tracking-wide">
            by Yuval Avidani • YUV.AI
          </p>
        </div>

        <div className="space-y-2">
          {labs.map((lab) => {
            const isActive = currentLab === lab.id;
            const isCompleted = labProgress[lab.id];

            return (
              <button
                key={lab.id}
                onClick={() => setCurrentLab(lab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all hover-lift relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400 shadow-neural'
                    : 'glass border border-white/10 hover:glass-strong hover:border-cyan-500/50'
                }`}
                style={isActive ? { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' } : {}}
              >
                <div className="flex items-center gap-3 relative z-10">
                  {isCompleted ? (
                    <CheckCircle
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? 'text-green-400' : 'text-green-500'
                      }`}
                      style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }}
                    />
                  ) : (
                    <Circle
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? 'text-cyan-400' : 'text-white/40'
                      }`}
                    />
                  )}
                  <div>
                    <div className={`text-sm font-bold ${isActive ? 'neon-cyan' : 'text-white'}`}>
                      LAB {lab.id}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-white font-medium' : 'text-white/60'}`}>
                      {lab.title}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
