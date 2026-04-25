import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';

// ─────────────────────────────────────────
// Constants & Types
// ─────────────────────────────────────────

export type UserTier = 'free' | 'registered' | 'premium';

export const TIER_LIMITS: Record<UserTier, number> = {
  free: 3,
  registered: 20,
  premium: Infinity,
};

export const TIER_LABELS: Record<UserTier, string> = {
  free: 'Básico',
  registered: 'Registrado',
  premium: 'Premium',
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

export function getRemainingUsage(used: number, tier: UserTier): number {
  const limit = getTierLimit(tier);
  if (limit === Infinity) return Infinity;
  return Math.max(0, limit - used);
}
