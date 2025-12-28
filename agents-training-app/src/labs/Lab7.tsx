import { BookOpen, Users } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { celebrateCompletion } from '../utils/confetti';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import type { ExecutionResult } from '../types';

export function Lab7() {
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

  const step1Code = `// Step 1: Create specialized agents with different roles
// In multi-agent systems, each agent has a specific expertise or role.
// This is like having a team where each member is an expert in their domain.

// Define the researcher agent's role
// This agent specializes in gathering facts and information objectively
const researcherPrompt = "You are a research specialist. Gather and summarize facts.";

// Define the writer agent's role
// This agent specializes in creating engaging, well-written content
const writerPrompt = "You are a creative writer. Write engaging content.";

// Why specialized agents? Because:
// 1. Each agent can be optimized for its specific task
// 2. You can combine different models or different prompts per agent
// 3. Easier to debug and improve individual agent behaviors
// 4. Real-world teams work this way - specialists collaborate!

console.log('✓ Researcher agent: Gathers facts');
console.log('✓ Writer agent: Creates content');
console.log('✓ Each agent has unique expertise');`;

  const step2Code = `// Step 2: Researcher agent gathers information
// Here we create the first agent in our pipeline

${getLLMInit()};

// Create messages array for the researcher agent
// SystemMessage: Defines the agent's role and behavior
// HumanMessage: The actual task/query for the agent
const researcherMessages = [
  // This SystemMessage instructs the LLM to act as a research specialist
  // Clear, specific instructions lead to better agent outputs
  new SystemMessage("You are a research specialist. Provide 3 key facts about the topic."),

  // This HumanMessage is the actual request we're making
  // The researcher will focus on factual, objective information
  new HumanMessage("Research: AI Agents")
];

// Invoke the LLM with the researcher's messages
// The LLM will respond as a research specialist based on the system prompt
const research = await llm.invoke(researcherMessages);

// Display the research results
// This output will be factual and focused on key information
console.log('Researcher Output:');
console.log(research.content);

// NOTE: In production, you might want to:
// 1. Validate the research output format
// 2. Store research results in a database
// 3. Add error handling for API failures`;

  const step3Code = `// Step 3: Complete Multi-Agent Pipeline - Agents Working Together!
// This demonstrates a REAL multi-agent workflow where:
// Agent 1 (Researcher) → produces output → Agent 2 (Writer) → final result

${getLLMInit()};

// ========== PHASE 1: RESEARCH ==========
// First agent: Research Specialist
// This agent's job is to gather factual information
const researcherMessages = [
  new SystemMessage("You are a research specialist. Provide 3 key facts about the topic."),
  new HumanMessage("Research: AI Agents")
];

// Execute the research phase
// The researcher agent runs independently first
const research = await llm.invoke(researcherMessages);

// ========== PHASE 2: WRITING ==========
// Second agent: Creative Writer
// This agent takes the researcher's output as INPUT
// Notice how we pass research.content into the writer's prompt!
const writerMessages = [
  // System prompt defines this agent as a creative writer
  new SystemMessage("You are a creative writer. Write a short engaging paragraph using these facts."),

  // CRITICAL: The writer receives the researcher's output as context
  // This is how agents "collaborate" - output of one becomes input of another
  new HumanMessage(\`Facts: \${research.content}\`)
];

// Execute the writing phase
// The writer transforms the research into engaging content
const article = await llm.invoke(writerMessages);

// ========== RESULTS ==========
// Display both phases of the pipeline
console.log('Research Phase:');
console.log(research.content);
console.log('');
console.log('Writing Phase:');
console.log(article.content);

// Key Takeaway: Multi-agent systems create PIPELINES where:
// 1. Each agent has a specialized role
// 2. Outputs flow between agents (research → writer)
// 3. Final result combines multiple expert perspectives
// 4. More modular and maintainable than one giant prompt!`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      return {
        output: '✓ Researcher agent: Gathers facts\n✓ Writer agent: Creates content\n✓ Each agent has unique expertise',
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

      const researcherMessages = [
        new SystemMessage("You are a research specialist. Provide 3 key facts about the topic."),
        new HumanMessage("Research: AI Agents")
      ];

      const research = await llm.invoke(researcherMessages);

      return {
        output: `Researcher Output:\n${research.content}`,
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

      const researcherMessages = [
        new SystemMessage("You are a research specialist. Provide 3 key facts about the topic."),
        new HumanMessage("Research: AI Agents")
      ];
      const research = await llm.invoke(researcherMessages);

      const writerMessages = [
        new SystemMessage("You are a creative writer. Write a short engaging paragraph using these facts."),
        new HumanMessage(`Facts: ${research.content}`)
      ];
      const article = await llm.invoke(writerMessages);

      // Mark lab complete and show celebration
      markLabComplete(7);
      celebrateCompletion();

      return {
        output: `Research Phase:\n${research.content}\n\nWriting Phase:\n${article.content}`,
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
          src="/lab7-hero.jpg"
          alt="Lab 7: Multi-Agent Collaboration"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex-shrink-0">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 7: Multi-Agent Collaboration
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Multiple AI agents working together
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Creating multiple agents with different roles</li>
              <li>Coordinating agent workflows</li>
              <li>Passing outputs between agents</li>
              <li>Building complex multi-agent systems</li>
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
            Define Agent Roles
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-roles"
          initialCode={step1Code}
          description="Create specialized agents with unique system prompts"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Researcher Agent
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-researcher"
          initialCode={step2Code}
          description="First agent gathers facts and information"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg animate-pulse-glow">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Multi-Agent Workflow
          </h2>
        </div>
        <TerminalCodeCell
          title="complete-collaboration"
          initialCode={step3Code}
          description="Researcher → Writer pipeline - agents collaborating!"
          onExecute={executeStep3}
        />
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm sm:text-base font-semibold text-blue-900 dark:text-blue-100 mb-3">
          🤝 Multi-Agent Patterns
        </h3>
        <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-xs sm:text-sm">
          <li>✓ <strong>Pipeline:</strong> Sequential processing (Agent A → Agent B → Agent C)</li>
          <li>✓ <strong>Parallel:</strong> Multiple agents work simultaneously</li>
          <li>✓ <strong>Hierarchical:</strong> Manager agent coordinates worker agents</li>
          <li>✓ <strong>Collaborative:</strong> Agents debate and refine outputs together</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Collaboration Unlocked!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm">
          You've built a multi-agent system! Combining specialized agents creates powerful workflows.
          Next, you'll learn about orchestrator agents that intelligently route requests!
        </p>
      </div>
      <CompleteLabButton labId={7} />
    </div>
  );
}
