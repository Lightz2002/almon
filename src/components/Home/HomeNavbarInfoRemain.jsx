import { useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../global/Typography";
import { formatNumber } from "../../helper";

const HomeNavbarInfoRemain = ({ remain }) => {
  const { theme } = useTheme();
  const style = StyleSheet.create({
    container: {
      padding: 10,
      borderRightColor: theme.colors.grey,
      borderRightWidth: 1,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      flex: 1,
      backgroundColor: theme.colors.white,
      justifyContent: "space-evenly",
    },
  });

  return (
    <View style={[style.container]}>
      <Typography variant="text" color={theme.colors.primary}>
        Saldo
      </Typography>
      <Typography variant="text">{formatNumber(remain)}</Typography>
    </View>
  );
};

export default HomeNavbarInfoRemain;
