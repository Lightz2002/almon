import { useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import HomeTransactionsList from "./HomeTransactionsList";

const HomeTransactions = ({ isLoading, setSelectedTransaction }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      position: "relative",
      backgroundColor: theme.colors.white,
      // ...contentStyle,
    },
  });

  return (
    <View style={[styles.container]}>
      <HomeTransactionsList
        setSelectedTransaction={setSelectedTransaction}
        isLoading={isLoading}
      />
    </View>
  );
};

export default HomeTransactions;
