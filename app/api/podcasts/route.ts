import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { podcastSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

export async function GET() {
  try {
    const podcasts = await prisma.podcast.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ podcasts });
  } catch (error) {
    console.error('Fetch Podcasts Error:', error);
    return NextResponse.json({ error: 'Failed to fetch podcasts.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const body = await request.json();
    const validated = podcastSchema.parse(body);

    const podcast = await prisma.podcast.create({
      data: {
        title: sanitizeInput(validated.title),
        guest: validated.guest ? sanitizeInput(validated.guest) : null,
        duration: validated.duration ? sanitizeInput(validated.duration) : null,
        youtubeId: sanitizeInput(validated.youtubeId),
        youtubeUrl: validated.youtubeUrl || `https://www.youtube.com/watch?v=${validated.youtubeId}`,
        qualTag: validated.qualTag ? sanitizeInput(validated.qualTag) : null,
        typeTag: validated.typeTag ? sanitizeInput(validated.typeTag) : null,
      },
    });

    return NextResponse.json({ message: 'Podcast created successfully', podcast }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Create Podcast Error:', error);
    return NextResponse.json({ error: 'Failed to create podcast.' }, { status: 500 });
  }
}
