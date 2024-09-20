
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { role, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      if (status === 'loading') return;

      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!session?.user && !token) {
        if (pathname !== '/login' && pathname !== '/signup') {
          router.push('/');
        }
        setLoading(false);
        return;
      }

      if (storedUser || session?.user) {
        const user = storedUser ? JSON.parse(storedUser) : session?.user;
        const userRole = role || user.role || 'Aviator'; // Default role if none found

        setUser({
          _id: user._id || '',
          firstName: user.firstName || user.name?.split(' ')[0] || '',
          lastName: user.lastName || user.name?.split(' ')[1] || '',
          role: userRole,
          email: user.email || session?.user?.email || '',
          token: token || session?.accessToken || '',
          profileImage: user.profileImage || session?.user?.image || null,
        });

        if (!storedUser) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        if (pathname === '/login' || pathname === '/signup') {
          if (userRole === 'Aviator') {
            router.push('/');
          } else if (userRole === 'Admin') {
            router.push('/dashboard');
          } else {
            router.push('/');
          }
          return;
        }

        // if (!publicRoutes.includes(pathname) && !matchRoute(pathname, roleBasedRoutes[userRole as keyof typeof roleBasedRoutes])) {
        //   router.push('/unauthorized');
        //   return;
        // }
        
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
