import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer, TimelineItem } from '../components';
import { useGlobalData } from '../context/GlobalDataContext';
import { computeEstimatedDistance, computeEstimatedDuration, parseDateTime, getPracticesForUser } from '../utils/practiceHelpers';
import { displayUsername, getGroupsForUser } from '../utils/userHelpers';
import { Title, Heading, Subheading, Paragraph } from '../components/Typography';
import { Frame1 } from '../components/Frame1';
import { Button } from '../components/Button';
import { Spacing, LightColors } from '../constants/design';

export default function LandingScreen() {
  const router = useRouter();

  const { practices, currentUser, groups, setSelectedGroup } = useGlobalData();
  const userPractices = (currentUser ? getPracticesForUser(currentUser.practiceIds, practices) : []).map((practice) => ({
    name: practice.name,
    time: parseDateTime(practice),
    distance: `${computeEstimatedDistance(practice)} ${practice.units}`,
    duration: computeEstimatedDuration(practice),
  }));
  const userGroups = currentUser ? getGroupsForUser(currentUser.groupIds, groups) : [];

  return (
    <ScreenContainer scrollable>
      <Title>Welcome, {currentUser ? displayUsername(currentUser) : 'Guest'}.</Title>
      <Subheading>MY PLAN</Subheading>
      <Frame1 onPress={() => router.push('/my-plan')}>
      {userPractices?.map((practice, index) => (
        <TimelineItem 
          key={practice.name} 
          isLast={index === userPractices.length - 1}
          circleColor={LightColors.frameBackground}
          lineColor={LightColors.frameBackground}
        >
          <Heading>{practice.name}</Heading>
          <Paragraph>{practice.time}</Paragraph>
          <Paragraph>{practice.distance} • {practice.duration}</Paragraph>
        </TimelineItem>
      ))}
        <Button variant="horizontal" onPress={() => router.push('/plan-practice')}>ADD WORKOUT + </Button>
      </Frame1>

      <View>
        <Subheading style={{marginVertical: Spacing.screenPadding}}>MY GROUPS</Subheading>
        <View style={styles.groupsContainer}>
          {userGroups.map((group) => (
            <Button
              key={group.id}
              variant="small"
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
      <View>
        <Subheading style={{marginVertical: Spacing.screenPadding}}>EXPLORE</Subheading>
        <View style={styles.groupsContainer}>
          <Button variant="small" onPress={() => router.push('/timing')}>Timer</Button>
          <Button variant="small" onPress={() => router.push('/edit-practice')}>Edit Practice</Button>
          <Button variant="small" onPress={() => router.push('/plan-practice')}>Plan Practice</Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  workoutEntry: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  exploreButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  groupsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});