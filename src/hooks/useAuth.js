import { useState, useCallback } from 'react';

const PROTECTED_PASSWORD = import.meta.env.VITE_PROTECTED_PASSWORD;

const SESSION_KEY = 'sdgs_auth_unlocked';

export const useAuth = () => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const tryUnlock = useCallback((password) => {
    if (password === PROTECTED_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsUnlocked(true);
      setError('');
      return true;
    } else {
      setError('Password salah. Silakan coba lagi.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      return false;
    }
  }, []);

  const lock = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsUnlocked(false);
  }, []);

  return { isUnlocked, tryUnlock, lock, error, isShaking };
};