
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      email: string;
      name?: string;
      role: string;
      _id: string;
      profileImage?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    profileImage?: string;
  }

  interface JWT {
    role?: string;
    _id?: string;
  }
}

export interface Resource {
  id?: string;
  name: string;
  description: string;
  type: 'documentary' | 'movie' | 'quote';
  content?: string;
}

export interface Hero {
  id?: string;
  name: string;
  image?: File | string;
  description: string;
  accomplishments: string[];
  medals: string[];
  movies: string[];
  documentaries: string[];
  quotes: string[];
}
