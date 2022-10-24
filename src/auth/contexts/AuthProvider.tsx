import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../core/hooks/useLocalStorage";


interface AuthContextInterface {
  hasRole: (roles?: string[]) => {};
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "");


  const hasRole = (roles?: string[]) => {
    if (!roles || roles.length === 0) {
      return true;
    }
  };

  const handleLogin = async (email: string, password: string) => {
  };

  const handleLogout = async () => {
  };

  return (
    <div></div>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
