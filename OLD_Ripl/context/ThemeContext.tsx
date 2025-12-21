import React, { createContext, useContext, useMemo, useState } from 'react';
import { DarkColors, LightColors, ThemeColors } from '../constants/design';

type ThemeContextValue = {
  colors: ThemeColors;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = isDarkMode ? DarkColors : LightColors;

  const value = useMemo(
    () => ({
      colors,
      isDarkMode,
      toggleDarkMode: () => setIsDarkMode((prev) => !prev),
    }),
    [colors, isDarkMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

