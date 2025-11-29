import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph, Subheading } from '../components/Typography';
import { Frame1 } from '../components/Frame1';
import { Frame2 } from '../components/Frame2';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';

const PRACTICES = [
  {
    id: 'jan-15',
    title: 'Workout',
    dateLabel: 'Mon, Jan 15 · 6:00 AM',
    people: '3 swimmers confirmed',
    sets: [
      { name: 'Warm-up', description: '300m easy swim + drills' },
      { name: 'Main Set', description: '6 x 200m negative split' },
      { name: 'Cool Down', description: '200m choice' },
    ],
  },
  {
    id: 'jan-17',
    title: 'Midweek Speed',
    dateLabel: 'Wed, Jan 17 · 6:15 AM',
    people: '5 swimmers confirmed',
    sets: [
      { name: 'Warm-up', description: '200m easy + 4 x 50 build' },
      { name: 'Speed', description: '12 x 50m @ :55' },
      { name: 'Cool Down', description: '100m choice' },
    ],
  },
];

export default function MyPlanScreen() {
  const router = useRouter();
  const currentPractice = PRACTICES[0];

  const handleOpenPractice = () => {
    router.push({
      pathname: '/edit-practice',
      params: {
        title: currentPractice.title,
        date: currentPractice.dateLabel,
        sets: JSON.stringify(currentPractice.sets),
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScreenContainer scrollable style={styles.screenContent}>
        <Heading style={styles.sectionHeading}>Upcoming Practice</Heading>
        <Image
          source={require('../assets/images/weekview.png')}
          style={styles.weekView}
          resizeMode="cover"
        />

        <Frame1 style={styles.practiceCard} onPress={handleOpenPractice}>
          <Subheading style={styles.practiceTitle}>{currentPractice.title}</Subheading>
          <Paragraph style={styles.practiceMeta}>{currentPractice.dateLabel}</Paragraph>
          <Paragraph style={styles.practiceMeta}>{currentPractice.people}</Paragraph>

          <View style={styles.setsContainer}>
            {currentPractice.sets.map((set) => (
              <Frame2 key={set.name} style={styles.setItem}>
                <MediumText>{set.name}</MediumText>
                <Paragraph>{set.description}</Paragraph>
              </Frame2>
            ))}
          </View>
        </Frame1>
      </ScreenContainer>

      <View style={styles.fabHost} pointerEvents="box-none">
        <Button
          variant="horizontal"
          style={styles.fab}
          onPress={() => router.push('/plan-practice')}
        >
          Add Workout+
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  screenContent: {
    paddingBottom: Spacing.screenPadding * 4,
  },
  sectionHeading: {
    marginBottom: Spacing.screenPadding / 2,
  },
  weekView: {
    width: '100%',
    aspectRatio: 1.8,
    borderRadius: 12,
    marginVertical: Spacing.screenPadding / 3,
  },
  practiceCard: {
    width: '100%',
  },
  practiceTitle: {
    marginBottom: Spacing.screenPadding / 4,
  },
  practiceMeta: {
    marginBottom: Spacing.screenPadding / 6,
  },
  setsContainer: {
    marginTop: Spacing.screenPadding / 2,
    gap: Spacing.screenPadding / 2,
  },
  setItem: {
    width: '100%',
  },
  fabHost: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.screenPadding,
  },
  fab: {
    width: 240,
  },
});

