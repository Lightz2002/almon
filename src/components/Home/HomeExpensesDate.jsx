import React from "react";
import { View } from "react-native";
import Typography from "../../global/Typography";
import { formatDate } from "../../helper";
import { StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";

const HomeExpensesDate = ({ date }) => {
  const { theme } = useTheme();
  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.greyBg,
      color: "white",
      padding: 5,
      paddingHorizontal: 10,
    },
  });
  return (
    <View style={[style.container]}>
      <Typography variant="small" color={theme.colors.greyDark}>
        {formatDate(new Date(date), "full")}
      </Typography>
    </View>
  );
};

export default HomeExpensesDate;
