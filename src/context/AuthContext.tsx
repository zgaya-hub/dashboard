import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setAuthenticationHeaders } from "@/api/gqlRequest";
import { handleOnGetItemFromStorage, handleOnRemoveItemFromStorage, handleOnSetItemInStorage } from "@/utils/localStorage";

interface AuthContextProps {
  handleOnAuthenticate: (authToken: string) => void;
  isAuthenticated: boolean;
  authToken: string | undefined;
  setAuthToken: (authToken: string) => void;
  handleOnLogout: () => void;
}

const defaultContextValue: AuthContextProps = {
  handleOnAuthenticate: () => {},
  isAuthenticated: false,
  authToken: undefined,
  handleOnLogout: () => {},
  setAuthToken: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultContextValue);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [state, setState] = useState<AuthContextProps>(defaultContextValue);

  useEffect(() => {
    async function getAuthenticationToken() {
      const authToken = await handleOnGetItemFromStorage("authToken");
      if (authToken) {
        setState({ ...state, authToken, isAuthenticated: true });
      }
    }

    getAuthenticationToken();
  }, []);

  useEffect(() => {
    setAuthenticationHeaders({
      Authorization: state.authToken ? `Bearer ${state.authToken}` : "",
    });
  }, [state.authToken]);

  const handleOnLogout = () => {
    setState(defaultContextValue);
    setAuthenticationHeaders({});
    handleOnRemoveItemFromStorage("authToken");
  };

  const handleOnAuthenticate = (authToken: string = "") => {
    setState({ ...defaultContextValue, authToken, isAuthenticated: true });
    handleOnSetItemInStorage("authToken", authToken!);
  };

  const setAuthToken = (authToken: string = "") => {
    setState((prev) => ({ ...prev, authToken, isAuthenticated: true }));
    handleOnSetItemInStorage("authToken", authToken);
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      handleOnAuthenticate: handleOnAuthenticate,
      handleOnLogout,
      setAuthToken,
    }),
    [state]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
