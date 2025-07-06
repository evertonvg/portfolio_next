// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }

  interface User extends DefaultUser {
    token?: string; // permite usar user.token sem erro
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    accessToken?: string;
    name?: string;
    email?: string;
    image?: string;
  }
}
