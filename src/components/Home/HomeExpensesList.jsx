import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Loading from "../../global/Loading";
import Typography from "../../global/Typography";
import HomeExpensesListItem from "./HomeExpensesListItem";

const HomeExpensesList = ({ expenses, isLoading, setSelectedExpense }) => {
  // let justifyContent = "center";
  // let alignItems = "center";
  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  let content = <Typography>Masukkan Data Pengeluaranmu</Typography>;

  if (isLoading) {
    content = <Loading />;
  }

  if (expenses.length > 0) {
    content = expenses.map(expense => {
      return (
        <HomeExpensesListItem
          key={expense.id}
          expense={expense}
          setSelectedExpense={setSelectedExpense}
        />
      );
    });

    // justifyContent = "flex-start";
    // alignItems = "strech";
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 10,
        // justifyContent: justifyContent,
        // alignItems: alignItems,
      }}
      style={[style.container]}
    >
      {content}
    </ScrollView>
  );
};

export default HomeExpensesList;
