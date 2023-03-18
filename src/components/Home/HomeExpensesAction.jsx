import { useNavigation } from "@react-navigation/native";
import { Icon, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useUser } from "../../contexts/UserContext";

const HomeExpensesAction = () => {
  const { theme } = useTheme();
  const user = useUser();
  const navigation = useNavigation();

  const style = StyleSheet.create({
    action: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: theme.colors.white,
      flexBasis: "10%",
      padding: 10,
      width: "100%",
      alignSelf: "center",
    },
  });

  let redirectAddExpense = (redirectAllocation = "Redirect Login");
  if (user?.isAuthenticated) {
    redirectAddExpense = "Add Expense";
    redirectAllocation = "Allocation";
  }

  return (
    <View style={[style.action]}>
      <Icon
        size={48}
        name="pie-chart"
        type="feather"
        color={theme.colors.primary}
        onPress={() => navigation.navigate(redirectAllocation)}
      />
      <Icon
        size={48}
        name="add-circle-outline"
        type="ion-icons"
        color={theme.colors.primary}
        icon={{ name: "add-circle", type: "ion-icons" }}
        onPress={() => navigation.navigate(redirectAddExpense)}
      />
    </View>
  );
};

export default HomeExpensesAction;
