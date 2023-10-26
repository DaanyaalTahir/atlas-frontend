import React from "react";
import {
  Box,
  Text,
  Button,
  ButtonText,
  VStack,
  Avatar,
  Icon,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { Backpack } from "lucide-react-native";

const Card = ({ id, name, type }) => {
  return (
    <Box
      borderColor="$borderLight200"
      borderRadius="$lg"
      borderWidth="$1"
      width="100%"
      height="100%"
      padding={10}
      backgroundColor="$backgroundLight0"
      style={{ display: "flex", flex: 1 }}
    >
      <VStack
        space="md"
        reversed={false}
        style={{ justifyContent: "space-between", flex: 1 }}
      >
        <Text>{name}</Text>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          width="100%"
        >
          <Avatar bgColor="$primary200" size="xl">
            <Icon as={Backpack} color="white" size="xl" />
          </Avatar>
        </Box>

        <Button
          size="sm"
          variant="solid"
          action="positive"
          borderRadius="$full"
          onPress={() => router.push(`/device/${id}`)}
        >
          <ButtonText>Find</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default Card;
