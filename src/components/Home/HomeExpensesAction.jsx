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
      backgroundColor: theme.colors.lightest,
      flexBasis: "8%",
      padding: 10,
      width: "80%",
      alignSelf: "center",
      borderRadius: 20,
    },
  });

  // prettier-ignore
  let redirectAddExpense, redirectSummary, redirectAllocation;
  redirectAddExpense = redirectSummary = redirectAllocation = "Redirect Login";

  if (user?.isAuthenticated) {
    redirectAddExpense = "Add Expense";
    redirectAllocation = "Allocation";
    redirectSummary = "Allocation Summary";
  }

  return (
    <View style={[style.action]}>
      <Icon
        size={48}
        name="pie-chart"
        type="feather"
        color={theme.colors.dark}
        onPress={() => navigation.navigate(redirectAllocation)}
      />
      <Icon
        size={30}
        name="add"
        type="ion-icons"
        color={theme.colors.dark}
        containerStyle={{ marginBottom: 50 }}
        reverse
        onPress={() => navigation.navigate(redirectAddExpense)}
      />
      <Icon
        size={48}
        name="file-download-outline"
        type="material-community"
        color={theme.colors.dark}
        onPress={() => navigation.navigate(redirectSummary)}
      />
    </View>
  );
};

export default HomeExpensesAction;
