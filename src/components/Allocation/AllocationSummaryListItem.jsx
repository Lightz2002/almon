import { ListItem, Image } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import Typography from "../../global/Typography";
import { formatNumber } from "../../helper";

const AllocationSummaryListItem = ({ expenseRemainPerCategory }) => {
  const { icon, name, allocation, expense } = expenseRemainPerCategory;

  const style = StyleSheet.create({
    container: {
      // flexBasis: "20%",
      // justifyContent: "center",
      // alignItems: "center",
    },
  });
  return (
    <ListItem style={[style.container]}>
      <Image
        source={{ uri: icon }}
        style={{
          width: 30,
          height: 30,
        }}
      />
      <ListItem.Content>
        <Typography variant="body2Medium">{name}</Typography>
        <Typography variant="small">
          {`${formatNumber(expense)} dari ${formatNumber(allocation)}`}
        </Typography>
      </ListItem.Content>
    </ListItem>
  );
};

export default AllocationSummaryListItem;
