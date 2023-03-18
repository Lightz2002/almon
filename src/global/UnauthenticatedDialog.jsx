import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Dialog } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import Typography from "./Typography";

const UnauthenticatedDialog = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) setVisible(true);
  }, [isFocused]);
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();

  function redirectLogin() {
    navigation.navigate("Login");
    setVisible(false);
  }

  return (
    <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)}>
      <Dialog.Title title="Login Terlebih Dahulu !" />
      <Typography>Daftar untuk menambah transaksi !</Typography>
      <Dialog.Actions>
        <Dialog.Button title="Daftar" onPress={() => redirectLogin()} />
      </Dialog.Actions>
    </Dialog>
  );
  k;
};

export default UnauthenticatedDialog;
