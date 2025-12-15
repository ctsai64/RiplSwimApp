import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import { Spacing, TypographyScale, FontFamily } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'horizontal' | 'small' | 'text';
  children: React.ReactNode;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'horizontal',
  children,
  style,
  textStyle,
  ...props
}) => {
  const { colors } = useTheme();
  const buttonStyle =
    variant === 'horizontal'
      ? styles.horizontalButton
      : variant === 'small'
      ? styles.smallButton
      : styles.textButton;
  const variantTextStyle =
    variant === 'horizontal'
      ? styles.horizontalText
      : variant === 'small'
      ? styles.smallText
      : styles.textText;

  return (
    <TouchableOpacity
      style={[styles.baseButton, variant !== 'text' && { backgroundColor: colors.frameBackground }, buttonStyle, style]}
      {...props}
    >
      <Text
        style={[
          styles.baseText,
          { color: variant === 'text' ? colors.text : colors.white },
          variantTextStyle,
          textStyle,
        ]}
      >
        {String(children).toUpperCase()}
      </Text>
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
    borderRadius: Spacing.borderRadius.button,
    marginTop: Spacing.screenPadding / 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    width: 'auto',
    alignSelf: 'flex-end',
    marginRight: Spacing.screenPadding / 2,
    marginBottom: Spacing.screenPadding / 2,
  },
  textButton: {
    width: 'auto',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    ...TypographyScale.mediumText,
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

