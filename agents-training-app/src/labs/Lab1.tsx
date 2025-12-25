import { CompleteLabButton } from '../components/CompleteLabButton';

export function Lab1() {

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 pb-6 border-b border-cyan-500/30">
        <h1 className="text-5xl font-bold heading-font neon-cyan mb-4 tracking-wider">
          LAB 1: UNDERSTANDING AI AGENT COMPONENTS
        </h1>
        <p className="text-xl text-white/80 font-medium">
          Learn the three core components that make up an AI agent
        </p>
      </div>

      <div className="space-y-6">
        <section className="holo-border rounded-xl p-6 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl shadow-2xl border-2 border-cyan-500/30">
          <h2 className="text-3xl font-semibold text-gradient-neural mb-4">
            What is an AI Agent?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            An AI agent is a system that can perceive its environment, make decisions, and take
            actions to achieve specific goals. Unlike simple chatbots, agents can use tools, remember
            context, and work autonomously.
          </p>
        </section>

        <section className="holo-border rounded-xl p-6 bg-gradient-to-br from-slate-900/90 to-cyan-900/30 backdrop-blur-xl shadow-2xl border-2 border-cyan-500/30">
          <h2 className="text-3xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl text-lg font-black shadow-lg" style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}>
              1
            </span>
            Large Language Model (LLM)
          </h2>
          <p className="text-white/80 text-lg mb-4 leading-relaxed">
            The "brain" of the agent. The LLM processes input, reasons about what to do, and generates
            responses. Examples include GPT-4, Claude, Llama, Mistral, and others.
          </p>
          <div className="glass border border-cyan-500/30 rounded-xl p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <p className="text-sm text-cyan-100 font-mono leading-relaxed">
              <strong className="text-cyan-400">Key capabilities:</strong>
              <br />• Natural language understanding
              <br />• Reasoning and decision-making
              <br />• Context interpretation
              <br />• Response generation
            </p>
          </div>
        </section>

        <section className="holo-border rounded-xl p-6 bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-xl shadow-2xl border-2 border-purple-500/30">
          <h2 className="text-3xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl text-lg font-black shadow-lg" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
              2
            </span>
            Tools
          </h2>
          <p className="text-white/80 text-lg mb-4 leading-relaxed">
            Tools extend the agent's capabilities beyond text generation. They allow agents to interact
            with external systems, APIs, databases, calculators, search engines, and more.
          </p>
          <div className="glass border border-purple-500/30 rounded-xl p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <p className="text-sm text-purple-100 font-mono leading-relaxed">
              <strong className="text-purple-400">Example tools:</strong>
              <br />• Web search (Google, Bing)
              <br />• Calculator for math operations
              <br />• Database queries
              <br />• API calls (weather, stock prices, etc.)
              <br />• File system operations
              <br />• Code execution
            </p>
          </div>
        </section>

        <section className="holo-border rounded-xl p-6 bg-gradient-to-br from-slate-900/90 to-green-900/30 backdrop-blur-xl shadow-2xl border-2 border-green-500/30">
          <h2 className="text-3xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-600 text-white rounded-xl text-lg font-black shadow-lg" style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}>
              3
            </span>
            Memory
          </h2>
          <p className="text-white/80 text-lg mb-4 leading-relaxed">
            Memory allows agents to remember previous interactions, maintain context across
            conversations, and learn from past experiences. This makes agents feel more intelligent and
            personalized.
          </p>
          <div className="glass border border-green-500/30 rounded-xl p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10">
            <p className="text-sm text-green-100 font-mono leading-relaxed">
              <strong className="text-green-400">Types of memory:</strong>
              <br />• Short-term: Recent conversation history
              <br />• Long-term: Persistent knowledge across sessions
              <br />• Working memory: Context window for current task
              <br />• Vector/Semantic memory: Knowledge base with embeddings
            </p>
          </div>
        </section>

        <section className="holo-border rounded-xl p-6 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 backdrop-blur-xl shadow-2xl border-2 border-cyan-500/40">
          <h2 className="text-3xl font-semibold text-gradient-neural mb-6">How They Work Together</h2>
          <div className="space-y-3 text-white/90 text-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <p>User sends a query to the agent</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <p>Agent checks <strong>memory</strong> for relevant context</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p>
                <strong>LLM</strong> processes the query and decides if tools are needed
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <p>
                Agent calls appropriate <strong>tools</strong> to gather information
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                5
              </div>
              <p>
                <strong>LLM</strong> synthesizes tool results with context from memory
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                6
              </div>
              <p>Agent responds to user and updates memory</p>
            </div>
          </div>
        </section>

        <CompleteLabButton labId={1} />
      </div>
    </div>
  );
}
