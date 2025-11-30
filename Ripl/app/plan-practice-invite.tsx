import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph, Title } from '../components/Typography';
import { Button, ProgressBar } from '../components';
import { Frame2 } from '../components/Frame2';
import { Spacing } from '../constants/design';

export default function PlanPracticeInviteScreen() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <ScreenContainer scrollable style={styles.screenContent}>
        <ProgressBar currentStep={3} />
        <Title style={styles.heading}>Invite any friends?</Title>
      </ScreenContainer>

      <View style={styles.buttonHost} pointerEvents="box-none">
        <View style={styles.buttonRow}>
          <Button variant="small" onPress={() => router.push('/my-plan')}>
            Let's Go!
          </Button>
          <Button variant="text" onPress={() => router.push('/my-plan')}>
            Later
          </Button>
        </View>
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
  heading: {
    marginBottom: Spacing.screenPadding / 3,
  },
  subheading: {
    marginBottom: Spacing.screenPadding,
  },
  placeholder: {
    width: '100%',
    marginBottom: Spacing.screenPadding,
  },
  routeButton: {
    marginBottom: Spacing.screenPadding,
  },
  buttonHost: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    paddingBottom: Spacing.screenPadding,
    paddingHorizontal: Spacing.screenPadding,
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row-reverse',
    //justifyContent: 'space-between',
    gap: Spacing.screenPadding / 2,
  },
});

