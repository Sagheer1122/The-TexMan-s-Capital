import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params;
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingBookmark = await prisma.jobBookmark.findUnique({
      where: {
        userId_jobId: {
          userId: session.userId,
          jobId,
        },
      },
    });

    if (existingBookmark) {
      await prisma.jobBookmark.delete({
        where: {
          userId_jobId: {
            userId: session.userId,
            jobId,
          },
        },
      });
      return NextResponse.json({ isSaved: false, message: 'Job removed from saved list.' });
    } else {
      await prisma.jobBookmark.create({
        data: {
          userId: session.userId,
          jobId,
        },
      });
      return NextResponse.json({ isSaved: true, message: 'Job saved successfully.' });
    }
  } catch (error) {
    console.error('Toggle Job Save Error:', error);
    return NextResponse.json({ error: 'Failed to update job bookmark.' }, { status: 500 });
  }
}
