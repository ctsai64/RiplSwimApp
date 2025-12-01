import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph, Subheading } from '../components/Typography';
import { Frame1 } from '../components/Frame1';
import { Frame2 } from '../components/Frame2';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';
import { PRACTICES, PracticeSet } from '../constants/practices';

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
        <Heading>Upcoming Practice</Heading>
        <Image
          source={require('../assets/images/weekview.png')}
          style={styles.weekView}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.practiceCard} onPress={handleOpenPractice}>
          <View style={{position: 'absolute', top: Spacing.screenPadding / 4, left: Spacing.screenPadding / 4, zIndex: 1}}>
            <TouchableOpacity style={{padding: Spacing.screenPadding / 4}}>
              <Paragraph style={{fontSize: 14}}>edit</Paragraph>
            </TouchableOpacity>
          </View>
          <View style={styles.setsContainer}>
            {currentPractice.sets.map((set: PracticeSet) => (
              <View style={{flexDirection: 'row',
                alignItems: 'center'}}>
              <Image
                source={require('../assets/images/circle.png')}
                resizeMode="contain"
                style={{ width: 50, height: 50, marginRight: Spacing.screenPadding / 3 }}
              />
              <Frame1 key={set.name} style={styles.setItem}>
                  <Subheading>{set.name}</Subheading>
                  <Paragraph style={styles.practiceMeta}>{currentPractice.dateLabel}</Paragraph>
                  <Paragraph style={styles.practiceMeta}>{currentPractice.people}</Paragraph>
                  <MediumText>{set.description}</MediumText>
                  <Button
                    variant="small"
                  >
                    Join
                  </Button>
              </Frame1>
              </View>
            ))}
          </View>
        </TouchableOpacity>
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
  weekView: {
    width: '100%',
  },
  practiceCard: {
    width: '80%',
    backgroundColor: 'transparent',
  },
  practiceTitle: {
    marginBottom: Spacing.screenPadding / 4,
  },
  practiceMeta: {
    marginBottom: Spacing.screenPadding / 6,
  },
  setsContainer: {
    marginTop: Spacing.screenPadding / 8,
    gap: Spacing.screenPadding / 2,
  },
  setItem: {
    width: '100%',
    padding: Spacing.screenPadding / 2,
  },
  fabHost: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.screenPadding,
  },
  fab: {
    width: '75%',
  },
});

