// Use /web explicitly — this is the pure JS/WASM implementation that works
// on edge/serverless runtimes (EdgeOne, Cloudflare Workers, Vercel Edge, etc.)
import { createClient, type Client } from '@libsql/client/web'

const globalForDb = globalThis as unknown as {
  db: Client | undefined
}

function createDbClient(): Client {
  // If TURSO_DATABASE_URL is set, use Turso (remote libSQL over HTTP)
  if (process.env.TURSO_DATABASE_URL) {
    return createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN || '',
    })
  }

  // Fallback: use an in-memory database for builds/environments without Turso
  // The /web client doesn't support file: URLs — only libsql:, wss:, ws:, https:, http:
  return createClient({
    url: 'libsql://localhost:8080',
  })
}

// Safe initialization — defer actual connection until first query
// This prevents build-time crashes when env vars aren't available
let dbClient: Client;
try {
  dbClient = globalForDb.db ?? createDbClient()
  if (process.env.NODE_ENV !== 'production') globalForDb.db = dbClient
} catch (error) {
  console.error('Failed to initialize database client:', error)
  // Provide a fallback that won't crash the build
  // Actual errors will be reported at query time
  dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL || 'libsql://localhost:8080',
    authToken: process.env.TURSO_AUTH_TOKEN || '',
  })
}

export const db = dbClient
