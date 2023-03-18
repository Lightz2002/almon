import React, { useState, useEffect } from "react";
import { View } from "react-native";
import ProfileTop from "./ProfileTop";
import ProfileAction from "./ProfileAction";

const Profile = () => {
  return (
    <View>
      <ProfileTop />
      <ProfileAction />
    </View>
  );
};

export default Profile;
