import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'artstone_admin_logged_in';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    setIsLoggedIn(saved === 'true');
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.setItem(AUTH_KEY, 'false');
    setIsLoggedIn(false);
  }, []);

  return { isLoggedIn, login, logout };
}
