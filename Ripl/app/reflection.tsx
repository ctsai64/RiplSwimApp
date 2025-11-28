import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, Paragraph } from '../components/Typography';
import { Spacing, Colors } from '../constants/design';

export default function ReflectionScreen() {
  const [emotionalRating, setEmotionalRating] = useState(5);
  const [physicalRating, setPhysicalRating] = useState(5);

  const RatingComponent = ({ value, onValueChange, label }: { value: number; onValueChange: (val: number) => void; label: string }) => {
    return (
      <View style={styles.ratingContainer}>
        <Heading style={styles.heading}>{label}</Heading>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <TouchableOpacity
              key={star}
              style={[styles.star, star <= value && styles.starFilled]}
              onPress={() => onValueChange(star)}
            />
          ))}
        </View>
        <Paragraph style={styles.ratingText}>Rating: {value}/10</Paragraph>
      </View>
    );
  };

  return (
    <ScreenContainer scrollable>
      <RatingComponent
        value={emotionalRating}
        onValueChange={setEmotionalRating}
        label="Emotional Rating"
      />
      <RatingComponent
        value={physicalRating}
        onValueChange={setPhysicalRating}
        label="Physical Rating"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: Spacing.screenPadding,
    marginBottom: Spacing.screenPadding / 2,
  },
  ratingContainer: {
    width: '100%',
    marginBottom: Spacing.screenPadding * 2,
  },
  starsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.screenPadding / 2,
    gap: Spacing.screenPadding / 4,
  },
  star: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: 'transparent',
  },
  starFilled: {
    backgroundColor: Colors.frameBackground,
  },
  ratingText: {
    marginTop: Spacing.screenPadding / 2,
  },
});

