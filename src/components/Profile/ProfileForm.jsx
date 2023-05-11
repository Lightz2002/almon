import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Input, useTheme } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { updateUser as updateUserApi } from "../../api";
import Typography from "../../global/Typography";
import Modal from "../../global/Modal";
import ErrorText from "../../global/ErrorText";
import { useUpdateUser, useUser } from "../../contexts/UserContext";
import { formatNumber } from "../../helper";

const ProfileForm = () => {
  const defaultError = {
    username: [],
    email: [],
    monthly_salary: [],
  };
  const user = useUser();
  const navigation = useNavigation();
  const updateUser = useUpdateUser();
  const [isSendingLoading, setIsSendingLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [errors, setErrors] = useState(defaultError);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [salary, setSalary] = useState(+user?.monthly_salary);

  const { theme } = useTheme();
  const style = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      paddingVertical: 30,
      borderRadius: 30,
      height: 500,
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
      backgroundColor: theme.colors.white,
      fontSize: 8,
      fontFamily: "poppins-regular",
      width: "100%",
      borderRadius: 5,
    },

    inputWithPadding: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.white,
      fontSize: 8,
      fontFamily: "poppins-regular",
      width: "100%",
      borderRadius: 5,
      paddingHorizontal: 5,
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

    borderRight: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.primary,
      textAlign: "center",
      paddingHorizontal: 5,
      marginRight: 8,
    },
  });

  const handleUsernameChange = newUsername => {
    setUsername(newUsername);
  };

  const handleSalaryChange = newSalary => {
    let convertedSalary = newSalary.replace(/[.,]/g, "");
    if (convertedSalary.length <= 12) {
      convertedSalary = +convertedSalary;
      setSalary(convertedSalary);
    }
  };

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handleValidation = async () => {
    try {
      let validationError = { ...defaultError };
      let valid = true;

      if (!username) {
        validationError.username.push("Username wajib diisi");
      }

      if (!email) {
        validationError.email.push("Email wajib diisi");
      }

      if (!monthly_salary || monthly_salary <= 0) {
        validationError.monthly_salary.push(
          "Gaji wajib diisi dan tidak boleh 0"
        );
      }

      setErrors(validationError);
      return valid;
    } catch (e) {}
  };

  const handleSubmit = async () => {
    try {
      setIsSendingLoading(true);
      let valid = handleValidation();

      if (valid) {
        const data = {
          username,
          monthly_salary: salary,
          email,
        };
        const response = await updateUserApi(data, user?.id);
        if (response?.status === 200) {
          updateUser({ ...user, ...data });
          setOverlayVisible(true);
        }
      }

      setIsSendingLoading(false);
      return () => {
        setIsSendingLoading(false);
      };
    } catch (e) {
      setIsSendingLoading(false);

      if (e?.response?.status === 422) {
        setErrors(errors => ({ ...errors, ...e.response.data.error.data }));
      }
    }
  };

  return (
    <View style={[style.container]}>
      {/* title */}
      <Typography
        variant="bodyMedium"
        textAlign="center"
        color={theme.colors.primary}
      >
        Ubah
        <Typography variant="bodyMedium"> profile</Typography>
      </Typography>

      {/* Inputs */}
      <View style={[style.form]}>
        <ErrorText errors={errors.username} />
        <Input
          errorStyle={style.inputErrorStyle}
          placeholderTextColor={theme.colors.grey}
          onChangeText={handleUsernameChange}
          inputContainerStyle={style.inputWithPadding}
          label={"Username"}
          labelStyle={style.label}
          containerStyle={style.inputContainerStyle}
          placeholder="Masukkan username anda"
          value={username}
          defaultValue="123"
        />
        <ErrorText errors={errors.email} />
        <Input
          errorStyle={style.inputErrorStyle}
          placeholderTextColor={theme.colors.grey}
          onChangeText={handleEmailChange}
          containerStyle={style.inputContainerStyle}
          label={"Email"}
          labelStyle={style.label}
          inputContainerStyle={style.inputWithPadding}
          placeholder="Masukkan email anda"
          value={email}
        />
        <ErrorText errors={errors.monthly_salary} />
        <Input
          placeholder="Masukkan gaji anda disini"
          placeholderTextColor={theme.colors.grey}
          leftIcon={<Typography>Rp</Typography>}
          label="Gaji"
          labelStyle={style.label}
          leftIconContainerStyle={style.borderRight}
          inputContainerStyle={style.input}
          containerStyle={{ paddingHorizontal: 0 }}
          keyboardType="phone-pad"
          onChangeText={newSalary => handleSalaryChange(newSalary)}
          value={formatNumber(salary, "no-currency")}
        />

        <Button
          containerStyle={[style.button]}
          onPress={() => handleSubmit()}
          loading={isSendingLoading}
        >
          Ubah
        </Button>
      </View>

      {/* Overlay */}
      <Modal
        buttonText="Tutup"
        navigateTo="Profile"
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
            Profile{" "}
            <Typography variant="body2Medium" color={theme.colors.primary}>
              Berhasil Diubah
            </Typography>
          </Typography>
        }
      />
    </View>
  );
};

export default ProfileForm;
