import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { eventSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Fetch Events Error:', error);
    return NextResponse.json({ error: 'Failed to fetch events.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const body = await request.json();
    const validated = eventSchema.parse(body);

    const event = await prisma.event.create({
      data: {
        title: sanitizeInput(validated.title),
        desc: sanitizeInput(validated.desc),
        date: sanitizeInput(validated.date),
        time: sanitizeInput(validated.time),
        speakerName: validated.speakerName ? sanitizeInput(validated.speakerName) : null,
        speakerTitle: validated.speakerTitle ? sanitizeInput(validated.speakerTitle) : null,
        speakerOrg: validated.speakerOrg ? sanitizeInput(validated.speakerOrg) : null,
        speakerRole: validated.speakerRole ? sanitizeInput(validated.speakerRole) : null,
        status: validated.status,
        qualTarget: validated.qualTarget ? sanitizeInput(validated.qualTarget) : null,
        location: sanitizeInput(validated.location),
        meetingLink: validated.meetingLink,
        recordingUrl: validated.recordingUrl,
      },
    });

    return NextResponse.json({ message: 'Event created successfully', event }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Create Event Error:', error);
    return NextResponse.json({ error: 'Failed to create event.' }, { status: 500 });
  }
}
