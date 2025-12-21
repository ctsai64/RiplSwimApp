import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useGlobalData } from '../context/GlobalDataContext';
import { EventSettingsSheet, TimingConfig } from '../components/eventSettings';
import { Frame1 } from '../components/frame';

type HeatId = string | number;

interface SplitEntry {
  elapsedStamp: number; // elapsed at the moment of pressing
  interval: number; // interval between last split and this press
  distance: number; // distance for this split (or final distance)
  isFinal: boolean;
}

type SplitsByHeat = Record<string, Record<string, SplitEntry[]>>; // heatId -> username -> entries
type HeatTimers = Record<string, { isRunning: boolean; elapsed: number }>;

export default function Timer() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();
  const { users, addSplitToUser, addSplitToPractice } = useGlobalData();

  const [showSettings, setShowSettings] = useState(true);
  const [config, setConfig] = useState<TimingConfig | null>(null);
  const [heatTimers, setHeatTimers] = useState<HeatTimers>({});
  const [splitsByHeat, setSplitsByHeat] = useState<SplitsByHeat>({});

  const heatTimerRefs = useRef<Record<string, ReturnType<typeof setInterval> | null>>({});

  useEffect(() => {
    return () => {
      Object.values(heatTimerRefs.current).forEach(ref => { if (ref) clearInterval(ref); });
    };
  }, []);

  const startTimer = (heatId: string) => {
    const current = heatTimers[heatId]?.elapsed || 0;
    const startTime = Date.now() - current;
    setHeatTimers(prev => ({ ...prev, [heatId]: { isRunning: true, elapsed: current } }));
    heatTimerRefs.current[heatId] = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setHeatTimers(prev => ({ ...prev, [heatId]: { isRunning: true, elapsed } }));
    }, 10);
  };

  const stopTimer = (heatId: string) => {
    const ref = heatTimerRefs.current[heatId];
    if (ref) clearInterval(ref);
    heatTimerRefs.current[heatId] = null;
    const current = heatTimers[heatId]?.elapsed || 0;
    setHeatTimers(prev => ({ ...prev, [heatId]: { isRunning: false, elapsed: current } }));
  };

  const resetTimer = (heatId?: string) => {
    if (heatId) {
      stopTimer(heatId);
      setHeatTimers(prev => ({ ...prev, [heatId]: { isRunning: false, elapsed: 0 } }));
      setSplitsByHeat(prev => ({ ...prev, [heatId]: {} }));
    } else {
      // Reset all
      Object.keys(heatTimers).forEach(id => stopTimer(id));
      const resetAll: HeatTimers = {};
      Object.keys(heatTimers).forEach(id => { resetAll[id] = { isRunning: false, elapsed: 0 }; });
      setHeatTimers(resetAll);
      setSplitsByHeat({});
    }
  };

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const handleRecordSplit = (heatId: string, username: string) => {
    if (!config) return;
    const totalSplits = Math.max(1, Math.ceil(config.distance / config.splitDistance));
    const heatElapsed = heatTimers[heatId]?.elapsed || 0;

    const swimmerEntries = splitsByHeat[heatId]?.[username] || [];
    const lastElapsed = swimmerEntries.length > 0 ? swimmerEntries[swimmerEntries.length - 1].elapsedStamp : 0;
    const intervalTime = heatElapsed - lastElapsed;

    const nextIndex = swimmerEntries.length + 1;
    const isFinal = nextIndex === totalSplits;

    if (isFinal) {
      const finalData = {
        instance: new Date().toISOString(),
        distance: config.distance,
        stroke: config.stroke,
        time: heatElapsed,
        username,
        isFinal: true,
      };
      addSplitToUser(username, finalData);
      if (config.practiceId) addSplitToPractice(config.practiceId, finalData);
    } else {
      const splitData = {
        instance: new Date().toISOString(),
        distance: config.splitDistance,
        stroke: config.stroke,
        time: intervalTime,
        username,
      };
      addSplitToUser(username, splitData);
      if (config.practiceId) addSplitToPractice(config.practiceId, splitData);
    }

    const newEntry: SplitEntry = {
      elapsedStamp: heatElapsed,
      interval: intervalTime,
      distance: isFinal ? config.distance : config.splitDistance,
      isFinal,
    };

    setSplitsByHeat(prev => {
      const heatMap = prev[heatId] ? { ...prev[heatId] } : {};
      const userList = heatMap[username] ? [...heatMap[username], newEntry] : [newEntry];
      heatMap[username] = userList;
      return { ...prev, [heatId]: heatMap };
    });
  };

  const handleUndo = (heatId: string, username: string) => {
    const list = splitsByHeat[heatId]?.[username] || [];
    if (list.length === 0) return;
    const next = list.slice(0, list.length - 1);
    setSplitsByHeat(prev => {
      const heatMap = prev[heatId] ? { ...prev[heatId] } : {};
      heatMap[username] = next;
      return { ...prev, [heatId]: heatMap };
    });
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
            <Text style={[typography.tag, { color: colors.textSecondary }]}>Split {config.splitDistance}{config.units === 'yards' ? 'Y' : 'M'}</Text>
          </View>
        )}

        {config?.heats.map((heat) => (
          <Frame1 key={heat.id} style={styles.heatCard}>
            <View style={styles.cardHeader}>
              <Text style={typography.subheading}>Heat {heat.id} ⌵</Text>
            </View>

            <View style={styles.controlRow}>
              <TouchableOpacity onPress={() => (heatTimers[String(heat.id)]?.isRunning ? stopTimer(String(heat.id)) : startTimer(String(heat.id)))} style={[styles.playBtn, { backgroundColor: colors.accent }]}> 
                <Ionicons name={heatTimers[String(heat.id)]?.isRunning ? "pause" : "play"} size={22} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => resetTimer(String(heat.id))} style={styles.stopBtn}>
                <View style={[styles.stopSquare, { backgroundColor: colors.textSecondary }]} />
              </TouchableOpacity>
              <Text style={[typography.time, { marginLeft: 'auto' }]}>{formatTime(heatTimers[String(heat.id)]?.elapsed || 0)}</Text>
            </View>

            {heat.participants.map((username) => {
              const swimmerEntries = splitsByHeat[String(heat.id)]?.[username] || [];
              const totalSplits = Math.max(1, Math.ceil((config?.distance || 0) / (config?.splitDistance || 1)));
              const finished = swimmerEntries.length === totalSplits && swimmerEntries[swimmerEntries.length - 1]?.isFinal;
              const readyToFinish = swimmerEntries.length + 1 === totalSplits;

              return (
                <View key={username} style={styles.swimmerSplitRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 }}>
                    <Image source={{}} style={styles.avatarSmall} />
                    <View>
                      <Text style={typography.paragraph}>{username.toUpperCase()}</Text>
                      {swimmerEntries.length > 0 && (
                        <View>
                          {swimmerEntries.map((entry, idx) => (
                            <Text key={idx} style={[typography.tag, { color: colors.text}]}> 
                              {entry.isFinal ? (
                                <>Final • <Text style={{ fontWeight: 'bold' }}>{formatTime(entry.elapsedStamp)}</Text></>
                              ) : (
                                <>
                                  {entry.distance} {config?.units === 'yards' ? 'Y' : 'M'} • <Text style={{ fontWeight: 'bold' }}>{formatTime(entry.interval)}</Text>
                                </>
                              )}
                            </Text>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => handleUndo(String(heat.id), username)} style={{ marginRight: 15 }}>
                    <Text style={[typography.tag, { color: colors.textSecondary }]}>UNDO</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => handleRecordSplit(String(heat.id), username)}
                    disabled={finished}
                    style={[
                      styles.splitBtn, 
                      { backgroundColor: finished ? colors.border : colors.secondary }
                    ]}
                  >
                    <Ionicons 
                      name={finished ? "checkmark-circle" : readyToFinish ? "flag-outline" : "timer-outline"} 
                      size={14} 
                      color={colors.primary} 
                      style={{ marginRight: 4 }} 
                    />
                    <Text style={[typography.tag, { color: colors.primary, fontWeight: 'bold' }]}>
                      {finished ? 'FINISHED' : readyToFinish ? 'FINISH' : 'SPLIT'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </Frame1>
        ))}
      </ScrollView>

      <EventSettingsSheet 
        isVisible={showSettings} 
        onClose={() => setShowSettings(false)} 
        onStartTiming={(cfg) => { 
          setConfig(cfg);
          setShowSettings(false);
          // Initialize timers and splits per heat
          const timersInit: HeatTimers = {};
          const splitsInit: SplitsByHeat = {};
          cfg.heats.forEach(h => { timersInit[String(h.id)] = { isRunning: false, elapsed: 0 }; splitsInit[String(h.id)] = {}; });
          setHeatTimers(timersInit);
          setSplitsByHeat(splitsInit);
        }} 
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
  controlRow: { flexDirection: 'row', gap: 12, marginBottom: 20, alignItems: 'center' },
  playBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  stopBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#DDD', alignItems: 'center', justifyContent: 'center' },
  stopSquare: { width: 12, height: 12, borderRadius: 2 },
  swimmerSplitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  avatarSmall: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEE' },
  splitBtn: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, alignItems: 'center' }
});
