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
      infoText: 'This interactive training platform runs entirely in your browser using your API keys. Your keys are stored in local storage and never sent to any server expect for the LLM provider.',
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
      groqName: 'Groq',
      groqDesc: 'Fastest inference, great for real-time demos',
      cohereName: 'Cohere',
      cohereDesc: 'Excellent for RAG and embeddings',
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
      groqName: 'Groq',
      groqDesc: 'היסק המהיר ביותר, מצוין להדגמות בזמן אמת',
      cohereName: 'Cohere',
      cohereDesc: 'מצוין ל-RAG ו-embeddings',
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
