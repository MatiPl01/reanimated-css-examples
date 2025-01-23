import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing } from '@/theme';

type RouteCardProps = {
  title: string;
  route: string;
};

export default function RouteCard({ route, title }: RouteCardProps) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate(route as never);
      }}>
      <Text style={styles.title}>{title}</Text>
      <FontAwesome color={colors.foreground3} name='chevron-right' size={16} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background1,
    borderRadius: radius.md,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    padding: spacing.lg
  },
  title: {
    color: colors.foreground1,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '600'
  }
});
