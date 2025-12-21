import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

const SCALE = [1, 2, 3, 4, 5];

export default function ReflectionScreen() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();
  const [emotionalRating, setEmotionalRating] = useState(3);
  const [physicalRating, setPhysicalRating] = useState(3);

  const RatingRow = ({ label, value, onChange }: { label: string; value: number; onChange: (val: number) => void }) => (
    <View style={styles.ratingContainer}>
      <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 2 }]}>{label}</Text>
      <View style={[styles.scaleRow, { gap: spacing.screenPadding / 3 }]}>
        {SCALE.map((score) => {
          const isActive = score <= value;
          return (
            <TouchableOpacity
              key={score}
              onPress={() => onChange(score)}
              style={[
                styles.scaleDot,
                {
                  borderColor: colors.border,
                  backgroundColor: isActive ? colors.accent : 'transparent',
                },
              ]}
            >
              <Text style={[typography.paragraph, { color: colors.text }]}>{score}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginTop: spacing.screenPadding / 3 }]}>
        You selected {value} / 5
      </Text>
    </View>
  );

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
      <RatingRow label="Emotional Rating" value={emotionalRating} onChange={setEmotionalRating} />
      <RatingRow label="Physical Rating" value={physicalRating} onChange={setPhysicalRating} />

      <TouchableOpacity style={[buttonBase, { backgroundColor: colors.primary }]} onPress={() => router.push('/')}> 
        <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  ratingContainer: {
    width: '100%',
    marginBottom: 24,
  },
  scaleRow: {
    flexDirection: 'row',
  },
  scaleDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
