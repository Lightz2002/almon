import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Loading from "../../global/Loading";
import Typography from "../../global/Typography";
import HomeExpensesListGroup from "./HomeExpensesListGroup";
import { useExpenses } from "../../contexts/expenseContext";

const HomeExpensesList = ({ isLoading, setSelectedExpense }) => {
  const expenses = useExpenses();
  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  let content = <Typography>Masukkan Data 1</Typography>;

  if (isLoading) {
    content = <Loading />;
  }

  if (Object.keys(expenses).length > 0) {
    content = Object.entries(expenses).map(([date, value]) => {
      return (
        <HomeExpensesListGroup
          key={date}
          expenses={value}
          expenseDate={date}
          setSelectedExpense={setSelectedExpense}
        />
      );
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 10,
      }}
      style={[style.container]}
    >
      {content}
    </ScrollView>
  );
};

export default HomeExpensesList;
