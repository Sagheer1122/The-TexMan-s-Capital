import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resource = await prisma.resource.update({
      where: { id },
      data: {
        downloads: { increment: 1 },
      },
    });

    return NextResponse.json({ downloads: resource.downloads });
  } catch (error) {
    console.error('Increment Download Count Error:', error);
    return NextResponse.json({ error: 'Failed to record download.' }, { status: 500 });
  }
}
