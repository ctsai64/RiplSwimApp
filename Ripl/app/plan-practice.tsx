import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function PlanPracticeScreen() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const totalCells = Math.ceil((firstDayIndex + daysInMonth) / 7) * 7;
    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - firstDayIndex + 1;
      return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
    });
  }, []);

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}> 
      <ScrollView contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: spacing.screenPadding * 2 }}>
        <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 2 }]}>Let&apos;s find the time to swim.</Text>

        <View style={styles.calendarHeader}>
          <Text style={[typography.paragraph, { color: colors.textSecondary }]}>Current Month</Text>
        </View>

        <View style={styles.calendar}>
          {DAYS.map((day) => (
            <Text key={day} style={[typography.tag, styles.calendarDayLabel, { color: colors.textSecondary }]}>
              {day}
            </Text>
          ))}
          {calendarDays.map((day, index) => {
            const isSelected = selectedDate === day;
            return (
              <TouchableOpacity
                key={`${day}-${index}`}
                accessibilityRole="button"
                style={[
                  styles.calendarCell,
                  {
                    borderColor: colors.border,
                    backgroundColor: isSelected ? colors.accent : 'transparent',
                  },
                ]}
                disabled={!day}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[typography.paragraph, { color: isSelected ? '#FFFFFF' : colors.textSecondary }]}>
                  {day ?? ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.buttonHost, { paddingBottom: spacing.screenPadding, paddingHorizontal: spacing.screenPadding }]}> 
        <View style={[styles.buttonRow, { gap: spacing.screenPadding / 2 }]}> 
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={() => router.push('/plan-practice-depth')}>
            <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.border }]} onPress={() => router.push('/plan-practice-depth')}>
            <Text style={[typography.paragraph, { color: colors.text }]}>Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  calendarHeader: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  calendar: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  calendarDayLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    marginBottom: 8,
  },
  calendarCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 12,
  },
  buttonHost: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
});
