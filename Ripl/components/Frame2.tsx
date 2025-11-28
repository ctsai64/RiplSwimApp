import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/design';

interface Frame2Props extends ViewProps {
  children: React.ReactNode;
}

export const Frame2: React.FC<Frame2Props> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.frame, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    backgroundColor: Colors.frameBackground,
    borderRadius: Spacing.borderRadius.frame2,
    padding: Spacing.screenPadding / 2,
  },
});

