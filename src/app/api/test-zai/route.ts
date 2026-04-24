import { NextRequest, NextResponse } from 'next/server';

/**
 * Direct API test — bypasses all abstractions to test z.ai raw API
 * Tests different models and payload sizes to find what works
 */
export async function GET(request: NextRequest) {
  const apiKey = process.env.ZAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ZAI_API_KEY not set' });
  }

  const baseUrl = 'https://api.z.ai/api/paas/v4';
  const results: Record<string, any> = {};

  // Test 1: Minimal call with glm-4.5-air
  try {
    const start = Date.now();
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4.5-air',
        messages: [{ role: 'user', content: 'Di OK' }],
        max_tokens: 5,
        temperature: 0.1,
      }),
    });
    const text = await res.text();
    results['glm-4.5-air_minimal'] = {
      status: res.status,
      time: Date.now() - start,
      response: text.slice(0, 300),
    };
  } catch (error: any) {
    results['glm-4.5-air_minimal'] = { error: error.message };
  }

  // Test 2: Minimal call with glm-4.7-flash
  try {
    const start = Date.now();
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4.7-flash',
        messages: [{ role: 'user', content: 'Di OK' }],
        max_tokens: 5,
        temperature: 0.1,
      }),
    });
    const text = await res.text();
    results['glm-4.7-flash_minimal'] = {
      status: res.status,
      time: Date.now() - start,
      response: text.slice(0, 300),
    };
  } catch (error: any) {
    results['glm-4.7-flash_minimal'] = { error: error.message };
  }

  // Test 3: glm-4.3B (smallest model)
  try {
    const start = Date.now();
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4.3b-0414-128k',
        messages: [{ role: 'user', content: 'Di OK' }],
        max_tokens: 5,
        temperature: 0.1,
      }),
    });
    const text = await res.text();
    results['glm-4.3b_minimal'] = {
      status: res.status,
      time: Date.now() - start,
      response: text.slice(0, 300),
    };
  } catch (error: any) {
    results['glm-4.3b_minimal'] = { error: error.message };
  }

  // Test 4: List available models
  try {
    const res = await fetch(`${baseUrl}/models`, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    const text = await res.text();
    results['models_list'] = {
      status: res.status,
      response: text.slice(0, 500),
    };
  } catch (error: any) {
    results['models_list'] = { error: error.message };
  }

  return NextResponse.json(results, { status: 200 });
}
