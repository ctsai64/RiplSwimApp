import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '../constants/design';

interface ProgressBarProps {
  currentStep: 1 | 2 | 3;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((step) => (
        <View
          key={step}
          style={[
            styles.circle,
            step <= currentStep && styles.filledCircle,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.screenPadding / 2,
    gap: Spacing.screenPadding / 4,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    backgroundColor: 'transparent',
  },
  filledCircle: {
    backgroundColor: '#d9d9d9',
  },
});
