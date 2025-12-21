import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type TimelineItemProps = {
  isLast: boolean;
  isCompleted?: boolean;
  children: React.ReactNode;
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  isLast,
  isCompleted,
  children,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={styles.timelineEntry}>
      <View style={styles.timelineColumn}>
        <View 
          style={[
            styles.timelineCircle, 
            { 
              backgroundColor: isCompleted ? colors.accent : colors.muted,
              marginTop: spacing.cardPadding *2
            }
          ]} 
        >
          {isCompleted && (
             <View style={styles.checkmarkPlaceholder} /> 
          )}
        </View>

        {!isLast && (
          <View 
            style={[
              styles.timelineLine, 
              { 
                backgroundColor: colors.muted,
                top: (spacing.cardPadding *2) + CIRCLE_SIZE*1.5,
              }
            ]} 
          />
        )}
      </View>
      <View style={[
        styles.contentColumn, 
        { marginBottom: isLast ? 0 : spacing.screenPadding }
      ]}>
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
    bottom: -24,
    width: LINE_WIDTH,
    borderRadius: LINE_WIDTH / 2,
    zIndex: 1,
  },
  contentColumn: {
    flex: 1,
  },
  checkmarkPlaceholder: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '-45deg' }],
    marginBottom: 2,
  }
});