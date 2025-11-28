import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, Paragraph } from '../components/Typography';
import { Spacing } from '../constants/design';

export default function GroupsScreen() {
  return (
    <ScreenContainer scrollable>
      <Heading style={styles.heading}>Groups</Heading>
      <Paragraph style={styles.placeholder}>
        Groups & team features placeholder
      </Paragraph>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: Spacing.screenPadding,
  },
  placeholder: {
    marginTop: Spacing.screenPadding,
  },
});

