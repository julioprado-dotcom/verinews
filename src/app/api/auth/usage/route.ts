import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken, TIER_LIMITS, TIER_CYCLES, getUsageCycleDates, type UserTier } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Get user tier (default: free for anonymous)
    let tier: UserTier = 'free';
    let userId: string | null = null;

    if (token) {
      const user = await verifyToken(token);
      if (user) {
        tier = user.tier;
        userId = user.id;
      }
    }

    const cycle = TIER_CYCLES[tier];
    const limit = TIER_LIMITS[tier];
    const { start: cycleStart, end: cycleEnd } = getUsageCycleDates(cycle);

    let used = 0;

    if (userId) {
      // Registered/premium/pro: count by userId within cycle date range
      const result = await db.execute({
        sql: `SELECT COUNT(*) as count FROM DailyUsage WHERE userId = ? AND date >= ? AND date <= ?`,
        args: [userId, cycleStart, cycleEnd],
      });
      used = (result.rows[0]?.count as number) || 0;
    } else {
      // Anonymous: always daily cycle, count by IP
      const today = new Date().toISOString().split('T')[0];
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown';

      const result = await db.execute({
        sql: `SELECT COUNT(*) as count FROM DailyUsage WHERE ip = ? AND date = ? AND userId IS NULL`,
        args: [ip, today],
      });
      used = (result.rows[0]?.count as number) || 0;
    }

    const remaining = limit === Infinity ? Infinity : Math.max(0, limit - used);

    return NextResponse.json({
      used,
      limit: limit === Infinity ? -1 : limit,
      remaining: remaining === Infinity ? -1 : remaining,
      tier,
      cycle,
      cycleStart,
      cycleEnd,
    });
  } catch (error) {
    console.error('Usage check error:', error);
    return NextResponse.json(
      { error: 'Error al verificar uso' },
      { status: 500 }
    );
  }
}
