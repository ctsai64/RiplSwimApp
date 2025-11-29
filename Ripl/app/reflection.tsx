import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph } from '../components/Typography';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

const SCALE = [1, 2, 3, 4, 5];

export default function ReflectionScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [emotionalRating, setEmotionalRating] = useState(3);
  const [physicalRating, setPhysicalRating] = useState(3);

  const RatingComponent = ({
    value,
    onValueChange,
    label,
  }: {
    value: number;
    onValueChange: (val: number) => void;
    label: string;
  }) => (
    <View style={styles.ratingContainer}>
      <Heading style={styles.heading}>{label}</Heading>
      <View style={styles.scaleRow}>
        {SCALE.map((score) => {
          const isActive = score <= value;
          return (
            <TouchableOpacity
              key={score}
              onPress={() => onValueChange(score)}
              style={[
                styles.scaleDot,
                {
                  borderColor: colors.border,
                  backgroundColor: isActive ? colors.frameBackground : 'transparent',
                },
              ]}
            >
              <MediumText style={{ color: colors.white }}>{score}</MediumText>
            </TouchableOpacity>
          );
        })}
      </View>
      <Paragraph style={styles.ratingText}>You selected {value} / 5</Paragraph>
    </View>
  );

  return (
    <ScreenContainer scrollable>
      <RatingComponent value={emotionalRating} onValueChange={setEmotionalRating} label="Emotional Rating" />
      <RatingComponent value={physicalRating} onValueChange={setPhysicalRating} label="Physical Rating" />

      <Button variant="horizontal" onPress={() => router.push('/')}>
        Return to Landing Page
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: Spacing.screenPadding / 2,
  },
  ratingContainer: {
    width: '100%',
    marginBottom: Spacing.screenPadding * 1.5,
  },
  scaleRow: {
    flexDirection: 'row',
    gap: Spacing.screenPadding / 3,
    marginBottom: Spacing.screenPadding / 2,
  },
  scaleDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    marginTop: Spacing.screenPadding / 3,
  },
});
