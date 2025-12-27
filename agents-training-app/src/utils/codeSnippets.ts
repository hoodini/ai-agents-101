/**
 * Utility functions to generate provider-specific code snippets for labs
 * This ensures code snippets match the user's selected LLM provider
 */

export type Provider = 'groq' | 'cohere' | 'browser';

/**
 * Get the appropriate LLM class name based on provider
 */
export function getLLMClassName(provider: Provider): string {
    switch (provider) {
        case 'groq':
            return 'ChatGroq';
        case 'cohere':
            return 'ChatCohere';
        case 'browser':
            return 'WebLLM';
        default:
            return 'ChatGroq';
    }
}

/**
 * Get the import statement for the LLM class
 */
export function getLLMImportStatement(provider: Provider): string {
    switch (provider) {
        case 'groq':
            return `import { ChatGroq } from '@langchain/groq';`;
        case 'cohere':
            return `import { ChatCohere } from '@langchain/cohere';`;
        case 'browser':
            return `import * as webllm from '@mlc-ai/web-llm';`;
        default:
            return `import { ChatGroq } from '@langchain/groq';`;
    }
}

/**
 * Get the LLM initialization code based on provider
 */
export function getLLMInitCode(
    provider: Provider,
    apiKey: string | null,
    selectedModel: string,
    options: {
        variableName?: string;
        includeAwait?: boolean;
    } = {}
): string {
    const { variableName = 'llm', includeAwait = false } = options;
    const maskedApiKey = apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here';

    switch (provider) {
        case 'groq':
            return `const ${variableName} = new ChatGroq({
  apiKey: '${maskedApiKey}',
  model: '${selectedModel}',
});`;
        case 'cohere':
            return `const ${variableName} = new ChatCohere({
  apiKey: '${maskedApiKey}',
  model: '${selectedModel}',
});`;
        case 'browser':
            return includeAwait
                ? `// Browser LLM - runs locally in your browser, no API key needed!
const engine = await webllm.CreateMLCEngine('${selectedModel}');
const ${variableName} = {
  invoke: async (prompt) => {
    const reply = await engine.chat.completions.create({
      messages: [{ role: 'user', content: typeof prompt === 'string' ? prompt : prompt[prompt.length - 1].content }],
    });
    return { content: reply.choices[0].message.content };
  }
};`
                : `// Browser LLM - runs locally in your browser, no API key needed!
// Note: Engine initialization requires await (async context)
const engine = await webllm.CreateMLCEngine('${selectedModel}');
const ${variableName} = {
  invoke: async (prompt) => {
    const reply = await engine.chat.completions.create({
      messages: [{ role: 'user', content: typeof prompt === 'string' ? prompt : prompt[prompt.length - 1].content }],
    });
    return { content: reply.choices[0].message.content };
  }
};`;
        default:
            return `const ${variableName} = new ChatGroq({
  apiKey: '${maskedApiKey}',
  model: '${selectedModel}',
});`;
    }
}

/**
 * Get simplified LLM init for display in step-by-step code
 * Uses a more educational format for Browser LLM
 */
export function getSimpleLLMInitCode(
    provider: Provider,
    apiKey: string | null,
    selectedModel: string
): string {
    const maskedApiKey = apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here';

    switch (provider) {
        case 'groq':
            return `const llm = new ChatGroq({
  apiKey: '${maskedApiKey}',
  model: '${selectedModel}',
});`;
        case 'cohere':
            return `const llm = new ChatCohere({
  apiKey: '${maskedApiKey}',
  model: '${selectedModel}',
});`;
        case 'browser':
            return `// Browser LLM - 100% private, runs in your browser!
const llm = await createWebLLM('${selectedModel}');`;
        default:
            return `const llm = new ChatGroq({
  apiKey: '${maskedApiKey}',
  model: '${selectedModel}',
});`;
    }
}

/**
 * Get provider-specific description
 */
export function getProviderDescription(provider: Provider): string {
    switch (provider) {
        case 'groq':
            return 'Using Groq API (ultra-fast inference)';
        case 'cohere':
            return 'Using Cohere API (great for RAG)';
        case 'browser':
            return 'Using Browser LLM (100% private, local inference)';
        default:
            return 'Using LLM API';
    }
}

/**
 * Check if API key is required for the provider
 */
export function isApiKeyRequired(provider: Provider): boolean {
    return provider !== 'browser';
}

/**
 * Get a simplified create-llm step code that works for all providers
 */
export function getCreateLLMStepCode(
    provider: Provider,
    apiKey: string | null,
    selectedModel: string
): string {
    const className = getLLMClassName(provider);
    const maskedApiKey = apiKey ? '***YOUR_API_KEY***' : 'your-api-key-here';

    if (provider === 'browser') {
        return `// Step 2: Create a Browser LLM instance (runs locally!)
// No API key needed - model runs entirely in your browser
const llm = await createBrowserLLM('${selectedModel}');

console.log('✓ LLM instance created with model: ${selectedModel}');`;
    }

    return `// Step 2: Create an LLM instance with your API key
const llm = new ${className}({
  apiKey: '${maskedApiKey}',
  model: '${selectedModel}',
});

console.log('✓ LLM instance created with model: ${selectedModel}');`;
}
