import { View, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { Marker, Callout } from "react-native-maps";
import { reverseGeocodeAsync } from "expo-location";
import { Heading, ButtonText } from "@gluestack-ui/themed";

const Device = () => {
  const local = useLocalSearchParams();
  const sheetRef = useRef(null);
  const [mapRef, setMapRef] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("Loading...");

  useEffect(() => {
    if (mapRef) mapRef.fitToElements();
  }, [mapRef]);

  useEffect(() => {
    const reverseGeocode = async () => {
      const reverseGeocodedAddress = await reverseGeocodeAsync({
        latitude: 43.65189,
        longitude: -79.381706,
      });
      const { streetNumber, street, city, region, postalCode } =
        reverseGeocodedAddress[0];
      setCurrentAddress(
        `${streetNumber} ${street} ${city} ${region} ${postalCode}`
      );
    };

    reverseGeocode();
  }, []);

  const snapPoints = ["20%", "10%", "50%", "90%"];

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerTitle: `Device ${local.device}` }} />
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
        <BottomSheetView>
          <Heading size="md">{currentAddress}</Heading>
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
