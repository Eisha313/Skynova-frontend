'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AUTO_LOGOUT_TIME = 5 * 60 * 1000; 

const useAutoLogout = () => {
  const router = useRouter();
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsInactive(true);
        handleLogout();
      }, AUTO_LOGOUT_TIME);
    };

    const handleLogout = () => {
      
      alert('Session expired! Please log in again.');
      
      
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      if (sessionStorage.getItem('token')) {
        sessionStorage.removeItem('token');
      }

      
      router.push('/login');
    };

   
    const resetActivity = () => {
      setIsInactive(false);
      resetTimer();
    };

    window.addEventListener('mousemove', resetActivity);
    window.addEventListener('keypress', resetActivity);
    window.addEventListener('click', resetActivity);

    window.addEventListener('scroll', resetActivity);
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetActivity);
      window.removeEventListener('keypress', resetActivity);
      window.removeEventListener('click', resetActivity);
    };
  }, [router]);

  return isInactive;
};

export default useAutoLogout;
