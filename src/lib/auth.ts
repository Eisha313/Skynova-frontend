

// // import { NextAuthOptions } from 'next-auth';
// // import GithubProvider from 'next-auth/providers/github';
// // import GoogleProvider from 'next-auth/providers/google';
// // import NextAuth from 'next-auth';



// // export const authOptions: NextAuthOptions = {
// //   providers: [
// //     GithubProvider({
// //       clientId: 'Ov23liczKyu8HkM7lQyP', 
// //       clientSecret: '2cb41a239a68a7cf1ad47fa7276166c576f57f81',
// //     }),
// //     GoogleProvider({
// //       clientId: '282880180109-gqo74mqptihfpn6giq0nnin7mevbetrt.apps.googleusercontent.com',
// //       clientSecret: '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',
// //     })
// //   ],
// //   callbacks: {
// //     async session({ session, token, user }) {
     
// //       if (session.user) {
// //         session.user.role = user.role;
// //         session.user._id = user._id;
// //       }
// //       return session;
// //     },
// //   },
// // };


// // export default NextAuth(authOptions);
// import { NextAuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import NextAuth from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: 'Ov23liczKyu8HkM7lQyP',
//       clientSecret: '2cb41a239a68a7cf1ad47fa7276166c576f57f81',
//       authorization: {
//         params: {
//           redirect_uri: `http://localhost:3000/api/auth/callback/github`,
//         },
//     }}),
//     GoogleProvider({
//       clientId: '282880180109-gqo74mqptihfpn6giq0nnin7mevbetrt.apps.googleusercontent.com',
//       clientSecret: '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',
//       authorization: {
//         params: {
//           redirect_uri: `http://localhost:3000/api/auth/callback/google`,
//         },
//     }
//     }),

//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       console.log('JWT callback - user:', user);
    
//       if (user) {
//         token.role = user.role || 'Aviator'; 
//         token._id = user._id || ''; 
//       }
//       return token;
//     },
//     async session({ session, token }) {
      
     
//       if (session.user) {
//         session.user.role = token.role;
//         session.user._id = token._id;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);




// import { NextAuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import NextAuth from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: 'Ov23liczKyu8HkM7lQyP',
//       clientSecret: '2cb41a239a68a7cf1ad47fa7276166c576f57f81',
//       authorization: {
//         params: {
//           redirect_uri: `http://localhost:3000/api/auth/callback/github`,
//         },
//       },
//     }),
//     GoogleProvider({
//       clientId: '282880180109-gqo74mqptihfpn6giq0nnin7mevbetrt.apps.googleusercontent.com',
//       clientSecret: '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',
//       authorization: {
//         params: {
//           redirect_uri: `http://localhost:3000/api/auth/callback/google`,
//         },
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       console.log('JWT callback - user:', user);

//       if (user) {
//         token.role = user.role || 'Aviator'; 
//         token._id = user._id || ''; 
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       console.log('Session callback - token:', token);

//       if (session.user) {
//         session.user.role = token.role;
//         session.user._id = token._id;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: 'Ov23liczKyu8HkM7lQyP',
      clientSecret: '2cb41a239a68a7cf1ad47fa7276166c576f57f81',
    }),
    GoogleProvider({
      clientId: '282880180109-gqo74mqptihfpn6giq0nnin7mevbetrt.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'Aviator';
        token._id = user.id || '';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user._id = token._id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
