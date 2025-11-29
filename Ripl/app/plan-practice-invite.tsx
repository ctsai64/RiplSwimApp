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
    <ScreenContainer scrollable>
      <Heading style={styles.heading}>INVITE FRIENDS</Heading>
      <MediumText style={styles.subheading}>Share the plan with your crew</MediumText>

      <Frame2 style={styles.placeholder}>
        <Paragraph>Invites + contact picker placeholder</Paragraph>
      </Frame2>

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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.screenPadding / 2,
  },
});

