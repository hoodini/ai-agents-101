import { BookOpen, Calculator, Target, Filter, Award, Zap } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { celebrateCompletion } from '../utils/confetti';
import { CohereEmbeddings } from '@langchain/cohere';
import type { ExecutionResult } from '../types';

const TOTAL_LABS = 11;

export function Lab5_75() {
  const { apiKey, markLabCompleteAndAdvance } = useStore();

  const step1Code = `// Step 1: Cosine Similarity - The Math Behind Semantic Search
console.log('📐 COSINE SIMILARITY EXPLAINED\\n');

console.log('THE PROBLEM:');
console.log('How do we measure if two vectors (embeddings) are similar?\\n');

console.log('THE SOLUTION: Cosine Similarity');
console.log('Measures the ANGLE between two vectors');
console.log('Range: -1 (opposite) to 1 (identical)\\n');

// Simple 2D example for visualization
const vec1 = [3, 4];   // "king"
const vec2 = [3.1, 4.2]; // "queen" (similar!)
const vec3 = [1, -1];  // "banana" (different!)

console.log('🔢 2D EXAMPLE (for visualization):\\n');
console.log('Vector A (king):  ', vec1);
console.log('Vector B (queen): ', vec2, '(similar direction!)');
console.log('Vector C (banana):', vec3, '(different direction!)\\n');

// Calculate dot product
const dotAB = vec1[0]*vec2[0] + vec1[1]*vec2[1];
const dotAC = vec1[0]*vec3[0] + vec1[1]*vec3[1];

// Calculate magnitudes
const magA = Math.sqrt(vec1[0]**2 + vec1[1]**2);
const magB = Math.sqrt(vec2[0]**2 + vec2[1]**2);
const magC = Math.sqrt(vec3[0]**2 + vec3[1]**2);

// Cosine similarity formula
const simAB = dotAB / (magA * magB);
const simAC = dotAC / (magA * magC);

console.log('CALCULATION STEPS:\\n');
console.log('1. Dot Product (A·B):', dotAB.toFixed(2));
console.log('2. Magnitude A:', magA.toFixed(2));
console.log('3. Magnitude B:', magB.toFixed(2));
console.log('4. Cosine Similarity = Dot / (Mag_A × Mag_B)\\n');

console.log('RESULTS:');
console.log(\`A vs B (king vs queen):   \${simAB.toFixed(4)} ← HIGH (similar!)\`);
console.log(\`A vs C (king vs banana):  \${simAC.toFixed(4)} ← LOW (different!)\\n\`);

console.log('💡 WHY COSINE?');
console.log('• Direction matters more than magnitude');
console.log('• Scale-invariant (works for any vector length)');
console.log('• Perfect for semantic similarity!');
console.log('• Used in 99% of RAG systems');`;

  const step2Code = `// Step 2: Cosine vs Euclidean Distance - When to Use Each
console.log('⚖️ SIMILARITY METRICS COMPARISON\\n');

// Create three vectors
const v1 = [1, 2, 3];
const v2 = [2, 4, 6];  // Same direction, different magnitude
const v3 = [3, 2, 1];  // Different direction

console.log('Test Vectors:');
console.log('V1:', v1);
console.log('V2:', v2, '(2× magnitude of V1)');
console.log('V3:', v3, '(different direction)\\n');

// Cosine Similarity
function cosineSim(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val**2, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val**2, 0));
  return dot / (magA * magB);
}

// Euclidean Distance
function euclideanDist(a, b) {
  return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i])**2, 0));
}

const cosV1V2 = cosineSim(v1, v2);
const cosV1V3 = cosineSim(v1, v3);
const eucV1V2 = euclideanDist(v1, v2);
const eucV1V3 = euclideanDist(v1, v3);

console.log('METHOD 1: COSINE SIMILARITY (angle-based)');
console.log(\`V1 vs V2: \${cosV1V2.toFixed(4)} ← Perfect 1.0! (same direction)\`);
console.log(\`V1 vs V3: \${cosV1V3.toFixed(4)} ← Lower (different direction)\\n\`);

console.log('METHOD 2: EUCLIDEAN DISTANCE (magnitude-based)');
console.log(\`V1 vs V2: \${eucV1V2.toFixed(4)} ← Large distance!\`);
console.log(\`V1 vs V3: \${eucV1V3.toFixed(4)} ← Smaller distance\\n\`);

console.log('🎯 DECISION GUIDE:\\n');
console.log('USE COSINE SIMILARITY when:');
console.log('✓ Meaning/direction matters (text embeddings!)');
console.log('✓ Scale doesn\'t matter ("big" vs "large")');
console.log('✓ RAG systems, semantic search\\n');

console.log('USE EUCLIDEAN DISTANCE when:');
console.log('✓ Exact magnitude matters (prices, measurements)');
console.log('✓ Physical distances');
console.log('✓ Image/audio similarity\\n');

console.log('FOR RAG: Always use Cosine Similarity! ✨');`;

  const step3Code = `// Step 3: Top-K Retrieval - Finding Best Matches
import { CohereEmbeddings } from '@langchain/cohere';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

// Knowledge base
const documents = [
  "LangChain is a framework for building LLM applications",
  "Vector databases store embeddings efficiently",
  "RAG combines retrieval with generation",
  "Python is a popular programming language",
  "Machine learning models learn from data",
  "Cohere provides embedding and reranking APIs",
  "Semantic search finds meaning, not keywords",
  "ChatGPT is a conversational AI assistant"
];

const query = "What are vector databases?";

console.log('🎯 TOP-K RETRIEVAL DEMONSTRATION\\n');
console.log('Query:', query);
console.log('Knowledge Base Size:', documents.length, 'documents\\n');

// Embed everything
console.log('🔄 Embedding query and documents...');
const queryVec = await embeddings.embedQuery(query);
const docVecs = await embeddings.embedDocuments(documents);

// Calculate similarities
function cosineSim(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val**2, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val**2, 0));
  return dot / (magA * magB);
}

const scores = documents.map((doc, i) => ({
  doc,
  score: cosineSim(queryVec, docVecs[i]),
  rank: i + 1
}));

// Sort by score descending
scores.sort((a, b) => b.score - a.score);

console.log('\\n📊 ALL DOCUMENTS RANKED:\\n');
scores.forEach((item, i) => {
  const stars = item.score > 0.7 ? '⭐⭐⭐' : item.score > 0.5 ? '⭐⭐' : '⭐';
  console.log(\`\${i + 1}. [\${item.score.toFixed(4)}] \${stars}\`);
  console.log(\`   \${item.doc}\\n\`);
});

console.log('🎯 TOP-3 RETRIEVAL (K=3):\\n');
scores.slice(0, 3).forEach((item, i) => {
  console.log(\`Rank \${i + 1}: \${item.doc}\`);
  console.log(\`Score: \${item.score.toFixed(4)}\\n\`);
});

console.log('💡 CHOOSING K:');
console.log('• K=1: Fastest, but might miss relevant docs');
console.log('• K=3-5: Good balance (most common)');
console.log('• K=10+: More context, but noise increases');`;

  const step4Code = `// Step 4: Similarity Thresholds - Filter Low-Quality Results
import { CohereEmbeddings } from '@langchain/cohere';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

const documents = [
  "Vector embeddings capture semantic meaning",
  "Similarity search finds relevant documents",
  "Cosine similarity measures vector angles",
  "The weather is sunny today",  // Irrelevant!
  "I like pizza",  // Also irrelevant!
  "Embedding models convert text to vectors"
];

const query = "How do embeddings work?";

console.log('🎚️ SIMILARITY THRESHOLD FILTERING\\n');
console.log('Query:', query);
console.log('Total documents:', documents.length, '\\n');

const queryVec = await embeddings.embedQuery(query);
const docVecs = await embeddings.embedDocuments(documents);

function cosineSim(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val**2, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val**2, 0));
  return dot / (magA * magB);
}

const results = documents.map((doc, i) => ({
  doc,
  score: cosineSim(queryVec, docVecs[i])
})).sort((a, b) => b.score - a.score);

console.log('📊 WITHOUT THRESHOLD (all results):\\n');
results.forEach((r, i) => {
  const quality = r.score > 0.7 ? '✅ GOOD' : r.score > 0.5 ? '⚠️ OK' : '❌ BAD';
  console.log(\`\${i + 1}. [\${r.score.toFixed(4)}] \${quality}\`);
  console.log(\`   \${r.doc}\\n\`);
});

// Apply different thresholds
const thresholds = [0.5, 0.6, 0.7];

thresholds.forEach(threshold => {
  const filtered = results.filter(r => r.score >= threshold);
  console.log(\`📌 WITH THRESHOLD = \${threshold}:\`);
  console.log(\`   Kept \${filtered.length}/${documents.length} documents\\n\`);
  filtered.forEach((r, i) => {
    console.log(\`   \${i + 1}. [\${r.score.toFixed(4)}] \${r.doc.substring(0, 50)}...\`);
  });
  console.log('');
});

console.log('💡 THRESHOLD GUIDELINES:');
console.log('• 0.9+: Very strict (might miss relevant docs)');
console.log('• 0.7-0.9: Good balance (recommended for RAG)');
console.log('• 0.5-0.7: Permissive (more results, more noise)');
console.log('• <0.5: Too permissive (lots of irrelevant results)');`;

  const step5Code = `// Step 5: Retrieval Strategies - MMR, Diversity, and More
console.log('🎯 ADVANCED RETRIEVAL STRATEGIES\\n');

console.log('STRATEGY 1: SIMPLE TOP-K');
console.log('Description: Return K most similar documents');
console.log('Pros: Fast, simple, deterministic');
console.log('Cons: May return very similar (redundant) docs\\n');

console.log('STRATEGY 2: MAXIMUM MARGINAL RELEVANCE (MMR)');
console.log('Description: Balance relevance with diversity');
console.log('Formula: MMR = λ × Similarity - (1-λ) × Redundancy');
console.log('Pros: Diverse results, better coverage');
console.log('Cons: Slower, more complex');
console.log('When: Need diverse perspectives on a topic\\n');

console.log('STRATEGY 3: SIMILARITY THRESHOLD');
console.log('Description: Return all docs above threshold');
console.log('Pros: Quality guarantee, flexible count');
console.log('Cons: Variable number of results');
console.log('When: Quality matters more than quantity\\n');

console.log('STRATEGY 4: HYBRID SEARCH');
console.log('Description: Combine vector + keyword search');
console.log('Formula: α × Vector_Score + (1-α) × BM25_Score');
console.log('Pros: Best of both worlds, handles edge cases');
console.log('Cons: More complex, needs tuning');
console.log('When: Production systems, diverse queries\\n');

console.log('STRATEGY 5: RERANKING (covered next lab!)');
console.log('Description: Retrieve many, rerank with better model');
console.log('Pros: Highest accuracy possible');
console.log('Cons: Two-stage process, slower');
console.log('When: Accuracy is critical\\n');

console.log('🎯 DECISION TREE:\\n');
console.log('Need speed? → Simple Top-K');
console.log('Need diversity? → MMR');
console.log('Need quality guarantee? → Threshold');
console.log('Need best accuracy? → Hybrid + Reranking');
console.log('Production RAG? → Hybrid + Reranking (next lab!)');`;

  const step6Code = `// Step 6: Complete Retrieval Pipeline
import { CohereEmbeddings } from '@langchain/cohere';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

// Production-like knowledge base
const knowledgeBase = [
  { id: 1, text: "RAG systems retrieve relevant context before generation", category: "RAG" },
  { id: 2, text: "Vector databases enable fast similarity search at scale", category: "Infrastructure" },
  { id: 3, text: "Embeddings convert text into semantic vectors", category: "Embeddings" },
  { id: 4, text: "Chunking splits documents into searchable pieces", category: "RAG" },
  { id: 5, text: "Cohere provides state-of-the-art reranking models", category: "Tools" },
  { id: 6, text: "Cosine similarity measures semantic closeness", category: "Math" },
  { id: 7, text: "LangChain simplifies RAG pipeline development", category: "Tools" },
  { id: 8, text: "Context window limits require smart retrieval", category: "RAG" }
];

const query = "How does RAG work?";
const K = 3;
const THRESHOLD = 0.65;

console.log('🚀 PRODUCTION RETRIEVAL PIPELINE\\n');
console.log('Query:', query);
console.log('Knowledge Base:', knowledgeBase.length, 'documents');
console.log('Strategy: Top-K with threshold');
console.log('K:', K);
console.log('Threshold:', THRESHOLD, '\\n');

// Step 1: Embed
console.log('Step 1: Embedding...');
const queryVec = await embeddings.embedQuery(query);
const docTexts = knowledgeBase.map(doc => doc.text);
const docVecs = await embeddings.embedDocuments(docTexts);
console.log('✓ Embedded', docVecs.length + 1, 'items\\n');

// Step 2: Calculate similarities
console.log('Step 2: Calculating similarities...');
function cosineSim(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val**2, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val**2, 0));
  return dot / (magA * magB);
}

const scored = knowledgeBase.map((doc, i) => ({
  ...doc,
  score: cosineSim(queryVec, docVecs[i])
}));
console.log('✓ Scored all documents\\n');

// Step 3: Filter by threshold
console.log('Step 3: Applying threshold filter...');
const filtered = scored.filter(doc => doc.score >= THRESHOLD);
console.log(\`✓ Kept \${filtered.length}/\${scored.length} documents above \${THRESHOLD}\\n\`);

// Step 4: Sort and take top-K
console.log('Step 4: Sorting and taking top-K...');
const topK = filtered.sort((a, b) => b.score - a.score).slice(0, K);
console.log(\`✓ Selected top \${topK.length} results\\n\`);

// Step 5: Present results
console.log('📊 FINAL RESULTS:\\n');
topK.forEach((doc, i) => {
  console.log(\`Rank \${i + 1}: [\${doc.score.toFixed(4)}] ID:\${doc.id}\`);
  console.log(\`Category: \${doc.category}\`);
  console.log(\`Text: \${doc.text}\\n\`);
});

console.log('✓ These documents will be sent to the LLM as context!');
console.log('✓ Next lab: Add reranking for even better results!');

celebrateCompletion();
markLabCompleteAndAdvance(5.75, ${TOTAL_LABS});`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      const vec1 = [3, 4];
      const vec2 = [3.1, 4.2];
      const vec3 = [1, -1];

      const dotAB = vec1[0]*vec2[0] + vec1[1]*vec2[1];
      const dotAC = vec1[0]*vec3[0] + vec1[1]*vec3[1];

      const magA = Math.sqrt(vec1[0]**2 + vec1[1]**2);
      const magB = Math.sqrt(vec2[0]**2 + vec2[1]**2);
      const magC = Math.sqrt(vec3[0]**2 + vec3[1]**2);

      const simAB = dotAB / (magA * magB);
      const simAC = dotAC / (magA * magC);

      let output = '📐 COSINE SIMILARITY EXPLAINED\n\n';
      output += 'THE PROBLEM:\n';
      output += 'How do we measure if two vectors (embeddings) are similar?\n\n';
      output += 'THE SOLUTION: Cosine Similarity\n';
      output += 'Measures the ANGLE between two vectors\n';
      output += 'Range: -1 (opposite) to 1 (identical)\n\n';
      output += '🔢 2D EXAMPLE (for visualization):\n\n';
      output += `Vector A (king):   ${JSON.stringify(vec1)}\n`;
      output += `Vector B (queen):  ${JSON.stringify(vec2)} (similar direction!)\n`;
      output += `Vector C (banana): ${JSON.stringify(vec3)} (different direction!)\n\n`;
      output += 'CALCULATION STEPS:\n\n';
      output += `1. Dot Product (A·B): ${dotAB.toFixed(2)}\n`;
      output += `2. Magnitude A: ${magA.toFixed(2)}\n`;
      output += `3. Magnitude B: ${magB.toFixed(2)}\n`;
      output += '4. Cosine Similarity = Dot / (Mag_A × Mag_B)\n\n';
      output += 'RESULTS:\n';
      output += `A vs B (king vs queen):   ${simAB.toFixed(4)} ← HIGH (similar!)\n`;
      output += `A vs C (king vs banana):  ${simAC.toFixed(4)} ← LOW (different!)\n\n`;
      output += '💡 WHY COSINE?\n';
      output += '• Direction matters more than magnitude\n';
      output += '• Scale-invariant (works for any vector length)\n';
      output += '• Perfect for semantic similarity!\n';
      output += '• Used in 99% of RAG systems';

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
      const v1 = [1, 2, 3];
      const v2 = [2, 4, 6];
      const v3 = [3, 2, 1];

      const cosineSim = (a: number[], b: number[]) => {
        const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
        const magA = Math.sqrt(a.reduce((sum, val) => sum + val**2, 0));
        const magB = Math.sqrt(b.reduce((sum, val) => sum + val**2, 0));
        return dot / (magA * magB);
      };

      const euclideanDist = (a: number[], b: number[]) => {
        return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i])**2, 0));
      };

      const cosV1V2 = cosineSim(v1, v2);
      const cosV1V3 = cosineSim(v1, v3);
      const eucV1V2 = euclideanDist(v1, v2);
      const eucV1V3 = euclideanDist(v1, v3);

      let output = '⚖️ SIMILARITY METRICS COMPARISON\n\n';
      output += 'Test Vectors:\n';
      output += `V1: ${JSON.stringify(v1)}\n`;
      output += `V2: ${JSON.stringify(v2)} (2× magnitude of V1)\n`;
      output += `V3: ${JSON.stringify(v3)} (different direction)\n\n`;
      output += 'METHOD 1: COSINE SIMILARITY (angle-based)\n';
      output += `V1 vs V2: ${cosV1V2.toFixed(4)} ← Perfect 1.0! (same direction)\n`;
      output += `V1 vs V3: ${cosV1V3.toFixed(4)} ← Lower (different direction)\n\n`;
      output += 'METHOD 2: EUCLIDEAN DISTANCE (magnitude-based)\n';
      output += `V1 vs V2: ${eucV1V2.toFixed(4)} ← Large distance!\n`;
      output += `V1 vs V3: ${eucV1V3.toFixed(4)} ← Smaller distance\n\n`;
      output += '🎯 DECISION GUIDE:\n\n';
      output += 'USE COSINE SIMILARITY when:\n';
      output += '✓ Meaning/direction matters (text embeddings!)\n';
      output += '✓ Scale doesn\'t matter ("big" vs "large")\n';
      output += '✓ RAG systems, semantic search\n\n';
      output += 'USE EUCLIDEAN DISTANCE when:\n';
      output += '✓ Exact magnitude matters (prices, measurements)\n';
      output += '✓ Physical distances\n';
      output += '✓ Image/audio similarity\n\n';
      output += 'FOR RAG: Always use Cosine Similarity! ✨';

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

      const documents = [
        "LangChain is a framework for building LLM applications",
        "Vector databases store embeddings efficiently",
        "RAG combines retrieval with generation",
        "Python is a popular programming language",
        "Machine learning models learn from data",
        "Cohere provides embedding and reranking APIs",
        "Semantic search finds meaning, not keywords",
        "ChatGPT is a conversational AI assistant"
      ];

      const query = "What are vector databases?";

      let output = '🎯 TOP-K RETRIEVAL DEMONSTRATION\n\n';
      output += `Query: ${query}\n`;
      output += `Knowledge Base Size: ${documents.length} documents\n\n`;
      output += '🔄 Embedding query and documents...\n';

      const queryVec = await embeddings.embedQuery(query);
      const docVecs = await embeddings.embedDocuments(documents);

      const cosineSim = (a: number[], b: number[]) => {
        const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
        const magA = Math.sqrt(a.reduce((sum, val) => sum + val**2, 0));
        const magB = Math.sqrt(b.reduce((sum, val) => sum + val**2, 0));
        return dot / (magA * magB);
      };

      const scores = documents.map((doc, i) => ({
        doc,
        score: cosineSim(queryVec, docVecs[i])
      })).sort((a, b) => b.score - a.score);

      output += '\n📊 ALL DOCUMENTS RANKED:\n\n';
      scores.forEach((item, i) => {
        const stars = item.score > 0.7 ? '⭐⭐⭐' : item.score > 0.5 ? '⭐⭐' : '⭐';
        output += `${i + 1}. [${item.score.toFixed(4)}] ${stars}\n`;
        output += `   ${item.doc}\n\n`;
      });

      output += '🎯 TOP-3 RETRIEVAL (K=3):\n\n';
      scores.slice(0, 3).forEach((item, i) => {
        output += `Rank ${i + 1}: ${item.doc}\n`;
        output += `Score: ${item.score.toFixed(4)}\n\n`;
      });

      output += '💡 CHOOSING K:\n';
      output += '• K=1: Fastest, but might miss relevant docs\n';
      output += '• K=3-5: Good balance (most common)\n';
      output += '• K=10+: More context, but noise increases';

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
      if (!apiKey) {
        throw new Error('Please configure your Cohere API key in Settings');
      }

      const embeddings = new CohereEmbeddings({
        apiKey,
        model: 'embed-english-v3.0',
      });

      const documents = [
        "Vector embeddings capture semantic meaning",
        "Similarity search finds relevant documents",
        "Cosine similarity measures vector angles",
        "The weather is sunny today",
        "I like pizza",
        "Embedding models convert text to vectors"
      ];

      const query = "How do embeddings work?";

      let output = '🎚️ SIMILARITY THRESHOLD FILTERING\n\n';
      output += `Query: ${query}\n`;
      output += `Total documents: ${documents.length}\n\n`;

      const queryVec = await embeddings.embedQuery(query);
      const docVecs = await embeddings.embedDocuments(documents);

      const cosineSim = (a: number[], b: number[]) => {
        const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
        const magA = Math.sqrt(a.reduce((sum, val) => sum + val**2, 0));
        const magB = Math.sqrt(b.reduce((sum, val) => sum + val**2, 0));
        return dot / (magA * magB);
      };

      const results = documents.map((doc, i) => ({
        doc,
        score: cosineSim(queryVec, docVecs[i])
      })).sort((a, b) => b.score - a.score);

      output += '📊 WITHOUT THRESHOLD (all results):\n\n';
      results.forEach((r, i) => {
        const quality = r.score > 0.7 ? '✅ GOOD' : r.score > 0.5 ? '⚠️ OK' : '❌ BAD';
        output += `${i + 1}. [${r.score.toFixed(4)}] ${quality}\n`;
        output += `   ${r.doc}\n\n`;
      });

      const thresholds = [0.5, 0.6, 0.7];

      thresholds.forEach(threshold => {
        const filtered = results.filter(r => r.score >= threshold);
        output += `📌 WITH THRESHOLD = ${threshold}:\n`;
        output += `   Kept ${filtered.length}/${documents.length} documents\n\n`;
        filtered.forEach((r, i) => {
          output += `   ${i + 1}. [${r.score.toFixed(4)}] ${r.doc.substring(0, 50)}...\n`;
        });
        output += '\n';
      });

      output += '💡 THRESHOLD GUIDELINES:\n';
      output += '• 0.9+: Very strict (might miss relevant docs)\n';
      output += '• 0.7-0.9: Good balance (recommended for RAG)\n';
      output += '• 0.5-0.7: Permissive (more results, more noise)\n';
      output += '• <0.5: Too permissive (lots of irrelevant results)';

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
      let output = '🎯 ADVANCED RETRIEVAL STRATEGIES\n\n';

      output += 'STRATEGY 1: SIMPLE TOP-K\n';
      output += 'Description: Return K most similar documents\n';
      output += 'Pros: Fast, simple, deterministic\n';
      output += 'Cons: May return very similar (redundant) docs\n\n';

      output += 'STRATEGY 2: MAXIMUM MARGINAL RELEVANCE (MMR)\n';
      output += 'Description: Balance relevance with diversity\n';
      output += 'Formula: MMR = λ × Similarity - (1-λ) × Redundancy\n';
      output += 'Pros: Diverse results, better coverage\n';
      output += 'Cons: Slower, more complex\n';
      output += 'When: Need diverse perspectives on a topic\n\n';

      output += 'STRATEGY 3: SIMILARITY THRESHOLD\n';
      output += 'Description: Return all docs above threshold\n';
      output += 'Pros: Quality guarantee, flexible count\n';
      output += 'Cons: Variable number of results\n';
      output += 'When: Quality matters more than quantity\n\n';

      output += 'STRATEGY 4: HYBRID SEARCH\n';
      output += 'Description: Combine vector + keyword search\n';
      output += 'Formula: α × Vector_Score + (1-α) × BM25_Score\n';
      output += 'Pros: Best of both worlds, handles edge cases\n';
      output += 'Cons: More complex, needs tuning\n';
      output += 'When: Production systems, diverse queries\n\n';

      output += 'STRATEGY 5: RERANKING (covered next lab!)\n';
      output += 'Description: Retrieve many, rerank with better model\n';
      output += 'Pros: Highest accuracy possible\n';
      output += 'Cons: Two-stage process, slower\n';
      output += 'When: Accuracy is critical\n\n';

      output += '🎯 DECISION TREE:\n\n';
      output += 'Need speed? → Simple Top-K\n';
      output += 'Need diversity? → MMR\n';
      output += 'Need quality guarantee? → Threshold\n';
      output += 'Need best accuracy? → Hybrid + Reranking\n';
      output += 'Production RAG? → Hybrid + Reranking (next lab!)';

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
        throw new Error('Please configure your Cohere API key in Settings');
      }

      const embeddings = new CohereEmbeddings({
        apiKey,
        model: 'embed-english-v3.0',
      });

      const knowledgeBase = [
        { id: 1, text: "RAG systems retrieve relevant context before generation", category: "RAG" },
        { id: 2, text: "Vector databases enable fast similarity search at scale", category: "Infrastructure" },
        { id: 3, text: "Embeddings convert text into semantic vectors", category: "Embeddings" },
        { id: 4, text: "Chunking splits documents into searchable pieces", category: "RAG" },
        { id: 5, text: "Cohere provides state-of-the-art reranking models", category: "Tools" },
        { id: 6, text: "Cosine similarity measures semantic closeness", category: "Math" },
        { id: 7, text: "LangChain simplifies RAG pipeline development", category: "Tools" },
        { id: 8, text: "Context window limits require smart retrieval", category: "RAG" }
      ];

      const query = "How does RAG work?";
      const K = 3;
      const THRESHOLD = 0.65;

      let output = '🚀 PRODUCTION RETRIEVAL PIPELINE\n\n';
      output += `Query: ${query}\n`;
      output += `Knowledge Base: ${knowledgeBase.length} documents\n`;
      output += 'Strategy: Top-K with threshold\n';
      output += `K: ${K}\n`;
      output += `Threshold: ${THRESHOLD}\n\n`;

      output += 'Step 1: Embedding...\n';
      const queryVec = await embeddings.embedQuery(query);
      const docTexts = knowledgeBase.map(doc => doc.text);
      const docVecs = await embeddings.embedDocuments(docTexts);
      output += `✓ Embedded ${docVecs.length + 1} items\n\n`;

      output += 'Step 2: Calculating similarities...\n';
      const cosineSim = (a: number[], b: number[]) => {
        const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
        const magA = Math.sqrt(a.reduce((sum, val) => sum + val**2, 0));
        const magB = Math.sqrt(b.reduce((sum, val) => sum + val**2, 0));
        return dot / (magA * magB);
      };

      const scored = knowledgeBase.map((doc, i) => ({
        ...doc,
        score: cosineSim(queryVec, docVecs[i])
      }));
      output += '✓ Scored all documents\n\n';

      output += 'Step 3: Applying threshold filter...\n';
      const filtered = scored.filter(doc => doc.score >= THRESHOLD);
      output += `✓ Kept ${filtered.length}/${scored.length} documents above ${THRESHOLD}\n\n`;

      output += 'Step 4: Sorting and taking top-K...\n';
      const topK = filtered.sort((a, b) => b.score - a.score).slice(0, K);
      output += `✓ Selected top ${topK.length} results\n\n`;

      output += '📊 FINAL RESULTS:\n\n';
      topK.forEach((doc, i) => {
        output += `Rank ${i + 1}: [${doc.score.toFixed(4)}] ID:${doc.id}\n`;
        output += `Category: ${doc.category}\n`;
        output += `Text: ${doc.text}\n\n`;
      });

      output += '✓ These documents will be sent to the LLM as context!\n';
      output += '✓ Next lab: Add reranking for even better results!';

      celebrateCompletion();
      markLabCompleteAndAdvance(5.75, TOTAL_LABS);

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
          src="/lab5-75-hero.jpg"
          alt="Lab 5.75: Vector Similarity & Retrieval"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg flex-shrink-0">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Lab 5.75: Vector Similarity & Retrieval Methods
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Master the mathematics and strategies behind semantic search
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Cosine similarity: the math behind semantic search</li>
              <li>Cosine vs Euclidean distance - when to use each</li>
              <li>Top-K retrieval strategies</li>
              <li>Similarity thresholds for quality control</li>
              <li>Advanced retrieval: MMR, hybrid search, reranking</li>
              <li>Building production retrieval pipelines</li>
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
            <Calculator className="w-5 h-5" />
            Cosine Similarity Explained
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-cosine"
          initialCode={step1Code}
          description="Understand the mathematics of semantic similarity"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Cosine vs Euclidean Distance
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-comparison"
          initialCode={step2Code}
          description="Compare similarity metrics and choose the right one"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Top-K Retrieval
          </h2>
        </div>
        <TerminalCodeCell
          title="step-3-topk"
          initialCode={step3Code}
          description="Find the K most relevant documents from your knowledge base"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            4
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Similarity Thresholds
          </h2>
        </div>
        <TerminalCodeCell
          title="step-4-thresholds"
          initialCode={step4Code}
          description="Filter out low-quality results with similarity thresholds"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            5
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Advanced Retrieval Strategies
          </h2>
        </div>
        <TerminalCodeCell
          title="step-5-strategies"
          initialCode={step5Code}
          description="Explore MMR, hybrid search, and reranking strategies"
          onExecute={executeStep5}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg animate-pulse-glow">
            6
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Complete Retrieval Pipeline
          </h2>
        </div>
        <TerminalCodeCell
          title="step-6-pipeline"
          initialCode={step6Code}
          description="Build a production-ready retrieval pipeline with all concepts!"
          onExecute={executeStep6}
        />
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-cyan-200 dark:border-cyan-800">
        <h3 className="text-sm sm:text-base font-semibold text-cyan-900 dark:text-cyan-100 mb-3">
          🎓 What You Just Learned
        </h3>
        <ul className="space-y-2 text-cyan-800 dark:text-cyan-200 text-xs sm:text-sm">
          <li>✓ <strong>Cosine Similarity:</strong> Measures angle between vectors (0-1 scale)</li>
          <li>✓ <strong>Metrics:</strong> Cosine for semantics, Euclidean for magnitude</li>
          <li>✓ <strong>Top-K:</strong> Retrieve K most similar documents</li>
          <li>✓ <strong>Thresholds:</strong> Filter quality with similarity cutoffs (0.7-0.9 sweet spot)</li>
          <li>✓ <strong>Strategies:</strong> MMR, hybrid search, reranking for production</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Retrieval Mastered!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm">
          You now understand the math and strategies behind semantic search! Next: we'll put it all
          together in a complete RAG system with chunking, embeddings, retrieval, and generation!
        </p>
      </div>
      <CompleteLabButton labId={5.75} />
    </div>
  );
}
