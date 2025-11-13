import { View, Text, Image } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import channels from "@/data/channels";

export default function ChannelScreen() {
  const { id } = useLocalSearchParams();

  const channel = channels.find((ch) => ch.id === id);

  if (!channel) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Channel not found</Text>{" "}
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Stack.Screen
        options={{
          title: channel.name
        }}
      />
      <Text className="text-2xl">Channel Screen: {channel.name} </Text>
    </View>
  );
}
