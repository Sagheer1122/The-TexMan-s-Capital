import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { createJobSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city') || '';
    const level = searchParams.get('level') || '';
    const jobType = searchParams.get('type') || '';
    const isOverseas = searchParams.get('is_overseas');

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (city) {
      where.location = { contains: city, mode: 'insensitive' };
    }

    if (level) {
      where.level = { contains: level, mode: 'insensitive' };
    }

    if (jobType) {
      where.jobType = jobType as any;
    }

    if (isOverseas !== null && isOverseas !== undefined && isOverseas !== '') {
      where.isOverseas = isOverseas === 'true';
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        postedBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Fetch Jobs Error:', error);
    return NextResponse.json({ error: 'Failed to fetch job listings.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const body = await request.json();
    const validated = createJobSchema.parse(body);

    const newJob = await prisma.job.create({
      data: {
        title: sanitizeInput(validated.title),
        company: sanitizeInput(validated.company),
        location: sanitizeInput(validated.location),
        level: sanitizeInput(validated.level),
        jobType: validated.jobType,
        isOverseas: validated.isOverseas,
        deadline: validated.deadline ? new Date(validated.deadline) : null,
        description: sanitizeInput(validated.description),
        requirements: validated.requirements.map(r => sanitizeInput(r)),
        postedById: session.userId,
      },
    });

    return NextResponse.json({ message: 'Job created successfully', job: newJob }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Create Job Error:', error);
    return NextResponse.json({ error: 'Failed to create job posting.' }, { status: 500 });
  }
}
