import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";
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
import { router } from "expo-router";

const map = () => {
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    if (mapRef) mapRef.fitToElements();
  }, [mapRef]);

  return (
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
      >
        <Callout>
          <CalloutSubview
            onPress={() => {
              router.push(`/device/1`);
            }}
          >
            <Button>
              <ButtonText>Link</ButtonText>
            </Button>
          </CalloutSubview>
        </Callout>
      </Marker>
    </MapView>
  );
};

export default map;
