import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { resourceSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    const where: any = {};

    if (category && category !== 'All') {
      where.category = category as any;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tag: { contains: search, mode: 'insensitive' } },
      ];
    }

    const resources = await prisma.resource.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { downloads: 'desc' }],
    });

    return NextResponse.json({ resources });
  } catch (error) {
    console.error('Fetch Resources Error:', error);
    return NextResponse.json({ error: 'Failed to fetch study resources.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const body = await request.json();
    const validated = resourceSchema.parse(body);

    const newResource = await prisma.resource.create({
      data: {
        title: sanitizeInput(validated.title),
        description: sanitizeInput(validated.description),
        category: validated.category,
        type: validated.type,
        downloadUrl: validated.downloadUrl,
        tag: validated.tag ? sanitizeInput(validated.tag) : null,
        tagColor: validated.tagColor,
        btnColor: validated.btnColor,
        isFeatured: validated.isFeatured,
      },
    });

    return NextResponse.json({ message: 'Resource created successfully', resource: newResource }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Create Resource Error:', error);
    return NextResponse.json({ error: 'Failed to create resource entry.' }, { status: 500 });
  }
}
