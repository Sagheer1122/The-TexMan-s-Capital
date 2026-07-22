import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { createJobSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await prisma.job.findUnique({
      where: { id },
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

    if (!job) {
      return NextResponse.json({ error: 'Job listing not found.' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Fetch Single Job Error:', error);
    return NextResponse.json({ error: 'Failed to fetch job details.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const body = await request.json();
    const validated = createJobSchema.partial().parse(body);

    const updateData: any = {};
    if (validated.title) updateData.title = sanitizeInput(validated.title);
    if (validated.company) updateData.company = sanitizeInput(validated.company);
    if (validated.location) updateData.location = sanitizeInput(validated.location);
    if (validated.level) updateData.level = sanitizeInput(validated.level);
    if (validated.jobType) updateData.jobType = validated.jobType;
    if (validated.isOverseas !== undefined) updateData.isOverseas = validated.isOverseas;
    if (validated.deadline) updateData.deadline = new Date(validated.deadline);
    if (validated.description) updateData.description = sanitizeInput(validated.description);
    if (validated.requirements) updateData.requirements = validated.requirements.map(r => sanitizeInput(r));

    const updatedJob = await prisma.job.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error: any) {
    console.error('Update Job Error:', error);
    return NextResponse.json({ error: 'Failed to update job posting.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete Job Error:', error);
    return NextResponse.json({ error: 'Failed to delete job posting.' }, { status: 500 });
  }
}
