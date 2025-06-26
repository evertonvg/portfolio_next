// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
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
                // Aqui você valida as credenciais (exemplo simples):
                const { username, password } = credentials ?? {};

                // Substitua essa validação pelo seu banco/dados reais
                if (username === 'admin' && password === '@S3nh4n40s1mpl3s') {
                    return { id: '1', name: 'Admin User', email: 'admin@example.com' };
                }
                // Se inválido, retorna null
                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt' as const,
    },
    pages: {
        signIn: '/login', // Pode configurar para a rota da sua página de login
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
