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
  secondaryHighlight: string;
};

const highlight = '#6AB6FC';
const secondaryHighlight = '#E3F1FF';
const lightText = '#d9d9d9';
const lightBackground = '#FFFFFF';
const lightBackgroundSecondary = '#F8F9FA';
const lightBorder = '#E5E7EB';
const lightFrameBackground = '#d9d9d9';

export const LightColors: ThemeColors = {
  background: lightBackground,
  backgroundSecondary: lightBackgroundSecondary,
  text: lightText,
  white: '#FFFFFF',
  border: lightBorder,
  frameBackground: lightFrameBackground,
  frame2Background: lightFrameBackground,
  menuBackground: lightBackground,
  menuOverlay: 'rgba(0, 0, 0, 0.5)',
  highlight,
  secondaryHighlight,
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
  secondaryHighlight,
};

export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  bold: 'Inter_700Bold',
  thin: 'Inter_100Thin',
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

export const TypographyScale = {
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 44.85,
    fontWeight: '700' as const,
    lineHeight: 45,
    letterSpacing: 0,
    marginBottom: Spacing.screenPadding,
  },
  heading: {
    fontFamily: FontFamily.bold,
    fontSize: 26.33,
    fontWeight: '700' as const,
    lineHeight: 26.33,
    letterSpacing: 0,
    marginBottom: 10,
  },
  subheading: {
    fontFamily: FontFamily.bold,
    fontSize: 16.76,
    fontWeight: '700' as const,
    lineHeight: 20.39,
    letterSpacing: 0,
    marginBottom: 10,
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
    marginBottom: 5,
  },
};
