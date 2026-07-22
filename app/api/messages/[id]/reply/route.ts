import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { replyCounselingQuerySchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

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
    const validated = replyCounselingQuerySchema.parse(body);

    const updatedQuery = await prisma.counselingQuery.update({
      where: { id },
      data: {
        status: 'Replied',
        replyText: sanitizeInput(validated.replyText),
        repliedBy: session.fullName || session.username,
        repliedAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Reply sent successfully', query: updatedQuery });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Reply Counseling Query Error:', error);
    return NextResponse.json({ error: 'Failed to submit mentor reply.' }, { status: 500 });
  }
}
