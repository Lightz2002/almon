import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import HomeNavbar from "./HomeNavbar";
import HomeExpenses from "./HomeExpenses";
import { profile, expenseBudgetInfo, expenseList } from "../../api";
import { useUpdateUser } from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import ExpenseDetail from "../Expense/ExpenseDetail";
import Loading from "../../global/Loading";
import HomeExpensesAction from "./HomeExpensesAction";

const Home = () => {
  const [selectedExpense, setSelectedExpense] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [budgetInfo, setBudgetInfo] = useState({});
  const updateUser = useUpdateUser();
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
    },

    loading: {
      flexGrow: 1,
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { data: data },
        } = await profile();
        if (data) {
          data.isAuthenticated = true;
          updateUser(data);
        }

        const data2 = await expenseBudgetInfo();
        if (data2) setBudgetInfo(data2.data);

        let data3 = await expenseList();
        if (data3) data3 = data3.data.data;
        setExpenses(data3);

        if (data3) {
          setIsLoading(false);
        }
      } catch (e) {
        if (e?.response?.status === 401) {
          updateUser({
            username: "User",
            isAuthenticated: false,
          });
          setBudgetInfo({
            expense: 0,
            salary: 0,
            remain: 0,
          });
        }
        setIsLoading(false);
      }
    };

    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);

  const handleSelectedExpense = expense => {
    setSelectedExpense(expense);
    setOverlayVisible(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={[styles.container]}>
      <HomeNavbar budgetInfo={budgetInfo} />
      <HomeExpenses
        expenses={expenses}
        isLoading={isLoading}
        setSelectedExpense={handleSelectedExpense}
      />
      <HomeExpensesAction />
      <ExpenseDetail
        visible={overlayVisible}
        setVisible={setOverlayVisible}
        expense={selectedExpense}
      />
    </View>
  );
};

export default Home;
