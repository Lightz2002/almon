import { Icon, useTheme } from "@rneui/themed";
import React from "react";

const ShowPasswordIcon = ({ isHidePassword, togglePassword }) => {
  const { theme } = useTheme();
  const getIcon = () => {
    if (isHidePassword) {
      return {
        name: "eye",
        type: "feather",
      };
    } else {
      return {
        name: "eye-off",
        type: "feather",
      };
    }
  };

  let icon = getIcon();

  return (
    <Icon
      name={icon.name}
      type={icon.type}
      color={theme.colors.grey}
      onPress={togglePassword}
    ></Icon>
  );
};

export default ShowPasswordIcon;
