import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold text-blue-500">Hello World!</Text>
      <Link href="/about" className="mt-5 px-4 py-2 bg-blue-500 rounded">
        Go to About Page
      </Link>
    </View>
  );
}
