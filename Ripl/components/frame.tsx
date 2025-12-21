import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Frame1Props extends TouchableOpacityProps {
  children: React.ReactNode;
}

export const Frame1: React.FC<Frame1Props> = ({ children, style, ...props }) => {
  const { colors, spacing, isDark } = useTheme();

  const shadowStyle: ViewStyle = !isDark ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  } : {};

  return (
    <TouchableOpacity
      activeOpacity={props.onPress ? 0.8 : 1}
      style={[
        styles.frame,
        { 
          backgroundColor: colors.background, 
          borderColor: colors.border,
          borderRadius: spacing.borderRadius.card,
          padding: spacing.cardPadding,
        },
        shadowStyle,
        style
      ]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  frame: {
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
  },
});