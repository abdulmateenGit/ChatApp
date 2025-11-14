import {
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const handelSend = () => {
    console.log("Send message:", message);
    //Store into database

    setMessage("");
  };

  const keyboardVerticalOffset = Platform.select({
    ios: 80,
    android: 60,
    default: 0,
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white border-t border-gray-200"
      >
        <View className="px-4 py-2 flex-row gap-4">
          <Pressable className="bg-gray-200 p-2 rounded-full items-center justify-center">
            <Ionicons name="image" size={24} color="#6B7280" />
          </Pressable>

          <TextInput
            value={message}
            multiline
            onChangeText={setMessage}
            placeholder="Type something..."
            className="bg-gray-100 flex-1 rounded-3xl px-4 text-gray-900 text-base max-h-[120px]"
          />

          <Pressable
            onPress={handelSend}
            disabled={!message}
            className={`${message ? "bg-blue-500" : "bg-gray-200"} p-2 rounded-full items-center justify-center`}
          >
            <Ionicons
              name="send"
              size={24}
              color={message ? "#FFF" : "#6B7280"}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
