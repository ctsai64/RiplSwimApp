import { ScrollView, Text, StyleSheet, View } from 'react-native';
import HeatsCard from '../components/practiceCard';
import { useTheme } from '../context/ThemeContext';
import { TypographyScale } from '../constants/design';

export default function HomeScreen() {
  const { colors } = useTheme();
  const mockData = [
    { id: '1', time: '10:00 AM', heat: 'Heat 1', track: 'Track A', tag: 'Advanced', members: ['Ben', 'Joe', 'Amy'] },
    { id: '2', time: '11:00 AM', heat: 'Heat 2', track: 'Track B', tag: 'Pro', members: ['Sarah', 'Alex', 'Mike'] },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[TypographyScale.h1, { color: colors.text }]}>Schedule</Text>
        <ScrollView contentContainerStyle={{ gap: 16 }}>
          {mockData.map(item => <HeatsCard key={item.id} data={item} />)}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1 },
});