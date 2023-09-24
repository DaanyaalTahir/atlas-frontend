import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { Marker, Callout } from "react-native-maps";

const Device = () => {
  const local = useLocalSearchParams();
  const sheetRef = useRef(null);
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    if (mapRef) mapRef.fitToElements();
  }, [mapRef]);

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
      <BottomSheet snapPoints={snapPoints} ref={sheetRef}>
        <BottomSheetView>
          <Text>Hello world</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Device;
