import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text } from 'react-native';
import { Spacing, TypographyScale, FontFamily } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'horizontal' | 'small' | 'text';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'horizontal',
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const buttonStyle = variant === 'horizontal' ? styles.horizontalButton : variant === 'small' ? styles.smallButton : styles.textButton;
  const textStyle = variant === 'horizontal' ? styles.horizontalText : variant === 'small' ? styles.smallText : styles.textText;

  return (
    <TouchableOpacity
      style={[styles.baseButton, variant !== 'text' && { backgroundColor: colors.frameBackground }, buttonStyle, style]}
      {...props}
    >
      <Text style={[styles.baseText, { color: variant === 'text' ? '#d9d9d9' : colors.white }, textStyle]}>{String(children).toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: Spacing.borderRadius.button,
    paddingVertical: Spacing.buttonPadding.vertical,
    paddingHorizontal: Spacing.buttonPadding.horizontal,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  horizontalButton: {
    width: '100%',
  },
  smallButton: {
    width: 'auto',
    alignSelf: 'flex-end',
  },
  textButton: {
    width: 'auto',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  baseText: {
    fontWeight: '700',
    fontFamily: FontFamily.bold,
    lineHeight: TypographyScale.heading.lineHeight,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  horizontalText: {
    fontSize: TypographyScale.subheading.fontSize,
  },
  smallText: {
    fontSize: TypographyScale.paragraph.fontSize,
  },
  textText: {
    fontSize: TypographyScale.paragraph.fontSize,
  },
});

