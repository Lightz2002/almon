import { Button, Icon, useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useUser } from "../../contexts/UserContext";
import Typography from "../../global/Typography";
import { useNavigation } from "@react-navigation/native";

const ProfileInfo = () => {
  const { theme } = useTheme();
  const user = useUser();
  const navigation = useNavigation();

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

    changeProfButton: {
      padding: 0,
    },
  });

  let content = (
    <Typography variant="text2">
      Silahkan daftar untuk pengalaman lebih baik
    </Typography>
  );

  if (user?.isAuthenticated) {
    content = (
      <>
        <Typography variant="text2">
          {user?.email ?? ""}
          {user?.phone_number ?? ""}
        </Typography>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="outline"
            title="Ubah profile"
            containerStyle={style.changeProfButton}
            onPress={() => navigation.navigate("ProfileForm")}
          ></Button>
        </View>
      </>
    );
  }

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
        {content}
      </View>
    </View>
  );
};

export default ProfileInfo;
