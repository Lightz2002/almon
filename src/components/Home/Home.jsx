import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import HomeNavbar from "./HomeNavbar";
import HomeTransactions from "./HomeTransactions";
import { profile, expenseBudgetInfo, transactionList } from "../../api";
import { useUpdateUser } from "../../contexts/UserContext";
import { useIsFocused } from "@react-navigation/native";
import TransactionDetail from "../Transaction/TransactionDetail";
import Loading from "../../global/Loading";
import HomeTransactionsAction from "./HomeTransactionsAction";
import {
  TransactionProvider,
  useTransactions,
  useUpdateTransaction,
  useUpdateTransactions,
} from "../../contexts/transactionContext";

const Home = () => {
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [budgetInfo, setBudgetInfo] = useState({});
  const isFocused = useIsFocused();
  const updateUser = useUpdateUser();
  const transactions = useTransactions();
  const updateTransactions = useUpdateTransactions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
      backgroundColor: "white",
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
          updateTransactions(data3);
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
          setSelectedTransaction([]);
          updateTransactions({});
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

  const handleSelectedTransaction = transaction => {
    setSelectedTransaction(transaction);
    setOverlayVisible(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={[styles.container]}>
      <HomeNavbar budgetInfo={budgetInfo} />
      <HomeTransactions
        isLoading={isLoading}
        setSelectedTransaction={handleSelectedTransaction}
      />
      <HomeTransactionsAction />
      <TransactionDetail
        visible={overlayVisible}
        setVisible={setOverlayVisible}
        transaction={selectedTransaction}
      />
    </View>
  );
};

export default Home;
