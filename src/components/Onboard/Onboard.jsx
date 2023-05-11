import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, useTheme, Button } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../global/Typography";
import OnboardPageIndicator from "./OnboardPageIndicator";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

const Onboard = () => {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();

  function onSwipeLeft(gestureState) {
    setPage(page => {
      if (page >= 3) return page;
      return page + 1;
    });
  }

  function onSwipeRight(gestureState) {
    setPage(page => {
      if (page <= 1) return page;
      return page - 1;
    });
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },

    primaryButton: {},

    image: {
      width: 300,
      height: 300,
    },

    imageContainer: {
      flexBasis: "60%",
      alignItems: "center",
      justifyContent: "center",
    },

    contentContainer: {
      flexBasis: "20%",
      width: "80%",
      alignSelf: "center",
      alignItems: "center",
    },

    button: {
      width: "40%",
      borderRadius: 5,
    },

    // primaryButton: {
    // },

    secondaryButton: {
      backgroundColor: theme.colors.grey3,
    },

    primaryButtonTitle: {
      fontSize: 18,
      fontFamily: "poppins-bold",
    },

    secondaryButtonTitle: {
      fontSize: 18,
      fontFamily: "poppins-bold",
      color: theme.colors.primary,
    },

    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  });

  const skipOnBoard = () => {
    navigation.navigate("Login");
  };

  const getPageContent = () => {
    let content = {};
    switch (page) {
      case 1:
        content.image = require("../../../assets/images/onboard_logo_1.png");
        content.title = "Alokasi Uangmu";
        content.text =
          "Ketik penghasilanmu tiap bulan dan ALMON akan membantu menghitung pengeluaran yang cocok untukmu.";
        content.button = (
          <>
            <Button
              buttonStyle={style.secondaryButton}
              titleStyle={style.secondaryButtonTitle}
              containerStyle={style.button}
              onPress={() => navigation.navigate("SplashScreen")}
            >
              Kembali
            </Button>
            <Button
              titleStyle={style.primaryButtonTitle}
              containerStyle={style.button}
              onPress={() => setPage(2)}
            >
              SELANJUTNYA
            </Button>
          </>
        );
        break;
      case 2:
        content.image = require("../../../assets/images/onboard_logo_2.png");
        content.title = "Lacak Pengeluaranmu";
        content.text =
          "Dengan ALMON, kamu bisa melacak pengeluaranmu tiap saat.";
        content.button = (
          <>
            <Button
              buttonStyle={style.secondaryButton}
              titleStyle={style.secondaryButtonTitle}
              containerStyle={style.button}
              onPress={() => setPage(1)}
            >
              Kembali
            </Button>
            <Button
              titleStyle={style.primaryButtonTitle}
              containerStyle={style.button}
              onPress={() => setPage(3)}
            >
              SELANJUTNYA
            </Button>
          </>
        );
        break;
      case 3:
        content.image = require("../../../assets/images/onboard_logo_3.png");
        content.title = "Atur Keuangan Lebih Baik";
        content.text =
          "ALMON ada untuk membantumu mengatur keuangan lebih baik.";
        content.button = (
          <Button
            titleStyle={style.primaryButtonTitle}
            containerStyle={style.button}
            onPress={skipOnBoard}
          >
            AYO MULAI !
          </Button>
        );
        break;
    }

    return content;
  };

  let content = getPageContent();

  const navigation = useNavigation();

  return (
    <View style={[style.container]}>
      <GestureRecognizer
        onSwipeLeft={state => onSwipeLeft(state)}
        onSwipeRight={state => onSwipeRight(state)}
      >
        <View style={[style.imageContainer]}>
          <Image source={content.image} style={style.image} />
        </View>
        <View style={[style.contentContainer]}>
          <Typography color={theme.colors.primary} variant="onboard">
            {content.title}
          </Typography>
          <Typography
            textAlign="center"
            color={theme.colors.grey2}
            variant="text"
          >
            {content.text}
          </Typography>
        </View>

        <OnboardPageIndicator page={page} setPage={setPage} />

        <View style={[style.buttonContainer]}>{content.button}</View>
      </GestureRecognizer>
    </View>
  );
};

export default Onboard;
