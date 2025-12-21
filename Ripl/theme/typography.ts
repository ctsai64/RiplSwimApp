/**
 * Typography Scale Configuration
 * Defines text styles with consistent font families and sizes
 */

import { FontFamily } from './fonts';

export const TypographyScale = {
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: 48,
    letterSpacing: -2,
  },
  time: {
    fontFamily: FontFamily.medium,
    fontSize: 20,
  },
  paragraph: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
  tag: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
  },
  user: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
} as const;
