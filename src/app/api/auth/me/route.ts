import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, type AuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ user: null, tier: 'free' });
    }

    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json({ user: null, tier: 'free' });
    }

    return NextResponse.json({
      user: { id: user.id, email: user.email, tier: user.tier, name: user.name },
      tier: user.tier,
    });
  } catch {
    return NextResponse.json({ user: null, tier: 'free' });
  }
}
