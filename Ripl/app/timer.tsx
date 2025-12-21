import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useGlobalData } from '../context/GlobalDataContext';
import { EventSettingsSheet, TimingConfig } from '../components/eventSettings';
import { Frame1 } from '../components/frame';

export default function Timer() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();
  const { currentUser, addSplitToUser } = useGlobalData();

  const [showSettings, setShowSettings] = useState(true);
  const [config, setConfig] = useState<TimingConfig | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const displayName = (name: string) => name ? name.charAt(0).toUpperCase() + name.slice(1) : '';

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startTimer = () => {
    const startTime = Date.now() - elapsedTime;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
  };

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const handleRecordSplit = (username: string) => {
    if (!config) return;
    const split = {
      instance: new Date().toISOString(),
      distance: config.distance,
      stroke: config.stroke,
      time: elapsedTime,
      username,
    };
    addSplitToUser(username, split);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[typography.tag, { fontWeight: 'bold' }]}>Timed Session</Text>
        <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.iconBtn}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.screenPadding }}>
        {config && (
          <View style={styles.eventInfo}>
            <Text style={[typography.title]}>
              {config.distance}{config.units === 'yards' ? 'Y' : 'M'} {config.stroke}
            </Text>
            <Text style={[typography.subheading, { color: colors.textSecondary }]}>Round 1 of {config.rounds}</Text>
          </View>
        )}

        {config?.heats.map((heat) => (
          <Frame1 key={heat.id} style={styles.heatCard}>
            <View style={styles.cardHeader}>
              <Text style={typography.subheading}>Heat {heat.id} ⌵</Text>
            </View>

            <View style={styles.controlRow}>
              <TouchableOpacity onPress={isRunning ? stopTimer : startTimer} style={[styles.playBtn, { backgroundColor: colors.accent }]}>
                <Ionicons name={isRunning ? "pause" : "play"} size={22} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={resetTimer} style={styles.stopBtn}>
                <View style={[styles.stopSquare, { backgroundColor: colors.textSecondary }]} />
              </TouchableOpacity>
              <Text style={[typography.time, { marginLeft: 'auto' }]}>{formatTime(elapsedTime)}</Text>
            </View>

            {heat.participants.map((swimmer) => (
              <View key={swimmer} style={styles.swimmerSplitRow}>
                <Text style={[typography.paragraph, { flex: 0.5 }]}>{displayName(swimmer)}</Text>
                <TouchableOpacity>   
                  <Text style={[typography.tag, { color: colors.textSecondary, fontWeight: 'bold' }]}>UNDO</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleRecordSplit(swimmer)}
                  style={[styles.splitBtn, { backgroundColor: colors.secondary }]}
                >   
                  <Text style={[typography.tag, { color: colors.primary, fontWeight: 'bold' }]}>SPLIT</Text>
                </TouchableOpacity>
              </View>
            ))}
          </Frame1>
        ))}
      </ScrollView>

      <EventSettingsSheet 
        isVisible={showSettings} 
        onClose={() => setShowSettings(false)} 
        onStartTiming={(cfg) => { setConfig(cfg); setShowSettings(false); resetTimer(); }} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  iconBtn: { padding: 8 },
  eventInfo: { alignItems: 'center', marginBottom: 24 },
  heatCard: { marginBottom: 16, padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  controlRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  playBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  stopBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#DDD', alignItems: 'center', justifyContent: 'center' },
  stopSquare: { width: 12, height: 12, borderRadius: 2 },
  swimmerSplitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  splitBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 }
});