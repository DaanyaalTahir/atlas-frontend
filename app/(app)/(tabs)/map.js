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
  Image,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import axios from "axios";
import { useSession } from "../../../utils/ctx";
import { SERVER_ENDPOINT } from "../../../globals";
import RNEventSource from "react-native-event-source";
import { getTrackerIcon } from "../../../utils/utilities";
const map = () => {
  const [mapRef, setMapRef] = useState(null);
  const [devices, setDevices] = useState([]);

  const { session } = useSession();
  const user = JSON.parse(session);

  useEffect(() => {
    if (mapRef) mapRef.fitToElements();
  }, [mapRef, devices]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/locations/all-devices-last-location/${user.userId}`
        );
        setDevices(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const eventSource = new RNEventSource(
      `${SERVER_ENDPOINT}/events/${user.userId}_maps`
    );

    eventSource.addEventListener(
      `${user.userId}_maps_device_location`,
      (event) => {
        const parsedData = JSON.parse(event.data);
        const devicesCopy = [...devices];
        const { deviceId, latitude, longitude, date } = parsedData;
        const updatedDevices = devicesCopy.map((device) => {
          if (device.DeviceId == deviceId) {
            return {
              ...device,
              Latitude: latitude,
              Longitude: longitude,
              Date: date,
            };
          } else {
            return device;
          }
        });
        setDevices(updatedDevices);
      }
    );

    return () => {
      eventSource.removeAllListeners();
      eventSource.close();
    };
  }, [devices]);

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation={true}
      ref={(ref) => {
        setMapRef(ref);
      }}
    >
      {devices.map((device) => {
        const { DeviceId, Latitude, Longitude, name, itemType } = device;
        return (
          <Marker
            key={DeviceId}
            coordinate={{ latitude: Latitude, longitude: Longitude }}
          >
            <Image
              source={getTrackerIcon(itemType)}
              size="xs"
              borderWidth="$2"
              borderRadius="50%"
              borderColor="$primary400"
              backgroundColor="$primary50"
              alt="item_type"
            />
            <Callout>
              <CalloutSubview
                onPress={() => {
                  router.push(`/device/${DeviceId}`);
                }}
              >
                <Heading>{name}</Heading>
                <Button variant="link">
                  <ButtonText>View Device</ButtonText>
                </Button>
              </CalloutSubview>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default map;
