import { BookOpen, AlertCircle, Scissors, FileText, Layers } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { celebrateCompletion } from '../utils/confetti';
import type { ExecutionResult } from '../types';

const TOTAL_LABS = 11;

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

  // Large text that exceeds context window for demonstration
  const largeDocs = `YUV.AI Full Knowledge Base (17,000+ characters - TOO LARGE for simple prompts!)

SECTION 1: COMPANY OVERVIEW
YUV.AI is a leading AI consultancy founded by Yuval Avidani in 2023. Based in Israel, the company specializes in teaching organizations how to build and deploy AI agents, work with Large Language Models (LLMs), and implement generative AI solutions. With 17 years of experience in tech, development, research, and cybersecurity, Yuval brings deep expertise to every engagement.

The company's mission is to make AI practical, personal, and powerful for businesses of all sizes. YUV.AI offers hands-on workshops, consulting services, and custom training programs tailored to each client's needs and technical level.

SECTION 2: SERVICES OFFERED
YUV.AI provides comprehensive AI training and consulting services including:
- Multi-day AI Agents workshops (2-5 days)
- LLM integration and fine-tuning consulting
- Generative AI strategy development
- Custom AI agent development
- Prompt engineering masterclasses
- RAG (Retrieval-Augmented Generation) implementation
- Vector database architecture
- Multi-agent system design

Workshops are available in UK, European Union, and Israel, with both on-site and remote options available.

SECTION 3: FLAGSHIP PRODUCTS
Logan AI: YUV.AI's flagship product is Logan AI, an advanced orchestration layer for multi-agent systems. Logan enables developers to:
- Coordinate multiple AI agents working together
- Route requests intelligently based on agent capabilities
- Manage conversation state across agent interactions
- Monitor and debug complex agent behaviors
- Scale from single-agent to multi-agent architectures seamlessly

Logan AI is used by startups and enterprises to build production-ready AI agent systems.

SECTION 4: FOUNDER BACKGROUND
Yuval Avidani (@yuvalav on X, @yuval_770 on Instagram) is an internationally recognized AI Builder and Speaker. He has:
- 17 years of experience in technology, development, and cybersecurity
- Extensive background in research and practical AI implementation
- Member of the GitHub Stars program
- Active open-source contributor (@hoodini on GitHub)
- Regular speaker at AI conferences and corporate events
- Published author on AI agents and LLM architectures

SECTION 5: WORKSHOP METHODOLOGY
YUV.AI workshops follow a unique hands-on methodology:
1. Start with fundamental concepts (what are LLMs, tokens, embeddings)
2. Build simple working examples students can run immediately
3. Progress to intermediate patterns (memory, tools, RAG)
4. Culminate in production-ready multi-agent systems
5. All code examples use real APIs and production frameworks
6. Students leave with working code they can deploy

This learn-by-building approach ensures participants gain practical skills, not just theoretical knowledge.

SECTION 6: TECHNOLOGIES TAUGHT
Primary technologies covered in YUV.AI training:
- LangChain (Python and JavaScript)
- OpenAI API (GPT-4, GPT-3.5)
- Cohere (embeddings, reranking, generation)
- Groq (ultra-fast inference)
- Vector databases (Pinecone, Weaviate, Chroma)
- Embedding models (OpenAI, Cohere, sentence-transformers)
- Agent frameworks (AutoGPT, BabyAGI, custom implementations)
- Prompt engineering techniques (few-shot, chain-of-thought, ReAct)

SECTION 7: CLIENT SUCCESS STORIES
YUV.AI has successfully trained teams at:
- Fortune 500 companies implementing AI customer service
- Startups building AI-powered SaaS products
- Financial institutions developing AI risk analysis
- Healthcare companies creating AI diagnostic assistants
- E-commerce platforms implementing AI product recommendations
- Government agencies exploring AI for public services

Average workshop satisfaction rating: 4.9/5.0

SECTION 8: CONTACT INFORMATION
Website: https://yuv.ai
Email: Contact through website form
LinkedIn: Yuval Avidani
X (Twitter): @yuvalav
Instagram: @yuval_770
GitHub: @hoodini
Location: Israel (serves UK, EU, and Israel)

SECTION 9: FUTURE ROADMAP
YUV.AI is expanding its offerings to include:
- Online self-paced AI agent courses
- Certification programs for AI engineers
- Open-source Logan AI community edition
- Monthly AI agent patterns newsletter
- Quarterly AI conference sponsorships
- Advanced cybersecurity + AI training programs

The company is committed to staying at the cutting edge of AI agent technology and sharing knowledge with the broader community.

SECTION 10: PHILOSOPHY
YUV.AI believes AI should be:
- PRACTICAL: Built to solve real business problems
- PERSONAL: Customized to your team's needs and level
- POWERFUL: Using best-in-class models and architectures
- ACCESSIBLE: Everyone can learn to build with AI
- ETHICAL: Built responsibly with safety in mind

This philosophy guides every workshop, consulting engagement, and product decision.`;

  const step1Code = `// Step 1: The Context Window Problem - See What Happens!
const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

// This large text is ${largeDocs.length} characters (17,000+)
const largeKnowledge = \`${largeDocs.substring(0, 500)}...\`;

// Try to ask a question about specific info buried in the text
const question = "What is Logan AI's main purpose?";

console.log('📊 CONTEXT WINDOW PROBLEM');
console.log('Knowledge base size:', ${largeDocs.length}, 'characters');
console.log('Estimated tokens: ~${Math.floor(largeDocs.length / 4)}');
console.log('');
console.log('❌ PROBLEM: Most LLMs have token limits!');
console.log('   - GPT-3.5: 4,096 tokens (~16K characters)');
console.log('   - GPT-4: 8,192 tokens (~32K characters)');
console.log('   - Claude Sonnet: 200K tokens (~800K characters)');
console.log('');
console.log('Even with large contexts:');
console.log('1. Cost increases linearly with context size');
console.log('2. Latency increases (slower responses)');
console.log('3. Accuracy degrades (lost in the middle problem)');
console.log('4. Not all info is relevant to every question!');
console.log('');
console.log('✓ SOLUTION: We need CHUNKING + RETRIEVAL!');`;

  const step2Code = `// Step 2: Understanding Chunking Methods
console.log('📚 CHUNKING STRATEGIES\\n');

// METHOD 1: Fixed-Size Chunking (Simplest)
const text = "Large Language Models are neural networks. They process text as tokens. Tokens are pieces of words. Training requires massive datasets.";
const chunkSize = 50; // characters
const fixedChunks = [];

for (let i = 0; i < text.length; i += chunkSize) {
  fixedChunks.push(text.slice(i, i + chunkSize));
}

console.log('1️⃣ FIXED-SIZE CHUNKING');
console.log('Chunk size:', chunkSize, 'characters');
console.log('Total chunks:', fixedChunks.length);
fixedChunks.forEach((chunk, i) => {
  console.log(\`  Chunk \${i + 1}: "\${chunk}"\`);
});

console.log('\\n✓ Pros: Simple, predictable size');
console.log('❌ Cons: Splits mid-sentence, loses context\\n');

// METHOD 2: Sentence-Based Chunking (Better!)
const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
console.log('2️⃣ SENTENCE-BASED CHUNKING');
console.log('Total sentences:', sentences.length);
sentences.forEach((sent, i) => {
  console.log(\`  Sentence \${i + 1}: "\${sent.trim()}"\`);
});

console.log('\\n✓ Pros: Preserves meaning, natural breaks');
console.log('❌ Cons: Variable sizes, might be too small\\n');

// METHOD 3: Semantic Chunking with Overlap (Best!)
const semanticChunks = [];
const semanticChunkSize = 80;
const overlap = 20;

for (let i = 0; i < text.length; i += (semanticChunkSize - overlap)) {
  const chunk = text.slice(i, i + semanticChunkSize);
  if (chunk.length > 0) semanticChunks.push(chunk);
}

console.log('3️⃣ SEMANTIC CHUNKING WITH OVERLAP');
console.log('Chunk size:', semanticChunkSize, '| Overlap:', overlap);
console.log('Total chunks:', semanticChunks.length);
semanticChunks.forEach((chunk, i) => {
  console.log(\`  Chunk \${i + 1}: "\${chunk}"\`);
});

console.log('\\n✓ Pros: Context preserved, continuity maintained');
console.log('✓ Best for: RAG systems and semantic search!');`;

  const step3Code = `// Step 3: Real-World Chunking - YUV.AI Knowledge Base
const fullKnowledge = \`${largeDocs}\`;

console.log('📖 CHUNKING YUIV.AI KNOWLEDGE BASE\\n');
console.log('Original size:', fullKnowledge.length, 'characters');
console.log('Estimated tokens:', Math.floor(fullKnowledge.length / 4));
console.log('');

// Split by sections (most semantic approach)
const sections = fullKnowledge.split(/SECTION \\d+:/);
const validSections = sections.filter(s => s.trim().length > 0);

console.log('Using SECTION-BASED chunking (semantic boundaries)');
console.log('Total sections/chunks:', validSections.length);
console.log('');

validSections.forEach((section, i) => {
  const lines = section.trim().split('\\n');
  const title = lines[0];
  const preview = section.trim().substring(0, 100);

  console.log(\`Chunk \${i + 1}: \${title}\`);
  console.log(\`  Size: \${section.length} characters\`);
  console.log(\`  Preview: \${preview}...\\n\`);
});

console.log('✓ Each chunk is semantically complete!');
console.log('✓ Ready for embedding and vector search!');`;

  const step4Code = `// Step 4: Chunking Strategies Comparison
console.log('⚖️ CHUNKING STRATEGIES DECISION MATRIX\\n');

const strategies = [
  {
    name: 'Fixed-Size',
    chunkSize: '256-512 tokens',
    overlap: '50-100 tokens',
    useCases: ['General documents', 'When speed matters'],
    pros: ['Simple', 'Predictable', 'Fast processing'],
    cons: ['Breaks sentences', 'Loses context', 'Poor for code']
  },
  {
    name: 'Sentence-Based',
    chunkSize: 'Variable (per sentence)',
    overlap: 'None or 1-2 sentences',
    useCases: ['Blog posts', 'Articles', 'News'],
    pros: ['Natural breaks', 'Preserves meaning', 'Good for reading'],
    cons: ['Variable sizes', 'May be too small', 'Harder to optimize']
  },
  {
    name: 'Paragraph-Based',
    chunkSize: 'Variable (per paragraph)',
    overlap: '1 paragraph',
    useCases: ['Books', 'Documentation', 'Research papers'],
    pros: ['Complete thoughts', 'Good context', 'Natural units'],
    cons: ['Can be too large', 'Variable sizes', 'Depends on formatting']
  },
  {
    name: 'Semantic/Section',
    chunkSize: 'Variable (by meaning)',
    overlap: 'Intelligent (based on content)',
    useCases: ['Structured docs', 'Code', 'Knowledge bases'],
    pros: ['Best accuracy', 'Complete context', 'Meaningful units'],
    cons: ['Complex', 'Requires parsing', 'Needs structure']
  }
];

strategies.forEach((strategy, i) => {
  console.log(\`\${i + 1}. \${strategy.name.toUpperCase()}\`);
  console.log(\`   Chunk Size: \${strategy.chunkSize}\`);
  console.log(\`   Overlap: \${strategy.overlap}\`);
  console.log(\`   Best For: \${strategy.useCases.join(', ')}\`);
  console.log(\`   ✓ \${strategy.pros.join(', ')}\`);
  console.log(\`   ❌ \${strategy.cons.join(', ')}\\n\`);
});

console.log('💡 RECOMMENDATION:');
console.log('   For RAG systems: Use Semantic/Section chunking');
console.log('   For speed: Use Fixed-Size with overlap');
console.log('   For accuracy: Combine multiple strategies!');`;

  const step5Code = `// Step 5: Production Chunking with LangChain
// In production, use RecursiveCharacterTextSplitter!
console.log('🚀 PRODUCTION-READY CHUNKING\\n');

const fullText = \`${largeDocs}\`;

// Simulate RecursiveCharacterTextSplitter behavior
const chunkSize = 512;  // characters (in production: 512 tokens)
const chunkOverlap = 128; // 25% overlap for context continuity

const chunks = [];
for (let i = 0; i < fullText.length; i += (chunkSize - chunkOverlap)) {
  const chunk = fullText.slice(i, i + chunkSize);
  if (chunk.trim().length > 0) {
    chunks.push({
      content: chunk,
      metadata: {
        start: i,
        end: i + chunk.length,
        chunkNumber: chunks.length + 1
      }
    });
  }
}

console.log('📊 CHUNKING RESULTS');
console.log('Original text:', fullText.length, 'characters');
console.log('Chunk size:', chunkSize);
console.log('Overlap:', chunkOverlap);
console.log('Total chunks created:', chunks.length);
console.log('');

chunks.slice(0, 3).forEach(chunk => {
  console.log(\`Chunk #\${chunk.metadata.chunkNumber}\`);
  console.log(\`  Position: \${chunk.metadata.start}-\${chunk.metadata.end}\`);
  console.log(\`  Size: \${chunk.content.length} characters\`);
  console.log(\`  Preview: \${chunk.content.substring(0, 80)}...\\n\`);
});

console.log('✓ Ready for embedding!');
console.log('✓ Next: Convert these chunks to vectors!');
console.log('');
console.log('💡 KEY INSIGHTS:');
console.log('1. Chunk size affects retrieval precision');
console.log('2. Overlap prevents information loss at boundaries');
console.log('3. Metadata helps track source locations');
console.log('4. Smaller chunks = better precision, less context');
console.log('5. Larger chunks = more context, less precision');

celebrateCompletion();
markLabCompleteAndAdvance(5, ${TOTAL_LABS});`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      const output = `📊 CONTEXT WINDOW PROBLEM
Knowledge base size: ${largeDocs.length} characters
Estimated tokens: ~${Math.floor(largeDocs.length / 4)}

❌ PROBLEM: Most LLMs have token limits!
   - GPT-3.5: 4,096 tokens (~16K characters)
   - GPT-4: 8,192 tokens (~32K characters)
   - Claude Sonnet: 200K tokens (~800K characters)

Even with large contexts:
1. Cost increases linearly with context size
2. Latency increases (slower responses)
3. Accuracy degrades (lost in the middle problem)
4. Not all info is relevant to every question!

✓ SOLUTION: We need CHUNKING + RETRIEVAL!`;

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

  const executeStep2 = async (): Promise<ExecutionResult> => {
    try {
      const text = "Large Language Models are neural networks. They process text as tokens. Tokens are pieces of words. Training requires massive datasets.";
      const chunkSize = 50;
      const fixedChunks = [];

      for (let i = 0; i < text.length; i += chunkSize) {
        fixedChunks.push(text.slice(i, i + chunkSize));
      }

      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

      const semanticChunks = [];
      const semanticChunkSize = 80;
      const overlap = 20;

      for (let i = 0; i < text.length; i += (semanticChunkSize - overlap)) {
        const chunk = text.slice(i, i + semanticChunkSize);
        if (chunk.length > 0) semanticChunks.push(chunk);
      }

      let output = '📚 CHUNKING STRATEGIES\n\n';
      output += '1️⃣ FIXED-SIZE CHUNKING\n';
      output += `Chunk size: ${chunkSize} characters\n`;
      output += `Total chunks: ${fixedChunks.length}\n`;
      fixedChunks.forEach((chunk, i) => {
        output += `  Chunk ${i + 1}: "${chunk}"\n`;
      });
      output += '\n✓ Pros: Simple, predictable size\n';
      output += '❌ Cons: Splits mid-sentence, loses context\n\n';

      output += '2️⃣ SENTENCE-BASED CHUNKING\n';
      output += `Total sentences: ${sentences.length}\n`;
      sentences.forEach((sent, i) => {
        output += `  Sentence ${i + 1}: "${sent.trim()}"\n`;
      });
      output += '\n✓ Pros: Preserves meaning, natural breaks\n';
      output += '❌ Cons: Variable sizes, might be too small\n\n';

      output += '3️⃣ SEMANTIC CHUNKING WITH OVERLAP\n';
      output += `Chunk size: ${semanticChunkSize} | Overlap: ${overlap}\n`;
      output += `Total chunks: ${semanticChunks.length}\n`;
      semanticChunks.forEach((chunk, i) => {
        output += `  Chunk ${i + 1}: "${chunk}"\n`;
      });
      output += '\n✓ Pros: Context preserved, continuity maintained\n';
      output += '✓ Best for: RAG systems and semantic search!';

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

  const executeStep3 = async (): Promise<ExecutionResult> => {
    try {
      const sections = largeDocs.split(/SECTION \d+:/);
      const validSections = sections.filter(s => s.trim().length > 0);

      let output = '📖 CHUNKING YUV.AI KNOWLEDGE BASE\n\n';
      output += `Original size: ${largeDocs.length} characters\n`;
      output += `Estimated tokens: ${Math.floor(largeDocs.length / 4)}\n\n`;
      output += 'Using SECTION-BASED chunking (semantic boundaries)\n';
      output += `Total sections/chunks: ${validSections.length}\n\n`;

      validSections.forEach((section, i) => {
        const lines = section.trim().split('\n');
        const title = lines[0];
        const preview = section.trim().substring(0, 100);

        output += `Chunk ${i + 1}: ${title}\n`;
        output += `  Size: ${section.length} characters\n`;
        output += `  Preview: ${preview}...\n\n`;
      });

      output += '✓ Each chunk is semantically complete!\n';
      output += '✓ Ready for embedding and vector search!';

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

  const executeStep4 = async (): Promise<ExecutionResult> => {
    try {
      const strategies = [
        {
          name: 'Fixed-Size',
          chunkSize: '256-512 tokens',
          overlap: '50-100 tokens',
          useCases: ['General documents', 'When speed matters'],
          pros: ['Simple', 'Predictable', 'Fast processing'],
          cons: ['Breaks sentences', 'Loses context', 'Poor for code']
        },
        {
          name: 'Sentence-Based',
          chunkSize: 'Variable (per sentence)',
          overlap: 'None or 1-2 sentences',
          useCases: ['Blog posts', 'Articles', 'News'],
          pros: ['Natural breaks', 'Preserves meaning', 'Good for reading'],
          cons: ['Variable sizes', 'May be too small', 'Harder to optimize']
        },
        {
          name: 'Paragraph-Based',
          chunkSize: 'Variable (per paragraph)',
          overlap: '1 paragraph',
          useCases: ['Books', 'Documentation', 'Research papers'],
          pros: ['Complete thoughts', 'Good context', 'Natural units'],
          cons: ['Can be too large', 'Variable sizes', 'Depends on formatting']
        },
        {
          name: 'Semantic/Section',
          chunkSize: 'Variable (by meaning)',
          overlap: 'Intelligent (based on content)',
          useCases: ['Structured docs', 'Code', 'Knowledge bases'],
          pros: ['Best accuracy', 'Complete context', 'Meaningful units'],
          cons: ['Complex', 'Requires parsing', 'Needs structure']
        }
      ];

      let output = '⚖️ CHUNKING STRATEGIES DECISION MATRIX\n\n';

      strategies.forEach((strategy, i) => {
        output += `${i + 1}. ${strategy.name.toUpperCase()}\n`;
        output += `   Chunk Size: ${strategy.chunkSize}\n`;
        output += `   Overlap: ${strategy.overlap}\n`;
        output += `   Best For: ${strategy.useCases.join(', ')}\n`;
        output += `   ✓ ${strategy.pros.join(', ')}\n`;
        output += `   ❌ ${strategy.cons.join(', ')}\n\n`;
      });

      output += '💡 RECOMMENDATION:\n';
      output += '   For RAG systems: Use Semantic/Section chunking\n';
      output += '   For speed: Use Fixed-Size with overlap\n';
      output += '   For accuracy: Combine multiple strategies!';

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

  const executeStep5 = async (): Promise<ExecutionResult> => {
    try {
      const chunkSize = 512;
      const chunkOverlap = 128;

      const chunks = [];
      for (let i = 0; i < largeDocs.length; i += (chunkSize - chunkOverlap)) {
        const chunk = largeDocs.slice(i, i + chunkSize);
        if (chunk.trim().length > 0) {
          chunks.push({
            content: chunk,
            metadata: {
              start: i,
              end: i + chunk.length,
              chunkNumber: chunks.length + 1
            }
          });
        }
      }

      let output = '📊 CHUNKING RESULTS\n';
      output += `Original text: ${largeDocs.length} characters\n`;
      output += `Chunk size: ${chunkSize}\n`;
      output += `Overlap: ${chunkOverlap}\n`;
      output += `Total chunks created: ${chunks.length}\n\n`;

      chunks.slice(0, 3).forEach(chunk => {
        output += `Chunk #${chunk.metadata.chunkNumber}\n`;
        output += `  Position: ${chunk.metadata.start}-${chunk.metadata.end}\n`;
        output += `  Size: ${chunk.content.length} characters\n`;
        output += `  Preview: ${chunk.content.substring(0, 80)}...\n\n`;
      });

      output += '✓ Ready for embedding!\n';
      output += '✓ Next: Convert these chunks to vectors!\n\n';
      output += '💡 KEY INSIGHTS:\n';
      output += '1. Chunk size affects retrieval precision\n';
      output += '2. Overlap prevents information loss at boundaries\n';
      output += '3. Metadata helps track source locations\n';
      output += '4. Smaller chunks = better precision, less context\n';
      output += '5. Larger chunks = more context, less precision';

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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in w-full">
      <div className="hero-image-container mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
        <img
          src="/lab5-hero.jpg"
          alt="Lab 5: Context Window Problem & Chunking"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl bg-black/40 backdrop-blur-sm">
        <img
          src="/lab5-diagram.png"
          alt="Context Window & Chunking Diagram"
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg flex-shrink-0">
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 5: The Context Window Problem & Chunking
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Why we can't just send everything to the LLM - and what to do about it
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>The context window problem: token limits, cost, and accuracy issues</li>
              <li>Why even 200K token models need chunking</li>
              <li>4 chunking strategies: fixed-size, sentence, paragraph, semantic</li>
              <li>Chunk overlap and why it matters for retrieval</li>
              <li>Real-world chunking with production-ready patterns</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            1
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            The Context Window Problem
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-context-problem"
          initialCode={step1Code}
          description="Discover why we can't just send large documents to LLMs"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Chunking Strategies Explained
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-chunking-methods"
          initialCode={step2Code}
          description="Learn 3 core chunking methods with visual examples"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Real-World Chunking Example
          </h2>
        </div>
        <TerminalCodeCell
          title="step-3-real-chunking"
          initialCode={step3Code}
          description="Chunk a large knowledge base into semantic sections"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            4
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Chunking Decision Matrix
          </h2>
        </div>
        <TerminalCodeCell
          title="step-4-comparison"
          initialCode={step4Code}
          description="Compare all chunking strategies - when to use each one"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg animate-pulse-glow">
            5
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Production-Ready Chunking
          </h2>
        </div>
        <TerminalCodeCell
          title="step-5-production"
          initialCode={step5Code}
          description="Build production chunking with overlap and metadata!"
          onExecute={executeStep5}
        />
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-amber-200 dark:border-amber-800">
        <h3 className="text-sm sm:text-base font-semibold text-amber-900 dark:text-amber-100 mb-3">
          🎯 Key Chunking Principles
        </h3>
        <ul className="space-y-2 text-amber-800 dark:text-amber-200 text-xs sm:text-sm">
          <li>✓ <strong>Chunk size:</strong> 256-512 tokens (balance context vs precision)</li>
          <li>✓ <strong>Overlap:</strong> 10-25% overlap prevents info loss at boundaries</li>
          <li>✓ <strong>Method:</strong> Choose based on content structure</li>
          <li>✓ <strong>Metadata:</strong> Track source, position, and chunk number</li>
          <li>✓ <strong>Testing:</strong> Evaluate retrieval quality with real queries</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Chunking Mastered!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm">
          You now understand WHY chunking is essential and HOW to do it right. Next: we'll convert
          these chunks into embeddings (meaning vectors) that enable semantic search!
        </p>
      </div>
      <CompleteLabButton labId={5} />
    </div>
  );
}
