import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Ride Accepted"
        onPress={() => router.push("/ride-accepted")}
      />
      <View style={{ marginTop: 20 }}>
        <Button
          title="Bonus or Insentive"
          onPress={() => router.push("/bonus_insentive")}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Home Screen" onPress={() => router.push("/home/MainPage")} />
      </View>
    </View>
  );
}
