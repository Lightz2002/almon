import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { resetPassword } from "../../api";
import Alert from "../../global/Alert";
import Background from "../../global/Background";
import ErrorText from "../../global/ErrorText";
import ShowPasswordIcon from "../../global/ShowPasswordIcon";
import Typography from "../../global/Typography";

const ChangePasswordForm2 = () => {
  const { theme } = useTheme();
  const [alertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation();

  const defaultError = {
    password: [],
    confirmation_password: [],
    message: [],
  };

  const [errors, setErrors] = useState(defaultError);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handlePasswordChange = newPassword => {
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = newConfirmPassword => {
    setConfirmPassword(newConfirmPassword);
  };

  const togglePassword = () => {
    setHidePassword(prev => !prev);
  };

  const toggleConfirmPassword = () => {
    setHideConfirmPassword(prev => !prev);
  };

  const handleValidation = () => {
    let validationError = { ...defaultError };
    let valid = true;

    if (!password) {
      validationError.password.push("Kata sandi baru wajib diisi");
      valid = false;
    }

    if (!confirmPassword) {
      validationError.confirmation_password.push(
        "Ulangi Kata sandi baru wajib diisi"
      );
      valid = false;
    }

    if (password && confirmPassword && password != confirmPassword) {
      validationError.password.push(
        "Kata sandi tidak cocok dengan konfirmasi kata sandi"
      );
      valid = false;
    }

    setErrors(validationError);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      let valid = handleValidation();

      if (valid) {
        let forgetPasswordCredential = await AsyncStorage.getItem(
          "forgetPasswordCredential",
          forgetPasswordCredential
        );

        forgetPasswordCredential = JSON.parse(forgetPasswordCredential);

        const credentials = {
          password,
          username: forgetPasswordCredential.username,
          email: forgetPasswordCredential.email,
        };
        let data = await resetPassword(credentials);
        if (data.status === 200) {
          setAlertVisible(true);
          setTimeout(() => {
            navigation.navigate("Login");
          }, 1000);
        }
      }
    } catch (e) {
      console.log(e.response);
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

  const style = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      paddingVertical: 30,
      borderRadius: 30,
      height: "50%",
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

    successAlert: {
      position: "absolute",
      backgroundColor: theme.colors.success,
      colors: theme.colors.white,
      width: "100%",
      top: 50,
      padding: 8,
      textAlign: "center",
    },
  });
  return (
    <>
      <Background>
        <View style={[style.container]}>
          <Typography
            textAlign="center"
            variant="bodyMedium"
            color={theme.colors.primary}
          >
            Ganti
            <Typography variant="bodyMedium"> Kata Sandi</Typography>
          </Typography>
          <ErrorText errors={errors.message} />

          <View style={[style.formGroupContainer]}>
            <ErrorText errors={errors.password} />
            <Input
              errorStyle={style.inputErrorStyle}
              inputStyle={style.inputText}
              placeholderTextColor={theme.colors.grey}
              onChangeText={handlePasswordChange}
              containerStyle={style.inputContainerStyle}
              label={"Kata Sandi Baru"}
              labelStyle={style.label}
              inputContainerStyle={style.input}
              placeholder="Masukkan kata sandi baru"
              secureTextEntry={hidePassword}
              rightIcon={
                <ShowPasswordIcon
                  isHidePassword={hidePassword}
                  togglePassword={togglePassword}
                />
              }
              value={password}
            />

            <ErrorText errors={errors.confirmation_password} />
            <Input
              errorStyle={style.inputErrorStyle}
              inputStyle={style.inputText}
              placeholderTextColor={theme.colors.grey}
              onChangeText={handleConfirmPasswordChange}
              containerStyle={style.inputContainerStyle}
              label={"Konfirmasi Kata Sandi"}
              labelStyle={style.label}
              inputContainerStyle={style.input}
              placeholder="Ulangi kata sandi baru"
              secureTextEntry={hideConfirmPassword}
              rightIcon={
                <ShowPasswordIcon
                  isHidePassword={hideConfirmPassword}
                  togglePassword={toggleConfirmPassword}
                />
              }
              value={confirmPassword}
            />
          </View>

          <Button containerStyle={style.button} onPress={handleSubmit}>
            Selesai
          </Button>
        </View>
      </Background>
      <Alert
        style={style.successAlert}
        visible={alertVisible}
        message="Password berhasil diganti"
      ></Alert>
    </>
  );
};

export default ChangePasswordForm2;
