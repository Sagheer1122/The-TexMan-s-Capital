import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { counselingQuerySchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`message_${ip}`, 3, 60 * 1000); // 3 queries per min
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'You have reached the submission limit. Please wait a moment before sending another message.' },
        { status: 429 }
      );
    }

    const session = await getSessionUser();
    const body = await request.json();
    const validated = counselingQuerySchema.parse(body);

    const query = await prisma.counselingQuery.create({
      data: {
        userId: session?.userId || null,
        name: sanitizeInput(validated.name),
        email: validated.email.toLowerCase().trim(),
        phone: validated.phone ? sanitizeInput(validated.phone) : null,
        subject: validated.subject ? sanitizeInput(validated.subject) : null,
        category: sanitizeInput(validated.category),
        message: sanitizeInput(validated.message),
        status: 'Pending',
      },
    });

    return NextResponse.json({
      message: 'Your counseling query has been submitted successfully. A mentor will respond shortly.',
      query,
    }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Submit Counseling Query Error:', error);
    return NextResponse.json({ error: 'Failed to submit counseling query.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session || (session.role !== 'admin' && session.role !== 'team_head')) {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const queries = await prisma.counselingQuery.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            level: true,
          },
        },
      },
    });

    return NextResponse.json({ queries });
  } catch (error) {
    console.error('Fetch All Counseling Queries Error:', error);
    return NextResponse.json({ error: 'Failed to fetch counseling queries.' }, { status: 500 });
  }
}
