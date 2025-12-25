import { BookOpen, Brain } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { celebrateCompletion } from '../utils/confetti';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import type { ExecutionResult } from '../types';

const TOTAL_LABS = 8;

export function Lab4() {
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

  const step1Code = `// Step 1: Import message types for memory
import { HumanMessage, AIMessage } from '@langchain/core/messages';

console.log('✓ Message types imported!');
console.log('We will use arrays to store conversation history');`;

  const step2Code = `// Step 2: Create a messages array to store history
const messages = [];

console.log('✓ Messages array created!');
console.log('This array will act as our memory');`;

  const step3Code = `// Step 3: Add first user message and get response
const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

const messages = [];
messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));

const response1 = await llm.invoke(messages);
messages.push(new AIMessage(response1.content.toString()));

console.log('Turn 1:');
console.log('User: My name is Yuval and I teach AI agents');
console.log('Agent:', response1.content);
console.log('');
console.log('Messages in memory:', messages.length);`;

  const step4Code = `// Step 4: Second turn - agent remembers!
const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

const messages = [];
messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));
const response1 = await llm.invoke(messages);
messages.push(new AIMessage(response1.content.toString()));

// Ask about name - should remember!
messages.push(new HumanMessage("What's my name?"));
const response2 = await llm.invoke(messages);
messages.push(new AIMessage(response2.content.toString()));

console.log('Turn 2:');
console.log('User: What\\'s my name?');
console.log('Agent:', response2.content);
console.log('');
console.log('Messages in memory:', messages.length);`;

  const step5Code = `// Complete Example: Full conversation with memory
const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

// Initialize conversation memory
const messages = [];

// Turn 1: Introduce yourself
messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));
const response1 = await llm.invoke(messages);
messages.push(new AIMessage(response1.content.toString()));

// Turn 2: Ask about name
messages.push(new HumanMessage("What's my name?"));
const response2 = await llm.invoke(messages);
messages.push(new AIMessage(response2.content.toString()));

// Turn 3: Ask about profession
messages.push(new HumanMessage("What do I teach?"));
const response3 = await llm.invoke(messages);

console.log('Turn 1:');
console.log('User: My name is Yuval and I teach AI agents');
console.log('Agent:', response1.content);
console.log('');
console.log('Turn 2:');
console.log('User: What\\'s my name?');
console.log('Agent:', response2.content);
console.log('');
console.log('Turn 3:');
console.log('User: What do I teach?');
console.log('Agent:', response3.content);
console.log('');
console.log('✓ Agent remembered context across all turns!');`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      return {
        output: '✓ Message types imported!\nWe will use arrays to store conversation history',
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
        output: '✓ Messages array created!\nThis array will act as our memory',
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

      const messages: Array<HumanMessage | AIMessage> = [];
      messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));

      const response1 = await llm.invoke(messages);
      messages.push(new AIMessage(response1.content.toString()));

      return {
        output: `Turn 1:\nUser: My name is Yuval and I teach AI agents\nAgent: ${response1.content}\n\nMessages in memory: ${messages.length}`,
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
      if (!apiKey) {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey, provider, selectedModel);

      const messages: Array<HumanMessage | AIMessage> = [];
      messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));
      const response1 = await llm.invoke(messages);
      messages.push(new AIMessage(response1.content.toString()));

      messages.push(new HumanMessage("What's my name?"));
      const response2 = await llm.invoke(messages);
      messages.push(new AIMessage(response2.content.toString()));

      return {
        output: `Turn 2:\nUser: What's my name?\nAgent: ${response2.content}\n\nMessages in memory: ${messages.length}`,
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
      if (!apiKey) {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey, provider, selectedModel);

      const messages: Array<HumanMessage | AIMessage> = [];

      messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));
      const response1 = await llm.invoke(messages);
      messages.push(new AIMessage(response1.content.toString()));

      messages.push(new HumanMessage("What's my name?"));
      const response2 = await llm.invoke(messages);
      messages.push(new AIMessage(response2.content.toString()));

      messages.push(new HumanMessage("What do I teach?"));
      const response3 = await llm.invoke(messages);

      celebrateCompletion();
      markLabCompleteAndAdvance(4, TOTAL_LABS);

      return {
        output: `Turn 1:\nUser: My name is Yuval and I teach AI agents\nAgent: ${response1.content}\n\nTurn 2:\nUser: What's my name?\nAgent: ${response2.content}\n\nTurn 3:\nUser: What do I teach?\nAgent: ${response3.content}\n\n✓ Agent remembered context across all turns!`,
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
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 4: Conversation Memory
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Make your agent remember previous messages
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>How to store conversation history in message arrays</li>
              <li>Adding HumanMessage and AIMessage to memory</li>
              <li>Building multi-turn conversations</li>
              <li>How agents use past context to answer new questions</li>
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
            Import Message Types
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-imports"
          initialCode={step1Code}
          description="Import HumanMessage and AIMessage for conversation memory"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            2
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Create Memory Array
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-memory"
          initialCode={step2Code}
          description="Initialize an array to store conversation history"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            3
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            First Turn - Store Message
          </h2>
        </div>
        <TerminalCodeCell
          title="step-3-turn1"
          initialCode={step3Code}
          description="Send first message and store both user and AI responses"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            4
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Second Turn - Agent Remembers!
          </h2>
        </div>
        <TerminalCodeCell
          title="step-4-turn2"
          initialCode={step4Code}
          description="Ask a question that requires memory - watch the magic!"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg animate-pulse-glow">
            5
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Complete Multi-Turn Conversation
          </h2>
        </div>
        <TerminalCodeCell
          title="complete-memory-agent"
          initialCode={step5Code}
          description="Full conversation with memory - the agent remembers everything!"
          onExecute={executeStep5}
        />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
          🧠 How Memory Works
        </h3>
        <ul className="space-y-2 text-purple-800 dark:text-purple-200 text-sm">
          <li>✓ Each message (user and AI) is stored in an array</li>
          <li>✓ The entire array is sent to the LLM with each new message</li>
          <li>✓ The LLM can reference previous messages to maintain context</li>
          <li>✓ This allows for natural, coherent conversations</li>
          <li>✓ More messages = more tokens = higher cost (manage carefully!)</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Excellent Progress!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-sm">
          You've learned how to give your agent memory! This is crucial for building conversational
          AI systems. Next, you'll learn how to give your agent access to external knowledge bases.
        </p>
      </div>
      <CompleteLabButton labId={4} />
    </div>
  );
}
