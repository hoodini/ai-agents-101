import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { createUnifiedLLM } from './unifiedLLM';

/**
 * Create an LLM instance - now supports browser-based WebLLM!
 * For browser provider, apiKey can be any string (not used)
 */
export function createLLM(
  apiKey: string,
  provider: 'groq' | 'cohere' | 'browser',
  modelName: string
): BaseChatModel | any {
  return createUnifiedLLM(apiKey, provider, modelName);
}

// Re-export the unified version as the new default
export { createUnifiedLLM };
