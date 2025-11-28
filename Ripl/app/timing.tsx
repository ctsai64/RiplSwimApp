import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, Title } from '../components/Typography';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';

export default function TimingScreen() {
  // Sample timing data
  const distance = '100m';
  const stroke = 'Freestyle';
  const split = '50m';
  const time = '00:45.23';

  return (
    <ScreenContainer>
      <Heading style={styles.heading}>{distance} {stroke}</Heading>
      <Heading style={styles.heading}>{distance} {split}</Heading>
      <Title style={styles.time}>{time}</Title>

      <View style={styles.buttonContainer}>
        <Button variant="small" style={styles.button}>
          Undo
        </Button>
        <Button variant="small" style={styles.button}>
          Split
        </Button>
      </View>

      <Button variant="horizontal" style={styles.endButton}>
        End Log
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: Spacing.screenPadding / 2,
  },
  time: {
    marginTop: Spacing.screenPadding,
    marginBottom: Spacing.screenPadding * 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: Spacing.screenPadding,
    gap: Spacing.screenPadding / 2,
  },
  button: {
    marginRight: Spacing.screenPadding / 2,
  },
  endButton: {
    marginTop: Spacing.screenPadding,
  },
});

