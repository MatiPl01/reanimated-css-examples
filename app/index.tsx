import { ScrollView, StyleSheet } from 'react-native';

import { RouteCard } from '@/components';
import { spacing } from '@/theme';

export default function App(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <RouteCard route='DayNightSwitch' title='Day Night Switch' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg
  }
});
