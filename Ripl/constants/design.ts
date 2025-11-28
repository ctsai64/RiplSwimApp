// Design System Constants

export const Colors = {
  background: '#FFFFFF',
  backgroundSecondary: '#222222',
  text: '#D9D9D9',
  white: '#FFFFFF',
  border: '#D9D9D9',
  frameBackground: '#D9D9D9',
};

export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  bold: 'Inter_700Bold',
};

export const Typography = {
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 44.85,
    fontWeight: '700' as const,
    lineHeight: 44.85,
    letterSpacing: 0,
    color: Colors.text,
  },
  heading: {
    fontFamily: FontFamily.bold,
    fontSize: 26.33,
    fontWeight: '700' as const,
    lineHeight: 26.33,
    letterSpacing: 0,
    color: Colors.text,
  },
  subheading: {
    fontFamily: FontFamily.bold,
    fontSize: 20.39,
    fontWeight: '700' as const,
    lineHeight: 20.39,
    letterSpacing: 0,
    color: Colors.text,
  },
  mediumText: {
    fontFamily: FontFamily.bold,
    fontSize: 15.79,
    fontWeight: '700' as const,
    lineHeight: 15.79,
    letterSpacing: 0,
    color: Colors.text,
  },
  paragraph: {
    fontFamily: FontFamily.medium,
    fontSize: 13.05,
    fontWeight: '500' as const,
    lineHeight: 13.05,
    letterSpacing: 0,
    color: Colors.text,
  },
};

export const Spacing = {
  screenPadding: 30,
  buttonPadding: { vertical: 8, horizontal: 22 },
  borderRadius: {
    frame1: 23,
    frame2: 8,
    button: 8,
  },
};

export const Border = {
  frame1: {
    width: 1,
    color: Colors.border,
  },
};

