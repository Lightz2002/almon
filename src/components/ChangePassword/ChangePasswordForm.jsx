import { Button, Input, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { sendForgetPasswordEmail } from "../../api";
import Background from "../../global/Background";
import Typography from "../../global/Typography";
import ErrorText from "../../global/ErrorText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordForm = () => {
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
      marginTop: "60%",
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
    email: [],
    message: [],
  };

  const [errors, setErrors] = useState(defaultError);
  const [email, setEmail] = useState("");

  const handleEmailChange = newEmail => {
    setEmail(newEmail);
  };

  const resetInput = () => {
    setEmail("");
  };

  const handleValidation = () => {
    let validationError = { ...defaultError };
    let valid = true;

    if (!email) {
      validationError.email.push("Email wajib diisi");
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
        const credentials = {
          email,
        };
        let data = await sendForgetPasswordEmail(credentials);
        if (data.status === 200) {
          setIsLoading(false);
          await AsyncStorage.setItem("email", email);
          resetInput();
          navigation.navigate("ChangePasswordForm2");
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
          <Typography variant="bodyMedium"> Email</Typography>
        </Typography>

        {/* Inputs */}
        <View style={[style.formGroupContainer]}>
          <ErrorText errors={[...errors.email, ...errors.message]} />
          <Input
            errorStyle={style.inputErrorStyle}
            inputStyle={style.inputText}
            placeholderTextColor={theme.colors.grey}
            onChangeText={handleEmailChange}
            containerStyle={style.inputContainerStyle}
            label={"Email"}
            labelStyle={style.label}
            inputContainerStyle={style.input}
            placeholder="Masukkan email anda"
            value={email}
          />
          <Typography variant="small" color={theme.colors.grey}>
            Token verifikasi akan dikirimkan ke email
          </Typography>
        </View>

        <Button
          containerStyle={style.button}
          onPress={handleSubmit}
          type="solid"
          loading={isLoading}
        >
          Selanjutnya
        </Button>
      </View>
    </Background>
  );
};

export default ChangePasswordForm;
