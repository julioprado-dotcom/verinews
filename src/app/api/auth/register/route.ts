import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createToken, type AuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await db.execute({
      sql: 'SELECT id FROM User WHERE email = ?',
      args: [email.toLowerCase().trim()],
    });

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      );
    }

    // Create user
    const id = crypto.randomUUID();
    const hashedPassword = await hashPassword(password);

    await db.execute({
      sql: `INSERT INTO User (id, email, password, name, tier, createdAt)
            VALUES (?, ?, ?, ?, 'registered', datetime('now'))`,
      args: [id, email.toLowerCase().trim(), hashedPassword, name?.trim() || null],
    });

    // Create token
    const user: AuthUser = {
      id,
      email: email.toLowerCase().trim(),
      tier: 'registered',
      name: name?.trim() || undefined,
    };

    const token = await createToken(user);

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, tier: user.tier, name: user.name },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Error al crear la cuenta' },
      { status: 500 }
    );
  }
}
