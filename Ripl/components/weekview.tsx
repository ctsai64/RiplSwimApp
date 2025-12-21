import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

function todayLocal() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

function startOfWeek(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function formatYMD(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function WeekView({
  practiceDates,
  selectedDate,
  onSelectDate,
}: {
  practiceDates: string[];
  selectedDate: string;
  onSelectDate: (d: string) => void;
}) {
  const { colors, typography, spacing } = useTheme();
  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = useMemo(() => {
    const anchor = todayLocal();
    const d = startOfWeek(anchor);
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);

  const monthLabel = weekStart.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={[styles.wrapper, { marginVertical: spacing.screenPadding }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setWeekOffset(w => w - 1)}>
          <Text style={[styles.arrow, { color: colors.primary }]}>‹</Text>
        </TouchableOpacity>

        <Text style={[typography.tag, { color: colors.textSecondary }]}>
          {monthLabel.toUpperCase()}
        </Text>

        <TouchableOpacity onPress={() => setWeekOffset(w => w + 1)}>
          <Text style={[styles.arrow, { color: colors.primary }]}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {Array.from({ length: 7 }).map((_, i) => {
          const d = new Date(weekStart);
          d.setDate(weekStart.getDate() + i);

          const ymd = formatYMD(d);
          const hasPractice = practiceDates.includes(ymd);
          const isSelected = ymd === selectedDate;

          return (
            <TouchableOpacity
              key={ymd}
              onPress={() => onSelectDate(ymd)}
              style={styles.day}
            >
              <Text style={[typography.tag, { color: colors.textSecondary, marginBottom: 6 }]}>
                {d.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase()}
              </Text>

              <View
                style={[
                  styles.circle,
                  { backgroundColor: colors.border },
                  hasPractice && { backgroundColor: colors.secondary },
                  isSelected && { backgroundColor: colors.accent },
                ]}
              >
                <Text
                  style={[
                    typography.paragraph,
                    { color: hasPractice ? colors.primary : colors.text },
                    isSelected && { color: '#FFFFFF' },
                  ]}
                >
                  {d.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  arrow: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '300',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});