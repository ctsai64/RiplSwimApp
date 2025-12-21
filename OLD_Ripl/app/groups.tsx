import React, { useState, useMemo } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Frame1 } from '../components/Frame1';
import { Heading, Subheading, MediumText, Paragraph } from '../components/Typography';
import { Spacing } from '../constants/design';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { useGlobalData } from '../context/GlobalDataContext';
import { computeEstimatedDistance, computeEstimatedDuration, parseDateTime, getPracticesForUser } from '../utils/practiceHelpers';
import { WeekView } from '../components/WeekView';


export default function GroupsScreen() {
  const { practices, groups, selectedGroup: selectedGroupId } = useGlobalData();
  const selectedGroup = selectedGroupId ? groups.find(g => g.id === selectedGroupId) || null : null;
  const groupPractices = selectedGroup ? getPracticesForUser(selectedGroup.practiceIds, practices) : [];

  const practiceDates = useMemo(
    () =>
      Array.from(
        new Set(
          groupPractices.map(p =>
            new Date(p.dateTime).toISOString().slice(0, 10)
          )
        )
      ),
    [groupPractices]
  );

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  });
  

  const practicesOnDate = groupPractices.filter(
    p => new Date(p.dateTime).toISOString().slice(0, 10) === selectedDate
  );

  return (
    <ScreenContainer scrollable>
      <View style={{flexDirection: 'row',
                alignItems: 'flex-end', marginBottom: 10}}>
        <Image
          source={require('../assets/images/circle.png')}
          resizeMode="contain"
          style={styles.profile}
        />
        <Heading style={styles.groupName}>{selectedGroup?.name}</Heading>
      </View>
      <Paragraph style={styles.members}>{selectedGroup?.numberOfMembers} members</Paragraph>
      <Paragraph style={[styles.description]}>
        {selectedGroup?.description}
      </Paragraph>

      <Heading style={styles.upcomingLabel}>Upcoming Practices</Heading>
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
          <TouchableOpacity style={styles.practiceCard} key={practice.id + i}>
            <View style={{ marginVertical: 10 }}>
              <Subheading>{practice.name}</Subheading>
              <Paragraph>
                {parseDateTime(practice)} • {computeEstimatedDistance(practice)} {practice.units} • {computeEstimatedDuration(practice)}
              </Paragraph>
              <Button
                variant="small"
                onPress={() => {/* maybe navigate to detail or edit */}}
              >View</Button>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  setsContainer: {
    marginTop: Spacing.screenPadding / 8,
    gap: Spacing.screenPadding / 2,
  },
  practiceMeta: {
    marginBottom: Spacing.screenPadding / 6,
  },
  groupName: {
    marginBottom: Spacing.screenPadding / 4,
  },
  members: {
    marginBottom: Spacing.screenPadding / 4,
  },
  description: {
    marginBottom: Spacing.screenPadding / 4,
    fontStyle: 'normal',
  },
  upcomingLabel: {
    marginBottom: 0,
  },
  profile: {
    width: 50,
    height: 50,
    marginRight: Spacing.screenPadding / 3,
    borderRadius: 25,
    overflow: 'hidden',
  },
  weekView: {
    width: '100%',
    borderRadius: 12,
  },
  setList: {
    width: '100%',
    gap: Spacing.screenPadding / 2,
  },
  setItem: {
    width: '100%',
    padding: Spacing.screenPadding / 2,
  },
  practiceCard: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: Spacing.screenPadding / 2,
  },
});
