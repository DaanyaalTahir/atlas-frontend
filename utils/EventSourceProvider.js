import React, { createContext, useState, useContext } from "react";
import EventSource from "react-native-sse";
import { SERVER_ENDPOINT } from "../globals";
// Create a context
const EventSourceContext = createContext();

// This hook can be used to access the user info.
export function useEventSource() {
  const value = useContext(EventSourceContext);
  return value;
}

// Create a provider component
function EventSourceProvider({ children }) {
  // State to store the EventSource instance
  const [eventSource, setEventSource] = useState(null);

  // Function to initialize the EventSource
  const initializeEventSource = () => {
    if (!eventSource) {
      const newEventSource = new EventSource(`${SERVER_ENDPOINT}/events/${1}`);
      setEventSource(newEventSource);
    }
  };

  return (
    <EventSourceContext.Provider value={{ eventSource, initializeEventSource }}>
      {children}
    </EventSourceContext.Provider>
  );
}

export default EventSourceProvider;
