export const translations = {
  en: {
    // Navbar
    home: 'Home',
    agents: 'Agents',
    features: 'Features',
    blog: 'Blog',
    contact: 'Contact',
    progress: 'Progress',
    repo: 'Repo',
    tutorial: 'Tutorial',
    navResources: 'Resources',
    navTechnical: 'Technical',
    navAdvanced: 'Advanced',

    // Agents Dropdown
    agentsDropdown: {
      progressiveLabs: '8 Progressive Labs',
      progressiveLabsDesc: 'From basic components to orchestrator agents',
      interactiveLearning: 'Interactive Learning',
      interactiveLearningDesc: 'Hands-on code cells with real LLM integration',
      multiAgent: 'Multi-Agent Systems',
      multiAgentDesc: 'Learn collaboration and orchestration patterns',
    },

    // Features Dropdown
    featuresDropdown: {
      browserBased: '100% Browser-Based',
      browserBasedDesc: 'No backend needed - runs entirely in your browser',
      monacoEditor: 'Monaco Editor',
      monacoEditorDesc: 'Professional code editing experience',
      progressTracking: 'Progress Tracking',
      progressTrackingDesc: 'Save your progress with localStorage',
      langchain: 'LangChain.js',
      langchainDesc: 'Industry-standard agent framework',
    },

    // Homepage
    homepage: {
      subtitle: 'Master the art of building AI agents',
      welcomeTitle: 'WELCOME TO YOUR AI AGENTS TRAINING',
      aiBuilder: 'AI Builder, Speaker & Educator',
      whatYouLearn: "What You'll Learn",
      infoTitle: 'INFO',
      infoText: 'This interactive training platform runs entirely in your browser using your API keys. Your keys are stored in local storage and never sent to any server except for the LLM provider.',
      getStarted: 'CONFIGURE API KEY & START LEARNING',
      skipForNow: 'SKIP FOR NOW',
      footerCopyright: '© 2025 Yuval Avidani. All rights reserved',
      footerTagline: 'Founder of YUV.AI - Making AI practical, personal, and powerful',
    },

    // Labs
    labs: {
      agentComponents: 'Agent Components',
      agentComponentsDesc: 'Learn about different agent components',
      simplePrompt: 'Simple Prompt/Response',
      simplePromptDesc: 'Simple prompts & prompt responses',
      conversationMemory: 'Conversation Memory',
      conversationMemoryDesc: 'Conversational memory, build conversation context',
      customPrompts: 'Custom System Prompts',
      customPromptsDesc: 'Custom system prompts for specialized agent behavior',
      knowledgeBase: 'Knowledge Base',
      knowledgeBaseDesc: 'A comprehensive implementation of knowledge AI agents',
      contextWindow: 'Context Window & Chunking',
      contextWindowDesc: "Learn why we can't send everything to LLMs and master chunking strategies",
      embeddingsDeepDive: 'Embeddings Deep Dive',
      embeddingsDeepDiveDesc: 'See how text transforms into meaning vectors with real examples',
      vectorSimilarity: 'Vector Similarity & Retrieval',
      vectorSimilarityDesc: 'Master cosine similarity, top-K retrieval, and semantic search strategies',
      completeRAG: 'Complete RAG Pipeline',
      completeRAGDesc: 'Build end-to-end RAG with chunking, embeddings, retrieval, and reranking',
      ragWikipedia: 'RAG with Wikipedia',
      ragWikipediaDesc: 'RAG integration with Wikipedia and vector search',
      multiAgentCollab: 'Multi-Agent Collaboration',
      multiAgentCollabDesc: 'Multi-agent systems with orchestration patterns',
      orchestrator: 'Orchestrator Agent',
      orchestratorDesc: 'Orchestrator agent with multi-agent routing',
    },

    // API Modal
    apiModal: {
      title: 'API CONFIGURATION',
      infoStored: '✓ Your API key is securely stored in your browser. You can update it below or click "Save & Continue" to keep using the current key.',
      infoNotStored: 'Your API key is stored locally in your browser and never sent to any server except the LLM provider you choose.',
      selectProvider: 'Select Provider',
      cohereName: 'Cohere',
      cohereDesc: 'Production-ready LLM with excellent RAG and embeddings support',
      apiKeyLabel: 'API Key',
      apiKeyPlaceholder: 'Enter your API key',
      getApiKey: 'Get your API key from',
      validateKey: 'VALIDATE API KEY',
      validating: 'VALIDATING...',
      saveAndContinue: 'SAVE & CONTINUE',
      cancel: 'Cancel',
    },

    // CodeCell
    codeCell: {
      runCode: 'Run Code',
      tryCode: 'Try Code',
      editCode: 'Edit Code',
      close: 'Close',
      running: 'Running...',
      output: 'OUTPUT:',
      error: 'Error',
      success: 'Success',
      collapseOutput: 'Collapse Output',
      expandOutput: 'Expand Output',
    },

    // CompleteLabButton
    completeLabButton: {
      completeLab: 'Complete Lab & Continue',
      completeLabShort: 'Complete',
      labCompleted: 'Lab Completed!',
      labCompletedShort: 'Completed!',
    },

    // Lab 2 - Simple Prompt/Response
    lab2: {
      title: 'Lab 2: Simple Prompt/Response Agent',
      subtitle: 'Learn the basics of interacting with an LLM',
      whatYouLearn: "What you'll learn:",
      learn1: 'How to import and initialize a LangChain LLM',
      learn2: 'Sending a simple prompt to the AI',
      learn3: 'Receiving and displaying the response',
      learn4: 'Understanding the basic request/response cycle',
      step1Title: 'Import LangChain',
      step1Desc: 'class from LangChain',
      step2Title: 'Create LLM Instance',
      step2Desc: 'Initialize the LLM with your API key and selected model',
      step3Title: 'Define Your Prompt',
      step3Desc: 'Create a simple question to ask the AI',
      step4Title: 'Get AI Response',
      step4Desc: "Send the prompt and receive the AI's response",
      step5Title: 'Complete Example',
      step5Desc: 'Put it all together - your first working AI agent!',
      congratsTitle: 'Congratulations!',
      congratsText: "You've created your first AI agent! This simple prompt/response pattern is the foundation for all AI agents. In the next labs, we'll add memory, tools, and more complex behaviors.",
    },

    // Resources
    resources: {
      title: 'Learning Resources & Cookbooks',
      subtitle: 'Curated collection of essential cookbooks, documentation, and tutorials for building AI agents. These resources will help you master agent development across different frameworks and platforms.',
      visitResource: 'Visit Resource',
      footerTitle: 'Start Exploring!',
      footerText: 'Each of these resources offers unique perspectives and techniques. We recommend exploring them all to build a comprehensive understanding of AI agent development.',
      curatedMaterials: 'Curated learning materials',
    },

    // Technical Deep Dive
    technical: {
      title: 'Technical Deep Dive',
      subtitle: 'Understanding how code runs in your browser - demystifying the magic',
      browserAIExecution: 'Browser-based AI execution',
      intro: {
        title: 'The "Impossible" Made Possible',
        text1: 'A few years ago, running Python code or large language models in a web browser would have seemed impossible. Browsers were designed to display web pages, not execute complex programs or run billion-parameter AI models.',
        text2: 'Yet here we are - running full Python environments and 3-7 billion parameter language models entirely in your browser, with no server required. How is this possible? Let\'s break down the technical magic.',
      },
      challenge1: {
        title: 'Challenge #1: Running Python in the Browser',
        problem: 'The Problem',
        problemDesc: 'Browsers only understand JavaScript. Python is a completely different language that requires a Python interpreter to run.',
        solution: 'The Solution: WebAssembly (Wasm)',
        solutionDesc: 'WebAssembly is a binary instruction format that runs at near-native speed in browsers. We can compile the Python interpreter itself to WebAssembly!',
        howItWorks: 'How It Works',
        step1Title: 'Compile CPython to Wasm',
        step1Desc: 'The official Python interpreter (CPython) is written in C. Using Emscripten, we compile this C code into WebAssembly bytecode that browsers can execute.',
        step2Title: 'Load Pyodide in Browser',
        step2Desc: 'Pyodide is a distribution of Python compiled to Wasm, including popular packages like NumPy. It downloads once and runs entirely client-side.',
        step3Title: 'Execute Python Code',
        step3Desc: 'Your Python code is parsed and executed by the Wasm-compiled interpreter, just like it would on a regular Python installation - but in the browser!',
      },
      challenge2: {
        title: 'Challenge #2: Running LLMs in the Browser',
        problem: 'The Problem',
        problemDesc: 'Large language models are massive. A 7B parameter model typically requires 28GB of memory and powerful GPUs to run at reasonable speeds.',
        quantization: 'Quantization',
        quantizationDesc: 'Reduce model precision from 32-bit to 4-bit numbers. This compresses the model by ~85% with minimal quality loss.',
        webgpu: 'WebGPU Acceleration',
        webgpuDesc: 'Use the browser\'s WebGPU API to directly access the GPU, achieving speeds similar to native GPU computation.',
        solution: 'The Solution: Model Compression + GPU Acceleration',
        solutionDesc: 'Two key innovations make this possible:',
        example: 'Real-World Example',
      },
      whyThisSolution: {
        title: 'Why Did We Choose This Approach?',
        benefits: 'Benefits',
        benefit1: 'Complete Privacy - Your data never leaves your device',
        benefit2: 'Zero Cost - No server infrastructure or API fees',
        benefit3: 'Offline Capable - Works without internet (after initial download)',
        benefit4: 'Instant Response - No network latency',
        benefit5: 'Educational Value - See exactly how AI works locally',
        tradeoffs: 'Trade-offs',
        tradeoff1: 'Initial Download - Models are 2-4GB (one-time)',
        tradeoff2: 'Browser Requirements - Needs modern browser with WebGPU',
        tradeoff3: 'Model Size Limited - Can only run smaller quantized models',
        tradeoff4: 'Slower than Cloud - Not as fast as cloud GPUs',
      },
      realWorld: {
        title: 'Real-World Applications & Case Studies',
        case1Title: 'Google Colab - JupyterLite',
        case1Desc: 'Google created JupyterLite, a full Jupyter notebook environment running in the browser using Pyodide. Used for teaching and data science without servers.',
        case1Tech1: 'Pyodide',
        case1Tech2: 'WebAssembly',
        case1Tech3: 'IndexedDB Storage',
        case2Title: 'Photoshop Web',
        case2Desc: 'Adobe ported Photoshop to the web using WebAssembly, running complex image processing entirely in the browser with near-native performance.',
        case2Tech1: 'Emscripten',
        case2Tech2: 'WebAssembly',
        case3Title: 'Chrome DevTools AI',
        case3Desc: 'Chrome built on-device AI features using WebGPU and quantized models, providing code suggestions and debugging help without sending code to servers.',
        case3Tech1: 'WebLLM',
        case3Tech2: 'WebGPU',
      },
      stack: {
        title: 'Our Technical Stack Explained',
        pyodideDesc: 'Python distribution for the browser. Includes the full Python 3.11 interpreter and scientific computing libraries, all compiled to WebAssembly.',
        webllmDesc: 'High-performance in-browser LLM inference engine from MLC AI. Compiles ML models to WebGPU for hardware acceleration.',
        webgpuDesc: 'Modern web API for GPU computation. Successor to WebGL, provides low-level GPU access for AI and graphics.',
      },
      conclusion: {
        title: 'The Future is Browser-Native AI',
        text1: 'What seemed impossible just a few years ago is now a reality. The combination of WebAssembly, WebGPU, and model compression techniques has unlocked a new era of privacy-preserving, offline-capable AI applications.',
        text2: 'This training platform demonstrates these cutting-edge technologies in action. By running Python and LLMs directly in your browser, you\'re experiencing the future of web applications - powerful, private, and accessible to everyone.',
        quote: 'The best AI is the one that respects your privacy by running on your device.',
      },
    },

    // Advanced Playground
    advanced: {
      title: 'Advanced Playground',
      subtitle: 'Run LLMs and Python 100% in your browser locally - no server required!',
      runLLMsBrowser: 'Run LLMs in your browser',
      infoTitle: 'Welcome to the Advanced Playground!',
      infoText: 'This experimental feature lets you run large language models and Python code 100% locally in your browser. Everything runs on your device with WebGPU acceleration.',
      infoPoint1: 'First-time model downloads can be large (2-3GB) and may take several minutes',
      infoPoint2: 'Models are cached in your browser for future use',
      infoPoint3: 'Requires a modern browser with WebGPU support (Chrome/Edge 113+)',
      modelSection: 'Browser-Based LLM',
      selectModel: 'Select Model',
      loadModel: 'Download & Load Model',
      loading: 'Loading...',
      unloadModel: 'Unload Model',
      modelReady: 'Model Ready',
      modelNotLoaded: 'No Model Loaded',
      pythonEditor: 'Python Code Editor',
      runCode: 'Run Python',
      running: 'Running...',
      clearOutput: 'Clear Output',
      output: 'Output',
    },

    // Bonus - Context Engineering
    bonus: {
      label: 'BONUS',
      title: 'Prompt Engineering vs Context Engineering',
      subtitle: 'Discover why the industry is shifting from simple prompts to comprehensive context management - and what this means for building production-ready AI systems.',
      navTitle: 'Context Engineering',
      navDesc: 'The evolution from prompts to context',
      
      // Quotes
      tobiQuote: 'I really like the term "context engineering" over prompt engineering. It describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM.',
      karpathyQuote: 'People associate prompts with short task descriptions you\'d give an LLM in your day-to-day use. When in every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window with just the right information for the next step.',
      karpathyTitle: 'Former AI Director at Tesla, Co-founder of OpenAI',
      
      // Prompt Engineering Section
      promptEngTitle: 'What is Prompt Engineering?',
      promptEngDesc: 'Prompt engineering is the practice of crafting effective text inputs (prompts) to get desired outputs from an LLM. It focuses primarily on HOW you ask a question - the wording, structure, and framing of your request.',
      promptEngExample: 'Example: Better Prompting',
      simplePrompt: 'Simple prompt',
      betterPrompt: 'Engineered prompt',
      
      // Context Engineering Section
      contextEngTitle: 'What is Context Engineering?',
      contextEngDesc: 'Context engineering goes far beyond the prompt itself. It\'s about strategically assembling ALL the information the LLM needs to successfully complete a task. This includes not just the question, but the entire environment of knowledge surrounding it.',
      contextComponents: 'Components of Context Engineering',
      taskDesc: 'Task Descriptions',
      taskDescDetail: 'Clear explanations of what needs to be done',
      fewShot: 'Few-Shot Examples',
      fewShotDetail: 'Demonstrations of desired input/output pairs',
      ragData: 'RAG Data',
      ragDataDetail: 'Retrieved documents and knowledge base content',
      tools: 'Tool Definitions',
      toolsDetail: 'Available functions and their documentation',
      memory: 'State & Memory',
      memoryDetail: 'Conversation history and user context',
      stateHistory: 'Compacting',
      stateHistoryDetail: 'Intelligently managing limited context window space',
      
      // Comparison
      comparison: 'Side-by-Side Comparison',
      promptEngShort: 'Prompt Engineering',
      contextEngShort: 'Context Engineering',
      pePoint1: 'Focuses on crafting the right question',
      pePoint2: 'Static, single-turn interactions',
      pePoint3: 'Limited to what fits in one message',
      pePoint4: 'Like writing a good Google search query',
      cePoint1: 'Focuses on providing complete context',
      cePoint2: 'Dynamic, multi-turn with memory',
      cePoint3: 'Orchestrates multiple information sources',
      cePoint4: 'Like preparing a complete briefing document',
      
      // Case Study 1
      caseStudy1Title: 'Case Study: Coding Assistant',
      promptApproach: '❌ Prompt Approach',
      contextApproach: '✅ Context Approach',
      case1PromptResult: 'Generic answer, no understanding of your specific situation',
      case1ContextResult: 'Precise fix with understanding of your exact codebase and issue',
      
      // Case Study 2
      caseStudy2Title: 'Case Study: Contextual Retrieval (Anthropic)',
      caseStudy2Desc: 'Anthropic discovered that traditional RAG loses critical context when chunks are retrieved in isolation. Their solution: Context Engineering.',
      ragBefore: '❌ Traditional RAG chunk:',
      ragProblem: '→ Missing: Which company? What time period?',
      ragAfter: '✅ Context-engineered chunk:',
      ragSolution: '→ Now contains full context for accurate retrieval!',
      ragSource: 'Source: Anthropic\'s "Contextual Retrieval" - This approach reduced retrieval failures by 49%',
      
      // Case Study 3
      caseStudy3Title: 'Case Study: Production AI Agents',
      caseStudy3Desc: 'In real-world AI agents like Claude\'s coding capabilities or GitHub Copilot, the context window contains far more than just your message:',
      contextWindowContains: 'What fills the context window:',
      cwItem1: 'System prompts with behavioral guidelines',
      cwItem2: 'Retrieved documentation and code examples',
      cwItem3: 'Tool definitions with usage instructions',
      cwItem4: 'Conversation history and working memory',
      cwItem5: 'User preferences and project-specific rules',
      result: 'Result:',
      caseStudy3Result: 'The agent can understand your codebase, follow your conventions, use the right tools, and maintain context across multiple interactions.',
      
      // Key Takeaways
      keyTakeaways: 'Key Takeaways',
      takeaway1: 'Prompt Engineering is a subset of Context Engineering - it\'s about the "what you ask" part, while context engineering is about "everything the LLM sees"',
      takeaway2: 'Production AI systems spend more effort on context engineering than prompt engineering - Anthropic\'s SWE-bench agent optimized tools more than prompts',
      takeaway3: 'Context engineering includes: task descriptions, few-shot examples, RAG data, tools, memory, state history, and intelligent compacting',
      takeaway4: 'The goal is to provide "all the context for the task to be plausibly solvable" - not just a clever prompt',
      
      finalSummary: '"The art of context engineering is not about finding the perfect words - it\'s about assembling the perfect information environment for your AI to succeed."',
    },
  },
  he: {
    // Navbar
    home: 'בית',
    agents: 'סוכנים',
    features: 'תכונות',
    blog: 'בלוג',
    contact: 'צור קשר',
    progress: 'התקדמות',
    repo: 'מאגר',
    tutorial: 'מדריך',
    navResources: 'משאבים',
    navTechnical: 'טכני',
    navAdvanced: 'מתקדם',

    // Agents Dropdown
    agentsDropdown: {
      progressiveLabs: '8 מעבדות מתקדמות',
      progressiveLabsDesc: 'מרכיבים בסיסיים ועד סוכני תזמור',
      interactiveLearning: 'למידה אינטראקטיבית',
      interactiveLearningDesc: 'תאי קוד מעשיים עם אינטגרציית LLM אמיתית',
      multiAgent: 'מערכות רב-סוכניות',
      multiAgentDesc: 'למד דפוסי שיתוף פעולה ותזמור',
    },

    // Features Dropdown
    featuresDropdown: {
      browserBased: '100% מבוסס דפדפן',
      browserBasedDesc: 'אין צורך בשרת - פועל לחלוטין בדפדפן שלך',
      monacoEditor: 'עורך Monaco',
      monacoEditorDesc: 'חוויית עריכת קוד מקצועית',
      progressTracking: 'מעקב התקדמות',
      progressTrackingDesc: 'שמור את ההתקדמות שלך עם localStorage',
      langchain: 'LangChain.js',
      langchainDesc: 'מסגרת סוכנים סטנדרטית בתעשייה',
    },

    // Homepage
    homepage: {
      subtitle: 'שלוט באומנות בניית סוכני AI',
      welcomeTitle: 'ברוכים הבאים לאימון סוכני ה-AI שלכם',
      aiBuilder: 'בונה AI, דובר ומחנך',
      whatYouLearn: 'מה תלמדו',
      infoTitle: 'מידע',
      infoText: 'פלטפורמת הלמידה האינטראקטיבית רצה בדפדפן תוך שימוש במפתח ה-API של המשתמש. המפתח נשמר ב-Local Storage בדפדפן ונשלח רק למודל השפה הגדול (LLM) שבו משתמשים.',
      getStarted: 'הגדר מפתח API והתחל ללמוד',
      skipForNow: 'דלג לעכשיו',
      footerCopyright: '© 2025 יובל אבידני. כל הזכויות שמורות',
      footerTagline: 'מייסד YUV.AI - הופך AI למעשי, אישי וחזק',
    },

    // Labs
    labs: {
      agentComponents: 'רכיבי סוכן',
      agentComponentsDesc: 'למד על רכיבי סוכן שונים',
      simplePrompt: 'הנחיה/תגובה פשוטה',
      simplePromptDesc: 'הנחיות פשוטות ותגובות להנחיות',
      conversationMemory: 'זיכרון שיחה',
      conversationMemoryDesc: 'זיכרון שיחה, בנה הקשר שיחה',
      customPrompts: 'הנחיות מערכת מותאמות',
      customPromptsDesc: 'הנחיות מערכת מותאמות להתנהגות סוכן מיוחדת',
      knowledgeBase: 'בסיס ידע',
      knowledgeBaseDesc: 'יישום מקיף של סוכני AI בידע',
      contextWindow: 'חלון הקשר וחיתוך',
      contextWindowDesc: 'למד למה אנחנו לא יכולים לשלוח הכל ל-LLMs ושלוט באסטרטגיות חיתוך',
      embeddingsDeepDive: 'צלילה עמוקה ל-Embeddings',
      embeddingsDeepDiveDesc: 'ראה איך טקסט הופך לוקטורי משמעות עם דוגמאות אמיתיות',
      vectorSimilarity: 'דמיון וקטורי ואחזור',
      vectorSimilarityDesc: 'שלוט בדמיון קוסינוס, אחזור top-K ואסטרטגיות חיפוש סמנטי',
      completeRAG: 'צינור RAG מלא',
      completeRAGDesc: 'בנה RAG מקצה לקצה עם חיתוך, embeddings, אחזור ו-reranking',
      ragWikipedia: 'RAG עם ויקיפדיה',
      ragWikipediaDesc: 'אינטגרציית RAG עם ויקיפדיה וחיפוש וקטורי',
      multiAgentCollab: 'שיתוף פעולה רב-סוכני',
      multiAgentCollabDesc: 'מערכות רב-סוכניות עם דפוסי תזמור',
      orchestrator: 'סוכן מתזמר',
      orchestratorDesc: 'סוכן מתזמר עם ניתוב רב-סוכני',
    },

    // API Modal
    apiModal: {
      title: 'הגדרת API',
      infoStored: '✓ מפתח ה-API שלך מאוחסן בצורה מאובטחת בדפדפן שלך. אתה יכול לעדכן אותו למטה או ללחוץ על "שמור והמשך" כדי להמשיך להשתמש במפתח הנוכחי.',
      infoNotStored: 'מפתח ה-API שלך מאוחסן מקומית בדפדפן שלך ולעולם אינו נשלח לשום שרת מלבד ספק ה-LLM שתבחר.',
      selectProvider: 'בחר ספק',
      cohereName: 'Cohere',
      cohereDesc: 'LLM מוכן לייצור עם תמיכה מצוינת ב-RAG ו-embeddings',
      apiKeyLabel: 'מפתח API',
      apiKeyPlaceholder: 'הזן את מפתח ה-API שלך',
      getApiKey: 'קבל את מפתח ה-API שלך מ',
      validateKey: 'אמת מפתח API',
      validating: 'מאמת...',
      saveAndContinue: 'שמור והמשך',
      cancel: 'ביטול',
    },

    // CodeCell
    codeCell: {
      runCode: 'הרץ קוד',
      tryCode: 'נסה קוד',
      editCode: 'ערוך קוד',
      close: 'סגור',
      running: 'מריץ...',
      output: ':פלט',
      error: 'שגיאה',
      success: 'הצלחה',
      collapseOutput: 'כווץ פלט',
      expandOutput: 'הרחב פלט',
    },

    // CompleteLabButton
    completeLabButton: {
      completeLab: 'השלם מעבדה והמשך',
      completeLabShort: 'השלם',
      labCompleted: '!המעבדה הושלמה',
      labCompletedShort: '!הושלמה',
    },

    // Lab 2 - Simple Prompt/Response
    lab2: {
      title: 'מעבדה 2: סוכן הנחיה/תגובה פשוט',
      subtitle: 'למד את היסודות של אינטראקציה עם LLM',
      whatYouLearn: ':מה תלמד',
      learn1: 'כיצד לייבא ולאתחל LangChain LLM',
      learn2: 'שליחת הנחיה פשוטה ל-AI',
      learn3: 'קבלת והצגת התגובה',
      learn4: 'הבנת מחזור הבקשה/תגובה הבסיסי',
      step1Title: 'ייבוא LangChain',
      step1Desc: 'מ-LangChain',
      step2Title: 'יצירת מופע LLM',
      step2Desc: 'אתחול ה-LLM עם מפתח ה-API והמודל שנבחר',
      step3Title: 'הגדרת ההנחיה שלך',
      step3Desc: 'צור שאלה פשוטה לשאול את ה-AI',
      step4Title: 'קבלת תגובת AI',
      step4Desc: 'שלח את ההנחיה וקבל את תגובת ה-AI',
      step5Title: 'דוגמה מלאה',
      step5Desc: 'חבר הכל ביחד - סוכן ה-AI הראשון שלך!',
      congratsTitle: '!מזל טוב',
      congratsText: 'יצרת את סוכן ה-AI הראשון שלך! דפוס ההנחיה/תגובה הפשוט הזה הוא הבסיס לכל סוכני ה-AI. במעבדות הבאות, נוסיף זיכרון, כלים והתנהגויות מורכבות יותר.',
    },

    // Resources
    resources: {
      title: 'משאבי למידה וספרי מתכונים',
      subtitle: 'אוסף מקיף של ספרי מתכונים חיוניים, תיעוד ומדריכים לבניית סוכני AI. משאבים אלו יעזרו לך לשלוט בפיתוח סוכנים על פני מסגרות ופלטפורמות שונות.',
      visitResource: 'בקר במשאב',
      footerTitle: '!התחל לחקור',
      footerText: 'כל אחד מהמשאבים הללו מציע נקודות מבט וטכניקות ייחודיות. אנו ממליצים לחקור את כולם כדי לבנות הבנה מקיפה של פיתוח סוכני AI.',
      curatedMaterials: 'חומרי למידה מקוטלגים',
    },

    // Technical Deep Dive
    technical: {
      title: 'צלילה טכנית מעמיקה',
      subtitle: 'הבנת איך קוד רץ בדפדפן - הסרת הקסם',
      browserAIExecution: 'הרצת AI מבוססת דפדפן',
      intro: {
        title: '"הבלתי אפשרי" הפך לאפשרי',
        text1: 'לפני כמה שנים, הרצת קוד פייתון או מודלי שפה גדולים בדפדפן אינטרנט הייתה נראית בלתי אפשרית. דפדפנים תוכננו להציג דפי אינטרנט, לא להריץ תוכניות מורכבות או מודלי AI עם מיליארדי פרמטרים.',
        text2: 'ובכל זאת אנחנו כאן - מריצים סביבות פייתון מלאות ומודלי שפה בעלי 3-7 מיליארד פרמטרים לחלוטין בדפדפן שלך, ללא צורך בשרת. איך זה אפשרי? בואו נפרק את הקסם הטכני.',
      },
      challenge1: {
        title: 'אתגר #1: הרצת פייתון בדפדפן',
        problem: 'הבעיה',
        problemDesc: 'דפדפנים מבינים רק JavaScript. פייתון היא שפה שונה לחלוטין הדורשת מתורגמן פייתון כדי לרוץ.',
        solution: 'הפתרון: WebAssembly (Wasm)',
        solutionDesc: 'WebAssembly הוא פורמט הוראות בינארי הרץ במהירות כמעט מקורית בדפדפנים. אנחנו יכולים לקמפל את מתורגמן הפייתון עצמו ל-WebAssembly!',
        howItWorks: 'איך זה עובד',
        step1Title: 'קמפול CPython ל-Wasm',
        step1Desc: 'מתורגמן הפייתון הרשמי (CPython) כתוב ב-C. באמצעות Emscripten, אנחנו מקמפלים את קוד ה-C הזה ל-bytecode של WebAssembly שדפדפנים יכולים להריץ.',
        step2Title: 'טעינת Pyodide בדפדפן',
        step2Desc: 'Pyodide היא הפצת פייתון מקומפלת ל-Wasm, כולל חבילות פופולריות כמו NumPy. היא מתקבלת פעם אחת ורצה לחלוטין בצד הלקוח.',
        step3Title: 'הרצת קוד פייתון',
        step3Desc: 'קוד הפייתון שלך מנותח ומורץ על ידי המתורגמן המקומפל ל-Wasm, בדיוק כמו שהוא היה רץ בהתקנת פייתון רגילה - אבל בדפדפן!',
      },
      challenge2: {
        title: 'אתגר #2: הרצת מודלי שפה בדפדפן',
        problem: 'הבעיה',
        problemDesc: 'מודלי שפה גדולים הם עצומים. מודל 7B פרמטרים דורש בדרך כלל 28GB זיכרון ו-GPUs חזקים כדי לרוץ במהירויות סבירות.',
        quantization: 'קוונטיזציה',
        quantizationDesc: 'הפחתת דיוק המודל מ-32 ביט ל-4 ביט. זה דוחס את המודל ב-~85% עם אובדן איכות מינימלי.',
        webgpu: 'האצת WebGPU',
        webgpuDesc: 'שימוש ב-API של WebGPU בדפדפן לגישה ישירה ל-GPU, השגת מהירויות דומות לחישוב GPU מקורי.',
        solution: 'הפתרון: דחיסת מודל + האצת GPU',
        solutionDesc: ':שני חידושים מרכזיים הופכים את זה לאפשרי',
        example: 'דוגמה מהעולם האמיתי',
      },
      whyThisSolution: {
        title: '?למה בחרנו בגישה הזו',
        benefits: 'יתרונות',
        benefit1: 'פרטיות מלאה - הנתונים שלך לעולם לא עוזבים את המכשיר שלך',
        benefit2: 'עלות אפס - אין תשתית שרת או עלויות API',
        benefit3: 'יכולת לא מקוונת - עובד ללא אינטרנט (לאחר הורדה ראשונית)',
        benefit4: 'תגובה מיידית - אין עיכוב רשת',
        benefit5: 'ערך חינוכי - ראה בדיוק איך AI עובד מקומית',
        tradeoffs: 'פשרות',
        tradeoff1: 'הורדה ראשונית - מודלים הם 2-4GB (חד פעמי)',
        tradeoff2: 'דרישות דפדפן - צריך דפדפן מודרני עם WebGPU',
        tradeoff3: 'גודל מודל מוגבל - יכול להריץ רק מודלים מכווצים קטנים יותר',
        tradeoff4: 'איטי יותר מענן - לא מהיר כמו GPUs בענן',
      },
      realWorld: {
        title: 'יישומים מהעולם האמיתי ומקרי בוחן',
        case1Title: 'Google Colab - JupyterLite',
        case1Desc: 'גוגל יצרה את JupyterLite, סביבת מחברת Jupyter מלאה הרצה בדפדפן באמצעות Pyodide. משמשת להוראה ומדעי נתונים ללא שרתים.',
        case1Tech1: 'Pyodide',
        case1Tech2: 'WebAssembly',
        case1Tech3: 'אחסון IndexedDB',
        case2Title: 'Photoshop Web',
        case2Desc: 'Adobe העבירה את Photoshop לאינטרנט באמצעות WebAssembly, מריצה עיבוד תמונה מורכב לחלוטין בדפדפן עם ביצועים כמעט מקוריים.',
        case2Tech1: 'Emscripten',
        case2Tech2: 'WebAssembly',
        case3Title: 'Chrome DevTools AI',
        case3Desc: 'Chrome בנתה תכונות AI על המכשיר באמצעות WebGPU ומודלים מכווצים, מספקת הצעות קוד ועזרה בניפוי באגים מבלי לשלוח קוד לשרתים.',
        case3Tech1: 'WebLLM',
        case3Tech2: 'WebGPU',
      },
      stack: {
        title: 'המערכת הטכנית שלנו מוסברת',
        pyodideDesc: 'הפצת פייתון לדפדפן. כוללת את מתורגמן פייתון 3.11 המלא וספריות מחשוב מדעי, הכל מקומפל ל-WebAssembly.',
        webllmDesc: 'מנוע הסקת LLM בעל ביצועים גבוהים בדפדפן מ-MLC AI. מקמפל מודלי ML ל-WebGPU להאצת חומרה.',
        webgpuDesc: 'API אינטרנט מודרני לחישוב GPU. ממשיך ל-WebGL, מספק גישת GPU ברמה נמוכה ל-AI וגרפיקה.',
      },
      conclusion: {
        title: 'העתיד הוא AI מקורי לדפדפן',
        text1: 'מה שנראה בלתי אפשרי לפני כמה שנים הוא כעת מציאות. השילוב של WebAssembly, WebGPU וטכניקות דחיסת מודלים פתח עידן חדש של יישומי AI שומרי פרטיות ומסוגלים לעבוד לא מקוון.',
        text2: 'פלטפורמת האימון הזו מדגימה את הטכנולוגיות החדשניות הללו בפעולה. על ידי הרצת פייתון ו-LLMs ישירות בדפדפן שלך, אתה חווה את עתיד יישומי האינטרנט - עוצמתיים, פרטיים ונגישים לכולם.',
        quote: '.ה-AI הטוב ביותר הוא זה שמכבד את הפרטיות שלך על ידי ריצה על המכשיר שלך',
      },
    },

    // Advanced Playground
    advanced: {
      title: 'מגרש משחקים מתקדם',
      subtitle: '!הרץ מודלי שפה ופייתון 100% בדפדפן מקומית - ללא צורך בשרת',
      runLLMsBrowser: 'הרץ מודלי שפה בדפדפן שלך',
      infoTitle: '!ברוכים הבאים למגרש המשחקים המתקדם',
      infoText: 'תכונה ניסיונית זו מאפשרת לך להריץ מודלי שפה גדולים וקוד פייתון 100% מקומית בדפדפן. הכל רץ על המכשיר שלך עם האצת WebGPU.',
      infoPoint1: 'הורדות מודלים בפעם הראשונה יכולות להיות גדולות (2-3GB) ועשויות לקחת מספר דקות',
      infoPoint2: 'מודלים נשמרים במטמון הדפדפן לשימוש עתידי',
      infoPoint3: 'דורש דפדפן מודרני עם תמיכת WebGPU (Chrome/Edge 113+)',
      modelSection: 'מודל שפה מבוסס דפדפן',
      selectModel: 'בחר מודל',
      loadModel: 'הורד וטען מודל',
      loading: '...טוען',
      unloadModel: 'הסר מודל',
      modelReady: 'המודל מוכן',
      modelNotLoaded: 'לא נטען מודל',
      pythonEditor: 'עורך קוד פייתון',
      runCode: 'הרץ פייתון',
      running: '...רץ',
      clearOutput: 'נקה פלט',
      output: 'פלט',
    },

    // Bonus - Context Engineering
    bonus: {
      label: 'בונוס',
      title: 'הנדסת פרומפטים מול הנדסת הקשר',
      subtitle: 'גלו מדוע התעשייה עוברת מפרומפטים פשוטים לניהול הקשר מקיף - ומה זה אומר לבניית מערכות AI מוכנות לייצור.',
      navTitle: 'הנדסת הקשר',
      navDesc: 'האבולוציה מפרומפטים להקשר',
      
      // Quotes
      tobiQuote: 'אני באמת אוהב את המונח "הנדסת הקשר" על פני הנדסת פרומפטים. הוא מתאר טוב יותר את המיומנות הליבתית: האומנות של לספק את כל ההקשר כדי שהמשימה תהיה ניתנת לפתרון על ידי ה-LLM.',
      karpathyQuote: 'אנשים מזהים פרומפטים עם תיאורי משימות קצרים שהייתם נותנים ל-LLM בשימוש היומיומי. כאשר בכל אפליקציית LLM תעשייתית, הנדסת הקשר היא האומנות והמדע העדינים של מילוי חלון ההקשר במידע הנכון בדיוק לשלב הבא.',
      karpathyTitle: 'מנהל AI לשעבר בטסלה, שותף מייסד ב-OpenAI',
      
      // Prompt Engineering Section
      promptEngTitle: 'מהי הנדסת פרומפטים?',
      promptEngDesc: 'הנדסת פרומפטים היא תרגול של יצירת קלטי טקסט אפקטיביים (פרומפטים) כדי לקבל פלטים רצויים מ-LLM. היא מתמקדת בעיקר באיך אתה שואל שאלה - הניסוח, המבנה והמסגור של הבקשה שלך.',
      promptEngExample: 'דוגמה: פרומפטים טובים יותר',
      simplePrompt: 'פרומפט פשוט',
      betterPrompt: 'פרומפט מהונדס',
      
      // Context Engineering Section
      contextEngTitle: 'מהי הנדסת הקשר?',
      contextEngDesc: 'הנדסת הקשר הולכת הרבה מעבר לפרומפט עצמו. מדובר בהרכבה אסטרטגית של כל המידע שה-LLM צריך כדי להשלים משימה בהצלחה. זה כולל לא רק את השאלה, אלא את כל סביבת הידע סביבה.',
      contextComponents: 'מרכיבי הנדסת הקשר',
      taskDesc: 'תיאורי משימות',
      taskDescDetail: 'הסברים ברורים על מה צריך לעשות',
      fewShot: 'דוגמאות Few-Shot',
      fewShotDetail: 'הדגמות של זוגות קלט/פלט רצויים',
      ragData: 'נתוני RAG',
      ragDataDetail: 'מסמכים שאוחזרו ותוכן בסיס ידע',
      tools: 'הגדרות כלים',
      toolsDetail: 'פונקציות זמינות והתיעוד שלהן',
      memory: 'מצב וזיכרון',
      memoryDetail: 'היסטוריית שיחה והקשר משתמש',
      stateHistory: 'דחיסה',
      stateHistoryDetail: 'ניהול חכם של מקום מוגבל בחלון ההקשר',
      
      // Comparison
      comparison: 'השוואה זו מול זו',
      promptEngShort: 'הנדסת פרומפטים',
      contextEngShort: 'הנדסת הקשר',
      pePoint1: 'מתמקדת ביצירת השאלה הנכונה',
      pePoint2: 'אינטראקציות סטטיות, חד-פעמיות',
      pePoint3: 'מוגבלת למה שנכנס בהודעה אחת',
      pePoint4: 'כמו לכתוב שאילתת חיפוש טובה בגוגל',
      cePoint1: 'מתמקדת באספקת הקשר מלא',
      cePoint2: 'דינמית, רב-פעמית עם זיכרון',
      cePoint3: 'מתזמרת מקורות מידע מרובים',
      cePoint4: 'כמו להכין מסמך תדריך מלא',
      
      // Case Study 1
      caseStudy1Title: 'מקרה בוחן: עוזר קוד',
      promptApproach: '❌ גישת פרומפט',
      contextApproach: '✅ גישת הקשר',
      case1PromptResult: 'תשובה גנרית, ללא הבנה של המצב הספציפי שלך',
      case1ContextResult: 'תיקון מדויק עם הבנה של בסיס הקוד והבעיה המדויקים שלך',
      
      // Case Study 2
      caseStudy2Title: 'מקרה בוחן: אחזור הקשרי (Anthropic)',
      caseStudy2Desc: 'Anthropic גילו ש-RAG מסורתי מאבד הקשר קריטי כאשר חלקים מאוחזרים בבידוד. הפתרון שלהם: הנדסת הקשר.',
      ragBefore: '❌ חלק RAG מסורתי:',
      ragProblem: '→ חסר: איזו חברה? איזו תקופה?',
      ragAfter: '✅ חלק מהונדס-הקשר:',
      ragSolution: '→ עכשיו מכיל הקשר מלא לאחזור מדויק!',
      ragSource: 'מקור: "אחזור הקשרי" של Anthropic - גישה זו הפחיתה כשלי אחזור ב-49%',
      
      // Case Study 3
      caseStudy3Title: 'מקרה בוחן: סוכני AI בייצור',
      caseStudy3Desc: 'בסוכני AI אמיתיים כמו יכולות הקידוד של Claude או GitHub Copilot, חלון ההקשר מכיל הרבה יותר מרק ההודעה שלך:',
      contextWindowContains: 'מה ממלא את חלון ההקשר:',
      cwItem1: 'פרומפטי מערכת עם הנחיות התנהגות',
      cwItem2: 'תיעוד ודוגמאות קוד שאוחזרו',
      cwItem3: 'הגדרות כלים עם הוראות שימוש',
      cwItem4: 'היסטוריית שיחה וזיכרון עבודה',
      cwItem5: 'העדפות משתמש וכללים ספציפיים לפרויקט',
      result: 'תוצאה:',
      caseStudy3Result: 'הסוכן יכול להבין את בסיס הקוד שלך, לעקוב אחר המוסכמות שלך, להשתמש בכלים הנכונים, ולשמור על הקשר לאורך אינטראקציות מרובות.',
      
      // Key Takeaways
      keyTakeaways: 'נקודות מפתח',
      takeaway1: 'הנדסת פרומפטים היא תת-קבוצה של הנדסת הקשר - היא עוסקת בחלק של "מה אתה שואל", בעוד הנדסת הקשר עוסקת ב"כל מה שה-LLM רואה"',
      takeaway2: 'מערכות AI בייצור משקיעות יותר מאמץ בהנדסת הקשר מאשר בהנדסת פרומפטים - סוכן ה-SWE-bench של Anthropic אופטמז כלים יותר מפרומפטים',
      takeaway3: 'הנדסת הקשר כוללת: תיאורי משימות, דוגמאות few-shot, נתוני RAG, כלים, זיכרון, היסטוריית מצב, ודחיסה חכמה',
      takeaway4: 'המטרה היא לספק "את כל ההקשר כדי שהמשימה תהיה ניתנת לפתרון" - לא רק פרומפט חכם',
      
      finalSummary: '"אומנות הנדסת ההקשר היא לא למצוא את המילים המושלמות - אלא להרכיב את סביבת המידע המושלמת כדי שה-AI שלך יצליח."',
    },
  },
};

export type Language = 'en' | 'he';

export function t(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}
