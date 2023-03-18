import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Overlay } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

const Modal = ({
  visible,
  setVisible,
  text,
  buttonText,
  navigateTo = null,
  buttonStyle,
  icon,
}) => {
  const navigation = useNavigation();
  const style = StyleSheet.create({
    overlay: {
      width: "80%",
      padding: 40,
      borderRadius: 15,
    },

    backdrop: {
      blurRadius: 90,
    },
  });

  function toggleOverlay() {
    setVisible((visible) => !visible);
    if (navigateTo) navigation.navigate(navigateTo);
  }
  return (
    <Overlay
      overlayStyle={[style.overlay]}
      backdropStyle={[style.backdrop]}
      isVisible={visible}
      onBackdropPress={toggleOverlay}
    >
      <Icon
        size={icon.size}
        style={icon.style}
        type={icon.type}
        color={icon.color}
        name={icon.name}
      />
      {text}
      <Button
        containerStyle={buttonStyle}
        title={buttonText}
        onPress={toggleOverlay}
      />
    </Overlay>
  );
};

export default Modal;
