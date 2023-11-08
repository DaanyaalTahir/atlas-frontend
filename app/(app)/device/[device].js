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
import RNEventSource from "react-native-event-source";
import { useSession } from "../../../utils/ctx";

const Device = () => {
  const local = useLocalSearchParams();
  const deviceId = local.device;
  const sheetRef = useRef(null);
  const [mapRef, setMapRef] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("Loading...");
  const [deviceInfo, setDeviceInfo] = useState({});
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [dateTime, setDateTime] = useState(null);
  const { session } = useSession();
  const user = JSON.parse(session);

  useEffect(() => {
    console.log({ latitude, longitude });
    if (mapRef && latitude != 0 && longitude != 0)
      mapRef.fitToCoordinates([
        {
          latitude: latitude,
          longitude: longitude,
        },
      ]);
  }, [mapRef, latitude, longitude]);

  useEffect(() => {
    async function fetchData() {
      try {
        const deviceResponse = await axios.get(
          `${SERVER_ENDPOINT}/devices/device/${deviceId}`
        );
        setDeviceInfo(deviceResponse.data);

        const lastLocationResponse = await axios.get(
          `${SERVER_ENDPOINT}/locations/last-location/${deviceId}`
        );

        setLatitude(lastLocationResponse.data.latitude);
        setLongitude(lastLocationResponse.data.longitude);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const reverseGeocode = async () => {
      const reverseGeocodedAddress = await reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });
      if (reverseGeocodedAddress[0]) {
        const { streetNumber, street, city, region, postalCode } =
          reverseGeocodedAddress[0];
        setCurrentAddress(
          `${streetNumber || ""} ${street || ""} ${city || ""} ${
            region || ""
          } ${postalCode || ""}`
        );
      }
    };

    if (latitude != 0 && longitude != 0) reverseGeocode();
  }, [latitude, longitude]);

  useEffect(() => {
    const eventSource = new RNEventSource(
      `${SERVER_ENDPOINT}/events/${user.userId}`
    );

    eventSource.addEventListener(`${user.userId}_device_location`, (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.deviceId == deviceId) {
        setLatitude(parsedData.latitude);
        setLongitude(parsedData.longitude);
      }
    });

    return () => {
      eventSource.removeAllListeners();
      eventSource.close();
    };
  }, []);

  const snapPoints = ["20%", "40%"];
  const actionArray = [
    {
      icon: <Navigation />,
      onPressEvent: () =>
        Linking.openURL(
          `maps://0,0?q=${deviceInfo.name}@${latitude},${longitude}`
        ),
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
          coordinate={{ latitude: latitude, longitude: longitude }}
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
