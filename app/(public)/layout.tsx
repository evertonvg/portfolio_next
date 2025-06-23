import type { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-blue-50 text-black">
      <header className="bg-blue-600 text-white p-4">Layout Público</header>
      <main className="p-4">{children}</main>
    </div>
  );
}
