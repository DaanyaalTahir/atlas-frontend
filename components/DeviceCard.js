import React from "react";
import { Box, Text, Button, ButtonText, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";

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
      style={{ display: "flex" }}
    >
      <VStack
        space="md"
        reversed={false}
        style={{ justifyContent: "space-between", flex: 1 }}
      >
        <Text>{name}</Text>
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
