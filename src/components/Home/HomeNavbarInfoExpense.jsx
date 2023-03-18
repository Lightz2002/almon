import { useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../global/Typography";
import { formatNumber } from "../../helper";

const HomeNavbarInfoExpense = ({ expense }) => {
  const { theme } = useTheme();
  const style = StyleSheet.create({
    container: {
      padding: 10,
      borderRightColor: theme.colors.grey,
      borderRightWidth: 1,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      flex: 1,
      justifyContent: "space-evenly",
      shadowColor: theme.colors.lighter,
      shadowOffset: { width: 50, height: 52 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
      backgroundColor: theme.colors.white,

      // flexDirection: "row",
      // border: "1px solid black",
    },
  });

  return (
    <View style={[style.container]}>
      <Typography variant="text" color={theme.colors.primary}>
        Pemakaian
      </Typography>
      <Typography variant="text">{formatNumber(expense)}</Typography>
    </View>
  );
};

export default HomeNavbarInfoExpense;
