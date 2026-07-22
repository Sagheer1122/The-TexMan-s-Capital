import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const queries = await prisma.counselingQuery.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ queries });
  } catch (error) {
    console.error('Fetch My Queries Error:', error);
    return NextResponse.json({ error: 'Failed to fetch your submitted queries.' }, { status: 500 });
  }
}
