import type { ReactNode } from 'react';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="bg-red-600 p-4">Layout Privado</header>
      <main className="p-4">{children}</main>
    </div>
  );
}
