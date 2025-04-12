import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadtoken = () => {
      try {
        const token = localStorage.getItem('Token');
        if (token) {
          settoken(token);
          const user = localStorage.getItem('user_data');
          if (user) {
            setUserData(JSON.parse(user));
          } else {
          }
        }
      } catch (error) {
      }
    };

    loadtoken(); // Load token when the app starts
  }, []);

  const storeToken = (token, user) => {
    try {

      localStorage.setItem('Token', token);
      if (user) {
        localStorage.setItem('user_data', JSON.stringify(user));
      }
      settoken(token);
      setUserData(user);
    } catch (error) {
    }
  };

  const cleartoken = () => {
    try {
      localStorage.removeItem('Token');
      localStorage.removeItem('user_data');
      settoken(null);
      setUserData(null);
    } catch (error) {
    }
  };

  return (
    <AppContext.Provider value={{ token, userData, storeToken, cleartoken }}>
      {children}
    </AppContext.Provider>
  );
};
