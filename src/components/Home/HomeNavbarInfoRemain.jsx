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
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      flex: 1,
      backgroundColor: theme.colors.white,
      justifyContent: "space-evenly",
    },
  });

  return (
    <View style={[style.container]}>
      <Typography variant="text" color={theme.colors.primary}>
        Sisa
      </Typography>
      <Typography variant="text">{formatNumber(remain)}</Typography>
    </View>
  );
};

export default HomeNavbarInfoRemain;
