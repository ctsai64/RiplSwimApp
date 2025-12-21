import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Frame1 } from '@/components/frame';

export default function EditPracticeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ title?: string; date?: string; sets?: string }>();
  const { colors, typography, spacing } = useTheme();

  const parsedSets = useMemo(() => {
    if (params.sets) {
      try {
        const candidate = JSON.parse(params.sets as string);
        if (Array.isArray(candidate)) {
          return candidate;
        }
      } catch {
        // ignore malformed payloads
      }
    }

    return [
      { name: 'Warm-up Set', description: '200m easy swim' },
      { name: 'Main Set', description: '6 x 100m build' },
      { name: 'Cool Down', description: '100m easy' },
    ];
  }, [params.sets]);

  const practiceTitle = (params.title as string) || 'Practice';
  const practiceDate = (params.date as string) || 'Date TBD';

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
      <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 4 }]}>{practiceTitle}</Text>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginBottom: spacing.screenPadding }]}>{practiceDate}</Text>

      <Pressable
        style={[buttonBase, { backgroundColor: colors.primary, marginBottom: spacing.screenPadding }]}
        onPress={() => router.push('/capture-practice')}
      >
        <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Capture Sets</Text>
      </Pressable>

      <View style={{ width: '100%', marginBottom: spacing.screenPadding }}>
        {parsedSets.map((set, index) => (
          <Frame1 key={index} style={{ marginBottom: spacing.screenPadding / 2 }}>
            <Text style={[typography.paragraph, { color: colors.text }]}>{set.name}</Text>
            {set.description ? (
              <Text style={[typography.subheading, { color: colors.textSecondary, marginTop: spacing.screenPadding / 4 }]}>
                {set.description}
              </Text>
            ) : null}
          </Frame1>
        ))}
      </View>

      <View style={{ width: '100%', gap: spacing.screenPadding / 2 }}>
        <Pressable style={[buttonBase, { backgroundColor: colors.secondary }]}>
          <Text style={[typography.paragraph, { color: colors.text }]}>Add Set</Text>
        </Pressable>
        <Pressable style={[buttonBase, { backgroundColor: colors.primary }]} onPress={() => router.push('/reflection')}>
          <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Next →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
