import { Channel, ChannelWithUser } from "@/types";
import { View, Text, Image, Pressable } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Link } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

type ChannelListItemProps = {
  channel: ChannelWithUser;
};

export default function ChannelListItem({ channel }: ChannelListItemProps) {
  const { user } = useUser();

  const otherUser = channel.users?.find((u) => u.id !== user?.id);

  let channelName = channel.name;
  if (channel.type === "direct") {
    channelName = otherUser?.full_name || "Unknown";
  }
  return (
    <Link href={`/channel/${channel.id}`} asChild>
      <Pressable className="flex-row gap-3 p-4 border-b border-gray-200">
        {/* Channel Image */}
        {channel.avatar ? (
          <Image
            source={{ uri: channel.avatar }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View className="bg-neutral-200 w-12 h-12 rounded-full items-center justify-center">
            <Text className="text-neutral-500 font-bold text-xl">
              {otherUser?.first_name?.charAt(0).toLocaleUpperCase() || "?"}
            </Text>
          </View>
        )}
        <View className="flex-1">
          <Text
            className="font-bold text-lg text-neutral-600"
            numberOfLines={1}
          >
            {channelName}
          </Text>
          <Text className="text-gray-500 text-sm" numberOfLines={1}>
            {channel.lastMessage?.content || "No messages yet."}
          </Text>
        </View>
        {channel.lastMessage && (
          <Text className="text-xs text-neutral-500">
            {formatDistanceToNow(new Date(channel.lastMessage.createdAt), {
              addSuffix: true,
            })}
          </Text>
        )}
      </Pressable>
    </Link>
  );
}
