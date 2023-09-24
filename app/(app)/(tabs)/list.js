import { View, Text } from "react-native";
import React from "react";
import Card from "../../../components/DeviceCard";
import { FlatGrid } from "react-native-super-grid";
import { StyleSheet, Dimensions } from "react-native";

const list = () => {
  const testArr = [
    { id: 1, name: "My backpack", type: "backpack" },
    { id: 2, name: "My car", type: "car" },
    { id: 3, name: "My car", type: "car" },
  ];

  return (
    <FlatGrid
      itemDimension={130}
      data={testArr}
      renderItem={({ item }) => <Card name={item.name} id={item.id} />}
    />
  );
};

export default list;
