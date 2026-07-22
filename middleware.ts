import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-taxman-jwt-key-change-in-prod'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('taxman_session')?.value;

  let session: any = null;
  if (token) {
    try {
      const verified = await jwtVerify(token, JWT_SECRET);
      session = verified.payload;
    } catch (e) {
      // Invalid or expired token
      session = null;
    }
  }

  // Protect Admin dashboard routes (/admin/*)
  if (pathname.startsWith('/admin')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    const role = session.role;
    if (role !== 'admin' && role !== 'team_head') {
      // Access denied for non-admin roles
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect Admin API routes (/api/admin/*)
  if (pathname.startsWith('/api/admin')) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const role = session.role;
    if (role !== 'admin' && role !== 'team_head') {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }
  }

  // Protect User Student Dashboard (/dashboard)
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Auth-Required API endpoints
  if (
    pathname.startsWith('/api/messages/my-queries') ||
    pathname.startsWith('/api/resource-requests/my-requests') ||
    pathname.match(/\/api\/jobs\/[^/]+\/save/) ||
    pathname.match(/\/api\/events\/[^/]+\/register/)
  ) {
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/api/admin/:path*',
    '/api/messages/my-queries',
    '/api/resource-requests/my-requests',
    '/api/jobs/:id/save',
    '/api/events/:id/register',
  ],
};
