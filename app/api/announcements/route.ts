import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { announcementSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ announcements });
  } catch (error) {
    console.error('Fetch Announcements Error:', error);
    return NextResponse.json({ error: 'Failed to fetch announcements.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const body = await request.json();
    const validated = announcementSchema.parse(body);

    const announcement = await prisma.announcement.create({
      data: {
        title: sanitizeInput(validated.title),
        summary: sanitizeInput(validated.summary),
        content: validated.content,
        category: sanitizeInput(validated.category),
        eventDate: validated.eventDate ? sanitizeInput(validated.eventDate) : null,
        isPinned: validated.isPinned,
      },
    });

    return NextResponse.json({ message: 'Announcement created successfully', announcement }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Create Announcement Error:', error);
    return NextResponse.json({ error: 'Failed to post announcement.' }, { status: 500 });
  }
}
