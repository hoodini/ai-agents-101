import { FileText, Scissors } from 'lucide-react';

export function ChunkingVisualization() {
  return (
    <div className="my-8 p-8 glass border border-cyan-500/30 rounded-2xl relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <Scissors className="w-6 h-6 text-cyan-400" />
          Document Chunking Process
        </h3>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Original Document */}
          <div className="flex-shrink-0">
            <div className="glass border-2 border-purple-500/50 rounded-xl p-6 w-64 hover-lift transition-all duration-300 hover:border-purple-400">
              <FileText className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <div className="h-32 bg-gradient-to-b from-white/10 to-white/5 rounded-lg mb-3 flex items-center justify-center">
                <div className="text-center text-sm text-white/70 px-4">
                  <div className="mb-2 font-bold text-white">Original Document</div>
                  <div className="text-xs leading-relaxed">
                    Large Language Models (LLMs) are neural networks trained on massive amounts of text data. They can understand and generate human-like text...
                  </div>
                </div>
              </div>
              <div className="text-center text-cyan-400 font-bold">~2,000 chars</div>
            </div>
          </div>

          {/* Splitting Animation */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center animate-pulse-glow">
                <Scissors className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="hidden lg:block text-center">
              <div className="text-white/80 font-semibold mb-1">Chunking</div>
              <div className="text-xs text-cyan-400">256-512 tokens</div>
              <div className="text-xs text-purple-400">50-100 overlap</div>
            </div>
            {/* Animated arrows */}
            <div className="flex gap-1 mt-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Chunks */}
          <div className="flex flex-col gap-3 flex-grow">
            {['Chunk 1', 'Chunk 2', 'Chunk 3', 'Chunk 4'].map((label, index) => {
              const colors = ['cyan', 'purple', 'pink', 'orange'];
              const color = colors[index];
              return (
                <div
                  key={index}
                  className={`glass border-2 border-${color}-500/50 rounded-lg p-4 hover-lift transition-all duration-300 hover:border-${color}-400 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-600 flex items-center justify-center shadow-neural`}>
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-grow">
                      <div className={`text-${color}-400 font-bold text-sm mb-1`}>{label}</div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-500`}
                          style={{ width: `${85 + Math.random() * 15}%` }}
                        />
                      </div>
                    </div>
                    <div className={`text-${color}-400 text-xs font-mono`}>
                      {Math.floor(200 + Math.random() * 150)}ch
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 glass-strong border border-cyan-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-lg">💡</span>
            </div>
            <div className="text-sm text-white/90">
              <div className="font-bold text-cyan-400 mb-1">Why Chunking Matters</div>
              <div>Documents are split into smaller chunks to fit within the LLM's context window and improve retrieval precision. Optimal chunk size balances context (larger chunks) with accuracy (smaller chunks). Overlap ensures important information isn't lost at boundaries.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
