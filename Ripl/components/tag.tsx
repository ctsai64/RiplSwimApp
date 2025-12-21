import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface TagProps {
  label: string;
}

export const Tag: React.FC<TagProps> = ({ label }) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[
      styles.tag, 
      { 
        backgroundColor: colors.secondary, 
        borderRadius: spacing.borderRadius.tag,
        paddingVertical: spacing.buttonPadding.vertical,
        paddingHorizontal: spacing.buttonPadding.horizontal,
      }
    ]}>
      <Text style={[
        typography.tag, 
        { color: colors.primary, textTransform: 'uppercase', fontWeight: 'bold' }
      ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    marginRight: 8,
    marginVertical: 8,
    alignSelf: 'flex-start',
  },
});