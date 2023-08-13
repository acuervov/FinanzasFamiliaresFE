import type { Metadata } from 'next';

import { LayoutProvider } from '../layout/context/layoutcontext';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';

export const metadata: Metadata = {
    title: 'PrimeReact Diamond',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'PrimeReact Diamond-REACT',
        url: 'https://www.primefaces.org/diamond-react',
        description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
        images: ['https://www.primefaces.org/static/social/diamond-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-link" href={`/theme/theme-light/blue/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <LayoutProvider>{children}</LayoutProvider>
            </body>
        </html>
    );
}
