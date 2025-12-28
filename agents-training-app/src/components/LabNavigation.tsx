import { CheckCircle, Circle, Sparkles, BookOpen, Code, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';

interface LabNavigationProps {
  labs: { id: number; title: string; isBonus?: boolean }[];
  onLabClick?: () => void;
  onResourcesClick?: () => void;
  onTechnicalClick?: () => void;
  onAdvancedClick?: () => void;
}

export function LabNavigation({ labs, onLabClick, onResourcesClick, onTechnicalClick, onAdvancedClick }: LabNavigationProps) {
  const { currentLab, labProgress, setCurrentLab, language } = useStore();

  const getLabKey = (labId: number): string => {
    const labKeys = ['agentComponents', 'simplePrompt', 'customPrompts', 'conversationMemory', 'knowledgeBase', 'ragWikipedia', 'multiAgentCollab', 'orchestrator'];
    return labKeys[labId - 1] || 'agentComponents';
  };

  const handleLabClick = (labId: number) => {
    setCurrentLab(labId);
    // Scroll to top when switching labs
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onLabClick) {
      onLabClick();
    }
  };

  // Separate regular labs and bonus labs
  const regularLabs = labs.filter(lab => !lab.isBonus);
  const bonusLabs = labs.filter(lab => lab.isBonus);

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
            <div className="avatar-container relative w-12 h-12 flex-shrink-0">
              {/* Thick Animated RGB Ring with Neon Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-1 animate-rgb-rotate" style={{ boxShadow: '0 0 25px rgba(0, 212, 255, 0.8), 0 0 40px rgba(168, 85, 247, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.1)' }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900/30 backdrop-blur-sm">
                </div>
              </div>
              {/* Avatar Image - Even Bigger to touch and pop out */}
              <div className="absolute inset-[-15%] flex items-center justify-center">
                <img
                  src="round-avatar.png"
                  alt="AI Avatar"
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 3px 15px rgba(0, 212, 255, 0.5))' }}
                />
              </div>
            </div>
            <h2 className="text-xl md:text-xl font-bold heading-font neon-cyan tracking-wider">
              AI AGENTS 101
            </h2>
          </div>
          <p className="text-sm text-gradient-gold font-semibold tracking-wide">
            by Yuval Avidani • YUV.AI
          </p>
        </div>

        <div className="space-y-2">
          {regularLabs.map((lab) => {
            const isActive = currentLab === lab.id;
            const isCompleted = labProgress[lab.id];

            return (
              <button
                key={lab.id}
                onClick={() => handleLabClick(lab.id)}
                className={`w-full px-4 py-3 rounded-xl transition-all hover-lift relative overflow-hidden ${
                  language === 'he' ? 'text-right' : 'text-left'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400 shadow-neural'
                    : 'glass border border-white/10 hover:glass-strong hover:border-cyan-500/50'
                }`}
                style={isActive ? { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' } : {}}
              >
                <div className={`flex items-center gap-3 relative z-10 ${language === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
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
                  <div className="flex-1">
                    <div className={`text-sm font-bold ${isActive ? 'neon-cyan' : 'text-white'}`}>
                      {language === 'he' ? `מעבדה ${lab.id}` : `LAB ${lab.id}`}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-white font-medium' : 'text-white/60'}`}>
                      {t(language, `labs.${getLabKey(lab.id)}`)}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bonus Section */}
        {bonusLabs.length > 0 && (
          <div className="mt-6 pt-6 border-t border-purple-500/30">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-purple-400 tracking-wider">
                {language === 'he' ? 'תוכן בונוס' : 'BONUS CONTENT'}
              </span>
            </div>
            <div className="space-y-2">
              {bonusLabs.map((lab) => {
                const isActive = currentLab === lab.id;

                return (
                  <button
                    key={lab.id}
                    onClick={() => handleLabClick(lab.id)}
                    className={`w-full px-4 py-3 rounded-xl transition-all hover-lift relative overflow-hidden ${
                      language === 'he' ? 'text-right' : 'text-left'
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/20 border-2 border-purple-400 shadow-neural'
                        : 'bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 hover:border-purple-400/60'
                    }`}
                    style={isActive ? { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' } : {}}
                  >
                    <div className={`flex items-center gap-3 relative z-10 ${language === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Sparkles
                        className={`w-5 h-5 flex-shrink-0 ${
                          isActive ? 'text-purple-300' : 'text-purple-400'
                        }`}
                        style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' }}
                      />
                      <div className="flex-1">
                        <div className={`text-sm font-bold ${isActive ? 'text-purple-300' : 'text-purple-400'}`}>
                          {t(language, 'bonus.label')}
                        </div>
                        <div className={`text-xs ${isActive ? 'text-white font-medium' : 'text-white/60'}`}>
                          {t(language, 'bonus.navTitle')}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Additional Resources Section */}
        <div className="mt-6 pt-6 border-t border-cyan-500/30">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-400 tracking-wider">
              {language === 'he' ? 'משאבים נוספים' : 'ADDITIONAL RESOURCES'}
            </span>
          </div>
          <div className="space-y-2">
            {/* Resources */}
            {onResourcesClick && (
              <button
                onClick={onResourcesClick}
                className="w-full px-4 py-3 rounded-xl transition-all hover-lift relative overflow-hidden text-left glass border border-white/10 hover:glass-strong hover:border-cyan-500/50"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <BookOpen className="w-5 h-5 flex-shrink-0 text-cyan-400" />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-cyan-400">
                      {t(language, 'resources.title')}
                    </div>
                    <div className="text-xs text-white/60">
                      {t(language, 'resources.curatedMaterials')}
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* Technical Deep Dive */}
            {onTechnicalClick && (
              <button
                onClick={onTechnicalClick}
                className="w-full px-4 py-3 rounded-xl transition-all hover-lift relative overflow-hidden text-left glass border border-white/10 hover:glass-strong hover:border-blue-500/50"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Code className="w-5 h-5 flex-shrink-0 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-blue-400">
                      {t(language, 'technical.title')}
                    </div>
                    <div className="text-xs text-white/60">
                      {t(language, 'technical.browserAIExecution')}
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* Advanced Playground */}
            {onAdvancedClick && (
              <button
                onClick={onAdvancedClick}
                className="w-full px-4 py-3 rounded-xl transition-all hover-lift relative overflow-hidden text-left glass border border-white/10 hover:glass-strong hover:border-purple-500/50"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Zap className="w-5 h-5 flex-shrink-0 text-purple-400" />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-purple-400">
                      {t(language, 'advanced.title')}
                    </div>
                    <div className="text-xs text-white/60">
                      {t(language, 'advanced.runLLMsBrowser')}
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
