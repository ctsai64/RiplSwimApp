import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function TimerScreen() {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.screenPadding }]}> 
      <Text style={[typography.heading, { color: colors.text }]}>Timer</Text>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginTop: spacing.screenPadding / 2 }]}> 
        Track intervals and set custom timings for your sessions. 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
