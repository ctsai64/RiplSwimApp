import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface UserGroupProps {
  usersText: string;
  imageSource?: any;
}

export const UserGroup: React.FC<UserGroupProps> = ({ usersText, imageSource }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.avatarStack}>
        <Image 
          source={imageSource || require('../assets/images/avatarStack.png')} 
          //style={[styles.avatar, { borderColor: colors.background, backgroundColor: colors.muted }]} 
        />
        {/*<View style={[styles.avatar, styles.avatarOverlap, { borderColor: colors.background, backgroundColor: colors.muted }]} />*/}
      </View>
      <Text style={[typography.paragraph, { color: colors.textSecondary, marginLeft: 8 }]}>
        {usersText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStack: {
    flexDirection: 'row',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
  avatarOverlap: {
    marginLeft: -10,
  },
});