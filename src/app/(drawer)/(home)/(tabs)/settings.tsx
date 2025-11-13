import { View, Text, Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function Settings() {
  const { signOut } = useAuth();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold">Settings</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
}
