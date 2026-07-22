import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { Role, Level } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-taxman-jwt-key-change-in-prod';
const COOKIE_NAME = 'taxman_session';
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  role: Role;
  fullName: string;
  level: Level;
}

/**
 * Sign a JWT for authenticated user
 */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Set httpOnly session cookie
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: MAX_AGE,
  });
}

/**
 * Clear session cookie (logout)
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}

/**
 * Extract authenticated user session from httpOnly cookie in Server Components / Routes
 */
export async function getSessionUser(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

/**
 * Fetch full current user record from database using session
 */
export async function getCurrentUserFromDb() {
  const session = await getSessionUser();
  if (!session) return null;
  return prisma.user.findUnique({
    where: { id: session.userId },
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
}
