import { Icon, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

const OnboardPageIndicator = ({ page }) => {
  const { theme } = useTheme();
  const style = StyleSheet.create({
    container: {
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "center",
      width: "50%",
      flexBasis: "10%",
    },

    icon: {
      marginRight: 10,
    },
  });
  return (
    <View style={style.container}>
      {[1, 2, 3].map(iconNumber => {
        return (
          <Icon
            key={iconNumber}
            name="circle"
            type="font-awesome"
            color={
              page === iconNumber ? theme.colors.primary : theme.colors.lighter
            }
            containerStyle={style.icon}
          />
        );
      })}
    </View>
  );
};

export default OnboardPageIndicator;
