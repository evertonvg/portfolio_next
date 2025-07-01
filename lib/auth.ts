import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        emailOrName: { label: 'Email ou Nome', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const { emailOrName, password } = credentials ?? {};

        try {
          const response = await axios.post('http://localhost:3333/users/login', {
            emailOrName,
            password,
          });

          const { user, token } = response.data;

          if (user && token) {
            return {
              id: String(user.id),
              name: user.name,
              email: user.email,
              image: user.image,
              token, // passamos o token aqui para usar no JWT
            };
          }

          return null;
        } catch (error: any) {
          console.error('Erro na autenticação via API:', error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = user.token; // salvar token da API
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          image: token.image as string,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};
