import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text } from 'react-native';
import { Spacing, TypographyScale, FontFamily } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'horizontal' | 'small';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'horizontal',
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const buttonStyle = variant === 'horizontal' ? styles.horizontalButton : styles.smallButton;
  const textStyle = variant === 'horizontal' ? styles.horizontalText : styles.smallText;

  return (
    <TouchableOpacity
      style={[styles.baseButton, { backgroundColor: colors.frameBackground }, buttonStyle, style]}
      {...props}
    >
      <Text style={[styles.baseText, { color: colors.white }, textStyle]}>{String(children).toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: Spacing.borderRadius.button,
    paddingVertical: Spacing.buttonPadding.vertical * 2,
    paddingHorizontal: Spacing.buttonPadding.horizontal,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  horizontalButton: {
    width: '100%',
  },
  smallButton: {
    width: 'auto',
    alignSelf: 'flex-start',
  },
  baseText: {
    fontWeight: '700',
    fontFamily: FontFamily.bold,
    lineHeight: TypographyScale.heading.lineHeight,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  horizontalText: {
    fontSize: TypographyScale.mediumText.fontSize,
  },
  smallText: {
    fontSize: TypographyScale.mediumText.fontSize,
  },
});

