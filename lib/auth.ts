// lib/auth.ts
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Usuário', type: 'text' },
                password: { label: 'Senha', type: 'password' },
            },
            async authorize(credentials) {
                const { username, password } = credentials ?? {};

                if (username === 'admin' && password === '@S3nh4n40s1mpl3s') {
                    return { id: '1', name: 'Admin User', email: 'admin@example.com' };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt' as const,
    },
    pages: {
        signIn: '/login',
    },
};
