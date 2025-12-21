import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function GroupsScreen() {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.screenPadding }]}> 
      <Text style={[typography.heading, { color: colors.text }]}>Groups</Text>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginTop: spacing.screenPadding / 2 }]}> 
        Manage your swim groups and see who is training with you. 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
