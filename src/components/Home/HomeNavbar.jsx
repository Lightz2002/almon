import React from "react";
import { StyleSheet, View } from "react-native";
import HomeNavbarTop from "./HomeNavbarTop";
import HomeNavbarInfo from "./HomeNavbarInfo";
import { useTheme } from "@rneui/themed";

const HomeNavbar = ({ budgetInfo }) => {
  const { theme } = useTheme();
  const style = StyleSheet.create({
    home: {
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: theme.colors.primary,
      flex: 1,
      position: "relative",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });

  return (
    <View style={[style.home]}>
      <HomeNavbarTop />
      <HomeNavbarInfo budgetInfo={budgetInfo} />
    </View>
  );
};

export default HomeNavbar;
