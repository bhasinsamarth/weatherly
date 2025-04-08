import React from 'react';
import { createContext, useState, ReactNode, useContext } from 'react';

type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
};

const UserContext = createContext<UserContextType>({
  username: 'Noor',
  setUsername: () => {},
});

export const usename = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('Noor');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
