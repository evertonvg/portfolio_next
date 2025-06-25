import type { ReactNode } from 'react';
import ThemeToggleProvider from '@/components/ThemeToggle';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-blue-50 text-black dark:bg-zinc-900 dark:text-white">
            <header className="bg-blue-600 dark:bg-zinc-900 text-white p-4 fixed top-0 w-full z-10">
                Welcome <ThemeToggleProvider></ThemeToggleProvider>
            </header>
            <main>{children}</main>
        </div>
    );
}
