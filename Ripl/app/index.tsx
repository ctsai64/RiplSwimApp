import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { useGlobalData } from '../context/GlobalDataContext';
import { computeEstimatedDistance, computeEstimatedDuration, parseDateTime, getPracticesForUser } from '../utils/practiceHelpers';
import { displayUsername, getGroupsForUser } from '../utils/userHelpers';
import { Title, Heading, Subheading, Paragraph } from '../components/Typography';
import { Frame1 } from '../components/Frame1';
import { Button } from '../components/Button';
import { Spacing, LightColors, TypographyScale } from '../constants/design';

export default function LandingScreen() {
  const router = useRouter();

  const { practices, currentUser, groups, setSelectedGroup } = useGlobalData();
  const userPractices = currentUser ? getPracticesForUser(currentUser.practiceIds, practices) : [];
  const userGroups = currentUser ? getGroupsForUser(currentUser.groupIds, groups) : [];
  const workouts = userPractices.map((practice) => ({
    name: practice.name,
    time: parseDateTime(practice),
    distance: `${computeEstimatedDistance(practice)} ${practice.units}`,
    duration: `${computeEstimatedDuration(practice)} min`
  }));

  return (
    <ScreenContainer scrollable>
      <Title style={[styles.title, { color: LightColors.text }]}>
        Welcome, {currentUser ? displayUsername(currentUser) : 'Guest'}.
      </Title>
      <Subheading style={{ color: LightColors.text }}>MY PLAN</Subheading>

      <Frame1
        style={styles.workoutFrame}
        onPress={() => router.push('/my-plan')}
      >
        {workouts?.map((workout, index) => (
          <View
            key={workout.name}
            style={[
              styles.workoutEntry,
              index < workouts.length - 1 && styles.entryWithLine
            ]}
          >
            <View style={styles.timelineColumn}>
              <View style={[styles.timelineCircle, { backgroundColor: LightColors.frameBackground }]} />
              {index < workouts.length - 1 && (
                <View style={[styles.timelineLine, { borderColor: LightColors.frameBackground }]} />
              )}
            </View>

            <View>
              <Heading style={{ color: LightColors.text }}>{workout.name}</Heading>
              <Paragraph style={{ color: LightColors.text, opacity: 0.7 }}>
                {workout.time}
              </Paragraph>
              <Paragraph style={{ color: LightColors.text, opacity: 0.7 }}>
                {workout.distance} • {workout.duration}
              </Paragraph>
            </View>
          </View>
        ))}

        <Button
          variant="horizontal"
          style={styles.addButton} 
          onPress={() => router.push('/plan-practice')}
        >
          ADD WORKOUT +
        </Button>
      </Frame1>


      <View style={styles.exploreSection}>
        <Subheading style={{ color: LightColors.text }}>MY GROUPS</Subheading>
        <View style={styles.groupsContainer}>
          {userGroups.map((group) => (
            <Button
              key={group.id}
              variant="small"
              style={styles.groupButton}
              onPress={() => {
                setSelectedGroup(group.id);
                router.push('/groups');
              }}
            >
              {group.name}
            </Button>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: Spacing.screenPadding,
  },
  workoutFrame: {
    width: '100%',
    marginBottom: Spacing.screenPadding,
  },
  workoutEntry: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  entryWithLine: {
    paddingBottom: Spacing.screenPadding / 2,
  },
  timelineColumn: {
    width: 50,
    alignItems: 'center',
    marginRight: Spacing.screenPadding / 3,
  },
  timelineCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  timelineLine: {
    flex: 1,
    width: 1,
    borderLeftWidth: 6,
    borderStyle: 'dotted',
    marginTop: -2,
    marginBottom: -10, //(Spacing.screenPadding / 4),
  },
  addButton: {
    backgroundColor: LightColors.frameBackground,
    borderRadius: Spacing.borderRadius.button,
    marginTop: Spacing.screenPadding / 2,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: LightColors.text,
    ...TypographyScale.mediumText,
    fontWeight: '700',
  },
  exploreSection: {
    width: '100%',
  },
  exploreButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exploreButton: {
    marginRight: Spacing.screenPadding / 2,
    marginBottom: Spacing.screenPadding / 2,
  },
  groupsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.screenPadding / 2,
  },
  groupButton: {
    marginRight: Spacing.screenPadding / 2,
    marginBottom: Spacing.screenPadding / 2,
  },
});