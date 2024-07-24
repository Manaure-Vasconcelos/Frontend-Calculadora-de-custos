import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  /* const logged = request.cookies.get('logged'); */
  const access_token = request.cookies.get('access_token');

  if (access_token === undefined) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/calculator', '/all-recipes', '/fixed-costs', '/acount']
};
