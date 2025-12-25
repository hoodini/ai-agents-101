import { ArrowRight, Binary, Sparkles } from 'lucide-react';

export function EmbeddingsVisualization() {
  // Generate sample embedding values
  const generateEmbedding = () =>
    Array.from({ length: 16 }, () => (Math.random() * 2 - 1).toFixed(3));

  const embedding1 = generateEmbedding();
  const embedding2 = generateEmbedding();

  return (
    <div className="my-8 p-8 glass border border-purple-500/30 rounded-2xl relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-purple-400" />
          Text → Vector Embeddings
        </h3>

        {/* Main Visualization */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Input */}
          <div className="flex-shrink-0 w-full lg:w-64">
            <div className="glass border-2 border-cyan-500/50 rounded-xl p-6 hover-lift transition-all duration-300">
              <div className="text-cyan-400 font-bold mb-3 text-center">Text</div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-4 text-sm text-white/90 leading-relaxed">
                "Vector embeddings capture semantic meaning"
              </div>
              <div className="mt-3 text-center text-xs text-white/60">
                ~40 characters
              </div>
            </div>
          </div>

          {/* Transformation Animation */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center animate-pulse-glow">
                <Binary className="w-8 h-8 text-white" />
              </div>
              {/* Particle effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-purple-400 animate-ping"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      transform: `rotate(${i * 45}deg) translateX(30px)`,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-purple-400 hidden lg:block rotate-0 lg:rotate-0" />
            <div className="text-center">
              <div className="text-purple-400 font-bold mb-1">Embedding Model</div>
              <div className="text-xs text-white/60">embed-english-v3.0</div>
              <div className="text-xs text-purple-400 font-mono mt-1">1024 dimensions</div>
            </div>
          </div>

          {/* Vector Output */}
          <div className="flex-grow w-full lg:w-auto">
            <div className="glass border-2 border-purple-500/50 rounded-xl p-6 hover-lift transition-all duration-300">
              <div className="text-purple-400 font-bold mb-3 text-center">Vector Embedding</div>

              {/* Matrix visualization */}
              <div className="grid grid-cols-8 gap-1 mb-4">
                {embedding1.map((val, i) => {
                  const normalized = (parseFloat(val) + 1) / 2; // 0 to 1
                  const intensity = Math.floor(normalized * 255);
                  return (
                    <div
                      key={i}
                      className="relative group"
                      style={{
                        background: `rgb(${intensity}, ${100 + intensity/2}, ${255 - intensity/2})`,
                        aspectRatio: '1',
                        borderRadius: '2px',
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        {val}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Second row */}
              <div className="grid grid-cols-8 gap-1 mb-3">
                {embedding2.map((val, i) => {
                  const normalized = (parseFloat(val) + 1) / 2;
                  const intensity = Math.floor(normalized * 255);
                  return (
                    <div
                      key={i}
                      style={{
                        background: `rgb(${intensity}, ${100 + intensity/2}, ${255 - intensity/2})`,
                        aspectRatio: '1',
                        borderRadius: '2px',
                      }}
                    />
                  );
                })}
              </div>

              <div className="text-center text-xs text-white/60 mb-2">
                + 1008 more dimensions...
              </div>

              <div className="flex justify-center gap-2 text-xs">
                <span className="px-3 py-1 glass border border-purple-500/50 rounded-full text-purple-400">
                  Float32 Array
                </span>
                <span className="px-3 py-1 glass border border-blue-500/50 rounded-full text-blue-400">
                  [1024]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Similarity Demo */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 glass-strong border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div className="text-green-400 font-bold text-sm">High Similarity (0.89)</div>
            </div>
            <div className="text-xs text-white/80">
              "Vector embeddings capture meaning" ≈ "Embeddings represent semantic content"
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[89%] bg-gradient-to-r from-green-400 to-green-500" />
            </div>
          </div>

          <div className="p-4 glass-strong border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="text-red-400 font-bold text-sm">Low Similarity (0.12)</div>
            </div>
            <div className="text-xs text-white/80">
              "Vector embeddings capture meaning" ≠ "The weather is sunny today"
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[12%] bg-gradient-to-r from-red-400 to-red-500" />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 glass-strong border border-purple-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <span className="text-white text-lg">🧠</span>
            </div>
            <div className="text-sm text-white/90">
              <div className="font-bold text-purple-400 mb-1">The Magic of Embeddings</div>
              <div>Each word or phrase is converted into a high-dimensional vector (1024 numbers). Similar meanings result in similar vectors, enabling semantic search. Cosine similarity measures how "close" two vectors are in this semantic space (-1 to 1, higher = more similar).</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
