import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function HomeScreen() {
  const { colors, typography, spacing } = useTheme();
  
  return (
    <View style={[styles.container, { padding: spacing.screenPadding }]}>
      <Text style={[typography.h1, { color: colors.text }]}>
        Analytics
      </Text>
      
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginTop: spacing.screenPadding / 2 }]}>
        Track your progress below.
      </Text>
      
      <Text style={[typography.time, { color: colors.accent, marginTop: spacing.screenPadding / 2 }]}>
        12:45 PM
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
