import { useMemo, useState } from 'react';
import {
  clearCurrentAuthUser,
  getCurrentAuthUser,
  loginUser,
  registerUser,
  setCurrentAuthUser,
} from './authService';
import { AuthContext } from './authContextObject';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getCurrentAuthUser());

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      login: async (credentials) => {
        const user = loginUser(credentials);
        setCurrentAuthUser(user);
        setCurrentUser(user);
        return user;
      },
      register: async (payload) => {
        const user = registerUser(payload);
        setCurrentAuthUser(user);
        setCurrentUser(user);
        return user;
      },
      logout: () => {
        clearCurrentAuthUser();
        setCurrentUser(null);
      },
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
