import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

const OPTIONS = ['Free/Open Swim', 'Structured Workout', 'Time Intervals'];

export default function PlanPracticeDepthScreen() {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();
  const [selection, setSelection] = useState(OPTIONS[0]);

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}> 
      <View style={{ padding: spacing.screenPadding, paddingBottom: spacing.screenPadding * 2 }}>
        <Text style={[typography.heading, { color: colors.text, marginBottom: spacing.screenPadding / 2 }]}>How deep are we diving?</Text>

        <View style={[styles.optionList, { gap: spacing.screenPadding / 2 }]}> 
          {OPTIONS.map((option) => {
            const isActive = option === selection;
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  {
                    borderColor: colors.border,
                    backgroundColor: isActive ? colors.secondary : 'transparent',
                  },
                ]}
                onPress={() => setSelection(option)}
              >
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: colors.border,
                    },
                  ]}
                >
                  {isActive && <View style={[styles.radioInner, { backgroundColor: colors.accent }]} />}
                </View>
                <Text style={[typography.paragraph, { color: colors.text }]}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={[styles.buttonHost, { paddingBottom: spacing.screenPadding, paddingHorizontal: spacing.screenPadding }]}> 
        <View style={[styles.buttonRow, { gap: spacing.screenPadding / 2 }]}> 
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={() => router.push('/plan-practice-invite')}>
            <Text style={[typography.paragraph, { color: colors.background, fontWeight: '700' }]}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.border }]} onPress={() => router.push('/plan-practice-invite')}>
            <Text style={[typography.paragraph, { color: colors.text }]}>Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  optionList: {
    width: '100%',
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
