'use client';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function PrivateLayoutClient({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    };
    return (
        <div className="min-h-screen bg-zinc-900 text-white">
            <header className="bg-red-600 p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Layout Privado</h1>
                <p className="text-lg">
                    Bem-vindo, <strong>{session?.user?.name || session?.user?.email}</strong>!
                    {session?.user.image && <Image
                        src={`http://localhost:3333/${session?.user.image}`}
                        alt={session?.user.name || session?.user.email || 'Usuário'}
                        width={40}
                        height={40}
                        className="rounded-full ml-2 inline-block"
                    />}
                    
                </p>
                <button onClick={handleLogout} className="text-white hover:underline">
                    Sair
                </button>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}