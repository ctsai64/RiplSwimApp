import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Heading, MediumText, Paragraph, Title } from '../components/Typography';
import { Button } from '../components/Button';
import { Frame2 } from '../components/Frame2';
import { Spacing } from '../constants/design';

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const hundredths = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
};

export default function TimingScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [splits, setSplits] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const baselineRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
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

  const handleEndLog = () => {
    stopTimer();
    setElapsedMs(0);
    setSplits([]);
    baselineRef.current = null;
  };

  const mainActionLabel = isRunning ? 'Stop' : 'Start';
  const latestSplit = useMemo(() => (splits.length ? splits[splits.length - 1] : null), [splits]);

  return (
    <ScreenContainer scrollable>
      <Heading style={styles.heading}>Timing Log</Heading>
      <MediumText style={styles.meta}>Distance: 500m</MediumText>
      <MediumText style={styles.meta}>Stroke: Freestyle</MediumText>
      <MediumText style={styles.meta}>Split Target: 50m</MediumText>

      <Title style={styles.time}>{formatTime(elapsedMs)}</Title>
      {latestSplit !== null ? (
        <Paragraph style={styles.splitMeta}>Last split: {formatTime(latestSplit)}</Paragraph>
      ) : null}

      <View style={styles.buttonRow}>
        <Button variant="small" style={styles.buttonGrow} onPress={() => (isRunning ? stopTimer() : startTimer())}>
          {mainActionLabel}
        </Button>
        <Button variant="small" style={styles.buttonGrow} onPress={handleSplit}>
          Split
        </Button>
        <Button variant="small" style={styles.buttonGrow} onPress={handleUndoSplit}>
          Undo split
        </Button>
      </View>

      <Button variant="horizontal" style={styles.endButton} onPress={handleEndLog}>
        End Log
      </Button>

      <View style={styles.splitsList}>
        {splits.map((splitTime, index) => (
          <Frame2 key={`${splitTime}-${index}`} style={styles.splitItem}>
            <MediumText>Split {index + 1}</MediumText>
            <Paragraph>{formatTime(splitTime)}</Paragraph>
          </Frame2>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: Spacing.screenPadding / 2,
  },
  meta: {
    marginBottom: Spacing.screenPadding / 4,
  },
  time: {
    marginTop: Spacing.screenPadding,
    marginBottom: Spacing.screenPadding / 2,
    alignSelf: 'flex-start',
  },
  splitMeta: {
    marginBottom: Spacing.screenPadding,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: Spacing.screenPadding / 2,
    marginBottom: Spacing.screenPadding,
  },
  buttonGrow: {
    flexGrow: 1,
    minWidth: '40%',
  },
  endButton: {
    marginBottom: Spacing.screenPadding,
  },
  splitsList: {
    width: '100%',
    gap: Spacing.screenPadding / 2,
  },
  splitItem: {
    width: '100%',
  },
});
