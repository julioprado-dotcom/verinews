import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/db-init';

export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    console.error('Init DB error:', error);
    return NextResponse.json({ success: false, error: 'Failed to initialize database' }, { status: 500 });
  }
}
