import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Finanzas Familiares',
    description: 'Aplicación para la gestion de las finanzas de la familia',
    robots: { index: false, follow: false },

    openGraph: {
        type: 'website',
        title: 'Finanzas Familiares',
        url: 'https://www.primefaces.org/diamond-react',
        description: 'Aplicación para la gestion de las finanzas de la familia',
        images: ['https://www.primefaces.org/static/social/diamond-react.png'],
        ttl: 604800
    },

    icons: {
        icon: '/favicon.ico'
    }
};

export default function MainLayout({ children }: MainLayoutProps) {
    return <Layout>{children}</Layout>;
}

export const viewport = {
    initialScale: 1,
    width: 'device-width'
};
