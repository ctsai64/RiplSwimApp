import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const hundredths = Math.floor((ms % 1000) / 10);

  if (minutes > 0) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
  }
  return `${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
}

export default function TimerScreen() {
  const { colors, typography, spacing } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [splits, setSplits] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const baselineRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const startTimer = () => {
    if (isRunning) return;
    baselineRef.current = Date.now() - elapsedMs;
    intervalRef.current = setInterval(() => {
      if (baselineRef.current) {
        setElapsedMs(Date.now() - baselineRef.current);
      }
    }, 100);
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
    setIsRunning(false);
  };

  const handleSplit = () => {
    if (!isRunning) return;
    setSplits((prev) => [...prev, elapsedMs]);
  };

  const handleUndoSplit = () => {
    setSplits((prev) => prev.slice(0, -1));
  };

  const mainActionLabel = isRunning ? 'Stop' : 'Start';
  const latestSplit = useMemo(() => (splits.length ? splits[splits.length - 1] : null), [splits]);

  const buttonBase = {
    paddingVertical: spacing.buttonPadding.vertical * 2,
    paddingHorizontal: spacing.screenPadding / 2,
    borderRadius: spacing.borderRadius.card,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  } as const;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.screenPadding }]}> 
      <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 2 }]}>Timer</Text>

      <View style={{ marginTop: spacing.screenPadding }}>
        <Text style={[typography.heading, { color: colors.textSecondary, marginBottom: spacing.screenPadding / 4 }]}>Split</Text>
        <Text style={[typography.title, { color: colors.text }]}>{latestSplit !== null ? formatTime(latestSplit) : '—'}</Text>
      </View>

      <View style={{ marginTop: spacing.screenPadding / 2 }}>
        <Text style={[typography.heading, { color: colors.textSecondary, marginBottom: spacing.screenPadding / 4 }]}>Elapsed</Text>
        <Text style={[typography.title, { color: colors.text }]}>{formatTime(elapsedMs)}</Text>
      </View>

      <View style={[styles.buttonRow, { gap: spacing.screenPadding / 2, marginTop: spacing.screenPadding }]}> 
        <Pressable
          style={[buttonBase, { backgroundColor: isRunning ? colors.secondary : colors.primary }]}
          onPress={() => (isRunning ? stopTimer() : startTimer())}
        >
          <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>{mainActionLabel}</Text>
        </Pressable>
        <Pressable style={[buttonBase, { backgroundColor: colors.border }]} onPress={handleUndoSplit}>
          <Text style={[typography.paragraph, { color: colors.text }]}>Undo</Text>
        </Pressable>
        <Pressable style={[buttonBase, { backgroundColor: colors.accent }]} onPress={handleSplit}>
          <Text style={[typography.paragraph, { color: '#FFFFFF', fontWeight: '700' }]}>Split</Text>
        </Pressable>
      </View>

      {splits.length > 0 && (
        <View style={{ marginTop: spacing.screenPadding }}>
          <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 4 }]}>Splits</Text>
          {splits.map((s, idx) => (
            <Text key={idx} style={[typography.paragraph, { color: colors.textSecondary, marginBottom: 4 }]}>
              {idx + 1}. {formatTime(s)}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
