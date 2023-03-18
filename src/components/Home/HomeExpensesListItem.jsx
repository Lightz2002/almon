import { Card } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Typography from "../../global/Typography";
import { limit, formatNumber } from "../../helper";

const HomeExpensesListItem = ({ expense, setSelectedExpense }) => {
  const style = StyleSheet.create({
    card: {
      borderRadius: 15,
    },

    cardTitle: {
      flexDirection: "row",
      alignItems: "baseline",
    },
  });

  return (
    <Card containerStyle={[style.card]}>
      <TouchableOpacity onPress={() => setSelectedExpense(expense)}>
        <View style={[style.cardTitle]}>
          <Typography variant="titleMedium">
            {expense.expense_category_name}
          </Typography>
          <Typography variant="text" marginLeft="auto">
            {formatNumber(expense.amount)}
          </Typography>
        </View>
        <View>
          <Typography variant="smallBold">
            Catatan:
            <Typography variant="small">{limit(expense.note, 3)}</Typography>
          </Typography>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default HomeExpensesListItem;
