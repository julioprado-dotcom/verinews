import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const verifications = await db.verification.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });

    const total = await db.verification.count();

    const formatted = verifications.map((v) => ({
      id: v.id,
      inputType: v.inputType,
      inputContent: v.inputContent,
      overallScore: v.overallScore,
      veracityLevel: v.veracityLevel,
      summary: v.summary,
      createdAt: v.createdAt,
      dimensionScores: {
        sourceCredibility: v.sourceCredibility,
        internalCoherence: v.internalCoherence,
        externalCorroboration: v.externalCorroboration,
        sensationalism: v.sensationalism,
        factualAccuracy: v.factualAccuracy,
        biasManipulation: v.biasManipulation,
      },
    }));

    return NextResponse.json({ verifications: formatted, total });
  } catch (error) {
    console.error('History fetch error:', error);
    return NextResponse.json(
      { error: 'Error al obtener el historial' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await db.verification.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la verificación' },
      { status: 500 }
    );
  }
}
