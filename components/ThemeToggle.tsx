'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Moon, Sun } from 'phosphor-react';

export default function ThemeToggleProvider() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        setTheme(storedTheme || systemTheme);
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-zinc-700 text-black dark:text-white shadow-md hover:scale-105 transition"
            aria-label="Alternar tema"
        >
            {theme === 'dark' ? <Sun size={15} weight="bold" /> : <Moon size={15} weight="bold" />}
        </button>
    );
}
