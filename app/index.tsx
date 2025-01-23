import { ScrollView, StyleSheet } from 'react-native';

import { RouteCard } from '@/components';
import { spacing } from '@/theme';

export default function App(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <RouteCard route='Potion' title='1. Potion' />
      <RouteCard route='DayNightSwitch' title='2. Day Night Switch' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg
  }
});
