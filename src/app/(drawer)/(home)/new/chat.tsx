import { View, Text } from "react-native";
import React from "react";
import UserList from "@/components/UserList";
import { User } from "@/types";

export default function chat() {
  const handleUserPress = (user: User) => {
    console.log("User Clicked: ", user.first_name);
  };

  return (
    <View className="bg-white flex-1">
      <UserList onPress={handleUserPress} />
    </View>
  );
}
