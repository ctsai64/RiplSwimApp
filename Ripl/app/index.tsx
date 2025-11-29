import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Title, Heading, Subheading, Paragraph } from '../components/Typography';
import { Frame1 } from '../components/Frame1';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';

export default function LandingScreen() {
  const router = useRouter();

  const workouts = [
    { date: '2024-01-15', distance: '2000m', duration: '45min' },
    { date: '2024-01-17', distance: '1500m', duration: '35min' },
    { date: '2024-01-19', distance: '3000m', duration: '60min' },
  ];

  return (
    <ScreenContainer scrollable>
      <Title style={styles.title}>Welcome, USERNAME.</Title>
      <Heading style={styles.heading}>My Plan</Heading>

      <Frame1 style={styles.workoutFrame} onPress={() => router.push('/my-plan')}>
        {workouts.map((workout, index) => (
          <View key={workout.date} style={styles.workoutEntry}>
            <Subheading>{workout.date} Workout</Subheading>
            <Paragraph>
              {workout.distance} | {workout.duration}
            </Paragraph>
          </View>
        ))}
      </Frame1>

      <Button
        variant="horizontal"
        style={styles.addButton}
        onPress={() => router.push('/plan-practice')}
      >
        Add Workout+
      </Button>

      <View style={styles.exploreSection}>
        <Heading style={styles.exploreHeading}>Explore</Heading>
        <View style={styles.exploreButtons}>
          <Button
            variant="small"
            style={styles.exploreButton}
            onPress={() => router.push('/groups')}
          >
            Groups
          </Button>
          <Button
            variant="small"
            style={styles.exploreButton}
            onPress={() => router.push('/timing')}
          >
            Timing
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: Spacing.screenPadding / 2,
  },
  heading: {
    marginBottom: Spacing.screenPadding,
  },
  workoutFrame: {
    width: '100%',
    marginBottom: Spacing.screenPadding,
  },
  workoutEntry: {
    width: '100%',
    marginBottom: Spacing.screenPadding / 2,
  },
  addButton: {
    marginBottom: Spacing.screenPadding,
  },
  exploreSection: {
    width: '100%',
  },
  exploreHeading: {
    marginBottom: Spacing.screenPadding / 2,
  },
  exploreButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exploreButton: {
    marginRight: Spacing.screenPadding / 2,
    marginBottom: Spacing.screenPadding / 2,
  },
});
