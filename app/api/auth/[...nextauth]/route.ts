// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'Usuário', type: 'text' },
                password: { label: 'Senha', type: 'password' },
            },
            async authorize(credentials) {
                // Substitua com sua lógica de autenticação real
                if (credentials?.username === 'admin' && credentials?.password === 'admin123') {
                    return { id: '1', name: 'Admin', email: 'admin@example.com' };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login', // sua tela de login
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as typeof session.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
