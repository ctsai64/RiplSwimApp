import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing, LightColors } from '../constants/design';

type TimelineItemProps = {
  isLast: boolean;
  circleColor?: string;
  lineColor?: string;
  children: React.ReactNode;
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  isLast,
  circleColor = LightColors.frameBackground,
  lineColor = LightColors.frameBackground,
  children,
}) => {
  return (
    <View style={[
        styles.timelineEntry, 
        !isLast && styles.entryPadding
    ]}>
      <View style={styles.timelineColumn}>
        <View style={[styles.timelineCircle, { backgroundColor: circleColor }]} />

        {!isLast && (
          <View 
            style={[
              styles.timelineLine, 
              { backgroundColor: lineColor }
            ]} 
          />
        )}
      </View>
      <View style={styles.contentColumn}>
        {children}
      </View>
    </View>
  );
};

const CIRCLE_SIZE = 40;
const LINE_WIDTH = 5;

const styles = StyleSheet.create({
  timelineEntry: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  entryPadding: {
     marginBottom: Spacing.screenPadding / 2, 
  },
  timelineColumn: {
    width: 40,
    alignItems: 'center',
    marginRight: Spacing.screenPadding / 3,
    alignSelf: 'stretch', 
    position: 'relative',
  },
  timelineCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    zIndex: 2,
    
    position: 'absolute',
    top: 0,
  },
  timelineLine: {
    position: 'absolute',
    top: CIRCLE_SIZE - (CIRCLE_SIZE / 2) + 2,
    bottom: -1 * (Spacing.screenPadding / 2) - 10,
    width: LINE_WIDTH,
    backgroundColor: 'grey',
    zIndex: 1,
  },
  contentColumn: {
    flex: 1,
  }
});