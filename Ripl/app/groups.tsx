import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Frame2 } from '../components/Frame2';
import { Heading, MediumText, Paragraph } from '../components/Typography';
import { Spacing } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

const sets = ['Warm-up socials', 'Main set coordination', 'Cool-down recap'];

export default function GroupsScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer scrollable>
      <View style={[styles.avatar, { borderColor: colors.border }]} />
      <Heading style={styles.groupName}>Group Name</Heading>
      <Paragraph style={styles.members}># members</Paragraph>
      <Paragraph style={styles.description}>
        group description
      </Paragraph>

      <MediumText style={styles.upcomingLabel}>Upcoming Practices</MediumText>
      <Image
        source={require('../assets/images/weekview.png')}
        style={styles.weekView}
        resizeMode="contain"
      />

      <View style={styles.setList}>
        {sets.map((set) => (
          <Frame2 key={set} style={styles.setItem}>
            <Paragraph>{set}</Paragraph>
          </Frame2>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    marginBottom: Spacing.screenPadding / 2,
  },
  groupName: {
    marginBottom: Spacing.screenPadding / 4,
  },
  members: {
    marginBottom: Spacing.screenPadding / 4,
  },
  description: {
    marginBottom: Spacing.screenPadding,
  },
  upcomingLabel: {
    marginBottom: Spacing.screenPadding / 3,
  },
  weekView: {
    width: '100%',
    borderRadius: 12,
    marginVertical: Spacing.screenPadding / 3,
  },
  setList: {
    width: '100%',
    gap: Spacing.screenPadding / 2,
  },
  setItem: {
    width: '100%',
  },
});
