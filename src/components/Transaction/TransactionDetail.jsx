import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Header, Icon, Overlay, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../global/Typography";
import { formatDate, formatNumber } from "../../helper";

const TransactionDetail = ({ visible, setVisible, transaction }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const style = StyleSheet.create({
    overlay: {
      width: "80%",
      padding: 0,
      borderRadius: 15,
    },

    header: {
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },

    headerCenterStyle: {
      flexGrow: 5,
    },

    body: {
      padding: 20,
    },

    date: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },

    dataContainer: {
      flexGrow: 3,
    },

    amountContainer: {
      flexGrow: 2,
      marginLeft: "auto",
      marginVertical: 30,
    },

    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      flexGrow: 1,
    },

    button: {
      width: "45%",
    },
  });

  function toggleOverlay() {
    setVisible(visible => !visible);
  }

  const { amount, date, note, transaction_category_name } = transaction;

  return (
    <Overlay
      overlayStyle={[style.overlay]}
      backdropStyle={[style.backdrop]}
      isVisible={visible}
      onBackdropPress={toggleOverlay}
    >
      <Header
        centerComponent={
          <Typography color={theme.colors.white}>Detail Transaksi</Typography>
        }
        containerStyle={style.header}
        centerContainerStyle={style.headerCenterStyle}
        leftContainerStyle={{ width: 0 }}
        leftComponent={<></>}
      ></Header>

      <View style={[style.body]}>
        <View style={[style.dataContainer]}>
          <View>
            <Typography variant="titleMedium">
              {transaction_category_name}
            </Typography>
            <View style={[style.date]}>
              <Typography variant="text">Tanggal</Typography>
              <Typography variant="text">{date}</Typography>
            </View>
            <Typography variant="bodyMedium">Catatan:</Typography>
            <Typography>{note}</Typography>
          </View>
        </View>
        <View style={[style.amountContainer]}>
          <Typography variant="titleBold">Jumlah</Typography>
          <Typography variant="body2">{formatNumber(amount)}</Typography>
        </View>
        <View style={[style.buttonContainer]}>
          <Button
            containerStyle={style.button}
            type="outline"
            onPress={() => {
              navigation.navigate({
                name: "Edit Transaction",
                params: { transactionId: transaction.id },
                merge: true,
              });
            }}
          >
            Ubah
          </Button>
          <Button containerStyle={style.button} onPress={toggleOverlay}>
            Tutup
          </Button>
        </View>
      </View>
    </Overlay>
  );
};

export default TransactionDetail;
