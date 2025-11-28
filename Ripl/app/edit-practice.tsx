import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, Paragraph } from '../components/Typography';
import { Frame2 } from '../components/Frame2';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';

export default function EditPracticeScreen() {
  const router = useRouter();

  // Sample sets data
  const sets = [
    { name: 'Sample Set' },
    { name: 'Sample Set' },
    { name: 'Sample Set' },
  ];

  const handleNext = () => {
    // Navigate to Reflection (can be changed to Timing)
    router.push('/reflection');
  };

  return (
    <ScreenContainer scrollable>
      <Heading style={styles.header}>Practice</Heading>

      <Button
        variant="horizontal"
        style={styles.captureButton}
        onPress={() => router.push('/capture-practice')}
      >
        Capture Practice
      </Button>

      <View style={styles.setsContainer}>
        {sets.map((set, index) => (
          <Frame2 key={index} style={styles.setFrame}>
            <Paragraph style={styles.setText}>{set.name}</Paragraph>
          </Frame2>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button variant="horizontal" style={styles.button}>
          Add Set
        </Button>
        <Button variant="horizontal" style={styles.button} onPress={handleNext}>
          Next →
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.screenPadding,
  },
  captureButton: {
    marginBottom: Spacing.screenPadding,
  },
  setsContainer: {
    width: '100%',
    marginBottom: Spacing.screenPadding,
  },
  setFrame: {
    width: '100%',
    marginBottom: Spacing.screenPadding / 2,
  },
  setText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: Spacing.screenPadding / 2,
  },
});

