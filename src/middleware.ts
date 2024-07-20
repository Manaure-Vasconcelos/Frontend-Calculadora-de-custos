import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const logged = request.cookies.get('logged');

  if (logged === undefined) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/calculator', '/all-recipes', '/fixed-costs','/acount']
};
