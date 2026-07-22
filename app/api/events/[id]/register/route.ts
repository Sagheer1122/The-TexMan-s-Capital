import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await params;
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingReg = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: session.userId,
          eventId,
        },
      },
    });

    if (existingReg) {
      return NextResponse.json({ isRegistered: true, message: 'You are already registered for this event.' });
    }

    await prisma.eventRegistration.create({
      data: {
        userId: session.userId,
        eventId,
      },
    });

    return NextResponse.json({ isRegistered: true, message: 'Successfully registered for event! Access link sent.' });
  } catch (error) {
    console.error('Event Registration Error:', error);
    return NextResponse.json({ error: 'Failed to register for event.' }, { status: 500 });
  }
}
