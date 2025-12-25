import { BookOpen, Network } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { celebrateCompletion } from '../utils/confetti';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import type { ExecutionResult } from '../types';

const TOTAL_LABS = 8;

export function Lab8() {
  const { apiKey, provider, selectedModel, markLabCompleteAndAdvance } = useStore();

  const getBaseConfig = () => {
    if (provider === 'groq') {
      return `
  configuration: {
    baseURL: 'https://api.groq.com/openai/v1',
  },`;
    }
    if (provider === 'cohere') {
      return `
  configuration: {
    baseURL: 'https://api.cohere.com/v1',
  },`;
    }
    return '';
  };

  const step1Code = `// Step 1: Understand orchestrator concept
// An orchestrator agent:
// 1. Receives user request
// 2. Analyzes the request type
// 3. Routes to the appropriate specialist agent
// 4. Returns the specialist's response

console.log('✓ Orchestrator = Smart Router');
console.log('✓ Routes requests to right specialist');
console.log('✓ Like a manager delegating tasks');`;

  const step2Code = `// Step 2: Create routing logic
const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

const userQuery = "What are the benefits of AI agents?";

// Router analyzes query and decides which agent to use
const routerMessages = [
  new SystemMessage(\`You are a router. Analyze the query and respond with ONLY one word:
- "TECHNICAL" for technical/implementation questions
- "BUSINESS" for business/strategy questions
- "GENERAL" for general information\`),
  new HumanMessage(userQuery)
];

const routing = await llm.invoke(routerMessages);

console.log('Query:', userQuery);
console.log('Route to:', routing.content, 'agent');`;

  const step3Code = `// Step 3: Complete orchestrator with routing
const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

const userQuery = "How do I implement an AI agent with memory?";

// Step 1: Router decides which specialist
const routerMessages = [
  new SystemMessage(\`You are a router. Respond with ONLY:
- "TECHNICAL" for technical/implementation questions
- "BUSINESS" for business/strategy questions\`),
  new HumanMessage(userQuery)
];
const routing = await llm.invoke(routerMessages);

// Step 2: Route to appropriate specialist
let specialistMessages;
if (routing.content.includes('TECHNICAL')) {
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

console.log('Query:', userQuery);
console.log('Routed to:', routing.content);
console.log('');
console.log('Specialist Response:');
console.log(response.content);`;

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
      if (!apiKey) {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey, provider, selectedModel);

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
      if (!apiKey) {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey, provider, selectedModel);

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

      celebrateCompletion();
      markLabCompleteAndAdvance(8, TOTAL_LABS);

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
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="mb-8 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
        <img
          src="/lab8-hero.jpg"
          alt="Lab 8: Orchestrator Agent"
          className="w-full h-auto"
        />
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 8: Orchestrator Agent
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Intelligent routing to specialist agents
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
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

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            1
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
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

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            2
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
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

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg animate-pulse-glow">
            3
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
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

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
        <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
          🎯 Orchestrator Use Cases
        </h3>
        <ul className="space-y-2 text-amber-800 dark:text-amber-200 text-sm">
          <li>✓ <strong>Customer Support:</strong> Route to billing, technical, or sales specialists</li>
          <li>✓ <strong>Content Creation:</strong> Route to research, writing, or editing agents</li>
          <li>✓ <strong>Data Analysis:</strong> Route to SQL, visualization, or reporting agents</li>
          <li>✓ <strong>Complex Workflows:</strong> Coordinate multi-step processes efficiently</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Congratulations - You're an AI Agent Expert!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-sm mb-3">
          You've completed all 8 labs! You now understand:
        </p>
        <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm list-disc list-inside">
          <li>AI Agent components (LLM, Tools, Memory)</li>
          <li>Prompt/Response patterns</li>
          <li>System prompts and personality</li>
          <li>Conversation memory</li>
          <li>Knowledge base integration</li>
          <li>RAG (Retrieval-Augmented Generation)</li>
          <li>Multi-agent collaboration</li>
          <li>Orchestrator patterns</li>
        </ul>
        <p className="text-green-800 dark:text-green-200 text-sm mt-3">
          You're ready to build production AI agent systems! 🚀
        </p>
      </div>
      <CompleteLabButton labId={8} />
    </div>
  );
}
