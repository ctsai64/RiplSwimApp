import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text } from 'react-native';
import { Colors, Spacing, Typography, FontFamily } from '../constants/design';

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
  const buttonStyle = variant === 'horizontal' ? styles.horizontalButton : styles.smallButton;
  const textStyle = variant === 'horizontal' ? styles.horizontalText : styles.smallText;

  return (
    <TouchableOpacity style={[styles.baseButton, buttonStyle, style]} {...props}>
      <Text style={[styles.baseText, textStyle]}>{String(children).toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    backgroundColor: Colors.frameBackground,
    borderRadius: Spacing.borderRadius.button,
    paddingVertical: Spacing.buttonPadding.vertical,
    paddingHorizontal: Spacing.buttonPadding.horizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalButton: {
    width: '100%',
  },
  smallButton: {
    width: 'auto',
    alignSelf: 'flex-start',
  },
  baseText: {
    color: Colors.white,
    fontWeight: '700',
    fontFamily: FontFamily.bold,
    lineHeight: Typography.heading.lineHeight,
  },
  horizontalText: {
    fontSize: Typography.heading.fontSize,
  },
  smallText: {
    fontSize: Typography.mediumText.fontSize,
  },
});

