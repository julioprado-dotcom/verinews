import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';

// ─────────────────────────────────────────
// Constants & Types
// ─────────────────────────────────────────

export type UserTier = 'free' | 'registered' | 'premium' | 'pro';

export const TIER_LIMITS: Record<UserTier, number> = {
  free: 3,        // 3/day (daily cycle)
  registered: 50, // 50/week (weekly cycle)
  premium: 500,   // 500/month (monthly cycle)
  pro: Infinity,  // Unlimited + 3 team seats
};

export type TierCycle = 'daily' | 'weekly' | 'monthly' | 'unlimited';

export const TIER_CYCLES: Record<UserTier, TierCycle> = {
  free: 'daily',
  registered: 'weekly',
  premium: 'monthly',
  pro: 'unlimited',
};

export const TIER_LABELS: Record<UserTier, string> = {
  free: 'Básico',
  registered: 'Registrado',
  premium: 'Premium',
  pro: 'Pro Institucional',
};

export const TIER_PRICES: Record<UserTier, string> = {
  free: 'Gratis',
  registered: 'Gratis',
  premium: '$4.99/mes',
  pro: '$14.99/mes',
};

export const TIER_SEATS: Record<UserTier, number> = {
  free: 1,
  registered: 1,
  premium: 1,
  pro: 3,
};

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'verinews-dev-secret-change-in-production'
);

const JWT_EXPIRY = '30d';

export interface AuthUser {
  id: string;
  email: string;
  tier: UserTier;
  name?: string;
}

// ─────────────────────────────────────────
// Password utilities
// ─────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return compare(password, hashed);
}

// ─────────────────────────────────────────
// JWT utilities
// ─────────────────────────────────────────

export async function createToken(user: AuthUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AuthUser;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────
// Rate limiting
// ─────────────────────────────────────────

export interface UsageInfo {
  used: number;
  limit: number;
  remaining: number;
  tier: UserTier;
}

export function getTierLimit(tier: UserTier): number {
  return TIER_LIMITS[tier];
}

export function getTierCycle(tier: UserTier): TierCycle {
  return TIER_CYCLES[tier];
}

export function getRemainingUsage(used: number, tier: UserTier): number {
  const limit = getTierLimit(tier);
  if (limit === Infinity) return Infinity;
  return Math.max(0, limit - used);
}

/**
 * Get the date range for the current usage cycle
 * Returns { start, end } as ISO date strings (YYYY-MM-DD)
 */
export function getUsageCycleDates(cycle: TierCycle): { start: string; end: string } {
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  if (cycle === 'daily') {
    return { start: today, end: today };
  }

  if (cycle === 'weekly') {
    // Week starts on Monday
    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon...
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + mondayOffset);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return {
      start: startOfWeek.toISOString().split('T')[0],
      end: endOfWeek.toISOString().split('T')[0],
    };
  }

  if (cycle === 'monthly') {
    const startOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const endOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    return { start: startOfMonth, end: endOfMonth };
  }

  // unlimited — shouldn't be called but return today as fallback
  return { start: today, end: today };
}
