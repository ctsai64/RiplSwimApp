import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, Paragraph, Subheading } from '../components/Typography';
import { Button } from '../components/Button';
import { Spacing } from '../constants/design';
import { useGlobalData } from '../context/GlobalDataContext';
import {
  computeEstimatedDistance,
  computeEstimatedDuration,
  parseDateTime,
  getPracticesForUser,
} from '../utils/practiceHelpers';

import { WeekView } from '../components/WeekView';

export default function MyPlanScreen() {
  const router = useRouter();
  const { practices, currentUser } = useGlobalData();

  const userPractices = currentUser
    ? getPracticesForUser(currentUser.practiceIds, practices)
    : [];

  const practiceDates = useMemo(
    () =>
      Array.from(
        new Set(
          userPractices.map(p =>
            new Date(p.dateTime).toISOString().slice(0, 10)
          )
        )
      ),
    [userPractices]
  );

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  });
  

  const practicesOnDate = userPractices.filter(
    p => new Date(p.dateTime).toISOString().slice(0, 10) === selectedDate
  );

  return (
    <View style={styles.wrapper}>
      <ScreenContainer scrollable style={styles.screenContent}>
        <Heading>Upcoming Practice</Heading>

        <WeekView
          practiceDates={practiceDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {practicesOnDate.length === 0 ? (
          <Paragraph style={{ marginVertical: 24, textAlign: 'center' }}>
            No practices on this day.
          </Paragraph>
        ) : (
          practicesOnDate.map((practice, i) => (
            <TouchableOpacity
              style={styles.practiceCard}
              key={practice.dateTime + i}
            >
              <View style={{ marginVertical: 10 }}>
                <Subheading>{practice.name}</Subheading>
                <Paragraph>
                  {parseDateTime(practice)} •{' '}
                  {computeEstimatedDistance(practice)} {practice.units} •{' '}
                  {computeEstimatedDuration(practice)} min
                </Paragraph>

                <Button variant="small">View</Button>
              </View>
            </TouchableOpacity>
          ))
        )}
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
  practiceCard: {
    width: '80%',
    backgroundColor: 'transparent',
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
