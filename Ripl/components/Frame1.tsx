import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { Spacing, Border } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

interface Frame1Props extends TouchableOpacityProps {
  children: React.ReactNode;
}

export const Frame1: React.FC<Frame1Props> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={props.onPress ? 0.7 : 1}
      style={[styles.frame, { borderColor: colors.border }, style]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  frame: {
    borderRadius: Spacing.borderRadius.frame1,
    borderWidth: Border.frame1.width,
    alignSelf: 'center',
    padding: Spacing.screenPadding / 2,
    width: '100%',
  },
});

