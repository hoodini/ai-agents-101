import { useState, useEffect } from 'react';
import { Settings, Menu, X, ChevronDown } from 'lucide-react';
import { Github } from 'lucide-react';
import { LabNavigation } from './components/LabNavigation';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ModelSelector } from './components/ModelSelector';
import { LanguageToggle } from './components/LanguageToggle';
import { Homepage } from './components/Homepage';
import { Lab1, Lab2, Lab3, Lab4, Lab5, Lab6, Lab7, Lab8 } from './labs';
import { useStore } from './store/useStore';
import { t } from './utils/translations';

const LABS = [
  { id: 1, title: 'Agent Components', component: Lab1 },
  { id: 2, title: 'Simple Prompt/Response', component: Lab2 },
  { id: 3, title: 'Custom System Prompts', component: Lab3 },
  { id: 4, title: 'Conversation Memory', component: Lab4 },
  { id: 5, title: 'Knowledge Base', component: Lab5 },
  { id: 6, title: 'RAG with Wikipedia', component: Lab6 },
  { id: 7, title: 'Multi-Agent Collaboration', component: Lab7 },
  { id: 8, title: 'Orchestrator Agent', component: Lab8 },
];

function App() {
  const { currentLab, apiKey, labProgress, language } = useStore();
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(!apiKey);

  // Set initial document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const CurrentLabComponent = LABS.find((lab) => lab.id === currentLab)?.component || Lab1;

  const completedCount = Object.values(labProgress).filter(Boolean).length;
  const progress = (completedCount / LABS.length) * 100;

  if (showWelcome) {
    return (
      <>
        <Homepage
          onGetStarted={() => {
            setIsApiModalOpen(true);
            setShowWelcome(false);
          }}
          onSkip={() => setShowWelcome(false)}
        />
        <ApiKeyModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col tech-grid">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Header - Matching Homepage */}
      <header className="relative z-20 border-b border-cyan-500/20 backdrop-blur-md bg-black/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 glass hover:glass-strong rounded-lg transition-all hover-lift lg:hidden border border-white/10"
            >
              {isSidebarOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
            <button
              onClick={() => setShowWelcome(true)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src="logo.png" alt="YUV.AI Logo" className="h-8 sm:h-10 w-auto" />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-base font-medium">
            <button
              onClick={() => setShowWelcome(true)}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              {t(language, 'home')}
            </button>
            <div className="relative group">
              <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                {t(language, 'agents')} <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 py-2 bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 text-cyan-400/90 hover:bg-cyan-500/10">
                  <div className="font-semibold text-white mb-1">{t(language, 'agentsDropdown.progressiveLabs')}</div>
                  <div className="text-xs text-white/60">{t(language, 'agentsDropdown.progressiveLabsDesc')}</div>
                </div>
                <div className="px-4 py-2 text-cyan-400/90 hover:bg-cyan-500/10">
                  <div className="font-semibold text-white mb-1">{t(language, 'agentsDropdown.interactiveLearning')}</div>
                  <div className="text-xs text-white/60">{t(language, 'agentsDropdown.interactiveLearningDesc')}</div>
                </div>
                <div className="px-4 py-2 text-cyan-400/90 hover:bg-cyan-500/10">
                  <div className="font-semibold text-white mb-1">{t(language, 'agentsDropdown.multiAgent')}</div>
                  <div className="text-xs text-white/60">{t(language, 'agentsDropdown.multiAgentDesc')}</div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                {t(language, 'features')} <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 py-2 bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 text-cyan-400/90 hover:bg-cyan-500/10">
                  <div className="font-semibold text-white mb-1">{t(language, 'featuresDropdown.browserBased')}</div>
                  <div className="text-xs text-white/60">{t(language, 'featuresDropdown.browserBasedDesc')}</div>
                </div>
                <div className="px-4 py-2 text-cyan-400/90 hover:bg-cyan-500/10">
                  <div className="font-semibold text-white mb-1">{t(language, 'featuresDropdown.monacoEditor')}</div>
                  <div className="text-xs text-white/60">{t(language, 'featuresDropdown.monacoEditorDesc')}</div>
                </div>
                <div className="px-4 py-2 text-cyan-400/90 hover:bg-cyan-500/10">
                  <div className="font-semibold text-white mb-1">{t(language, 'featuresDropdown.progressTracking')}</div>
                  <div className="text-xs text-white/60">{t(language, 'featuresDropdown.progressTrackingDesc')}</div>
                </div>
                <div className="px-4 py-2 text-cyan-400/90 hover:bg-cyan-500/10">
                  <div className="font-semibold text-white mb-1">{t(language, 'featuresDropdown.langchain')}</div>
                  <div className="text-xs text-white/60">{t(language, 'featuresDropdown.langchainDesc')}</div>
                </div>
              </div>
            </div>
            <a href="https://blog.yuv.ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">{t(language, 'blog')}</a>
            <a href="https://linktr.ee/yuvai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">{t(language, 'contact')}</a>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Toggle - Fixed width to prevent shifting */}
            <div className="w-[140px]">
              <LanguageToggle />
            </div>

            {/* GitHub Repository Link */}
            <a
              href="https://github.com/hoodini/agents-training"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/10 text-sm text-white/80 hover:text-white"
              title="View Repository"
            >
              <Github className="w-4 h-4" />
              <span>Repo</span>
            </a>

            <ModelSelector />

            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm md:text-base text-white/60">{t(language, 'progress')}:</span>
              <div className="w-24 md:w-32 h-2 glass rounded-full overflow-hidden border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-300 shadow-neural"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm md:text-base font-bold text-gradient-neural">
                {completedCount}/{LABS.length}
              </span>
            </div>

            <button
              onClick={() => setIsApiModalOpen(true)}
              className="p-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/10"
              title="API Settings"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 transition-transform duration-300 lg:block`}
        >
          <LabNavigation labs={LABS} />
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Lab Content */}
        <main className="relative flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-10">
          <CurrentLabComponent />
        </main>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
    </div>
  );
}

export default App;
