import { BookOpen, Brain, AlertTriangle } from 'lucide-react';
import { TerminalCodeCell, type TerminalCodeCellRef } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { RunAllCellsButton } from '../components/RunAllCellsButton';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { celebrateCompletion } from '../utils/confetti';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import type { ExecutionResult } from '../types';
import { useRef, useState } from 'react';

export function Lab4() {
  const { providers, activeProvider, selectedModel } = useStore();
  const apiKey = providers[activeProvider].apiKey;
  const [limitContext, setLimitContext] = useState(false);

  const step1Ref = useRef<TerminalCodeCellRef>(null);
  const step2Ref = useRef<TerminalCodeCellRef>(null);
  const step3Ref = useRef<TerminalCodeCellRef>(null);
  const step4Ref = useRef<TerminalCodeCellRef>(null);
  const step5Ref = useRef<TerminalCodeCellRef>(null);

  const [isRunningAll, setIsRunningAll] = useState(false);

  const handleRunAll = async () => {
    setIsRunningAll(true);
    try {
      await step1Ref.current?.run();
      await new Promise(resolve => setTimeout(resolve, 500));
      await step2Ref.current?.run();
      await new Promise(resolve => setTimeout(resolve, 500));
      await step3Ref.current?.run();
      await new Promise(resolve => setTimeout(resolve, 500));
      await step4Ref.current?.run();
      await new Promise(resolve => setTimeout(resolve, 500));
      await step5Ref.current?.run();
    } finally {
      setIsRunningAll(false);
    }
  };

  const getLLMClass = () => {
    if (activeProvider === 'browser') return 'WebLLM';
    return 'ChatCohere';
  };

  const getLLMImport = () => {
    if (activeProvider === 'browser') {
      return `import * as webllm from '@mlc-ai/web-llm';`;
    }
    return `import { ChatCohere } from '@langchain/cohere';`;
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

  const step1Code = `// Step 1: Import message types for memory
${getLLMImport()}
import { HumanMessage, AIMessage } from '@langchain/core/messages';

console.log('✓ ${activeProvider === 'browser' ? 'WebLLM and message types' : 'LangChain classes'} imported!');
console.log('We will use arrays to store conversation history');`;

  const step2Code = `// Step 2: Create a messages array to store history
const messages = [];

console.log('✓ Messages array created!');
console.log('This array will act as our memory');`;

  const step3Code = `// Step 3: Add first user message and get response
${getLLMInit()};

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
${getLLMInit()};

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

  const step5Code = `// Complete Example: Full Multi-Turn Conversation with Memory!
// This is how ChatGPT remembers your conversation!

${getLLMInit()};

// ========== INITIALIZE MEMORY ==========
// Create an empty array to store the conversation history
// This array will grow as the conversation continues
const messages = [];

// ========== TURN 1: USER INTRODUCES THEMSELVES ==========
// User shares information
messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));

// Send ENTIRE conversation history (currently just 1 message) to LLM
const response1 = await llm.invoke(messages);

// CRITICAL: Store the agent's response in memory too!
// Now the agent can remember what IT said, not just what the user said
messages.push(new AIMessage(response1.content.toString()));
// Memory now has: [User: "My name...", Agent: "Nice to meet you..."]

// ========== TURN 2: TEST MEMORY - NAME ==========
// User asks about something mentioned in Turn 1
messages.push(new HumanMessage("What's my name?"));

// Send ALL messages (Turn 1 user + Turn 1 agent + Turn 2 user)
// The LLM sees the full context and can answer!
const response2 = await llm.invoke(messages);

// Store this exchange too
messages.push(new AIMessage(response2.content.toString()));
// Memory now has 4 messages: Turn 1 (user+agent) + Turn 2 (user+agent)

// ========== TURN 3: TEST MEMORY - PROFESSION ==========
// Ask about the other piece of info from Turn 1
messages.push(new HumanMessage("What do I teach?"));

// Send the FULL conversation (all 5 messages so far)
const response3 = await llm.invoke(messages);
// The agent remembers "AI agents" from Turn 1!

