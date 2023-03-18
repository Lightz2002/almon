import { useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileInfo from "./ProfileInfo";

const ProfileTop = () => {
  const { theme } = useTheme();

  const style = StyleSheet.create({
    container: {
      position: "relative",
      zIndex: 1,
      flexBasis: "50%",
      backgroundColor: theme.colors.primary,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      borderCollapse: "separate",
      // borderRadius: 15,
    },
  });

  return (
    <View style={[style.container]}>
      <ProfileInfo />
    </View>
  );
};

export default ProfileTop;
