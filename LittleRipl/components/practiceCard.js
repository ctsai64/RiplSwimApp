import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { TypographyScale } from '../constants/design';
import { Tag } from './tag';

const HeatsGroup = ({ data }) => {
  const { colors } = useTheme();
  const { time, heat, track, tag, members } = data;
  
  const dynamicStyles = {
    card: {
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    textMain: { color: colors.text },
    textMuted: { color: colors.textSecondary },
    avatarWith: { color: colors.muted }
  };

  return (
    <View style={[styles.card, dynamicStyles.card]}>
      <View style={styles.headerRow}>
        <Text style={[styles.timeText, dynamicStyles.textMain]}>{time}</Text>
        <Text style={[styles.subText, dynamicStyles.textMuted]}>{heat}</Text>
        <Text style={[styles.subText, dynamicStyles.textMuted]}>{track}</Text>
      </View>

      <View style={styles.footerRow}>
        <Tag label={tag} />
        
        <View style={styles.avatarSection}>
          <View style={styles.avatarStack}>
            <View style={[styles.ellipse, { backgroundColor: colors.muted, borderColor: colors.background }]} />
            <View style={[styles.ellipse, styles.ellipseOverlap, { backgroundColor: colors.muted, borderColor: colors.background }]} />
          </View>
          <Text style={[styles.withText, dynamicStyles.avatarWith]}>
            With <Text style={styles.userText}>{members[0]}</Text> and {members.length - 1} others
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 293,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 24,
    gap: 12,
    marginBottom: 16,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  timeText: TypographyScale.time,
  subText: { 
    fontFamily: TypographyScale.paragraph.fontFamily,
    fontSize: TypographyScale.paragraph.fontSize,
    width: 62 
  },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  
  avatarSection: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  avatarStack: { width: 29, height: 27 },
  ellipse: { width: 21, height: 21, borderRadius: 10.5, borderWidth: 2, position: 'absolute' },
  ellipseOverlap: { left: 8, top: 6 },
  withText: TypographyScale.paragraph,
  userText: TypographyScale.user,
});

export default HeatsGroup;