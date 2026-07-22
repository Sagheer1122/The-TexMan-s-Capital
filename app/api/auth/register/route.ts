import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, validatePasswordStrength, sanitizeInput } from '@/lib/security';
import { signToken, setAuthCookie } from '@/lib/auth';
import { registerSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`register_${ip}`, 5, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again shortly.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = registerSchema.parse(body);

    const passwordCheck = validatePasswordStrength(validated.password);
    if (!passwordCheck.valid) {
      return NextResponse.json({ error: passwordCheck.error }, { status: 400 });
    }

    const cleanEmail = validated.email.toLowerCase().trim();
    const cleanUsername = sanitizeInput(validated.username);
    const cleanFullName = sanitizeInput(validated.fullName);

    // Check existing email/username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: cleanEmail }, { username: cleanUsername }],
      },
    });

    if (existingUser) {
      if (existingUser.email === cleanEmail) {
        return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Username is already taken. Please choose another.' }, { status: 400 });
    }

    const passwordHash = await hashPassword(validated.password);

    const newUser = await prisma.user.create({
      data: {
        email: cleanEmail,
        username: cleanUsername,
        fullName: cleanFullName,
        passwordHash,
        level: validated.level,
        role: 'user',
      },
    });

    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      fullName: newUser.fullName,
      level: newUser.level,
    };

    const token = signToken(tokenPayload);
    await setAuthCookie(token);

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          fullName: newUser.fullName,
          role: newUser.role,
          level: newUser.level,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Register Route Error:', error);
    return NextResponse.json({ error: 'Failed to create user account.' }, { status: 500 });
  }
}
