import { Card, Image, useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Typography from "../../global/Typography";
import { limit, formatNumber, formatDate } from "../../helper";

const HomeExpensesListItem = ({ expense, setSelectedExpense }) => {
  const { theme } = useTheme();
  const style = StyleSheet.create({
    card: {
      borderRadius: 15,
      marginVertical: 5,
      marginHorizontal: 10,
      elevation: 3,
    },

    cardTitle: {
      flexDirection: "row",
      alignItems: "baseline",
    },

    touchableContainer: {
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 10,
    },

    amountContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "auto",
    },

    categoryContainer: {
      marginLeft: 20,
    },
  });

  return (
    <Card containerStyle={[style.card]}>
      <TouchableOpacity
        onPress={() => setSelectedExpense(expense)}
        style={style.touchableContainer}
      >
        <View>
          <Image
            source={{ uri: expense.expense_category_icon }}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>
        <View style={[style.categoryContainer]}>
          <View style={[style.cardTitle]}>
            <Typography variant="textMedium">
              {expense.expense_category_name}
            </Typography>
          </View>
          <View>
            <Typography variant="small" color={theme.colors.grey}>
              Catatan: {limit(expense.note, 3)}
            </Typography>
          </View>
        </View>
        <View style={[style.amountContainer]}>
          <Typography variant="textMedium" color={theme.colors.error}>
            - {formatNumber(expense.amount)}
          </Typography>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default HomeExpensesListItem;
