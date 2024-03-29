import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/Home/Home";
import Register from "./src/components/Register/Register";
import Login from "./src/components/Login/Login";
import Allocation from "./src/components/Allocation/Allocation";
import Profile from "./src/components/Profile/Profile";
import TransactionCreate from "./src/components/Transaction/TransactionCreate";
import UnauthenticatedDialog from "./src/global/UnauthenticatedDialog";
import { useTheme } from "@rneui/themed";
import Back from "./src/global/Back";
import { useUser } from "./src/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InitialScreen from "./src/components/InitialScreen";
import TransactionEdit from "./src/components/Transaction/TransactionEdit";
import AllocationSummary from "./src/components/Allocation/AllocationSummary";
import SplashScreen from "./src/components/Onboard/SplashScreen";
import Onboard from "./src/components/Onboard/Onboard";
import ProfileForm from "./src/components/Profile/ProfileForm";
import ChangePasswordForm from "./src/components/ChangePassword/ChangePasswordForm";
import ChangePasswordForm2 from "./src/components/ChangePassword/ChangePasswordForm2";
import ChangePasswordForm3 from "./src/components/ChangePassword/ChangePasswordForm3";

const Routes = ({ onLayoutRootView }) => {
  const { theme } = useTheme();
  const user = useUser();
  const Stack = createNativeStackNavigator();

  const style = StyleSheet.create({
    header: {
      backgroundColor: theme.colors.primary,
      elevation: 0,
    },

    headerWhite: {
      backgroundColor: theme.colors.white,
    },
  });

  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            title: "",
            headerStyle: style.header,
            headerTintColor: "#fff",
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="InitialScreen"
            component={InitialScreen}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="ChangePasswordForm"
            component={ChangePasswordForm}
            options={{
              headerLeft: () => <Back navigateTo="Login" colorType="light" />,
              headerStyle: {
                backgroundColor: "white",
              },
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="ChangePasswordForm2"
            component={ChangePasswordForm2}
            options={{
              headerLeft: () => (
                <Back navigateTo="ChangePasswordForm" colorType="light" />
              ),
              headerStyle: {
                backgroundColor: "white",
              },
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="ChangePasswordForm3"
            component={ChangePasswordForm3}
            options={{
              headerLeft: () => (
                <Back navigateTo="ChangePasswordForm2" colorType="light" />
              ),
              headerStyle: {
                backgroundColor: "white",
              },
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerBackVisible: false, headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerLeft: () => (
                <Back navigateTo={user?.isAuthenticated ? "Home" : "Login"} />
              ),
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Redirect Login"
            component={UnauthenticatedDialog}
            options={{
              headerStyle: style.headerWhite,
              headerTintColor: "black",
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Add Transaction"
            component={TransactionCreate}
          ></Stack.Screen>
          <Stack.Screen
            name="Allocation"
            component={Allocation}
            options={{}}
          ></Stack.Screen>
          <Stack.Screen
            name="Edit Transaction"
            component={TransactionEdit}
            options={{
              headerLeft: () => <Back navigateTo={"Home"} />,
            }}
            initialParams={{ transactionId: null }}
          ></Stack.Screen>
          <Stack.Screen
            name="Allocation Summary"
            component={AllocationSummary}
            options={{
              headerLeft: () => <Back navigateTo={"Home"} />,
            }}
            initialParams={{ transactionId: null }}
          ></Stack.Screen>
          <Stack.Screen
            name="ProfileForm"
            component={ProfileForm}
            options={{
              headerLeft: () => <Back navigateTo={"Profile"} />,
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 100,
  },
});
export default Routes;
