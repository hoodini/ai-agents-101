import { BookOpen, Lightbulb, ArrowRight, Code, MessageSquare, Database, Brain, Target, CheckCircle, XCircle, Layers, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';

export function BonusContextEngineering() {
  const { language } = useStore();

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 sm:space-y-8 animate-fade-in">
      {/* Hero Image */}
      <div className="hero-image-container mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
        <img
          src="/bonus.jpg"
          alt="Bonus: Prompt Engineering vs Context Engineering"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-500/30 shadow-2xl">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-lg sm:rounded-xl shadow-lg">
            <Sparkles className="w-6 h-6 sm:w-8 md:w-10 sm:h-8 md:h-10 text-white" />
          </div>
          <div>
            <div className="text-xs sm:text-sm text-purple-400 font-mono mb-1">{t(language, 'bonus.label')}</div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {t(language, 'bonus.title')}
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
          {t(language, 'bonus.subtitle')}
        </p>
      </div>

      {/* Quote from Industry Leaders */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-cyan-500/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl text-cyan-400">"</div>
          <div>
            <p className="text-lg text-white/90 italic mb-4">
              {t(language, 'bonus.tobiQuote')}
            </p>
            <p className="text-sm text-cyan-400 font-semibold">— Tobi Lütke, CEO of Shopify</p>
          </div>
        </div>
      </div>

      {/* What is Prompt Engineering */}
      <section className="bg-gradient-to-br from-blue-900/30 to-slate-900/50 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">{t(language, 'bonus.promptEngTitle')}</h2>
        </div>
        <p className="text-white/80 mb-4 leading-relaxed">
          {t(language, 'bonus.promptEngDesc')}
        </p>
        
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">{t(language, 'bonus.promptEngExample')}</h3>
          <div className="font-mono text-sm bg-slate-900/80 rounded p-4 text-green-400 border border-slate-700">
            <p className="text-slate-500 mb-2"># {t(language, 'bonus.simplePrompt')}</p>
            <p>"Write a poem about summer"</p>
            <p className="text-slate-500 mt-4 mb-2"># {t(language, 'bonus.betterPrompt')}</p>
            <p>"Write a haiku about summer in the style of Matsuo Bashō, focusing on the feeling of warm rain"</p>
          </div>
        </div>
      </section>

      {/* What is Context Engineering */}
      <section className="bg-gradient-to-br from-purple-900/30 to-slate-900/50 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Layers className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">{t(language, 'bonus.contextEngTitle')}</h2>
        </div>
        <p className="text-white/80 mb-4 leading-relaxed">
          {t(language, 'bonus.contextEngDesc')}
        </p>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-purple-400 mb-3">{t(language, 'bonus.contextComponents')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Target className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">{t(language, 'bonus.taskDesc')}</span>
                <p className="text-sm text-white/60">{t(language, 'bonus.taskDescDetail')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <BookOpen className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">{t(language, 'bonus.fewShot')}</span>
                <p className="text-sm text-white/60">{t(language, 'bonus.fewShotDetail')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Database className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">{t(language, 'bonus.ragData')}</span>
                <p className="text-sm text-white/60">{t(language, 'bonus.ragDataDetail')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Code className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">{t(language, 'bonus.tools')}</span>
                <p className="text-sm text-white/60">{t(language, 'bonus.toolsDetail')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Brain className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">{t(language, 'bonus.memory')}</span>
                <p className="text-sm text-white/60">{t(language, 'bonus.memoryDetail')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Lightbulb className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">{t(language, 'bonus.stateHistory')}</span>
                <p className="text-sm text-white/60">{t(language, 'bonus.stateHistoryDetail')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Andrej Karpathy Quote */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl text-purple-400">"</div>
          <div>
            <p className="text-lg text-white/90 italic mb-4">
              {t(language, 'bonus.karpathyQuote')}
            </p>
            <p className="text-sm text-purple-400 font-semibold">— Andrej Karpathy, {t(language, 'bonus.karpathyTitle')}</p>
          </div>
        </div>
      </div>

      {/* Side by Side Comparison */}
      <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-600/30">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{t(language, 'bonus.comparison')}</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Prompt Engineering Column */}
          <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {t(language, 'bonus.promptEngShort')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{t(language, 'bonus.pePoint1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{t(language, 'bonus.pePoint2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{t(language, 'bonus.pePoint3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{t(language, 'bonus.pePoint4')}</span>
              </li>
            </ul>
          </div>

          {/* Context Engineering Column */}
          <div className="bg-purple-900/20 rounded-xl p-5 border border-purple-500/30">
            <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              {t(language, 'bonus.contextEngShort')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{t(language, 'bonus.cePoint1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{t(language, 'bonus.cePoint2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{t(language, 'bonus.cePoint3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{t(language, 'bonus.cePoint4')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Real World Case Study 1 */}
      <section className="bg-gradient-to-br from-green-900/30 to-slate-900/50 rounded-xl p-6 border border-green-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Target className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">{t(language, 'bonus.caseStudy1Title')}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h4 className="font-semibold text-red-400 mb-2">{t(language, 'bonus.promptApproach')}</h4>
            <div className="font-mono text-sm bg-slate-900/80 rounded p-3 text-red-300 border border-slate-700">
              "Help me with my code"
            </div>
            <p className="text-sm text-white/60 mt-2">{t(language, 'bonus.case1PromptResult')}</p>
          </div>
          
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h4 className="font-semibold text-green-400 mb-2">{t(language, 'bonus.contextApproach')}</h4>
            <div className="font-mono text-xs bg-slate-900/80 rounded p-3 text-green-300 border border-slate-700">
              <p className="text-slate-500"># Context includes:</p>
              <p>• File: utils/api.ts</p>
              <p>• Error: TypeError line 42</p>
              <p>• Project: React + TypeScript</p>
              <p>• Recent changes: Added auth</p>
              <p>• Stack trace + memory</p>
            </div>
            <p className="text-sm text-white/60 mt-2">{t(language, 'bonus.case1ContextResult')}</p>
          </div>
        </div>
      </section>

      {/* Real World Case Study 2 */}
      <section className="bg-gradient-to-br from-orange-900/30 to-slate-900/50 rounded-xl p-6 border border-orange-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Database className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">{t(language, 'bonus.caseStudy2Title')}</h2>
        </div>
        
        <p className="text-white/80 mb-4">{t(language, 'bonus.caseStudy2Desc')}</p>
        
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="font-mono text-sm space-y-2">
            <p className="text-orange-400">{t(language, 'bonus.ragBefore')}</p>
            <p className="text-slate-400 text-xs">"The company's revenue grew by 3% over the previous quarter."</p>
            <p className="text-red-400 text-xs">{t(language, 'bonus.ragProblem')}</p>
            
            <div className="my-3 flex items-center gap-2 text-white/40">
              <div className="flex-1 h-px bg-white/20"></div>
              <ArrowRight className="w-4 h-4" />
              <div className="flex-1 h-px bg-white/20"></div>
            </div>
            
            <p className="text-green-400">{t(language, 'bonus.ragAfter')}</p>
            <p className="text-slate-400 text-xs">"This chunk is from an SEC filing on ACME corp's performance in Q2 2023; the previous quarter's revenue was $314 million. The company's revenue grew by 3% over the previous quarter."</p>
            <p className="text-green-400 text-xs">{t(language, 'bonus.ragSolution')}</p>
          </div>
        </div>
        <p className="text-sm text-white/60 mt-3 italic">{t(language, 'bonus.ragSource')}</p>
      </section>

      {/* Real World Case Study 3 */}
      <section className="bg-gradient-to-br from-cyan-900/30 to-slate-900/50 rounded-xl p-6 border border-cyan-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Code className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">{t(language, 'bonus.caseStudy3Title')}</h2>
        </div>
        
        <p className="text-white/80 mb-4">{t(language, 'bonus.caseStudy3Desc')}</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="font-semibold text-cyan-400 mb-2">{t(language, 'bonus.contextWindowContains')}</h4>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• {t(language, 'bonus.cwItem1')}</li>
              <li>• {t(language, 'bonus.cwItem2')}</li>
              <li>• {t(language, 'bonus.cwItem3')}</li>
              <li>• {t(language, 'bonus.cwItem4')}</li>
              <li>• {t(language, 'bonus.cwItem5')}</li>
            </ul>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="font-semibold text-cyan-400 mb-2">{t(language, 'bonus.result')}</h4>
            <p className="text-sm text-white/70">{t(language, 'bonus.caseStudy3Result')}</p>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 rounded-xl p-6 border-2 border-purple-500/30">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          {t(language, 'bonus.keyTakeaways')}
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/80">{t(language, 'bonus.takeaway1')}</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/80">{t(language, 'bonus.takeaway2')}</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/80">{t(language, 'bonus.takeaway3')}</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/80">{t(language, 'bonus.takeaway4')}</p>
          </div>
        </div>
      </section>

      {/* Final Summary */}
      <div className="bg-gradient-to-r from-purple-900/30 via-cyan-900/30 to-purple-900/30 rounded-xl p-6 border border-purple-500/30 text-center">
        <p className="text-lg text-white/90 italic">
          {t(language, 'bonus.finalSummary')}
        </p>
      </div>
    </div>
  );
}
