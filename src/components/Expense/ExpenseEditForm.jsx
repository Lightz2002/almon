import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Button, Icon, Input, useTheme } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { expenseCategory, expenseEdit, expenseGet } from "../../api";
import ErrorText from "../../global/ErrorText";
import Loading from "../../global/Loading";
import Typography from "../../global/Typography";
import { formatDate, formatNumber } from "../../helper";

const ExpenseEditForm = ({ setAlertVisible }) => {
  const defaultError = {
    amount: [],
    note: [],
    date: [],
    expense_category_id: [],
  };
  const route = useRoute();
  const expenseId = route.params?.expenseId;
  const [isLoading, setIsLoading] = useState(true);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const isFocused = useIsFocused();
  const [errors, setErrors] = useState(defaultError);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState({});
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const { theme } = useTheme();

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      try {
        let data = await expenseGet(expenseId);
        let categoryId = "";
        if (data) {
          data = data.data.data;
          setAmount(data.amount);
          setDate(new Date(data.date));
          setNote(data.note);
          categoryId = data.expense_category_id;
        }

        let data2 = await expenseCategory();
        if (data2) data2 = data2.data.data;
        setExpenseCategories(data2);
        setCategory(data2.find(data => data.id == categoryId));
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };

    if (isFocused) {
      fetchExpenseCategories();
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  const style = StyleSheet.create({
    form: {
      width: "80%",
      padding: 20,
      borderRadius: 15,
      backgroundColor: theme.colors.white,
    },

    formTitle: {
      marginBottom: 20,
    },

    formInputContainer: {
      marginTop: 10,
    },

    label: {
      fontSize: 15,
      fontFamily: "poppins-medium",
      color: theme.colors.black,
      marginBottom: 10,
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
      fontSize: 15,
      fontFamily: "poppins-regular",
      color: theme.colors.black,
      textAlign: "left",
    },
    dropdownDropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: {
      fontSize: 15,
      fontFamily: "poppins-regular",
      color: theme.colors.black,
      textAlign: "left",
    },

    borderRight: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.primary,
      textAlign: "center",
      paddingHorizontal: 5,
      marginRight: 8,
    },

    dateDisabledInput: {
      color: theme.colors.black,
    },

    textarea: {
      height: 100,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.white,
      fontSize: 8,
      fontFamily: "poppins-regular",
      width: "100%",
      borderRadius: 5,
    },

    saveButton: {
      color: theme.colors.white,
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
    },
  });

  const handleValidation = () => {
    let validationError = { ...defaultError };
    let valid = true;

    if (+amount === 0) {
      validationError.amount.push("Jumlah tidak boleh kosong");
      valid = false;
    }

    if (!category?.id) {
      validationError.expense_category_id.push(
        "Jenis Pengeluaran wajib diisi "
      );
      valid = false;
    }

    setErrors(validationError);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      let valid = handleValidation();

      const data = {
        amount,
        date: formatDate(date, "yyyy-mm-dd"),
        note,
        expense_category_id: category.id,
      };

      if (valid) {
        const response = await expenseEdit(expenseId, data);
        if (response?.status === 200) {
          setAlertVisible(true);
          setTimeout(() => setAlertVisible(false), 2000);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDateChange = (e, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const handleAmountChange = amount => {
    let convertedAmount = amount.replace(/[.,]/g, "");
    if (convertedAmount.length <= 12) {
      convertedAmount = +convertedAmount;
      setAmount(convertedAmount);
    }
  };

  const handleNoteChange = note => {
    if (note.length <= 200) {
      setNote(note);
    }
  };

  const handleCategoryChange = (selectedItem, index) => {
    setCategory(selectedItem);
  };

  const showDate = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleDateChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  return (
    <View style={[style.form]}>
      {/* title */}
      <View style={[style.formTitle]}>
        <Typography variant="headerMedium" textAlign="center">
          Ubah
        </Typography>
        <Typography
          variant="headerMedium"
          textAlign="center"
          color={theme.colors.primary}
        >
          Data Pengeluaran
        </Typography>
      </View>

      {/* Form Inputs */}
      <View style={[style.formInputContainer]}>
        <ErrorText errors={errors.amount} />
        <Input
          inputContainerStyle={style.input}
          containerStyle={{ paddingHorizontal: 0 }}
          leftIcon={<Typography>Rp</Typography>}
          leftIconContainerStyle={style.borderRight}
          label="Jumlah"
          labelStyle={style.label}
          placeholder="x.xxx.xxx"
          keyboardType="phone-pad"
          onChangeText={amount => handleAmountChange(amount)}
          value={formatNumber(amount, "no-currency")}
        />

        <ErrorText errors={errors.expense_category_id} />
        <Typography variant="textMedium">Jenis Pengeluaran</Typography>
        <SelectDropdown
          data={expenseCategories}
          onSelect={(selectedItem, index) =>
            handleCategoryChange(selectedItem, index)
          }
          defaultButtonText="Pilih jenis pengeluaran"
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
          defaultValue={category}
        />

        <TouchableOpacity style={[style.inputDate]} onPress={showDate}>
          <Input
            inputContainerStyle={style.input}
            containerStyle={{ paddingHorizontal: 0 }}
            leftIcon={<Icon size={24} type="fontisto" name="date" />}
            leftIconContainerStyle={style.borderRight}
            label="Tanggal"
            labelStyle={style.label}
            placeholder="dd/mm/yyyy"
            value={formatDate(date)}
            disabled
            disabledInputStyle={style.dateDisabledInput}
          />
        </TouchableOpacity>
        <Input
          inputContainerStyle={style.textarea}
          containerStyle={{ paddingHorizontal: 0 }}
          label="Catatan"
          labelStyle={style.label}
          placeholder="contoh: beli mobil"
          multiline={true}
          onChangeText={note => handleNoteChange(note)}
          value={note}
        />

        <Button
          containerStyle={[style.saveButton]}
          buttonStyle={[style.saveButton]}
          onPress={handleSubmit}
        >
          Simpan
        </Button>
      </View>
    </View>
  );
};

export default ExpenseEditForm;
