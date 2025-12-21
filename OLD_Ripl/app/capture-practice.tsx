import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading } from '../components/Typography';
import { Button } from '../components/Button';
import { Frame1 } from '../components/Frame1';
import { Spacing } from '../constants/design';

export default function CapturePracticeScreen() {
  const router = useRouter();
  const [hasCapture, setHasCapture] = useState(false);

  const handleCapture = () => {
    setHasCapture(true);
  };

  const handleRetake = () => {
    setHasCapture(false);
  };

  const handleConfirm = () => {
    router.push('/edit-practice');
  };

  return (
    <ScreenContainer>
      <View style={styles.frameContainer}>
        {hasCapture ? (
          <Frame1 style={styles.previewFrame}>
            <Heading>Preview Placeholder</Heading>
          </Frame1>
        ) : (
          <Frame1 style={styles.captureFrame}>
            <Heading>Camera View Placeholder</Heading>
          </Frame1>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {!hasCapture ? (
          <Button variant="horizontal" style={styles.button} onPress={handleCapture}>
            Capture
          </Button>
        ) : (
          <>
            <Button variant="horizontal" style={styles.button} onPress={handleRetake}>
              Retake
            </Button>
            <Button variant="horizontal" style={styles.button} onPress={handleConfirm}>
              Confirm
            </Button>
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: Spacing.screenPadding / 4,
  },
  frameContainer: {
    width: '100%',
    marginTop: Spacing.screenPadding,
    marginBottom: Spacing.screenPadding,
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
  },
  button: {
    marginBottom: Spacing.screenPadding / 2,
  },
});

