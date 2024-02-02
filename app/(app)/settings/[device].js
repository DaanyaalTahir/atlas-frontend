import {
  Heading,
  View,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Button,
  ButtonText,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@gluestack-ui/themed";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import AtlasCard from "../../../components/AtlasCard";
import { SERVER_ENDPOINT } from "../../../globals";
const Settings = () => {
  const local = useLocalSearchParams();
  const deviceInfo = JSON.parse(local.device);
  const [frequency, setFrequency] = useState(deviceInfo.frequency);
  const toast = useToast();

  const onSave = async () => {
    let body = {
      deviceId: deviceInfo.id,
      actionType: 1,
      value: frequency,
    };
    try {
      const response = await axios.post(
        `${SERVER_ENDPOINT}/actions/create`,
        body
      );
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>Success</ToastTitle>
                <ToastDescription>
                  Your update will be processed soon.
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.log(error);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="accent">
              <VStack space="xs">
                <ToastTitle>Failure</ToastTitle>
                <ToastDescription>
                  Your update has not been processed. Please try again.
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };

  return (
    <View
      padding={10}
      display="flex"
      justifyContent="space-between"
      flex={1}
      alignItems="center"
    >
      <Stack.Screen options={{ headerTitle: "Settings" }} />

      <View width="100%">
        <AtlasCard>
          <View padding={10}>
            <View
              display="flex"
              justifyContent="space-between"
              flexDirection="row"
              marginBottom={10}
            >
              <Heading size="sm">Frequency</Heading>
              <Text>{frequency} minutes</Text>
            </View>
            <Slider
              value={frequency}
              size="md"
              orientation="horizontal"
              isDisabled={false}
              isReversed={false}
              maxValue={60}
              minValue={5}
              step={5}
              onChange={(freq) => setFrequency(freq)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </View>
        </AtlasCard>
      </View>
      <Button
        width="$32"
        marginBottom={30}
        isDisabled={frequency == deviceInfo.frequency}
        onPress={onSave}
      >
        <ButtonText>Save</ButtonText>
      </Button>
    </View>
  );
};

export default Settings;
