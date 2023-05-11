import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Alert from "../../global/Alert";
import ExpenseForm from "./TransactionForm";

const TransactionCreate = () => {
  const { theme } = useTheme();
  const [alertVisible, setAlertVisible] = useState(false);

  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary,
      position: "relative",
    },

    successAlert: {
      position: "absolute",
      backgroundColor: theme.colors.success,
      colors: theme.colors.white,
      width: "100%",
      top: 0,
      padding: 8,
      textAlign: "center",
    },
  });

  return (
    <View style={[style.container]}>
      <ExpenseForm setAlertVisible={setAlertVisible} />
      <Alert
        style={style.successAlert}
        visible={alertVisible}
        message="Data berhasil ditambah"
      />
    </View>
  );
};

export default TransactionCreate;
