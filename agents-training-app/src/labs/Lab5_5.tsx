import { BookOpen, Sparkles, Binary, Compass, TrendingUp, Zap } from 'lucide-react';
import { TerminalCodeCell } from '../components/TerminalCodeCell';
import { CompleteLabButton } from '../components/CompleteLabButton';
import { useStore } from '../store/useStore';
import { celebrateCompletion } from '../utils/confetti';
import { CohereEmbeddings } from '@langchain/cohere';
import type { ExecutionResult } from '../types';

const TOTAL_LABS = 11;

export function Lab5_5() {
  const { apiKey, markLabCompleteAndAdvance } = useStore();

  const step1Code = `// Step 1: What Are Embeddings? The Concept
console.log('🎓 UNDERSTANDING EMBEDDINGS\\n');
console.log('Embeddings are numerical representations of text that capture MEANING.\\n');

console.log('📖 THE PROBLEM:');
console.log('Computers don\'t understand words like humans do.');
console.log('The word "king" is just letters to a computer.\\n');

console.log('💡 THE SOLUTION: Embeddings!');
console.log('Convert text into vectors (arrays of numbers)');
console.log('Similar meanings → Similar vectors\\n');

console.log('🔢 EXAMPLE CONCEPT:');
console.log('"king" → [0.8, 0.2, 0.9, ...]  (1024 numbers)');
console.log('"queen" → [0.78, 0.19, 0.88, ...]  (similar!)');
console.log('"banana" → [0.1, 0.95, 0.05, ...]  (very different!)\\n');

console.log('WHY THIS MATTERS:');
console.log('1. We can measure similarity mathematically');
console.log('2. We can search by meaning, not just keywords');
console.log('3. We can cluster similar concepts together');
console.log('4. This is the foundation of RAG systems!\\n');

console.log('✓ Next: See REAL embeddings in action!');`;

  const step2Code = `// Step 2: Creating Real Embeddings - See the Magic!
import { CohereEmbeddings } from '@langchain/cohere';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

// Let's embed a simple sentence
const text = "Artificial intelligence is transforming technology";

console.log('🔄 EMBEDDING PROCESS\\n');
console.log('Input Text:', text);
console.log('Text Length:', text.length, 'characters\\n');

console.log('Sending to Cohere embed-english-v3.0 model...');
const vector = await embeddings.embedQuery(text);

console.log('\\n✨ EMBEDDING CREATED!\\n');
console.log('Vector Dimensions:', vector.length);
console.log('Data Type: Float32 (decimal numbers)');
console.log('Range: typically -1.0 to 1.0\\n');

console.log('📊 VECTOR PREVIEW (first 20 dimensions):');
console.log(vector.slice(0, 20).map((n, i) => \`  [\${i}]: \${n.toFixed(6)}\`).join('\\n'));

console.log('\\n📊 VECTOR PREVIEW (last 20 dimensions):');
console.log(vector.slice(-20).map((n, i) => \`  [\${vector.length - 20 + i}]: \${n.toFixed(6)}\`).join('\\n'));

console.log('\\n💡 KEY INSIGHTS:');
console.log('- Each dimension captures a different aspect of meaning');
console.log('- Negative and positive values encode relationships');
console.log('- The PATTERN of numbers encodes semantic meaning');
console.log('- This \${vector.length}-dimensional space is where "meaning" lives!');`;

  const step3Code = `// Step 3: Before & After Transformation - Visual Comparison
import { CohereEmbeddings } from '@langchain/cohere';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

// Three different texts
const texts = [
  "Machine learning enables computers to learn from data",
  "Deep learning uses neural networks to process information",
  "I love eating pizza on Friday nights"
];

console.log('🔄 TEXT → VECTOR TRANSFORMATION\\n');

for (let i = 0; i < texts.length; i++) {
  const text = texts[i];
  const vector = await embeddings.embedQuery(text);

  console.log(\`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\`);
  console.log(\`EXAMPLE \${i + 1}\\n\`);

  console.log('📝 BEFORE (Human-Readable Text):');
  console.log(\`   "\${text}"\`);
  console.log(\`   - Length: \${text.length} characters\`);
  console.log(\`   - Type: String\\n\`);

  console.log('🔢 AFTER (Machine-Readable Vector):');
  console.log(\`   Dimensions: \${vector.length}\`);
  console.log(\`   First 8: [\${vector.slice(0, 8).map(n => n.toFixed(3)).join(', ')}...]\`);
  console.log(\`   Last 8:  [...\${vector.slice(-8).map(n => n.toFixed(3)).join(', ')}]\`);

  // Calculate magnitude (length of vector in space)
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  console.log(\`   Magnitude: \${magnitude.toFixed(4)}\`);
  console.log('');
}

console.log('✓ Notice: Similar topics (ML/DL) will have similar vectors!');
console.log('✓ Different topics (pizza) will have very different vectors!');`;

  const step4Code = `// Step 4: Similarity in Action - Compare Vectors!
import { CohereEmbeddings } from '@langchain/cohere';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

// Helper: Calculate cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magA * magB);
}

// Embed different sentences
const sentence1 = "The cat sleeps on the couch";
const sentence2 = "A feline rests on the sofa";  // Same meaning, different words!
const sentence3 = "Python is a programming language";  // Completely different

const vec1 = await embeddings.embedQuery(sentence1);
const vec2 = await embeddings.embedQuery(sentence2);
const vec3 = await embeddings.embedQuery(sentence3);

console.log('🔍 SEMANTIC SIMILARITY ANALYSIS\\n');

console.log('Sentence 1:', sentence1);
console.log('Sentence 2:', sentence2, '(same meaning!)');
console.log('Sentence 3:', sentence3, '(different meaning)\\n');

const sim1_2 = cosineSimilarity(vec1, vec2);
const sim1_3 = cosineSimilarity(vec1, vec3);
const sim2_3 = cosineSimilarity(vec2, vec3);

console.log('📊 SIMILARITY SCORES (0 = unrelated, 1 = identical)\\n');
console.log(\`Sentence 1 ↔ Sentence 2: \${sim1_2.toFixed(4)}\`);
console.log('  → HIGH similarity despite different words!\\n');

console.log(\`Sentence 1 ↔ Sentence 3: \${sim1_3.toFixed(4)}\`);
console.log('  → LOW similarity (different topics)\\n');

console.log(\`Sentence 2 ↔ Sentence 3: \${sim2_3.toFixed(4)}\`);
console.log('  → LOW similarity (different topics)\\n');

console.log('💡 THIS IS THE MAGIC OF EMBEDDINGS!');
console.log('   Different words, same meaning → High similarity');
console.log('   This enables semantic search in RAG systems!');`;

  const step5Code = `// Step 5: Different Embedding Models - How They Compare
import { CohereEmbeddings } from '@langchain/cohere';

console.log('🎯 EMBEDDING MODELS COMPARISON\\n');

const models = [
  {
    name: 'Cohere embed-english-v3.0',
    dimensions: 1024,
    strengths: ['Best for semantic search', 'Optimized for retrieval', 'Multilingual support'],
    useCase: 'Production RAG systems'
  },
  {
    name: 'OpenAI text-embedding-3-small',
    dimensions: 1536,
    strengths: ['Fast', 'Cost-effective', 'Good general purpose'],
    useCase: 'General embeddings'
  },
  {
    name: 'OpenAI text-embedding-3-large',
    dimensions: 3072,
    strengths: ['Highest quality', 'Best accuracy', 'Latest model'],
    useCase: 'When accuracy matters most'
  },
  {
    name: 'sentence-transformers (open source)',
    dimensions: 384-768,
    strengths: ['Free', 'Run locally', 'Privacy'],
    useCase: 'Prototypes, privacy-sensitive apps'
  }
];

models.forEach((model, i) => {
  console.log(\`\${i + 1}. \${model.name}\`);
  console.log(\`   📏 Dimensions: \${model.dimensions}\`);
  console.log(\`   ✨ Strengths:\`);
  model.strengths.forEach(s => console.log(\`      • \${s}\`));
  console.log(\`   🎯 Best For: \${model.useCase}\\n\`);
});

console.log('🔑 CHOOSING THE RIGHT MODEL:\\n');
console.log('1. More dimensions ≠ always better');
console.log('2. Consider: cost, speed, accuracy trade-offs');
console.log('3. Match model to your use case');
console.log('4. Test with your actual data!\\n');

console.log('💡 FOR THIS COURSE:');
console.log('We use Cohere embed-english-v3.0 because:');
console.log('✓ Excellent quality for semantic search');
console.log('✓ Optimized specifically for RAG');
console.log('✓ Free tier available for learning');`;

  const step6Code = `// Step 6: Practical Embedding Use Cases
import { CohereEmbeddings } from '@langchain/cohere';

const embeddings = new CohereEmbeddings({
  apiKey: '${apiKey ? '***YOUR_API_KEY***' : 'your-cohere-api-key'}',
  model: 'embed-english-v3.0',
});

console.log('🚀 REAL-WORLD EMBEDDING APPLICATIONS\\n');

// Use Case 1: Semantic Search
console.log('1️⃣ SEMANTIC SEARCH');
const query = "How do I fix authentication errors?";
const docs = [
  "Authentication troubleshooting guide for login issues",
  "Fixing database connection timeouts",
  "Resolving API authentication failures",
  "How to cook pasta perfectly"
];

console.log('Query:', query);
const queryVec = await embeddings.embedQuery(query);
const docVecs = await embeddings.embedDocuments(docs);

// Calculate similarities
const similarities = docVecs.map((docVec, i) => {
  const dotProduct = queryVec.reduce((sum, val, j) => sum + val * docVec[j], 0);
  const magQ = Math.sqrt(queryVec.reduce((sum, val) => sum + val * val, 0));
  const magD = Math.sqrt(docVec.reduce((sum, val) => sum + val * val, 0));
  return { doc: docs[i], score: dotProduct / (magQ * magD) };
});

similarities.sort((a, b) => b.score - a.score);

console.log('\\nResults (ranked by relevance):');
similarities.forEach((s, i) => {
  console.log(\`  \${i + 1}. [\${s.score.toFixed(4)}] \${s.doc}\`);
});

console.log('\\n✓ Most relevant docs ranked first!\\n');

// Use Case 2: Clustering
console.log('2️⃣ CLUSTERING SIMILAR CONTENT');
console.log('Group similar customer questions together');
console.log('Detect duplicate support tickets');
console.log('Organize documents by topic automatically\\n');

// Use Case 3: Recommendation
console.log('3️⃣ RECOMMENDATION SYSTEMS');
console.log('Find similar products: "Users who liked X also liked Y"');
console.log('Recommend articles based on reading history');
console.log('Suggest relevant code snippets\\n');

// Use Case 4: Anomaly Detection
console.log('4️⃣ ANOMALY DETECTION');
console.log('Find outliers in customer feedback');
console.log('Detect unusual patterns in logs');
console.log('Flag suspicious transactions\\n');

console.log('💡 ALL THESE USE THE SAME CONCEPT:');
console.log('   Text → Embedding Vector → Compare Similarity!');

celebrateCompletion();
markLabCompleteAndAdvance(5.5, ${TOTAL_LABS});`;

  const executeStep1 = async (): Promise<ExecutionResult> => {
    try {
      const output = `🎓 UNDERSTANDING EMBEDDINGS

Embeddings are numerical representations of text that capture MEANING.

📖 THE PROBLEM:
Computers don't understand words like humans do.
The word "king" is just letters to a computer.

💡 THE SOLUTION: Embeddings!
Convert text into vectors (arrays of numbers)
Similar meanings → Similar vectors

🔢 EXAMPLE CONCEPT:
"king" → [0.8, 0.2, 0.9, ...]  (1024 numbers)
"queen" → [0.78, 0.19, 0.88, ...]  (similar!)
"banana" → [0.1, 0.95, 0.05, ...]  (very different!)

WHY THIS MATTERS:
1. We can measure similarity mathematically
2. We can search by meaning, not just keywords
3. We can cluster similar concepts together
4. This is the foundation of RAG systems!

✓ Next: See REAL embeddings in action!`;

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

      const text = "Artificial intelligence is transforming technology";
      const vector = await embeddings.embedQuery(text);

      let output = '🔄 EMBEDDING PROCESS\n\n';
      output += `Input Text: ${text}\n`;
      output += `Text Length: ${text.length} characters\n\n`;
      output += 'Sending to Cohere embed-english-v3.0 model...\n';
      output += '\n✨ EMBEDDING CREATED!\n\n';
      output += `Vector Dimensions: ${vector.length}\n`;
      output += 'Data Type: Float32 (decimal numbers)\n';
      output += 'Range: typically -1.0 to 1.0\n\n';
      output += '📊 VECTOR PREVIEW (first 20 dimensions):\n';
      output += vector.slice(0, 20).map((n, i) => `  [${i}]: ${n.toFixed(6)}`).join('\n');
      output += '\n\n📊 VECTOR PREVIEW (last 20 dimensions):\n';
      output += vector.slice(-20).map((n, i) => `  [${vector.length - 20 + i}]: ${n.toFixed(6)}`).join('\n');
      output += '\n\n💡 KEY INSIGHTS:\n';
      output += '- Each dimension captures a different aspect of meaning\n';
      output += '- Negative and positive values encode relationships\n';
      output += '- The PATTERN of numbers encodes semantic meaning\n';
      output += `- This ${vector.length}-dimensional space is where "meaning" lives!`;

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

      const texts = [
        "Machine learning enables computers to learn from data",
        "Deep learning uses neural networks to process information",
        "I love eating pizza on Friday nights"
      ];

      let output = '🔄 TEXT → VECTOR TRANSFORMATION\n\n';

      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const vector = await embeddings.embedQuery(text);

        output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        output += `EXAMPLE ${i + 1}\n\n`;

        output += '📝 BEFORE (Human-Readable Text):\n';
        output += `   "${text}"\n`;
        output += `   - Length: ${text.length} characters\n`;
        output += '   - Type: String\n\n';

        output += '🔢 AFTER (Machine-Readable Vector):\n';
        output += `   Dimensions: ${vector.length}\n`;
        output += `   First 8: [${vector.slice(0, 8).map(n => n.toFixed(3)).join(', ')}...]\n`;
        output += `   Last 8:  [...${vector.slice(-8).map(n => n.toFixed(3)).join(', ')}]\n`;

        const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
        output += `   Magnitude: ${magnitude.toFixed(4)}\n\n`;
      }

      output += '✓ Notice: Similar topics (ML/DL) will have similar vectors!\n';
      output += '✓ Different topics (pizza) will have very different vectors!';

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

      const cosineSimilarity = (vecA: number[], vecB: number[]) => {
        const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
        const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
        const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (magA * magB);
      };

      const sentence1 = "The cat sleeps on the couch";
      const sentence2 = "A feline rests on the sofa";
      const sentence3 = "Python is a programming language";

      const vec1 = await embeddings.embedQuery(sentence1);
      const vec2 = await embeddings.embedQuery(sentence2);
      const vec3 = await embeddings.embedQuery(sentence3);

      let output = '🔍 SEMANTIC SIMILARITY ANALYSIS\n\n';
      output += `Sentence 1: ${sentence1}\n`;
      output += `Sentence 2: ${sentence2} (same meaning!)\n`;
      output += `Sentence 3: ${sentence3} (different meaning)\n\n`;

      const sim1_2 = cosineSimilarity(vec1, vec2);
      const sim1_3 = cosineSimilarity(vec1, vec3);
      const sim2_3 = cosineSimilarity(vec2, vec3);

      output += '📊 SIMILARITY SCORES (0 = unrelated, 1 = identical)\n\n';
      output += `Sentence 1 ↔ Sentence 2: ${sim1_2.toFixed(4)}\n`;
      output += '  → HIGH similarity despite different words!\n\n';
      output += `Sentence 1 ↔ Sentence 3: ${sim1_3.toFixed(4)}\n`;
      output += '  → LOW similarity (different topics)\n\n';
      output += `Sentence 2 ↔ Sentence 3: ${sim2_3.toFixed(4)}\n`;
      output += '  → LOW similarity (different topics)\n\n';
      output += '💡 THIS IS THE MAGIC OF EMBEDDINGS!\n';
      output += '   Different words, same meaning → High similarity\n';
      output += '   This enables semantic search in RAG systems!';

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
      const models = [
        {
          name: 'Cohere embed-english-v3.0',
          dimensions: '1024',
          strengths: ['Best for semantic search', 'Optimized for retrieval', 'Multilingual support'],
          useCase: 'Production RAG systems'
        },
        {
          name: 'OpenAI text-embedding-3-small',
          dimensions: '1536',
          strengths: ['Fast', 'Cost-effective', 'Good general purpose'],
          useCase: 'General embeddings'
        },
        {
          name: 'OpenAI text-embedding-3-large',
          dimensions: '3072',
          strengths: ['Highest quality', 'Best accuracy', 'Latest model'],
          useCase: 'When accuracy matters most'
        },
        {
          name: 'sentence-transformers (open source)',
          dimensions: '384-768',
          strengths: ['Free', 'Run locally', 'Privacy'],
          useCase: 'Prototypes, privacy-sensitive apps'
        }
      ];

      let output = '🎯 EMBEDDING MODELS COMPARISON\n\n';

      models.forEach((model, i) => {
        output += `${i + 1}. ${model.name}\n`;
        output += `   📏 Dimensions: ${model.dimensions}\n`;
        output += '   ✨ Strengths:\n';
        model.strengths.forEach(s => output += `      • ${s}\n`);
        output += `   🎯 Best For: ${model.useCase}\n\n`;
      });

      output += '🔑 CHOOSING THE RIGHT MODEL:\n\n';
      output += '1. More dimensions ≠ always better\n';
      output += '2. Consider: cost, speed, accuracy trade-offs\n';
      output += '3. Match model to your use case\n';
      output += '4. Test with your actual data!\n\n';
      output += '💡 FOR THIS COURSE:\n';
      output += 'We use Cohere embed-english-v3.0 because:\n';
      output += '✓ Excellent quality for semantic search\n';
      output += '✓ Optimized specifically for RAG\n';
      output += '✓ Free tier available for learning';

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

      let output = '🚀 REAL-WORLD EMBEDDING APPLICATIONS\n\n';

      output += '1️⃣ SEMANTIC SEARCH\n';
      const query = "How do I fix authentication errors?";
      const docs = [
        "Authentication troubleshooting guide for login issues",
        "Fixing database connection timeouts",
        "Resolving API authentication failures",
        "How to cook pasta perfectly"
      ];

      output += `Query: ${query}\n`;
      const queryVec = await embeddings.embedQuery(query);
      const docVecs = await embeddings.embedDocuments(docs);

      const similarities = docVecs.map((docVec, i) => {
        const dotProduct = queryVec.reduce((sum, val, j) => sum + val * docVec[j], 0);
        const magQ = Math.sqrt(queryVec.reduce((sum, val) => sum + val * val, 0));
        const magD = Math.sqrt(docVec.reduce((sum, val) => sum + val * val, 0));
        return { doc: docs[i], score: dotProduct / (magQ * magD) };
      });

      similarities.sort((a, b) => b.score - a.score);

      output += '\nResults (ranked by relevance):\n';
      similarities.forEach((s, i) => {
        output += `  ${i + 1}. [${s.score.toFixed(4)}] ${s.doc}\n`;
      });

      output += '\n✓ Most relevant docs ranked first!\n\n';

      output += '2️⃣ CLUSTERING SIMILAR CONTENT\n';
      output += 'Group similar customer questions together\n';
      output += 'Detect duplicate support tickets\n';
      output += 'Organize documents by topic automatically\n\n';

      output += '3️⃣ RECOMMENDATION SYSTEMS\n';
      output += 'Find similar products: "Users who liked X also liked Y"\n';
      output += 'Recommend articles based on reading history\n';
      output += 'Suggest relevant code snippets\n\n';

      output += '4️⃣ ANOMALY DETECTION\n';
      output += 'Find outliers in customer feedback\n';
      output += 'Detect unusual patterns in logs\n';
      output += 'Flag suspicious transactions\n\n';

      output += '💡 ALL THESE USE THE SAME CONCEPT:\n';
      output += '   Text → Embedding Vector → Compare Similarity!';

      celebrateCompletion();
      markLabCompleteAndAdvance(5.5, TOTAL_LABS);

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
          src="/lab5-5-hero.jpg"
          alt="Lab 5.5: Embeddings Deep Dive"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl bg-black/40 backdrop-blur-sm">
        <img
          src="/lab5-5-diagram.png"
          alt="Embeddings Deep Dive Diagram"
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
              Lab 5.5: Embeddings - From Text to Meaning Vectors
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              See how text becomes numbers that capture semantic meaning
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">What you'll learn:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>What embeddings are conceptually and why they matter</li>
              <li>See real 1024-dimensional embedding vectors</li>
              <li>Before/after: text transformation to numerical vectors</li>
              <li>How similar meanings produce similar vectors</li>
              <li>Different embedding models and when to use them</li>
              <li>Real-world applications of embeddings</li>
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
            <BookOpen className="w-5 h-5" />
            What Are Embeddings?
          </h2>
        </div>
        <TerminalCodeCell
          title="step-1-concept"
          initialCode={step1Code}
          description="Understand the fundamental concept of embeddings"
          onExecute={executeStep1}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Binary className="w-5 h-5" />
            Creating Real Embeddings
          </h2>
        </div>
        <TerminalCodeCell
          title="step-2-real-embeddings"
          initialCode={step2Code}
          description="See actual 1024-dimensional embedding vectors!"
          onExecute={executeStep2}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Before & After Transformation
          </h2>
        </div>
        <TerminalCodeCell
          title="step-3-transformation"
          initialCode={step3Code}
          description="Compare text before and after embedding transformation"
          onExecute={executeStep3}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            4
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5" />
            Semantic Similarity in Action
          </h2>
        </div>
        <TerminalCodeCell
          title="step-4-similarity"
          initialCode={step4Code}
          description="See how similar meanings produce similar vectors!"
          onExecute={executeStep4}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
            5
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Embedding Models Comparison
          </h2>
        </div>
        <TerminalCodeCell
          title="step-5-models"
          initialCode={step5Code}
          description="Compare different embedding models and when to use them"
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
            Real-World Applications
          </h2>
        </div>
        <TerminalCodeCell
          title="step-6-applications"
          initialCode={step6Code}
          description="Practical embedding use cases: search, clustering, recommendations!"
          onExecute={executeStep6}
        />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-sm sm:text-base font-semibold text-purple-900 dark:text-purple-100 mb-3">
          🎓 What You Just Learned
        </h3>
        <ul className="space-y-2 text-purple-800 dark:text-purple-200 text-xs sm:text-sm">
          <li>✓ <strong>Concept:</strong> Embeddings convert text to numerical meaning vectors</li>
          <li>✓ <strong>Vectors:</strong> Saw real 1024-dimensional embedding arrays</li>
          <li>✓ <strong>Similarity:</strong> Similar meanings = similar vector patterns</li>
          <li>✓ <strong>Models:</strong> Different models for different use cases</li>
          <li>✓ <strong>Applications:</strong> Search, clustering, recommendations, anomaly detection</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Embeddings Mastered!
        </h3>
        <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm">
          You now understand how text becomes meaningful numbers! Next: we'll dive into vector
          similarity methods and retrieval strategies that power RAG systems.
        </p>
      </div>
      <CompleteLabButton labId={5.5} />
    </div>
  );
}
