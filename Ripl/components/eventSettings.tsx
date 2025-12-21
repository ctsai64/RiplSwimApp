import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, ScrollView, TouchableOpacity, Pressable, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useGlobalData } from '../context/GlobalDataContext';
import { Tag } from './tag';
import { Ionicons } from '@expo/vector-icons';

export interface HeatConfig {
  id: string;
  participants: string[];
}

export interface TimingConfig {
  distance: number;
  splitDistance: number;
  units: 'yards' | 'meters';
  stroke: string;
  rounds: number;
  heats: HeatConfig[];
  practiceId?: string;
}

interface EventSettingsSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onStartTiming: (config: TimingConfig) => void;
}

export const EventSettingsSheet = ({ isVisible, onClose, onStartTiming }: EventSettingsSheetProps) => {
  const { colors, typography, spacing } = useTheme();
  const { users } = useGlobalData();
  
  const [distance, setDistance] = useState('100');
  const [splitDistance, setSplitDistance] = useState('50');
  const [units, setUnits] = useState<'Y' | 'M'>('Y');
  const [stroke, setStroke] = useState('FLY');
  const [customStroke, setCustomStroke] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [heats, setHeats] = useState<HeatConfig[]>([{ id: '1', participants: [] }]);
  const [activeHeatIndex, setActiveHeatIndex] = useState(0);

  if (!isVisible) return null;

  const strokes = ['FREE', 'FLY', 'BACK', 'BREAST', 'IM', 'OTHER'];
  const displayName = (name: string) => name ? name.charAt(0).toUpperCase() + name.slice(1) : '';

  const handleAddHeat = () => {
    const newId = (heats.length + 1).toString();
    setHeats([...heats, { id: newId, participants: [] }]);
    setActiveHeatIndex(heats.length);
  };

  const handleToggleParticipant = (username: string) => {
    const updatedHeats = [...heats];
    const currentList = updatedHeats[activeHeatIndex].participants;
    
    if (currentList.includes(username)) {
      updatedHeats[activeHeatIndex].participants = currentList.filter(p => p !== username);
    } else {
      updatedHeats[activeHeatIndex].participants = [...currentList, username];
    }
    setHeats(updatedHeats);
  };

  const handleGoToTiming = () => {
    const parsedDistance = parseInt(distance, 10) || 0;
    const parsedSplitDistance = parseInt(splitDistance, 10) || 0;
    const normalizedStroke = stroke === 'OTHER' ? (customStroke || 'Custom') : stroke;
    onStartTiming({
      distance: parsedDistance,
      splitDistance: parsedSplitDistance,
      units: units === 'Y' ? 'yards' : 'meters',
      stroke: normalizedStroke,
      rounds: 1,
      heats: heats,
    });
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <View style={[styles.sheet, { backgroundColor: colors.background }]}>
        <View style={[styles.handle, { backgroundColor: colors.muted }]} />
        
        <ScrollView contentContainerStyle={{ padding: spacing.screenPadding }}>
          <Text style={[typography.heading, { fontSize: 22, marginBottom: 20 }]}>Event Settings</Text>

          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <Text style={[typography.tag, { color: colors.textSecondary }]}>Distance</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                value={distance}
                onChangeText={setDistance}
                keyboardType="numeric"
                style={[typography.subheading, { color: colors.text, textAlign: 'right', width: 40 }]}
              />
              <TouchableOpacity onPress={() => setUnits(units === 'Y' ? 'M' : 'Y')}>
                <Text style={[typography.subheading, { color: colors.textSecondary }]}> {units} ❯</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <Text style={[typography.tag, { color: colors.textSecondary }]}>Split Distance</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                value={splitDistance}
                onChangeText={setSplitDistance}
                keyboardType="numeric"
                style={[typography.subheading, { color: colors.text, textAlign: 'right', width: 40 }]}
              />
              <TouchableOpacity onPress={() => setUnits(units === 'Y' ? 'M' : 'Y')}>
                <Text style={[typography.subheading, { color: colors.textSecondary }]}> {units} ❯</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.chipGrid}>
            {strokes.map(s => (
              <Tag key={s} onPress={() => setStroke(s)} isSelected={s === stroke} label={s} />
            ))}
          </View>

          <View style={[styles.searchContainer, { backgroundColor: colors.border }]}>
            <Ionicons name="search" size={18} color={colors.textSecondary} />
            <TextInput 
              placeholder="Search swimmers" 
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.textInputBase}
            />
          </View>

          {heats.map((heat, index) => (
            <View key={heat.id} style={{ marginBottom: 10 }}>
              <Pressable 
                onPress={() => setActiveHeatIndex(index)}
                style={[styles.heatBox, { 
                    borderColor: colors.border, 
                    backgroundColor: activeHeatIndex === index ? colors.border + '30' : 'transparent' 
                }]}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={typography.subheading}>Heat {heat.id} {activeHeatIndex === index ? '▴' : '⌵'}</Text>
                  <Ionicons name="create-outline" size={18} color={colors.textSecondary} />
                </View>
                <Text style={[typography.tag, { color: colors.textSecondary }]}>{heat.participants.length} Swimmers</Text>
              </Pressable>

              {activeHeatIndex === index && (
                <View style={styles.swimmerList}>
                  {users.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => (
                    <Pressable key={u.username} onPress={() => handleToggleParticipant(u.username)} style={styles.swimmerRow}>
                      <View style={[styles.checkCircle, { 
                        backgroundColor: heat.participants.includes(u.username) ? colors.accent : 'transparent',
                        borderColor: colors.border 
                      }]}>
                        {heat.participants.includes(u.username) && <Ionicons name="checkmark" size={12} color="white" />}
                      </View>
                      <Image source={{ }} style={styles.avatar} />
                      <View>
                        <Text style={typography.paragraph}>{displayName(u.username)}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity onPress={handleAddHeat} style={[styles.addHeatBtn, { borderColor: colors.border }]}>
            <Text style={[typography.tag, { color: colors.textSecondary }]}>+ Add new heat</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoToTiming} style={[styles.startBtn, { backgroundColor: colors.accent }]}>
            <Text style={[typography.paragraph, { color: 'white', fontWeight: 'bold' }]}>Go to Timing</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', zIndex: 1000 },
  sheet: { borderTopLeftRadius: 32, borderTopRightRadius: 32, maxHeight: '85%' },
  handle: { width: 36, height: 4, borderRadius: 2, alignSelf: 'center', marginTop: 12, opacity: 0.5 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, marginBottom: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderRadius: 20, marginBottom: 16 },
  textInputBase: { flex: 1, marginLeft: 8, height: 45 },
  heatBox: { padding: 16, borderWidth: 1, borderRadius: 16 },
  swimmerList: { paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: '#EEE', marginLeft: 16, marginTop: 8 },
  swimmerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 12 },
  checkCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EEE' },
  addHeatBtn: { padding: 16, borderWidth: 1, borderStyle: 'dashed', borderRadius: 16, alignItems: 'center', marginVertical: 12 },
  startBtn: { padding: 18, alignItems: 'center', borderRadius: 25, marginTop: 20, marginBottom: 40 }
});