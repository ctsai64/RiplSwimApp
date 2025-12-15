import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer, TimelineItem } from '../components';
import { Heading, Paragraph, Subheading } from '../components/Typography';
import { Button } from '../components/Button';
import { Frame1 } from '../components/Frame1';
import { Spacing, LightColors, TypographyScale, Border } from '../constants/design';
import { useGlobalData } from '../context/GlobalDataContext';
import { computeEstimatedDistance, computeEstimatedDuration, parseDateTime, getPracticesForUser, formatPracticeMembers} from '../utils/practiceHelpers';
import { WeekView } from '../components/WeekView';
import { Practice } from '../constants/interfaces';


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
          practicesOnDate.map((practice: Practice, index: number) => (
              <TimelineItem
                  key={practice.name} 
                  isLast={index === practicesOnDate.length - 1}
                  circleColor={LightColors.frameBackground}
                  lineColor={LightColors.frameBackground}
                >
                <Frame1>
                  <Heading>{practice.name}</Heading>
                  <Paragraph>{parseDateTime(practice)}</Paragraph>
                  <Paragraph>{formatPracticeMembers(practice)}</Paragraph>
                  <Paragraph>
                    {computeEstimatedDistance(practice)} {practice.units} • {computeEstimatedDuration(practice)}
                  </Paragraph>
                </Frame1>
              </TimelineItem>
        ))
      )}
      </ScreenContainer>

      <View style={styles.fabHost} pointerEvents="box-none">
        <Button
          variant="horizontal"
          style={[styles.fab, styles.addButton]}
          onPress={() => router.push('/plan-practice')}
        >
          ADD WORKOUT +
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
    paddingHorizontal: Spacing.screenPadding,
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
  addButton: {
    backgroundColor: LightColors.frameBackground,
    borderRadius: Spacing.borderRadius.button,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: LightColors.text,
    ...TypographyScale.mediumText,
    fontWeight: '700',
  },
});