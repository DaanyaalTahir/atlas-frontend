import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";

const Device = () => {
  const local = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Device ${local.device}` }} />
      <Text>Device</Text>
    </View>
  );
};

export default Device;
