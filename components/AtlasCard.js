import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

const AtlasCard = ({ children }) => {
  return (
    <Box
      borderColor="$borderLight200"
      borderRadius="$lg"
      borderWidth="$1"
      width="100%"
      padding={10}
      backgroundColor="$backgroundLight0"
    >
      {children}
    </Box>
  );
};

export default AtlasCard;
