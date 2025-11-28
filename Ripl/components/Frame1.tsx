import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { Spacing, Border } from '../constants/design';

interface Frame1Props extends TouchableOpacityProps {
  children: React.ReactNode;
}

export const Frame1: React.FC<Frame1Props> = ({ children, style, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={props.onPress ? 0.7 : 1}
      style={[styles.frame, style]}
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
    borderColor: Border.frame1.color,
    alignSelf: 'center',
    padding: Spacing.screenPadding / 2,
  },
});

