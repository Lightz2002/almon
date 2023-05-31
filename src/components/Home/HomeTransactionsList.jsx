import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Loading from "../../global/Loading";
import Typography from "../../global/Typography";
import HomeTransactionsListGroup from "./HomeTransactionsListGroup";
import { useTransactions } from "../../contexts/transactionContext";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const HomeTransactionsList = ({ isLoading, setSelectedTransaction }) => {
  const navigation = useNavigation();
  const transactions = useTransactions();
  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  const handleAdd = () => {
    navigation.navigate("Add Transaction");
  };

  let content = (
    <View
      style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Typography>Oops, Anda Belum Punya Transaksi</Typography>
      <Button onPress={handleAdd}>+ Tambah Transaksi</Button>
    </View>
  );

  if (isLoading) {
    content = <Loading />;
  }

  if (Object.keys(transactions).length > 0) {
    content = Object.entries(transactions).map(([date, value]) => {
      return (
        <HomeTransactionsListGroup
          key={date}
          transactions={value}
          transactionDate={date}
          setSelectedTransaction={setSelectedTransaction}
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

export default HomeTransactionsList;
