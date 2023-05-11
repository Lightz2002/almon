import { useNavigation } from "@react-navigation/native";
import { Button, Icon, useTheme } from "@rneui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";

const OnboardPageIndicator = ({ page, setPage }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
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
          <TouchableOpacity
            key={iconNumber}
            onPress={() => setPage(iconNumber)}
          >
            <Icon
              name="circle"
              type="font-awesome"
              color={
                page === iconNumber
                  ? theme.colors.primary
                  : theme.colors.lighter
              }
              containerStyle={style.icon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default OnboardPageIndicator;
