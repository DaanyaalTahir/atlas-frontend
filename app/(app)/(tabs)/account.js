import React from "react";
import { useSession } from "../../../utils/ctx";
import {
  Avatar,
  AvatarFallbackText,
  HStack,
  Heading,
  View,
  Text,
  VStack,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";

const account = () => {
  const { session, signOut } = useSession();
  const { firstName, lastName, userId } = JSON.parse(session);
  console.log(JSON.parse(session));
  return (
    <VStack padding={20}>
      <HStack alignItems="center">
        <Avatar
          bgColor="$secondary500"
          size="xl"
          borderRadius="$full"
          marginRight={10}
        >
          <AvatarFallbackText>{firstName + " " + lastName}</AvatarFallbackText>
        </Avatar>
        <VStack>
          <Heading>
            {firstName} {lastName}
          </Heading>
          <Text>ID: {userId}</Text>
        </VStack>
      </HStack>

      <Button
        size="md"
        variant="outline"
        action="negative"
        isDisabled={false}
        isFocusVisible={false}
        onPress={() => {
          signOut();
        }}
        marginTop={20}
      >
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </VStack>
  );
};

export default account;
