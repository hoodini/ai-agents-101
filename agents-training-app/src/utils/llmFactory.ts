import { ChatGroq } from '@langchain/groq';
import { ChatCohere } from '@langchain/cohere';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';

export function createLLM(
  apiKey: string,
  provider: 'groq' | 'cohere',
  modelName: string
): BaseChatModel {
  if (provider === 'groq') {
    return new ChatGroq({
      apiKey,
      model: modelName,
    });
  } else {
    return new ChatCohere({
      apiKey,
      model: modelName,
    });
  }
}
