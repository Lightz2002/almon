import { useTheme, Avatar } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import React from "react";
import Typography from "../../global/Typography";
import { useUser } from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

const HomeNavbarTop = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const user = useUser();

  const style = StyleSheet.create({
    navbar: {
      width: "100%",
      flexDirection: "row",
      border: "1px solid black",
      alignItems: "center",
    },

    avatar: {
      marginLeft: "auto",
    },
  });

  return (
    <View style={[style.navbar]}>
      <View>
        <Typography variant="bodyMedium" color={theme.colors.white}>
          Selamat Pagi !
        </Typography>
        <Typography color={theme.colors.white}>
          {user?.username ?? "User"}
        </Typography>
      </View>
      <View style={[style.avatar]}>
        <Avatar
          size={80}
          icon={{ name: "user-circle", type: "font-awesome-5" }}
          onPress={() => navigation.navigate("Profile")}
        ></Avatar>
      </View>
    </View>
  );
};

export default HomeNavbarTop;
