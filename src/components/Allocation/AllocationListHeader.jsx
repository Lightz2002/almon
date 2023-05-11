import { ListItem } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../global/Typography";

const AllocationListHeader = () => {
  const style = StyleSheet.create({
    container: {
      maxWidth: "100%",
      paddingVertical: 5,
      paddingLeft: 5,
    },

    listContent: {
      width: "100%",
      justifyContent: "flex-start",
      flexDirection: "row",
      padding: 0,
      margin: 0,
    },

    firstChild: {
      flexBasis: "5%",
      paddingHorizontal: 2,
      marginRight: 5,
    },

    secondChild: {
      flexBasis: "35%",
    },

    thirdChild: {
      flexBasis: "23%",
    },

    fourthChild: {
      flexBasis: "40%",
      paddingRight: 20,
    },
  });
  return (
    <ListItem containerStyle={style.container}>
      <ListItem.Content style={style.listContent}>
        <View style={[style.firstChild]}>
          <Typography variant="titleMedium">&nbsp;</Typography>
        </View>
        <View style={[style.secondChild]}>
          <Typography variant="titleMedium">Kategori</Typography>
        </View>
        <View style={[style.thirdChild]}>
          <Typography variant="titleMedium" textAlign="center">
            Alokasi
          </Typography>
        </View>
        <View style={[style.fourthChild]}>
          <Typography variant="titleMedium" textAlign="right">
            Jumlah
          </Typography>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default AllocationListHeader;
