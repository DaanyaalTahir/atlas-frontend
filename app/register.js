import React, { useState, useCallback, useRef } from "react";
import {
  Center,
  Input,
  InputField,
  Button,
  ButtonText,
  Badge,
  Heading,
  Link,
  LinkText,
  Text,
  HStack,
  BadgeText,
} from "@gluestack-ui/themed"; // Importing UI components from the GlueStack UI library
import { useSession } from "../utils/ctx"; // Importing useSession hook from a custom utility file
import globalStyles from "../styles/globalStyles"; // Importing global styles
import { router } from "expo-router"; // Importing router from Expo for navigation
import axios from "axios"; // Importing Axios for making HTTP requests
import { SERVER_ENDPOINT } from "../globals";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    try {
      const data = { firstName, lastName, email, password };
      const response = await axios.post(
        `${SERVER_ENDPOINT}/users/register`,
        data
      );
      router.replace("/sign-in");
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <Center style={globalStyles.formContainer}>
      <HStack style={{ alignItems: "center" }}>
        <Heading size="5xl">Atlas</Heading>

        <Badge
          size="md"
          variant="solid"
          borderRadius="$none"
          action="info"
          style={{ marginLeft: 15 }}
        >
          <BadgeText>Beta</BadgeText>
        </Badge>
      </HStack>
      <Input
        variant="rounded"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={globalStyles.formInput}
      >
        <InputField
          placeholder="First Name"
          value={firstName}
          onChangeText={(val) => setFirstName(val)}
        />
      </Input>
      <Input
        variant="rounded"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={globalStyles.formInput}
      >
        <InputField
          placeholder="Last Name"
          value={lastName}
          onChangeText={(val) => setLastName(val)}
        />
      </Input>
      <Input
        variant="rounded"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={globalStyles.formInput}
      >
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
      </Input>
      <Input
        variant="rounded"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={globalStyles.formInput}
      >
        <InputField
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
      </Input>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        borderRadius="$full"
        onPress={onRegister}
      >
        <ButtonText>Register </ButtonText>
      </Button>
      <HStack marginTop={20} marginBottom={20}>
        <Text>Already have an account? </Text>
        <Link onPress={() => router.push("/sign-in")}>
          <LinkText>Sign In</LinkText>
        </Link>
      </HStack>
    </Center>
  );
};

export default Register;
