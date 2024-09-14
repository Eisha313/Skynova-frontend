



























// 'use client'
// import { useRouter, usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useUser } from '../context/userContext';
// import { roleBasedRoutes, publicRoutes } from '../../config/routes';

// const matchRoute = (path: string, allowedRoutes: string[]): boolean => {
//   const regexPatterns = allowedRoutes.map((route) =>
//     new RegExp(`^${route.replace(/\[.*?\]/g, '[^/]+')}$`)
//   );
//   console.log('Current path:', path);
//   console.log('Allowed route patterns:', regexPatterns.map((regex) => regex.toString()));
//   return regexPatterns.some((regex) => regex.test(path));
// };

// const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { data: session, status} = useSession();
//   const router = useRouter();
//   const pathname = usePathname();
//   const { role, setUser } = useUser();  
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthAndRole = async () => {
//       if (status === 'loading') {
//         return;
//       }
//       if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
//         if (session && session?.user  ){
//                 if (status === 'authenticated') {
//                   const userRole = session.user.role;
//                   if (userRole === 'Aviator') {
//                     router.push('/userRender/viewCommunityQuestions');
//                   } else if (userRole === 'Admin') {
//                     router.push('/dashboard');
//                   } else {
//                     router.push('/'); 
//                   }
//                 }
//               }
//               }
//                     console.log('Session status:', status);
//       console.log('Session data:', session);
  
//       console.log('User role:', role);
//       console.log('Current path:', pathname);
  
//       if (pathname === '/unauthorized') {
//         setLoading(false);
//         return;
//       }
//       // if (session?.user || localStorage.getItem('token')) {
      
//       //   const user = session ? session.user : JSON.parse(localStorage.getItem('user')!);
//       //   const userRole = session?.user.role || user.role
//       //   if (userRole === 'Aviator') {
//       //     router.push('/userRender/viewCommunityQuestions');
//       //   } else if (userRole === 'Admin') {
//       //     router.push('/dashboard');
//       //   }
//       // } else {
//       //   router.push('/login');
//       // }
      
//       const storedUser = localStorage.getItem('user');
//       const parsedUserRole = storedUser ? JSON.parse(storedUser).role : '';
//       const userRole = role || session?.user?.role || parsedUserRole;
//       if (session?.user || localStorage.getItem('token')) {
//         const user = session?.user ? session.user : JSON.parse(localStorage.getItem('user')!);
        
//         setUser({
//           _id: user._id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           role: user.role,
//           email: user.email,
//         });
  
//         if (userRole === 'Aviator') {
//           router.push('/userRender/viewCommunityQuestions');
//         } else if (userRole === 'Admin') {
//           router.push('/dashboard');
//         }
//       } else {
//         router.push('/login');
//       }
  
      
//       if (publicRoutes.includes(pathname)) {
//         setLoading(false);
//         return;
//       }
  
 
     
  
     
//       if (session && session?.user) {
//         const user = {
//           firstName: session.user.name?.split(' ')[0] || '',
//           lastName: session.user.name?.split(' ')[1] || '',
//           email: session.user.email || '',
//           role: session.user.role || 'Aviator', 
//           _id: session.user._id || '',
//         };
  
   
//         setUser(user);
//         console.log('User set with role:', user.role); 
//         localStorage.setItem('user', JSON.stringify(user));
//         setLoading(false);
//       } else {
//         console.log("No user found in session, redirecting to login.");
//         router.push('/login');
//         return;
//       }
  
      
   
//       console.log('Checking access for role:', userRole);
//       console.log('Current pathname:', pathname);
//       console.log('Allowed routes:', roleBasedRoutes[userRole as keyof typeof roleBasedRoutes]);
  
    
//       if (!matchRoute(pathname, roleBasedRoutes[userRole as keyof typeof roleBasedRoutes])) {
//         console.log('Access denied. Redirecting to /unauthorized.');
//         router.push('/unauthorized');
//         return;
//       }
  
//       setLoading(false);
//     };
  
//     checkAuthAndRole();
//   }, [session, status, pathname, role, router, setUser]);
  

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return <>{children}</>;
// };

// export default RouteGuard;
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '../context/userContext';
import { roleBasedRoutes, publicRoutes } from '../../config/routes';

const matchRoute = (path: string, allowedRoutes: string[]): boolean => {
  const regexPatterns = allowedRoutes.map((route) =>
    new RegExp(`^${route.replace(/\[.*?\]/g, '[^/]+')}$`)
  );
  return regexPatterns.some((regex) => regex.test(path));
};

const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession(); // OAuth login status
  const router = useRouter();
  const pathname = usePathname();
  const { role, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      // Step 1: Check if the session is still loading (for OAuth login)
      if (status === 'loading') return;

      // Step 2: Check if user is already authenticated through your manual login mechanism
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token'); // Use token or any other indicator of login

      if (!session?.user && !token) {
        // Not authenticated via OAuth or manual login
        if (pathname !== '/login' && pathname !== '/signup') {
          router.push('/login');
        }
        setLoading(false);
        return;
      }

      // Step 3: User is authenticated either via OAuth or manual login
      if (storedUser || session?.user) {
        const user = storedUser ? JSON.parse(storedUser) : session?.user;
        const userRole = role || user.role;

        // Set user in context if not already set
        setUser({
          _id: user._id || '',
          firstName: user.firstName || user.name?.split(' ')[0] || '',
          lastName: user.lastName || user.name?.split(' ')[1] || '',
          role: userRole || 'Aviator',
          email: user.email || session?.user?.email || '',
          
          token: token || session?.accessToken || '',
          profileImage: user.profileImage || session?.user?.image || null, 
        
        });

        // Save user in localStorage (manual login persistence)
        if (!storedUser) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Handle redirection after login
        if (pathname === '/login' || pathname === '/signup') {
          if (userRole === 'Aviator') {
            router.push('/userRender/viewCommunityQuestions');
          } else if (userRole === 'Admin') {
            router.push('/dashboard');
          } else {
            router.push('/');
          }
          return;
        }

        // Step 4: Check access to role-based routes
        if (!publicRoutes.includes(pathname) && !matchRoute(pathname, roleBasedRoutes[userRole as keyof typeof roleBasedRoutes])) {
          router.push('/unauthorized');
          return;
        }
      }

      setLoading(false);
    };

    checkAuthAndRole();
  }, [status, session, pathname, role, router, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default RouteGuard;
