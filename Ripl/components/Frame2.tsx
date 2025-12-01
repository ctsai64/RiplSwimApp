import React from 'react';
import { View, ViewProps, StyleSheet, Text } from 'react-native';
import { Spacing, TypographyScale, FontFamily } from '../constants/design';
import { useTheme } from '../context/ThemeContext';


interface Frame2Props extends ViewProps {
  children: React.ReactNode;
}

export const Frame2: React.FC<Frame2Props> = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.frame,
        {
          backgroundColor: colors.frame2Background,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}
    >
      <Text style={{ color: colors.white }}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    borderRadius: Spacing.borderRadius.frame2,
    padding: Spacing.screenPadding / 2,
    borderWidth: 1,
  },
});

