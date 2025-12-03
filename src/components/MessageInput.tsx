import {
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useUser } from "@clerk/clerk-expo";
import { Channel } from "@/types";

export default function MessageInput({ channel }: { channel: Channel }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const supabase = useSupabase();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const newMessage = useMutation({
    mutationFn: async () => {
      const { data } = await supabase
        .from("messages")
        .insert({
          content: message,
          user_id: user!.id,
          channel_id: channel.id,
        })
        .select("*")
        .single()
        .throwOnError();

      return data;
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["messages", channel.id] });
      //rest fields
      setMessage("");
      setImage(null);
    },

    onError(error) {
      Alert.alert("Failed to send message", error.message);
    },
  });

  const handelSend = () => {
    //Store into database
    newMessage.mutate();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const keyboardVerticalOffset = Platform.select({
    ios: 80,
    android: 60,
    default: 0,
  });

  const isMessageEmpty = !message && !image;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white border-t border-gray-200"
      >
        {image && (
          <View className="h-32 w-32">
            <Image source={{ uri: image }} className="h-full w-full" />
            <Pressable
              onPress={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-gray-100 w-6 h-6 rounded-full items-center justify-center"
            >
              <Ionicons name="close" size={14} color="dimgray" />
            </Pressable>
          </View>
        )}
        <View className="pt-4 pb-2 flex-row gap-2 items-center">
          <Pressable
            onPress={pickImage}
            className="bg-gray-200 p-2 ml-2 rounded-full w-15 h-15 items-center"
          >
            <Ionicons name="image" size={24} color="#6B7280" />
          </Pressable>

          <TextInput
            value={message}
            multiline
            onChangeText={setMessage}
            placeholder="Type something ....."
            className="bg-gray-100 flex-1 rounded-3xl px-4 text-gray-900 text-base max-h-[120px]"
          />

          <Pressable
            onPress={handelSend}
            disabled={isMessageEmpty}
            className={`${isMessageEmpty ? "bg-gray-200" : "bg-blue-500"} p-2 mr-2 rounded-full w-15 h-15 items-center`}
          >
            <Ionicons
              name="send"
              size={24}
              color={isMessageEmpty ? "#6B7280" : "#FFFFFF"}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
