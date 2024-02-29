import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Linking } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import MapView, {
  Marker,
  Callout,
  Polyline,
  CalloutSubview,
} from "react-native-maps";
import {
  Button,
  ButtonText,
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertText,
} from "@gluestack-ui/themed";
import { getReadableTime } from "../../../utils/utilities";
import { SERVER_ENDPOINT } from "../../../globals";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AlertCircle } from "lucide-react-native";

const LocationHistory = () => {
  const local = useLocalSearchParams();
  const deviceId = local.device;
  const [mapRef, setMapRef] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [date, setDate] = useState(new Date());

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  };

  useEffect(() => {
    if (mapRef)
      mapRef.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 30,
          right: 30,
          bottom: 30,
          left: 30,
        },
        animated: true,
      });
  }, [mapRef, coordinates]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/locations/dated-location/${deviceId}/${date.toISOString()}`
        );
        setCoordinates(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [date]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerTitle: "Location History" }} />
      {coordinates.length == 0 && (
        <Alert
          action="info"
          variant="accent"
          position="absolute"
          zIndex={100}
          top="40%"
          marginRight={30}
          marginLeft={30}
        >
          <AlertIcon as={AlertCircle} mr="$3" />
          <AlertText>No location data found for the specified date.</AlertText>
        </Alert>
      )}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          zIndex: 100,
          top: 20,
          height: 0,
        }}
      >
        <DateTimePicker
          value={date}
          mode="date"
          onChange={onChange}
          position="absolute"
        />
      </View>

      <MapView
        style={{ flex: 1 }}
        ref={(ref) => {
          setMapRef(ref);
        }}
        showsUserLocation={true}
      >
        <Polyline
          coordinates={coordinates}
          strokeColor="#1A91FF"
          strokeWidth={6}
          lineJoin="miter"
          lineCap="square"
        />
        {coordinates.map((coordinate, index) => {
          const { latitude, longitude, date } = coordinate;
          const dateObj = new Date(date);
          let readableTime = getReadableTime(dateObj);
          return (
            <Marker
              key={`coordinate_${index}`}
              coordinate={{ latitude, longitude }}
            >
              <Box
                height={25}
                width={25}
                borderWidth="$2"
                borderRadius="50%"
                borderColor="$primary400"
                backgroundColor="$primary50"
              />
              <Callout
                style={{
                  width: 150,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <CalloutSubview onPress={() => {}}>
                  <Heading size="xs">{readableTime}</Heading>
                  <Button
                    variant="link"
                    onPress={() =>
                      Linking.openURL(
                        `maps://0,0?q=Item Location@${latitude},${longitude}`
                      )
                    }
                  >
                    <ButtonText>Directions</ButtonText>
                  </Button>
                </CalloutSubview>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default LocationHistory;
