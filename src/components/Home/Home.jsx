import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import HomeNavbar from "./HomeNavbar";
import HomeExpenses from "./HomeExpenses";
import { profile, expenseBudgetInfo, transactionList } from "../../api";
import { useUpdateUser } from "../../contexts/UserContext";
import { useIsFocused } from "@react-navigation/native";
import ExpenseDetail from "../Transaction/TransactionDetail";
import Loading from "../../global/Loading";
import HomeExpensesAction from "./HomeExpensesAction";
import {
  ExpenseProvider,
  useExpenses,
  useUpdateExpense,
  useUpdateExpenses,
} from "../../contexts/expenseContext";

const Home = () => {
  const [selectedExpense, setSelectedExpense] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [budgetInfo, setBudgetInfo] = useState({});
  const isFocused = useIsFocused();
  const updateUser = useUpdateUser();
  const expenses = useExpenses();
  const updateExpenses = useUpdateExpenses();

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

        let data3 = await transactionList();
        if (data3) {
          data3 = data3.data.data;
          updateExpenses(data3);
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
          setSelectedExpense([]);
          updateExpenses({});
        }
        setIsLoading(false);
      }
    };

    if (isFocused) {
      fetchUser();
    }

    return () => {
      setIsLoading(true);
      setOverlayVisible(false);
    };
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
