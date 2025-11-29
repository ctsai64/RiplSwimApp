import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph } from '../components/Typography';
import { Frame2 } from '../components/Frame2';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';

export default function EditPracticeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    title?: string;
    date?: string;
    sets?: string;
  }>();

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

  const handleNext = () => {
    // Navigate to Reflection (can be changed to Timing)
    router.push('/reflection');
  };

  return (
    <ScreenContainer scrollable>
      <Heading style={styles.header}>{practiceTitle}</Heading>
      <Heading style={styles.dateHeading}>{practiceDate}</Heading>

      <Button
        variant="horizontal"
        style={styles.captureButton}
        onPress={() => router.push('/capture-practice')}
      >
        Capture Sets
      </Button>

      <View style={styles.setsContainer}>
        {parsedSets.map((set, index) => (
          <Frame2 key={index} style={styles.setFrame}>
            <Paragraph style={styles.setText}>{set.name}</Paragraph>
            {set.description ? (
              <MediumText style={styles.setDescription}>{set.description}</MediumText>
            ) : null}
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
    marginBottom: Spacing.screenPadding / 4,
  },
  dateHeading: {
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
    marginBottom: 4,
  },
  setDescription: {
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: Spacing.screenPadding / 2,
  },
});

