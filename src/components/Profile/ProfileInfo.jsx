import { Icon, useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useUser } from "../../contexts/UserContext";
import Typography from "../../global/Typography";

const ProfileInfo = () => {
  const { theme } = useTheme();
  const user = useUser();

  const style = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: theme.colors.white,
      paddingTop: 20,
      paddingBottom: 20,
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: 15,
    },

    iconContainer: {
      marginRight: 30,
    },

    info: {
      flexBasis: "50%",
    },
  });

  return (
    <View style={[style.container]}>
      <View style={[style.iconContainer]}>
        <Icon
          size={48}
          name="user-alt"
          type="font-awesome-5"
          containerStyle={{
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 15,
          }}
          color={theme.colors.white}
        />
      </View>

      <View style={[style.info]}>
        <Typography variant="text2Medium" color={theme.colors.primary}>
          Halo, {user?.username ?? "User"}
        </Typography>
        <Typography variant="text2">
          {user?.isAuthenticated
            ? `${user?.email ?? ""}
          ${user?.phone_number ?? ""}`
            : "Silahkan daftar untuk pengalaman lebih baik"}
        </Typography>
      </View>
    </View>
  );
};

export default ProfileInfo;
