import React from 'react';
import { View, ViewProps, StyleSheet, ScrollView, ScrollViewProps } from 'react-native';
import { Colors, Spacing } from '../constants/design';

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
  const containerStyle = [styles.container, style];

  if (scrollable) {
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
        {...(props as ScrollViewProps)}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.screenPadding,
    alignItems: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

