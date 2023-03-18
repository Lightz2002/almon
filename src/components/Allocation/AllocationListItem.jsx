import { Icon, ListItem } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../global/Typography";
import { formatNumber } from "../../helper";

const AllocationListItem = ({ allocation }) => {
  const { name, percentage, amount, color } = allocation;
  const style = StyleSheet.create({
    listParent: {
      padding: 0,
      marginVertical: 5,
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
      marginRight: 5,
      paddingHorizontal: 2,
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
    <ListItem containerStyle={style.listParent}>
      <ListItem.Content style={style.listContent}>
        <View style={[style.firstChild]}>
          <Icon
            containerStyle={{ backgroundColor: "red" }}
            type="font-awesome-5"
            name="square-full"
            color={color}
          />
        </View>
        <View style={[style.secondChild]}>
          <Typography>{name}</Typography>
        </View>
        <View style={[style.thirdChild]}>
          <Typography textAlign="center">{percentage} %</Typography>
        </View>
        <View style={[style.fourthChild]}>
          <Typography>{formatNumber(amount, "no-minimum-fraction")}</Typography>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default AllocationListItem;
