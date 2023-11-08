import React, { createContext, useContext, useState } from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "../utils/ctx";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";

export default function Root() {
  return (
    <SessionProvider>
      <GluestackUIProvider>
        <StatusBar style="dark" />
        <Slot />
      </GluestackUIProvider>
    </SessionProvider>
  );
}
