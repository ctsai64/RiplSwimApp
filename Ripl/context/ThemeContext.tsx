import React, { createContext, useContext, ReactNode, useMemo, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { 
  LightColors, 
  DarkColors, 
  Spacing, 
  ThemeColors 
} from '../constants/design';
import { TypographyScale } from '../theme/typography';

type ThemeMode = 'light' | 'dark';

export type Theme = {
  colors: ThemeColors;
  spacing: typeof Spacing;
  typography: typeof TypographyScale;
  isDark: boolean;
  mode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const initialMode: ThemeMode = colorScheme === 'dark' ? 'dark' : 'light';
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const theme: Theme = useMemo(() => {
    const isDark = mode === 'dark';

    return {
      colors: isDark ? DarkColors : LightColors,
      spacing: Spacing,
      typography: TypographyScale,
      isDark,
      mode,
      toggleTheme,
    };
  }, [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};