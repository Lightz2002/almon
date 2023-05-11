import { Button, Input, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { validateForgetPassword } from "../../api";
import Background from "../../global/Background";
import Typography from "../../global/Typography";
import ErrorText from "../../global/ErrorText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordForm2 = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const style = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      paddingVertical: 30,
      borderRadius: 30,
      width: "80%",
      position: "absolute",
      top: 50,
      marginTop: "50%",
      zIndex: 999,
      alignSelf: "center",
      backgroundColor: theme.colors.white,
      shadowColor: theme.colors.black,
      elevation: 20,
    },

    formGroupContainer: {
      marginVertical: 25,
    },

    label: {
      fontSize: 14,
      fontFamily: "poppins-medium",
      fontWeight: "normal",
      color: theme.colors.black,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      paddingVertical: 5,
      paddingHorizontal: 10,
      height: 40,
      borderRadius: 5,
      marginVertical: 0,
    },

    inputText: {
      fontSize: 12,
      fontFamily: "poppins-regular",
    },

    inputErrorStyle: {
      margin: 0,
      padding: 0,
    },

    button: {
      borderRadius: 5,
      elevation: 10,
      shadowColor: "#000",
      fontFamily: "poppins-regular",
    },

    inputContainerStyle: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
  });

  const defaultError = {
    token: [],
    message: [],
  };

  const [errors, setErrors] = useState(defaultError);
  const [token, setToken] = useState("");

  const handleTokenChange = newToken => {
    setToken(newToken);
  };

  const resetInput = () => {
    setToken("");
  };

  const handleValidation = () => {
    let validationError = { ...defaultError };
    let valid = true;

    if (!token) {
      validationError.token.push("Token wajib diisi");
      valid = false;
    }

    setErrors(validationError);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      let valid = handleValidation();

      if (valid) {
        let email = await AsyncStorage.getItem("email");

        const credentials = {
          email: email,
          token,
        };
        let data = await validateForgetPassword(credentials);
        if (data.status === 200) {
          setIsLoading(false);
          resetInput();
          navigation.navigate("ChangePasswordForm3");
        }
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (e?.response?.status === 422) {
        if (e.response.data.error.data) {
          setErrors(error => {
            return {
              ...error,
              ...e.response.data.error.data,
            };
          });
        }
      }
    }
  };

  return (
    <Background>
      <View style={[style.container]}>
        <Typography
          textAlign="center"
          variant="bodyMedium"
          color={theme.colors.primary}
        >
          Verifikasi
          <Typography variant="bodyMedium"> Token</Typography>
        </Typography>

        {/* Inputs */}
        <View style={[style.formGroupContainer]}>
          <ErrorText errors={[...errors.token, ...errors.message]} />
          <Input
            errorStyle={style.inputErrorStyle}
            inputStyle={style.inputText}
            placeholderTextColor={theme.colors.grey}
            onChangeText={handleTokenChange}
            containerStyle={style.inputContainerStyle}
            label={"Token"}
            labelStyle={style.label}
            inputContainerStyle={style.input}
            placeholder="Masukkan token anda"
            value={token}
          />
        </View>

        <Button
          containerStyle={style.button}
          onPress={handleSubmit}
          loading={isLoading}
        >
          Selanjutnya
        </Button>
      </View>
    </Background>
  );
};

export default ChangePasswordForm2;
