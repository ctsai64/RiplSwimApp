import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Spacing, LightColors } from '../constants/design';
import { useTheme } from '../context/ThemeContext';
import { MediumText, Paragraph } from './Typography';

export const GlobalMenu: React.FC = () => {
  const router = useRouter();
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        accessibilityLabel="Open menu"
        onPress={() => setIsOpen(true)}
        style={[
          styles.trigger,
          {
            borderColor: colors.border,
            backgroundColor: colors.backgroundSecondary,
          },
        ]}
      >
        <Paragraph style={[styles.triggerText, { color: colors.highlight }]}>☰</Paragraph>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={isOpen} onRequestClose={() => setIsOpen(false)}>
        <View style={[styles.overlay, { backgroundColor: colors.menuOverlay }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsOpen(false)} />
          <View
            style={[
              styles.menu,
              {
                backgroundColor: colors.menuBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <MediumText style={[styles.menuHeading, { color: colors.highlight }]}>Menu</MediumText>
            <TouchableOpacity
              style={[styles.menuItem, { borderColor: colors.border }]}
              onPress={() => {
                setIsOpen(false);
                router.replace('/');
              }}
            >
              <Paragraph style={[styles.menuLabel, { color: colors.text }]}>Return to Landing Page</Paragraph>
            </TouchableOpacity>
            <View style={[styles.menuItem, { borderColor: colors.border }]}>
              <Paragraph style={[styles.menuLabel, { color: colors.text }]}>Dark Mode</Paragraph>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: LightColors.border, true: LightColors.highlight }}
                thumbColor={isDarkMode ? LightColors.highlight : LightColors.white}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  triggerText: {
    fontSize: 22,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: Spacing.screenPadding,
  },
  menu: {
    padding: Spacing.screenPadding / 1.5,
    borderRadius: 16,
    borderWidth: 1,
    width: '60%',
  },
  menuHeading: {
    marginBottom: Spacing.screenPadding / 2,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.screenPadding / 3,
    borderTopWidth: 1,
    marginTop: Spacing.screenPadding / 4,
  },
  menuLabel: {
    flex: 1,
    marginRight: Spacing.screenPadding / 3,
  },
});

