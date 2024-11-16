import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
// import withAuth from './withAuth';

export function middleware(request: NextRequestWithAuth, event) {
    return withAuth(request, event);
}

export const config = {
    matcher: ['/dashboard']
};
