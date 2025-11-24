import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import channels from "@/data/channels";
import messages from "@/data/messages";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";

export default function ChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const channel = channels.find((ch) => ch.id === id);

  if (!channel) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Channel not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: channel.name,
        }}
      />
      <MessageList />
      <MessageInput />
    </>
  );
}
