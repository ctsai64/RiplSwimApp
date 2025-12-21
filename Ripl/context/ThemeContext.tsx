import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { 
  LightColors, 
  DarkColors, 
  Spacing, 
  ThemeColors 
} from '../constants/design';
import { TypographyScale } from '../theme/typography';

export type Theme = {
  colors: ThemeColors;
  spacing: typeof Spacing;
  typography: typeof TypographyScale;
  isDark: boolean;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme: Theme = {
    colors: isDark ? DarkColors : LightColors,
    spacing: Spacing,
    typography: TypographyScale,
    isDark,
  };

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