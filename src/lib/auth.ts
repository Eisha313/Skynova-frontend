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
// import { NextAuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import NextAuth from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
//     }),
//     GoogleProvider({
//       clientId: GITHUB_OAUTH_CLIENT_ID,
//       clientSecret: GITHUB_OAUTH_SECRET_ID,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role || 'Aviator';
//         token._id = user.id || '';
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role as string;
//         session.user._id = token._id as string;
//       }
//       return session;
//     },
//   },
//   session: {
//     strategy: 'jwt',
//   },
// };

// export default NextAuth(authOptions);
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB__OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GITHUB__OAUTH_SECRET_ID as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const namePieces = user.name?.split(" ");
          const firstName = namePieces?.[0] || "";
          const restOfName = namePieces?.slice(1).join(" ") || "";
          const dataToSend = {
            firstName: firstName,
            lastName: restOfName,
            email: user.email || "",
            password: "hello123@",
            role: "Aviator",
          };

          // Signup
          const signupResponse = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/users/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          });

          // Login
          const loginResponse = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              password: "hello123@",
              role: "Aviator",
            }),
          });

          if (loginResponse.ok) {
            const body = await loginResponse.json();

            // Add token and additional user info to the token
            token.accessToken = body.token;
            token.role = body.role || "Aviator";
            token._id = user.id || "";
            token.profileImage = user.image || null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
        }
      }

      // If user is present during first login, add additional info
      if (user) {
        token.role = user.role || "Aviator";
        token._id = user.id || "";
        token.profileImage = user.image || null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Attach token and additional info to session
        session.user.role = token.role as string;
        session.user._id = token._id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
