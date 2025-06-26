import '../styles/globals.css';
import type { ReactNode } from 'react';
import Providers from '../components/Providers';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="pt-BR">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
