import { View, Text, Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useSupabase } from "@/providers/SupabaseProvider";

export default function Settings() {
  const { signOut } = useAuth();

  const supabase = useSupabase();

  const testInsert = async () => {
    const { data, error } = await supabase
      .from("test")
      .insert({ test: "Testing Insert 7" });
    console.log(error);
  };

  const testFetch = async () => {
    const { data, error } = await supabase.from("test").select("*");

    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-3xl font-bold">Settings</Text>
      <Button title="Sign out" onPress={() => signOut()} />
      <Button title="Test Insert" onPress={testInsert} />
      <Button title="Test Fetch" onPress={testFetch} />
    </View>
  );
}
