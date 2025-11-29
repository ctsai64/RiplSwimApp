import React from 'react';
import { View, ViewProps, StyleSheet, ScrollView, ScrollViewProps } from 'react-native';
import { Spacing } from '../constants/design';
import { useTheme } from '../context/ThemeContext';
import { GlobalMenu } from './GlobalMenu';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const containerStyle = [styles.container, { backgroundColor: colors.background }, style];

  const content = (
    <View style={styles.inner}>
      <View style={styles.menuRow}>
        <GlobalMenu />
      </View>
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.scrollContainer, { backgroundColor: colors.background }]}
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
        {...(props as ScrollViewProps)}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={containerStyle} {...props}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.screenPadding,
    alignItems: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
  },
  inner: {
    width: '100%',
  },
  menuRow: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: Spacing.screenPadding / 2,
  },
});

