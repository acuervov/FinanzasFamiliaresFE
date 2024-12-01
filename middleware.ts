import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from './utils/amplifyServerUtils';

const authPaths = ['/auth/login', '/auth/signup'];

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { request, response },
        operation: async (contextSpec) => {
            try {
                const session = await fetchAuthSession(contextSpec);
                return session.tokens?.accessToken !== undefined && session.tokens?.idToken !== undefined;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    });

    if (authenticated) {
        return response;
    }

    return NextResponse.redirect(new URL('/auth/login', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard/:path*']
};
