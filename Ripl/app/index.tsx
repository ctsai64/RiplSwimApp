import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Title, Heading, Subheading, Paragraph } from '../components/Typography';
import { Frame1 } from '../components/Frame1';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';

export default function LandingScreen() {
  const router = useRouter();

  const workouts = [
    { name: 'WORKOUT 1', distance: '2350 yd', duration: '1 hr 15 min' },
    { name: 'WORKOUT 2', distance: '2350 yd', duration: '1 hr 15 min' },
    { name: 'WORKOUT 3', distance: '2350 yd', duration: '1 hr 15 min' },
  ];

  return (
    <ScreenContainer scrollable>
      <Title style={[styles.title]}>Welcome, Aaron.</Title>
      <Subheading>MY PLAN</Subheading>

      <Frame1 style={styles.workoutFrame} onPress={() => router.push('/my-plan')}>
        {workouts.map((workout, index) => (
          <View key={workout.name} style={styles.workoutEntry}>
            <Image
              source={require('../assets/images/circle.png')}
              resizeMode="contain"
              style={{ width: 50, height: 50, marginRight: Spacing.screenPadding / 3 }}
            />
            <View>
              <Heading>{workout.name}</Heading>
              <Paragraph>
                {workout.distance} • {workout.duration}
              </Paragraph>
            </View>
          </View>
        ))}
        <Button
        variant="horizontal"
        onPress={() => router.push('/plan-practice')}
      >
        Add Workout+
      </Button>
      </Frame1>


      <View style={styles.exploreSection}>
        <Heading style={styles.exploreHeading}>EXPLORE</Heading>
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
    marginBottom: Spacing.screenPadding,
  },
  workoutFrame: {
    width: '100%',
    marginBottom: Spacing.screenPadding,
  },
  workoutEntry: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.screenPadding / 4,
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
