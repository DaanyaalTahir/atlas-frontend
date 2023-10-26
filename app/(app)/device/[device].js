import axios from "axios";
import { View, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { Marker, Callout } from "react-native-maps";
import { reverseGeocodeAsync } from "expo-location";
import { Heading, ButtonText } from "@gluestack-ui/themed";
import { FlatGrid } from "react-native-super-grid";
import { Navigation, MapPin, Settings, Volume2 } from "lucide-react-native";
import ActionCard from "../../../components/ActionCard";
import { Linking } from "react-native";
import { SERVER_ENDPOINT } from "../../../globals";
import EventSource from "react-native-sse";

const Device = () => {
  const local = useLocalSearchParams();
  const deviceId = local.device;
  const sheetRef = useRef(null);
  const [mapRef, setMapRef] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("Loading...");
  const [deviceInfo, setDeviceInfo] = useState({});
  const [listening, setListening] = useState(false);
  const latitude = 43.65189;
  const longitude = -79.381706;
  useEffect(() => {
    if (mapRef)
      mapRef.fitToCoordinates([
        {
          latitude: latitude,
          longitude: longitude,
        },
      ]);
  }, [mapRef]);

  useEffect(() => {
    const reverseGeocode = async () => {
      const reverseGeocodedAddress = await reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });
      const { streetNumber, street, city, region, postalCode } =
        reverseGeocodedAddress[0];
      setCurrentAddress(
        `${streetNumber} ${street} ${city} ${region} ${postalCode}`
      );
    };

    reverseGeocode();

    async function fetchData() {
      try {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/devices/device/${deviceId}`
        );
        setDeviceInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(`${SERVER_ENDPOINT}/events/${1}`);
    eventSource.addEventListener(`${deviceId}_location`, (event) => {
      console.log(event.type); // message
      console.log(event.data);
    });

    return () => {
      eventSource.removeAllEventListeners();
      eventSource.close();
    };
  }, []);

  const snapPoints = ["20%", "40%"];
  const actionArray = [
    {
      icon: <Navigation />,
      onPressEvent: () =>
        Linking.openURL(`maps://0,0?q=Custom Label@${latitude},${longitude}`),
      name: "Get Directions",
    },
    {
      icon: <MapPin />,
      onPressEvent: () => console.log("location history pressed"),
      name: "Location History",
    },
    {
      icon: <Volume2 />,
      onPressEvent: () => console.log("about device pressed"),
      name: "Play Sound",
    },
    {
      icon: <Settings />,
      onPressEvent: () => console.log("about device pressed"),
      name: "Device Settings",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{ headerTitle: `${deviceInfo.name && deviceInfo.name}` }}
      />
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        ref={(ref) => {
          setMapRef(ref);
        }}
      >
        <Marker
          key={1}
          coordinate={{ latitude: 43.65189, longitude: -79.381706 }}
          title="Cool pin"
          description="A description"
        />
      </MapView>
      <BottomSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        style={devicePageStyles.bottomSheet}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <Heading size="md">{currentAddress}</Heading>
          <FlatGrid
            itemDimension={115}
            data={actionArray}
            adjustGridToStyles={true}
            contentContainerStyle={{ maxHeight: 100 }}
            renderItem={({ item }) => (
              <ActionCard
                name={item.name}
                onPressEvent={item.onPressEvent}
                icon={item.icon}
              />
            )}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const devicePageStyles = StyleSheet.create({
  bottomSheet: {
    padding: 10,
  },
});

export default Device;
