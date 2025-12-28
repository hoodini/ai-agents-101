import { Search, Layers, Sparkles, Zap, Network, Brain } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { createLLM } from '../utils/llmFactory';
import { celebrateCompletion } from '../utils/confetti';
import { CohereEmbeddings, CohereRerank } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import type { ExecutionResult } from '../types';

export function Lab9() {
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

  // Extended knowledge base for advanced RAG
  const documents = [
    "LangChain is a framework for building applications powered by language models. It provides composable tools and integrations for working with LLMs, including chains, agents, and memory systems.",
    "Multi-query retrieval improves RAG by generating multiple search queries from a single user question. This captures different perspectives and increases the chances of finding all relevant information.",
    "Query expansion transforms a user's query into multiple related queries. For example, 'What is RAG?' might expand to 'What is retrieval-augmented generation?', 'How does RAG work?', and 'Benefits of RAG systems'.",
    "Cohere's Command R models are optimized for RAG workflows with superior context understanding. They excel at grounded generation, citing sources, and reducing hallucinations.",
    "Hypothetical Document Embeddings (HyDE) improve retrieval by first generating a hypothetical answer, then using that answer's embedding to search. This bridges the semantic gap between questions and answers.",
    "Ensemble retrieval combines multiple retrieval methods (BM25, dense embeddings, hybrid) to capture both keyword and semantic matches. This provides more robust results than any single method.",
    "Contextual compression filters retrieved documents to keep only the most relevant sentences. This reduces noise, fits more information in context windows, and improves generation quality.",
    "Parent document retrieval stores small chunks for precise matching but returns larger parent documents for better context. This balances retrieval precision with generation quality.",
    "Self-querying retrievers use LLMs to extract structured metadata filters from natural language queries. For example, 'recent papers about transformers' extracts date_filter='recent' and topic_filter='transformers'.",
    "Time-weighted retrieval prioritizes recent documents over older ones, making it ideal for applications where recency matters like news, market data, or technical documentation.",
    "Metadata filtering allows retrieval to filter by document properties like author, date, category, or tags before semantic search. This dramatically improves precision for domain-specific queries.",
    "Re-ranking is the final stage of advanced RAG pipelines. After initial retrieval, a specialized model re-scores candidates for true relevance to the query, improving precision significantly.",
  ];

  const step1Code = `// Step 1: Multi-Query Generation - Transform One Question Into Many!
${getLLMInit()};

const originalQuery = "How can I improve my RAG system's accuracy?";

// Generate multiple search queries from the original question
const multiQueryPrompt = \`You are an AI assistant helping to improve search results.
Generate 3 different search queries that would help answer this question from different angles.

Original question: {question}

Output ONLY the 3 queries, one per line, numbered 1-3.\`;

const prompt = PromptTemplate.fromTemplate(multiQueryPrompt);
const formattedPrompt = await prompt.format({ question: originalQuery });
const response = await llm.invoke(formattedPrompt);

console.log('🎯 MULTI-QUERY GENERATION');
console.log('Original Query:', originalQuery);
console.log('\\n📝 Generated Queries:\\n');
console.log(response.content);
console.log('\\n✓ Multiple queries capture different perspectives!');
console.log('✓ This increases the chance of finding all relevant info!');`;

  const step2Code = `// Step 2: Execute Multi-Query Retrieval - Search With All Queries!
import { CohereEmbeddings } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

${getLLMInit()};

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

// Sample knowledge base (12 documents about RAG)
const docs = [
  "Multi-query retrieval improves RAG by generating multiple search queries from a single question.",
  "Cohere's Command R models are optimized for RAG with superior context understanding.",
  "Ensemble retrieval combines BM25, dense embeddings, and hybrid search for robust results.",
  "Re-ranking is the final stage, using specialized models to score true relevance.",
  // ... more documents
].map(text => new Document({ pageContent: text }));

const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

// Generate multiple queries
const originalQuery = "How can I improve my RAG accuracy?";
const queries = [
  "How can I improve my RAG accuracy?",
  "What are advanced retrieval techniques for RAG systems?",
  "How to reduce hallucinations in retrieval-augmented generation?",
];

console.log('🔍 MULTI-QUERY RETRIEVAL\\n');

// Execute searches with all queries
const allResults = [];
for (const query of queries) {
  const results = await vectorStore.similaritySearchWithScore(query, 3);
  console.log(\`Query: "\${query}"\`);
  console.log('Top result:', results[0][0].pageContent.substring(0, 70) + '...');
  console.log('');
  allResults.push(...results);
}

console.log(\`✓ Retrieved \${allResults.length} total results from \${queries.length} queries!\`);`;

  const step3Code = `// Step 3: Deduplicate & Merge Results - Combine Without Duplicates!
import { CohereEmbeddings } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const docs = [
  "Multi-query retrieval improves RAG by generating multiple search queries.",
  "Cohere's Command R models excel at grounded generation and citing sources.",
  "Ensemble retrieval combines multiple methods for robust results.",
  "Re-ranking uses specialized models to improve precision significantly.",
  "Contextual compression filters documents to keep only relevant sentences.",
  "Parent document retrieval balances precision with context quality.",
].map(text => new Document({ pageContent: text }));

const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

const queries = [
  "How can I improve RAG accuracy?",
  "What are advanced retrieval techniques?",
  "How to reduce hallucinations in RAG?",
];

// Retrieve with all queries
const allResults = [];
for (const query of queries) {
  const results = await vectorStore.similaritySearchWithScore(query, 3);
  allResults.push(...results);
}

console.log('📊 DEDUPLICATION PROCESS\\n');
console.log('Before deduplication:', allResults.length, 'results');

// Deduplicate by document content
const seen = new Set();
const uniqueResults = allResults.filter(([doc]) => {
  if (seen.has(doc.pageContent)) return false;
  seen.add(doc.pageContent);
  return true;
});

console.log('After deduplication:', uniqueResults.length, 'unique results');
console.log('\\n📚 Unique Documents Found:\\n');

uniqueResults.forEach(([doc, score], i) => {
  console.log(\`\${i + 1}. (Score: \${score.toFixed(4)}) \${doc.pageContent.substring(0, 60)}...\`);
});

console.log('\\n✓ Removed duplicates while preserving the best matches!');`;

  const step4Code = `// Step 4: Reciprocal Rank Fusion - Smart Merge with RRF Algorithm!
import { CohereEmbeddings } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const docs = [
  "Multi-query retrieval improves RAG by generating multiple search queries.",
  "Cohere's Command R models excel at grounded generation and citing sources.",
  "Ensemble retrieval combines multiple methods for robust results.",
  "Re-ranking uses specialized models to improve precision significantly.",
  "Contextual compression filters documents to keep only relevant sentences.",
  "Hypothetical Document Embeddings (HyDE) bridge semantic gaps.",
].map(text => new Document({ pageContent: text }));

const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

const queries = [
  "How can I improve RAG accuracy?",
  "What are advanced retrieval techniques?",
];

// Reciprocal Rank Fusion (RRF) - industry standard for merging results
const k = 60; // RRF constant
const docScores = new Map();

for (const query of queries) {
  const results = await vectorStore.similaritySearchWithScore(query, 3);
  results.forEach(([doc, _score], rank) => {
    const content = doc.pageContent;
    const rrfScore = 1 / (k + rank + 1); // RRF formula
    docScores.set(content, (docScores.get(content) || 0) + rrfScore);
  });
}

// Sort by combined RRF score
const rankedDocs = Array.from(docScores.entries())
  .sort(([,a], [,b]) => b - a)
  .slice(0, 5);

console.log('🏆 RECIPROCAL RANK FUSION RESULTS\\n');
console.log('Algorithm: RRF combines rankings from multiple queries');
console.log('Formula: score = 1 / (k + rank + 1), where k = 60\\n');

rankedDocs.forEach(([content, score], i) => {
  console.log(\`\${i + 1}. RRF Score: \${score.toFixed(4)}\`);
  console.log(\`   \${content.substring(0, 65)}...\`);
  console.log('');
});

console.log('✓ RRF gives higher scores to docs that rank well across ALL queries!');`;

  const step5Code = `// Step 5: Advanced RAG with Reranking - Complete Multi-Query Pipeline!
import { CohereEmbeddings, CohereRerank } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { PromptTemplate } from '@langchain/core/prompts';

${getLLMInit()};

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const docs = [
  "Multi-query retrieval improves RAG by generating multiple search queries.",
  "Cohere's Command R models excel at grounded generation.",
  "Ensemble retrieval combines multiple methods for robust results.",
  "Re-ranking uses specialized models to improve precision.",
  "Contextual compression filters to keep only relevant sentences.",
  "Parent document retrieval balances precision with context.",
  "Self-querying extractors use LLMs for metadata filtering.",
  "HyDE generates hypothetical answers to bridge semantic gaps.",
].map(text => new Document({ pageContent: text }));

const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

const originalQuery = "What techniques improve RAG accuracy?";

// Step 1: Generate multiple queries
const multiQueryPrompt = \`Generate 2 alternative search queries for: {question}
Output only the queries, one per line.\`;
const prompt = PromptTemplate.fromTemplate(multiQueryPrompt);
const formattedPrompt = await prompt.format({ question: originalQuery });
const response = await llm.invoke(formattedPrompt);

const generatedQueries = response.content.split('\\n').filter(q => q.trim());
const allQueries = [originalQuery, ...generatedQueries.slice(0, 2)];

// Step 2: Multi-query retrieval with RRF
const k = 60;
const docScores = new Map();
const docObjects = new Map();

for (const query of allQueries) {
  const results = await vectorStore.similaritySearchWithScore(query, 4);
  results.forEach(([doc], rank) => {
    const content = doc.pageContent;
    docObjects.set(content, doc);
    docScores.set(content, (docScores.get(content) || 0) + 1 / (k + rank + 1));
  });
}

const topDocs = Array.from(docScores.entries())
  .sort(([,a], [,b]) => b - a)
  .slice(0, 5)
  .map(([content]) => docObjects.get(content)!);

console.log('🎯 ADVANCED MULTI-QUERY RAG\\n');
console.log('Original Query:', originalQuery);
console.log(\`\\nGenerated \${allQueries.length - 1} additional queries\`);
console.log(\`Retrieved \${topDocs.length} candidates via RRF\\n\`);

// Step 3: Rerank with Cohere
const reranker = new CohereRerank({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'rerank-english-v3.0',
  topN: 3,
});

const rerankedDocs = await reranker.compressDocuments(topDocs, originalQuery);

console.log('📚 Top 3 After Reranking:\\n');
rerankedDocs.forEach((doc, i) => {
  console.log(\`\${i + 1}. \${doc.pageContent}\`);
});

console.log('\\n✓ Multi-query + RRF + Reranking = Production-grade RAG!');`;

  const step6Code = `// Step 6: Complete Advanced RAG System - Multi-Query → RRF → Rerank → Generate!
import { CohereEmbeddings, CohereRerank } from '@langchain/cohere';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { PromptTemplate } from '@langchain/core/prompts';

${getLLMInit()};

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const docs = [
  "Multi-query retrieval improves RAG by generating multiple search queries from a single question.",
  "Cohere's Command R models are optimized for RAG with superior context understanding.",
  "Ensemble retrieval combines multiple methods for more robust results.",
  "Re-ranking is the final stage that uses specialized models to score true relevance.",
  "Contextual compression filters retrieved documents to keep only relevant sentences.",
  "Parent document retrieval stores small chunks but returns larger parent documents.",
  "Self-querying retrievers use LLMs to extract metadata filters from queries.",
  "Hypothetical Document Embeddings (HyDE) bridge the semantic gap between questions and answers.",
].map(text => new Document({ pageContent: text }));

const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

const userQuestion = "What are the best ways to improve RAG accuracy?";

// STAGE 1: Multi-Query Generation
const multiQueryPrompt = \`Generate 2 alternative search queries for: {question}\\nOutput only queries, one per line.\`;
const prompt1 = PromptTemplate.fromTemplate(multiQueryPrompt);
const formatted1 = await prompt1.format({ question: userQuestion });
const response = await llm.invoke(formatted1);
const queries = [userQuestion, ...response.content.split('\\n').filter(q => q.trim()).slice(0, 2)];

// STAGE 2: Multi-Query Retrieval with RRF
const k = 60;
const docScores = new Map();
const docObjects = new Map();

for (const query of queries) {
  const results = await vectorStore.similaritySearchWithScore(query, 4);
  results.forEach(([doc], rank) => {
    docObjects.set(doc.pageContent, doc);
    docScores.set(doc.pageContent, (docScores.get(doc.pageContent) || 0) + 1 / (k + rank + 1));
  });
}

const topDocs = Array.from(docScores.entries())
  .sort(([,a], [,b]) => b - a)
  .slice(0, 6)
  .map(([content]) => docObjects.get(content)!);

// STAGE 3: Rerank
const reranker = new CohereRerank({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'rerank-english-v3.0',
  topN: 3,
});
const finalDocs = await reranker.compressDocuments(topDocs, userQuestion);

// STAGE 4: Generate Answer
const context = finalDocs.map(d => d.pageContent).join('\\n');
const answerPrompt = \`Answer using ONLY this context:\\n\\n{context}\\n\\nQuestion: {question}\\n\\nAnswer:\`;
const prompt2 = PromptTemplate.fromTemplate(answerPrompt);
const formatted2 = await prompt2.format({ context, question: userQuestion });
const answer = await llm.invoke(formatted2);

console.log('🎯 COMPLETE ADVANCED RAG PIPELINE\\n');
console.log('Question:', userQuestion);
console.log(\`\\nGenerated \${queries.length} search queries\`);
console.log(\`Retrieved \${topDocs.length} candidates\`);
console.log(\`Reranked to top \${finalDocs.length} most relevant\\n\`);
console.log('📚 Final Context Used:\\n');
finalDocs.forEach((doc, i) => console.log(\`\${i + 1}. \${doc.pageContent}\`));
console.log('\\n💡 Generated Answer:\\n');
console.log(answer.content);
console.log('\\n✅ Production-grade multi-query RAG complete!');`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);
      const originalQuery = "How can I improve my RAG system's accuracy?";

      const multiQueryPrompt = `You are an AI assistant helping to improve search results.
Generate 3 different search queries that would help answer this question from different angles.

Original question: ${originalQuery}

Output ONLY the 3 queries, one per line, numbered 1-3.`;

      const response = await llm.invoke(multiQueryPrompt);

      const output = `🎯 MULTI-QUERY GENERATION
Original Query: ${originalQuery}

📝 Generated Queries:

${response.content}

✓ Multiple queries capture different perspectives!
✓ This increases the chance of finding all relevant info!`;

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
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);
      const embeddings = new CohereEmbeddings({
        apiKey: apiKey || '',
        model: 'embed-english-v3.0',
      });

      const docs = documents.slice(0, 8).map(text => new Document({ pageContent: text }));
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      const originalQuery = "How can I improve my RAG accuracy?";

      // Generate queries
      const multiQueryPrompt = `Generate 2 alternative search queries for: ${originalQuery}
Output only the queries, one per line.`;

      const response = await llm.invoke(multiQueryPrompt);
      const generatedQueries = response.content.split('\n').filter((q: string) => q.trim());
      const queries = [originalQuery, ...generatedQueries.slice(0, 2)];

      let output = '🔍 MULTI-QUERY RETRIEVAL\n\n';
      const allResults = [];

      for (const query of queries) {
        const results = await vectorStore.similaritySearchWithScore(query, 3);
        output += `Query: "${query}"\n`;
        output += `Top result: ${results[0][0].pageContent.substring(0, 70)}...\n\n`;
        allResults.push(...results);
      }

      output += `✓ Retrieved ${allResults.length} total results from ${queries.length} queries!`;

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
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);
      const embeddings = new CohereEmbeddings({
        apiKey: apiKey || '',
        model: 'embed-english-v3.0',
      });

      const docs = documents.slice(0, 6).map(text => new Document({ pageContent: text }));
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      // Generate queries
      const originalQuery = "How can I improve RAG accuracy?";
      const multiQueryPrompt = `Generate 2 alternative queries for: ${originalQuery}\nOutput only queries.`;
      const response = await llm.invoke(multiQueryPrompt);
      const queries = [originalQuery, ...response.content.split('\n').filter((q: string) => q.trim()).slice(0, 2)];

      const allResults = [];
      for (const query of queries) {
        const results = await vectorStore.similaritySearchWithScore(query, 3);
        allResults.push(...results);
      }

      // Deduplicate
      const seen = new Set<string>();
      const uniqueResults = allResults.filter(([doc]) => {
        if (seen.has(doc.pageContent)) return false;
        seen.add(doc.pageContent);
        return true;
      });

      let output = '📊 DEDUPLICATION PROCESS\n\n';
      output += `Before deduplication: ${allResults.length} results\n`;
      output += `After deduplication: ${uniqueResults.length} unique results\n\n`;
      output += '📚 Unique Documents Found:\n\n';

      uniqueResults.forEach(([doc, score], i) => {
        output += `${i + 1}. (Score: ${score.toFixed(4)}) ${doc.pageContent.substring(0, 60)}...\n`;
      });

      output += '\n✓ Removed duplicates while preserving the best matches!';

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
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const embeddings = new CohereEmbeddings({
        apiKey: apiKey || '',
        model: 'embed-english-v3.0',
      });

      const docs = documents.slice(0, 6).map(text => new Document({ pageContent: text }));
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      const queries = [
        "How can I improve RAG accuracy?",
        "What are advanced retrieval techniques?",
      ];

      // RRF algorithm
      const k = 60;
      const docScores = new Map<string, number>();

      for (const query of queries) {
        const results = await vectorStore.similaritySearchWithScore(query, 3);
        results.forEach(([doc, _score], rank) => {
          const content = doc.pageContent;
          const rrfScore = 1 / (k + rank + 1);
          docScores.set(content, (docScores.get(content) || 0) + rrfScore);
        });
      }

      const rankedDocs = Array.from(docScores.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

      let output = '🏆 RECIPROCAL RANK FUSION RESULTS\n\n';
      output += 'Algorithm: RRF combines rankings from multiple queries\n';
      output += 'Formula: score = 1 / (k + rank + 1), where k = 60\n\n';

      rankedDocs.forEach(([content, score], i) => {
        output += `${i + 1}. RRF Score: ${score.toFixed(4)}\n`;
        output += `   ${content.substring(0, 65)}...\n\n`;
      });

      output += '✓ RRF gives higher scores to docs that rank well across ALL queries!';

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
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);
      const embeddings = new CohereEmbeddings({
        apiKey: apiKey || '',
        model: 'embed-english-v3.0',
      });

      const docs = documents.slice(0, 8).map(text => new Document({ pageContent: text }));
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      const originalQuery = "What techniques improve RAG accuracy?";

      // Multi-query
      const multiQueryPrompt = `Generate 2 alternative search queries for: ${originalQuery}\nOutput only the queries, one per line.`;
      const response = await llm.invoke(multiQueryPrompt);
      const generatedQueries = response.content.split('\n').filter((q: string) => q.trim());
      const allQueries = [originalQuery, ...generatedQueries.slice(0, 2)];

      // RRF
      const k = 60;
      const docScores = new Map<string, number>();
      const docObjects = new Map<string, Document>();

      for (const query of allQueries) {
        const results = await vectorStore.similaritySearchWithScore(query, 4);
        results.forEach(([doc], rank) => {
          docObjects.set(doc.pageContent, doc);
          docScores.set(doc.pageContent, (docScores.get(doc.pageContent) || 0) + 1 / (k + rank + 1));
        });
      }

      const topDocs = Array.from(docScores.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([content]) => docObjects.get(content)!);

      // Rerank
      const reranker = new CohereRerank({
        apiKey: apiKey || '',
        model: 'rerank-english-v3.0',
        topN: 3,
      });

      const rerankedDocs = await reranker.compressDocuments(topDocs, originalQuery);

      let output = '🎯 ADVANCED MULTI-QUERY RAG\n\n';
      output += `Original Query: ${originalQuery}\n\n`;
      output += `Generated ${allQueries.length - 1} additional queries\n`;
      output += `Retrieved ${topDocs.length} candidates via RRF\n\n`;
      output += '📚 Top 3 After Reranking:\n\n';

      rerankedDocs.forEach((doc, i) => {
        output += `${i + 1}. ${doc.pageContent}\n`;
      });

      output += '\n✓ Multi-query + RRF + Reranking = Production-grade RAG!';

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
      if (!apiKey && activeProvider !== 'browser') {
        throw new Error('Please configure your API key in Settings');
      }

      const llm = createLLM(apiKey || 'browser-llm', activeProvider, selectedModel);
      const embeddings = new CohereEmbeddings({
        apiKey: apiKey || '',
        model: 'embed-english-v3.0',
      });

      const docs = documents.map(text => new Document({ pageContent: text }));
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      const userQuestion = "What are the best ways to improve RAG accuracy?";

      // STAGE 1: Multi-Query
      const multiQueryPrompt = `Generate 2 alternative search queries for: ${userQuestion}\nOutput only queries, one per line.`;
      const response = await llm.invoke(multiQueryPrompt);
      const queries = [userQuestion, ...response.content.split('\n').filter((q: string) => q.trim()).slice(0, 2)];

      // STAGE 2: RRF
      const k = 60;
      const docScores = new Map<string, number>();
      const docObjects = new Map<string, Document>();

      for (const query of queries) {
        const results = await vectorStore.similaritySearchWithScore(query, 4);
        results.forEach(([doc], rank) => {
          docObjects.set(doc.pageContent, doc);
          docScores.set(doc.pageContent, (docScores.get(doc.pageContent) || 0) + 1 / (k + rank + 1));
        });
      }

      const topDocs = Array.from(docScores.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .map(([content]) => docObjects.get(content)!);

      // STAGE 3: Rerank
      const reranker = new CohereRerank({
        apiKey: apiKey || '',
        model: 'rerank-english-v3.0',
        topN: 3,
      });
      const finalDocs = await reranker.compressDocuments(topDocs, userQuestion);

      // STAGE 4: Generate
      const context = finalDocs.map(d => d.pageContent).join('\n');
      const answerPrompt = `Answer using ONLY this context:\n\n${context}\n\nQuestion: ${userQuestion}\n\nAnswer:`;
      const answer = await llm.invoke(answerPrompt);

      let output = '🎯 COMPLETE ADVANCED RAG PIPELINE\n\n';
      output += `Question: ${userQuestion}\n\n`;
      output += `Generated ${queries.length} search queries\n`;
      output += `Retrieved ${topDocs.length} candidates\n`;
      output += `Reranked to top ${finalDocs.length} most relevant\n\n`;
      output += '📚 Final Context Used:\n\n';
      finalDocs.forEach((doc, i) => {
        output += `${i + 1}. ${doc.pageContent}\n`;
      });
      output += '\n💡 Generated Answer:\n\n';
      output += answer.content;
      output += '\n\n✅ Production-grade multi-query RAG complete!';

      // Mark lab complete
      markLabComplete(9);
      celebrateCompletion();

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
      <div className="hero-image-container mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <Network className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-90" />
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">Advanced RAG Techniques</h1>
            <p className="text-sm sm:text-lg opacity-90">Multi-Query Retrieval & Reciprocal Rank Fusion</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex-shrink-0">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 9: Advanced RAG Techniques
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Production-grade multi-query retrieval with RRF
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-purple-900 dark:text-purple-100">
            <p className="font-semibold mb-2">Advanced techniques you'll master:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Multi-query generation with LLMs</li>
              <li>Reciprocal Rank Fusion (RRF) algorithm</li>
              <li>Smart deduplication and result merging</li>
              <li>Production-grade RAG pipelines</li>
              <li>Combining multiple retrieval strategies</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            1
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Multi-Query Generation
          </h2>
        </div>
        <TerminalCodeCell
          
          title="multi-query-generation"
          initialCode={step1Code}
          description="Generate multiple search queries from a single question"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Execute Multi-Query Retrieval
          </h2>
        </div>
        <TerminalCodeCell
          
          title="multi-query-retrieval"
          initialCode={step2Code}
          description="Search with all generated queries to find more relevant results"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Deduplicate Results
          </h2>
        </div>
        <TerminalCodeCell
          
          title="deduplicate-results"
          initialCode={step3Code}
          description="Remove duplicate documents while keeping the best matches"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            4
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Network className="w-5 h-5" />
            Reciprocal Rank Fusion
          </h2>
        </div>
        <TerminalCodeCell
          
          title="reciprocal-rank-fusion"
          initialCode={step4Code}
          description="Smart merge using RRF algorithm - industry standard!"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            5
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Add Reranking
          </h2>
        </div>
        <TerminalCodeCell
          
          title="multi-query-reranking"
          initialCode={step5Code}
          description="Complete pipeline: Multi-query → RRF → Rerank"
          onExecute={executeStep5}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg animate-pulse-glow">
            6
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Complete Advanced RAG
          </h2>
        </div>
        <TerminalCodeCell
          
          title="complete-advanced-rag"
          initialCode={step6Code}
          description="Full production pipeline: Multi-query → RRF → Rerank → Generate!"
          onExecute={executeStep6}
        />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-sm sm:text-base font-semibold text-purple-900 dark:text-purple-100 mb-3">
          🎓 What You Just Learned
        </h3>
        <ul className="space-y-2 text-purple-800 dark:text-purple-200 text-xs sm:text-sm">
          <li>✓ <strong>Multi-Query:</strong> Generate multiple search queries from one question</li>
          <li>✓ <strong>RRF Algorithm:</strong> Smart fusion of rankings from multiple queries</li>
          <li>✓ <strong>Deduplication:</strong> Remove duplicates while keeping best matches</li>
          <li>✓ <strong>Advanced Pipeline:</strong> Multi-query → RRF → Rerank → Generate</li>
          <li>✓ <strong>Production RAG:</strong> Techniques used by leading AI companies</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm sm:text-base font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 Why This Matters
        </h3>
        <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-xs sm:text-sm">
          <li>• Single queries often miss relevant info due to wording differences</li>
          <li>• Multi-query captures different perspectives and improves recall by 20-40%</li>
          <li>• RRF is used by major search engines (Google, Bing) and RAG systems</li>
          <li>• Combining with reranking achieves state-of-the-art accuracy</li>
          <li>• This is how ChatGPT, Claude, and enterprise AI systems work</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Advanced RAG Mastered!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm">
          You now know production-grade RAG techniques! Multi-query retrieval with RRF is used by
          enterprise AI systems handling billions of queries. Next: Function calling and custom tools!
        </p>
      </div>
      <CompleteLabButton labId={9} />
    </div>
  );
}
