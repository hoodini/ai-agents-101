import { Settings as SettingsIcon, MessageCircle, Brain, Database, Globe, Users, Network, ChevronDown, Link as LinkIcon, Github, Linkedin, Twitter, Instagram, Youtube, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

interface HomepageProps {
  onGetStarted: () => void;
  onSkip: () => void;
  onLabSelect?: (labId: number) => void;
}

export function Homepage({ onGetStarted, onSkip, onLabSelect }: HomepageProps) {
  const { language } = useStore();

  const hexagonModules = [
    {
      id: 1,
      title: t(language, 'labs.agentComponents'),
      description: t(language, 'labs.agentComponentsDesc'),
      icon: SettingsIcon,
      color: 'cyan',
      bgClass: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-cyan-400/40'
    },
    {
      id: 2,
      title: t(language, 'labs.simplePrompt'),
      description: t(language, 'labs.simplePromptDesc'),
      icon: MessageCircle,
      color: 'purple',
      bgClass: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400/40'
    },
    {
      id: 3,
      title: t(language, 'labs.conversationMemory'),
      description: t(language, 'labs.conversationMemoryDesc'),
      icon: Brain,
      color: 'orange',
      bgClass: 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-400/40'
    },
    {
      id: 4,
      title: t(language, 'labs.customPrompts'),
      description: t(language, 'labs.customPromptsDesc'),
      icon: MessageCircle,
      color: 'pink',
      bgClass: 'bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-pink-400/40'
    },
    {
      id: 5,
      title: t(language, 'labs.knowledgeBase'),
      description: t(language, 'labs.knowledgeBaseDesc'),
      icon: Database,
      color: 'blue',
      bgClass: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-400/40'
    },
    {
      id: 6,
      title: t(language, 'labs.ragWikipedia'),
      description: t(language, 'labs.ragWikipediaDesc'),
      icon: Globe,
      color: 'green',
      bgClass: 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400/40'
    },
    {
      id: 7,
      title: t(language, 'labs.multiAgentCollab'),
      description: t(language, 'labs.multiAgentCollabDesc'),
      icon: Users,
      color: 'red',
      bgClass: 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-400/40'
    },
    {
      id: 8,
      title: t(language, 'labs.orchestrator'),
      description: t(language, 'labs.orchestratorDesc'),
      icon: Network,
      color: 'yellow',
      bgClass: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-400/40'
    },
  ];

  // Bonus module
  const bonusModule = {
    id: 9,
    title: t(language, 'bonus.navTitle'),
    description: t(language, 'bonus.navDesc'),
    icon: Sparkles,
    color: 'purple',
    isBonus: true,
    bgClass: 'bg-gradient-to-br from-purple-500/30 to-cyan-500/20 border-purple-400/50'
  };

  return (
    <div className="min-h-screen relative tech-grid overflow-x-hidden">
      {/* Animated Background Particles */}
      {[...Array(20)].map((_, i) => (
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

      {/* Header - Sticky with Apple Glass Effect */}
      <header className="sticky top-0 z-50 glass-navbar border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="logo.png" alt="YUV.AI Logo" className="h-7 sm:h-8 md:h-10 lg:h-12 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm lg:text-base font-medium">
            <button className="text-white hover:text-cyan-400 transition-colors">{t(language, 'home')}</button>
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

          {/* Language Toggle & GitHub Links - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle - Fixed width to prevent shifting */}
            <LanguageToggle />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* GitHub Repository Link */}
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="relative">
          {/* Hero Image - Clean without background */}
          <div className="relative w-full">
            <img
              src="hero.jpg"
              alt="AI Agents 101"
              className="w-full max-w-5xl h-auto object-contain mx-auto hero-glow rounded-xl sm:rounded-2xl md:rounded-3xl"
            />
          </div>

          {/* Subtitle below */}
          <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white/90 mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4">
            {t(language, 'homepage.subtitle')}
          </h2>
        </div>
      </section>

      {/* Welcome Card */}
      <section className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 mb-6 sm:mb-8 md:mb-12">
        <div className="holo-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
            {/* Avatar - Fully responsive */}
            <div className="relative flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64">
              {/* Thick Animated RGB Ring with Neon Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-2 animate-rgb-rotate" style={{ boxShadow: '0 0 50px rgba(0, 212, 255, 0.9), 0 0 80px rgba(168, 85, 247, 0.7), 0 0 120px rgba(236, 72, 153, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)' }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900/30 backdrop-blur-sm">
                </div>
              </div>
              {/* Avatar Image - Even Bigger to touch and pop out */}
              <div className="absolute inset-[-15%] flex items-center justify-center">
                <img
                  src="round-avatar.png"
                  alt="Yuval Avidani"
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 8px 40px rgba(0, 212, 255, 0.6)) drop-shadow(0 0 25px rgba(168, 85, 247, 0.5))' }}
                />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl heading-font neon-cyan mb-2 sm:mb-3 tracking-wider">
                {t(language, 'homepage.welcomeTitle')}
              </h3>
              <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">Yuval Avidani</p>

              {/* Social Icons */}
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 flex-wrap">
                <a href="https://yuv.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                <a href="https://github.com/hoodini" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                <a href="https://linkedin.com/in/yuval-avidani-87081474" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                <a href="https://x.com/yuvalav" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                <a href="https://instagram.com/yuval_770" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium">{t(language, 'homepage.aiBuilder')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Hexagonal Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold heading-font text-white text-center mb-6 sm:mb-8 md:mb-12">
          {t(language, 'homepage.whatYouLearn')}
        </h2>

        {/* Hexagon Grid */}
        <div className="hidden md:flex flex-col items-center gap-2">
          {/* Row 1 - 3 hexagons */}
          <div className="flex justify-center gap-4">
            {hexagonModules.slice(0, 3).map((module, index) => {
              const Icon = module.icon;
              const colorMap: Record<string, string> = {
                'cyan': '#00d4ff',
                'purple': '#c084fc',
                'pink': '#ff00ff',
                'orange': '#ff8800',
                'green': '#00ff88',
                'red': '#ff0066',
                'blue': '#4488ff',
                'yellow': '#ffdd00'
              };
              return (
                <div
                  key={module.id}
                  className="hexagon relative group cursor-pointer"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    color: colorMap[module.color]
                  }}
                  onClick={() => onLabSelect && onLabSelect(module.id)}
                >
                  <div className={`hexagon-content ${module.bgClass} relative overflow-visible transition-all duration-300 group-hover:scale-105`}>
                    {/* Number Badge */}
                    <div className="absolute top-8 left-8 w-14 h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center font-black text-white text-2xl border-2 border-white/40"
                         style={{ boxShadow: `0 0 15px ${colorMap[module.color]}60` }}>
                      {module.id}
                    </div>

                    {/* Icon */}
                    <Icon className={`w-24 h-24 mb-3 neon-${module.color}`}
                          style={{ filter: `drop-shadow(0 0 12px ${colorMap[module.color]})` }} />

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 text-center px-4 leading-tight">
                      {module.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-white/70 text-center px-4 leading-snug">
                      {module.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2 - 2 hexagons (middle row offset) */}
          <div className="flex justify-center gap-4">
            {hexagonModules.slice(3, 5).map((module, index) => {
              const Icon = module.icon;
              const colorMap: Record<string, string> = {
                'cyan': '#00d4ff',
                'purple': '#c084fc',
                'pink': '#ff00ff',
                'orange': '#ff8800',
                'green': '#00ff88',
                'red': '#ff0066',
                'blue': '#4488ff',
                'yellow': '#ffdd00'
              };
              return (
                <div
                  key={module.id}
                  className="hexagon relative group cursor-pointer"
                  style={{
                    animationDelay: `${(index + 3) * 0.1}s`,
                    color: colorMap[module.color]
                  }}
                  onClick={() => onLabSelect && onLabSelect(module.id)}
                >
                  <div className={`hexagon-content ${module.bgClass} relative overflow-visible transition-all duration-300 group-hover:scale-105`}>
                    {/* Number Badge */}
                    <div className="absolute top-8 left-8 w-14 h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center font-black text-white text-2xl border-2 border-white/40"
                         style={{ boxShadow: `0 0 15px ${colorMap[module.color]}60` }}>
                      {module.id}
                    </div>

                    {/* Icon */}
                    <Icon className={`w-24 h-24 mb-3 neon-${module.color}`}
                          style={{ filter: `drop-shadow(0 0 12px ${colorMap[module.color]})` }} />

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 text-center px-4 leading-tight">
                      {module.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-white/70 text-center px-4 leading-snug">
                      {module.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 3 - 3 hexagons */}
          <div className="flex justify-center gap-4">
            {hexagonModules.slice(5).map((module, index) => {
              const Icon = module.icon;
              const colorMap: Record<string, string> = {
                'cyan': '#00d4ff',
                'purple': '#c084fc',
                'pink': '#ff00ff',
                'orange': '#ff8800',
                'green': '#00ff88',
                'red': '#ff0066',
                'blue': '#4488ff',
                'yellow': '#ffdd00'
              };
              return (
                <div
                  key={module.id}
                  className="hexagon relative group cursor-pointer"
                  style={{
                    animationDelay: `${(index + 4) * 0.1}s`,
                    color: colorMap[module.color]
                  }}
                  onClick={() => onLabSelect && onLabSelect(module.id)}
                >
                  <div className={`hexagon-content ${module.bgClass} relative overflow-visible transition-all duration-300 group-hover:scale-105`}>
                    {/* Number Badge */}
                    <div className="absolute top-8 left-8 w-14 h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center font-black text-white text-2xl border-2 border-white/40"
                         style={{ boxShadow: `0 0 15px ${colorMap[module.color]}60` }}>
                      {module.id}
                    </div>

                    {/* Icon */}
                    <Icon className={`w-24 h-24 mb-3 neon-${module.color}`}
                          style={{ filter: `drop-shadow(0 0 12px ${colorMap[module.color]})` }} />

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 text-center px-4 leading-tight">
                      {module.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-white/70 text-center px-4 leading-snug">
                      {module.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bonus Card - Desktop */}
          <div className="flex justify-center mt-6">
            <div
              className="relative group cursor-pointer max-w-md w-full"
              onClick={() => onLabSelect && onLabSelect(bonusModule.id)}
            >
              <div className={`${bonusModule.bgClass} rounded-2xl p-6 border-2 transition-all duration-300 group-hover:scale-105 relative`}
                   style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}>
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="p-3 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-xl border border-purple-400/50">
                    <Sparkles className="w-10 h-10 text-purple-300"
                          style={{ filter: 'drop-shadow(0 0 12px #c084fc)' }} />
                  </div>
                  
                  <div className="flex-1">
                    {/* Bonus Badge */}
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/30 rounded-full text-xs font-bold text-purple-300 mb-1">
                      <Sparkles className="w-3 h-3" />
                      {t(language, 'bonus.label')}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1">
                      {bonusModule.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/70">
                      {bonusModule.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Friendly Grid */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {hexagonModules.map((module) => {
            const Icon = module.icon;
            const colorMap: Record<string, string> = {
              'cyan': '#00d4ff',
              'purple': '#c084fc',
              'pink': '#ff00ff',
              'orange': '#ff8800',
              'green': '#00ff88',
              'red': '#ff0066',
              'blue': '#4488ff',
              'yellow': '#ffdd00'
            };
            return (
              <div
                key={module.id}
                className={`${module.bgClass} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 transition-all duration-300 hover:scale-105 relative cursor-pointer`}
                onClick={() => onLabSelect && onLabSelect(module.id)}
              >
                {/* Number Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center font-black text-white text-lg sm:text-xl border-2 border-white/40"
                     style={{ boxShadow: `0 0 15px ${colorMap[module.color]}60` }}>
                  {module.id}
                </div>

                {/* Icon */}
                <Icon className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                      style={{ color: colorMap[module.color], filter: `drop-shadow(0 0 8px ${colorMap[module.color]})` }} />

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight pr-12 sm:pr-14">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {module.description}
                </p>
              </div>
            );
          })}
          
          {/* Bonus Card - Mobile */}
          <div
            className={`${bonusModule.bgClass} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 transition-all duration-300 hover:scale-105 relative cursor-pointer sm:col-span-2`}
            onClick={() => onLabSelect && onLabSelect(bonusModule.id)}
            style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Icon */}
              <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-lg sm:rounded-xl border border-purple-400/50">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300"
                      style={{ filter: 'drop-shadow(0 0 8px #c084fc)' }} />
              </div>
              
              <div className="flex-1 min-w-0">
                {/* Bonus Badge */}
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/30 rounded-full text-xs font-bold text-purple-300 mb-1">
                  <Sparkles className="w-3 h-3" />
                  {t(language, 'bonus.label')}
                </div>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 truncate">
                  {bonusModule.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/70 line-clamp-2">
                  {bonusModule.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Card */}
      <section className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6 mb-6 sm:mb-8 md:mb-12">
        <div className="border-2 border-cyan-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl">
          <div className="text-xs sm:text-sm text-cyan-400 font-mono mb-2 sm:mb-3">{t(language, 'homepage.infoTitle')}</div>
          <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
            {t(language, 'homepage.infoText')}
          </p>

          <div className="flex flex-col gap-2 sm:gap-3">
            <button
              onClick={onGetStarted}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm sm:text-base md:text-lg transition-all duration-300 hover-lift shadow-lg shadow-blue-500/30"
            >
              {t(language, 'homepage.getStarted')}
            </button>
            <button
              onClick={onSkip}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 border border-white/20"
            >
              {t(language, 'homepage.skipForNow')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 py-4 sm:py-6 md:py-8 text-center px-3 sm:px-4">
        <p className="text-white/60 text-xs sm:text-sm md:text-base mb-1 sm:mb-2">{t(language, 'homepage.footerCopyright')}</p>
        <p className="text-white/50 text-xs sm:text-sm md:text-base">
          {t(language, 'homepage.footerTagline')}
        </p>
      </footer>
    </div>
  );
}
