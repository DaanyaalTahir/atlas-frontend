import { Box, Text, Heading, VStack } from "@gluestack-ui/themed";
import React from "react";
import { Pressable } from "@gluestack-ui/themed";

const ActionCard = ({ icon, onPressEvent, name }) => {
  return (
    <Pressable
      onPress={() => {
        onPressEvent();
      }}
    >
      <Box
        borderColor="$borderLight200"
        borderRadius="$lg"
        borderWidth="$1"
        width="100%"
        height="100%"
        padding={10}
        backgroundColor="$secondary200"
      >
        <VStack space="md" reversed={false}>
          {icon}

          <Heading size="md">{name}</Heading>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default ActionCard;
