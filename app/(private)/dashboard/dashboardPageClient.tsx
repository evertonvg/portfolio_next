'use client';

import { useSession, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardPageClient() {
    const { data: session } = useSession();

    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md text-center shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-lg">
                        Bem-vindo, <strong>{session?.user?.name || session?.user?.email}</strong>!
                    </p>
                    <Button variant="destructive" onClick={handleLogout}>
                        Sair
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
