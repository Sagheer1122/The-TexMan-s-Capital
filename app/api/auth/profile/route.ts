import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateProfileSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security';

export async function PUT(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = updateProfileSchema.parse(body);

    const updateData: any = {};
    if (validated.fullName) updateData.fullName = sanitizeInput(validated.fullName);
    if (validated.phone !== undefined) updateData.phone = sanitizeInput(validated.phone);
    if (validated.city !== undefined) updateData.city = sanitizeInput(validated.city);
    if (validated.institution !== undefined) updateData.institution = sanitizeInput(validated.institution);
    if (validated.level) updateData.level = validated.level;
    if (validated.papersCleared !== undefined) updateData.papersCleared = validated.papersCleared;
    if (validated.avatarUrl !== undefined) updateData.avatarUrl = validated.avatarUrl;
    if (validated.cvUrl !== undefined) updateData.cvUrl = validated.cvUrl;

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        avatarUrl: true,
        level: true,
        phone: true,
        city: true,
        institution: true,
        papersCleared: true,
        cvUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Update Profile Error:', error);
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
