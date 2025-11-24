import { View, Text } from "react-native";
import React from "react";
import UserList from "@/components/UserList";
import { User } from "@/types";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

// TODO: check if a direct channel with the clicked user already exists.

export default function chat() {
  const supabase = useSupabase();
  const { user } = useUser();

  const createChannel = useMutation({
    // 1. Create a channel (if it's dosn't exist)
    mutationFn: async (clickedUser: User) => {
      const { data: channel } = await supabase
        .from("channels")
        .insert({ type: "direct" })
        .throwOnError()
        .select("*")
        .single();

      if (!channel) {
        throw new Error("Channel is null");
      }

      // 2. Add user to the channel
      await supabase
        .from("channel_users")
        .insert({ channel_id: channel.id, user_id: clickedUser.id })
        .throwOnError();

      // 3. Add myself to the channel
      await supabase
        .from("channel_users")
        .insert({ channel_id: channel.id, user_id: user!.id })
        .throwOnError();

      return channel;
    },
    // 4. redirect to the channel page
    onSuccess(newChannel) {
      router.back();
      router.push(`/channel/${newChannel.id}`);
    },
  });

  const handleUserPress = (user: User) => {
    console.log("User Clicked: ", user.first_name);
    createChannel.mutate(user);
  };

  return (
    <View className="bg-white flex-1">
      <UserList onPress={handleUserPress} />
    </View>
  );
}
