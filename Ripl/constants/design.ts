export type ThemeColors = {
  background: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  text: string;
  textSecondary: string;
};

const primary = '#328393';
const secondary = '#C5F1FA';
const accent = '#00C0E8';

export const LightColors: ThemeColors = {
  background: '#FFFFFF',
  border: '#F2F2F2',
  primary,
  secondary,
  accent,
  muted: '#D9D9D9',
  text: '#000000',
  textSecondary: '#898989',
};

export const DarkColors: ThemeColors = {
  background: '#121212',
  border: '#2C2C2C',
  primary: '#47A9BD',
  secondary: '#1A3A40',
  accent,
  muted: '#444444',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
};

export const Spacing = {
  screenPadding: 24,
  cardPadding: 24,
  buttonPadding: { vertical: 4, horizontal: 12 },
  borderRadius: {
    card: 32,
    practiceCard: 24,
    tag: 16,
  },
};