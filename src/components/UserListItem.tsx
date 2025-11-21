import { View, Text, Image, Pressable } from "react-native";
import { User } from "@/types";

type UserListItemProps = {
  user: User;
  onPress?: (user: User) => void;
};

export default function UserListItem({ user, onPress }: UserListItemProps) {
  return (
    <Pressable
      onPress={() => onPress?.(user)}
      className="flex-row items-center gap-4 p-4 border-b border-gray-100"
    >
      <View className="bg-gray-200 items-center justify-center w-12 h-12 rounded-full">
        {user.avatar_url ? (
          <Image
            source={{ uri: user.avatar_url }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <Text>{user.first_name?.charAt(0)?.toUpperCase()}</Text>
        )}
      </View>
      <Text className="text-gray-900 font-medium">
        {user.first_name} {user.last_name}
      </Text>
    </Pressable>
  );
}
