/**
 * Utility functions to generate provider-specific code snippets for labs
 * This ensures code snippets match the user's selected LLM provider
 */

export type Provider = 'cohere' | 'browser';

/**
 * Get the appropriate LLM class name based on provider
 */
export function getLLMClassName(provider: Provider): string {
    switch (provider) {
        case 'cohere':
            return 'ChatCohere';
        case 'browser':
            return 'WebLLM';
        default:
            return 'ChatCohere';
    }
}

/**
 * Get the import statement for the LLM class
 */
export function getLLMImportStatement(provider: Provider): string {
    switch (provider) {
        case 'cohere':
            return `import { ChatCohere } from '@langchain/cohere';`;
        case 'browser':
            return `import * as webllm from '@mlc-ai/web-llm';`;
        default:
            return `import { ChatCohere } from '@langchain/cohere';`;
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
    const maskedApiKey = apiKey ? '✓ API key configured' : '⚠️ Configure your API key in Settings';

    switch (provider) {
        case 'cohere':
            return `const ${variableName} = new ChatCohere({
  apiKey: process.env.COHERE_API_KEY, // ${maskedApiKey}
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
            return `const ${variableName} = new ChatCohere({
  apiKey: process.env.COHERE_API_KEY, // ${maskedApiKey}
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
    const maskedApiKey = apiKey ? '✓ API key configured' : '⚠️ Configure your API key in Settings';

    switch (provider) {
        case 'cohere':
            return `const llm = new ChatCohere({
  apiKey: process.env.COHERE_API_KEY, // ${maskedApiKey}
  model: '${selectedModel}',
});`;
        case 'browser':
            return `// Browser LLM - 100% private, runs in your browser!
const llm = await createWebLLM('${selectedModel}');`;
        default:
            return `const llm = new ChatCohere({
  apiKey: process.env.COHERE_API_KEY, // ${maskedApiKey}
  model: '${selectedModel}',
});`;
    }
}

/**
 * Get provider-specific description
 */
export function getProviderDescription(provider: Provider): string {
    switch (provider) {
        case 'cohere':
            return 'Using Cohere API (production-ready LLM with RAG support)';
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
    const maskedApiKey = apiKey ? '✓ API key configured' : '⚠️ Configure your API key in Settings';

    if (provider === 'browser') {
        return `// Step 2: Create a Browser LLM instance (runs locally!)
// No API key needed - model runs entirely in your browser
const llm = await createBrowserLLM('${selectedModel}');

console.log('✓ LLM instance created with model: ${selectedModel}');`;
    }

    return `// Step 2: Create an LLM instance with your API key
const llm = new ${className}({
  apiKey: process.env.COHERE_API_KEY, // ${maskedApiKey}
  model: '${selectedModel}',
});

console.log('✓ LLM instance created with model: ${selectedModel}');`;
}
