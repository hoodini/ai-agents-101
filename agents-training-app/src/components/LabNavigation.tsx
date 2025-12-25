import { CheckCircle, Circle } from 'lucide-react';
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
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-0.5" style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.7), 0 0 35px rgba(168, 85, 247, 0.5)' }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-cyan-400/15 via-purple-500/15 to-pink-500/15" style={{ boxShadow: 'inset 0 0 20px rgba(0, 212, 255, 0.2), inset 0 0 15px rgba(168, 85, 247, 0.3)' }}>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="round-avatar.png"
                  alt="AI Avatar"
                  className="w-full h-full object-contain scale-110"
                  style={{ filter: 'drop-shadow(0 2px 10px rgba(0, 212, 255, 0.4))' }}
                />
              </div>
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
