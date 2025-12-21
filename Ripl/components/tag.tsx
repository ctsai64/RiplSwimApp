import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface TagProps {
  label: string;
  onPress?: () => void;
  isSelected?: boolean;
}

export const Tag: React.FC<TagProps> = ({ label, onPress, isSelected = false }) => {
  const { colors, spacing, typography } = useTheme();

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component 
      onPress={onPress}
      style={[
        styles.tag, 
        { 
          backgroundColor: isSelected ? colors.primary : colors.secondary, 
          borderRadius: spacing.borderRadius.tag,
          paddingVertical: spacing.buttonPadding.vertical,
          paddingHorizontal: spacing.buttonPadding.horizontal,
        }
      ]}
    >
      <Text style={[
        typography.tag, 
        { color: isSelected ? '#FFFFFF' : colors.primary, textTransform: 'uppercase', fontWeight: 'bold' }
      ]}>
        {label}
      </Text>
    </Component>
  );
};

const styles = StyleSheet.create({
  tag: {
    marginRight: 2,
    marginVertical: 8,
    alignSelf: 'flex-start',
  },
});