// ========== DISPLAY THE CONVERSATION ==========
console.log('Turn 1:');
console.log('User: My name is Yuval and I teach AI agents');
console.log('Agent:', response1.content);
console.log('');
console.log('Turn 2:');
console.log('User: What\\'s my name?');
console.log('Agent:', response2.content); // Should say "Yuval"!
console.log('');
console.log('Turn 3:');
console.log('User: What do I teach?');
console.log('Agent:', response3.content); // Should say "AI agents"!
console.log('');
console.log('✓ Agent remembered context across all turns!');

// 🧠 How Memory Works:
// 1. Store EVERY message (user AND agent) in an array
// 2. Send the ENTIRE array with each new request
// 3. LLM sees full context and can reference previous turns
// 4. Continue appending to the array as conversation grows

// Real-world considerations:
// ⚠️ Memory grows with each turn - costs more tokens!
// ✓ Solution: Limit to last N messages (e.g., last 10 turns)
// ✓ Solution: Summarize old messages to save tokens
// ✓ Solution: Store in database for long-term persistence`;

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
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);

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
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);

      const messages: Array<HumanMessage | AIMessage> = [];
      messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));
      const response1 = await llm.invoke(messages);
      messages.push(new AIMessage(response1.content.toString()));

      messages.push(new HumanMessage("What's my name?"));

      // Apply context window limit if enabled
      const messagesToSend = limitContext
        ? messages.slice(-3)  // Only last 3 messages
        : messages;

      const response2 = await llm.invoke(messagesToSend);
      messages.push(new AIMessage(response2.content.toString()));

      const contextInfo = limitContext
        ? `\n⚠️ Context limited: Sent only ${messagesToSend.length} of ${messages.length - 1} messages (excluding current response)`
        : '';

      return {
        output: `Turn 2:\nUser: What's my name?\nAgent: ${response2.content}\n\nMessages in memory: ${messages.length}${contextInfo}`,
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
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);

      const messages: Array<HumanMessage | AIMessage> = [];

      // Turn 1
      messages.push(new HumanMessage("My name is Yuval and I teach AI agents"));
      const messagesToSend1 = limitContext ? messages.slice(-3) : messages;
      const response1 = await llm.invoke(messagesToSend1);
      messages.push(new AIMessage(response1.content.toString()));

      // Turn 2
      messages.push(new HumanMessage("What's my name?"));
      const messagesToSend2 = limitContext ? messages.slice(-3) : messages;
      const response2 = await llm.invoke(messagesToSend2);
      messages.push(new AIMessage(response2.content.toString()));

      // Turn 3
      messages.push(new HumanMessage("What do I teach?"));
      const messagesToSend3 = limitContext ? messages.slice(-3) : messages;
      const response3 = await llm.invoke(messagesToSend3);

      // Show celebration (lab completion happens when clicking the Complete Lab button)
      celebrateCompletion();

      const contextWarning = limitContext
        ? '\n\n⚠️ NOTICE: With context window limited to 3 messages, the agent may not remember early conversation!\nTry toggling off the limit to see the difference.'
        : '\n\n✓ Agent remembered context across all turns!';

      return {
        output: `Turn 1:\nUser: My name is Yuval and I teach AI agents\nAgent: ${response1.content}\n\nTurn 2:\nUser: What's my name?\nAgent: ${response2.content}\n\nTurn 3:\nUser: What do I teach?\nAgent: ${response3.content}${contextWarning}`,
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
          src="/lab4-hero.jpg"
          alt="Lab 4: Conversation Memory"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl bg-black/40 backdrop-blur-sm">
        <img
          src="/lab4-diagram.png"
          alt="Conversation Memory Diagram"
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <RunAllCellsButton onRunAll={handleRunAll} isRunning={isRunningAll} />

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex-shrink-0">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 4: Conversation Memory
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Make your agent remember previous messages
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>How to store conversation history in message arrays</li>
              <li>Adding HumanMessage and AIMessage to memory</li>
              <li>Building multi-turn conversations</li>
              <li>How agents use past context to answer new questions</li>
              <li>Why memory is crucial when context windows are limited</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-2 sm:gap-3 mb-3">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
                Experiment: Context Window Limits
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-200">
                In production, you can't send unlimited conversation history - it's expensive and hits token limits.
                Enable this toggle to simulate sending only the last 3 messages to the LLM.
              </p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={limitContext}
              onChange={(e) => setLimitContext(e.target.checked)}
              className="w-4 h-4 text-amber-600 bg-white border-amber-300 rounded focus:ring-amber-500"
            />
            <span className="text-xs sm:text-sm text-amber-900 dark:text-amber-100 font-medium">
              Limit context window to last 3 messages
            </span>
          </label>
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
          ref={step1Ref}
          title="step-1-imports"
          initialCode={step1Code}
          description="Import HumanMessage and AIMessage for conversation memory"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Create Memory Array
          </h2>
        </div>
        <TerminalCodeCell
          ref={step2Ref}
          title="step-2-memory"
          initialCode={step2Code}
          description="Initialize an array to store conversation history"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            First Turn - Store Message
          </h2>
        </div>
        <TerminalCodeCell
          ref={step3Ref}
          title="step-3-turn1"
          initialCode={step3Code}
          description="Send first message and store both user and AI responses"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            4
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Second Turn - Agent Remembers!
          </h2>
        </div>
        <TerminalCodeCell
          ref={step4Ref}
          title="step-4-turn2"
          initialCode={step4Code}
          description="Ask a question that requires memory - watch the magic!"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg animate-pulse-glow">
            5
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Complete Multi-Turn Conversation
          </h2>
        </div>
        <TerminalCodeCell
          ref={step5Ref}
          title="complete-memory-agent"
          initialCode={step5Code}
          description="Full conversation with memory - the agent remembers everything!"
          onExecute={executeStep5}
        />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-sm sm:text-base font-semibold text-purple-900 dark:text-purple-100 mb-3">
          🧠 How Memory Works
        </h3>
        <ul className="space-y-2 text-purple-800 dark:text-purple-200 text-xs sm:text-sm">
          <li>✓ Each message (user and AI) is stored in an array</li>
          <li>✓ The entire array is sent to the LLM with each new message</li>
          <li>✓ The LLM can reference previous messages to maintain context</li>
          <li>✓ This allows for natural, coherent conversations</li>
          <li>✓ More messages = more tokens = higher cost (manage carefully!)</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
          <p className="text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
            💡 Why the Context Limit Toggle Matters:
          </p>
          <p className="text-xs text-purple-800 dark:text-purple-200">
            With the toggle enabled, the agent only sees the last 3 messages - it literally "forgets" earlier conversation.
            This demonstrates the real-world problem: in production apps, you can't send unlimited history due to cost and token limits.
            Memory arrays let you explicitly preserve what's important while managing context size efficiently.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Excellent Progress!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm">
          You've learned how to give your agent memory! This is crucial for building conversational
          AI systems. Next, you'll learn how to give your agent access to external knowledge bases.
        </p>
      </div>
      <CompleteLabButton labId={4} />
    </div>
  );
}
