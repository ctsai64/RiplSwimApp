import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useGlobalData } from '../context/GlobalDataContext';
import { WeekView } from '../components/weekview';
import { Frame1 } from '../components/frame';
import { Tag } from '../components/tag';
import { Users } from '../components/users';
import { TimelineItem } from '../components/timeline';
import { displayUsername } from '../utils/userHelpers';
import { getPracticesForUser, getPracticeDates, computeEstimatedDistance, computeEstimatedDuration, formatPracticeTime, formatYMD, formatPracticeMembers } from '../utils/practiceHelpers';

const navItems = [
  { label: 'Groups', route: '/groups' },
  { label: 'Timer', route: '/timer' },
  { label: 'Profile', route: '/profile' },
];

export default function HomeScreen() {
  const { colors, typography, spacing, isDark, toggleTheme } = useTheme();
  const { currentUser, practices } = useGlobalData();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatYMD(new Date()));

  const userPractices = useMemo(() => {
    if (!currentUser) return [];
    return getPracticesForUser(currentUser.practiceIds, practices);
  }, [currentUser, practices]);

  const practiceDates = useMemo(() => {
    return getPracticeDates(userPractices);
  }, [userPractices]);

  const selectedPractices = useMemo(() => {
    return userPractices.filter(p => {
      if (!p.dateTime) return false;
      const date = new Date(p.dateTime);
      if (isNaN(date.getTime())) return false;
      return formatYMD(date) === selectedDate;
    });
  }, [userPractices, selectedDate]);

  const menuStyles = useMemo(
    () => ({
      backgroundColor: colors.background,
      borderColor: colors.border,
      shadowColor: colors.text,
    }),
    [colors.background, colors.border, colors.text]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingHorizontal: spacing.screenPadding,}]}> 
      <View style={{ paddingHorizontal: spacing.screenPadding, paddingTop: spacing.screenPadding, paddingBottom: spacing.screenPadding / 2 }}> 
        <Pressable
          onPress={() => setMenuOpen((prev) => !prev)}
          style={[styles.menuButton, { borderColor: colors.border, backgroundColor: colors.background }]}
        >
          <Text style={[typography.paragraph, { color: colors.text }]}>Menu</Text>
        </Pressable>
      </View>

      {menuOpen && (
        <View
          style={[
            styles.menu,
            menuStyles,
            { marginHorizontal: spacing.screenPadding, top: spacing.screenPadding * 1.5 },
          ]}
        >
          <View style={[styles.menuRow, { padding: spacing.buttonPadding.vertical * 2 }]}>
            <Text style={[typography.paragraph, { color: colors.text }]}>Dark mode</Text>
            <Switch
              value={isDark}
              onValueChange={() => toggleTheme()}
              trackColor={{ false: colors.muted, true: colors.primary }}
              thumbColor={isDark ? colors.accent : '#f4f3f4'}
            />
          </View>

          <Pressable
            onPress={() => {
              setMenuOpen(false);
              router.push('/DesignSamples');
            }}
            style={[styles.menuRow, { padding: spacing.buttonPadding.vertical * 2 }]}
          >
            <Text style={[typography.paragraph, { color: colors.text }]}>Design Samples</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setMenuOpen(false);
              router.push('/my-plan');
            }}
            style={[styles.menuRow, { padding: spacing.buttonPadding.vertical * 2 }]}
          >
            <Text style={[typography.paragraph, { color: colors.text }]}>My Plan</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setMenuOpen(false);
              router.push('/plan-practice');
            }}
            style={[styles.menuRow, { padding: spacing.buttonPadding.vertical * 2 }]}
          >
            <Text style={[typography.paragraph, { color: colors.text }]}>Plan Practice</Text>
          </Pressable>
        </View>
      )}
        <Text style={[typography.paragraph, { color: colors.textSecondary }]}>
          Welcome, {currentUser ? displayUsername(currentUser) : 'Guest'}
        </Text>
        <Text style={[typography.title, { color: colors.text }]}>Let&apos;s make a splash.</Text>
        <WeekView
          practiceDates={practiceDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <Text style={[typography.subheading, { color: colors.text }]}>Workouts</Text>
          <ScrollView showsVerticalScrollIndicator={false}> 
        {selectedPractices.length > 0 && (
          <View style={{ marginTop: spacing.screenPadding / 5, paddingRight: spacing.screenPadding/2 }}>
            {selectedPractices.map((practice, index) => (
              <TimelineItem 
                key={practice.id} 
                isLast={index === selectedPractices.length - 1}
                isCompleted={false}
              >
                <Frame1>
                  <Text style={[typography.heading, { color: colors.text }]}>
                    {practice.name}
                  </Text>
                  <Text style={[typography.paragraph, { color: colors.textSecondary }]}>
                    {computeEstimatedDistance(practice)} {practice.units} • {computeEstimatedDuration(practice)}
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.buttonPadding.horizontal }}>
                    {practice.type.map((type, idx) => (
                      <Tag key={idx} label={type} />
                    ))}
                  </View>
                  <Users key={practice.id} usersText={formatPracticeMembers(practice)} />
                </Frame1>
              </TimelineItem>
            ))}
          </View>
        )}

        {selectedPractices.length === 0 && (
          <View style={{ marginTop: spacing.screenPadding, alignItems: 'center' }}>
            <Text style={[typography.paragraph, { color: colors.textSecondary }]}>
              No practices scheduled for this day.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.bottomNav, { paddingHorizontal: spacing.screenPadding / 2 }]}> 
        {navItems.map((item) => (
          <Pressable
            key={item.route}
            style={styles.navItem}
            onPress={() => router.push(item.route)}
          >
            <Text style={[typography.paragraph, { color: '#FFFFFF' }]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  menu: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
    borderWidth: 1,
    borderRadius: 16,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});
