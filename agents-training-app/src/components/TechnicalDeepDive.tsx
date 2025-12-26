import { BookOpen, Lightbulb, Cpu, Code, Zap, Check, X, Terminal, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';

export function TechnicalDeepDive() {
  const { language } = useStore();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Image */}
      <div className="hero-image-container mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl">
        <img
          src="/tech-dive.jpg"
          alt="Technical Deep Dive - Browser-based AI Execution"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-neural">
              {t(language, 'technical.title')}
            </h1>
            <p className="text-sm sm:text-base text-white/60 mt-1">
              {t(language, 'technical.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-8 p-6 sm:p-8 glass rounded-xl border border-cyan-500/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
          {t(language, 'technical.intro.title')}
        </h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-4">
          {t(language, 'technical.intro.text1')}
        </p>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed">
          {t(language, 'technical.intro.text2')}
        </p>
      </div>

      {/* Challenge 1: Running Code in Browser */}
      <div className="mb-8 p-6 sm:p-8 glass rounded-xl border border-purple-500/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
          {t(language, 'technical.challenge1.title')}
        </h2>

        {/* The Problem */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
            <X className="w-5 h-5" />
            {t(language, 'technical.challenge1.problem')}
          </h3>
          <p className="text-white/70 mb-4">{t(language, 'technical.challenge1.problemDesc')}</p>
          <div className="p-4 glass rounded-lg border border-red-500/20">
            <pre className="text-sm text-red-300">
{`❌ Traditional Approach:
User writes Python → Sent to server → Server executes →
Response sent back → Display result

Issues:
• Requires backend infrastructure
• Network latency
• Security concerns
• Can't work offline`}
            </pre>
          </div>
        </div>

        {/* The Solution */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
            <Check className="w-5 h-5" />
            {t(language, 'technical.challenge1.solution')}
          </h3>
          <p className="text-white/70 mb-4">{t(language, 'technical.challenge1.solutionDesc')}</p>
          <div className="p-4 glass rounded-lg border border-green-500/20">
            <pre className="text-sm text-green-300">
{`✅ WebAssembly (Wasm) Approach:
Python interpreter compiled to Wasm → Runs in browser →
No server needed → Instant execution

Benefits:
• Zero backend infrastructure
• No network calls
• Complete privacy
• Works offline
• Near-native performance`}
            </pre>
          </div>
        </div>

        {/* How it Works */}
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-3">{t(language, 'technical.challenge1.howItWorks')}</h3>
          <div className="space-y-4">
            <div className="p-4 glass rounded-lg border border-cyan-500/20">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{t(language, 'technical.challenge1.step1Title')}</h4>
                  <p className="text-sm text-white/70">{t(language, 'technical.challenge1.step1Desc')}</p>
                </div>
              </div>
            </div>

            <div className="p-4 glass rounded-lg border border-cyan-500/20">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{t(language, 'technical.challenge1.step2Title')}</h4>
                  <p className="text-sm text-white/70">{t(language, 'technical.challenge1.step2Desc')}</p>
                </div>
              </div>
            </div>

            <div className="p-4 glass rounded-lg border border-cyan-500/20">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{t(language, 'technical.challenge1.step3Title')}</h4>
                  <p className="text-sm text-white/70">{t(language, 'technical.challenge1.step3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge 2: Running LLMs in Browser */}
      <div className="mb-8 p-6 sm:p-8 glass rounded-xl border border-blue-500/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          {t(language, 'technical.challenge2.title')}
        </h2>

        {/* The Problem */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
            <X className="w-5 h-5" />
            {t(language, 'technical.challenge2.problem')}
          </h3>
          <p className="text-white/70 mb-4">{t(language, 'technical.challenge2.problemDesc')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 glass rounded-lg border border-red-500/20 text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">7B+</div>
              <div className="text-xs text-white/60">Parameters (huge!)</div>
            </div>
            <div className="p-4 glass rounded-lg border border-red-500/20 text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">28GB</div>
              <div className="text-xs text-white/60">Memory needed</div>
            </div>
            <div className="p-4 glass rounded-lg border border-red-500/20 text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">Slow</div>
              <div className="text-xs text-white/60">On CPU</div>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
            <Check className="w-5 h-5" />
            {t(language, 'technical.challenge2.solution')}
          </h3>
          <p className="text-white/70 mb-4">{t(language, 'technical.challenge2.solutionDesc')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 glass rounded-lg border border-green-500/20">
              <h4 className="font-bold text-white mb-2">1. {t(language, 'technical.challenge2.quantization')}</h4>
              <p className="text-sm text-white/70 mb-2">{t(language, 'technical.challenge2.quantizationDesc')}</p>
              <div className="text-xs text-green-400">7B model: 28GB → 2-4GB ✨</div>
            </div>

            <div className="p-4 glass rounded-lg border border-green-500/20">
              <h4 className="font-bold text-white mb-2">2. {t(language, 'technical.challenge2.webgpu')}</h4>
              <p className="text-sm text-white/70 mb-2">{t(language, 'technical.challenge2.webgpuDesc')}</p>
              <div className="text-xs text-green-400">10-100x faster than CPU! 🚀</div>
            </div>
          </div>
        </div>

        {/* Real-World Example */}
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-3">{t(language, 'technical.challenge2.example')}</h3>
          <div className="p-4 glass rounded-lg border border-cyan-500/20">
            <h4 className="font-bold text-white mb-2">Phi-3.5 Mini (3.8B parameters)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Original size:</span>
                <span className="text-red-400">~15GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Quantized (Q4):</span>
                <span className="text-green-400">~2.3GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Compression:</span>
                <span className="text-cyan-400">~85% smaller!</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Performance loss:</span>
                <span className="text-yellow-400">~5-10% (acceptable!)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Solution? */}
      <div className="mb-8 p-6 sm:p-8 glass rounded-xl border border-yellow-500/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
          {t(language, 'technical.whyThisSolution.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 glass rounded-lg border border-green-500/20">
            <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
              <Check className="w-5 h-5" />
              {t(language, 'technical.whyThisSolution.benefits')}
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.benefit1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.benefit2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.benefit3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.benefit4')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.benefit5')}</span>
              </li>
            </ul>
          </div>

          <div className="p-4 glass rounded-lg border border-red-500/20">
            <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
              <X className="w-5 h-5" />
              {t(language, 'technical.whyThisSolution.tradeoffs')}
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.tradeoff1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.tradeoff2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.tradeoff3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>{t(language, 'technical.whyThisSolution.tradeoff4')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="mb-8 p-6 sm:p-8 glass rounded-xl border border-purple-500/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
          {t(language, 'technical.realWorld.title')}
        </h2>

        <div className="space-y-6">
          {/* Case Study 1 */}
          <div className="p-5 glass rounded-lg border border-cyan-500/20">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">{t(language, 'technical.realWorld.case1Title')}</h3>
            <p className="text-white/70 mb-3">{t(language, 'technical.realWorld.case1Desc')}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                {t(language, 'technical.realWorld.case1Tech1')}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                {t(language, 'technical.realWorld.case1Tech2')}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                {t(language, 'technical.realWorld.case1Tech3')}
              </span>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="p-5 glass rounded-lg border border-green-500/20">
            <h3 className="text-xl font-bold text-green-400 mb-3">{t(language, 'technical.realWorld.case2Title')}</h3>
            <p className="text-white/70 mb-3">{t(language, 'technical.realWorld.case2Desc')}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 border border-green-500/30 text-green-300">
                {t(language, 'technical.realWorld.case2Tech1')}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 border border-green-500/30 text-green-300">
                {t(language, 'technical.realWorld.case2Tech2')}
              </span>
            </div>
          </div>

          {/* Case Study 3 */}
          <div className="p-5 glass rounded-lg border border-purple-500/20">
            <h3 className="text-xl font-bold text-purple-400 mb-3">{t(language, 'technical.realWorld.case3Title')}</h3>
            <p className="text-white/70 mb-3">{t(language, 'technical.realWorld.case3Desc')}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                {t(language, 'technical.realWorld.case3Tech1')}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                {t(language, 'technical.realWorld.case3Tech2')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Stack */}
      <div className="mb-8 p-6 sm:p-8 glass rounded-xl border border-blue-500/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          {t(language, 'technical.stack.title')}
        </h2>

        <div className="space-y-4">
          <div className="p-4 glass rounded-lg border border-blue-500/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">Pyodide</h3>
                <p className="text-sm text-white/70 mb-2">{t(language, 'technical.stack.pyodideDesc')}</p>
                <code className="text-xs text-cyan-400">CPython → Emscripten → WebAssembly</code>
              </div>
            </div>
          </div>

          <div className="p-4 glass rounded-lg border border-purple-500/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">WebLLM (MLC AI)</h3>
                <p className="text-sm text-white/70 mb-2">{t(language, 'technical.stack.webllmDesc')}</p>
                <code className="text-xs text-cyan-400">TVM → Model Compilation → WebGPU</code>
              </div>
            </div>
          </div>

          <div className="p-4 glass rounded-lg border border-green-500/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">WebGPU</h3>
                <p className="text-sm text-white/70 mb-2">{t(language, 'technical.stack.webgpuDesc')}</p>
                <code className="text-xs text-cyan-400">Direct GPU access from JavaScript</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="p-6 sm:p-8 glass rounded-xl border border-cyan-500/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t(language, 'technical.conclusion.title')}</h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-4">
          {t(language, 'technical.conclusion.text1')}
        </p>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed">
          {t(language, 'technical.conclusion.text2')}
        </p>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-lg border border-cyan-500/30">
          <p className="text-center text-lg font-semibold text-gradient-neural">
            "{t(language, 'technical.conclusion.quote')}"
          </p>
        </div>
      </div>
    </div>
  );
}
