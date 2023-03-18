import React, { useState } from "react";
import { View } from "react-native";
import Typography from "./Typography";
import { useTheme } from "@rneui/themed";

const Alert = ({ style, visible, message }) => {
  const { theme } = useTheme();

  return (
    <>
      {visible && (
        <View style={style}>
          <Typography color={theme.colors.white} textAlign="center">
            {message}
          </Typography>
        </View>
      )}
    </>
  );
};

export default Alert;
