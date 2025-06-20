import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../components/ThemedView'; 
import { ThemedText } from '../components/ThemedText';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>This screen does not exist.</ThemedText>
        <Link href="/DriverRegisterScreens/RegisterVehicleScreen" style={styles.link}>
          <ThemedText type="link" style={styles.linkText}>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // Using default background from ThemedView, but added here for clarity if ThemedView's default changes
    backgroundColor: '#ffffff', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // Using default color from ThemedText, but added here for clarity if ThemedText's default changes
    color: '#333', 
    marginBottom: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#2f95dc', // Standard link color
    textDecorationLine: 'underline',
  },
});
