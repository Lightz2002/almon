import { useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const { theme } = useTheme();

  const style = StyleSheet.create({
    container: {
      position: "relative",
    },

    top: {
      flexBasis: "50%",
      alignItems: "center",
      backgroundColor: theme.colors.white,

      padding: 50,
    },

    bottom: {
      flexBasis: "50%",
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <View>
      <View style={[style.top]}></View>
      <View style={[style.bottom]}></View>
      <RegisterForm />
    </View>
  );
};

export default Register;
