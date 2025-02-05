import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerTitle: 'Home' }} />
      <Stack.Screen name='Potion' options={{ headerTitle: 'Potion' }} />
      <Stack.Screen
        name='DayNightSwitch'
        options={{ headerTitle: 'Day Night Switch' }}
      />
    </Stack>
  );
}
