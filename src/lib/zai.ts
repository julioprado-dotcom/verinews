import ZAI from 'z-ai-web-dev-sdk';

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

export async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function chatCompletion(messages: Array<{ role: string; content: string }>) {
  const zai = await getZAI();
  return zai.chat.completions.create({
    messages: messages as Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    temperature: 0.3,
    max_tokens: 4096,
  });
}

export async function webSearch(query: string, num: number = 10) {
  const zai = await getZAI();
  return zai.functions.invoke("web_search", { query, num });
}

/**
 * Attempt to read a web page's content via the web-reader function.
 * Returns null if the function is unavailable or fails.
 */
export async function webReader(url: string): Promise<{ title?: string; html?: string; content?: string; text?: string } | null> {
  try {
    const zai = await getZAI();
    const result = await zai.functions.invoke("web_reader", { url });
    return result as any;
  } catch {
    // web_reader may not be available in all SDK versions
    return null;
  }
}
