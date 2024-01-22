// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  // Récupérer le thème actuel depuis le stockage local au chargement initial
  const initialTheme = localStorage.getItem('theme') || 'dark';
  const [theme, setTheme] = useState(initialTheme);

  // Mettre à jour le stockage local chaque fois que le thème change
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
