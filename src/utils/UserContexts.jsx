import React, { createContext, useState } from 'react';
import { setProfile } from './Action';

export const UserContexts = createContext();

const UserProvider = ({ children }) => {

  const [profile, setProfile] = useState({ profile: 0 })

  return (
    <UserContexts.Provider value={{ profile, setProfile }}>
      {children}
    </UserContexts.Provider>
  );
}

export default UserProvider;