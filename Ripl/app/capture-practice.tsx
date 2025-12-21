import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Frame1 } from '@/components/frame';

export default function CapturePracticeScreen() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();
  const [hasCapture, setHasCapture] = useState(false);

  const buttonBase = {
    paddingVertical: spacing.buttonPadding.vertical * 2,
    paddingHorizontal: spacing.screenPadding,
    borderRadius: spacing.borderRadius.card,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  } as const;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.screenPadding }]}> 
      <View style={styles.frameContainer}>
        {hasCapture ? (
          <Frame1 style={styles.previewFrame}>
            <Text style={[typography.heading, { color: colors.text }]}>Preview Placeholder</Text>
          </Frame1>
        ) : (
          <Frame1 style={styles.captureFrame}>
            <Text style={[typography.heading, { color: colors.text }]}>Camera View Placeholder</Text>
          </Frame1>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {!hasCapture ? (
          <Pressable style={[buttonBase, { backgroundColor: colors.primary }]} onPress={() => setHasCapture(true)}>
            <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Capture</Text>
          </Pressable>
        ) : (
          <>
            <Pressable style={[buttonBase, { backgroundColor: colors.secondary, marginBottom: spacing.screenPadding / 2 }]} onPress={() => setHasCapture(false)}>
              <Text style={[typography.paragraph, { color: colors.text }]}>Retake</Text>
            </Pressable>
            <Pressable style={[buttonBase, { backgroundColor: colors.primary }]} onPress={() => router.push('/edit-practice')}>
              <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Confirm</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  frameContainer: {
    width: '100%',
    marginTop: 24,
    marginBottom: 24,
  },
  captureFrame: {
    width: '100%',
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewFrame: {
    width: '100%',
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
});
