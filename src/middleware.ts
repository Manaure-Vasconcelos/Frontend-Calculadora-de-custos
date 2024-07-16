import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { importSPKI, jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const access_token = request.cookies.get('access_token');
  const spki = process.env.JWT_SECRET;
  const alg = 'RS256';

  if (!spki) throw new Error('Secret key not found');
  
  if (access_token === undefined) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  const publicKey = await importSPKI(spki, alg);
  try {
    await jwtVerify(access_token.value, publicKey);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/calculator', '/acount']
};
