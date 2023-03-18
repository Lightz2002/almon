import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import HomeNavbarInfoExpense from "./HomeNavbarInfoExpense";
import HomeNavbarInfoRemain from "./HomeNavbarInfoRemain";

const HomeNavbarInfo = ({ budgetInfo }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const style = StyleSheet.create({
    navbarInfo: {
      borderRadius: 15,
      backgroundColor: theme.colors.lighter,
      padding: 10,
      flexBasis: 120,
      width: "100%",
      height: "100%",
      flexDirection: "row",
    },
  });

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Allocation Summary")}>
      <View style={[style.navbarInfo]}>
        <HomeNavbarInfoExpense expense={budgetInfo?.expenses} />
        <HomeNavbarInfoRemain remain={budgetInfo?.remain} />
      </View>
    </TouchableOpacity>
  );
};

export default HomeNavbarInfo;
