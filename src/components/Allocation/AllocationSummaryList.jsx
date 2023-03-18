import React from "react";
import { StyleSheet, View } from "react-native";
import AllocationSummaryListItem from "./AllocationSummaryListItem";

const AllocationSummaryList = ({ expenseRemainPerCategory }) => {
  const style = StyleSheet.create({
    container: {
      flex: 2,
    },
  });
  return (
    <View style={[style.container]}>
      {expenseRemainPerCategory.map(item => {
        return (
          <AllocationSummaryListItem
            key={item.id}
            expenseRemainPerCategory={item}
          />
        );
      })}
    </View>
  );
};

export default AllocationSummaryList;
