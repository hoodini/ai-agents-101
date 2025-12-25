import { BookOpen, Search, Database, Layers, Sparkles } from 'lucide-react';
import { celebrateCompletion } from '../utils/confetti';

const TOTAL_LABS = 8;
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { CohereEmbeddings, CohereRerank } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { PromptTemplate } from '@langchain/core/prompts';
import type { ExecutionResult } from '../types';

export function Lab6() {
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

  // Real knowledge base about AI and LLMs
  const documents = [
    "Large Language Models (LLMs) are neural networks trained on massive amounts of text data. They can understand and generate human-like text. Popular examples include GPT-4, Claude, and Llama.",
    "Vector embeddings are numerical representations of text that capture semantic meaning. Similar texts have similar embedding vectors, which enables semantic search.",
    "RAG (Retrieval-Augmented Generation) combines information retrieval with text generation. It retrieves relevant documents from a knowledge base and uses them as context for the LLM.",
    "Cohere provides enterprise-grade AI models including embeddings, reranking, and generation. Their embed-english-v3.0 model creates high-quality semantic embeddings.",
    "Reranking improves search results by re-scoring retrieved documents based on relevance to the query. Cohere's rerank model achieves state-of-the-art performance.",
    "Semantic similarity is measured using cosine similarity between embedding vectors. Scores range from -1 (opposite) to 1 (identical), with higher scores indicating greater similarity.",
    "Chunking is the process of splitting long documents into smaller pieces. Good chunk size balances context (larger chunks) with precision (smaller chunks). Common sizes: 256-1024 tokens.",
    "Vector databases like Pinecone, Weaviate, and Chroma store embeddings efficiently and enable fast similarity search at scale. They're essential for production RAG systems.",
  ];

  const step1Code = `// Step 1: Document Chunking - See How Documents are Split
const documents = [
  "Large Language Models (LLMs) are neural networks trained on massive amounts of text data. They can understand and generate human-like text. Popular examples include GPT-4, Claude, and Llama.",
  "Vector embeddings are numerical representations of text that capture semantic meaning. Similar texts have similar embedding vectors, which enables semantic search.",
  "RAG (Retrieval-Augmented Generation) combines information retrieval with text generation. It retrieves relevant documents from a knowledge base and uses them as context for the LLM.",
  "Cohere provides enterprise-grade AI models including embeddings, reranking, and generation. Their embed-english-v3.0 model creates high-quality semantic embeddings.",
];

console.log('📚 Total Documents:', documents.length);
console.log('\\n--- Document Chunks ---');
documents.forEach((doc, i) => {
  console.log(\`\\nChunk \${i + 1}:\`);
  console.log(\`Length: \${doc.length} characters\`);
  console.log(\`Preview: \${doc.substring(0, 80)}...\`);
});

console.log('\\n✓ Documents chunked and ready for embedding!');`;

  const step2Code = `// Step 2: Create Embeddings - See the Magic of Vector Representation!
import { CohereEmbeddings } from '@langchain/cohere';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

// Embed a single query to see what embeddings look like
const query = "What are embeddings?";
const queryEmbedding = await embeddings.embedQuery(query);

console.log('🔢 EMBEDDING VISUALIZATION');
console.log('Query:', query);
console.log('\\nEmbedding Details:');
console.log('- Dimensions:', queryEmbedding.length);
console.log('- Type: Float32 vector');
console.log('\\nFirst 10 dimensions:', queryEmbedding.slice(0, 10).map(n => n.toFixed(4)));
console.log('Last 10 dimensions:', queryEmbedding.slice(-10).map(n => n.toFixed(4)));
console.log('\\n✓ This vector captures the MEANING of your query!');
console.log('✓ Similar texts will have similar vectors!');`;

  const step3Code = `// Step 3: Build Vector Store - Create Searchable Knowledge Base
import { CohereEmbeddings } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const documents = [
  "Large Language Models (LLMs) are neural networks trained on massive amounts of text data.",
  "Vector embeddings are numerical representations that capture semantic meaning.",
  "RAG combines information retrieval with text generation.",
  "Cohere provides enterprise-grade AI models including embeddings and reranking.",
];

// Convert to LangChain Document objects
const docs = documents.map(text => new Document({ pageContent: text }));

// Create vector store - this embeds ALL documents!
console.log('🔄 Embedding all documents...');
const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

console.log(\`\\n✓ Created vector store with \${documents.length} documents\`);
console.log('✓ Each document is now a vector in semantic space');
console.log('✓ Ready for similarity search!');`;

  const step4Code = `// Step 4: Similarity Search - Find Relevant Documents
import { CohereEmbeddings } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const documents = [
  "Large Language Models (LLMs) are neural networks trained on massive amounts of text data.",
  "Vector embeddings are numerical representations that capture semantic meaning.",
  "RAG combines information retrieval with text generation.",
  "Cohere provides enterprise-grade AI models including embeddings and reranking.",
  "Semantic similarity is measured using cosine similarity between vectors.",
  "Chunking splits long documents into smaller pieces for better retrieval.",
];

const docs = documents.map(text => new Document({ pageContent: text }));
const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

// Perform similarity search with scores!
const query = "How do you measure if two texts are similar?";
const results = await vectorStore.similaritySearchWithScore(query, 3);

console.log('🔍 SIMILARITY SEARCH RESULTS');
console.log('Query:', query);
console.log('\\nTop 3 Most Relevant Documents:\\n');

results.forEach(([doc, score], i) => {
  console.log(\`Rank \${i + 1}: (Similarity: \${score.toFixed(4)})\`);
  console.log(\`"\${doc.pageContent}"\`);
  console.log('');
});

console.log('✓ Higher scores = more relevant!');`;

  const step5Code = `// Step 5: Cohere Reranking - Boost Accuracy with Advanced Reranking!
import { CohereEmbeddings, CohereRerank } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const documents = [
  "Large Language Models (LLMs) are neural networks trained on massive amounts of text data.",
  "Vector embeddings are numerical representations that capture semantic meaning.",
  "RAG combines information retrieval with text generation.",
  "Cohere provides enterprise-grade AI models including embeddings and reranking.",
  "Semantic similarity is measured using cosine similarity between vectors.",
  "Chunking splits long documents into smaller pieces for better retrieval.",
  "Reranking improves search results by re-scoring based on true relevance.",
  "Vector databases enable fast similarity search at production scale.",
];

const docs = documents.map(text => new Document({ pageContent: text }));
const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

const query = "How can I improve search accuracy?";

// Step 1: Get initial results from vector search
const initialResults = await vectorStore.similaritySearchWithScore(query, 5);

console.log('🔍 BEFORE RERANKING (Vector Search Only):\\n');
initialResults.forEach(([doc, score], i) => {
  console.log(\`\${i + 1}. Score: \${score.toFixed(4)} | \${doc.pageContent.substring(0, 60)}...\`);
});

// Step 2: Rerank with Cohere for better relevance
const reranker = new CohereRerank({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'rerank-english-v3.0',
  topN: 3,
});

const rerankedDocs = await reranker.compressDocuments(
  initialResults.map(([doc]) => doc),
  query
);

console.log('\\n⚡ AFTER RERANKING (Cohere Rerank):\\n');
rerankedDocs.forEach((doc, i) => {
  const relevanceScore = doc.metadata.relevanceScore || 0;
  console.log(\`\${i + 1}. Relevance: \${relevanceScore.toFixed(4)} | \${doc.pageContent.substring(0, 60)}...\`);
});

console.log('\\n✓ Reranking found the MOST relevant results!');
console.log('✓ Notice how "Reranking improves search" moved to the top!');`;

  const step6Code = `// Step 6: Complete RAG System - Question Answering with Retrieved Context
import { CohereEmbeddings, CohereRerank } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { PromptTemplate } from '@langchain/core/prompts';

const llm = new ChatOpenAI({
  openAIApiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here'}',
  modelName: '${selectedModel}',${getBaseConfig()}
});

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const documents = [
  "Large Language Models (LLMs) are neural networks trained on massive amounts of text data.",
  "Vector embeddings are numerical representations that capture semantic meaning.",
  "RAG combines information retrieval with text generation.",
  "Cohere provides enterprise-grade AI models including embeddings and reranking.",
  "Semantic similarity is measured using cosine similarity between vectors.",
  "Chunking splits long documents into smaller pieces for better retrieval.",
  "Reranking improves search results by re-scoring based on true relevance.",
  "Vector databases enable fast similarity search at production scale.",
];

const docs = documents.map(text => new Document({ pageContent: text }));
const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

const query = "What is RAG and how does it work?";

// Retrieve and rerank
const initialResults = await vectorStore.similaritySearchWithScore(query, 5);
const reranker = new CohereRerank({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'rerank-english-v3.0',
  topN: 3,
});
const relevantDocs = await reranker.compressDocuments(
  initialResults.map(([doc]) => doc),
  query
);

// Generate answer using retrieved context
const context = relevantDocs.map(doc => doc.pageContent).join('\\n');
const template = \`Answer the question using ONLY the context below.

CONTEXT:
{context}

QUESTION: {question}

ANSWER:\`;

const prompt = PromptTemplate.fromTemplate(template);
const formattedPrompt = await prompt.format({ context, question: query });
const answer = await llm.invoke(formattedPrompt);

console.log('❓ Question:', query);
console.log('\\n📚 Retrieved Context (Top 3 after reranking):\\n');
relevantDocs.forEach((doc, i) => {
  console.log(\`\${i + 1}. \${doc.pageContent}\`);
});
console.log('\\n💡 Generated Answer:\\n');
console.log(answer.content);
console.log('\\n✓ Complete RAG pipeline: Retrieve → Rerank → Generate!');`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      let output = `📚 Total Documents: ${documents.length}\n\n--- Document Chunks ---`;

      documents.slice(0, 4).forEach((doc, i) => {
        output += `\n\nChunk ${i + 1}:`;
        output += `\nLength: ${doc.length} characters`;
        output += `\nPreview: ${doc.substring(0, 80)}...`;
      });

      output += '\n\n✓ Documents chunked and ready for embedding!';

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
      if (!apiKey) {
        throw new Error('Please configure your Cohere API key in Settings');
      }

      const embeddings = new CohereEmbeddings({
        apiKey,
        model: 'embed-english-v3.0',
      });

      const query = "What are embeddings?";
      const queryEmbedding = await embeddings.embedQuery(query);

      const output = `🔢 EMBEDDING VISUALIZATION
Query: ${query}

Embedding Details:
- Dimensions: ${queryEmbedding.length}
- Type: Float32 vector

First 10 dimensions: ${queryEmbedding.slice(0, 10).map(n => n.toFixed(4)).join(', ')}
Last 10 dimensions: ${queryEmbedding.slice(-10).map(n => n.toFixed(4)).join(', ')}

✓ This vector captures the MEANING of your query!
✓ Similar texts will have similar vectors!`;

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
      if (!apiKey) {
        throw new Error('Please configure your Cohere API key in Settings');
      }

      const embeddings = new CohereEmbeddings({
        apiKey,
        model: 'embed-english-v3.0',
      });

      const docs = documents.slice(0, 4).map(text => new Document({ pageContent: text }));

      const output = '🔄 Embedding all documents...\n';
      await MemoryVectorStore.fromDocuments(docs, embeddings);

      return {
        output: output + `\n✓ Created vector store with ${docs.length} documents\n✓ Each document is now a vector in semantic space\n✓ Ready for similarity search!`,
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
        throw new Error('Please configure your Cohere API key in Settings');
      }

      const embeddings = new CohereEmbeddings({
        apiKey,
        model: 'embed-english-v3.0',
      });

      const docs = documents.slice(0, 6).map(text => new Document({ pageContent: text }));
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      const query = "How do you measure if two texts are similar?";
      const results = await vectorStore.similaritySearchWithScore(query, 3);

      let output = '🔍 SIMILARITY SEARCH RESULTS\n';
      output += `Query: ${query}\n\nTop 3 Most Relevant Documents:\n\n`;

      results.forEach(([doc, score]: [Document, number], i: number) => {
        output += `Rank ${i + 1}: (Similarity: ${score.toFixed(4)})\n`;
        output += `"${doc.pageContent}"\n\n`;
      });

      output += '✓ Higher scores = more relevant!';

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
      if (!apiKey) {
        throw new Error('Please configure your Cohere API key in Settings');
      }

      const embeddings = new CohereEmbeddings({
        apiKey,
        model: 'embed-english-v3.0',
      });

      const docs = documents.map(text => new Document({ pageContent: text }));
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      const query = "How can I improve search accuracy?";
      const initialResults = await vectorStore.similaritySearchWithScore(query, 5);

      let output = '🔍 BEFORE RERANKING (Vector Search Only):\n\n';
      initialResults.forEach(([doc, score]: [Document, number], i: number) => {
        output += `${i + 1}. Score: ${score.toFixed(4)} | ${doc.pageContent.substring(0, 60)}...\n`;
      });

      const reranker = new CohereRerank({
        apiKey,
        model: 'rerank-english-v3.0',
        topN: 3,
      });

      const rerankedDocs = await reranker.compressDocuments(
        initialResults.map(([doc]: [Document, number]) => doc),
        query
      );

      output += '\n⚡ AFTER RERANKING (Cohere Rerank):\n\n';
      rerankedDocs.forEach((doc, i) => {
        const relevanceScore = doc.metadata.relevanceScore || 0;
        output += `${i + 1}. Relevance: ${relevanceScore.toFixed(4)} | ${doc.pageContent.substring(0, 60)}...\n`;
      });

      output += '\n✓ Reranking found the MOST relevant results!';
      output += '\n✓ Notice how "Reranking improves search" moved to the top!';

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

  const executeStep6 = async (): Promise<ExecutionResult> => {
    try {
      if (!apiKey) {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey, provider, selectedModel);

      const embeddings = new CohereEmbeddings({
        apiKey,
        model: 'embed-english-v3.0',
      });

      const docs = documents.map(text => new Document({ pageContent: text }));
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      const query = "What is RAG and how does it work?";
      const initialResults = await vectorStore.similaritySearchWithScore(query, 5);

      const reranker = new CohereRerank({
        apiKey,
        model: 'rerank-english-v3.0',
        topN: 3,
      });

      const relevantDocs = await reranker.compressDocuments(
        initialResults.map(([doc]: [Document, number]) => doc),
        query
      );

      const context = relevantDocs.map(doc => doc.pageContent).join('\n');
      const template = `Answer the question using ONLY the context below.

CONTEXT:
{context}

QUESTION: {question}

ANSWER:`;

      const prompt = PromptTemplate.fromTemplate(template);
      const formattedPrompt = await prompt.format({ context, question: query });
      const answer = await llm.invoke(formattedPrompt);

      let output = `❓ Question: ${query}\n\n📚 Retrieved Context (Top 3 after reranking):\n\n`;
      relevantDocs.forEach((doc, i) => {
        output += `${i + 1}. ${doc.pageContent}\n`;
      });
      output += '\n💡 Generated Answer:\n\n';
      output += answer.content;
      output += '\n\n✓ Complete RAG pipeline: Retrieve → Rerank → Generate!';

      celebrateCompletion();
      markLabCompleteAndAdvance(6, TOTAL_LABS);

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
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 6: RAG Deep Dive
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Master embeddings, vector search, and reranking
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn in depth:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>How document chunking works and why it matters</li>
              <li>What embeddings look like under the hood (actual vectors!)</li>
              <li>Similarity search with cosine similarity scores</li>
              <li>Cohere reranking for improved accuracy</li>
              <li>Complete RAG pipeline with real code</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            1
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Document Chunking
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-chunking"
          initialCode={step1Code}
          description="See how documents are split into chunks for processing"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            2
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Vector Embeddings Revealed
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-embeddings"
          initialCode={step2Code}
          description="See actual embedding vectors - the magic behind semantic search!"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            3
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Build Vector Store
          </h2>
        </div>
        <TerminalCodeCell
          title="step-3-vectorstore"
          initialCode={step3Code}
          description="Create a searchable vector database from documents"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            4
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Similarity Search
          </h2>
        </div>
        <TerminalCodeCell
          title="step-4-similarity"
          initialCode={step4Code}
          description="Find relevant documents using vector similarity with scores!"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            5
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Cohere Reranking
          </h2>
        </div>
        <TerminalCodeCell
          title="step-5-reranking"
          initialCode={step5Code}
          description="Boost accuracy with Cohere's state-of-the-art reranking!"
          onExecute={executeStep5}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg animate-pulse-glow">
            6
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Complete RAG System
          </h2>
        </div>
        <TerminalCodeCell
          title="complete-rag-system"
          initialCode={step6Code}
          description="Full RAG pipeline: Chunk → Embed → Search → Rerank → Generate!"
          onExecute={executeStep6}
        />
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-violet-200 dark:border-violet-800">
        <h3 className="font-semibold text-violet-900 dark:text-violet-100 mb-3">
          🎓 What You Just Learned
        </h3>
        <ul className="space-y-2 text-violet-800 dark:text-violet-200 text-sm">
          <li>✓ <strong>Chunking:</strong> How to split documents into processable pieces</li>
          <li>✓ <strong>Embeddings:</strong> Saw actual vector representations (1024 dimensions!)</li>
          <li>✓ <strong>Vector Search:</strong> Understanding cosine similarity scores</li>
          <li>✓ <strong>Reranking:</strong> Cohere's advanced relevance scoring</li>
          <li>✓ <strong>RAG Pipeline:</strong> End-to-end retrieval and generation</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 Production RAG Tips
        </h3>
        <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
          <li>• Use production vector databases: Pinecone, Weaviate, Chroma, or Qdrant</li>
          <li>• Optimal chunk size: 256-512 tokens with 50-100 token overlap</li>
          <li>• Always rerank your top results for best accuracy</li>
          <li>• Cache embeddings to reduce API costs</li>
          <li>• Monitor retrieval quality with metrics</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 RAG Mastered!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-sm">
          You now understand RAG deeply - from raw text to semantic vectors to intelligent retrieval!
          This powers ChatGPT plugins, documentation bots, and enterprise AI systems. Next: multi-agent collaboration!
        </p>
      </div>
      <CompleteLabButton labId={6} />
    </div>
  );
}
