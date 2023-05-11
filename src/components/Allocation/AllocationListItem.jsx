import { Icon, ListItem } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../global/Typography";
import { formatNumber } from "../../helper";

const AllocationListItem = ({ allocation }) => {
  const { name, percentage, amount, color } = allocation;
  const style = StyleSheet.create({
    listParent: {
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
          <Typography textAlign="right">
            {formatNumber(amount, "no-minimum-fraction")}
          </Typography>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default AllocationListItem;
