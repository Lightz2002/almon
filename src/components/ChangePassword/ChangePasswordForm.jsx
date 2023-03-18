import { Button, Input, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { validateForgetPassword } from "../../api";
import Background from "../../global/Background";
import Typography from "../../global/Typography";
import ErrorText from "../../global/ErrorText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordForm = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

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
  });

  const defaultError = {
    username: [],
    email: [],
    security_question_answer: [],
    message: [],
  };

  const [errors, setErrors] = useState(defaultError);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState("");

  const handleEmailChange = newEmail => {
    setEmail(newEmail);
  };

  const handleSecurityQuestionAnswerChange = newSecurityQuestionAnswer => {
    setSecurityQuestionAnswer(newSecurityQuestionAnswer);
  };

  const handleUsernameChange = newUsername => {
    setUsername(newUsername);
  };

  const resetInput = () => {
    setEmail("");
    setSecurityQuestionAnswer("");
    setUsername("");
  };

  const handleValidation = () => {
    let validationError = { ...defaultError };
    let valid = true;
    if (!username) {
      validationError.username.push("Username wajib diisi");
    }

    if (!email) {
      validationError.email.push("Email wajib diisi");
    }

    if (!securityQuestionAnswer) {
      validationError.security_question_answer.push(
        "Jawaban keamanan wajib diisi"
      );
    }

    if (!username || !email || !securityQuestionAnswer) {
      valid = false;
    }

    setErrors(validationError);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      let valid = handleValidation();

      if (valid) {
        const credentials = {
          email,
          username,
          security_question_answer: securityQuestionAnswer,
        };
        let data = await validateForgetPassword(credentials);
        if (data.status === 200) {
          await AsyncStorage.setItem("forgetPasswordToken", data.data.token);
          const forgetPasswordCredential = JSON.stringify({
            username: username,
            email: email,
          });
          await AsyncStorage.setItem(
            "forgetPasswordCredential",
            forgetPasswordCredential
          );
          resetInput();
          navigation.navigate("ChangePasswordForm2");
        }
      }
    } catch (e) {
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
          Ganti
          <Typography variant="bodyMedium"> Kata Sandi</Typography>
        </Typography>
        <ErrorText errors={errors.message} />

        {/* Inputs */}
        <View style={[style.formGroupContainer]}>
          <ErrorText errors={errors.username} />
          <Input
            errorStyle={style.inputErrorStyle}
            inputStyle={style.inputText}
            placeholderTextColor={theme.colors.grey}
            onChangeText={handleUsernameChange}
            containerStyle={style.inputContainerStyle}
            label={"Username"}
            labelStyle={style.label}
            inputContainerStyle={style.input}
            placeholder="Masukkan username anda"
            value={username}
          />

          <ErrorText errors={errors.email} />
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

          <ErrorText errors={errors.security_question_answer} />
          <Input
            errorStyle={style.inputErrorStyle}
            inputStyle={style.inputText}
            placeholderTextColor={theme.colors.grey}
            onChangeText={handleSecurityQuestionAnswerChange}
            containerStyle={style.inputContainerStyle}
            label={"Jawaban"}
            labelStyle={style.label}
            inputContainerStyle={style.input}
            placeholder="Masukkan jawaban keamanan anda"
            value={securityQuestionAnswer}
          />
        </View>

        <Button containerStyle={style.button} onPress={handleSubmit}>
          Selanjutnya
        </Button>
      </View>
    </Background>
  );
};

export default ChangePasswordForm;
