import React from "react";
import { StyleSheet, Text } from "react-native";

const Typography = ({
  children,
  variant = "body",
  color = "black",
  textAlign = "left",
  marginLeft = 0,
}) => {
  const styles = StyleSheet.create({
    global: {
      color: color,
      textAlign: textAlign,
      marginLeft: marginLeft,
    },

    smallest: {
      fontFamily: "poppins-regular",
      fontSize: 12,
    },

    small: {
      fontFamily: "poppins-regular",
      fontSize: 13,
    },

    smallBold: {
      fontFamily: "poppins-bold",
      fontSize: 13,
    },

    text2: {
      fontFamily: "poppins-regular",
      fontSize: 14,
    },

    text2Medium: {
      fontFamily: "poppins-medium",
      fontSize: 14,
    },

    text: {
      fontFamily: "poppins-regular",
      fontSize: 15,
    },

    textMedium: {
      fontFamily: "poppins-medium",
      fontSize: 15,
    },

    body2: {
      fontFamily: "poppins-regular",
      fontSize: 16,
    },

    body2Medium: {
      fontFamily: "poppins-medium",
      fontSize: 16,
    },

    body: {
      fontFamily: "poppins-regular",
      fontSize: 18,
    },

    bodyMedium: {
      fontFamily: "poppins-medium",
      fontSize: 18,
    },

    titleMedium: {
      fontFamily: "poppins-medium",
      fontSize: 20,
    },

    titleBold: {
      fontFamily: "poppins-bold",
      fontSize: 20,
    },

    headerMedium: {
      fontFamily: "poppins-medium",
      fontSize: 22,
    },

    onboard: {
      fontFamily: "poppins-bold",
      fontSize: 24,
    },

    mainMedium: {
      fontFamily: "poppins-medium",
      fontSize: 32,
    },

    main: {
      fontFamily: "poppins-regular",
      fontSize: 32,
    },
  });

  return <Text style={[styles[variant], styles.global]}>{children}</Text>;
};

export default Typography;
