import { useNavigation } from "@react-navigation/native";
import { Button, Input, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { login, profile } from "../../api";
import Typography from "../../global/Typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUpdateUser } from "../../contexts/UserContext";
import * as Device from "expo-device";
import ErrorText from "../../global/ErrorText";
import ShowPasswordIcon from "../../global/ShowPasswordIcon";
import Background from "../../global/Background";

const LoginForm = () => {
  const navigation = useNavigation();
  const defaultError = {
    username: [],
    password: [],
  };
  const [errors, setErrors] = useState(defaultError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const { theme } = useTheme();
  const updateUser = useUpdateUser();

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

    form: {
      marginTop: 30,
      marginBottom: 0,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      paddingVertical: 5,
      paddingHorizontal: 10,
      color: "black",
      borderRadius: 5,
      marginBottom: 0,
    },

    inputText: {
      fontSize: 12,
      fontFamily: "poppins-regular",
      color: "theme.colors.grey2",
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

    forgetPasswordButtonContainer: {
      width: "45%",
      padding: 0,
      marginBottom: 10,
    },

    forgetPasswordButton: {
      textAlign: "left",
      padding: 0,
      margin: 0,
    },

    forgetPasswordButtonText: {
      textAlign: "left",
      fontFamily: "poppins-regular",
      fontSize: 11,
      width: "100%",
    },

    register: {
      textAlign: "center",
      flexDirection: "row",
      marginTop: 30,
      padding: 0,
      justifyContent: "center",
    },

    registerButton: {
      padding: 0,
      margin: 0,
    },
  });

  function resetInput() {
    setPassword();
    setUsername();
  }

  function handleValidation() {
    let validationError = defaultError;
    if (!username) {
      validationError.username.push("Username wajib diisi");
    }

    if (!password) {
      validationError.password.push("Password wajib diisi");
    }

    setErrors(validationError);
  }

  async function handleSubmit() {
    try {
      handleValidation();
      const response = await login({
        username,
        password,
        device_name: Device.deviceName,
      });
      await AsyncStorage.setItem("token", response.data);
      const {
        data: { data: data },
      } = await profile();
      if (data) {
        data.isAuthenticated = true;
        updateUser(data);
        let navigateTo = +data.monthly_salary ? "Home" : "Allocation";
        navigation.navigate(navigateTo);
      }
      resetInput();
    } catch (e) {
      if (e?.response?.status === 401 || e?.response?.status === 422) {
        setErrors(error => ({
          ...error,
          username: ["Username atau password salah"],
        }));
      }
    }
  }

  const togglePassword = () => {
    setHidePassword(prevHidePassword => !prevHidePassword);
  };

  return (
    <View style={[style.container]}>
      <Typography
        variant="bodyMedium"
        textAlign="center"
        color={theme.colors.primary}
      >
        Masuk
        <Typography variant="bodyMedium"> ke akun anda</Typography>
      </Typography>

      {/* Inputs */}
      <View style={[style.form]}>
        <ErrorText errors={errors.username} />

        <Typography variant="text2Medium">Username</Typography>
        <Input
          onChangeText={username => setUsername(username)}
          inputContainerStyle={style.input}
          inputStyle={style.inputText}
          placeholder="Masukkan username anda"
          placeholderTextColor={theme.colors.grey}
          containerStyle={{ paddingHorizontal: 0 }}
          value={username}
        />

        <ErrorText errors={errors.password} />
        <Typography variant="text2Medium">Kata Sandi</Typography>
        <Input
          onChangeText={password => setPassword(password)}
          inputContainerStyle={style.input}
          placeholder="Masukkan kata sandi anda"
          containerStyle={{
            paddingHorizontal: 0,
            height: 60,
            marginBottom: 0,
          }}
          inputStyle={style.inputText}
          placeholderTextColor={theme.colors.grey}
          secureTextEntry={hidePassword}
          inputErrorStyle={style.inputErrorStyle}
          value={password}
          rightIcon={
            <ShowPasswordIcon
              isHidePassword={hidePassword}
              togglePassword={togglePassword}
            />
          }
        />
        <Button
          buttonStyle={style.forgetPasswordButton}
          containerStyle={style.forgetPasswordButtonContainer}
          titleStyle={style.forgetPasswordButtonText}
          iconRight={true}
          type="clear"
          onPress={() => navigation.navigate("ChangePasswordForm")}
        >
          Lupa kata sandi
        </Button>
        <Button containerStyle={[style.button]} onPress={() => handleSubmit()}>
          Masuk
        </Button>

        <View style={[style.register]}>
          <Typography textAlign="center" variant="text">
            Tidak mempunyai akun ?{" "}
          </Typography>
          <Button
            containerStyle={[style.registerButton]}
            buttonStyle={[style.registerButton]}
            type="clear"
            onPress={() => navigation.navigate("Register")}
          >
            Daftar
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
