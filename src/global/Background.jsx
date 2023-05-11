import { Image, useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";

const Background = ({ children }) => {
  const { theme } = useTheme();
  const Logo = require("../../assets/images/logo.png");

  const style = StyleSheet.create({
    container: {
      position: "relative",
      // backgroundColor: "red",
      flex: 1,
      minHeight: "100%",
    },

    top: {
      flexBasis: "60%",
      alignItems: "center",
      backgroundColor: theme.colors.white,
      padding: 50,
      position: "relative",
    },

    bottom: {
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      backgroundColor: theme.colors.primary,
      flexGrow: 1,
    },
  });
  return (
    <View style={[style.container]}>
      <View style={[style.top]}>
        <Image
          source={Logo}
          containerStyle={{
            width: "80%",
            height: "100%",
            objectFit: "cover",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
          style={{
            width: 120,
            height: 110,
            position: "absolute",
            top: 50,
            left: 50,
            objectFit: "cover",
            alignSelf: "center",
            zIndex: 9999,
          }}
        />
      </View>
      <View style={[style.bottom]}></View>
      {children}
    </View>
  );
};

export default Background;
