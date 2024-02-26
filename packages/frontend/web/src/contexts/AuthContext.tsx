import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthProviderProps = {
  readonly children: React.ReactNode;
};

type AuthProviderState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const authProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const res = await fetch(`/api/auth/check`);
      const data = (await res.json()) as {
        ok: boolean;
        isLoggedIn: boolean;
      };
      setIsLoggedIn(data.isLoggedIn);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const value = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);

  return (
    <authProviderContext.Provider {...props} value={value}>
      {children}
    </authProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(authProviderContext);

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
};
