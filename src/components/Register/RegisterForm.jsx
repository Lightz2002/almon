import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button, Icon, Input, useTheme } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { register, getSecurityQuestion } from "../../api";
import Typography from "../../global/Typography";
import SelectDropdown from "react-native-select-dropdown";
import Modal from "../../global/Modal";
import ErrorText from "../../global/ErrorText";
import ShowPasswordIcon from "../../global/ShowPasswordIcon";

const RegisterForm = () => {
  const defaultError = {
    username: [],
    password: [],
    confirmationPassword: [],
    phoneNumber: [],
    email: [],
    securityQuestion: [],
    securityQuestionAnswer: [],
  };
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [errors, setErrors] = useState(defaultError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [securityQuestions, setsecurityQuestions] = useState([]);
  const [securityQuestion, setsecurityQuestion] = useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState("");

  const { theme } = useTheme();
  useEffect(() => {
    const fetchSecurityQuestions = async () => {
      try {
        let data = await getSecurityQuestion();
        if (data) data = data.data;
        setsecurityQuestions(data);
        setsecurityQuestion(data[0]);
      } catch (e) {
        console.log(e);
      }
    };

    if (isFocused) {
      fetchSecurityQuestions();
    }
  }, [isFocused]);
  const style = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      paddingVertical: 30,
      borderRadius: 30,
      height: 600,
      width: "80%",
      position: "absolute",
      alignSelf: "center",
      top: "40%",
      marginTop: "-40%",
      zIndex: 999,
      alignSelf: "center",
      backgroundColor: theme.colors.white,
      shadowColor: theme.colors.black,
      elevation: 20,
    },

    form: {
      marginTop: 15,
    },

    inputErrorStyle: {
      margin: 0,
      padding: 0,
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

    inputContainerStyle: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },

    dropdown1BtnStyle: {
      width: "100%",
      marginBottom: 20,
      height: 50,
      backgroundColor: "#FFF",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    dropdown1BtnTxtStyle: {
      fontSize: 12,
      fontFamily: "poppins-regular",
      color: theme.colors.black,
      textAlign: "left",
    },
    dropdown1DropdownStyle: { backgroundColor: "#fff" },
    dropdown1RowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: {
      fontSize: 12,
      fontFamily: "poppins-regular",
      color: theme.colors.black,
      textAlign: "left",
    },

    button: {
      borderRadius: 5,
      elevation: 10,
      shadowColor: "#000",
      fontFamily: "poppins-regular",
    },

    register: {
      textAlign: "center",
      flexDirection: "row",
      marginTop: 15,
      padding: 0,
      justifyContent: "center",
    },

    registerButton: {
      padding: 0,
      margin: 0,
    },

    label: {
      fontSize: 14,
      fontFamily: "poppins-medium",
      fontWeight: "normal",
      color: theme.colors.black,
    },

    modalIcon: {
      marginBottom: 10,
    },

    modalButton: {
      marginTop: 10,
    },
  });

  const handleUsernameChange = username => {
    setUsername(username);
  };

  const handlePhoneNumberChange = phoneNumber => {
    setPhoneNumber(phoneNumber);
  };

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handlePasswordChange = password => {
    setPassword(password);
  };

  const handleConfirmationPasswordChange = confirmationPassword => {
    setConfirmationPassword(confirmationPassword);
  };

  const handleSecurityQuestionChange = (selectedItem, index) => {
    setsecurityQuestion(securityQuestion);
  };

  const handleValidation = async () => {
    try {
      let validationError = { ...defaultError };
      let valid = true;

      if (password != confirmationPassword) {
        let message = ["Password tidak sama dengan konfirmasi password"];
        validationError.password.push(message);
        validationError.confirmationPassword.push(message);
      }

      setErrors(validationError);
      return valid;
    } catch (e) {}
  };

  const resetInput = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmationPassword("");
    setPhoneNumber("");
    setSecurityQuestion(securityQuestions[0]);
    setSecurityQuestionAnswer("");
  };

  const handleSubmit = async () => {
    try {
      let valid = handleValidation();

      if (valid) {
        const data = {
          username,
          password,
          phone_number: phoneNumber,
          email,
          // security_question_id: securityQuestion.id,
          // security_question_answer: securityQuestionAnswer,
        };
        const response = await register(data);
        if (response?.status === 201) {
          setOverlayVisible(true);
          resetInput();
        }
      }
    } catch (e) {
      if (e?.response?.status === 422) {
        setErrors(errors => ({ ...errors, ...e.response.data.error.data }));
      }
    }
  };

  const togglePassword = () => {
    setHidePassword(prev => !prev);
  };

  const toggleConfirmPassword = () => {
    setHideConfirmPassword(prev => !prev);
  };

  return (
    <View style={[style.container]}>
      {/* title */}
      <Typography
        variant="bodyMedium"
        textAlign="center"
        color={theme.colors.primary}
      >
        Daftar
        <Typography variant="bodyMedium"> akun anda</Typography>
      </Typography>

      {/* Inputs */}
      <View style={[style.form]}>
        <ErrorText errors={errors.username} />
        <Input
          errorStyle={style.inputErrorStyle}
          inputStyle={style.inputText}
          placeholderTextColor={theme.colors.grey}
          onChangeText={handleUsernameChange}
          inputContainerStyle={style.input}
          label={"Username"}
          labelStyle={style.label}
          containerStyle={style.inputContainerStyle}
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
        {/* <ErrorText errors={errors.phoneNumber} />
        <Input
          errorStyle={style.inputErrorStyle}
          inputStyle={style.inputText}
          placeholderTextColor={theme.colors.grey}
          label={"Nomor Telepon"}
          labelStyle={style.label}
          onChangeText={handlePhoneNumberChange}
          containerStyle={style.inputContainerStyle}
          inputContainerStyle={style.input}
          placeholder="Masukkan nomor telepon anda"
          keyboardType="phone-pad"
          value={phoneNumber}
        /> */}
        <ErrorText errors={errors.password} />
        <Input
          errorStyle={style.inputErrorStyle}
          inputStyle={style.inputText}
          placeholderTextColor={theme.colors.grey}
          label={"Kata Sandi"}
          labelStyle={style.label}
          onChangeText={handlePasswordChange}
          inputContainerStyle={style.input}
          containerStyle={style.inputContainerStyle}
          placeholder="Masukkan kata sandi anda"
          secureTextEntry={hidePassword}
          rightIcon={
            <ShowPasswordIcon
              isHidePassword={hidePassword}
              togglePassword={togglePassword}
            />
          }
          value={password}
        />
        <ErrorText errors={errors.confirmationPassword} />
        <Input
          errorStyle={style.inputErrorStyle}
          inputStyle={style.inputText}
          placeholderTextColor={theme.colors.grey}
          label={"Konfirmasi Kata Sandi"}
          labelStyle={style.label}
          containerStyle={style.inputContainerStyle}
          onChangeText={handleConfirmationPasswordChange}
          inputContainerStyle={style.input}
          placeholder="Ulangi kata sandi anda"
          secureTextEntry={hideConfirmPassword}
          rightIcon={
            <ShowPasswordIcon
              isHidePassword={hideConfirmPassword}
              togglePassword={toggleConfirmPassword}
            />
          }
          value={confirmationPassword}
        />
        <ErrorText errors={errors.securityQuestion} />
        {/* <Typography variant="text2Medium">Pertanyaan Keamanan</Typography> */}
        {/* <SelectDropdown
          data={securityQuestions}
          onSelect={(selectedItem, index) =>
            handleSecurityQuestionChange(selectedItem, index)
          }
          defaultButtonText="Pilih Pertanyaan Keamanan"
          dropdownIconPosition={"right"}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                type="font-awesome-5"
                color={theme.colors.primary}
                size={18}
              />
            );
          }}
          buttonStyle={style.dropdown1BtnStyle}
          buttonTextStyle={style.dropdown1BtnTxtStyle}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
          dropdownStyle={style.dropdownDropdownStyle}
          rowStyle={style.dropdown1RowStyle}
          rowTextStyle={style.dropdown1RowTxtStyle}
          defaultValue={securityQuestions[0]}
        /> */}

        {/* <ErrorText errors={errors.securityQuestionAnswer} /> */}
        {/* <Input
          errorStyle={style.inputErrorStyle}
          inputStyle={style.inputText}
          placeholderTextColor={theme.colors.grey}
          label={"Jawaban"}
          labelStyle={style.label}
          containerStyle={style.inputContainerStyle}
          onChangeText={securityQuestionAnswer =>
            setSecurityQuestionAnswer(securityQuestionAnswer)
          }
          inputContainerStyle={style.input}
          value={securityQuestionAnswer}
          placeholder="Masukkan jawaban anda"
        /> */}
        <Button containerStyle={[style.button]} onPress={() => handleSubmit()}>
          Daftar
        </Button>

        <View style={[style.register]}>
          <Typography textAlign="center" variant="text">
            Sudah mempunyai akun ?{" "}
          </Typography>
          <Button
            containerStyle={[style.registerButton]}
            buttonStyle={[style.registerButton]}
            type="clear"
            onPress={() => navigation.navigate("Login")}
          >
            Masuk
          </Button>
        </View>
      </View>

      {/* Overlay */}
      <Modal
        buttonText="Tutup"
        navigateTo="Login"
        visible={overlayVisible}
        buttonStyle={style.modalButton}
        setVisible={setOverlayVisible}
        icon={{
          name: "check-decagram-outline",
          type: "material-community",
          color: theme.colors.primary,
          style: style.modalIcon,
          size: 64,
        }}
        text={
          <Typography textAlign="center" variant="body2Medium">
            Pendaftaran{" "}
            <Typography variant="body2Medium" color={theme.colors.primary}>
              Berhasil
            </Typography>
          </Typography>
        }
      />
    </View>
  );
};

export default RegisterForm;
