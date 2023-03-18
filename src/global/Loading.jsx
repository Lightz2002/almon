import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
  const style = StyleSheet.create({
    loading: {
      flexGrow: 1,
    },
  });
  return <ActivityIndicator style={style.loading} size={80} />;
};

export default Loading;
