import { BookOpen, Sparkles } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { celebrateCompletion } from '../utils/confetti';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import type { ExecutionResult } from '../types';

const TOTAL_LABS = 8;

export function Lab3() {
  const { apiKey, provider, selectedModel, markLabComplete } = useStore();

  const getLLMClass = () => {
    if (provider === 'browser') return 'WebLLM';
    return provider === 'groq' ? 'ChatGroq' : 'ChatCohere';
  };

  const getLLMImport = () => {
    if (provider === 'browser') {
      return `import * as webllm from '@mlc-ai/web-llm';`;
    }
    return provider === 'groq'
      ? `import { ChatGroq } from '@langchain/groq';`
      : `import { ChatCohere } from '@langchain/cohere';`;
  };

  const getLLMInit = () => {
    if (provider === 'browser') {
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
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  model: '${selectedModel}',
})`;
  };

  const step1Code = `// Step 1: Import required classes
${getLLMImport()}
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

console.log('✓ ${provider === 'browser' ? 'WebLLM and message types' : 'LangChain classes'} imported successfully!');`;

  const step2Code = `// Step 2: Create a system prompt to define agent personality
const systemPrompt = new SystemMessage(\`You are an expert AI tutor specializing in teaching about artificial intelligence and machine learning. You explain complex concepts in simple terms and use analogies. Always be encouraging and patient.\`);

console.log('✓ System prompt created!');
console.log('Role:', 'AI Tutor');`;

  const step3Code = `// Step 3: Create the user's question
const userPrompt = new HumanMessage("What is machine learning?");

console.log('✓ User prompt ready!');
console.log('Question:', userPrompt.content);`;

  const step4Code = `// Step 4: Combine system and user messages
const systemPrompt = new SystemMessage(\`You are an expert AI tutor specializing in teaching about artificial intelligence and machine learning. You explain complex concepts in simple terms and use analogies.\`);
const userPrompt = new HumanMessage("What is machine learning?");

const messages = [systemPrompt, userPrompt];

console.log('✓ Messages array created!');
console.log('Total messages:', messages.length);`;

  const step5Code = `// Step 5: Send to LLM and get response
${getLLMInit()};

const systemPrompt = new SystemMessage(\`You are an expert AI tutor specializing in teaching about artificial intelligence and machine learning. You explain complex concepts in simple terms and use analogies.\`);
const userPrompt = new HumanMessage("What is machine learning?");
const messages = [systemPrompt, userPrompt];

const response = await llm.invoke(messages);

console.log('Agent Response:', response.content);`;

  const step6Code = `// Complete Example: The Power of Personalities!
// System prompts let you create agents with ANY personality or expertise

${getLLMInit()};

// Example: A Pirate AI Assistant
// Notice how DETAILED the system prompt is:
// - Defines speaking style ("speak like a pirate")
// - Sets boundaries ("helpful but always stay in character")
// - Adds signature behavior ("End responses with 'Arrr!'")
const systemPrompt = new SystemMessage(\`You are a pirate AI assistant. You speak like a pirate and use nautical terms. You're helpful but always stay in character. End responses with "Arrr!"\`);

// The user's question (same as before, but now gets a pirate response!)
const userPrompt = new HumanMessage("How do I learn programming?");

// Combine system and user messages
const messages = [systemPrompt, userPrompt];

// Get the pirate's response!
const response = await llm.invoke(messages);

// The response will be helpful programming advice... in pirate speak!
console.log('Pirate Agent Response:', response.content);

// 🏴‍☠️ What makes this powerful?
// - SAME user question
// - SAME LLM model
// - DIFFERENT system prompt
// - COMPLETELY DIFFERENT response style!

// Real-world applications:
// ✓ Customer support bot (professional, empathetic)
// ✓ Code review agent (technical, detailed)
// ✓ Marketing copy writer (creative, persuasive)
// ✓ Data analyst (analytical, precise)
// ✓ Teacher (patient, encouraging, uses analogies)

// Try creating your own! Ideas:
// - Shakespeare writer
// - Sports commentator
// - News reporter
// - Therapist
// - Tech support agent`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      return {
        output: '✓ Message types imported successfully!',
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
      return {
        output: '✓ System prompt created!\nRole: AI Tutor',
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
      const userPrompt = new HumanMessage("What is machine learning?");
      return {
        output: `✓ User prompt ready!\nQuestion: ${userPrompt.content}`,
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

  const executeStep4 = async (): Promise<ExecutionResult> => {
    try {
      const systemPrompt = new SystemMessage('You are an expert AI tutor.');
      const userPrompt = new HumanMessage("What is machine learning?");
      const messages = [systemPrompt, userPrompt];

      return {
        output: `✓ Messages array created!\nTotal messages: ${messages.length}`,
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

  const executeStep5 = async (): Promise<ExecutionResult> => {
    try {
      if (!apiKey && provider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', provider, selectedModel);

      const systemPrompt = new SystemMessage(`You are an expert AI tutor specializing in teaching about artificial intelligence and machine learning. You explain complex concepts in simple terms and use analogies.`);
      const userPrompt = new HumanMessage("What is machine learning?");
      const messages = [systemPrompt, userPrompt];

      const response = await llm.invoke(messages);

      return {
        output: `Agent Response: ${response.content}`,
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

  const executeStep6 = async (): Promise<ExecutionResult> => {
    try {
      if (!apiKey && provider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', provider, selectedModel);

      const systemPrompt = new SystemMessage(`You are a pirate AI assistant. You speak like a pirate and use nautical terms. You're helpful but always stay in character. End responses with "Arrr!"`);
      const userPrompt = new HumanMessage("How do I learn programming?");

      const messages = [systemPrompt, userPrompt];
      const response = await llm.invoke(messages);

      // Mark lab complete and show celebration
      markLabComplete(3);
      celebrateCompletion();

      return {
        output: `Pirate Agent Response: ${response.content}`,
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
          src="/lab3-hero.jpg"
          alt="Lab 3: Custom System Prompts"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl bg-black/40 backdrop-blur-sm">
        <img
          src="/lab3-diagram.png"
          alt="System Prompts Diagram"
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg flex-shrink-0">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 3: Custom System Prompts
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Shape your agent's personality and behavior
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>How to use SystemMessage to define agent personality</li>
              <li>Combining system prompts with user messages</li>
              <li>Creating different agent behaviors (tutor, pirate, expert)</li>
              <li>Understanding how system prompts guide responses</li>
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
            Import Message Types
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-imports"
          initialCode={step1Code}
          description="Import SystemMessage and HumanMessage from LangChain"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Create System Prompt
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-system-prompt"
          initialCode={step2Code}
          description="Define the agent's role, personality, and expertise"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Create User Message
          </h2>
        </div>
        <TerminalCodeCell
          title="step-3-user-prompt"
          initialCode={step3Code}
          description="Create the user's question or request"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            4
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Combine Messages
          </h2>
        </div>
        <TerminalCodeCell
          title="step-4-combine"
          initialCode={step4Code}
          description="Put system and user messages into an array"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            5
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Get Agent Response
          </h2>
        </div>
        <TerminalCodeCell
          title="step-5-response"
          initialCode={step5Code}
          description="Send messages to the LLM and see how system prompt shapes the response"
          onExecute={executeStep5}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg animate-pulse-glow">
            6
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Try a Different Personality
          </h2>
        </div>
        <TerminalCodeCell
          title="complete-pirate-agent"
          initialCode={step6Code}
          description="Experiment with a pirate personality - see how system prompts change behavior!"
          onExecute={executeStep6}
        />
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-sm sm:text-base font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Pro Tips for System Prompts
        </h3>
        <ul className="space-y-2 text-yellow-800 dark:text-yellow-200 text-xs sm:text-sm">
          <li>✓ Be specific about the role and expertise level</li>
          <li>✓ Include output format requirements (JSON, bullet points, etc.)</li>
          <li>✓ Add constraints (word limits, language style, tone)</li>
          <li>✓ Test different system prompts to find what works best</li>
          <li>✓ Keep system prompts concise but informative</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Great Work!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm">
          You've learned how to shape your agent's personality! System prompts are powerful tools
          for controlling agent behavior. Next, you'll learn how to add memory to make conversations
          more natural.
        </p>
      </div>

      <CompleteLabButton labId={3} />
    </div>
  );
}
