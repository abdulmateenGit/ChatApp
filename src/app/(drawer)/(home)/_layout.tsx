import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="channel/[id]"
        options={{
          title: "Channel",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
