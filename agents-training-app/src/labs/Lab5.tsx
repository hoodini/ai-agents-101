import { BookOpen, Database } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { celebrateCompletion } from '../utils/confetti';
import { PromptTemplate } from '@langchain/core/prompts';
import type { ExecutionResult } from '../types';

const TOTAL_LABS = 8;

export function Lab5() {
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

  const knowledgeBase = `YUV.AI Knowledge Base:
- Founded by Yuval Avidani, an AI Builder and Speaker
- Specializes in AI agents, LLMs, and generative AI training
- Offers workshops for companies in UK, EU, and Israel
- Created Logan AI - an orchestration layer for multi-agent systems
- 17 years of experience in tech, development, research, and cyber security
- Based in Israel
- Active on LinkedIn, X (@yuvalav), and Instagram (@yuval_770)
- Website: https://yuv.ai
- GitHub: @hoodini
- Part of GitHub Stars program`;

  const step1Code = `// Step 1: Define your knowledge base
const knowledgeBase = \`${knowledgeBase}\`;

console.log('✓ Knowledge base loaded!');
console.log('Total length:', knowledgeBase.length, 'characters');`;

  const step2Code = `// Step 2: Import PromptTemplate for structured prompts
import { PromptTemplate } from '@langchain/core/prompts';

const template = \`You are a helpful assistant with access to the following knowledge base.
Answer the user's question using ONLY information from the knowledge base.
If the answer is not in the knowledge base, say "I don't have that information."

KNOWLEDGE BASE:
{knowledge}

USER QUESTION:
{question}

ANSWER:\`;

const prompt = PromptTemplate.fromTemplate(template);

console.log('✓ Prompt template created!');
console.log('Template variables:', prompt.inputVariables);`;

  const step3Code = `// Step 3: Format the prompt with knowledge and question
import { PromptTemplate } from '@langchain/core/prompts';

const knowledgeBase = \`${knowledgeBase}\`;

const template = \`You are a helpful assistant. Answer using ONLY the knowledge base.

KNOWLEDGE BASE:
{knowledge}

USER QUESTION:
{question}

ANSWER:\`;

const prompt = PromptTemplate.fromTemplate(template);
const formattedPrompt = await prompt.format({
  knowledge: knowledgeBase,
  question: "Who founded YUV.AI?"
});

console.log('✓ Prompt formatted!');
console.log('Question: Who founded YUV.AI?');`;

  const step4Code = `// Step 4: Query the knowledge base
const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

const knowledgeBase = \`${knowledgeBase}\`;

const template = \`You are a helpful assistant. Answer using ONLY the knowledge base.

KNOWLEDGE BASE:
{knowledge}

USER QUESTION:
{question}

ANSWER:\`;

const prompt = PromptTemplate.fromTemplate(template);
const formattedPrompt = await prompt.format({
  knowledge: knowledgeBase,
  question: "Who founded YUV.AI?"
});

const response = await llm.invoke(formattedPrompt);

console.log('Question: Who founded YUV.AI?');
console.log('Answer:', response.content);`;

  const step5Code = `// Complete Example: Knowledge Base Agent
const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

const knowledgeBase = \`${knowledgeBase}\`;

const template = \`You are a helpful assistant. Answer using ONLY the knowledge base.
If the answer is not in the knowledge base, say "I don't have that information."

KNOWLEDGE BASE:
{knowledge}

USER QUESTION:
{question}

ANSWER:\`;

const prompt = PromptTemplate.fromTemplate(template);

// Ask multiple questions
const questions = [
  "What is Logan AI?",
  "Where is YUV.AI based?",
  "What is Yuval's favorite color?" // Not in knowledge base
];

for (const question of questions) {
  const formattedPrompt = await prompt.format({
    knowledge: knowledgeBase,
    question
  });
  const response = await llm.invoke(formattedPrompt);
  console.log('Q:', question);
  console.log('A:', response.content);
  console.log('');
}`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      return {
        output: `✓ Knowledge base loaded!\nTotal length: ${knowledgeBase.length} characters`,
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
      const template = `You are a helpful assistant with access to the following knowledge base.
Answer the user's question using ONLY information from the knowledge base.

KNOWLEDGE BASE:
{knowledge}

USER QUESTION:
{question}

ANSWER:`;
      const prompt = PromptTemplate.fromTemplate(template);
      return {
        output: `✓ Prompt template created!\nTemplate variables: ${prompt.inputVariables.join(', ')}`,
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
      const template = `You are a helpful assistant. Answer using ONLY the knowledge base.

KNOWLEDGE BASE:
{knowledge}

USER QUESTION:
{question}

ANSWER:`;
      const prompt = PromptTemplate.fromTemplate(template);
      await prompt.format({
        knowledge: knowledgeBase,
        question: "Who founded YUV.AI?"
      });
      return {
        output: '✓ Prompt formatted!\nQuestion: Who founded YUV.AI?',
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

      const template = `You are a helpful assistant. Answer using ONLY the knowledge base.

KNOWLEDGE BASE:
{knowledge}

USER QUESTION:
{question}

ANSWER:`;
      const prompt = PromptTemplate.fromTemplate(template);
      const formattedPrompt = await prompt.format({
        knowledge: knowledgeBase,
        question: "Who founded YUV.AI?"
      });

      const response = await llm.invoke(formattedPrompt);

      return {
        output: `Question: Who founded YUV.AI?\nAnswer: ${response.content}`,
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

      const template = `You are a helpful assistant. Answer using ONLY the knowledge base.
If the answer is not in the knowledge base, say "I don't have that information."

KNOWLEDGE BASE:
{knowledge}

USER QUESTION:
{question}

ANSWER:`;
      const prompt = PromptTemplate.fromTemplate(template);

      const questions = [
        "What is Logan AI?",
        "Where is YUV.AI based?",
        "What is Yuval's favorite color?"
      ];

      let output = '';
      for (const question of questions) {
        const formattedPrompt = await prompt.format({
          knowledge: knowledgeBase,
          question
        });
        const response = await llm.invoke(formattedPrompt);
        output += `Q: ${question}\nA: ${response.content}\n\n`;
      }

      celebrateCompletion();
      markLabCompleteAndAdvance(5, TOTAL_LABS);

      return {
        output,
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
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 5: Knowledge Base Integration
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Give your agent access to specific knowledge
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Creating a simple knowledge base with text</li>
              <li>Using PromptTemplate to inject knowledge</li>
              <li>Constraining agents to answer only from provided knowledge</li>
              <li>Handling questions outside the knowledge base</li>
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
            Define Knowledge Base
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-knowledge"
          initialCode={step1Code}
          description="Create a text-based knowledge base with relevant information"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            2
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Create Prompt Template
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-template"
          initialCode={step2Code}
          description="Use PromptTemplate to structure your prompts with variables"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            3
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Format Prompt with Data
          </h2>
        </div>
        <TerminalCodeCell
          title="step-3-format"
          initialCode={step3Code}
          description="Inject knowledge and question into the template"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            4
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Query the Knowledge Base
          </h2>
        </div>
        <TerminalCodeCell
          title="step-4-query"
          initialCode={step4Code}
          description="Send formatted prompt to LLM and get knowledge-based answer"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg animate-pulse-glow">
            5
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Complete Knowledge Base Agent
          </h2>
        </div>
        <TerminalCodeCell
          title="complete-kb-agent"
          initialCode={step5Code}
          description="Test with multiple questions - see how it handles unknown info!"
          onExecute={executeStep5}
        />
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800">
        <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-3">
          💡 Knowledge Base Tips
        </h3>
        <ul className="space-y-2 text-teal-800 dark:text-teal-200 text-sm">
          <li>✓ Keep knowledge organized and structured</li>
          <li>✓ Instruct the agent to admit when it doesn't know</li>
          <li>✓ For large knowledge bases, use vector databases (next lab!)</li>
          <li>✓ Update knowledge base regularly for accuracy</li>
          <li>✓ Test with questions both inside and outside the knowledge</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Knowledge Unlocked!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-sm">
          You've learned how to give your agent access to specific knowledge! Next, you'll learn
          about RAG (Retrieval Augmented Generation) with vector search for handling large knowledge bases.
        </p>
      </div>
      <CompleteLabButton labId={5} />
    </div>
  );
}
