import React from "react";
import { Box, Button, ButtonText, VStack, Heading } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { Image } from "@gluestack-ui/themed";
import { getTrackerIcon } from "../utils/utilities";

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
      paddingTop={30}
      paddingBottom={30}
    >
      <VStack
        space="sm"
        reversed={false}
        style={{
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Image
          borderWidth="$2"
          borderRadius="50%"
          borderColor="$primary400"
          backgroundColor="$primary50"
          source={getTrackerIcon(type)}
          size="lg"
          alt="tracker_type"
        />

        <Heading size="sm" marginBottom={20}>
          {name}
        </Heading>

        <Button
          width="100%"
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
