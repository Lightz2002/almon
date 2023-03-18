import { ListItem } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../global/Typography";

const AllocationListHeader = () => {
  const style = StyleSheet.create({
    container: {
      padding: 0,
    },

    listContent: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: 0,
      margin: 0,
    },

    firstChild: {
      flexBasis: "5%",
      paddingHorizontal: 10,
      marginRight: 5,
    },

    secondChild: {
      flexBasis: "32%",
    },

    thirdChild: {
      flexBasis: "30%",
    },

    fourthChild: {
      flexBasis: "30%",
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
          <Typography variant="titleMedium">Jumlah</Typography>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default AllocationListHeader;
