import { Tabs } from "expo-router";
import { User2, Map, LayoutGrid, PlusCircle } from "lucide-react-native";
import { ButtonIcon, Button } from "@gluestack-ui/themed";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="list"
        options={{
          headerTitle: "Atlas",
          tabBarIcon: ({ color, size }) => (
            <LayoutGrid color={color} size={size} />
          ),
          headerRight: () => {
            return (
              <Button
                action="secondary"
                variant="link"
                style={{ marginRight: 15 }}
                size="lg"
              >
                <ButtonIcon as={PlusCircle} />
              </Button>
            );
          },
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          headerTitle: "Map",
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: "Account",
          tabBarIcon: ({ color, size }) => <User2 color={color} size={size} />,
        }}
      />
    </Tabs>
  );
};
