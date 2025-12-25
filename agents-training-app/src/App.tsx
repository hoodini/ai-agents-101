import { useState } from 'react';
import { Settings, Menu, X, ChevronDown, Link as LinkIcon, Github, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { LabNavigation } from './components/LabNavigation';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ModelSelector } from './components/ModelSelector';
import { Homepage } from './components/Homepage';
import { Lab1, Lab2, Lab3, Lab4, Lab5, Lab6, Lab7, Lab8 } from './labs';
import { useStore } from './store/useStore';

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
  const { currentLab, apiKey, labProgress } = useStore();
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(!apiKey);

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
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
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
              <img src="/logo.png" alt="YUV.AI Logo" className="h-10 w-auto" />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setShowWelcome(true)}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
              Features <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
              Agents <ChevronDown className="w-4 h-4" />
            </button>
            <div className="relative group">
              <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                Contact <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 py-2 bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="https://yuv.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                  <LinkIcon className="w-4 h-4" />
                  <span>Website</span>
                </a>
                <a href="https://github.com/hoodini" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/yuval-avidani-87081474" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://x.com/yuvalav" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
                <a href="https://instagram.com/yuval_770" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <ModelSelector />

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm text-white/60">Progress:</span>
              <div className="w-32 h-2 glass rounded-full overflow-hidden border border-white/20">
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
        <main className="relative flex-1 overflow-y-auto p-6 lg:p-8 z-10">
          <CurrentLabComponent />
        </main>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
    </div>
  );
}

export default App;
