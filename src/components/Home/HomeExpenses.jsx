import { useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import HomeExpensesList from "./HomeExpensesList";

const HomeExpenses = ({ expenses, isLoading, setSelectedExpense }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      position: "relative",
      backgroundColor: theme.colors.white,
    },
  });

  return (
    <View style={[styles.container]}>
      <HomeExpensesList
        setSelectedExpense={setSelectedExpense}
        expenses={expenses}
        isLoading={isLoading}
      />
    </View>
  );
};

export default HomeExpenses;
