import { Link, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: "Chats",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.openDrawer()}
              name="menu-outline"
              size={24}
              className="px-3"
            />
          ),

          headerRight: () => (
            <Link href="/new/chat" asChild>
              <Ionicons name="add" size={28} className="px-1" color="gray" />
            </Link>
          ),
        })}
      />
    </Stack>
  );
}
