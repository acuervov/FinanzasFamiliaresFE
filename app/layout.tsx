'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import moment from 'moment';
import 'moment/locale/es-mx';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout(properties) {
    moment.locale('es-mx');

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-link" href={`/theme/theme-light/blue/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <SessionProvider>
                        <LayoutProvider>{properties.children}</LayoutProvider>
                    </SessionProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
