import { BookOpen, Network } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { celebrateCompletion } from '../utils/confetti';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import type { ExecutionResult } from '../types';

export function Lab8() {
  const { providers, activeProvider, selectedModel, markLabComplete } = useStore();
  const apiKey = providers[activeProvider].apiKey;

  const getLLMClass = () => {
    if (activeProvider === 'browser') return 'WebLLM';
    return 'ChatCohere';
  };

  const getLLMInit = () => {
    if (activeProvider === 'browser') {
      return `// Browser LLM - runs locally, no API key needed!
const engine = await webllm.CreateMLCEngine('${selectedModel}');
const llm = {
  invoke: async (messages) => {
    const reply = await engine.chat.completions.create({ messages });
    return { content: reply.choices[0].message.content };
  }
}`;
    }
    return `const llm = new ${getLLMClass()}({
  apiKey: process.env.COHERE_API_KEY, // ${apiKey ? '✓ API key configured' : '⚠️ Configure your API key in Settings'}
  model: '${selectedModel}',
})`;
  };

  const step1Code = `// Step 1: Understand the Orchestrator Pattern
// An orchestrator is like a SMART MANAGER that delegates work to specialists

// Think of it like a customer service center:
// - Customer asks a question
// - Manager (orchestrator) analyzes: "Is this billing? Technical? Sales?"
// - Manager routes to the RIGHT specialist
// - Specialist answers the question
// - Manager returns the answer to customer

// An orchestrator agent does exactly this:
// 1. RECEIVES: User request comes in
// 2. ANALYZES: What type of request is this? (using the LLM's intelligence!)
// 3. ROUTES: Sends to the appropriate specialist agent
// 4. RETURNS: Sends the specialist's response back

// Why use an orchestrator?
// ✓ Scalability: Easy to add new specialist agents
// ✓ Efficiency: Each specialist focuses on what they do best
// ✓ Accuracy: Better results from focused experts vs. generalist
// ✓ Maintainability: Update one specialist without affecting others

console.log('✓ Orchestrator = Smart Router');
console.log('✓ Routes requests to right specialist');
console.log('✓ Like a manager delegating tasks');

// Real-world use cases:
// - Customer support (billing, tech, sales specialists)
// - Content creation (research, writing, editing specialists)
// - Data analysis (SQL, visualization, reporting specialists)
// - Development tools (code review, testing, documentation specialists)`;

  const step2Code = `// Step 2: Build the Router - The "Brain" of the Orchestrator
// The router's job is to CLASSIFY the user's request and decide where to send it

${getLLMInit()};

// Example user query
const userQuery = "What are the benefits of AI agents?";

// ========== THE ROUTER AGENT ==========
// This is a CLASSIFICATION agent - it categorizes the query
// Notice the system prompt gives VERY SPECIFIC instructions:
// - Respond with ONLY one word (makes parsing easy!)
// - Clear categories with descriptions (helps LLM decide accurately)

const routerMessages = [
  new SystemMessage(\`You are a router. Analyze the query and respond with ONLY one word:
- "TECHNICAL" for technical/implementation questions
- "BUSINESS" for business/strategy questions
- "GENERAL" for general information\`),

  // The user's actual query
  new HumanMessage(userQuery)
];

// Execute the routing decision
// The LLM will analyze the query and return one of: TECHNICAL, BUSINESS, or GENERAL
const routing = await llm.invoke(routerMessages);

// Display the routing decision
console.log('Query:', userQuery);
console.log('Route to:', routing.content, 'agent');

// Key insights:
// 1. The router itself is an LLM agent with a specialized prompt
// 2. We use the LLM's natural language understanding for smart routing
// 3. Clear, constrained output format (one word) makes it reliable
// 4. In production, you might add validation: if (routing.content !== 'TECHNICAL' && ...)

// Alternative routing approaches:
// - Keyword matching (simpler but less flexible)
// - Embeddings + similarity (more sophisticated)
// - Rule-based logic (fastest but least intelligent)
// - LLM routing (what we're using - good balance of intelligence & simplicity)`;

  const step3Code = `// Step 3: Complete Orchestrator System - Full End-to-End Flow!
// This brings it all together: Router → Specialist → Response

${getLLMInit()};

// The user's question
const userQuery = "How do I implement an AI agent with memory?";

// ========== STEP 1: ROUTING PHASE ==========
// The router agent analyzes the query to determine which specialist should handle it
const routerMessages = [
  // Router system prompt: Clear categories and instructions
  new SystemMessage(\`You are a router. Respond with ONLY:
- "TECHNICAL" for technical/implementation questions
- "BUSINESS" for business/strategy questions\`),

  // The user's query
  new HumanMessage(userQuery)
];

// Router makes the decision
const routing = await llm.invoke(routerMessages);

// ========== STEP 2: SPECIALIST SELECTION ==========
// Based on the router's decision, we select the appropriate specialist
// This is where the "orchestration" happens!

let specialistMessages;

// Check what the router decided (using .includes() for robustness)
if (routing.content.includes('TECHNICAL')) {
  // TECHNICAL SPECIALIST: Focused on implementation details and code
  specialistMessages = [
    new SystemMessage("You are a technical AI expert. Provide code examples and implementation details."),
    new HumanMessage(userQuery)
  ];
} else {
  // BUSINESS SPECIALIST: Focused on ROI and business value
  specialistMessages = [
    new SystemMessage("You are a business AI strategist. Focus on ROI and business value."),
    new HumanMessage(userQuery)
  ];
}

// ========== STEP 3: SPECIALIST EXECUTION ==========
// The selected specialist processes the query
const response = await llm.invoke(specialistMessages);

// ========== STEP 4: RETURN RESULTS ==========
// Display the complete orchestration flow
console.log('Query:', userQuery);
console.log('Routed to:', routing.content);
console.log('');
console.log('Specialist Response:');
console.log(response.content);

// ========== KEY TAKEAWAYS ==========
// 1. ONE LLM call for routing (fast classification)
// 2. ONE LLM call for specialist work (focused expertise)
// 3. Total: 2 LLM calls, but each is optimized for its task!
// 4. Easy to extend: Just add more specialists and routing rules

// Production enhancements you might add:
// - Error handling: What if routing fails?
// - Fallback specialist: Default if routing is unclear
// - Confidence scoring: Router returns confidence level
// - Multi-routing: Some queries go to multiple specialists
// - Caching: Cache routing decisions for similar queries
// - Logging: Track which specialist handles which queries (analytics!)`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      return {
        output: '✓ Orchestrator = Smart Router\n✓ Routes requests to right specialist\n✓ Like a manager delegating tasks',
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      };
    }
  };

  const executeStep2 = async (): Promise<ExecutionResult> => {
    try {
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);

      const userQuery = "What are the benefits of AI agents?";

      const routerMessages = [
        new SystemMessage(`You are a router. Analyze the query and respond with ONLY one word:
- "TECHNICAL" for technical/implementation questions
- "BUSINESS" for business/strategy questions
- "GENERAL" for general information`),
        new HumanMessage(userQuery)
      ];

      const routing = await llm.invoke(routerMessages);

      return {
        output: `Query: ${userQuery}\nRoute to: ${routing.content} agent`,
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      };
    }
  };

  const executeStep3 = async (): Promise<ExecutionResult> => {
    try {
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);

      const userQuery = "How do I implement an AI agent with memory?";

      const routerMessages = [
        new SystemMessage(`You are a router. Respond with ONLY:
- "TECHNICAL" for technical/implementation questions
- "BUSINESS" for business/strategy questions`),
        new HumanMessage(userQuery)
      ];
      const routing = await llm.invoke(routerMessages);

      let specialistMessages;
      if (routing.content.toString().includes('TECHNICAL')) {
        specialistMessages = [
          new SystemMessage("You are a technical AI expert. Provide code examples and implementation details."),
          new HumanMessage(userQuery)
        ];
      } else {
        specialistMessages = [
          new SystemMessage("You are a business AI strategist. Focus on ROI and business value."),
          new HumanMessage(userQuery)
        ];
      }

      const response = await llm.invoke(specialistMessages);

      // Mark lab complete and show celebration
      markLabComplete(8);
      celebrateCompletion();

      return {
        output: `Query: ${userQuery}\nRouted to: ${routing.content}\n\nSpecialist Response:\n${response.content}`,
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in w-full">
      <div className="hero-image-container mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
        <img
          src="/lab8-hero.jpg"
          alt="Lab 8: Orchestrator Agent"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg flex-shrink-0">
            <Network className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 8: Orchestrator Agent
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Intelligent routing to specialist agents
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Creating an orchestrator/router agent</li>
              <li>Analyzing user intent to route requests</li>
              <li>Connecting multiple specialist agents</li>
              <li>Building intelligent agent architectures</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            1
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Orchestrator Concept
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-concept"
          initialCode={step1Code}
          description="Understanding the orchestrator pattern"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Router Logic
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-router"
          initialCode={step2Code}
          description="Analyze queries and route to the right specialist"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg animate-pulse-glow">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Complete Orchestrator
          </h2>
        </div>
        <TerminalCodeCell
          title="complete-orchestrator"
          initialCode={step3Code}
          description="Full orchestrator system with routing and specialists!"
          onExecute={executeStep3}
        />
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-amber-200 dark:border-amber-800">
        <h3 className="text-sm sm:text-base font-semibold text-amber-900 dark:text-amber-100 mb-3">
          🎯 Orchestrator Use Cases
        </h3>
        <ul className="space-y-2 text-amber-800 dark:text-amber-200 text-xs sm:text-sm">
          <li>✓ <strong>Customer Support:</strong> Route to billing, technical, or sales specialists</li>
          <li>✓ <strong>Content Creation:</strong> Route to research, writing, or editing agents</li>
          <li>✓ <strong>Data Analysis:</strong> Route to SQL, visualization, or reporting agents</li>
          <li>✓ <strong>Complex Workflows:</strong> Coordinate multi-step processes efficiently</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Congratulations - You're an AI Agent Expert!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm mb-3">
          You've completed all 8 labs! You now understand:
        </p>
        <ul className="space-y-1 text-green-800 dark:text-green-200 text-xs sm:text-sm list-disc list-inside">
          <li>AI Agent components (LLM, Tools, Memory)</li>
          <li>Prompt/Response patterns</li>
          <li>System prompts and personality</li>
          <li>Conversation memory</li>
          <li>Knowledge base integration</li>
          <li>RAG (Retrieval-Augmented Generation)</li>
          <li>Multi-agent collaboration</li>
          <li>Orchestrator patterns</li>
        </ul>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm mt-3">
          You're ready to build production AI agent systems! 🚀
        </p>
      </div>
      <CompleteLabButton labId={8} />
    </div>
  );
}
