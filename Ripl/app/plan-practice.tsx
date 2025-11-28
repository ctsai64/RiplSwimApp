import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading } from '../components/Typography';
import { Spacing, Colors } from '../constants/design';

export default function PlanPracticeScreen() {
  return (
    <ScreenContainer scrollable>
      <Heading style={styles.heading}>Set Time</Heading>
      <TextInput
        style={styles.input}
        placeholder="Enter set time..."
        placeholderTextColor={Colors.text}
      />

      <Heading style={styles.heading}>Details</Heading>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter details..."
        placeholderTextColor={Colors.text}
        multiline
        numberOfLines={4}
      />

      <Heading style={styles.heading}>People</Heading>
      <TextInput
        style={styles.input}
        placeholder="Enter people..."
        placeholderTextColor={Colors.text}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: Spacing.screenPadding,
    marginBottom: Spacing.screenPadding / 2,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.borderRadius.button,
    padding: Spacing.screenPadding / 2,
    color: Colors.text,
    fontSize: 15.79,
    marginBottom: Spacing.screenPadding,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

