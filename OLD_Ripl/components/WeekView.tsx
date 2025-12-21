import React, { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LightColors } from '../constants/design'
import { useTheme } from '../context/ThemeContext'

function todayLocal() {
  const t = new Date()
  return new Date(t.getFullYear(), t.getMonth(), t.getDate())
}

function startOfWeek(date: Date) {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  return d
}

function formatYMD(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function WeekView({
  practiceDates,
  selectedDate,
  onSelectDate,
}: {
  practiceDates: string[]
  selectedDate: string
  onSelectDate: (d: string) => void
}) {
  const anchor = todayLocal()
  const { colors } = useTheme()
  const [weekOffset, setWeekOffset] = useState(0)

  const weekStart = useMemo(() => {
    const d = startOfWeek(anchor)
    d.setDate(d.getDate() + weekOffset * 7)
    return d
  }, [weekOffset])

  const monthLabel = weekStart.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setWeekOffset(w => w - 1)}>
          <Text style={[styles.arrow, { color: colors.highlight }]}>‹</Text>
        </TouchableOpacity>

        <Text style={[styles.month, { color: colors.text }]}>{monthLabel.toUpperCase()}</Text>

        <TouchableOpacity onPress={() => setWeekOffset(w => w + 1)}>
          <Text style={[styles.arrow, { color: colors.highlight }]}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {Array.from({ length: 7 }).map((_, i) => {
          const d = new Date(weekStart)
          d.setDate(weekStart.getDate() + i)

          const ymd = formatYMD(d)
          const hasPractice = practiceDates.includes(ymd)
          const isSelected = ymd === selectedDate

          return (
            <TouchableOpacity
              key={ymd}
              onPress={() => onSelectDate(ymd)}
              style={styles.day}
            >
              <Text style={styles.weekday}>
                {d.toLocaleDateString(undefined, { weekday: 'short' })}
              </Text>

              <View
                style={[
                  styles.circle,
                  hasPractice && styles.practice,
                  isSelected && styles.selected,
                ]}
              >
                <Text
                  style={[
                    styles.date,
                    { color: colors.text },
                    isSelected && { color: colors.white },
                  ]}
                >
                  {d.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  arrow: {
    fontSize: 24,
    fontWeight: '600',
  },
  month: {
    fontSize: 14,
    fontWeight: '600',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    alignItems: 'center',
    width: 44,
  },
  weekday: {
    fontSize: 12,
    marginBottom: 6,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LightColors.backgroundSecondary,
  },
  practice: {
    backgroundColor: LightColors.secondaryHighlight,
  },
  selected: {
    backgroundColor: LightColors.highlight,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
  },
})
