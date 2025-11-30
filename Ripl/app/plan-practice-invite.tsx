import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph } from '../components/Typography';
import { Button } from '../components/Button';
import { Frame2 } from '../components/Frame2';
import { Spacing } from '../constants/design';

export default function PlanPracticeInviteScreen() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <ScreenContainer scrollable style={styles.screenContent}>
        <Heading style={styles.heading}>INVITE FRIENDS</Heading>
        <MediumText style={styles.subheading}>Share the plan with your crew</MediumText>

        <Frame2 style={styles.placeholder}>
          <Paragraph>Invites + contact picker placeholder</Paragraph>
        </Frame2>
      </ScreenContainer>

      <View style={styles.buttonHost} pointerEvents="box-none">
        <View style={styles.buttonRow}>
          <Button variant="small" onPress={() => router.back()}>
            Back
          </Button>
          <Button variant="small" onPress={() => router.push('/my-plan')}>
            Skip
          </Button>
          <Button variant="small" onPress={() => router.push('/my-plan')}>
            Next
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
    alignItems: 'center',
    paddingBottom: Spacing.screenPadding,
    paddingHorizontal: Spacing.screenPadding,
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.screenPadding / 2,
  },
});

