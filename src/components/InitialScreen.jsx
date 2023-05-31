import React, { useEffect, useState } from "react";
import Login from "./Login/Login";
import { profile } from "../api";
import { useUpdateUser, useUser } from "../contexts/UserContext";
import Loading from "../global/Loading";
import Home from "./Home/Home";

const InitialScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const updateUser = useUpdateUser();
  const user = useUser();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const {
          data: { data: data },
        } = await profile();
        if (data) {
          data.isAuthenticated = true;
          updateUser(data);
        }
        setIsLoading(false);
      } catch (e) {
        if (e?.response?.status === 401) {
          updateUser({
            username: "User",
            isAuthenticated: false,
          });
        }
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <>{user?.isAuthenticated ? <Home /> : <Login />}</>;
};

export default InitialScreen;
