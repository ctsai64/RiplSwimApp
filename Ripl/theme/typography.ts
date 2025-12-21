import { FontFamily } from './fonts';
import { Spacing } from '../constants/design';

export const TypographyScale = {
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 48,
    letterSpacing: -2,
    marginBottom: Spacing.screenPadding / 4,
  },
  heading: {
    fontFamily: FontFamily.semiBold,
    fontSize: 32,
    letterSpacing: -1,
    //marginBottom: Spacing.screenPadding / 2,
  },
  subheading: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  paragraph: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
  time: {
    fontFamily: FontFamily.medium,
    fontSize: 20,
  },
  tag: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
  },
} as const;
