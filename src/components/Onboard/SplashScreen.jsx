import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { profile } from "../../api";
import { useUpdateUser, useUser } from "../../contexts/UserContext";

const SplashScreen = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
    },

    child: {
      flexBasis: "33%",
    },

    image: {
      width: "100%",
      height: "100%",
    },

    logo: {
      alignSelf: "center",
      width: 200,
      height: 200,
    },

    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: "34%",
    },
  });
  const user = useUser();
  const isFocused = useIsFocused();
  const updateUser = useUpdateUser();
  const Logo = require("../../../assets/images/logo.png");
  const Top = require("../../../assets/images/splash-top.png");
  const Bot = require("../../../assets/images/splash-bot.png");
  const navigation = useNavigation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const {
          data: { data: data },
        } = await profile();
        if (data) {
          data.isAuthenticated = true;
          updateUser(data);
        }

        if (isFocused) {
          setTimeout(() => {
            navigation.navigate("Home");
          }, 3000);
        }
      } catch (e) {
        if (e?.response?.status === 401) {
          updateUser({
            username: "User",
            isAuthenticated: false,
          });

          setTimeout(() => {
            navigation.navigate({
              name: "Onboard",
              params: { page: 1 },
              merge: true,
            });
          }, 200);
        }
      }
    };

    validateToken();
  }, [isFocused]);

  return (
    <View style={[style.container]}>
      <View style={[style.child]}>
        <Image source={Top} style={style.image} />
      </View>
      <View style={[style.logoContainer]}>
        <Image source={Logo} style={style.logo} />
      </View>
      <View style={[style.child]}>
        <Image source={Bot} style={style.image} />
      </View>
    </View>
  );
};

export default SplashScreen;
