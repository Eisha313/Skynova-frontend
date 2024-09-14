// // types/next-auth.d.ts
// import NextAuth from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       _id: string;
//       role: string;
//       email:string
//     } & DefaultSession["user"];
//   }
//   interface User {
//     role?: string;
//     _id?: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     password?: string;
//     confirmPassword?: string;
   
//     profileImage?: string;
    
//   }
// }
// types/next-auth.d.ts
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
