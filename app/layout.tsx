'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { awsConfig } from '../amplify/config';
import moment from 'moment';
import 'moment/locale/es-mx';

Amplify.configure(awsConfig as ResourcesConfig, { ssr: true });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    moment.locale('es-mx');
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>Finanzas Familiares</title>
                <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
                <link id="theme-link" href={`/theme/theme-light/blue/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
