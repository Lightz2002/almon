import { useTheme } from "@rneui/themed";
import React from "react";
import Typography from "./Typography";

const ErrorText = ({ errors }) => {
  const { theme } = useTheme();

  return errors.map((error, index) => {
    return (
      <Typography variant="small" color={theme.colors.error} key={index}>
        {error}
      </Typography>
    );
  });
};

export default ErrorText;
