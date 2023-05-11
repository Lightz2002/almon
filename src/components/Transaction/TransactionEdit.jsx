import { useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Alert from "../../global/Alert";
import TransactionEditForm from "./TransactionEditForm";

const TransactionEdit = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const { theme } = useTheme();
  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
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
      <TransactionEditForm setAlertVisible={setAlertVisible} />
      <Alert
        style={style.successAlert}
        visible={alertVisible}
        message="Data berhasil diedit"
      />
    </View>
  );
};

export default TransactionEdit;
