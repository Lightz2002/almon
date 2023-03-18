import { Image, useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";

const Background = ({ children }) => {
  const { theme } = useTheme();
  const Logo = require("../../assets/images/logo.png");

  const style = StyleSheet.create({
    container: {
      position: "relative",
    },

    top: {
      flexBasis: "60%",
      alignItems: "center",
      backgroundColor: theme.colors.white,
      padding: 50,
    },

    bottom: {
      flexBasis: "40%",
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      backgroundColor: theme.colors.primary,
    },
  });
  return (
    <View>
      <View style={[style.top]}>
        <Image
          source={Logo}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
      <View style={[style.bottom]}></View>
      {children}
    </View>
  );
};

export default Background;
