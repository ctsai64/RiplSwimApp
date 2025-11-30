import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph } from '../components/Typography';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

const OPTIONS = ['Free/Open Swim', 'Structured Workout', 'Time Intervals'];

export default function PlanPracticeDepthScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [selection, setSelection] = useState(OPTIONS[0]);

  return (
    <View style={styles.wrapper}>
      <ScreenContainer scrollable style={styles.screenContent}>
        <Heading style={styles.heading}>HOW DEEP ARE WE DIVING</Heading>
        <MediumText style={styles.subheading}>Choose the vibe for this practice</MediumText>

        <View style={styles.optionList}>
          {OPTIONS.map((option) => {
            const isActive = option === selection;
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  {
                    borderColor: colors.border,
                    backgroundColor: isActive ? colors.frame2Background : 'transparent',
                  },
                ]}
                onPress={() => setSelection(option)}
              >
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: colors.border,
                    },
                  ]}
                >
                  {isActive && <View style={[styles.radioInner, { backgroundColor: colors.frameBackground }]} />}
                </View>
                <Paragraph style={[styles.optionLabel, { color: colors.text }]}>{option}</Paragraph>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScreenContainer>

      <View style={styles.buttonHost} pointerEvents="box-none">
        <View style={styles.buttonRow}>
          <Button variant="small" onPress={() => router.back()}>
            Back
          </Button>
          <Button variant="small" onPress={() => router.push('/my-plan')}>
            Skip
          </Button>
          <Button variant="small" onPress={() => router.push('/plan-practice-invite')}>
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
  optionList: {
    width: '100%',
    gap: Spacing.screenPadding / 2,
    marginBottom: Spacing.screenPadding * 1.5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.screenPadding / 2,
    borderRadius: 16,
    borderWidth: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.screenPadding / 2,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  optionLabel: {
    flex: 1,
  },
  buttonHost: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.screenPadding,
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.screenPadding / 2,
  },
});

