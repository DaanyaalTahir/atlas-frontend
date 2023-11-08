import React, { useState } from "react";
import { useStorageState } from "./useStorageState";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_ENDPOINT } from "../globals";

const AuthContext = React.createContext<{
  signIn: (email, password) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
} | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          // Perform sign-in logic here
          try {
            const data = { email, password };
            const response = await axios.post(
              `${SERVER_ENDPOINT}/users/login`,
              data
            );
            const { user } = response.data;
            router.replace("/");
            setSession(JSON.stringify(user));
          } catch (error) {
            console.error("Login Error:", error);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
