import { Icon, ListItem, useTheme, Button } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../global/Typography";
import { useNavigation } from "@react-navigation/native";
import { useUpdateUser, useUser } from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileAction = () => {
  const { theme } = useTheme();
  const user = useUser();
  const updateUser = useUpdateUser();
  const navigation = useNavigation();

  const logout = async () => {
    updateUser({
      username: "User",
      isAuthenticated: false,
    });

    await AsyncStorage.setItem("token", "");
  };

  const style = StyleSheet.create({
    container: {
      borderCollapse: "separate",
      flexBasis: "50%",
      borderRadius: 20,
      backgroundColor: theme.colors.white,
    },

    buttonLogout: {
      backgroundColor: theme.colors.error,
      width: "50%",
      marginTop: 50,
      alignSelf: "center",
      elevation: 5,
    },
  });

  return (
    <View style={[style.container]}>
      {!user?.isAuthenticated && (
        <ListItem
          style={[style.firstList]}
          onPress={() => navigation.navigate("Login")}
        >
          <Icon
            name="login"
            type="ant-design"
            containerStyle={{
              borderRadius: 50,
              padding: 10,
              backgroundColor: theme.colors.lighter,
            }}
          />

          <ListItem.Content>
            <ListItem.Title>
              <Typography>Daftar atau Masuk</Typography>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )}
      <ListItem>
        <Icon
          name="exclamationcircleo"
          type="ant-design"
          containerStyle={{
            borderRadius: 50,
            padding: 10,
            backgroundColor: theme.colors.lighter,
          }}
        />
        <ListItem.Content>
          <ListItem.Title>
            <Typography>Feedback</Typography>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <Icon
          name="file-download-outline"
          type="material-community"
          containerStyle={{
            borderRadius: 50,
            padding: 10,
            backgroundColor: theme.colors.lighter,
          }}
        />
        <ListItem.Content>
          <ListItem.Title>
            <Typography>Rekap Pengeluaran</Typography>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {user?.isAuthenticated && (
        <Button
          color={theme.colors.error}
          containerStyle={[style.buttonLogout]}
          onPress={logout}
        >
          Keluar
        </Button>
      )}
    </View>
  );
};

export default ProfileAction;
