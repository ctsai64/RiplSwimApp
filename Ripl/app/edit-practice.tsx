import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useGlobalData } from '../context/GlobalDataContext';
import { Frame1 } from '@/components/frame';
import { Users } from '@/components/users';
import { Tag } from '@/components/tag';
import { Ionicons } from '@expo/vector-icons';
import { computeEstimatedDistance, computeEstimatedDuration, formatPracticeMembers } from '../utils/practiceHelpers';
import { parseDateTime } from '../utils/practiceHelpers';

export default function EditPracticeScreen() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();
  const { practices, selectedPracticeId } = useGlobalData();

  const practice = useMemo(() => practices.find(p => p.id === selectedPracticeId) || null, [practices, selectedPracticeId]);

  const buttonBase = {
    paddingVertical: spacing.buttonPadding.vertical * 2,
    paddingHorizontal: spacing.screenPadding,
    borderRadius: spacing.borderRadius.card,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  } as const;

  if (!practice) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.screenPadding }]}> 
        <Text style={[typography.paragraph, { color: colors.textSecondary }]}>No practice selected.</Text>
        <Text style={[typography.paragraph, { color: colors.textSecondary }]}>Go back and choose a practice.</Text>
      </View>
    );
  }

  return (
    
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.screenPadding }]}> 
      <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 4 }]}>{practice.name}</Text>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginBottom: spacing.screenPadding }]}>{parseDateTime(practice)}</Text>

      <Pressable
        style={[buttonBase, { backgroundColor: colors.primary, marginBottom: spacing.screenPadding }]}
        onPress={() => router.push('/capture-practice')}
      >
        <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Capture Sets</Text>
      </Pressable>

      <Frame1 style={{ width: '100%', marginBottom: spacing.screenPadding }}>
        <Text style={[typography.paragraph, { color: colors.textSecondary }]}>Summary</Text>
        <Text style={[typography.paragraph, { color: colors.text }]}>
          {computeEstimatedDistance(practice)} {practice.units} • {computeEstimatedDuration(practice)}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.buttonPadding.horizontal, marginTop: spacing.screenPadding / 2 }}>
          {practice.type.map((type, idx) => (
            <Tag key={idx} label={type} />
          ))}
        </View>
        <View style={{ marginTop: spacing.screenPadding / 2 }}>
          <Users usersText={formatPracticeMembers(practice)} />
        </View>
      </Frame1>
    <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 0 }}
                contentContainerStyle={{ paddingBottom: 0 }}
              > 
      <View style={{ width: '100%', marginBottom: spacing.screenPadding }}>
        {practice.sets.map((set, index) => (
          <Frame1 key={index} style={{ marginBottom: spacing.screenPadding / 2 }}>
            <Text style={[typography.paragraph, { color: colors.text }]}>{set.name}</Text>
            {set.things.map(thing => (
              <Text key={thing.id} style={[typography.tag, { color: colors.textSecondary, marginTop: spacing.screenPadding / 4 }]}> 
                {thing.iterations} x {thing.distance}{practice.units === 'yards' ? 'Y' : 'M'} @ {thing.time}s — {thing.description}
              </Text>
            ))}
          </Frame1>
        ))}
      </View>
      </ScrollView>

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
