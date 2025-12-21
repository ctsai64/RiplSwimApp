import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Frame1 } from '../components/frame';
import { Tag } from '../components/tag';
import { UserGroup } from '../components/users';
import { TimelineItem } from '@/components/timeline';

export default function DesignSamples() {
  const { colors, typography, spacing } = useTheme();
  
  return (
    <View style={[styles.container, { padding: spacing.screenPadding }]}>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginBottom: spacing.screenPadding }]}>Here are samples of styles and components used in the app</Text>

        <Text style={[typography.title, { color: colors.text }]}> 
        This is Title Font
      </Text>

        <Text style={[typography.heading, { color: colors.text }]}> 
        This is Heading Font
      </Text>

        <Text style={[typography.subheading, { color: colors.text }]}> 
        This is Subheading Font
      </Text>
      
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginTop: spacing.screenPadding / 2 }]}>
        This is Paragraph Font
      </Text>
      
      <Text style={[typography.time, { color: colors.accent, marginTop: spacing.screenPadding / 2 }]}>
        This is another font
      </Text>
      
      <TimelineItem isLast={false} isCompleted={true}>
        <Frame1 style={{ marginTop: spacing.screenPadding }}>
          <Text style={[typography.heading, { color: colors.text }]}>
            Frame
          </Text>
          <Text style={[typography.subheading, { color: colors.textSecondary}]}>
            3000 yd   1 hr 30 min
          </Text>
          <Tag label="Sample Tag" />
            <UserGroup usersText="User 1 and 2 others going" />
        </Frame1>
      </TimelineItem>
      <TimelineItem isLast={true}>
        <Frame1 style={{ marginTop: spacing.screenPadding }}>
          <Text style={[typography.heading, { color: colors.text }]}>
            Frame
          </Text>
          <Text style={[typography.subheading, { color: colors.textSecondary}]}>
            3000 yd   1 hr 30 min
          </Text>
          <Tag label="Sample Tag" />
            <UserGroup usersText="User 1 and 2 others going" />
        </Frame1>
      </TimelineItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
