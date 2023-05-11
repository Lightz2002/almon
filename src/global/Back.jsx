import { useNavigation } from "@react-navigation/native";
import { Icon, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

const Back = ({ navigateTo, colorType = "dark" }) => {
  const { theme } = useTheme();

  // const { name, type, size, color } = icon;
  const style = StyleSheet.create({
    iconContainer: {
      borderRadius: 50,
    },
  });
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <Icon
      name="arrowleft"
      size={24}
      type="ant-design"
      containerStyle={style.iconContainer}
      color={colorType === "dark" ? theme.colors.white : theme.colors.primary}
      onPress={handleNavigation}
    ></Icon>
  );
};

export default Back;
