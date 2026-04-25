import { db } from './db';

/**
 * Initialize database tables for the user system.
 * Safe to call multiple times — uses IF NOT EXISTS.
 */
export async function initDatabase() {
  try {
    // User table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS User (
        id TEXT NOT NULL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT,
        tier TEXT NOT NULL DEFAULT 'registered',
        stripeCustomerId TEXT,
        institutionId TEXT,
        seatNumber INTEGER DEFAULT 1,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT
      )
    `);

    // Daily usage tracking table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS DailyUsage (
        id TEXT NOT NULL PRIMARY KEY,
        userId TEXT,
        ip TEXT,
        date TEXT NOT NULL,
        verificationId TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (userId) REFERENCES User(id)
      )
    `);

    // Index for fast daily usage lookups
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_dailyusage_user_date
      ON DailyUsage(userId, date)
    `);

    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_dailyusage_ip_date
      ON DailyUsage(ip, date)
    `);

    // Add userId column to Verification table if it doesn't exist
    try {
      await db.execute(`ALTER TABLE Verification ADD COLUMN userId TEXT`);
    } catch {
      // Column already exists — ignore
    }

    // Add institutionId column to User table if it doesn't exist
    try {
      await db.execute(`ALTER TABLE User ADD COLUMN institutionId TEXT`);
    } catch {
      // Column already exists — ignore
    }

    // Add seatNumber column to User table if it doesn't exist
    try {
      await db.execute(`ALTER TABLE User ADD COLUMN seatNumber INTEGER DEFAULT 1`);
    } catch {
      // Column already exists — ignore
    }

    // Add index for weekly/monthly usage queries
    try {
      await db.execute(`
        CREATE INDEX IF NOT EXISTS idx_dailyusage_user_date_range
        ON DailyUsage(userId, date)
      `);
    } catch {
      // Index already exists — ignore
    }

    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}
