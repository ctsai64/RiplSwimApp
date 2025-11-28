import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, Subheading, Paragraph, MediumText } from '../components/Typography';
import { Frame1 } from '../components/Frame1';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';

export default function MyPlanScreen() {
  const router = useRouter();

  // Sample practice data
  const practices = [
    {
      date: '2024-01-15',
      weekday: 'Monday',
      time: '6:00 AM',
      people: '3 people',
      sets: [
        { name: 'Warm-up Set', description: 'Set description...' },
        { name: 'Main Set', description: 'Set description...' },
        { name: 'Cool-down Set', description: 'Set description...' },
      ],
    },
    {
      date: '2024-01-17',
      weekday: 'Wednesday',
      time: '6:00 AM',
      people: '5 people',
      sets: [
        { name: 'Warm-up Set', description: 'Set description...' },
        { name: 'Main Set', description: 'Set description...' },
      ],
    },
  ];

  return (
    <ScreenContainer scrollable>
      <Heading style={styles.sectionHeading}>Upcoming Practices</Heading>
      <Heading style={styles.weekHeading}>WEEK VIEW</Heading>

      {practices.map((practice, practiceIndex) => (
        <View key={practiceIndex} style={styles.practiceContainer}>
          <View style={styles.practicePreview}>
            <Subheading>{practice.date} Practice</Subheading>
            <Paragraph>{practice.weekday} {practice.time}</Paragraph>
            <Paragraph>{practice.people}</Paragraph>
          </View>

          <View style={styles.setsContainer}>
            {practice.sets.map((set, setIndex) => (
              <Frame1 key={setIndex} style={styles.setFrame}>
                <Subheading>{set.name}</Subheading>
                <MediumText>{set.description}</MediumText>
              </Frame1>
            ))}
          </View>
        </View>
      ))}

      <Button
        variant="horizontal"
        style={styles.addButton}
        onPress={() => router.push('/capture-practice')}
      >
        Add Workout+
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionHeading: {
    marginBottom: Spacing.screenPadding / 2,
  },
  weekHeading: {
    marginBottom: Spacing.screenPadding,
  },
  practiceContainer: {
    width: '100%',
    marginBottom: Spacing.screenPadding * 1.5,
  },
  practicePreview: {
    marginBottom: Spacing.screenPadding / 2,
  },
  setsContainer: {
    width: '100%',
    marginBottom: Spacing.screenPadding,
  },
  setFrame: {
    width: '100%',
    marginBottom: Spacing.screenPadding / 2,
  },
  addButton: {
    marginTop: Spacing.screenPadding,
    marginBottom: Spacing.screenPadding * 2,
  },
});

