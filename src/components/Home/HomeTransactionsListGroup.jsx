import React from "react";
import { StyleSheet, View } from "react-native";
import HomeTransactionsListItem from "./HomeTransactionsListItem";
import Typography from "../../global/Typography";
import HomeTransactionsDate from "./HomeTransactionsDate";

const HomeTransactionsListGroup = ({
  transactionDate,
  transactions,
  setSelectedTransaction,
}) => {
  const style = StyleSheet.create({
    container: {
      paddingVertical: 10,
      // backgroundColor: "blue",
    },

    transactionsContainer: {},
  });
  return (
    <View style={[style.container]}>
      <HomeTransactionsDate date={transactionDate} />
      <View style={[style.transactionsContainer]}>
        {transactions.map(transaction => (
          <HomeTransactionsListItem
            key={transaction.id}
            transaction={transaction}
            setSelectedTransaction={setSelectedTransaction}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeTransactionsListGroup;
