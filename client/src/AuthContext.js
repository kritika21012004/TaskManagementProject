
import React, { useState } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    
  const [user, setUser] = useState(null); // or load the state from local storage / server 

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};