import { Settings as SettingsIcon, MessageCircle, Brain, Database, Globe, Users, Network, ChevronDown, Link as LinkIcon, Github, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

interface HomepageProps {
  onGetStarted: () => void;
  onSkip: () => void;
}

export function Homepage({ onGetStarted, onSkip }: HomepageProps) {
  const hexagonModules = [
    {
      id: 1,
      title: 'Agent Components',
      description: 'Learn how about diffe lest agents components.',
      icon: SettingsIcon,
      color: 'cyan',
      bgClass: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-cyan-400/40'
    },
    {
      id: 2,
      title: 'Simple Prompt/Response',
      description: "Simple prompt's & prompt consepence.",
      icon: MessageCircle,
      color: 'purple',
      bgClass: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400/40'
    },
    {
      id: 3,
      title: 'Conversation Memory',
      description: 'Aconersationwall memory, briliet conversation controme.',
      icon: Brain,
      color: 'orange',
      bgClass: 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-400/40'
    },
    {
      id: 4,
      title: 'Custom System Prompts',
      description: 'Custom system prompts for specialized agent behavior.',
      icon: MessageCircle,
      color: 'pink',
      bgClass: 'bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-pink-400/40'
    },
    {
      id: 5,
      title: 'Knowledge Base',
      description: 'A penivise lan vation of our knowledge AI agents.',
      icon: Database,
      color: 'blue',
      bgClass: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-400/40'
    },
    {
      id: 6,
      title: 'RAG with Wikipedia',
      description: 'RAG with with wikipedia and Wikipedia with Wikipedia.',
      icon: Globe,
      color: 'green',
      bgClass: 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400/40'
    },
    {
      id: 7,
      title: 'Multi-Agent Collaboration',
      description: 'Multi-constituent wims the ontraces in multi-agent collaboration.',
      icon: Users,
      color: 'red',
      bgClass: 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-400/40'
    },
    {
      id: 8,
      title: 'Orchestrator Agent',
      description: 'Orchestrator accelbut multi-agent varialese erecuitves.',
      icon: Network,
      color: 'yellow',
      bgClass: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-400/40'
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden tech-grid">
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

      {/* Header */}
      <header className="relative z-20 border-b border-cyan-500/20 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="YUV.AI Logo" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button className="text-white hover:text-cyan-400 transition-colors">Home</button>
            <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
              Features <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
              Agents <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">Blog</button>
            <button className="text-white/70 hover:text-white transition-colors">Support</button>
            <button className="text-white/70 hover:text-white transition-colors">Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="relative">
          {/* Hero Image - Clean without background */}
          <div className="relative">
            <img
              src="/hero.jpg"
              alt="AI Agents 101"
              className="w-full max-w-5xl h-auto object-contain mx-auto hero-glow rounded-3xl"
            />
          </div>

          {/* Subtitle below */}
          <h2 className="text-center text-3xl font-semibold text-white/90 mt-8">
            Master the art of building AI agents
          </h2>
        </div>
      </section>

      {/* Welcome Card */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 mb-12">
        <div className="holo-border rounded-2xl p-8 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl">
          <div className="flex items-center gap-8">
            {/* Avatar - Simple without circle border */}
            <div className="relative flex-shrink-0">
              <img
                src="/yuvai.png"
                alt="Yuval Avidani"
                className="w-48 h-48 object-contain"
              />
            </div>

            {/* Welcome Text */}
            <div className="flex-1">
              <h3 className="text-2xl heading-font neon-cyan mb-3 tracking-wider">
                WELCOME TO YOUR AI AGENTS TRAINING
              </h3>
              <p className="text-3xl font-bold text-white mb-3">Yuval Avidani</p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 mb-3">
                <a href="https://yuv.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <LinkIcon className="w-5 h-5" />
                </a>
                <a href="https://github.com/hoodini" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/yuval-avidani-87081474" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://x.com/yuvalav" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/yuval_770" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>

              <p className="text-xl text-white/90 font-medium">AI Builder, Speaker & Educator</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Hexagonal Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-4xl font-bold heading-font text-white text-center mb-12">
          What You'll Learn
        </h2>

        {/* Hexagon Grid */}
        <div className="flex flex-col items-center gap-2">
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
        </div>
      </section>

      {/* Info Card */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 mb-12">
        <div className="border-2 border-cyan-500/30 rounded-2xl p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl">
          <div className="text-xs text-cyan-400 font-mono mb-2">INFO</div>
          <p className="text-white/80 mb-6 leading-relaxed">
            Lisiltae seli proerese bast and with your API keys. This can nada as more usen usto cente on your size end, local storage will find API keys and local storage.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={onGetStarted}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-lg transition-all duration-300 hover-lift shadow-lg shadow-blue-500/30"
            >
              CONFIGURE API KEY & START LEARNING
            </button>
            <button
              onClick={onSkip}
              className="w-full px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white font-semibold transition-all duration-300 border border-white/20"
            >
              SKIP FOR NOW
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 py-8 text-center">
        <p className="text-white/60 text-sm mb-2">© 2025 Yuval Avidani. All rights reserved</p>
        <p className="text-white/50 text-sm">
          Founder of YUV.AI - Making AI practical, personal, and powerful
        </p>
      </footer>
    </div>
  );
}
