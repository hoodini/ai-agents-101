import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Rocket, Key, Code, Zap, BookOpen, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TutorialStep {
  id: number;
  icon: React.ReactNode;
  titleEn: string;
  titleHe: string;
  contentEn: React.ReactNode;
  contentHe: React.ReactNode;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    icon: <Rocket className="w-8 h-8 text-cyan-400" />,
    titleEn: "Welcome to AI Agents 101!",
    titleHe: "!ברוכים הבאים ל-AI Agents 101",
    contentEn: (
      <div className="space-y-4">
        <p className="text-white/90">
          This is an <strong>interactive learning platform</strong> where you'll build AI agents from scratch using real LLMs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 glass rounded-lg border border-cyan-500/30">
            <h4 className="font-bold text-cyan-400 mb-1">8 Progressive Labs</h4>
            <p className="text-sm text-white/70">Learn by building, step by step</p>
          </div>
          <div className="p-3 glass rounded-lg border border-purple-500/30">
            <h4 className="font-bold text-purple-400 mb-1">Browser Playground</h4>
            <p className="text-sm text-white/70">Run LLMs directly in your browser</p>
          </div>
          <div className="p-3 glass rounded-lg border border-pink-500/30">
            <h4 className="font-bold text-pink-400 mb-1">Real Code Examples</h4>
            <p className="text-sm text-white/70">Execute code in interactive cells</p>
          </div>
          <div className="p-3 glass rounded-lg border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-1">Track Progress</h4>
            <p className="text-sm text-white/70">Complete labs and earn badges</p>
          </div>
        </div>
      </div>
    ),
    contentHe: (
      <div className="space-y-4" dir="rtl">
        <p className="text-white/90">
          זוהי <strong>פלטפורמת למידה אינטראקטיבית</strong> שבה תבנו סוכני AI מאפס באמצעות LLMs אמיתיים.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 glass rounded-lg border border-cyan-500/30">
            <h4 className="font-bold text-cyan-400 mb-1">8 מעבדות מתקדמות</h4>
            <p className="text-sm text-white/70">למדו על ידי בנייה, צעד אחר צעד</p>
          </div>
          <div className="p-3 glass rounded-lg border border-purple-500/30">
            <h4 className="font-bold text-purple-400 mb-1">סביבת ניסוי בדפדפן</h4>
            <p className="text-sm text-white/70">הריצו LLMs ישירות בדפדפן</p>
          </div>
          <div className="p-3 glass rounded-lg border border-pink-500/30">
            <h4 className="font-bold text-pink-400 mb-1">דוגמאות קוד אמיתיות</h4>
            <p className="text-sm text-white/70">הריצו קוד בתאים אינטראקטיביים</p>
          </div>
          <div className="p-3 glass rounded-lg border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-1">מעקב אחר התקדמות</h4>
            <p className="text-sm text-white/70">השלימו מעבדות וקבלו תגים</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    icon: <Key className="w-8 h-8 text-purple-400" />,
    titleEn: "Choose Your LLM Provider",
    titleHe: "בחרו את ספק ה-LLM שלכם",
    contentEn: (
      <div className="space-y-4">
        <p className="text-white/90">
          You have <strong>3 options</strong> to run AI models. Each has different trade-offs:
        </p>

        <div className="space-y-3">
          {/* Groq */}
          <div className="p-4 glass rounded-lg border-2 border-cyan-500/40">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-cyan-400 text-lg">Groq (API-based)</h4>
              <span className="text-xs px-2 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded">FASTEST</span>
            </div>
            <p className="text-sm text-white/70 mb-3">Lightning-fast inference, great for real-time demos</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <p className="text-white/60"><strong>Models:</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>• Llama 3.1 8B (128K context)</li>
                  <li>• Llama 3.1 70B (128K context)</li>
                  <li>• Llama 3.3 70B (128K context)</li>
                  <li>• Mixtral 8x7B (32K context)</li>
                  <li>• Gemma2 9B (8K context)</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="text-white/60"><strong>Requirements:</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>✓ Free API key</li>
                  <li>✓ Internet connection</li>
                  <li>⚡ Ultra-fast responses</li>
                  <li>🔒 Data sent to Groq</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cohere */}
          <div className="p-4 glass rounded-lg border-2 border-purple-500/40">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-purple-400 text-lg">Cohere (API-based)</h4>
              <span className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded">RAG OPTIMIZED</span>
            </div>
            <p className="text-sm text-white/70 mb-3">Excellent for RAG and embeddings</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <p className="text-white/60"><strong>Models:</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>• Command A (128K context)</li>
                  <li>• Command R+ (128K context)</li>
                  <li>• Command R (128K context)</li>
                  <li>• Command (4K context)</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="text-white/60"><strong>Requirements:</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>✓ Free API key</li>
                  <li>✓ Internet connection</li>
                  <li>📚 Best for RAG tasks</li>
                  <li>🔒 Data sent to Cohere</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Browser LLM */}
          <div className="p-4 glass rounded-lg border-2 border-green-500/40">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-green-400 text-lg">Browser LLM (Local)</h4>
              <span className="text-xs px-2 py-1 bg-green-500/20 border border-green-500/40 rounded">100% PRIVATE</span>
            </div>
            <p className="text-sm text-white/70 mb-3">No API key needed, runs entirely in your browser</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <p className="text-white/60"><strong>Models:</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>• Phi-3.5 Mini (4K context, ~2.3GB)</li>
                  <li>• Llama 3.2 3B (128K context, ~1.9GB)</li>
                  <li>• Qwen 2.5 3B (32K context, ~2.0GB)</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="text-white/60"><strong>Requirements:</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>✓ NO API key!</li>
                  <li>📥 One-time download</li>
                  <li>🔐 100% private</li>
                  <li>💻 Works offline</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-sm text-cyan-100">
            <strong>💡 Recommendation:</strong> Start with Groq (fastest setup) or Browser LLM (no API key needed).
          </p>
        </div>
      </div>
    ),
    contentHe: (
      <div className="space-y-4" dir="rtl">
        <p className="text-white/90">
          יש לכם <strong>3 אפשרויות</strong> להרצת מודלי AI. לכל אחת יתרונות וחסרונות:
        </p>

        <div className="space-y-3">
          {/* Groq */}
          <div className="p-4 glass rounded-lg border-2 border-cyan-500/40">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-cyan-400 text-lg">Groq (מבוסס API)</h4>
              <span className="text-xs px-2 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded">הכי מהיר</span>
            </div>
            <p className="text-sm text-white/70 mb-3">מהירות בזק, מעולה להדגמות בזמן אמת</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <p className="text-white/60"><strong>:מודלים</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>Llama 3.1 8B (הקשר 128K) •</li>
                  <li>Llama 3.1 70B (הקשר 128K) •</li>
                  <li>Llama 3.3 70B (הקשר 128K) •</li>
                  <li>Mixtral 8x7B (הקשר 32K) •</li>
                  <li>Gemma2 9B (הקשר 8K) •</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="text-white/60"><strong>:דרישות</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>מפתח API חינמי ✓</li>
                  <li>חיבור לאינטרנט ✓</li>
                  <li>תגובות מהירות במיוחד ⚡</li>
                  <li>נתונים נשלחים ל-Groq 🔒</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cohere */}
          <div className="p-4 glass rounded-lg border-2 border-purple-500/40">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-purple-400 text-lg">Cohere (מבוסס API)</h4>
              <span className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded">מותאם ל-RAG</span>
            </div>
            <p className="text-sm text-white/70 mb-3">מעולה עבור RAG ו-embeddings</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <p className="text-white/60"><strong>:מודלים</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>Command A (הקשר 128K) •</li>
                  <li>Command R+ (הקשר 128K) •</li>
                  <li>Command R (הקשר 128K) •</li>
                  <li>Command (הקשר 4K) •</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="text-white/60"><strong>:דרישות</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>מפתח API חינמי ✓</li>
                  <li>חיבור לאינטרנט ✓</li>
                  <li>הכי טוב למשימות RAG 📚</li>
                  <li>נתונים נשלחים ל-Cohere 🔒</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Browser LLM */}
          <div className="p-4 glass rounded-lg border-2 border-green-500/40">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-green-400 text-lg">Browser LLM (מקומי)</h4>
              <span className="text-xs px-2 py-1 bg-green-500/20 border border-green-500/40 rounded">100% פרטי</span>
            </div>
            <p className="text-sm text-white/70 mb-3">לא צריך מפתח API, רץ לגמרי בדפדפן</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <p className="text-white/60"><strong>:מודלים</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>Phi-3.5 Mini (הקשר 4K, ~2.3GB) •</li>
                  <li>Llama 3.2 3B (הקשר 128K, ~1.9GB) •</li>
                  <li>Qwen 2.5 3B (הקשר 32K, ~2.0GB) •</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="text-white/60"><strong>:דרישות</strong></p>
                <ul className="text-white/50 space-y-0.5">
                  <li>!בלי מפתח API ✓</li>
                  <li>הורדה חד-פעמית 📥</li>
                  <li>פרטיות מלאה 🔐</li>
                  <li>עובד ללא אינטרנט 💻</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-sm text-cyan-100">
            <strong>:💡 המלצה</strong> התחילו עם Groq (הכי מהיר להתקנה) או Browser LLM (בלי צורך במפתח API).
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    icon: <Code className="w-8 h-8 text-pink-400" />,
    titleEn: "How to Set Up Your API Key",
    titleHe: "כיצד להגדיר את מפתח ה-API שלכם",
    contentEn: (
      <div className="space-y-4">
        <p className="text-white/90">Setting up takes just 2 minutes:</p>

        <div className="space-y-3">
          <div className="p-4 glass rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full text-sm font-bold">1</span>
              <h4 className="font-bold text-white">Click "API Config" Button</h4>
            </div>
            <p className="text-sm text-white/70 ml-9">Look for the settings button in the top navigation bar</p>
          </div>

          <div className="p-4 glass rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full text-sm font-bold">2</span>
              <h4 className="font-bold text-white">Choose Your Provider</h4>
            </div>
            <p className="text-sm text-white/70 ml-9">
              Select Groq, Cohere, or Browser LLM. For Browser LLM, skip to step 4!
            </p>
          </div>

          <div className="p-4 glass rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full text-sm font-bold">3</span>
              <h4 className="font-bold text-white">Get Free API Key</h4>
            </div>
            <p className="text-sm text-white/70 ml-9 mb-2">Click the link to get your free API key:</p>
            <ul className="text-sm text-white/60 ml-9 space-y-1">
              <li>• <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Groq API Keys</a></li>
              <li>• <a href="https://dashboard.cohere.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Cohere API Keys</a></li>
            </ul>
          </div>

          <div className="p-4 glass rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full text-sm font-bold">4</span>
              <h4 className="font-bold text-white">Validate & Save</h4>
            </div>
            <p className="text-sm text-white/70 ml-9">
              Paste your API key (or just click Validate for Browser LLM), then click "Save & Continue"
            </p>
          </div>
        </div>

        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm text-green-100">
            <strong>🔒 Privacy:</strong> Your API key is stored securely in your browser's local storage and never sent anywhere except to the provider you chose.
          </p>
        </div>
      </div>
    ),
    contentHe: (
      <div className="space-y-4" dir="rtl">
        <p className="text-white/90">ההגדרה לוקחת רק 2 דקות:</p>

        <div className="space-y-3">
          <div className="p-4 glass rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full text-sm font-bold">1</span>
              <h4 className="font-bold text-white">"לחצו על כפתור "הגדרות API</h4>
            </div>
            <p className="text-sm text-white/70 mr-9">חפשו את כפתור ההגדרות בסרגל הניווט העליון</p>
          </div>

          <div className="p-4 glass rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full text-sm font-bold">2</span>
              <h4 className="font-bold text-white">בחרו את הספק שלכם</h4>
            </div>
            <p className="text-sm text-white/70 mr-9">
              !בחרו Groq, Cohere, או Browser LLM. עבור Browser LLM, דלגו לשלב 4
            </p>
          </div>

          <div className="p-4 glass rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full text-sm font-bold">3</span>
              <h4 className="font-bold text-white">קבלו מפתח API חינמי</h4>
            </div>
            <p className="text-sm text-white/70 mr-9 mb-2">:לחצו על הקישור כדי לקבל מפתח API חינמי</p>
            <ul className="text-sm text-white/60 mr-9 space-y-1">
              <li>• <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">מפתחות Groq API</a></li>
              <li>• <a href="https://dashboard.cohere.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">מפתחות Cohere API</a></li>
            </ul>
          </div>

          <div className="p-4 glass rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full text-sm font-bold">4</span>
              <h4 className="font-bold text-white">אמתו ושמרו</h4>
            </div>
            <p className="text-sm text-white/70 mr-9">
              "הדביקו את מפתח ה-API שלכם (או פשוט לחצו אמת עבור Browser LLM), ואז לחצו "שמור והמשך
            </p>
          </div>
        </div>

        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm text-green-100">
            <strong>:🔒 פרטיות</strong> מפתח ה-API שלכם נשמר בצורה מאובטחת באחסון המקומי של הדפדפן ולעולם לא נשלח לשום מקום מלבד לספק שבחרתם.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    icon: <BookOpen className="w-8 h-8 text-cyan-400" />,
    titleEn: "Navigate the 8 Labs",
    titleHe: "ניווט בין 8 המעבדות",
    contentEn: (
      <div className="space-y-4">
        <p className="text-white/90">
          The course is structured as <strong>8 progressive labs</strong>. Each builds on the previous one:
        </p>

        <div className="space-y-2 text-sm">
          <div className="p-3 glass rounded-lg border-l-4 border-cyan-500">
            <strong className="text-cyan-400">Lab 1:</strong> <span className="text-white/80">Understanding AI Agent Components</span>
            <p className="text-white/60 text-xs mt-1">Learn the 3 core parts: LLM, Tools, Memory</p>
          </div>

          <div className="p-3 glass rounded-lg border-l-4 border-purple-500">
            <strong className="text-purple-400">Lab 2:</strong> <span className="text-white/80">Simple Prompt/Response Agent</span>
            <p className="text-white/60 text-xs mt-1">Your first working agent!</p>
          </div>

          <div className="p-3 glass rounded-lg border-l-4 border-pink-500">
            <strong className="text-pink-400">Lab 3:</strong> <span className="text-white/80">Custom System Prompts</span>
            <p className="text-white/60 text-xs mt-1">Give your agent personality and instructions</p>
          </div>

          <div className="p-3 glass rounded-lg border-l-4 border-green-500">
            <strong className="text-green-400">Lab 4:</strong> <span className="text-white/80">Conversation Memory</span>
            <p className="text-white/60 text-xs mt-1">Make agents remember past conversations</p>
          </div>

          <div className="p-3 glass rounded-lg border-l-4 border-yellow-500">
            <strong className="text-yellow-400">Lab 5:</strong> <span className="text-white/80">Knowledge Base Integration</span>
            <p className="text-white/60 text-xs mt-1">Connect external data sources</p>
          </div>

          <div className="p-3 glass rounded-lg border-l-4 border-blue-500">
            <strong className="text-blue-400">Lab 6:</strong> <span className="text-white/80">RAG with Wikipedia</span>
            <p className="text-white/60 text-xs mt-1">Embeddings & vector search</p>
          </div>

          <div className="p-3 glass rounded-lg border-l-4 border-red-500">
            <strong className="text-red-400">Lab 7:</strong> <span className="text-white/80">Multi-Agent Collaboration</span>
            <p className="text-white/60 text-xs mt-1">Multiple agents working together</p>
          </div>

          <div className="p-3 glass rounded-lg border-l-4 border-orange-500">
            <strong className="text-orange-400">Lab 8:</strong> <span className="text-white/80">Orchestrator Agent</span>
            <p className="text-white/60 text-xs mt-1">Master agent that coordinates others</p>
          </div>
        </div>

        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-purple-100">
            <strong>💡 Tip:</strong> Each lab has interactive code cells. Edit the code and run it to see how changes affect behavior!
          </p>
        </div>
      </div>
    ),
    contentHe: (
      <div className="space-y-4" dir="rtl">
        <p className="text-white/90">
          :הקורס מובנה כ-<strong>8 מעבדות מתקדמות</strong>. כל אחת בנויה על הקודמת
        </p>

        <div className="space-y-2 text-sm">
          <div className="p-3 glass rounded-lg border-r-4 border-cyan-500">
            <strong className="text-cyan-400">:מעבדה 1</strong> <span className="text-white/80">הבנת רכיבי סוכן AI</span>
            <p className="text-white/60 text-xs mt-1">LLM, Tools, Memory :למדו את 3 החלקים המרכזיים</p>
          </div>

          <div className="p-3 glass rounded-lg border-r-4 border-purple-500">
            <strong className="text-purple-400">:מעבדה 2</strong> <span className="text-white/80">סוכן פשוט של שאלה/תשובה</span>
            <p className="text-white/60 text-xs mt-1">!הסוכן העובד הראשון שלכם</p>
          </div>

          <div className="p-3 glass rounded-lg border-r-4 border-pink-500">
            <strong className="text-pink-400">:מעבדה 3</strong> <span className="text-white/80">הנחיות מערכת מותאמות אישית</span>
            <p className="text-white/60 text-xs mt-1">תנו לסוכן שלכם אישיות והוראות</p>
          </div>

          <div className="p-3 glass rounded-lg border-r-4 border-green-500">
            <strong className="text-green-400">:מעבדה 4</strong> <span className="text-white/80">זיכרון שיחה</span>
            <p className="text-white/60 text-xs mt-1">גרמו לסוכנים לזכור שיחות קודמות</p>
          </div>

          <div className="p-3 glass rounded-lg border-r-4 border-yellow-500">
            <strong className="text-yellow-400">:מעבדה 5</strong> <span className="text-white/80">אינטגרציה של מאגר ידע</span>
            <p className="text-white/60 text-xs mt-1">חברו מקורות נתונים חיצוניים</p>
          </div>

          <div className="p-3 glass rounded-lg border-r-4 border-blue-500">
            <strong className="text-blue-400">:מעבדה 6</strong> <span className="text-white/80">RAG עם ויקיפדיה</span>
            <p className="text-white/60 text-xs mt-1">Embeddings וחיפוש וקטורי</p>
          </div>

          <div className="p-3 glass rounded-lg border-r-4 border-red-500">
            <strong className="text-red-400">:מעבדה 7</strong> <span className="text-white/80">שיתוף פעולה רב-סוכני</span>
            <p className="text-white/60 text-xs mt-1">מספר סוכנים עובדים ביחד</p>
          </div>

          <div className="p-3 glass rounded-lg border-r-4 border-orange-500">
            <strong className="text-orange-400">:מעבדה 8</strong> <span className="text-white/80">סוכן מתאם</span>
            <p className="text-white/60 text-xs mt-1">סוכן ראשי שמתאם אחרים</p>
          </div>
        </div>

        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-purple-100">
            <strong>:💡 טיפ</strong> לכל מעבדה יש תאי קוד אינטראקטיביים. ערכו את הקוד והריצו אותו כדי לראות איך שינויים משפיעים על ההתנהגות!
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    titleEn: "Browser Playground Features",
    titleHe: "תכונות סביבת הניסוי בדפדפן",
    contentEn: (
      <div className="space-y-4">
        <p className="text-white/90">
          The <strong>"Run LLM in Browser"</strong> page lets you experiment without any API keys:
        </p>

        <div className="space-y-3">
          <div className="p-4 glass rounded-lg border border-purple-500/30">
            <h4 className="font-bold text-purple-400 mb-2">🎨 Pre-Made Templates</h4>
            <p className="text-sm text-white/70 mb-2">Click-to-load code examples covering:</p>
            <ul className="text-sm text-white/60 space-y-1 ml-4">
              <li>• Sentiment Analysis</li>
              <li>• Language Translation</li>
              <li>• Story Generation</li>
              <li>• Code Explanation</li>
              <li>• Quiz Creation</li>
              <li>• Multi-turn Conversations</li>
            </ul>
          </div>

          <div className="p-4 glass rounded-lg border border-cyan-500/30">
            <h4 className="font-bold text-cyan-400 mb-2">🐍 Python + LLM</h4>
            <p className="text-sm text-white/70">
              Write Python code that calls the LLM using <code className="px-1 py-0.5 bg-white/10 rounded">await js.callLLM(prompt)</code>
            </p>
          </div>

          <div className="p-4 glass rounded-lg border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-2">💻 Runs 100% in Browser</h4>
            <p className="text-sm text-white/70">
              Pyodide (Python in WebAssembly) + WebLLM = fully client-side AI development
            </p>
          </div>

          <div className="p-4 glass rounded-lg border border-pink-500/30">
            <h4 className="font-bold text-pink-400 mb-2">📥 One-Time Download</h4>
            <p className="text-sm text-white/70">
              First run downloads the model (~2GB). After that, it's cached and runs offline!
            </p>
          </div>
        </div>

        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-100">
            <strong>⚡ Pro Tip:</strong> Browser models are slower than API-based ones but perfect for learning and experimentation!
          </p>
        </div>
      </div>
    ),
    contentHe: (
      <div className="space-y-4" dir="rtl">
        <p className="text-white/90">
          :עמוד <strong>"הרצת LLM בדפדפן"</strong> מאפשר לכם להתנסות ללא כל מפתחות API
        </p>

        <div className="space-y-3">
          <div className="p-4 glass rounded-lg border border-purple-500/30">
            <h4 className="font-bold text-purple-400 mb-2">🎨 תבניות מוכנות מראש</h4>
            <p className="text-sm text-white/70 mb-2">:דוגמאות קוד מוכנות להעתקה המכסות</p>
            <ul className="text-sm text-white/60 space-y-1 mr-4">
              <li>ניתוח סנטימנט •</li>
              <li>תרגום שפות •</li>
              <li>יצירת סיפורים •</li>
              <li>הסבר קוד •</li>
              <li>יצירת חידונים •</li>
              <li>שיחות רב-תוריות •</li>
            </ul>
          </div>

          <div className="p-4 glass rounded-lg border border-cyan-500/30">
            <h4 className="font-bold text-cyan-400 mb-2">🐍 Python + LLM</h4>
            <p className="text-sm text-white/70">
              כתבו קוד Python שקורא ל-LLM באמצעות <code className="px-1 py-0.5 bg-white/10 rounded">await js.callLLM(prompt)</code>
            </p>
          </div>

          <div className="p-4 glass rounded-lg border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-2">💻 רץ 100% בדפדפן</h4>
            <p className="text-sm text-white/70">
              Pyodide (Python ב-WebAssembly) + WebLLM = פיתוח AI מלא בצד הלקוח
            </p>
          </div>

          <div className="p-4 glass rounded-lg border border-pink-500/30">
            <h4 className="font-bold text-pink-400 mb-2">📥 הורדה חד-פעמית</h4>
            <p className="text-sm text-white/70">
              !ההרצה הראשונה מורידה את המודל (~2GB). אחרי זה, הוא נשמר במטמון ורץ ללא אינטרנט
            </p>
          </div>
        </div>

        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-100">
            <strong>:⚡ טיפ מקצועי</strong> מודלי דפדפן יותר איטיים ממודלים מבוססי API אבל מושלמים ללימוד ולניסויים!
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    titleEn: "Ready to Start!",
    titleHe: "!מוכנים להתחיל",
    contentEn: (
      <div className="space-y-4">
        <p className="text-white/90 text-lg">
          You're all set! Here's your quick start checklist:
        </p>

        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">Set up your API key or choose Browser LLM</span>
          </label>

          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">Start with Lab 1 to understand the basics</span>
          </label>

          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">Edit and run code in each lab</span>
          </label>

          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">Try the Browser Playground with pre-made templates</span>
          </label>

          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">Complete all 8 labs and become an AI Agent expert!</span>
          </label>
        </div>

        <div className="p-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-2 border-cyan-500/40 rounded-xl">
          <p className="text-white text-center font-bold text-lg mb-2">
            🚀 Happy Learning!
          </p>
          <p className="text-white/70 text-center text-sm">
            Created by <a href="https://yuv.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Yuval Avidani</a> • Founder of YUV.AI
          </p>
        </div>
      </div>
    ),
    contentHe: (
      <div className="space-y-4" dir="rtl">
        <p className="text-white/90 text-lg">
          :!אתם מוכנים! הנה רשימת הבדיקות שלכם להתחלה מהירה
        </p>

        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">הגדירו את מפתח ה-API שלכם או בחרו Browser LLM</span>
          </label>

          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">התחילו עם מעבדה 1 כדי להבין את היסודות</span>
          </label>

          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">ערכו והריצו קוד בכל מעבדה</span>
          </label>

          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">נסו את סביבת הניסוי בדפדפן עם תבניות מוכנות מראש</span>
          </label>

          <label className="flex items-start gap-3 p-3 glass rounded-lg border border-white/20 cursor-pointer hover:border-cyan-500/50 transition-all">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/30" />
            <span className="text-white/90">!השלימו את כל 8 המעבדות והפכו למומחי סוכני AI</span>
          </label>
        </div>

        <div className="p-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-2 border-cyan-500/40 rounded-xl">
          <p className="text-white text-center font-bold text-lg mb-2">
            !🚀 למידה מהנה
          </p>
          <p className="text-white/70 text-center text-sm">
            נוצר על ידי <a href="https://yuv.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">יובל אבידני</a> • מייסד YUV.AI
          </p>
        </div>
      </div>
    ),
  },
];

export function OnboardingTutorial({ isOpen, onClose }: OnboardingTutorialProps) {
  const { language } = useStore();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = tutorialSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-auto">
      <div className="relative max-w-4xl w-full max-h-[95vh] overflow-y-auto pointer-events-auto">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl pointer-events-none -z-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative holo-border rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/95 via-blue-900/40 to-purple-900/40 backdrop-blur-xl shadow-2xl border-2 border-cyan-500/30 pointer-events-auto">
          {/* Header */}
          <div className="sticky top-0 backdrop-blur-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/30 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg shadow-lg">
                {step.icon}
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold heading-font neon-cyan tracking-wider">
                  {language === 'he' ? step.titleHe : step.titleEn}
                </h2>
                <p className="text-xs text-white/60">
                  {language === 'he'
                    ? `שלב ${currentStep + 1} מתוך ${tutorialSteps.length}`
                    : `Step ${currentStep + 1} of ${tutorialSteps.length}`
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 glass hover:glass-strong rounded-lg transition-all hover-lift border border-white/10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 min-h-[400px]">
            {language === 'he' ? step.contentHe : step.contentEn}
          </div>

          {/* Footer Navigation */}
          <div className="sticky bottom-0 backdrop-blur-md bg-gradient-to-r from-slate-900/90 to-slate-800/90 border-t border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between rounded-b-xl sm:rounded-b-2xl">
            <button
              onClick={prevStep}
              disabled={isFirstStep}
              className="flex items-center gap-2 px-4 py-2 glass hover:glass-strong rounded-lg transition-all hover-lift disabled:opacity-40 disabled:cursor-not-allowed border border-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'he' ? 'הקודם' : 'Previous'}
              </span>
            </button>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {tutorialSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-cyan-400 w-8 shadow-neural'
                      : index < currentStep
                      ? 'bg-green-400'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {isLastStep ? (
              <button
                onClick={handleClose}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 rounded-lg transition-all hover-lift shadow-lg font-bold"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{language === 'he' ? 'התחל ללמוד!' : "Let's Start!"}</span>
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-lg transition-all hover-lift shadow-lg font-bold"
              >
                <span className="hidden sm:inline">
                  {language === 'he' ? 'הבא' : 'Next'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
