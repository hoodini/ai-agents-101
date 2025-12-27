import { ChatGroq } from '@langchain/groq';
import { ChatCohere } from '@langchain/cohere';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { BaseMessage } from '@langchain/core/messages';
import * as webllm from '@mlc-ai/web-llm';

// Singleton for WebLLM engine
let webllmEngine: webllm.MLCEngine | null = null;
let webllmModelLoaded: string | null = null;

/**
 * WebLLM wrapper that implements a LangChain-compatible interface
 */
class WebLLMChat {
  private modelName: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }

  async invoke(input: string | BaseMessage[]): Promise<{ content: string }> {
    // Ensure engine is loaded
    if (!webllmEngine || webllmModelLoaded !== this.modelName) {
      await this.loadModel();
    }

    // Convert input to string prompt
    let prompt: string;
    if (typeof input === 'string') {
      prompt = input;
    } else {
      // Extract content from message array
      const lastMessage = input[input.length - 1];
      prompt = typeof lastMessage === 'string' ? lastMessage : (lastMessage as any).content;
    }

    // Call WebLLM
    const messages = [{ role: 'user' as const, content: prompt }];
    const reply = await webllmEngine!.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 512,
    });

    return {
      content: reply.choices[0].message.content || '',
    };
  }

  private async loadModel(): Promise<void> {
    if (!webllmEngine) {
      webllmEngine = await webllm.CreateMLCEngine(this.modelName, {
        initProgressCallback: (progress) => {
          console.log(`[WebLLM] ${progress.text}`);
        },
      });
      webllmModelLoaded = this.modelName;
    } else if (webllmModelLoaded !== this.modelName) {
      await webllmEngine.reload(this.modelName);
      webllmModelLoaded = this.modelName;
    }
  }
}

/**
 * Create a unified LLM instance that works with Groq, Cohere, or browser-based WebLLM
 */
export function createUnifiedLLM(
  apiKey: string,
  provider: 'groq' | 'cohere' | 'browser',
  modelName: string
): BaseChatModel | WebLLMChat {
  if (provider === 'groq') {
    return new ChatGroq({
      apiKey,
      model: modelName,
    });
  } else if (provider === 'cohere') {
    return new ChatCohere({
      apiKey,
      model: modelName,
    });
  } else {
    // browser provider uses WebLLM
    return new WebLLMChat(modelName);
  }
}

/**
 * Check if browser provider requires model loading
 */
export async function ensureWebLLMLoaded(modelName: string): Promise<void> {
  if (!webllmEngine || webllmModelLoaded !== modelName) {
    if (!webllmEngine) {
      webllmEngine = await webllm.CreateMLCEngine(modelName, {
        initProgressCallback: (progress) => {
          console.log(`[WebLLM] ${progress.text}`);
        },
      });
      webllmModelLoaded = modelName;
    } else {
      await webllmEngine.reload(modelName);
      webllmModelLoaded = modelName;
    }
  }
}

/**
 * Get the current WebLLM engine instance (for advanced usage)
 */
export function getWebLLMEngine(): webllm.MLCEngine | null {
  return webllmEngine;
}

/**
 * Unload the WebLLM model and free memory
 */
export function unloadWebLLM(): void {
  if (webllmEngine) {
    webllmEngine = null;
    webllmModelLoaded = null;
  }
}

/**
 * Get available models for each provider
 */
export function getAvailableModels(provider: 'groq' | 'cohere' | 'browser'): string[] {
  if (provider === 'groq') {
    return [
      'llama-3.1-8b-instant',
      'llama-3.1-70b-versatile',
      'llama-3.3-70b-versatile',
      'mixtral-8x7b-32768',
      'gemma2-9b-it',
    ];
  } else if (provider === 'cohere') {
    return [
      'command-a-03-2025',
      'command-r-plus',
      'command-r',
      'command',
    ];
  } else {
    // browser provider - WebLLM models
    return [
      'Phi-3.5-mini-instruct-q4f16_1-MLC',
      'Llama-3.2-3B-Instruct-q4f16_1-MLC',
      'Qwen2.5-3B-Instruct-q4f16_1-MLC',
    ];
  }
}
