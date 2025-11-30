import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph, Title } from '../components/Typography';
import { Button, ProgressBar } from '../components';
import { Spacing } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function PlanPracticeSetTimeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const totalCells = Math.ceil((firstDayIndex + daysInMonth) / 7) * 7;
    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - firstDayIndex + 1;
      return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScreenContainer scrollable style={styles.screenContent}>
        <ProgressBar currentStep={1} />
        <Title style={styles.heading}>Let's find the time to swim.</Title>

        <View style={styles.calendarHeader}>
          <MediumText>Current Month</MediumText>
        </View>

        <View style={styles.calendar}>
          {DAYS.map((day) => (
            <Paragraph key={day} style={styles.calendarDayLabel}>
              {day}
            </Paragraph>
          ))}
          {calendarDays.map((day, index) => {
            const isSelected = selectedDate === day;
            return (
              <TouchableOpacity
                key={`${day}-${index}`}
                accessibilityRole="button"
                style={[
                  styles.calendarCell,
                  {
                    borderColor: colors.border,
                    backgroundColor: 'transparent',
                  },
                ]}
                disabled={!day}
                onPress={() => setSelectedDate(day)}
              >
                <Paragraph style={{ color: colors.text }}>
                  {day ?? ''}
                </Paragraph>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScreenContainer>

      <View style={styles.buttonHost} pointerEvents="box-none">
        <View style={styles.buttonRow}>
        <Button variant="small" onPress={() => router.push('/plan-practice-depth')}>
            Next
          </Button>
          <Button variant="text" onPress={() => router.push('/plan-practice-depth')}>
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
  calendarHeader: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: Spacing.screenPadding / 2,
  },
  calendar: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.screenPadding * 1.5,
  },
  calendarDayLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    marginBottom: Spacing.screenPadding / 6,
  },
  calendarCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.screenPadding / 6,
    borderRadius: 12,
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

