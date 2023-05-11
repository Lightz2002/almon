import React from "react";
import { StyleSheet, View } from "react-native";
import HomeExpensesListItem from "./HomeExpensesListItem";
import Typography from "../../global/Typography";
import HomeExpensesDate from "./HomeExpensesDate";

const HomeExpensesListGroup = ({
  expenseDate,
  expenses,
  setSelectedExpense,
}) => {
  const style = StyleSheet.create({
    container: {
      paddingVertical: 10,
      // backgroundColor: "blue",
    },

    expensesContainer: {},
  });
  return (
    <View style={[style.container]}>
      <HomeExpensesDate date={expenseDate} />
      <View style={[style.expensesContainer]}>
        {expenses.map(expense => (
          <HomeExpensesListItem
            key={expense.id}
            expense={expense}
            setSelectedExpense={setSelectedExpense}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeExpensesListGroup;
