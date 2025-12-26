import { useState, useEffect } from 'react';
import { Settings, Menu, X, ChevronDown } from 'lucide-react';
import { Github } from 'lucide-react';
import { LabNavigation } from './components/LabNavigation';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ModelSelector } from './components/ModelSelector';
import { LanguageToggle } from './components/LanguageToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { Homepage } from './components/Homepage';
import { Resources } from './components/Resources';
import { AdvancedPlayground } from './components/AdvancedPlayground';
import { Lab1, Lab2, Lab3, Lab4, Lab5, Lab6, Lab7, Lab8, BonusContextEngineering } from './labs';
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
  { id: 9, title: 'Bonus: Context Engineering', component: BonusContextEngineering, isBonus: true },
];

function App() {
  const { currentLab, apiKey, labProgress, language, theme, setCurrentLab } = useStore();
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(!apiKey);
  const [showResources, setShowResources] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Set initial document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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
          onLabSelect={(labId) => {
            setCurrentLab(labId);
            setShowWelcome(false);
          }}
        />
        <ApiKeyModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
      </>
    );
  }

  if (showResources) {
    return (
      <div className="h-screen flex flex-col tech-grid pt-16 sm:pt-20">
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

        {/* Header - Fixed with Apple Glass Effect */}
        <header className="fixed top-0 left-0 right-0 z-50 glass-navbar border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowWelcome(true);
                  setShowResources(false);
                }}
                className="flex items-center hover:opacity-80 transition-opacity"
                title="Return to Homepage"
              >
                <img src="logo.png" alt="YUV.AI Logo" className="h-7 sm:h-8 md:h-10 lg:h-12 w-auto" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm lg:text-base font-medium">
              <button
                onClick={() => {
                  setShowWelcome(true);
                  setShowResources(false);
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                {t(language, 'home')}
              </button>
              <button className="text-cyan-400 transition-colors">
                Resources
              </button>
              <a href="https://blog.yuv.ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">{t(language, 'blog')}</a>
              <a href="https://linktr.ee/yuvai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">{t(language, 'contact')}</a>
            </nav>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
              <a
                href="https://github.com/hoodini/ai-agents-101"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/10 text-sm text-white/80 hover:text-white"
                title="View Repository"
              >
                <Github className="w-4 h-4" />
                <span>Repo</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 glass hover:glass-strong rounded-lg transition-all border border-white/10"
                title="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Collapsible Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 animate-fade-in">
              <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => { setShowWelcome(true); setShowResources(false); setIsMobileMenuOpen(false); }}
                    className="text-left px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {t(language, 'home')}
                  </button>
                  <button className="text-left px-3 py-2 text-cyan-400 hover:bg-white/5 rounded-lg transition-colors">
                    Resources
                  </button>
                  <a href="https://blog.yuv.ai" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t(language, 'blog')}</a>
                  <a href="https://linktr.ee/yuvai" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t(language, 'contact')}</a>
                  <a
                    href="https://github.com/hoodini/ai-agents-101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="relative flex-1 overflow-y-auto overflow-x-hidden z-10 w-full">
          <div className="w-full max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mx-auto">
            <Resources />
          </div>
        </main>
      </div>
    );
  }

  if (showAdvanced) {
    return (
      <div className="h-screen flex flex-col tech-grid pt-16 sm:pt-20">
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

        {/* Header - Fixed with Apple Glass Effect */}
        <header className="fixed top-0 left-0 right-0 z-50 glass-navbar border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowWelcome(true);
                  setShowResources(false);
                  setShowAdvanced(false);
                }}
                className="flex items-center hover:opacity-80 transition-opacity"
                title="Return to Homepage"
              >
                <img src="logo.png" alt="YUV.AI Logo" className="h-7 sm:h-8 md:h-10 lg:h-12 w-auto" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm lg:text-base font-medium">
              <button
                onClick={() => {
                  setShowWelcome(true);
                  setShowResources(false);
                  setShowAdvanced(false);
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                {t(language, 'home')}
              </button>
              <button
                onClick={() => {
                  setShowWelcome(false);
                  setShowResources(true);
                  setShowAdvanced(false);
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                Resources
              </button>
              <button className="text-purple-400 transition-colors font-semibold">
                Advanced
              </button>
              <a href="https://blog.yuv.ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">{t(language, 'blog')}</a>
              <a href="https://linktr.ee/yuvai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">{t(language, 'contact')}</a>
            </nav>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
              <a
                href="https://github.com/hoodini/agents-training"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/10 text-sm text-white/80 hover:text-white"
                title="View Repository"
              >
                <Github className="w-4 h-4" />
                <span>Repo</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 glass hover:glass-strong rounded-lg transition-all border border-white/10"
                title="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Collapsible Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 animate-fade-in">
              <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => { setShowWelcome(true); setShowResources(false); setShowAdvanced(false); setIsMobileMenuOpen(false); }}
                    className="text-left px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {t(language, 'home')}
                  </button>
                  <button
                    onClick={() => { setShowWelcome(false); setShowResources(true); setShowAdvanced(false); setIsMobileMenuOpen(false); }}
                    className="text-left px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Resources
                  </button>
                  <button className="text-left px-3 py-2 text-purple-400 hover:bg-white/5 rounded-lg transition-colors font-semibold">
                    Advanced
                  </button>
                  <a href="https://blog.yuv.ai" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t(language, 'blog')}</a>
                  <a href="https://linktr.ee/yuvai" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t(language, 'contact')}</a>
                  <a
                    href="https://github.com/hoodini/agents-training"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="relative flex-1 overflow-y-auto overflow-x-hidden z-10 w-full">
          <div className="w-full max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mx-auto">
            <AdvancedPlayground />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col tech-grid pt-16 sm:pt-20">
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

      {/* Header - Fixed with Apple Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-navbar border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowWelcome(true)}
              className="flex items-center hover:opacity-80 transition-opacity"
              title="Return to Homepage"
            >
              <img src="logo.png" alt="YUV.AI Logo" className="h-7 sm:h-8 md:h-10 lg:h-12 w-auto" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm lg:text-base font-medium">
            <button
              onClick={() => {
                setShowWelcome(true);
                setShowResources(false);
                setShowAdvanced(false);
              }}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              {t(language, 'home')}
            </button>
            <button
              onClick={() => {
                setShowWelcome(false);
                setShowResources(true);
                setShowAdvanced(false);
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              Resources
            </button>
            <button
              onClick={() => {
                setShowWelcome(false);
                setShowResources(false);
                setShowAdvanced(true);
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              Advanced
            </button>
            <div className="relative group">
              <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                {t(language, 'agents')} <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 py-2 bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
              <div className="absolute left-0 mt-2 w-64 py-2 bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="https://github.com/hoodini/ai-agents-101"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/10 text-sm text-white/80 hover:text-white"
              title="View Repository"
            >
              <Github className="w-4 h-4" />
              <span>Repo</span>
            </a>
            <ModelSelector />
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">{t(language, 'progress')}:</span>
              <div className="w-20 lg:w-24 h-2 glass rounded-full overflow-hidden border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-300 shadow-neural"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gradient-neural">
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

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 glass hover:glass-strong rounded-lg transition-all border border-white/10"
              title="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 glass hover:glass-strong rounded-lg transition-all border border-cyan-500/30 bg-cyan-500/10"
              title="Toggle Labs Sidebar"
            >
              <span className="text-xs font-bold text-cyan-400">Labs</span>
            </button>
          </div>
        </div>

        {/* Mobile Collapsible Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 animate-fade-in">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => { setShowWelcome(true); setShowResources(false); setShowAdvanced(false); setIsMobileMenuOpen(false); }}
                  className="text-left px-3 py-2 text-white hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {t(language, 'home')}
                </button>
                <button
                  onClick={() => { setShowWelcome(false); setShowResources(true); setShowAdvanced(false); setIsMobileMenuOpen(false); }}
                  className="text-left px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Resources
                </button>
                <button
                  onClick={() => { setShowWelcome(false); setShowResources(false); setShowAdvanced(true); setIsMobileMenuOpen(false); }}
                  className="text-left px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Advanced
                </button>
                <a href="https://blog.yuv.ai" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t(language, 'blog')}</a>
                <a href="https://linktr.ee/yuvai" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t(language, 'contact')}</a>
                <a
                  href="https://github.com/hoodini/ai-agents-101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repo</span>
                </a>
                <div className="px-3 py-2">
                  <ModelSelector />
                </div>
                <button
                  onClick={() => { setIsApiModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>API Settings</span>
                </button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Collapsible on mobile */}
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-40 w-[280px] sm:w-[300px] lg:w-72 transition-transform duration-300 ease-in-out pt-16 sm:pt-20 lg:pt-0 top-0 h-full lg:h-auto`}
        >
          <LabNavigation labs={LABS} onLabClick={() => setIsSidebarOpen(false)} />
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Lab Content - Centered and properly contained */}
        <main className="relative flex-1 overflow-y-auto overflow-x-hidden z-10 w-full">
          <div className="w-full max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mx-auto">
            <CurrentLabComponent />
          </div>
        </main>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
    </div>
  );
}

export default App;
