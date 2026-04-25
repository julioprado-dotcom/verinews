import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, createToken, type AuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    // Find user
    const result = await db.execute({
      sql: 'SELECT id, email, password, name, tier FROM User WHERE email = ?',
      args: [email.toLowerCase().trim()],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const row = result.rows[0];
    const valid = await verifyPassword(password, row.password as string);

    if (!valid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Create token
    const user: AuthUser = {
      id: row.id as string,
      email: row.email as string,
      tier: (row.tier as AuthUser['tier']) || 'registered',
      name: (row.name as string) || undefined,
    };

    const token = await createToken(user);

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, tier: user.tier, name: user.name },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
}
