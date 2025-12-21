/**
 * Font Family Configuration
 * Centralized font family definitions for theming
 */

export const FontFamily = {
  regular: 'DMSans-Regular',
  medium: 'DMSans-Medium',
  semiBold: 'DMSans-SemiBold',
  bold: 'BarlowCondensed-SemiBold',
} as const;

export type FontFamilyKey = keyof typeof FontFamily;

/**
 * Font file mappings for expo-font
 * Use these when loading fonts with expo-font
 */
export const FontAssets = {
  'DMSans-Regular': require('../assets/fonts/DMSans_18pt-Regular.ttf'),
  'DMSans-Medium': require('../assets/fonts/DMSans_18pt-Medium.ttf'),
  'DMSans-SemiBold': require('../assets/fonts/DMSans_18pt-SemiBold.ttf'),
  'BarlowCondensed-SemiBold': require('../assets/fonts/BarlowCondensed-SemiBold.ttf'),
} as const;
