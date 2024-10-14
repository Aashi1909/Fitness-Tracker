"use client";
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: () => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
