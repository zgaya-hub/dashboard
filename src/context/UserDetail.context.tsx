import React, { createContext, useContext, ReactNode, useState } from "react";
import { defaultUserDetails } from "./constant";

interface UserDetailContextProps {
  userName: string;
  fullName: string;
  imageUrl: string;
}

const UserDetailContext = createContext<UserDetailContextProps | undefined>(
  undefined
);

interface UserDetailProviderProps {
  children: ReactNode;
}

export function UserDetailProvider({ children }: UserDetailProviderProps) {
  const [userDetails, setUserDetails] =
    useState<UserDetailContextProps>(defaultUserDetails);

  const toggleUserDetail = (details: UserDetailContextProps) => {
    setUserDetails(details);
  };

  return (
    <UserDetailContext.Provider value={{ ...userDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default function useUserDetail() {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetail must be used within a UserDetailProvider");
  }
  return context;
}
