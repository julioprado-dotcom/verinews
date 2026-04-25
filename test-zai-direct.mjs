/**
 * Direct test of z.ai API — simulates exactly what the verify route does
 * Run: ZAI_API_KEY=your_key node test-zai-direct.mjs
 */
const API_KEY = process.env.ZAI_API_KEY;
const BASE_URL = 'https://api.z.ai/api/paas/v4';
const MODELS = ['glm-4.7-flash', 'glm-4.5-flash'];

if (!API_KEY) {
  console.error('ERROR: Set ZAI_API_KEY env var');
  process.exit(1);
}

async function testModel(model) {
  console.log(`\n===== Testing ${model} =====`);
  const start = Date.now();
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);
  
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'Responde solo en JSON.' },
          { role: 'user', content: 'Di OK y nada más.' }
        ],
        max_tokens: 5,
        temperature: 0.1,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const elapsed = Date.now() - start;
    const text = await response.text();
    
    console.log(`Status: ${response.status}`);
    console.log(`Time: ${elapsed}ms`);
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()));
    console.log(`Body: ${text.slice(0, 500)}`);
    
    return { status: response.status, time: elapsed, body: text };
  } catch (error) {
    clearTimeout(timeoutId);
    const elapsed = Date.now() - start;
    console.log(`ERROR after ${elapsed}ms: ${error.message}`);
    return { error: error.message, time: elapsed };
  }
}

async function testMegaPrompt(model) {
  console.log(`\n===== Mega-prompt test with ${model} =====`);
  const start = Date.now();
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);
  
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'Eres un analista. Responde SOLO JSON.' },
          { role: 'user', content: 'Analiza: "Brasil prohíbe empresas de apuestas". Responde JSON con: {score: 0-100, summary: "texto"}' }
        ],
        max_tokens: 2048,
        temperature: 0.3,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const elapsed = Date.now() - start;
    const text = await response.text();
    
    console.log(`Status: ${response.status}`);
    console.log(`Time: ${elapsed}ms`);
    console.log(`Body (first 500): ${text.slice(0, 500)}`);
    
    return { status: response.status, time: elapsed };
  } catch (error) {
    clearTimeout(timeoutId);
    const elapsed = Date.now() - start;
    console.log(`ERROR after ${elapsed}ms: ${error.message}`);
    return { error: error.message, time: elapsed };
  }
}

// Run tests
(async () => {
  // Test 1: Minimal call to each model
  for (const model of MODELS) {
    await testModel(model);
  }
  
  // Test 2: Mega-prompt with first available model
  for (const model of MODELS) {
    const result = await testMegaPrompt(model);
    if (result.status === 200) break; // Found working model, stop
  }
})();
