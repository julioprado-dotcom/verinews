import { createClient, type Client } from '@libsql/client'

const globalForDb = globalThis as unknown as {
  db: Client | undefined
}

function createDbClient(): Client {
  // If TURSO_URL is set, use Turso (remote libSQL)
  if (process.env.TURSO_DATABASE_URL) {
    return createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN || '',
    })
  }

  // Otherwise, use local SQLite (development)
  return createClient({
    url: process.env.DATABASE_URL || 'file:./db/dev.db',
  })
}

// Safe initialization — if the client can't be created, provide a no-op fallback
let dbClient: Client;
try {
  dbClient = globalForDb.db ?? createDbClient()
  if (process.env.NODE_ENV !== 'production') globalForDb.db = dbClient
} catch (error) {
  console.error('Failed to initialize database client:', error)
  // Create a fallback client that won't crash but will report errors on query
  dbClient = createClient({ url: 'file:./fallback.db' })
}

export const db = dbClient
