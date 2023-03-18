import { Button, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../global/Typography";
import AllocationListHeader from "./AllocationListHeader";
import AllocationListItem from "./AllocationListItem";

const AllocationList = ({ allocations, handleSubmitSalary }) => {
  const { theme } = useTheme();
  const style = StyleSheet.create({
    container: {
      position: "relative",
      backgroundColor: theme.colors.white,
      flex: 1,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      // justifyContent: "center",
      // alignItems: "center",
    },

    button: {
      position: "absolute",
      bottom: 20,
      width: "50%",
      borderRadius: 10,
      elevation: 5,
      shadowColor: theme.colors.black,
      alignSelf: "center",
    },

    allocations: {
      paddingVertical: 15,
    },
  });

  let content = (
    <>
      <Typography variant="mainMedium">Masukkan Gaji Anda</Typography>
      <Button containerStyle={style.button} onPress={handleSubmitSalary}>
        Simpan
      </Button>
    </>
  );

  if (allocations.length > 0) {
    content = (
      <View style={[style.allocations]}>
        <AllocationListHeader />
        {allocations.map(allocation => {
          return (
            <AllocationListItem key={allocation.id} allocation={allocation} />
          );
        })}
      </View>
    );
  }

  return <View style={[style.container]}>{content}</View>;
};

export default AllocationList;
