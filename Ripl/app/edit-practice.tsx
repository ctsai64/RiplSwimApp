import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useGlobalData } from '../context/GlobalDataContext';
import { Frame1 } from '@/components/frame';
import { Users } from '@/components/users';
import { Tag } from '@/components/tag';
import { TimelineItem } from '../components/timeline'; 
import { Ionicons } from '@expo/vector-icons';
import { computeEstimatedDistance, computeEstimatedDuration, formatPracticeMembers, parseDateTime } from '../utils/practiceHelpers';

export default function EditPracticeScreen() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();
  const { practices, selectedPracticeId } = useGlobalData();

  const [isTimeMode, setIsTimeMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<{ setId: number; thingId: string }>>([]);

  const practice = useMemo(() => practices.find(p => p.id === selectedPracticeId) || null, [practices, selectedPracticeId]);

  const toggleItemSelection = (setId: number, thingId: string) => {
    const key = `${setId}-${thingId}`;
    setSelectedItems(prev => {
      const isSelected = prev.some(item => `${item.setId}-${item.thingId}` === key);
      if (isSelected) {
        return prev.filter(item => `${item.setId}-${item.thingId}` !== key);
      } else {
        return [...prev, { setId, thingId }];
      }
    });
  };

  const isItemSelected = (setId: number, thingId: string) => {
    return selectedItems.some(item => item.setId === setId && item.thingId === thingId);
  };

  const handleStartTiming = () => {
    if (!practice || selectedItems.length === 0) return;
    // Start with first selected item
    const firstSelected = selectedItems[0];
    const targetThing = practice.sets[firstSelected.setId].things.find(t => t.id === Number(firstSelected.thingId));

    router.push({
      pathname: '/timer',
      params: {
        distance: targetThing?.distance.toString(),
        stroke: practice.sets[firstSelected.setId].name,
        practiceId: practice.id
      }
    });
  };

  if (!practice) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.screenPadding }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        {/* Toggle between standard view and time mode */}
        <TouchableOpacity 
          onPress={() => { setIsTimeMode(!isTimeMode); setSelectedItems([]); }}
          style={[styles.modeToggle, { backgroundColor: isTimeMode ? colors.accent : colors.border }]}
        >
          <Ionicons name="timer-outline" size={22} color={isTimeMode ? 'white' : colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={[typography.heading, { marginBottom: 4 }]}>{practice.name}</Text>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginBottom: spacing.screenPadding }]}>{parseDateTime(practice)}</Text>

      {!isTimeMode && (
        <>
          <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary, marginBottom: spacing.screenPadding }]}>
            <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Capture Sets</Text>
          </Pressable>

          <Frame1 style={{ width: '100%', marginBottom: spacing.screenPadding }}>
            <Text style={[typography.paragraph, { color: colors.textSecondary }]}>Summary</Text>
            <Text style={typography.paragraph}>{computeEstimatedDistance(practice)} {practice.units} • {computeEstimatedDuration(practice)}</Text>
            <View style={styles.tagRow}>
              {practice.type.map((type, idx) => <Tag key={idx} label={type} />)}
            </View>
            <Users usersText={formatPracticeMembers(practice)} />
          </Frame1>
        </>
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {practice.sets.map((set, setIdx) => {
          const hasAnySelected = set.things.some(thing => isItemSelected(setIdx, String(thing.id)));
          return (
            <TimelineItem 
              key={setIdx} 
              isLast={setIdx === practice.sets.length - 1}
              isTimeMode={false}
              isSelected={hasAnySelected}
              onSelect={() => {}}
            >
              <Frame1 style={{ marginBottom: spacing.screenPadding / 2 }}>
                <Text style={[typography.paragraph, { fontWeight: '700', marginBottom: 8 }]}>{set.name}</Text>
                {set.things.map((thing, thingIdx) => (
                  <Pressable 
                    key={thingIdx}
                    onPress={() => toggleItemSelection(setIdx, String(thingIdx))}
                    style={[styles.thingItem, isItemSelected(setIdx, String(thingIdx)) && { backgroundColor: colors.accent + '15' }]}
                  >
                    <Ionicons 
                      name={isItemSelected(setIdx, String(thingIdx)) ? "checkmark-circle" : "ellipse-outline"} 
                      size={18} 
                      color={isItemSelected(setIdx, String(thingIdx)) ? colors.accent : colors.muted} 
                      style={{ marginRight: 8 }}
                    />
                    <Text style={[typography.tag, { color: colors.textSecondary, flex: 1 }]}>
                      {thing.iterations} x {thing.distance}{practice.units === 'yards' ? 'Y' : 'M'} @ {thing.time}s
                    </Text>
                  </Pressable>
                ))}
              </Frame1>
            </TimelineItem>
          );
        })}
      </ScrollView>

      {/* Floating Start Action */}
      {isTimeMode && selectedItems.length > 0 ? (
        <TouchableOpacity style={[styles.startFab, { backgroundColor: colors.accent }]} onPress={handleStartTiming}>
          <Text style={styles.startFabText}>START</Text>
        </TouchableOpacity>
      ) : !isTimeMode && (
        <View style={{ gap: spacing.screenPadding / 2, marginTop: 10 }}>
          <Pressable style={[styles.secondaryBtn, { backgroundColor: colors.secondary }]}>
            <Text style={[typography.paragraph, { color: colors.text }]}>Add Set</Text>
          </Pressable>
          <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/reflection')}>
            <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Next →</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modeToggle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  primaryBtn: { paddingVertical: 16, borderRadius: 16, alignItems: 'center', width: '100%' },
  secondaryBtn: { paddingVertical: 16, borderRadius: 16, alignItems: 'center', width: '100%' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8, marginBottom: 8 },
  thingItem: { flexDirection: 'row', alignItems: 'center', padding: 6, borderRadius: 8 },
  startFab: { 
    position: 'absolute', bottom: 30, alignSelf: 'center',
    width: 110, height: 110, borderRadius: 55, 
    alignItems: 'center', justifyContent: 'center', elevation: 5 
  },
  startFabText: { color: 'white', fontSize: 22, fontWeight: '900' }
});