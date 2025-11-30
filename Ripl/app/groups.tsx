import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Frame1 } from '../components/Frame1';
import { Heading, Subheading, MediumText, Paragraph } from '../components/Typography';
import { Spacing } from '../constants/design';
import { useTheme } from '../context/ThemeContext';
import { PRACTICES, PracticeSet } from '../constants/practices';
import { Button } from '../components/Button';


const sets = ['Warm-up socials', 'Main set coordination', 'Cool-down recap'];

export default function GroupsScreen() {
  const { colors } = useTheme();
  const currentPractice = PRACTICES[0];

  return (
    <ScreenContainer scrollable>
      <View style={{flexDirection: 'row',
                alignItems: 'flex-end', marginBottom: 10}}>
        <Image
          source={require('../assets/images/circle.png')}
          resizeMode="contain"
          style={{ width: 50, height: 50, marginRight: Spacing.screenPadding / 3 }}
        />
        <Heading style={styles.groupName}>Group Name</Heading>
      </View>
      <Paragraph style={styles.members}>90 members</Paragraph>
      <Paragraph style={[styles.description]}>
        We are a . We practice at<br/> <br/>Meets: <br/>MON 5:30 - 7:00 p.m. <br/>WEDS 5:15 - 6:45 p.m. <br/>SAT 9:00 - 10 a.m.
      </Paragraph>

      <Heading style={styles.upcomingLabel}>Upcoming Practices</Heading>
      <Image
        source={require('../assets/images/weekview.png')}
        style={styles.weekView}
        resizeMode="contain"
      />

<View style={styles.setsContainer}>
            {currentPractice.sets.map((set: PracticeSet) => (
              <Frame1 key={set.name} style={styles.setItem}>
                  <Subheading>{set.name}</Subheading>
                  <Paragraph style={styles.practiceMeta}>{currentPractice.dateLabel}</Paragraph>
                  <Paragraph style={styles.practiceMeta}>{currentPractice.people}</Paragraph>
                  <MediumText>{set.description}</MediumText>
                  <Button
                    variant="small"
                  >
                    Join
                  </Button>
              </Frame1>
            ))}
          </View>

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
});
