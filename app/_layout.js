import React, { createContext, useContext, useState } from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "../utils/ctx";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import EventSourceProvider from "../utils/EventSourceProvider";

export default function Root() {
  return (
    <SessionProvider>
      <EventSourceProvider>
        <GluestackUIProvider>
          <StatusBar style="dark" />
          <Slot />
        </GluestackUIProvider>
      </EventSourceProvider>
    </SessionProvider>
  );
}
