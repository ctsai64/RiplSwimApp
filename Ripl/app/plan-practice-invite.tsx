import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function PlanPracticeInviteScreen() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}> 
      <View style={{ padding: spacing.screenPadding, paddingBottom: spacing.screenPadding * 2 }}>
        <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 2 }]}>Invite any friends?</Text>
        <Text style={[typography.paragraph, { color: colors.textSecondary }]}>You can always add them later.</Text>
      </View>

      <View style={[styles.buttonHost, { paddingBottom: spacing.screenPadding, paddingHorizontal: spacing.screenPadding }]}> 
        <View style={[styles.buttonRow, { gap: spacing.screenPadding / 2 }]}> 
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={() => router.push('/my-plan')}>
            <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Let&apos;s Go!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.border }]} onPress={() => router.push('/my-plan')}>
            <Text style={[typography.paragraph, { color: colors.text }]}>Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  buttonHost: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
});
