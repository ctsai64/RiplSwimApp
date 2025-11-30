export type ThemeColors = {
  background: string;
  backgroundSecondary: string;
  text: string;
  white: string;
  border: string;
  frameBackground: string;
  frame2Background: string;
  menuBackground: string;
  menuOverlay: string;
  highlight: string;
};

const highlight = '#6AB6FC';

export const LightColors: ThemeColors = {
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  text: '#BABABA',
  white: '#FFFFFF',
  border: '#E5E7EB',
  frameBackground: highlight,
  frame2Background: '#F3F4F6',
  menuBackground: '#FFFFFF',
  menuOverlay: 'rgba(0, 0, 0, 0.5)',
  highlight,
};

export const DarkColors: ThemeColors = {
  background: '#05070B',
  backgroundSecondary: '#0F141F',
  text: '#F0F4FF',
  white: '#FBFCFF',
  border: '#1F2533',
  frameBackground: highlight,
  frame2Background: '#151B27',
  menuBackground: '#0A0F19',
  menuOverlay: 'rgba(0, 0, 0, 0.85)',
  highlight,
};

export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  bold: 'Inter_700Bold',
};

export const TypographyScale = {
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 44.85,
    fontWeight: '700' as const,
    lineHeight: 44.85,
    letterSpacing: 0,
  },
  heading: {
    fontFamily: FontFamily.bold,
    fontSize: 26.33,
    fontWeight: '700' as const,
    lineHeight: 26.33,
    letterSpacing: 0,
  },
  subheading: {
    fontFamily: FontFamily.bold,
    fontSize: 20.39,
    fontWeight: '700' as const,
    lineHeight: 20.39,
    letterSpacing: 0,
  },
  mediumText: {
    fontFamily: FontFamily.bold,
    fontSize: 15.79,
    fontWeight: '700' as const,
    lineHeight: 15.79,
    letterSpacing: 0,
  },
  paragraph: {
    fontFamily: FontFamily.medium,
    fontSize: 13.05,
    fontWeight: '500' as const,
    lineHeight: 13.05,
    letterSpacing: 0,
  },
};

export const Spacing = {
  screenPadding: 30,
  buttonPadding: { vertical: 8, horizontal: 22 },
  borderRadius: {
    frame1: 23,
    frame2: 0,
    button: 8,
  },
};

export const Border = {
  frame1: {
    width: 1,
  },
};

