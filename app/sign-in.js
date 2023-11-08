import {
  Center,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Badge,
  BadgeText,
  HStack,
} from "@gluestack-ui/themed";
import { LogIn } from "lucide-react-native";
import { useSession } from "../utils/ctx";
import globalStyles from "../styles/globalStyles";
import { router } from "expo-router";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("admin@dev.com");
  const [password, setPassword] = useState("1234");
  const { signIn } = useSession();

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
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
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
          onChangeText={(text) => setPassword(text)}
          values={password}
        />
      </Input>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        borderRadius="$full"
        onPress={() => {
          signIn(email, password);
        }}
      >
        <ButtonText>LogIn </ButtonText>
        <ButtonIcon as={LogIn} />
      </Button>
    </Center>
  );
}
