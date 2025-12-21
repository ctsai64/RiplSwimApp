import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { TypographyScale } from '../constants/design';

export const Tag = ({ label }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
      <Text style={[TypographyScale.tag, { color: colors.primary }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { borderRadius: 16, paddingVertical: 4, paddingHorizontal: 12 },
});