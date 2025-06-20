import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Assuming you'll create this hook if it's not present
import { useColorScheme } from '@/hooks/useColorScheme'; 

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="DriverRegisterScreens/RegisterVehicleScreen" options={{ headerShown: false }} />
        <Stack.Screen name="DriverRegisterScreens/VehicleInformationScreen" options={{ headerShown: false }} />
        <Stack.Screen name="DriverRegisterScreens/VehicleDetailsScreen" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
