import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useGlobalData } from '../context/GlobalDataContext';
import { WeekView } from '@/components/weekview';
import { getPracticesForUser, computeEstimatedDistance, computeEstimatedDuration, parseDateTime, getPracticeDates, formatYMD } from '../utils/practiceHelpers';
import { Frame1 } from '@/components/frame';

export default function GroupsScreen() {
  const { colors, typography, spacing } = useTheme();
  const { practices, groups, selectedGroup, setSelectedGroup } = useGlobalData();
  const router = useRouter();

  useEffect(() => {
    if (!selectedGroup && groups.length > 0) {
      setSelectedGroup(groups[0].id);
    }
  }, [selectedGroup, groups, setSelectedGroup]);

  const activeGroup = useMemo(() => (selectedGroup ? groups.find((g) => g.id === selectedGroup) || null : null), [groups, selectedGroup]);
  const groupPractices = useMemo(() => (activeGroup ? getPracticesForUser(activeGroup.practiceIds, practices) : []), [activeGroup, practices]);

  const practiceDates = useMemo(() => getPracticeDates(groupPractices), [groupPractices]);

  const [selectedDate, setSelectedDate] = useState(() => formatYMD(new Date()));

  const practicesOnDate = useMemo(
    () =>
      groupPractices.filter((p) => {
        if (!p.dateTime) return false;
        const d = new Date(p.dateTime);
        if (isNaN(d.getTime())) return false;
        return formatYMD(d) === selectedDate;
      }),
    [groupPractices, selectedDate]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.screenPadding }]}> 
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: spacing.screenPadding / 2 }}>
        <Text style={[typography.heading, { color: colors.text }]}>{activeGroup?.name || 'Group'}</Text>
      </View>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginBottom: spacing.screenPadding / 4 }]}>
        {activeGroup?.numberOfMembers ?? 0} members
      </Text>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginBottom: spacing.screenPadding }]}> 
        {activeGroup?.description}
      </Text>

      <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 4 }]}>Upcoming Practices</Text>
      <WeekView practiceDates={practiceDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {practicesOnDate.length === 0 ? (
        <Text style={[typography.paragraph, { color: colors.textSecondary, textAlign: 'center', marginVertical: spacing.screenPadding }]}>No practices on this day.</Text>
      ) : (
        practicesOnDate.map((practice, i) => (
          <TouchableOpacity style={{ width: '100%', marginBottom: spacing.screenPadding / 2 }} key={practice.id + i}>
            <Frame1>
              <Text style={[typography.heading, { color: colors.text }]}>{practice.name}</Text>
              <Text style={[typography.paragraph, { color: colors.textSecondary, marginTop: spacing.screenPadding / 4 }]}>
                {parseDateTime(practice)} • {computeEstimatedDistance(practice)} {practice.units} • {computeEstimatedDuration(practice)}
              </Text>
              <TouchableOpacity onPress={() => router.push('/edit-practice')} style={{ marginTop: spacing.screenPadding / 2 }}>
                <Text style={[typography.paragraph, { color: colors.accent }]}>View</Text>
              </TouchableOpacity>
            </Frame1>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
