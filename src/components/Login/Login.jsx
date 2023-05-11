import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { profile } from "../../api";
import { useUpdateUser } from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../global/Loading";
import Background from "../../global/Background";

const Login = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const updateUser = useUpdateUser();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const {
          data: { data: data },
        } = await profile();
        if (data) {
          data.isAuthenticated = true;
          updateUser(data);
          let navigateTo = +data.monthly_salary ? "Home" : "Allocation";
          navigation.navigate(navigateTo);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    };

    if (isFocused) {
      validateToken();
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Background>
      <LoginForm />
    </Background>
  );
};

export default Login;
