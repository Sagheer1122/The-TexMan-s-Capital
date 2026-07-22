import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { communityGroupSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

export async function GET() {
  try {
    const communities = await prisma.communityGroup.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json({ communities });
  } catch (error) {
    console.error('Fetch Communities Error:', error);
    return NextResponse.json({ error: 'Failed to fetch community groups.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const body = await request.json();
    const validated = communityGroupSchema.parse(body);

    const group = await prisma.communityGroup.create({
      data: {
        title: sanitizeInput(validated.title),
        categoryKey: sanitizeInput(validated.categoryKey),
        badge: sanitizeInput(validated.badge),
        badgeBg: validated.badgeBg,
        description: sanitizeInput(validated.description),
        membersCountText: sanitizeInput(validated.membersCountText),
        bullets: validated.bullets.map(b => sanitizeInput(b)),
        whatsappLink: validated.whatsappLink,
        discordLink: validated.discordLink,
      },
    });

    return NextResponse.json({ message: 'Community group created successfully', group }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Create Community Group Error:', error);
    return NextResponse.json({ error: 'Failed to create community group.' }, { status: 500 });
  }
}
