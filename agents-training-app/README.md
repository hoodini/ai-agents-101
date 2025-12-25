# AI Agents 101 - Interactive Training Platform

> Master the art of building AI agents through hands-on, browser-based labs

Created by **Yuval Avidani** - AI Builder, Speaker & Educator
Founder of [YUV.AI](https://yuv.ai) | GitHub [@hoodini](https://github.com/hoodini) | [GitHub Stars Profile](https://stars.github.com/profiles/hoodini/)

---

## What is This?

AI Agents 101 is an interactive web-based training platform that teaches you how to build AI agents from scratch. Unlike traditional tutorials, this platform features:

- **Interactive Code Cells** - Run real AI agent code directly in your browser
- **Progressive Learning** - 8 labs that build on each other
- **100% Browser-Based** - No backend required, all execution happens client-side
- **Hands-On Practice** - Learn by doing with real LLM API calls

## What You'll Learn

### Lab 1: Understanding AI Agent Components
Learn the three core components that make up every AI agent: LLM, Tools, and Memory

### Lab 2: Simple Prompt and Response Agent
Build your first AI agent that can process prompts and generate responses

### Lab 3: Custom System Prompts
Shape your agent's personality and behavior with system prompts

### Lab 4: Conversation Memory
Give your agent the ability to remember previous interactions

### Lab 5: Knowledge Base Integration
Ground your agent in specific knowledge to prevent hallucinations

### Lab 6: RAG with Wikipedia
Learn Retrieval-Augmented Generation with embeddings and vector search

### Lab 7: Multi-Agent Collaboration
Build systems where multiple specialized agents work together

### Lab 8: Orchestrator Agent
Create an intelligent orchestrator that routes queries to specialized agents

## Tech Stack

- **Frontend Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Agent Framework:** LangChain.js
- **LLM Providers:** Groq, Cohere, or OpenAI (user choice)
- **Code Editor:** Monaco Editor (VS Code editor in the browser)
- **State Management:** Zustand
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An API key from one of these providers:
  - **Groq** (Recommended - fastest, free tier): https://console.groq.com/keys
  - **Cohere**: https://dashboard.cohere.com/api-keys
  - **OpenAI**: https://platform.openai.com/api-keys

### Installation

1. Clone this repository:
\`\`\`bash
git clone <your-repo-url>
cd agents-training-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser to \`http://localhost:5173\`

5. Click "Configure API Key" and enter your API key

6. Start learning!

## Project Structure

\`\`\`
agents-training-app/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ApiKeyModal.tsx
│   │   ├── CodeCell.tsx
│   │   └── LabNavigation.tsx
│   ├── labs/              # 8 interactive labs
│   │   ├── Lab1.tsx
│   │   ├── Lab2.tsx
│   │   ├── ...
│   │   └── Lab8.tsx
│   ├── store/             # Zustand state management
│   │   └── useStore.ts
│   ├── types/             # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx            # Main application component
│   ├── main.tsx          # Entry point
│   └── index.css         # Tailwind styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
\`\`\`

## Features

### Interactive Code Execution
Each lab includes executable code cells where you can:
- Edit TypeScript/JavaScript code
- Run agent code with real LLM calls
- See execution results in real-time
- Experiment with different prompts and configurations

### Progress Tracking
- Automatic progress saving to localStorage
- Visual progress bar showing completion
- Mark labs as complete
- Resume where you left off

### Responsive Design
- Works on desktop, tablet, and mobile
- Collapsible sidebar navigation
- Optimized for both light and dark modes

### Privacy & Security
- API keys stored locally in browser (never sent to external servers)
- All agent execution happens client-side
- No backend required
- No data collection

## Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
\`\`\`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The production-ready files will be in the \`dist/\` directory.

## Deployment

This is a static web application that can be deployed to:

- **Vercel**: \`vercel deploy\`
- **Netlify**: Drag and drop the \`dist/\` folder
- **GitHub Pages**: Push \`dist/\` to gh-pages branch
- **Any static hosting service**

## API Provider Recommendations

### Groq (Recommended)
- **Why:** Fastest inference speeds, generous free tier
- **Best for:** Real-time demos and learning
- **Model:** llama-3.1-8b-instant
- **Sign up:** https://console.groq.com/keys

### Cohere
- **Why:** Excellent for RAG and embeddings
- **Best for:** Production applications
- **Sign up:** https://dashboard.cohere.com/api-keys

### OpenAI
- **Why:** Industry standard, most reliable
- **Best for:** Advanced applications
- **Sign up:** https://platform.openai.com/api-keys

## Troubleshooting

### "API key not configured" error
Make sure you've entered your API key in the settings modal (click the gear icon)

### Code execution fails
Check that your API key is valid and you have credits/quota remaining with your provider

### Monaco Editor not loading
Make sure you have a stable internet connection for the CDN resources

## About the Creator

**Yuval Avidani** is an AI Builder, Speaker, and Educator based in Israel with 17 years in tech. He leads the AI consultancy and content platform **YUV.AI**, where he helps individuals and companies unlock the real value of generative AI, LLMs, and agents.

### Connect with Yuval:
- **Website:** https://yuv.ai
- **GitHub:** [@hoodini](https://github.com/hoodini)
- **X (Twitter):** [@yuvalav](https://x.com/yuvalav)
- **LinkedIn:** [Yuval Avidani](https://linkedin.com/in/yuval-avidani-87081474)
- **Instagram:** [@yuval_770](https://instagram.com/yuval_770)
- **Linktree:** https://linktr.ee/yuvai

### Notable Work:
- **Logan AI** - An orchestration layer for multi-agent systems
- **GitHub Stars Program** member
- Delivers hands-on workshops for global companies in UK, EU, and Israel

## License

© 2025 Yuval Avidani. All rights reserved.

This project is the intellectual property of Yuval Avidani and YUV.AI.

## Contributing

This is a training platform created by Yuval Avidani. For questions or collaboration opportunities, please reach out through the links above.

---

**Ready to build your first AI agent?** Get started now! 🚀
