import '../styles/globals.css';
import type { ReactNode } from 'react';
import ReactQueryProvider from '../components/ReactQueryProvider';
import { SessionProvider } from 'next-auth/react';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="pt-BR">
            <body>
                <SessionProvider>
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
