import { NextResponse } from 'next/server';

export async function GET() {
  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    env: {
      TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL ? 'SET' : 'MISSING',
      TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN ? 'SET' : 'MISSING',
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
      ZAI_API_KEY: process.env.ZAI_API_KEY ? 'SET (***' + (process.env.ZAI_API_KEY?.slice(-4) || '') + ')' : 'MISSING',
      ZAI_MODEL: process.env.ZAI_MODEL || 'glm-4.7-flash (default)',
      ZAI_BASE_URL: process.env.ZAI_BASE_URL || 'https://api.z.ai/api/paas/v4 (default)',
    },
  };

  // Test 1: @libsql/client
  try {
    const { createClient } = await import('@libsql/client/web');
    const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:./test.db';
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url || url === 'file:./test.db') {
      diagnostics.libsql = { status: 'SKIPPED', reason: 'No database URL configured' };
    } else {
      const client = createClient({ url, authToken: authToken || '' });
      const result = await client.execute('SELECT 1 as test');
      diagnostics.libsql = { status: 'OK', result: result.rows[0] };
      client.close();
    }
  } catch (error: any) {
    diagnostics.libsql = { status: 'ERROR', message: error.message, stack: error.stack?.slice(0, 500) };
  }

  // Test 2: ZAI config check (NO API call — just verify config is set)
  // We removed the actual API test call because it was consuming rate limit unnecessarily.
  // The verify route itself will report any API errors.
  diagnostics.zai = {
    configured: !!process.env.ZAI_API_KEY,
    model: process.env.ZAI_MODEL || 'glm-4.7-flash (default)',
    baseUrl: process.env.ZAI_BASE_URL || 'https://api.z.ai/api/paas/v4 (default)',
    note: 'API call skipped to preserve rate limit. Verify endpoint will test connectivity.',
  };

  return NextResponse.json(diagnostics, { status: 200 });
}
