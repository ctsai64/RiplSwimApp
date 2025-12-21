import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useGlobalData } from '../context/GlobalDataContext';
import { WeekView } from '@/components/weekview';
import { TimelineItem } from '@/components/timeline';
import { Frame1 } from '@/components/frame';
import { computeEstimatedDistance, computeEstimatedDuration, parseDateTime, getPracticesForUser, getPracticeDates, formatPracticeMembers, formatYMD } from '../utils/practiceHelpers';

export default function MyPlanScreen() {
  const { colors, typography, spacing } = useTheme();
  const { currentUser, practices } = useGlobalData();
  const router = useRouter();

  const userPractices = useMemo(() => {
    if (!currentUser) return [];
    return getPracticesForUser(currentUser.practiceIds, practices);
  }, [currentUser, practices]);

  const practiceDates = useMemo(() => getPracticeDates(userPractices), [userPractices]);

  const [selectedDate, setSelectedDate] = useState(() => formatYMD(new Date()));

  const practicesOnDate = useMemo(
    () =>
      userPractices.filter((p) => {
        if (!p.dateTime) return false;
        const d = new Date(p.dateTime);
        if (isNaN(d.getTime())) return false;
        return formatYMD(d) === selectedDate;
      }),
    [userPractices, selectedDate]
  );

  const buttonBase = {
    paddingVertical: spacing.buttonPadding.vertical * 2,
    paddingHorizontal: spacing.screenPadding,
    borderRadius: spacing.borderRadius.card,
    alignItems: 'center',
    justifyContent: 'center',
  } as const;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: spacing.screenPadding * 2 }}>
        <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 2 }]}>Upcoming Practice</Text>

        <WeekView practiceDates={practiceDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        {practicesOnDate.length === 0 ? (
          <Text style={[typography.paragraph, { color: colors.textSecondary, textAlign: 'center', marginVertical: spacing.screenPadding }]}>No practices on this day.</Text>
        ) : (
          practicesOnDate.map((practice, index) => (
            <TimelineItem key={practice.id} isLast={index === practicesOnDate.length - 1} isCompleted={false}>
              <Frame1>
                <Text style={[typography.heading, { color: colors.text }]}>{practice.name}</Text>
                <Text style={[typography.subheading, { color: colors.textSecondary, marginTop: spacing.screenPadding / 4 }]}>
                  {parseDateTime(practice)}
                </Text>
                <Text style={[typography.paragraph, { color: colors.textSecondary, marginTop: spacing.screenPadding / 4 }]}>
                  {formatPracticeMembers(practice)}
                </Text>
                <Text style={[typography.paragraph, { color: colors.textSecondary, marginTop: spacing.screenPadding / 4 }]}>
                  {computeEstimatedDistance(practice)} {practice.units} • {computeEstimatedDuration(practice)}
                </Text>
              </Frame1>
            </TimelineItem>
          ))
        )}
      </ScrollView>

      <View style={[styles.fabHost, { paddingBottom: spacing.screenPadding }]}> 
        <Pressable
          style={[buttonBase, { backgroundColor: colors.primary, width: '75%' }]}
          onPress={() => router.push('/plan-practice')}
        >
          <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>ADD WORKOUT +</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fabHost: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
