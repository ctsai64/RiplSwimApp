import { lightColors, darkColors } from './colors';
import { Typography } from './typography';

export const createTheme = (isDark: boolean) => ({
  colors: isDark ? darkColors : lightColors,
  typography: Typography,
  spacing: { md: 12, lg: 18, xl: 24 },
});

export type AppTheme = ReturnType<typeof createTheme>;