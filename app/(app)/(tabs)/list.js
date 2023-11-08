import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../../components/DeviceCard";
import { FlatGrid } from "react-native-super-grid";
import { StyleSheet, Dimensions } from "react-native";
import { useSession } from "../../../utils/ctx";
import axios from "axios";
import { SERVER_ENDPOINT } from "../../../globals";

const list = () => {
  const [devices, setDevices] = useState([]);
  const { session } = useSession();
  const user = JSON.parse(session);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/devices/user/${user.userId}`
        );
        setDevices(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <FlatGrid
      itemDimension={130}
      data={devices}
      renderItem={({ item }) => (
        <Card name={item.name} id={item.id} type={item.itemType} />
      )}
    />
  );
};

export default list;
