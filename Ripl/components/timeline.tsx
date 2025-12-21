import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type TimelineItemProps = {
  isLast: boolean;
  isTimeMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  children: React.ReactNode;
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  isLast,
  isTimeMode,
  isSelected,
  onSelect,
  children,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={styles.timelineEntry}>
      <View style={styles.timelineColumn}>
        {/* Solid Circle UI */}
        <Pressable 
          disabled={!isTimeMode}
          onPress={onSelect}
          style={[
            styles.timelineCircle, 
            { 
              backgroundColor: isSelected ? colors.accent : colors.muted, // Solid background
              marginTop: spacing.cardPadding * 2
            }
          ]} 
        >
          {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
        </Pressable>

        {!isLast && (
          <View 
            style={[
              styles.timelineLine, 
              { 
                backgroundColor: colors.muted,
                // Ensures line starts exactly from the circle bottom
                top: (spacing.cardPadding * 2) + CIRCLE_SIZE,
                bottom: -spacing.screenPadding, 
              }
            ]} 
          />
        )}
      </View>
      <View style={[styles.contentColumn, { marginBottom: isLast ? 0 : spacing.screenPadding }]}>
        {children}
      </View>
    </View>
  );
};

const CIRCLE_SIZE = 32;
const LINE_WIDTH = 4;

const styles = StyleSheet.create({
  timelineEntry: {
    width: '100%',
    flexDirection: 'row',
  },
  timelineColumn: {
    width: CIRCLE_SIZE + 16,
    alignItems: 'center',
  },
  timelineCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    position: 'absolute',
    width: LINE_WIDTH,
    borderRadius: LINE_WIDTH / 2,
    zIndex: 1,
  },
  contentColumn: {
    flex: 1,
  },
});